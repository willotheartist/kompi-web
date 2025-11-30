// src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const runtime = "nodejs"; // important: use Node.js runtime, not edge

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Must read raw text body for Stripe signature verification
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      /**
       * UPGRADE: a user successfully completed Checkout
       * for the Creator subscription.
       */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // You set this when creating the Checkout Session
        const workspaceId = session.metadata?.workspaceId;

        if (!workspaceId) {
          console.warn(
            "checkout.session.completed received without workspaceId metadata"
          );
          break;
        }

        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;

        await prisma.workspace.update({
          where: { id: workspaceId },
          data: {
            plan: "CREATOR",
            stripeCustomerId: customerId ?? undefined,
            stripeSubscriptionId: subscriptionId ?? undefined,
          },
        });

        break;
      }

      /**
       * DOWNGRADE: subscription canceled / ended in Stripe.
       * We drop the workspace back to FREE.
       */
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const subscriptionId = subscription.id;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer?.id;

        // Build a typed OR array
        const orConditions: Prisma.WorkspaceWhereInput[] = [
          { stripeSubscriptionId: subscriptionId },
        ];

        if (customerId) {
          orConditions.push({ stripeCustomerId: customerId });
        }

        const workspace = await prisma.workspace.findFirst({
          where: {
            OR: orConditions,
          },
        });

        if (!workspace) {
          console.warn(
            "customer.subscription.deleted: no workspace matched this subscription/customer",
            { subscriptionId, customerId }
          );
          break;
        }

        await prisma.workspace.update({
          where: { id: workspace.id },
          data: {
            plan: "FREE",
            stripeSubscriptionId: null,
            // Keep customerId so they can re-subscribe easily
          },
        });

        break;
      }

      default: {
        // For now ignore any other events
        break;
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
