import type Stripe from "stripe";
import type { Plan } from "@prisma/client";
export type PaidPrices = Partial<Record<"STARTER" | "CREATOR" | "BUSINESS", string>>;
export function planForPrice(priceId: string, prices: PaidPrices): Plan | null {
  for (const plan of ["STARTER", "CREATOR", "BUSINESS"] as const) if (priceId && priceId === prices[plan]) return plan;
  return null;
}
export function subscriptionState(subscription: Stripe.Subscription, prices: PaidPrices, reviewRequired = false) {
  const item = subscription.items.data.find(item => planForPrice(item.price.id, prices));
  const paidPlan = item ? planForPrice(item.price.id, prices) : null;
  const invoice = typeof subscription.latest_invoice === "object" ? subscription.latest_invoice : null;
  const paid = invoice?.status === "paid" || invoice?.amount_due === 0;
  const entitled = subscription.status === "trialing" || (subscription.status === "active" && paid);
  return {
    plan: entitled && paidPlan && !reviewRequired ? paidPlan : "FREE" as Plan,
    billingStatus: reviewRequired ? "review_required" : subscription.status,
    billingPeriodEnd: item?.current_period_end ? new Date(item.current_period_end * 1000) : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    stripeSubscriptionId: subscription.status === "canceled" ? null : subscription.id,
  };
}
