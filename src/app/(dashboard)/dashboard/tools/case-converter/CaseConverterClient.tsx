// src/app/dashboard/tools/case-converter/CaseConverterClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { CaseConverter } from "@/components/tools/CaseConverter";

function CaseConverterContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Quickly flip between UPPERCASE, lowercase, sentence case, and title
          case without leaving your Kompi dashboard. Ideal for bios, link
          descriptions, and microcopy.
        </p>
      </div>

      <CaseConverter />
    </div>
  );
}

export function DashboardCaseConverterClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Case converter">
        <CaseConverterContent />
      </DashboardLayout>
    </Suspense>
  );
}
