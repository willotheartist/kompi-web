// src/components/dashboard/pdf-converter-widget.tsx
"use client";

import * as React from "react";
import { PdfConverter } from "@/components/tools/PdfConverter";

export default function PdfConverterWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick PDF link converter
          </h2>
          <p className="text-xs text-muted-foreground">
            Turn a PDF into a Kompi link without leaving your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <PdfConverter variant="dashboard" />
      </div>
    </section>
  );
}
