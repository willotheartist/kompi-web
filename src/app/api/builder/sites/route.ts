// src/app/api/builder/sites/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeSlug, isNonEmptyString } from "@/lib/builder/types";
import { buildDefaultPages, buildDefaultSiteGlobals } from "@/lib/builder/default-site";
import { requireDbUser } from "@/lib/builder/authz";
import { ensureWorkspaceForUser } from "@/lib/builder/ensure-workspace";
import type { Prisma } from "@prisma/client";

export async function GET(_req: Request) {
  const auth = await requireDbUser();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const ws = await ensureWorkspaceForUser(auth.user.id);

  const sites = await prisma.builderSite.findMany({
    where: { workspaceId: ws.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      isPublished: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ sites });
}

export async function POST(req: Request) {
  const auth = await requireDbUser();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  // AUTO-CREATE workspace if missing (so Builder doesn't depend on manual workspace setup)
  const ws = await ensureWorkspaceForUser(auth.user.id);

  const body = (await req.json().catch(() => null)) as any;

  const nameRaw = (body?.name ?? "New Site") as string;
  const slugRaw = (body?.slug ?? nameRaw) as string;
  const includeWaitlistInsteadOfPricing = Boolean(body?.includeWaitlistInsteadOfPricing);

  const name = isNonEmptyString(nameRaw) ? nameRaw.trim() : "New Site";
  const slugBase = normalizeSlug(slugRaw);

  let slug = slugBase;
  for (let i = 0; i < 50; i++) {
    const exists = await prisma.builderSite.findUnique({ where: { slug } });
    if (!exists) break;
    slug = `${slugBase}-${i + 2}`;
  }

  const globals = buildDefaultSiteGlobals();
  const pages = buildDefaultPages(includeWaitlistInsteadOfPricing);

  const toJson = (v: unknown): Prisma.InputJsonValue => {
    return JSON.parse(JSON.stringify(v)) as Prisma.InputJsonValue;
  };

  const created = await prisma.builderSite.create({
    data: {
      workspaceId: ws.id,
      name,
      slug,
      brand: globals.brand ? toJson(globals.brand) : undefined,
      navigation: globals.navigation ? toJson(globals.navigation) : undefined,
      globalCta: globals.globalCta ? toJson(globals.globalCta) : undefined,
      pages: {
        create: pages.map((p) => ({
          type: p.type,
          title: p.title ?? null,
          path: p.path ?? null,
          order: p.order,
          sections: {
            create: p.sections.map((s) => ({
              type: s.type,
              variant: String(s.variant),
              isHidden: Boolean(s.isHidden),
              order: s.order,
              content: toJson(s.content),
            })),
          },
        })),
      },
    },
    select: { id: true, slug: true },
  });

  return NextResponse.json({ siteId: created.id, slug: created.slug }, { status: 201 });
}
