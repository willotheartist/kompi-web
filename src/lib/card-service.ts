import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { ApiError } from "./api-errors";
import { getActiveWorkspace } from "./auth";
import { getPlanLimits, limitMessage } from "./plan-limits";
export async function findOwnedCard(userId: string, cardId?: string | null) {
  const card = await prisma.kCard.findFirst({ where: { userId, ...(cardId ? { id: cardId } : {}) }, orderBy: { createdAt: "asc" } });
  if (cardId && !card) throw new ApiError("Card not found.", 404);
  return card;
}
export async function createCard(userId: string, workspaceId?: string | null, data: Prisma.InputJsonObject = {}) {
  const workspace = await getActiveWorkspace(userId, workspaceId);
  if (!workspace) throw new ApiError("Workspace not found.", 404);
  return prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${workspace.id}))`;
    const count = await tx.kCard.count({ where: { workspaceId: workspace.id } });
    if (count >= getPlanLimits(workspace.plan).kCards) throw new ApiError(limitMessage("kCards", workspace.plan), 402);
    return tx.kCard.create({ data: { userId, workspaceId: workspace.id, isPublic: false, data } });
  });
}
