import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api-errors";

export const dynamic = "force-dynamic";

async function owned(id: string) {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) throw new ApiError("Workspace not found", 404);
  const discount = await prisma.storeDiscount.findFirst({ where: { id, workspaceId: workspace.id } });
  if (!discount) throw new ApiError("Discount not found", 404);
  return discount;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const d = await owned((await params).id);
    const { isActive } = z.object({ isActive: z.boolean() }).parse(await req.json());
    const discount = await prisma.storeDiscount.update({ where: { id: d.id }, data: { isActive } });
    return NextResponse.json({ discount });
  } catch (e) {
    return apiError(e);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const d = await owned((await params).id);
    await prisma.storeDiscount.delete({ where: { id: d.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
