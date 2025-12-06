// src/components/dashboard/random-number-generator-widget.tsx
"use client";

import * as React from "react";
import { RandomNumberGenerator } from "@/components/tools/RandomNumberGenerator";

export default function RandomNumberGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick random number generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Generate random numbers for giveaways, tests, and demos in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <RandomNumberGenerator variant="dashboard" />
      </div>
    </section>
  );
}
