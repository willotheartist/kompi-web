// src/components/dashboard/username-generator-widget.tsx
"use client";

import * as React from "react";
import { UsernameGenerator } from "@/components/tools/UsernameGenerator";

export default function UsernameGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick username generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Spin up clean, playful, or edgy usernames without leaving your
            dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <UsernameGenerator variant="dashboard" />
      </div>
    </section>
  );
}
