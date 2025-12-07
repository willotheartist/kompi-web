// src/app/dashboard/tools/image-to-pdf/ImageToPdfClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { ImageToPdf } from "@/components/tools/ImageToPdf";

function ImageToPdfContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Turn loose screenshots, menu pages, and product shots into a single
          PDF you can attach to Kompi links and QR menus.
        </p>
      </div>

      <ImageToPdf variant="dashboard" />
    </div>
  );
}

export function DashboardImageToPdfClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Image to PDF">
        <ImageToPdfContent />
      </DashboardLayout>
    </Suspense>
  );
}
