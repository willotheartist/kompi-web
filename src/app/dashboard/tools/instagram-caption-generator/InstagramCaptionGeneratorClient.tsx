"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { InstagramCaptionGenerator } from "@/components/tools/InstagramCaptionGenerator";

function CaptionGeneratorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Draft hooks, CTAs, and simple hashtag blocks for posts, Reels, and
          stories without leaving your Kompi dashboard.
        </p>
      </div>

      <InstagramCaptionGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardInstagramCaptionGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Instagram caption generator">
        <CaptionGeneratorContent />
      </DashboardLayout>
    </Suspense>
  );
}
