import { prisma } from "@/lib/prisma";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  LinksListClient,
  LinkListItem,
} from "@/components/links/links-list-client";

export default async function LinksPage() {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const linksRaw = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const items: LinkListItem[] = linksRaw.map((link) => {
    const code = link.code ?? null;
    const shortUrl = code ? `${base}/r/${code}` : null;
    const clicks =
      // if clicks column exists, use it; otherwise 0
      (link as unknown as { clicks?: number | null }).clicks ?? 0;

    return {
      id: link.id,
      code,
      shortUrl,
      targetUrl: link.targetUrl,
      createdLabel: link.createdAt.toISOString().slice(0, 10),
      clicks,
    };
  });

  return (
    <DashboardLayout>
      <LinksListClient links={items} />
    </DashboardLayout>
  );
}
