// src/app/s/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { renderPageFromSnapshot } from "../_publicRenderer";

export default async function PublicSiteHome({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const latest = await prisma.builderPublishedSnapshot.findFirst({
    where: { site: { slug } },
    orderBy: { createdAt: "desc" },
    select: { data: true },
  });

  if (!latest) notFound();

  return renderPageFromSnapshot(latest.data, "HOME");
}
