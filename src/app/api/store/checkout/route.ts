import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { apiError, ApiError } from "@/lib/api-errors";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { getStripe } from "@/lib/stripe";
import { PUBLIC_PROFILE_URL } from "@/lib/urls";
import { MIN_CHARGE_CENTS, bookingSlots, discountAmount, readBookingRules, storeFeeCents } from "@/lib/store";
import { countDiscountUse, deliverOrder, findDiscount, newAccessToken, orderUrl, releaseStaleHolds } from "@/lib/store-server";

export const dynamic = "force-dynamic";

const schema = z.object({
  productId: z.string().max(64),
  handle: z.string().max(80).optional(),
  amountCents: z.number().int().min(0).max(10_000_000).optional(),
  slot: z.string().datetime().optional(),
  email: z.string().trim().email("Enter a valid email.").max(254).optional(),
  name: z.string().trim().max(120).optional(),
  note: z.string().trim().max(1000).optional(),
  discountCode: z.string().trim().max(40).optional(),
});

/**
 * Starts a purchase. Free items (lead magnets, £0 products) complete immediately;
 * paid ones return a Stripe Checkout URL on the seller's connected account.
 */
export async function POST(req: NextRequest) {
  try {
    await rateLimit("store-checkout", requestIp(req), 30, 600);
    const body = schema.parse(await req.json());
    const product = await prisma.product.findFirst({ where: { id: body.productId, status: "PUBLISHED" }, include: { workspace: true } });
    if (!product) throw new ApiError("This product isn't available.", 404);
    const { workspace } = product;

    let amount = product.priceCents;
    if (product.type === "LEAD_MAGNET") amount = 0;
    else if (product.payWhatYouWant) {
      amount = body.amountCents ?? product.priceCents;
      const min = product.minPriceCents ?? 0;
      if (amount < min) throw new ApiError("Please choose a higher amount.");
    }
    if (amount > 0 && amount < MIN_CHARGE_CENTS) throw new ApiError("The minimum amount is 50p.");

    // Discount codes
    let discountCode: string | null = null;
    let discountCents = 0;
    if (body.discountCode && amount > 0) {
      const d = await findDiscount(workspace.id, product, body.discountCode);
      discountCents = discountAmount(amount, d);
      discountCode = d.code;
      amount -= discountCents;
    }

    // Bookings: the slot must still be open.
    let bookingStart: Date | null = null;
    let bookingEnd: Date | null = null;
    if (product.type === "BOOKING") {
      if (!body.slot) throw new ApiError("Pick a time.");
      await releaseStaleHolds(product.id);
      const rules = readBookingRules(product.booking);
      const live = await prisma.order.findMany({ where: { productId: product.id, status: { in: ["PENDING", "PAID", "FREE"] }, bookingStart: { gte: new Date(Date.now() - 86_400_000) } }, select: { bookingStart: true, bookingEnd: true } });
      const taken = live.filter((o) => o.bookingStart).map((o) => ({ start: o.bookingStart!.getTime(), end: (o.bookingEnd ?? o.bookingStart!).getTime() }));
      const open = bookingSlots(rules, product.durationMin ?? 30, taken).some((d) => d.slots.some((s) => s.start === new Date(body.slot!).toISOString()));
      if (!open) throw new ApiError("That time is no longer available. Please pick another.", 409);
      bookingStart = new Date(body.slot);
      bookingEnd = new Date(bookingStart.getTime() + (product.durationMin ?? 30) * 60_000);
    }

    const base = {
      workspaceId: workspace.id,
      productId: product.id,
      buyerEmail: body.email ?? null,
      buyerName: body.name || null,
      buyerNote: body.note || null,
      currency: product.currency,
      accessToken: newAccessToken(),
      bookingStart,
      bookingEnd,
      discountCode,
      discountCents,
    };

    // ---- Free ----
    if (amount === 0) {
      if (!body.email) throw new ApiError("Enter your email.");
      await rateLimit("store-free", `${body.email.toLowerCase()}:${product.id}`, 5, 3600);
      const order = await prisma.order.create({ data: { ...base, status: "FREE", amountCents: 0, paidAt: new Date() }, include: { product: true, workspace: true } }).catch(slotTaken);
      if (product.type === "LEAD_MAGNET") await addSubscriber(workspace.id, body.email, product.slug);
      await countDiscountUse(workspace.id, discountCode);
      await deliverOrder(order).catch((e) => console.error("Order email failed", order.id, e instanceof Error ? e.message : e));
      return NextResponse.json({ url: orderUrl(order.accessToken) });
    }

    // ---- Paid ----
    if (!workspace.stripeConnectAccountId || !workspace.connectChargesEnabled) throw new ApiError("This seller isn't taking payments yet.", 409);
    const fee = storeFeeCents(amount, workspace.plan);
    const order = await prisma.order.create({ data: { ...base, status: "PENDING", amountCents: amount, feeCents: fee, stripeAccountId: workspace.stripeConnectAccountId } }).catch(slotTaken);
    const back = body.handle ? `${PUBLIC_PROFILE_URL}/${encodeURIComponent(body.handle)}/p/${encodeURIComponent(product.slug)}` : PUBLIC_PROFILE_URL;
    const image = product.coverImage?.startsWith("https://") ? [product.coverImage] : undefined;
    try {
      const session = await getStripe().checkout.sessions.create(
        {
          mode: "payment",
          line_items: [{ quantity: 1, price_data: { currency: product.currency, unit_amount: amount, product_data: { name: product.title.slice(0, 120), ...(product.subtitle ? { description: product.subtitle.slice(0, 300) } : {}), ...(image ? { images: image } : {}) } } }],
          ...(body.email ? { customer_email: body.email } : {}),
          ...(fee > 0 ? { payment_intent_data: { application_fee_amount: fee, metadata: { orderId: order.id } } } : { payment_intent_data: { metadata: { orderId: order.id } } }),
          success_url: `${orderUrl(order.accessToken)}?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: back,
          expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
          metadata: { orderId: order.id, kompi: "store" },
        },
        { stripeAccount: workspace.stripeConnectAccountId },
      );
      await prisma.order.update({ where: { id: order.id }, data: { stripeCheckoutSessionId: session.id } });
      await prisma.product.update({ where: { id: product.id }, data: { clicks: { increment: 1 } } });
      return NextResponse.json({ url: session.url });
    } catch (e) {
      await prisma.order.update({ where: { id: order.id }, data: { status: "CANCELLED" } });
      throw e instanceof ApiError ? e : new ApiError("Checkout couldn't start. Please try again.", 502);
    }
  } catch (e) {
    return apiError(e);
  }
}

function slotTaken(e: unknown): never {
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") throw new ApiError("Someone just booked that time. Please pick another.", 409);
  throw e;
}

async function addSubscriber(workspaceId: string, email: string, source: string) {
  const list = (await prisma.subscriberList.findFirst({ where: { workspaceId, name: "Store signups" } })) ?? (await prisma.subscriberList.create({ data: { workspaceId, name: "Store signups" } }));
  const exists = await prisma.subscriber.findFirst({ where: { listId: list.id, email: email.toLowerCase() }, select: { id: true } });
  if (!exists) await prisma.subscriber.create({ data: { listId: list.id, email: email.toLowerCase(), sourceSlug: source, sourceType: "product", tags: ["lead-magnet"] } });
}
