import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api-errors";
import { getStripe } from "@/lib/stripe";
import { appUrl } from "@/lib/urls";
import { ensureConnectAccount } from "@/lib/store-server";

export const dynamic = "force-dynamic";

/** Starts (or resumes) Stripe Express onboarding and returns the Stripe-hosted URL. */
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id);
    if (!workspace) throw new ApiError("Workspace not found", 404);
    const { country } = z.object({ country: z.string().length(2).toUpperCase().optional() }).parse(await req.json().catch(() => ({})));
    let accountId: string;
    try {
      accountId = await ensureConnectAccount(workspace, user.email, country);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (/connect/i.test(msg) && /sign(ed)? up|enable|platform/i.test(msg)) throw new ApiError("Payouts aren't switched on for Kompi yet. Please try again soon.", 503);
      throw e;
    }
    const link = await getStripe().accountLinks.create({
      account: accountId,
      type: "account_onboarding",
      refresh_url: appUrl("/dashboard/earn/payouts?refresh=1"),
      return_url: appUrl("/dashboard/earn/payouts?connected=1"),
    });
    return NextResponse.json({ url: link.url });
  } catch (e) {
    return apiError(e);
  }
}
