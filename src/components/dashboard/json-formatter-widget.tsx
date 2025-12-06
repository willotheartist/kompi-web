"use client";

import * as React from "react";
import JsonFormatter from "@/components/tools/JsonFormatter";

export default function JsonFormatterWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick JSON formatter
          </h2>
          <p className="text-xs text-muted-foreground">
            Paste a payload, format it, and copy it back into your tools.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <JsonFormatter variant="dashboard" />
      </div>
    </section>
  );
}
