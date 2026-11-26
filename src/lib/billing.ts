import type Stripe from "stripe";
import type { Plan } from "@prisma/client";
import { prisma } from "./prisma";
import { getStripe, stripePrice } from "./stripe";
import { ApiError } from "./api-errors";
export function paidPlanForPrice(priceId: string): Plan | null {
  if (priceId && priceId === stripePrice("STARTER")) return "STARTER";
  if (priceId && priceId === stripePrice("BUSINESS")) return "BUSINESS";
  if (priceId && priceId === stripePrice("CREATOR")) return "CREATOR";
  return null;
}
export function subscriptionState(subscription: Stripe.Subscription) {
  const item = subscription.items.data[0];
  const paidPlan = item ? paidPlanForPrice(item.price.id) : null;
  const entitled = subscription.status === "active" || subscription.status === "trialing";
  return {
    plan: entitled && paidPlan ? paidPlan : "FREE" as Plan,
    billingStatus: subscription.status,
    billingPeriodEnd: item?.current_period_end ? new Date(item.current_period_end * 1000) : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    stripeSubscriptionId: subscription.status === "canceled" ? null : subscription.id,
  };
}
export async function syncSubscription(subscriptionId: string, expectedWorkspaceId?: string, event?: { id: string; type: string }) {
  return prisma.$transaction(async tx => {
    if (event && await tx.billingEvent.findUnique({ where: { id: event.id } })) return;
    // Serialize retrieval and writes for each subscription so delayed events read current Stripe state.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`billing:${subscriptionId}`}))`;
    if (event && await tx.billingEvent.findUnique({ where: { id: event.id } })) return;
    const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
    const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
    const workspaceId = subscription.metadata.workspaceId || expectedWorkspaceId;
    const workspace = workspaceId
      ? await tx.workspace.findUnique({ where: { id: workspaceId } })
      : await tx.workspace.findFirst({ where: { stripeSubscriptionId: subscription.id } });
    if (!workspace || (expectedWorkspaceId && workspace.id !== expectedWorkspaceId)) throw new ApiError("Subscription does not belong to this workspace.", 403);
    if (workspace.stripeCustomerId !== customerId) throw new ApiError("Billing customer does not match.", 409);
    // An old cancellation must never remove a newer subscription's entitlement.
    if (workspace.stripeSubscriptionId && workspace.stripeSubscriptionId !== subscription.id) {
      if (event) await tx.billingEvent.create({ data: event });
      return;
    }
    await tx.workspace.update({ where: { id: workspace.id }, data: subscriptionState(subscription) });
    if (event) await tx.billingEvent.create({ data: event });
  }, { timeout: 20000 });
}
export async function billingWorkspace(userId: string, workspaceId?: string) {
  const { getActiveWorkspace } = await import("./auth");
  const workspace = await getActiveWorkspace(userId, workspaceId || null);
  if (!workspace) throw new ApiError("Workspace not found.", 404);
  return workspace;
}
