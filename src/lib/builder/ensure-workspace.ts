// src/lib/builder/ensure-workspace.ts
import { prisma } from "@/lib/prisma";
import { normalizeSlug } from "@/lib/builder/types";

/**
 * Ensures a Workspace exists for a REAL DB user id (User.id).
 * IMPORTANT: Call this with userId coming from requireDbUser() (not raw session.user.id).
 */
export async function ensureWorkspaceForUser(userId: string) {
  const existing = await prisma.workspace.findFirst({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, slug: true },
  });

  if (existing) return existing;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });

  // If somehow user row is missing (shouldn't happen if requireDbUser() used), stop clearly.
  if (!user) {
    throw new Error(`ensureWorkspaceForUser: User not found for id=${userId}`);
  }

  const baseName = (user.name && user.name.trim()) || "My Workspace";
  const emailLocal = user.email ? user.email.split("@")[0] : "workspace";
  const baseSlug = normalizeSlug(emailLocal || "workspace");

  let slug = baseSlug;
  for (let i = 0; i < 50; i++) {
    const taken = await prisma.workspace.findUnique({ where: { slug } });
    if (!taken) break;
    slug = `${baseSlug}-${i + 2}`;
  }

  const created = await prisma.workspace.create({
    data: {
      ownerId: userId,
      name: baseName,
      slug,
    },
    select: { id: true, name: true, slug: true },
  });

  return created;
}
