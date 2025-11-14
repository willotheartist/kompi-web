// src/app/analytics/page.tsx
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AnalyticsOverview } from "@/components/analytics/analytics-overview";
import { getAnalyticsOverviewForWorkspace } from "@/lib/analytics-overview";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";

export const dynamic = "force-dynamic";

type AnalyticsPageProps = {
  searchParams?: {
    workspaceId?: string;
  };
};

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, searchParams?.workspaceId ?? null);

  if (!workspace) {
    return (
      <DashboardLayout>
        <CreateWorkspaceEmpty />
      </DashboardLayout>
    );
  }

  const overview = await getAnalyticsOverviewForWorkspace({
    workspaceId: workspace.id,
  });

  return (
    <DashboardLayout>
      <AnalyticsOverview data={overview} />
    </DashboardLayout>
  );
}
