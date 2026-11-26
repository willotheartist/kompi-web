import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { billingWorkspace, syncSubscription } from "@/lib/billing";
import { getStripe } from "@/lib/stripe";
import { ApiError, apiError } from "@/lib/api-errors";
import { rateLimit } from "@/lib/rate-limit";
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    await rateLimit("billing-reconcile", user.id, 30, 3600);
    const { sessionId } = z.object({ sessionId: z.string().startsWith("cs_").max(255) }).parse(await req.json());
    const workspace = await billingWorkspace(user.id);
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.metadata?.workspaceId !== workspace.id || session.customer !== workspace.stripeCustomerId) throw new ApiError("Checkout does not belong to this workspace.", 403);
    const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
    if (session.status !== "complete" || !["paid", "no_payment_required"].includes(session.payment_status) || !subscriptionId) return NextResponse.json({ pending: true });
    await syncSubscription(subscriptionId, workspace.id);
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
