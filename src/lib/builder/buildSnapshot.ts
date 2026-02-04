// src/lib/builder/buildSnapshot.ts
import { prisma } from "@/lib/prisma";

export async function buildSiteSnapshot(siteId: string) {
  const site = await prisma.builderSite.findUnique({
    where: { id: siteId },
    include: {
      pages: {
        orderBy: { order: "asc" },
        include: {
          sections: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!site) {
    throw new Error("Site not found");
  }

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
