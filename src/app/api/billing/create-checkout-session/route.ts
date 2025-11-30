// src/app/api/billing/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe, APP_URL } from "@/lib/stripe";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

const CREATOR_PRICE_ID = process.env.STRIPE_PRICE_CREATOR_MONTHLY;

export async function POST(_req: NextRequest) {
  try {
    // 1) Ensure user + workspace
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id, null);

    if (!workspace) {
      return NextResponse.json(
        { error: "No active workspace found" },
        { status: 400 }
      );
    }

    if (!CREATOR_PRICE_ID) {
      console.error("Missing STRIPE_PRICE_CREATOR_MONTHLY env var");
      return NextResponse.json(
        { error: "Creator plan price not configured" },
        { status: 500 }
      );
    }

    // 2) Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: CREATOR_PRICE_ID,
          quantity: 1,
        },
      ],
      // Where Stripe sends the user after success/cancel
      success_url: `${APP_URL}/dashboard/settings/billing?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/dashboard/settings/billing?status=cancelled`,
      customer_email: user.email ?? undefined,
      metadata: {
        // We'll use this later in webhooks
        workspaceId: workspace.id,
        userId: user.id,
      },
    });

    // 3) Return the URL so the client can redirect
    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
