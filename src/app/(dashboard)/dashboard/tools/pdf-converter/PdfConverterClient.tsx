// src/app/dashboard/tools/pdf-converter/PdfConverterClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { PdfConverter } from "@/components/tools/PdfConverter";

function PdfConverterContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Turn menus, guides, and resources into trackable Kompi links while
          you&apos;re already working on campaigns, QR menus, and link pages.
        </p>
      </div>

      <PdfConverter variant="dashboard" />
    </div>
  );
}

export function DashboardPdfConverterClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="PDF link converter">
        <PdfConverterContent />
      </DashboardLayout>
    </Suspense>
  );
}
