import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";
import { CreateLinkPage } from "@/components/links/create-link-page";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewLinkPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);

  if (!workspace) {
    return (
      <DashboardLayout>
        <CreateWorkspaceEmpty />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <CreateLinkPage workspaceId={workspace.id} />
    </DashboardLayout>
  );
}
