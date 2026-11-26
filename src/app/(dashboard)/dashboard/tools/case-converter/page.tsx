// src/app/dashboard/tools/case-converter/page.tsx
import { Suspense } from "react";
import { DashboardCaseConverterClient } from "./CaseConverterClient";

export default function DashboardCaseConverterPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Case converter
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your case converter…
          </p>
        </div>
      }
    >
      <DashboardCaseConverterClient />
    </Suspense>
  );
}
