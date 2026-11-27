import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { applyCheckoutSession, syncConnectAccount } from "@/lib/store-server";

export const runtime = "nodejs";

/**
 * Events from sellers' connected Stripe accounts (Connect webhook endpoint).
 * Orders also settle when the buyer lands on the order page, so this is a backstop.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret) return new NextResponse("Webhook unavailable", { status: 503 });
  if (!signature) return new NextResponse("Missing signature", { status: 400 });
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }
  try {
    const account = event.account;
    if (event.type === "account.updated") {
      await syncConnectAccount(event.data.object as Stripe.Account);
    } else if (account && ["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.expired"].includes(event.type)) {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.kompi === "store") await applyCheckoutSession(session, account);
    } else if (account && event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      if (pi && charge.refunded) await prisma.order.updateMany({ where: { stripePaymentIntentId: pi, stripeAccountId: account }, data: { status: "REFUNDED" } });
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Connect webhook failed", { eventId: event.id, type: event.type, error: e instanceof Error ? e.message : e });
    return new NextResponse("Failed", { status: 500 });
  }
}
