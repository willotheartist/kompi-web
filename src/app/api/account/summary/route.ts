import { NextResponse } from "next/server";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { planName, getPlanLimits } from "@/lib/plan-limits";
import { apiError } from "@/lib/api-errors";

// Small, cacheable-per-session summary used by the dashboard shell (plan badge + usage meter).
export async function GET() {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id);
    const [cards, krCodes, links] = workspace
      ? await Promise.all([
          prisma.kCard.count({ where: { workspaceId: workspace.id } }),
          prisma.kRCode.count({ where: { workspaceId: workspace.id } }),
          // QR destination links do not use the short-link allowance (matches billing page).
          prisma.link.count({ where: { workspaceId: workspace.id, qrCodes: { none: {} } } }),
        ])
      : [0, 0, 0];
    return NextResponse.json(
      {
        workspaceId: workspace?.id,
        plan: workspace?.plan,
        planName: planName(workspace?.plan),
        limits: getPlanLimits(workspace?.plan),
        usage: { kCards: cards, krCodes, links },
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (e) {
    return apiError(e);
  }
}
