"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import ProfitMarginCalculator from "@/components/tools/ProfitMarginCalculator";

function ProfitMarginCalculatorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          sanity-check profit, margin, and markup while you&apos;re editing offers,
          QR menus, and sales funnels in Kompi.
        </p>
      </div>

      <ProfitMarginCalculator variant="dashboard" />
    </div>
  );
}

export function DashboardProfitMarginCalculatorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Profit margin calculator">
        <ProfitMarginCalculatorContent />
      </DashboardLayout>
    </Suspense>
  );
}
