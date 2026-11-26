import { test } from "node:test";
import assert from "node:assert/strict";
import type Stripe from "stripe";
import { subscriptionState, planForPrice } from "../src/lib/billing-state";
const prices = { STARTER: "price_start", CREATOR: "price_pro", BUSINESS: "price_business" };
const subscription = (overrides: Partial<Stripe.Subscription> = {}) => ({
  id: "sub_test", status: "active", cancel_at_period_end: false,
  items: { data: [{ price: { id: "price_pro" }, current_period_end: 1800000000 }] },
  latest_invoice: { status: "paid", amount_due: 1999 }, ...overrides,
} as Stripe.Subscription);
test("paid active subscriptions receive their purchased tier", () => {
  const state = subscriptionState(subscription(), prices);
  assert.equal(state.plan, "CREATOR"); assert.equal(state.billingPeriodEnd?.getTime(), 1800000000000);
});
test("pending, failed, cancelled and paused subscriptions never grant paid limits", () => {
  for (const status of ["incomplete", "incomplete_expired", "past_due", "unpaid", "canceled", "paused"] as const) assert.equal(subscriptionState(subscription({ status }), prices).plan, "FREE");
});
test("an active subscription does not grant access before its first payment is confirmed", () => {
  for (const latest_invoice of [null, "in_test", { status: "open", amount_due: 1999 } as Stripe.Invoice]) assert.equal(subscriptionState(subscription({ latest_invoice }), prices).plan, "FREE");
});
test("scheduled cancellation keeps paid access until the subscription ends", () => {
  const state = subscriptionState(subscription({ cancel_at_period_end: true }), prices);
  assert.equal(state.plan, "CREATOR"); assert.equal(state.cancelAtPeriodEnd, true); assert.equal(state.stripeSubscriptionId, "sub_test");
  assert.equal(subscriptionState(subscription({ status: "canceled" }), prices).stripeSubscriptionId, null);
});
test("payment recovery restores limits; a review flag survives later paid events", () => {
  assert.equal(subscriptionState(subscription({ status: "past_due" }), prices).plan, "FREE");
  assert.equal(subscriptionState(subscription(), prices).plan, "CREATOR");
  const review = subscriptionState(subscription(), prices, true);
  assert.equal(review.plan, "FREE"); assert.equal(review.billingStatus, "review_required");
});
test("unknown prices cannot grant a paid tier", () => {
  assert.equal(planForPrice("", {}), null); assert.equal(planForPrice("price_other_product", prices), null);
  assert.equal(subscriptionState(subscription(), {}).plan, "FREE");
});
test("valid trials and zero-due invoices are supported without claiming a card was charged", () => {
  assert.equal(subscriptionState(subscription({ status: "trialing", latest_invoice: null }), prices).plan, "CREATOR");
  assert.equal(subscriptionState(subscription({ latest_invoice: { status: "paid", amount_due: 0 } as Stripe.Invoice }), prices).plan, "CREATOR");
});
