// src/lib/builder/authz.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Kompi Builder MUST use a real DB user id (User.id).
 * Your NextAuth session may not include the DB id, or it may include a provider id.
 * This helper resolves (or creates) the DB User row and returns its id.
 */
export async function requireDbUser() {
  const session = await getServerSession(authOptions);

  const sessionUser = session?.user as any | undefined;
  const sessionEmail: string | null =
    typeof sessionUser?.email === "string" && sessionUser.email.trim().length > 0
      ? sessionUser.email.trim().toLowerCase()
      : null;

  const sessionId: string | null =
    typeof sessionUser?.id === "string" && sessionUser.id.trim().length > 0 ? sessionUser.id.trim() : null;

  if (!sessionEmail && !sessionId) {
    return { ok: false as const, status: 401 as const, message: "Unauthorized" };
  }

  // 1) If session contains an id, verify it exists in DB (it might be a provider id, not our User.id)
  if (sessionId) {
    const byId = await prisma.user.findUnique({
      where: { id: sessionId },
      select: { id: true, email: true, name: true, image: true },
    });
    if (byId) return { ok: true as const, user: byId };
  }

  // 2) If session has email, use it (most reliable)
  if (sessionEmail) {
    const existing = await prisma.user.findUnique({
      where: { email: sessionEmail },
      select: { id: true, email: true, name: true, image: true },
    });

    if (existing) return { ok: true as const, user: existing };

    // 3) As a last resort, create a DB user row so foreign keys work.
    // This is safe because email is unique, and aligns with your schema requirement.
    const created = await prisma.user.create({
      data: {
        email: sessionEmail,
        name: typeof sessionUser?.name === "string" ? sessionUser.name : null,
        image: typeof sessionUser?.image === "string" ? sessionUser.image : null,
        marketingOptIn: false,
      },
      select: { id: true, email: true, name: true, image: true },
    });

    return { ok: true as const, user: created };
  }

  return { ok: false as const, status: 401 as const, message: "Unauthorized" };
}

export async function requireSessionUser() {
  // Backwards-compatible wrapper (returns just id) for routes already calling it.
  const res = await requireDbUser();
  if (!res.ok) return res;
  return { ok: true as const, userId: res.user.id };
}

export async function requireWorkspaceOwner(workspaceId: string) {
  const userRes = await requireDbUser();
  if (!userRes.ok) return userRes;

  const ws = await prisma.workspace.findFirst({
    where: { id: workspaceId, ownerId: userRes.user.id },
    select: { id: true },
  });

  if (!ws) {
    return { ok: false as const, status: 403 as const, message: "Forbidden" };
  }

  return { ok: true as const, userId: userRes.user.id, workspaceId: ws.id };
}

export async function requireSiteAccess(siteId: string) {
  const userRes = await requireDbUser();
  if (!userRes.ok) return userRes;

  const site = await prisma.builderSite.findFirst({
    where: { id: siteId, workspace: { ownerId: userRes.user.id } },
    select: { id: true, workspaceId: true },
  });

  if (!site) {
    return { ok: false as const, status: 404 as const, message: "Site not found" };
  }

  return { ok: true as const, userId: userRes.user.id, siteId: site.id, workspaceId: site.workspaceId };
}
