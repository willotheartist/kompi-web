import { prisma } from "@/lib/prisma";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  LinksListClient,
  type LinkListItem,
} from "@/components/links/links-list-client";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: {
    workspaceId?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, searchParams?.workspaceId);

  if (!workspace) {
    return (
      <DashboardLayout>
        <CreateWorkspaceEmpty />
      </DashboardLayout>
    );
  }

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const rows = await prisma.link.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const links: LinkListItem[] = rows.map((link) => {
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
      clicks: link.clicks ?? 0,
      createdLabel,
      isActive: link.isActive ?? true,
    };
  });

  return (
    <DashboardLayout>
      <LinksListClient links={links} workspaceId={workspace.id} />
    </DashboardLayout>
  );
}
