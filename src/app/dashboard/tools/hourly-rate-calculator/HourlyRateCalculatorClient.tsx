// src/app/dashboard/tools/hourly-rate-calculator/HourlyRateCalculatorClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { HourlyRateCalculator } from "@/components/tools/HourlyRateCalculator";

function HourlyRateCalculatorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Sense–check new rates or scenario–plan different income goals while
          you&apos;re already working on clients and campaigns in Kompi.
        </p>
      </div>

      <HourlyRateCalculator variant="dashboard" />
    </div>
  );
}

export function DashboardHourlyRateCalculatorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Hourly rate calculator">
        <HourlyRateCalculatorContent />
      </DashboardLayout>
    </Suspense>
  );
}
