// src/app/dashboard/tools/youtube-title-generator/page.tsx
import { Suspense } from "react";
import { DashboardYoutubeTitleGeneratorClient } from "./YoutubeTitleGeneratorClient";

export default function DashboardYoutubeTitleGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            YouTube title generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your title generator…
          </p>
        </div>
      }
    >
      <DashboardYoutubeTitleGeneratorClient />
    </Suspense>
  );
}
