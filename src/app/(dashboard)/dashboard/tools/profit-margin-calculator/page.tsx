import { Suspense } from "react";
import { DashboardProfitMarginCalculatorClient } from "./ProfitMarginCalculatorClient";

export default function DashboardProfitMarginCalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Profit margin calculator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your calculator…
          </p>
        </div>
      }
    >
      <DashboardProfitMarginCalculatorClient />
    </Suspense>
  );
}
