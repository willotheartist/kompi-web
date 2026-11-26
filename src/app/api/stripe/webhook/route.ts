import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { syncSubscription } from "@/lib/billing";
export const runtime = "nodejs";
function objectId(value: string | { id: string } | null | undefined) { return typeof value === "string" ? value : value?.id; }
function invoiceSubscription(invoice: Stripe.Invoice) { return objectId(invoice.parent?.subscription_details?.subscription); }
async function riskSubscriptions(object: Stripe.Charge | Stripe.Dispute | Stripe.Radar.EarlyFraudWarning) {
  const stripe = getStripe();
  let paymentIntent = objectId(object.payment_intent);
  if (!paymentIntent && "charge" in object) {
    const chargeId = objectId(object.charge);
    if (chargeId) paymentIntent = objectId((await stripe.charges.retrieve(chargeId)).payment_intent);
  }
  const ids = new Set<string>();
  if (!paymentIntent) return ids;
  // Invoice payments can fan out; inspect every paid invoice, not only the first match.
  for await (const payment of stripe.invoicePayments.list({ payment: { type: "payment_intent", payment_intent: paymentIntent }, status: "paid", limit: 100 })) {
    const invoice = typeof payment.invoice === "string" ? await stripe.invoices.retrieve(payment.invoice) : payment.invoice;
    if ("deleted" in invoice && invoice.deleted) continue;
    const id = invoiceSubscription(invoice as Stripe.Invoice);
    if (id) ids.add(id);
  }
  return ids;
}
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!process.env.STRIPE_WEBHOOK_SECRET) return new NextResponse("Webhook unavailable", { status: 503 });
  if (!signature) return new NextResponse("Missing signature", { status: 400 });
  let event: Stripe.Event;
  try { event = getStripe().webhooks.constructEvent(await req.text(), signature, process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return new NextResponse("Invalid signature", { status: 400 }); }
  try {
    const receipt = { id: event.id, type: event.type };
    if (event.type.startsWith("customer.subscription.")) {
      await syncSubscription((event.data.object as Stripe.Subscription).id, undefined, receipt);
    } else if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      const id = objectId(session.subscription);
      if (id && session.mode === "subscription" && ["paid", "no_payment_required"].includes(session.payment_status)) await syncSubscription(id, undefined, receipt);
    } else if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
      const id = invoiceSubscription(event.data.object as Stripe.Invoice);
      if (id) await syncSubscription(id, undefined, receipt);
    } else if (["charge.refunded", "charge.dispute.created", "radar.early_fraud_warning.created"].includes(event.type)) {
      const object = event.data.object as Stripe.Charge | Stripe.Dispute | Stripe.Radar.EarlyFraudWarning;
      const reviewRequired = event.type !== "charge.refunded" || (object as Stripe.Charge).refunded;
      for (const id of await riskSubscriptions(object)) await syncSubscription(id, undefined, { ...receipt, id: `${event.id}:${id}` }, reviewRequired);
    }
    return NextResponse.json({ received: true });
  } catch { console.error("Billing reconciliation failed", { eventId: event.id, type: event.type }); return new NextResponse("Reconciliation failed", { status: 500 }); }
}
