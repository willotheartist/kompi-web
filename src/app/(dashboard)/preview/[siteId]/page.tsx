// src/app/(dashboard)/preview/[siteId]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { requireDbUser } from "@/lib/builder/authz";
import { renderPageFromSnapshot } from "@/app/s/_publicRenderer";

function buildDraftSnapshot(site: any) {
  return {
    id: site.id,
    slug: site.slug,
    brand: site.brand,
    navigation: site.navigation,
    globalCta: site.globalCta,
    pages: (site.pages ?? []).map((p: any) => ({
      id: p.id,
      type: p.type,
      title: p.title,
      path: p.path,
      order: p.order,
      isHidden: (p as any).isHidden ?? false,
      sections: (p.sections ?? []).map((s: any) => ({
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

export default async function DraftPreviewHome({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;

  const auth = await requireDbUser();
  if (!auth.ok) notFound();

  const site = await prisma.builderSite.findFirst({
    where: { id: siteId, workspace: { ownerId: auth.user.id } },
    include: {
      pages: {
        orderBy: { order: "asc" },
        include: { sections: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!site) notFound();

  const snapshot = buildDraftSnapshot(site);
  return renderPageFromSnapshot(snapshot, "HOME");
}
