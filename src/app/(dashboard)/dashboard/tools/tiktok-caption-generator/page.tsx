import { Suspense } from "react";
import { DashboardTikTokCaptionGeneratorClient } from "./TikTokCaptionGeneratorClient";

export default function DashboardTikTokCaptionGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            TikTok caption generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your TikTok caption generator…
          </p>
        </div>
      }
    >
      <DashboardTikTokCaptionGeneratorClient />
    </Suspense>
  );
}
