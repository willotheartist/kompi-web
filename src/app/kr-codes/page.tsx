import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import  KRCodesPage  from "@/components/kr-codes/KRCodesPage";

// Pattern: Page/KRCodes
export default function KRCodesRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading Kompi Codes…
        </div>
      }
    >
      <DashboardLayout>
        <KRCodesPage />
      </DashboardLayout>
    </Suspense>
  );
}
