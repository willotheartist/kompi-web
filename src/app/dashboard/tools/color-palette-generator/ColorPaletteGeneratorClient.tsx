"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";

function ColorPaletteGeneratorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Generate quick color palettes for banners, buttons, and sections without leaving your Kompi
          dashboard. Lock colors you like and keep shuffling the rest.
        </p>
      </div>

      <ColorPaletteGenerator variant="minimal" />
    </div>
  );
} // ✅ close the function

export default function DashboardColorPaletteGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Color palette generator">
        <ColorPaletteGeneratorContent />
      </DashboardLayout>
    </Suspense>
  );
}
