import { prisma } from "@/lib/prisma";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  LinksListClient,
  LinkListItem,
} from "@/components/links/links-list-client";

export default async function Page() {
  const linksRaw = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const links: LinkListItem[] = linksRaw.map((link) => {
    const code = link.code ?? null;
    const shortUrl = code ? `${base}/r/${code}` : null;

    const createdLabel = link.createdAt
      ? new Date(link.createdAt).toISOString().slice(0, 10)
      : "";

    return {
      id: link.id,
      code,
      shortUrl,
      targetUrl: link.targetUrl,
      // use existing `clicks` field from Prisma model
      clicks: link.clicks ?? 0,
      createdLabel,
      isActive: link.isActive ?? true,
    };
  });

  return (
    <DashboardLayout>
      <LinksListClient links={links} />
    </DashboardLayout>
  );
}
