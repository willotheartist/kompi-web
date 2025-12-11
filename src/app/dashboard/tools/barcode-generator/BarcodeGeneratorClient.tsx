"use client";

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { BarcodeGenerator } from "@/components/tools/BarcodeGenerator";

export function DashboardBarcodeGeneratorClient() {
  return (
    <DashboardLayout pageTitle="Barcode generator">
      <div className="max-w-2xl">
        <BarcodeGenerator />
      </div>
    </DashboardLayout>
  );
}
