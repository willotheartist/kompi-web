// src/components/dashboard/youtube-title-generator-widget.tsx
"use client";

import * as React from "react";
import { YoutubeTitleGenerator } from "@/components/tools/YoutubeTitleGenerator";

export default function YoutubeTitleGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick YouTube titles
          </h2>
          <p className="text-xs text-muted-foreground">
            Drop in a topic and get scroll-stopping title ideas.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <YoutubeTitleGenerator variant="dashboard" />
      </div>
    </section>
  );
}
