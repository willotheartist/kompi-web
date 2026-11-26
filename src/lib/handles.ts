import type { Prisma } from "@prisma/client";
import { ApiError } from "./api-errors";
export const RESERVED_HANDLES = new Set("api signin signup claim dashboard settings pricing pricingv2 links k k-cards cards qr-code qr-code-generator qr-menus kr-codes customers tools m p menu analytics reset-password forgot-password verify-email blog chat builder preview s r legal features solutions kompi-suite free-qr-code-generator krcode2 growth messages about contact support www app me admin health robots.txt sitemap.xml".split(" "));
export function normalizeHandle(raw: string) { return raw.trim().replace(/^@/, "").toLowerCase(); }
export function validateHandle(raw: string) {
  const handle = normalizeHandle(raw);
  if (!/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(handle)) throw new ApiError("Use 3–30 letters or numbers, with hyphens between them.");
  if (RESERVED_HANDLES.has(handle)) throw new ApiError("That address is reserved. Choose another.", 409);
  return handle;
}
export async function assertHandleAvailable(tx: Prisma.TransactionClient, handle: string, userId?: string, cardId?: string) {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`handle:${handle}`}))`;
  const [card, workspace, bio, menu] = await Promise.all([
    tx.kCard.findUnique({ where: { slug: handle }, select: { id: true } }),
    tx.workspace.findUnique({ where: { slug: handle }, select: { ownerId: true } }),
    tx.bioPage.findUnique({ where: { slug: handle }, select: { id: true } }),
    tx.menu.findUnique({ where: { slug: handle }, select: { id: true } }),
  ]);
  if ((card && card.id !== cardId) || (workspace && workspace.ownerId !== userId) || bio || menu) throw new ApiError("That address is already in use.", 409);
}
