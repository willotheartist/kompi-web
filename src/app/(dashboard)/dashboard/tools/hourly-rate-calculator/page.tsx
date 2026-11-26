// src/app/dashboard/tools/hourly-rate-calculator/page.tsx
import { Suspense } from "react";
import { DashboardHourlyRateCalculatorClient } from "./HourlyRateCalculatorClient";

export default function DashboardHourlyRateCalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hourly rate calculator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your calculator…
          </p>
        </div>
      }
    >
      <DashboardHourlyRateCalculatorClient />
    </Suspense>
  );
}
