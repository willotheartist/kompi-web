import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { loadProductsDashboard } from "@/lib/store-dashboard";
import { storeHandle } from "@/lib/store-server";
import { storeFeePercent } from "@/lib/store";
import { ProductsClient } from "@/components/store/products-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Products" };

export default async function ProductsPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) return null;
  const [data, handle] = await Promise.all([loadProductsDashboard(workspace.id, workspace.connectChargesEnabled), storeHandle(workspace.id)]);
  return (
    <ProductsClient
      {...data}
      handle={handle}
      currency={workspace.storeCurrency}
      connect={{ ready: workspace.connectChargesEnabled, started: Boolean(workspace.stripeConnectAccountId) }}
      feePercent={storeFeePercent(workspace.plan)}
    />
  );
}
