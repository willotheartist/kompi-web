// src/components/dashboard/character-counter-widget.tsx
"use client";

import * as React from "react";
import { CharacterCounter } from "@/components/tools/CharacterCounter";

export default function CharacterCounterWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick character counter
          </h2>
          <p className="text-xs text-muted-foreground">
            Paste copy and check character limits without leaving your
            dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <CharacterCounter variant="dashboard" />
      </div>
    </section>
  );
}
