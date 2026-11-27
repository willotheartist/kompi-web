import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readBookingRules } from "@/lib/store";
import { reconcileOrder } from "@/lib/store-server";
import { OrdersClient } from "@/components/store/orders-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Orders" };

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);

export default async function OrdersPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) return null;
  // Settle recent card payments whose buyer closed the tab before returning.
  const pending = await prisma.order.findMany({ where: { workspaceId: workspace.id, status: "PENDING", createdAt: { gte: daysAgo(2) } }, include: { product: true, workspace: true }, take: 10 });
  await Promise.all(pending.map((o) => reconcileOrder(o).catch(() => o)));
  const orders = await prisma.order.findMany({
    where: { workspaceId: workspace.id, OR: [{ status: { not: "CANCELLED" } }, { createdAt: { gte: daysAgo(7) } }] },
    orderBy: { createdAt: "desc" },
    take: 500,
    include: { product: { select: { id: true, title: true, type: true, coverImage: true, booking: true, durationMin: true } } },
  });
  return (
    <OrdersClient
      orders={orders.map((o) => ({
        id: o.id,
        status: o.status,
        buyerEmail: o.buyerEmail,
        buyerName: o.buyerName,
        buyerNote: o.buyerNote,
        amountCents: o.amountCents,
        feeCents: o.feeCents,
        currency: o.currency,
        createdAt: o.createdAt.toISOString(),
        bookingStart: o.bookingStart?.toISOString() ?? null,
        timezone: o.product.type === "BOOKING" ? readBookingRules(o.product.booking).timezone : null,
        product: { id: o.product.id, title: o.product.title, type: o.product.type, coverImage: o.product.coverImage, durationMin: o.product.durationMin },
      }))}
    />
  );
}
