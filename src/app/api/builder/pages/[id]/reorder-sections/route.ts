// src/app/api/builder/pages/[id]/reorder-sections/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/builder/authz";

type RouteCtx = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: RouteCtx) {
  const { id: pageId } = await ctx.params;

  const auth = await requireSessionUser();
  if (!auth.ok)
    return NextResponse.json({ error: auth.message }, { status: auth.status });

  // verify access
  const page = await prisma.builderPage.findFirst({
    where: { id: pageId, site: { workspace: { ownerId: auth.userId } } },
    select: { id: true },
  });
  if (!page)
    return NextResponse.json({ error: "Page not found" }, { status: 404 });

  const body = (await req.json().catch(() => null)) as unknown;

  const orderedSectionIds =
    body &&
    typeof body === "object" &&
    Array.isArray((body as { orderedSectionIds?: unknown }).orderedSectionIds)
      ? ((body as { orderedSectionIds: unknown[] }).orderedSectionIds as unknown[])
      : null;

  if (
    !orderedSectionIds ||
    orderedSectionIds.some((x) => typeof x !== "string")
  ) {
    return NextResponse.json(
      { error: "orderedSectionIds must be an array of strings" },
      { status: 400 }
    );
  }

  const ordered = orderedSectionIds as string[];

  // ensure all belong to this page
  const sections = await prisma.builderSection.findMany({
    where: { pageId },
    select: { id: true },
  });

  const set = new Set(sections.map((s) => s.id));
  for (const id of ordered) {
    if (!set.has(id)) {
      return NextResponse.json(
        { error: "orderedSectionIds contains invalid section id" },
        { status: 400 }
      );
    }
  }

  await prisma.$transaction(
    ordered.map((id, idx) =>
      prisma.builderSection.update({
        where: { id },
        data: { order: idx },
      })
    )
  );

  return NextResponse.json({ ok: true });
}
