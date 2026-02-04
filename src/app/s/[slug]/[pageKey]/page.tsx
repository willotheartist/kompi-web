// src/app/s/[slug]/[pageKey]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { renderPageKeyFromSnapshot } from "../../_publicRenderer";

export default async function PublicSitePage({
  params,
}: {
  params: Promise<{ slug: string; pageKey: string }>;
}) {
  const { slug, pageKey } = await params;

  const latest = await prisma.builderPublishedSnapshot.findFirst({
    where: { site: { slug } },
    orderBy: { createdAt: "desc" },
    select: { data: true },
  });

  if (!latest) notFound();

  // 404 if the page doesn't exist in the snapshot
  return renderPageKeyFromSnapshot(latest.data, pageKey);
}
