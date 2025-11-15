import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { EditLinkForm } from "@/components/links/edit-link-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!id) notFound();

  const user = await requireUser();

  const link = await prisma.link.findFirst({
    where: {
      id,
      workspace: {
        ownerId: user.id,
      },
    },
  });

  if (!link) notFound();

  return (
    <DashboardLayout>
      <EditLinkForm
        id={link.id}
        initialTargetUrl={link.targetUrl}
        initialCode={link.code ?? ""}
      />
    </DashboardLayout>
  );
}
