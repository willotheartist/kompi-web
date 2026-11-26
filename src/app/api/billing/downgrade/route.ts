import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { requireUser } from "@/lib/auth";
import { billingWorkspace, syncSubscription } from "@/lib/billing";
import { ApiError, apiError } from "@/lib/api-errors";
export async function POST() {
  try {
    const user = await requireUser();
    const workspace = await billingWorkspace(user.id);
    if (!workspace.stripeSubscriptionId) throw new ApiError("No active subscription.", 400);
    await getStripe().subscriptions.update(workspace.stripeSubscriptionId, { cancel_at_period_end: true });
    await syncSubscription(workspace.stripeSubscriptionId, workspace.id);
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
