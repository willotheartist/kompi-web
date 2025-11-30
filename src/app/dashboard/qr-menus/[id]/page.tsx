// src/app/dashboard/qr-menus/[id]/page.tsx
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import EditQrMenuPage from "@/app/qr-menus/[id]/page";

export const dynamic = "force-dynamic";

export default function DashboardEditQrMenuPage() {
  return (
    <DashboardLayout>
      <EditQrMenuPage />
    </DashboardLayout>
  );
}
