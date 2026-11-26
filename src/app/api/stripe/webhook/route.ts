import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { syncSubscription } from "@/lib/billing";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!process.env.STRIPE_WEBHOOK_SECRET) return new NextResponse("Webhook unavailable", { status: 503 });
  if (!signature) return new NextResponse("Missing signature", { status: 400 });
  let event: Stripe.Event;
  try { event = getStripe().webhooks.constructEvent(await req.text(), signature, process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return new NextResponse("Invalid signature", { status: 400 }); }
  try {
    if (event.type.startsWith("customer.subscription.")) {
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscription(subscription.id, undefined, { id: event.id, type: event.type });
    } else if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      const id = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      if (id && session.metadata?.workspaceId) await syncSubscription(id, session.metadata.workspaceId, { id: event.id, type: event.type });
    }
    return NextResponse.json({ received: true });
  } catch { console.error("Billing reconciliation failed", { eventId: event.id, type: event.type }); return new NextResponse("Reconciliation failed", { status: 500 }); }
}
