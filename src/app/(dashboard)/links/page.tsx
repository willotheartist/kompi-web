// src/app/(dashboard)/links/page.tsx
import { prisma } from "@/lib/prisma";
import {
  LinksListClient,
  type LinkListItem,
} from "@/components/links/links-list-client";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    workspaceId?: string;
  }>;
};

const PAGE_SIZE = 20;

export default async function Page({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};

  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, sp.workspaceId ?? null);

  // ✅ DO NOT wrap in DashboardLayout here — the (dashboard) layout already does that
  if (!workspace) {
    return <CreateWorkspaceEmpty />;
  }

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const rows = await prisma.link.findMany({
    where: { workspaceId: workspace.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: PAGE_SIZE,
    select: {
      id: true,
      code: true,
      targetUrl: true,
      clicks: true,
      createdAt: true,
      isActive: true,
      title: true,
    },
  });

  const links: LinkListItem[] = rows.map((link) => {
    const code = link.code ?? null;
    const shortUrl = code ? `${base}/r/${code}` : null;

    const createdLabel = link.createdAt
      ? link.createdAt.toISOString().slice(0, 10)
      : "";

    return {
      id: link.id,
      code,
      shortUrl,
      targetUrl: link.targetUrl,
      clicks: link.clicks ?? 0,
      createdLabel,
      isActive: link.isActive ?? true,
      title: link.title ?? null,
      createdAtIso: link.createdAt.toISOString(),
    };
  });

  const last = links[links.length - 1] ?? null;
  const initialCursor = last
    ? { before: last.createdAtIso, beforeId: last.id }
    : null;

  return (
    <LinksListClient
      links={links}
      workspaceId={workspace.id}
      initialCursor={initialCursor}
      pageSize={PAGE_SIZE}
    />
  );
}
