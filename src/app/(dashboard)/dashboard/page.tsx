import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { getDashboardOverview } from "@/lib/dashboard-overview";
import { Greeting, OverviewClient } from "@/components/dashboard/overview/overview-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Overview" };

export default async function DashboardPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  const data = await getDashboardOverview(user.id, workspace!);
  return (
    <>
      <Greeting name={user.name} />
      <OverviewClient data={data} />
    </>
  );
}
