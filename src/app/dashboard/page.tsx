// src/app/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DashboardShell,
  type LinkSummary,
} from "@/components/dashboard/dashboard-shell";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    workspaceId?: string;
  }>;
};

type LinkRecord = Awaited<ReturnType<typeof prisma.link.findMany>>[number];

export default async function DashboardPage(props: PageProps) {
  const searchParams = (await props.searchParams) ?? {};

  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, searchParams.workspaceId ?? null);

  if (!workspace) {
    return (
      <DashboardLayout>
        <CreateWorkspaceEmpty />
      </DashboardLayout>
    );
  }

  const linksRaw = await prisma.link.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
    take: 15,
  });

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const links: LinkSummary[] = linksRaw.map((link: LinkRecord) => {
    const code = link.code ?? null;
    const shortUrl = code ? `${base}/r/${code}` : null;

    return {
      id: link.id,
      code,
      shortUrl,
      targetUrl: link.targetUrl,
      createdAt: link.createdAt.toISOString(),
      clicks: link.clicks ?? null,
    };
  });

  return (
    <DashboardLayout>
      <DashboardShell links={links} />
    </DashboardLayout>
  );
}
