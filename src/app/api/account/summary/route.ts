import { NextResponse } from "next/server";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { planName, getPlanLimits } from "@/lib/plan-limits";
import { apiError } from "@/lib/api-errors";
export async function GET() { try { const user = await requireUser(); const workspace = await getActiveWorkspace(user.id); return NextResponse.json({ workspaceId: workspace?.id, plan: workspace?.plan, planName: planName(workspace?.plan), limits: getPlanLimits(workspace?.plan) }, { headers: { "Cache-Control": "private, no-store" } }); } catch(e) { return apiError(e); } }
