// src/app/dashboard/support/layout.tsx

import type { ReactNode } from "react";
import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

// Pattern: Shell/SupportLayout
export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading support…
        </div>
      }
    >
      <DashboardLayout>{children}</DashboardLayout>
    </Suspense>
  );
}
