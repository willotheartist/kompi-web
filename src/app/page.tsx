import { prisma } from "@/lib/prisma";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DashboardShell,
  LinkSummary,
} from "@/components/dashboard/dashboard-shell";

export default async function DashboardPage() {
  const linksRaw = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    take: 15,
  });

  const links: LinkSummary[] = linksRaw.map((link) => ({
    id: link.id,
    code: link.code ?? null,
    shortUrl: (link as any).shortUrl ?? null,
    targetUrl: link.targetUrl,
    createdAt: link.createdAt.toISOString(),
    clicks: (link as any).clicks ?? null,
  }));

  return (
    <DashboardLayout>
      <DashboardShell links={links} />
    </DashboardLayout>
  );
}
