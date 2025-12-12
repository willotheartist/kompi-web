"use client";

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { BrandColorExtractor } from "@/components/tools/BrandColorExtractor";

export default function BrandColorExtractorClient() {
  return (
    <DashboardLayout pageTitle="Brand color extractor">
      <div className="max-w-3xl space-y-6">
        <p className="text-sm text-muted-foreground">
          Upload a logo, screenshot, or brand photo and Kompi will pull out the
          main colors as hex codes you can use across your links, QR menus, and
          landing pages.
        </p>
        <BrandColorExtractor />
      </div>
    </DashboardLayout>
  );
}
