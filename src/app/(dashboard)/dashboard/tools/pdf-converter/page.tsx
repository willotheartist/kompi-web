// src/app/dashboard/tools/pdf-converter/page.tsx
import { Suspense } from "react";
import { DashboardPdfConverterClient } from "./PdfConverterClient";

export default function DashboardPdfConverterPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            PDF link converter
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your PDF converter…
          </p>
        </div>
      }
    >
      <DashboardPdfConverterClient />
    </Suspense>
  );
}
