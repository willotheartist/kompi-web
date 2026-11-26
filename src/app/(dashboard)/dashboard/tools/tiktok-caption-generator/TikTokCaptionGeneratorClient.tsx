"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { TikTokCaptionGenerator } from "@/components/tools/TikTokCaptionGenerator";

function TikTokCaptionContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Draft hooks, CTAs, and simple hashtag blocks for your TikToks without
          leaving your Kompi dashboard.
        </p>
      </div>

      <TikTokCaptionGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardTikTokCaptionGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="TikTok caption generator">
        <TikTokCaptionContent />
      </DashboardLayout>
    </Suspense>
  );
}
