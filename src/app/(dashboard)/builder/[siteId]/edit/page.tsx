// src/app/(dashboard)/builder/[siteId]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { requireDbUser } from "@/lib/builder/authz";
import BuilderEditorClient from "./BuilderEditorClient";

export default async function BuilderEditPage({ params }: { params: Promise<{ siteId: string }> }) {
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

  return <BuilderEditorClient site={site as any} />;
}
