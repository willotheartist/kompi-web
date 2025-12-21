import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
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

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const shortUrl = link.code ? `${base}/r/${link.code}` : null;

  return (
    <EditLinkForm
      id={link.id}
      initialTargetUrl={link.targetUrl}
      initialCode={link.code ?? ""}
      initialTitle={link.title ?? ""}
      initialIsActive={link.isActive ?? true}
      shortUrl={shortUrl}
    />
  );
}