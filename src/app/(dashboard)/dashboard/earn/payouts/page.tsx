import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { storeFeePercent } from "@/lib/store";
import { syncConnectAccount } from "@/lib/store-server";
import { PayoutsClient } from "@/components/store/payouts-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Payouts" };

export default async function PayoutsPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) return null;
  let status = { chargesEnabled: workspace.connectChargesEnabled, detailsSubmitted: workspace.connectDetailsSubmitted };
  if (workspace.stripeConnectAccountId && !workspace.connectChargesEnabled) {
    try {
      const s = await syncConnectAccount(workspace.stripeConnectAccountId);
      status = { chargesEnabled: s.connectChargesEnabled, detailsSubmitted: s.connectDetailsSubmitted };
    } catch {}
  }
  const paid = await prisma.order.aggregate({ where: { workspaceId: workspace.id, status: "PAID" }, _sum: { amountCents: true, feeCents: true }, _count: { _all: true } });
  return (
    <PayoutsClient
      started={Boolean(workspace.stripeConnectAccountId)}
      chargesEnabled={status.chargesEnabled}
      detailsSubmitted={status.detailsSubmitted}
      currency={workspace.storeCurrency}
      plan={workspace.plan}
      feePercent={storeFeePercent(workspace.plan)}
      earnedCents={(paid._sum.amountCents ?? 0) - (paid._sum.feeCents ?? 0)}
      sales={paid._count._all}
    />
  );
}
