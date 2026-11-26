import { startOfDay, subDays } from "date-fns";
import { AnalyticsOverview } from "@/components/analytics/analytics-overview";
import { getAnalyticsOverviewForWorkspace } from "@/lib/analytics-overview";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { SHORT_LINK_BASE_URL } from "@/lib/urls";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";

export const dynamic = "force-dynamic";
export const metadata = { title: "Analytics" };

const RANGES = [7, 30, 90] as const;

type AnalyticsPageProps = { searchParams?: Promise<{ workspaceId?: string; range?: string }> };

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const user = await requireUser();
  const sp = (await searchParams) ?? {};
  const workspace = await getActiveWorkspace(user.id, sp.workspaceId ?? null);
  if (!workspace) return <CreateWorkspaceEmpty />;

  const range = RANGES.find((r) => String(r) === sp.range) ?? 30;
  const overview = await getAnalyticsOverviewForWorkspace({
    workspaceId: workspace.id,
    from: startOfDay(subDays(new Date(), range - 1)),
  });

  return <AnalyticsOverview key={range} data={overview} range={range} ranges={[...RANGES]} shortBase={SHORT_LINK_BASE_URL} />;
}
