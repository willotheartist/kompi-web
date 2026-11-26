import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function GrowthSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <DashboardLayout>{children}</DashboardLayout>
    </Suspense>
  );
}
