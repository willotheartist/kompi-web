import { Suspense } from "react";
import { DashboardInstagramCaptionGeneratorClient } from "./InstagramCaptionGeneratorClient";

export default function DashboardInstagramCaptionGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Instagram caption generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your caption generator…
          </p>
        </div>
      }
    >
      <DashboardInstagramCaptionGeneratorClient />
    </Suspense>
  );
}
