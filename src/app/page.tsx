import { prisma } from "@/lib/prisma";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DashboardShell,
  LinkSummary,
} from "@/components/dashboard/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const linksRaw = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    take: 15,
  });

  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const links: LinkSummary[] = linksRaw.map((link: any) => {
    const code = link.code ?? null;

    const shortUrl =
      (link as any).shortUrl ??
      (code ? `${base}/r/${code}` : null);

    return {
      id: link.id,
      code,
      shortUrl,
      targetUrl: link.targetUrl,
      createdAt: link.createdAt.toISOString(),
      clicks: (link as any).clicks ?? null,
    };
  });

  return (
    <DashboardLayout>
      <DashboardShell links={links} />
    </DashboardLayout>
  );
}
