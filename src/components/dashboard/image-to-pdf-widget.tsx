// src/components/dashboard/image-to-pdf-widget.tsx
"use client";

import * as React from "react";
import { ImageToPdf } from "@/components/tools/ImageToPdf";

export default function ImageToPdfWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Image to PDF quick tool
          </h2>
          <p className="text-xs text-muted-foreground">
            Bundle image sets into a single PDF without leaving the dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <ImageToPdf variant="dashboard" />
      </div>
    </section>
  );
}
