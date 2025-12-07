// src/components/dashboard/utm-builder-widget.tsx
"use client";

import * as React from "react";
import { UtmBuilder } from "@/components/tools/UtmBuilder";

export default function UtmBuilderWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick UTM builder
          </h2>
          <p className="text-xs text-muted-foreground">
            Paste a URL and add source, medium, and campaign in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <UtmBuilder variant="dashboard" />
      </div>
    </section>
  );
}
