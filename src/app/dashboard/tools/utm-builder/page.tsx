// src/app/dashboard/tools/utm-builder/page.tsx
import { Suspense } from "react";
import { DashboardUtmBuilderClient } from "./UtmBuilderClient";

export default function DashboardUtmBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            UTM builder
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your UTM builder…
          </p>
        </div>
      }
    >
      <DashboardUtmBuilderClient />
    </Suspense>
  );
}
