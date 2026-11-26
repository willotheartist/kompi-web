import { prisma } from "./prisma";
import { getStripe, stripePrice } from "./stripe";
import { ApiError } from "./api-errors";
import { planForPrice, subscriptionState } from "./billing-state";
const prices = () => ({ STARTER: stripePrice("STARTER"), CREATOR: stripePrice("CREATOR"), BUSINESS: stripePrice("BUSINESS") });
export const paidPlanForPrice = (id: string) => planForPrice(id, prices());
export async function syncSubscription(subscriptionId: string, expectedWorkspaceId?: string, event?: { id: string; type: string }, reviewRequired = false) {
  return prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`billing:${subscriptionId}`}))`;
    if (event && await tx.billingEvent.findUnique({ where: { id: event.id } })) return;
    const subscription = await getStripe().subscriptions.retrieve(subscriptionId, { expand: ["latest_invoice"] });
    const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
    // Stripe IDs are authoritative. Metadata is only a fallback and must match the stored customer.
    const workspace = await tx.workspace.findFirst({ where: { stripeSubscriptionId: subscription.id } })
      || await tx.workspace.findFirst({ where: { stripeCustomerId: customerId } })
      || (subscription.metadata.workspaceId ? await tx.workspace.findUnique({ where: { id: subscription.metadata.workspaceId } }) : null);
    if (!workspace || workspace.stripeCustomerId !== customerId || (expectedWorkspaceId && workspace.id !== expectedWorkspaceId)) {
      if (expectedWorkspaceId) throw new ApiError("Subscription does not belong to this workspace.", 403);
      return; // This Stripe account also serves other products.
    }
    const knownPrice = subscription.items.data.some(item => paidPlanForPrice(item.price.id));
    if (!knownPrice && workspace.stripeSubscriptionId !== subscription.id) return;
    // Serialize different subscriptions belonging to the same workspace as well.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`workspace-billing:${workspace.id}`}))`;
    const current = await tx.workspace.findUniqueOrThrow({ where: { id: workspace.id } });
    if (current.stripeSubscriptionId && current.stripeSubscriptionId !== subscription.id) {
      if (event) await tx.billingEvent.create({ data: event });
      return;
    }
    const billingReviewRequired = reviewRequired || current.billingReviewRequired;
    await tx.workspace.update({ where: { id: workspace.id }, data: { ...subscriptionState(subscription, prices(), billingReviewRequired), billingReviewRequired } });
    if (event) await tx.billingEvent.create({ data: event });
    if (reviewRequired) console.error("KOMPI_BILLING_REVIEW_REQUIRED", { workspaceId: workspace.id, subscriptionId, eventId: event?.id, eventType: event?.type });
  }, { timeout: 20000 });
}
export async function billingWorkspace(userId: string, workspaceId?: string) {
  const { getActiveWorkspace } = await import("./auth");
  const workspace = await getActiveWorkspace(userId, workspaceId || null);
  if (!workspace) throw new ApiError("Workspace not found.", 404);
  return workspace;
}
