import { SHORT_LINK_BASE_URL } from "@/lib/urls";
import { prisma } from "@/lib/prisma";
import { LinksListClient, type LinkListItem } from "@/components/links/links-list-client";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { getPlanLimits, planName } from "@/lib/plan-limits";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";

export const dynamic = "force-dynamic";
export const metadata = { title: "Short links" };

type PageProps = { searchParams?: Promise<{ workspaceId?: string }> };

const PAGE_SIZE = 20;

export default async function Page({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, sp.workspaceId ?? null);
  if (!workspace) return <CreateWorkspaceEmpty />;

  // QR destination links live in the QR library and don't count toward the short-link allowance
  // (matches /api/links pagination and billing).
  const where = { workspaceId: workspace.id, qrCodes: { none: {} } };
  const [rows, total] = await Promise.all([
    prisma.link.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: PAGE_SIZE,
      select: { id: true, code: true, targetUrl: true, clicks: true, createdAt: true, isActive: true, title: true },
    }),
    prisma.link.count({ where }),
  ]);

  const links: LinkListItem[] = rows.map((link) => ({
    id: link.id,
    code: link.code ?? null,
    shortUrl: link.code ? `${SHORT_LINK_BASE_URL}/r/${link.code}` : null,
    targetUrl: link.targetUrl,
    clicks: link.clicks ?? 0,
    createdLabel: link.createdAt.toISOString().slice(0, 10),
    isActive: link.isActive ?? true,
    title: link.title ?? null,
    createdAtIso: link.createdAt.toISOString(),
  }));

  const last = links[links.length - 1] ?? null;
  const initialCursor = last && total > links.length ? { before: last.createdAtIso, beforeId: last.id } : null;

  return (
    <LinksListClient
      links={links}
      workspaceId={workspace.id}
      initialCursor={initialCursor}
      pageSize={PAGE_SIZE}
      limit={getPlanLimits(workspace.plan).links}
      planName={planName(workspace.plan)}
      total={total}
      shortBase={SHORT_LINK_BASE_URL}
    />
  );
}
