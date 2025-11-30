// src/app/api/billing/create-portal-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe, APP_URL } from "@/lib/stripe";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: NextRequest) {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id, null);

    if (!workspace) {
      return NextResponse.json(
        { error: "No active workspace found" },
        { status: 400 }
      );
    }

    // Refresh workspace to be sure we have latest Stripe fields
    const fresh = await prisma.workspace.findUnique({
      where: { id: workspace.id },
      select: {
        id: true,
        stripeCustomerId: true,
      },
    });

    if (!fresh?.stripeCustomerId) {
      return NextResponse.json(
        {
          error:
            "This workspace is not linked to a Stripe customer yet. " +
            "Contact support if you think this is a mistake.",
        },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: fresh.stripeCustomerId,
      return_url: `${APP_URL}/dashboard/settings/billing`,
    });

    return NextResponse.json({ url: portalSession.url }, { status: 200 });
  } catch (err) {
    console.error("create-portal-session error:", err);
    return NextResponse.json(
      { error: "Unable to create billing portal session" },
      { status: 500 }
    );
  }
}
