// src/components/dashboard/hourly-rate-calculator-widget.tsx
"use client";

import * as React from "react";
import { HourlyRateCalculator } from "@/components/tools/HourlyRateCalculator";

export default function HourlyRateCalculatorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick hourly rate check
          </h2>
          <p className="text-xs text-muted-foreground">
            Sense–check your minimum rate without leaving the dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <HourlyRateCalculator variant="dashboard" />
      </div>
    </section>
  );
}
