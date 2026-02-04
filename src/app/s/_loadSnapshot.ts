// src/app/s/_loadSnapshot.ts
import { prisma } from "@/lib/prisma";

function isDraftEnabled(searchParams: Record<string, any> | undefined) {
  const v = searchParams?.draft;
  if (v === "1" || v === "true") return true;
  if (Array.isArray(v) && (v[0] === "1" || v[0] === "true")) return true;
  return false;
}

/**
 * Draft snapshot = live DB state (pages + sections)
 * Published snapshot = latest builderPublishedSnapshot.data
 *
 * Public behavior:
 * - no ?draft => published only (404 if not published / no snapshot)
 * - ?draft=1 => draft (404 if no site)
 */
export async function loadSnapshotForRequest(opts: {
  slug: string;
  searchParams?: Record<string, any>;
}) {
  const { slug, searchParams } = opts;

  const draft = isDraftEnabled(searchParams);

  if (draft) {
    const site = await prisma.builderSite.findFirst({
      where: { slug },
      include: {
        pages: {
          orderBy: { order: "asc" },
          include: {
            sections: { orderBy: { order: "asc" } },
          },
        },
      },
    });

    if (!site) return null;

    return {
      id: site.id,
      slug: site.slug,
      brand: site.brand,
      navigation: site.navigation,
      globalCta: site.globalCta,
      pages: site.pages.map((p) => ({
        id: p.id,
        type: p.type,
        title: p.title,
        path: p.path,
        order: p.order,
        isHidden: (p as any).isHidden ?? false,
        sections: p.sections.map((s) => ({
          id: s.id,
          type: s.type,
          variant: s.variant,
          isHidden: s.isHidden,
          order: s.order,
          content: s.content,
        })),
      })),
    };
  }

  // Published mode (default)
  const site = await prisma.builderSite.findFirst({
    where: { slug },
    select: { id: true, isPublished: true },
  });

  if (!site?.isPublished) return null;

  const latest = await prisma.builderPublishedSnapshot.findFirst({
    where: { siteId: site.id },
    orderBy: { createdAt: "desc" }, // must exist on this model
    select: { data: true },
  });

  if (!latest?.data) return null;

  return latest.data as any;
}
