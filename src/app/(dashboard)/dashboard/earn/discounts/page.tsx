import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DiscountsClient } from "@/components/store/discounts-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Discounts" };

export default async function DiscountsPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) return null;
  const [discounts, products] = await Promise.all([
    prisma.storeDiscount.findMany({ where: { workspaceId: workspace.id }, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { workspaceId: workspace.id, status: { not: "ARCHIVED" }, type: { not: "LEAD_MAGNET" } }, select: { id: true, title: true }, orderBy: { createdAt: "desc" } }),
  ]);
  return (
    <DiscountsClient
      currency={workspace.storeCurrency}
      products={products}
      initial={discounts.map((d) => ({ ...d, expiresAt: d.expiresAt?.toISOString() ?? null, createdAt: d.createdAt.toISOString(), updatedAt: d.updatedAt.toISOString() }))}
    />
  );
}
