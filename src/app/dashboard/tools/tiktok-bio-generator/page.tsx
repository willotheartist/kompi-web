import { Suspense } from "react";
import { DashboardTikTokBioGeneratorClient } from "./TikTokBioGeneratorClient";

export default function DashboardTikTokBioGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            TikTok bio generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your TikTok bio generator…
          </p>
        </div>
      }
    >
      <DashboardTikTokBioGeneratorClient />
    </Suspense>
  );
}
