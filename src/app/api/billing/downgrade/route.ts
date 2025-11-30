// src/app/api/billing/downgrade/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST() {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id, null);

    if (!workspace) {
      return new NextResponse("No active workspace", { status: 400 });
    }

    const { stripeSubscriptionId } = workspace as {
      stripeSubscriptionId?: string | null;
    };

    if (!stripeSubscriptionId) {
      return new NextResponse(
        "This workspace does not have an active Stripe subscription.",
        { status: 400 }
      );
    }

    // Cancel the subscription in Stripe (immediately).
    // Stripe will emit `customer.subscription.deleted`,
    // which our webhook already listens for.
    await stripe.subscriptions.cancel(stripeSubscriptionId);

    // Optional: also update locally right away so the UI feels snappier.
    await prisma.workspace.update({
      where: { id: workspace.id },
      data: {
        plan: "FREE",
        stripeSubscriptionId: null,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error cancelling subscription / downgrading:", err);
    return new NextResponse("Failed to downgrade plan", { status: 500 });
  }
}
