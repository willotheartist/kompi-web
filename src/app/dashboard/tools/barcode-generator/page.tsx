import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { BarcodeGenerator } from "@/components/tools/BarcodeGenerator";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Barcode generator">
        <div className="flex flex-col gap-6">
          <p className="max-w-xl text-sm text-muted-foreground">
            Turn any URL or text into a scannable barcode directly in your Kompi
            dashboard. Customize it and download an SVG ready for print or web.
          </p>
          <BarcodeGenerator />
        </div>
      </DashboardLayout>
    </Suspense>
  );
}
