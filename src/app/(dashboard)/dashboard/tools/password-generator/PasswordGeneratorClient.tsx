// src/app/dashboard/tools/password-generator/PasswordGeneratorClient.tsx
"use client";

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import PasswordGenerator from "@/components/tools/PasswordGenerator";

export function DashboardPasswordGeneratorClient() {
  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Password generator
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate strong, unique passwords right inside your Kompi workspace.
        </p>
        <div className="mt-6">
          <PasswordGenerator variant="dashboard" />
        </div>
      </div>
    </DashboardLayout>
  );
}
