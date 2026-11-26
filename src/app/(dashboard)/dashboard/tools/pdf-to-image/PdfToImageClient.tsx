// src/app/dashboard/tools/pdf-to-image/PdfToImageClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { PdfToImage } from "@/components/tools/PdfToImage";

function PdfToImageContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Export PDF pages as PNG or JPG assets while you&apos;re already
          planning campaigns, resources, and link pages inside Kompi.
        </p>
      </div>

      <PdfToImage variant="dashboard" />
    </div>
  );
}

export function DashboardPdfToImageClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="PDF to image">
        <PdfToImageContent />
      </DashboardLayout>
    </Suspense>
  );
}
