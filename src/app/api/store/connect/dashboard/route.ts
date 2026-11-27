import { NextResponse } from "next/server";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api-errors";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

/** One-time login link to the seller's Stripe Express dashboard (balance, payouts, refunds). */
export async function POST() {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id);
    if (!workspace?.stripeConnectAccountId) throw new ApiError("Set up payouts first.", 400);
    const link = await getStripe().accounts.createLoginLink(workspace.stripeConnectAccountId);
    return NextResponse.json({ url: link.url });
  } catch (e) {
    return apiError(e);
  }
}
