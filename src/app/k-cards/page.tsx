// src/app/k-cards/page.tsx
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import KCardsPage from "@/components/k-cards/KCardsPage";

export const dynamic = "force-dynamic";

export default function KCardsRoutePage() {
  return (
    <DashboardLayout>
      <KCardsPage />
    </DashboardLayout>
  );
}
