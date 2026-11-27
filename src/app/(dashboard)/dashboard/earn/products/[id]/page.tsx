import { notFound } from "next/navigation";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { storeFeePercent } from "@/lib/store";
import { productLookFromCard } from "@/lib/store-look";
import { ProductEditor } from "@/components/store/product-editor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit product" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) notFound();
  const product = await prisma.product.findFirst({ where: { id, workspaceId: workspace.id } });
  if (!product) notFound();
  const card = await prisma.kCard.findFirst({ where: { workspaceId: workspace.id }, orderBy: [{ isPublic: "desc" }, { createdAt: "asc" }], select: { slug: true, data: true } });
  const data = (card?.data ?? {}) as { title?: string; avatarDataUrl?: string | null; theme?: unknown };
  return (
    <ProductEditor
      initial={{
        ...product,
        booking: product.booking as unknown,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      }}
      look={productLookFromCard(data.theme)}
      seller={{ name: data.title || user.name || "You", avatar: data.avatarDataUrl ?? null, handle: card?.slug ?? null }}
      connectReady={workspace.connectChargesEnabled}
      feePercent={storeFeePercent(workspace.plan)}
      uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
    />
  );
}
