"use client";

import * as React from "react";
import ProfitMarginCalculator from "@/components/tools/ProfitMarginCalculator";

export default function ProfitMarginCalculatorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick margin check
          </h2>
          <p className="text-xs text-muted-foreground">
            See profit, margin, and markup while you&apos;re editing pricing.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <ProfitMarginCalculator variant="dashboard" />
      </div>
    </section>
  );
}
