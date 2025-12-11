"use client";

import * as React from "react";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";

export default function ColorPaletteGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick color palettes
          </h2>
          <p className="text-xs text-muted-foreground">
            Shuffle and lock colors to shape on-brand palettes right from your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        <ColorPaletteGenerator variant="minimal" />
      </div>
    </section>
  );
}
