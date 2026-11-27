import { prisma } from "./prisma";
import { productSetupIssues, type ProductTypeId } from "./store";

export async function loadProductsDashboard(workspaceId: string, connectReady: boolean) {
  const [products, totals] = await Promise.all([
    prisma.product.findMany({ where: { workspaceId, status: { not: "ARCHIVED" } }, orderBy: [{ createdAt: "desc" }] }),
    prisma.order.groupBy({ by: ["productId"], where: { workspaceId, status: { in: ["PAID", "FREE"] } }, _count: { _all: true }, _sum: { amountCents: true, feeCents: true } }),
  ]);
  const byProduct = new Map(totals.map((t) => [t.productId, t]));
  const rows = products.map((p) => {
    const t = byProduct.get(p.id);
    return {
      id: p.id,
      slug: p.slug,
      type: p.type as ProductTypeId,
      status: p.status,
      title: p.title,
      coverImage: p.coverImage,
      priceCents: p.priceCents,
      currency: p.currency,
      payWhatYouWant: p.payWhatYouWant,
      views: p.views,
      clicks: p.clicks,
      orders: t?._count._all ?? 0,
      earnedCents: (t?._sum.amountCents ?? 0) - (t?._sum.feeCents ?? 0),
      issues: productSetupIssues({ ...p, type: p.type as ProductTypeId }, connectReady),
      createdAt: p.createdAt.toISOString(),
    };
  });
  return {
    rows,
    stats: {
      views: rows.reduce((a, r) => a + r.views, 0),
      clicks: rows.reduce((a, r) => a + r.clicks, 0),
      orders: rows.reduce((a, r) => a + r.orders, 0),
      earnedCents: totals.reduce((a, t) => a + (t._sum.amountCents ?? 0) - (t._sum.feeCents ?? 0), 0),
    },
  };
}
