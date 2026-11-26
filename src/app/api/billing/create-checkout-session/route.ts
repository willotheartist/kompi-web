import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, stripePrice } from "@/lib/stripe";
import { APP_URL } from "@/lib/urls";
import { requireUser } from "@/lib/auth";
import { billingWorkspace } from "@/lib/billing";
import { prisma } from "@/lib/prisma";
import { ApiError, apiError } from "@/lib/api-errors";
import { PLANS } from "@/lib/plan-limits";
import { rateLimit } from "@/lib/rate-limit";
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    await rateLimit("checkout", user.id, 10, 3600);
    const body = z.object({ plan: z.enum(["STARTER", "CREATOR", "BUSINESS"]), workspaceId: z.string().optional() }).parse(await req.json());
    const workspace = await billingWorkspace(user.id, body.workspaceId);
    const stripe = getStripe();
    const price = stripePrice(body.plan);
    if (!price) throw new ApiError("This plan is not available for checkout yet.", 503);
    const configuredPrice = await stripe.prices.retrieve(price);
    if (!configuredPrice.active || configuredPrice.currency !== "gbp" || configuredPrice.recurring?.interval !== "month" || configuredPrice.recurring?.interval_count !== 1 || configuredPrice.unit_amount !== Math.round(PLANS.find(p => p.id === body.plan)!.price * 100)) throw new ApiError("This plan is not available for checkout yet.", 503);
    if (workspace.stripeSubscriptionId) throw new ApiError("Manage your existing subscription to change plans.", 409);
    let customerId = workspace.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email!, name: user.name || undefined, metadata: { workspaceId: workspace.id, userId: user.id } }, { idempotencyKey: `kompi-customer-${workspace.id}` });
      customerId = customer.id;
      await prisma.workspace.update({ where: { id: workspace.id }, data: { stripeCustomerId: customerId } });
    }
    const active = await stripe.subscriptions.list({ customer: customerId, limit: 100, status: "all" });
    if (active.data.some(s => !["canceled", "incomplete_expired"].includes(s.status))) throw new ApiError("An existing subscription needs attention. Open Manage billing.", 409);
    const session = await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`checkout:${workspace.id}`}))`;
      const openSessions = await stripe.checkout.sessions.list({ customer: customerId!, status: "open", limit: 100 });
      const existing = openSessions.data.find(s => s.mode === "subscription" && s.metadata?.workspaceId === workspace.id);
      if (existing) {
        if (existing.metadata?.plan === body.plan) return existing;
        await stripe.checkout.sessions.expire(existing.id);
      }
      return stripe.checkout.sessions.create({
      mode: "subscription", integration_identifier: "kompi-monthly-hrptvxnq", customer: customerId, line_items: [{ price, quantity: 1 }],
      success_url: `${APP_URL}/dashboard/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/dashboard/settings/billing?status=cancelled`,
      client_reference_id: workspace.id,
      metadata: { workspaceId: workspace.id, userId: user.id, plan: body.plan },
      subscription_data: { metadata: { workspaceId: workspace.id, userId: user.id } },
      billing_address_collection: "auto", allow_promotion_codes: true,
    }, { idempotencyKey: `kompi-checkout-${workspace.id}-${body.plan}-${Math.floor(Date.now() / 600000)}` });
    }, { timeout: 20000 });
    if (!session.url) throw new ApiError("Unable to open checkout.", 502);
    return NextResponse.json({ url: session.url });
  } catch (error) { return apiError(error); }
}
