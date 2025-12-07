// src/app/dashboard/tools/youtube-title-generator/YoutubeTitleGeneratorClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { YoutubeTitleGenerator } from "@/components/tools/YoutubeTitleGenerator";

function YoutubeTitleGeneratorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Turn rough ideas into ready-to-test YouTube titles while you&apos;re
          planning launches, playlists, and content batches.
        </p>
      </div>

      <YoutubeTitleGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardYoutubeTitleGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="YouTube title generator">
        <YoutubeTitleGeneratorContent />
      </DashboardLayout>
    </Suspense>
  );
}
