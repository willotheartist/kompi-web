// src/app/dashboard/tools/utm-builder/UtmBuilderClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { UtmBuilder } from "@/components/tools/UtmBuilder";

function UtmBuilderContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Build clean campaign links while you&apos;re working on links, QR
          menus, and launches—without leaving your Kompi dashboard.
        </p>
      </div>

      <UtmBuilder variant="dashboard" />
    </div>
  );
}

export function DashboardUtmBuilderClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="UTM builder">
        <UtmBuilderContent />
      </DashboardLayout>
    </Suspense>
  );
}
