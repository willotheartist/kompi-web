// src/app/dashboard/tools/image-to-pdf/page.tsx
import { Suspense } from "react";
import { DashboardImageToPdfClient } from "./ImageToPdfClient";

export default function DashboardImageToPdfPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Image to PDF
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your converter…
          </p>
        </div>
      }
    >
      <DashboardImageToPdfClient />
    </Suspense>
  );
}
