// src/app/api/builder/sites/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSiteAccess } from "@/lib/builder/authz";
import { isNonEmptyString, normalizeSlug } from "@/lib/builder/types";

type RouteCtx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: RouteCtx) {
  const { id: siteId } = await ctx.params;

  const authz = await requireSiteAccess(siteId);
  if (!authz.ok)
    return NextResponse.json({ error: authz.message }, { status: authz.status });

  const site = await prisma.builderSite.findUnique({
    where: { id: siteId },
    include: {
      pages: {
        orderBy: { order: "asc" },
        include: { sections: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!site)
    return NextResponse.json({ error: "Site not found" }, { status: 404 });

  return NextResponse.json({ site });
}

export async function PATCH(req: Request, ctx: RouteCtx) {
  const { id: siteId } = await ctx.params;

  const authz = await requireSiteAccess(siteId);
  if (!authz.ok)
    return NextResponse.json({ error: authz.message }, { status: authz.status });

  const body = (await req.json().catch(() => null)) as unknown;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const data: Record<string, unknown> = {};

  if (typeof b.brand !== "undefined") data.brand = b.brand;
  if (typeof b.navigation !== "undefined") data.navigation = b.navigation;
  if (typeof b.globalCta !== "undefined") data.globalCta = b.globalCta;

  if (typeof b.name !== "undefined") {
    if (!isNonEmptyString(b.name)) {
      return NextResponse.json(
        { error: "name must be a non-empty string" },
        { status: 400 }
      );
    }
    data.name = b.name.trim();
  }

  if (typeof b.slug !== "undefined") {
    if (!isNonEmptyString(b.slug)) {
      return NextResponse.json(
        { error: "slug must be a non-empty string" },
        { status: 400 }
      );
    }

    const nextSlugBase = normalizeSlug(b.slug);

    const conflict = await prisma.builderSite.findFirst({
      where: { slug: nextSlugBase, NOT: { id: siteId } },
      select: { id: true },
    });

    if (conflict) {
      return NextResponse.json(
        { error: "slug already in use" },
        { status: 409 }
      );
    }

    data.slug = nextSlugBase;
  }

  const updated = await prisma.builderSite.update({
    where: { id: siteId },
    data,
    select: { id: true, name: true, slug: true, updatedAt: true },
  });

  return NextResponse.json({ site: updated });
}

export async function DELETE(_req: Request, ctx: RouteCtx) {
  const { id: siteId } = await ctx.params;

  const authz = await requireSiteAccess(siteId);
  if (!authz.ok)
    return NextResponse.json({ error: authz.message }, { status: authz.status });

  await prisma.builderSite.delete({ where: { id: siteId } });
  return NextResponse.json({ ok: true });
}
