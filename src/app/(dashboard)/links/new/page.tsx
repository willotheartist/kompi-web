import { CreateWorkspaceEmpty } from "@/components/dashboard/create-workspace-empty";
import { CreateLinkPage } from "@/components/links/create-link-page";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    workspaceId?: string;
  }>;
};

export default async function NewLinkPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};

  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, sp.workspaceId ?? null);

  if (!workspace) {
    return <CreateWorkspaceEmpty />;
  }

  return <CreateLinkPage workspaceId={workspace.id} />;
}