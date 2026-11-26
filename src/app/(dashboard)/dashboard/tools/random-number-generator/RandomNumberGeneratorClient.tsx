// src/app/dashboard/tools/random-number-generator/RandomNumberGeneratorClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { RandomNumberGenerator } from "@/components/tools/RandomNumberGenerator";

function RandomNumberGeneratorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Generate random numbers for giveaways, testing, spreadsheets, and
          quick decisions—without leaving your Kompi dashboard.
        </p>
      </div>

      <RandomNumberGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardRandomNumberGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Random number generator">
        <RandomNumberGeneratorContent />
      </DashboardLayout>
    </Suspense>
  );
}
