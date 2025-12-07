// src/components/dashboard/pdf-to-image-widget.tsx
"use client";

import * as React from "react";
import { PdfToImage } from "@/components/tools/PdfToImage";

export default function PdfToImageWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            PDF to image quick tool
          </h2>
          <p className="text-xs text-muted-foreground">
            Plan page exports as PNG or JPG without leaving the dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <PdfToImage variant="dashboard" />
      </div>
    </section>
  );
}
