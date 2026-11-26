// src/app/dashboard/tools/pdf-to-image/page.tsx
import { Suspense } from "react";
import { DashboardPdfToImageClient } from "./PdfToImageClient";

export default function DashboardPdfToImagePage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            PDF to image
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your converter…
          </p>
        </div>
      }
    >
      <DashboardPdfToImageClient />
    </Suspense>
  );
}
