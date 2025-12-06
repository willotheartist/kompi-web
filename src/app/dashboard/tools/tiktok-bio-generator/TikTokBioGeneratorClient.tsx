"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { TikTokBioGenerator } from "@/components/tools/TikTokBioGenerator";

function TikTokBioContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Draft TikTok bios with clear vibes, hooks, and CTAs while you&apos;re
          already inside your Kompi workspace.
        </p>
      </div>

      <TikTokBioGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardTikTokBioGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="TikTok bio generator">
        <TikTokBioContent />
      </DashboardLayout>
    </Suspense>
  );
}
