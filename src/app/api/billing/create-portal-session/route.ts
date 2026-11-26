import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { APP_URL } from "@/lib/urls";
import { requireUser } from "@/lib/auth";
import { billingWorkspace } from "@/lib/billing";
import { ApiError, apiError } from "@/lib/api-errors";
export async function POST() {
  try {
    const user = await requireUser();
    const workspace = await billingWorkspace(user.id);
    if (!workspace.stripeCustomerId) throw new ApiError("There is no billing account for this workspace yet.", 400);
    const session = await getStripe().billingPortal.sessions.create({ customer: workspace.stripeCustomerId, return_url: `${APP_URL}/dashboard/settings/billing`, configuration: process.env.STRIPE_PORTAL_CONFIGURATION_ID || undefined });
    return NextResponse.json({ url: session.url });
  } catch (error) { return apiError(error); }
}
