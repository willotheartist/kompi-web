import { AnalyticsOverview } from "@/components/analytics/analytics-overview";
import { getAnalyticsOverviewForWorkspace } from "@/lib/analytics-overview";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";

export const dynamic = "force-dynamic";

type AnalyticsPageProps = {
  searchParams?: Promise<{
    workspaceId?: string;
  }>;
};

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const user = await requireUser();

  const sp = (await searchParams) ?? {};
  const workspaceId = sp.workspaceId ?? null;

  const workspace = await getActiveWorkspace(user.id, workspaceId);

  if (!workspace) {
    return <CreateWorkspaceEmpty />;
  }

  const overview = await getAnalyticsOverviewForWorkspace({
    workspaceId: workspace.id,
  });

  return <AnalyticsOverview data={overview} />;
}