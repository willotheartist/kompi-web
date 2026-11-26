import DashboardLayout from "@/components/dashboard/dashboard-layout";
import NewQrMenuPage from "@/app/qr-menus/new/page";

export const dynamic = "force-dynamic";

export default function DashboardNewQrMenuPage() {
  return (
    <DashboardLayout>
      <NewQrMenuPage />
    </DashboardLayout>
  );
}
