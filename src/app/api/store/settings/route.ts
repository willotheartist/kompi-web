import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api-errors";
import { CURRENCIES } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id);
    if (!workspace) throw new ApiError("Workspace not found", 404);
    const { storeCurrency } = z.object({ storeCurrency: z.enum(CURRENCIES) }).parse(await req.json());
    await prisma.workspace.update({ where: { id: workspace.id }, data: { storeCurrency } });
    // Unsold products follow the store currency.
    await prisma.product.updateMany({ where: { workspaceId: workspace.id, orders: { none: {} } }, data: { currency: storeCurrency } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
