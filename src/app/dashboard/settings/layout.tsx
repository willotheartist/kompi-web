import type { ReactNode } from "react";
import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

// Pattern: Shell/SettingsLayout
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading workspace settings...
        </div>
      }
    >
      <DashboardLayout>{children}</DashboardLayout>
    </Suspense>
  );
}
