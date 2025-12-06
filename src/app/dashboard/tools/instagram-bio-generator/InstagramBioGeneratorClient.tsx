"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { InstagramBioGenerator } from "@/components/tools/InstagramBioGenerator";

function Content() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground max-w-xl">
        Quickly generate clean, aesthetic, or playful Instagram bios without leaving your Kompi workflow.
      </p>

      <InstagramBioGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardInstagramBioGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Instagram bio generator">
        <Content />
      </DashboardLayout>
    </Suspense>
  );
}
