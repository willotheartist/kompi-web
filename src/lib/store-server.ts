import { randomBytes } from "node:crypto";
import type Stripe from "stripe";
import type { Order, Product, Workspace } from "@prisma/client";
import { prisma } from "./prisma";
import { getStripe } from "./stripe";
import { emailConfigured, escapeHtml, sendEmail } from "./email";
import { PUBLIC_PROFILE_URL, appUrl } from "./urls";
import { formatBookingTime, formatMoney, readBookingRules } from "./store";

export const newAccessToken = () => randomBytes(24).toString("base64url");
export const orderUrl = (token: string) => `${PUBLIC_PROFILE_URL}/order/${token}`;

/** A Card address for the workspace, used for product pages (kompi.app/{handle}/p/{slug}). */
export async function storeHandle(workspaceId: string) {
  const card = await prisma.kCard.findFirst({ where: { workspaceId, isPublic: true, slug: { not: null } }, orderBy: { createdAt: "asc" }, select: { slug: true } });
  return card?.slug ?? null;
}

// ---------------- Stripe Connect ----------------

export async function ensureConnectAccount(workspace: Workspace, email: string, country?: string) {
  if (workspace.stripeConnectAccountId) return workspace.stripeConnectAccountId;
  const account = await getStripe().accounts.create({
    type: "express",
    email,
    ...(country ? { country } : {}),
    capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
    business_profile: { product_description: "Digital products, bookings and tips sold through Kompi", url: PUBLIC_PROFILE_URL },
    metadata: { workspaceId: workspace.id },
  });
  await prisma.workspace.update({ where: { id: workspace.id }, data: { stripeConnectAccountId: account.id } });
  return account.id;
}

export async function syncConnectAccount(accountOrId: string | Stripe.Account) {
  const account = typeof accountOrId === "string" ? await getStripe().accounts.retrieve(accountOrId) : accountOrId;
  const data = { connectChargesEnabled: Boolean(account.charges_enabled), connectDetailsSubmitted: Boolean(account.details_submitted) };
  await prisma.workspace.updateMany({ where: { stripeConnectAccountId: account.id }, data });
  return { ...data, defaultCurrency: account.default_currency ?? null };
}

// ---------------- Orders ----------------

type OrderWithProduct = Order & { product: Product; workspace: Workspace };

/** Settle a pending card payment by asking Stripe directly. Safe to call repeatedly. */
export async function reconcileOrder(order: OrderWithProduct): Promise<OrderWithProduct> {
  if (order.status !== "PENDING" || !order.stripeCheckoutSessionId || !order.stripeAccountId) return order;
  let session: Stripe.Checkout.Session;
  try {
    session = await getStripe().checkout.sessions.retrieve(order.stripeCheckoutSessionId, {}, { stripeAccount: order.stripeAccountId });
  } catch {
    return order;
  }
  return applyCheckoutSession(session, order.stripeAccountId);
}

export async function applyCheckoutSession(session: Stripe.Checkout.Session, accountId: string): Promise<OrderWithProduct> {
  const order = await prisma.order.findFirst({ where: { stripeCheckoutSessionId: session.id, stripeAccountId: accountId }, include: { product: true, workspace: true } });
  if (!order) throw new Error("Order not found for checkout session");
  if (order.status !== "PENDING") return order;
  if (session.status === "expired") {
    return prisma.order.update({ where: { id: order.id }, data: { status: "CANCELLED" }, include: { product: true, workspace: true } });
  }
  if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") return order;
  const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  const updated = await prisma.order.updateMany({
    where: { id: order.id, status: "PENDING" },
    data: {
      status: "PAID",
      paidAt: new Date(),
      amountCents: session.amount_total ?? order.amountCents,
      buyerEmail: session.customer_details?.email ?? order.buyerEmail,
      buyerName: order.buyerName ?? session.customer_details?.name ?? null,
      stripePaymentIntentId: paymentIntent ?? null,
    },
  });
  const fresh = await prisma.order.findUniqueOrThrow({ where: { id: order.id }, include: { product: true, workspace: true } });
  if (updated.count) await deliverOrder(fresh).catch((e) => console.error("Order email failed", fresh.id, e instanceof Error ? e.message : e));
  return fresh;
}

/** Emails the buyer their access and tells the seller. Runs once per order. */
export async function deliverOrder(order: OrderWithProduct) {
  if (!emailConfigured()) return;
  const claimed = await prisma.order.updateMany({ where: { id: order.id, emailedAt: null }, data: { emailedAt: new Date() } });
  if (!claimed.count) return;
  const { product } = order;
  const owner = await prisma.user.findUnique({ where: { id: order.workspace.ownerId }, select: { email: true, name: true } });
  const seller = owner?.name || "the seller";
  const link = orderUrl(order.accessToken);
  const rules = product.type === "BOOKING" ? readBookingRules(product.booking) : null;
  const when = order.bookingStart && rules ? formatBookingTime(order.bookingStart, rules.timezone, product.durationMin) : null;
  const amount = order.amountCents > 0 ? formatMoney(order.amountCents, order.currency) : "Free";
  const what =
    product.type === "BOOKING" ? `Your booking is confirmed${when ? ` for <strong>${escapeHtml(when)}</strong>` : ""}.` :
    product.type === "TIP" ? "Thank you for your support!" :
    "Your order is ready.";
  if (order.buyerEmail) {
    await sendEmail({
      to: order.buyerEmail,
      subject: product.type === "BOOKING" ? `Booked: ${product.title}` : product.type === "TIP" ? `Thanks for the tip!` : `Your ${product.title}`,
      html: `<p>${what}</p><p><strong>${escapeHtml(product.title)}</strong> from ${escapeHtml(seller)} · ${escapeHtml(amount)}</p>${product.thankYouNote ? `<p>${escapeHtml(product.thankYouNote)}</p>` : ""}<p><a href="${escapeHtml(link)}">${product.type === "BOOKING" ? "View booking" : product.type === "TIP" ? "View receipt" : "Open your order"}</a></p><p style="color:#80858C;font-size:12px">Keep this email: the link is your access.</p>`,
    });
  }
  if (owner?.email) {
    await sendEmail({
      to: owner.email,
      subject: product.type === "LEAD_MAGNET" ? `New signup: ${product.title}` : product.type === "BOOKING" ? `New booking: ${product.title}` : `New sale: ${product.title} (${amount})`,
      html: `<p>${escapeHtml(order.buyerName || order.buyerEmail || "Someone")} ${product.type === "LEAD_MAGNET" ? "signed up for" : product.type === "BOOKING" ? "booked" : "bought"} <strong>${escapeHtml(product.title)}</strong>${order.amountCents > 0 ? ` for ${escapeHtml(amount)}` : ""}.</p>${when ? `<p>When: ${escapeHtml(when)}</p>` : ""}${order.buyerNote ? `<p>Note: ${escapeHtml(order.buyerNote)}</p>` : ""}<p><a href="${escapeHtml(appUrl("/dashboard/earn/orders"))}">See your orders</a></p>`,
    });
  }
}

/** Frees booking slots held by checkouts that were abandoned. */
export async function releaseStaleHolds(productId: string) {
  await prisma.order.updateMany({ where: { productId, status: "PENDING", createdAt: { lt: new Date(Date.now() - 35 * 60_000) } }, data: { status: "CANCELLED" } });
}

// ---------------- Calendar ----------------

function icsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function icsText(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);
}
export function bookingIcs(order: Order & { product: Product }, sellerName: string) {
  if (!order.bookingStart) return null;
  const end = order.bookingEnd ?? new Date(order.bookingStart.getTime() + (order.product.durationMin ?? 30) * 60_000);
  const rules = readBookingRules(order.product.booking);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kompi//Store//EN",
    "BEGIN:VEVENT",
    `UID:${order.id}@kompi.app`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(order.bookingStart)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsText(`${order.product.title} with ${sellerName}`)}`,
    rules.location ? `LOCATION:${icsText(rules.location)}` : "",
    `DESCRIPTION:${icsText(`Booked on Kompi. ${orderUrl(order.accessToken)}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

/** Products shown on a Card, in the Card's order, published only. */
export async function productsForCard(workspaceId: string | null | undefined, ids: unknown) {
  if (!workspaceId || !Array.isArray(ids) || !ids.length) return [];
  const list = ids.filter((x): x is string => typeof x === "string").slice(0, 30);
  const rows = await prisma.product.findMany({
    where: { workspaceId, id: { in: list }, status: "PUBLISHED" },
    select: { id: true, slug: true, type: true, title: true, subtitle: true, coverImage: true, priceCents: true, currency: true, payWhatYouWant: true, buttonLabel: true, durationMin: true },
  });
  return list.map((id) => rows.find((r) => r.id === id)).filter((r): r is (typeof rows)[number] => Boolean(r));
}
