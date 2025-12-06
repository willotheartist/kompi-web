import { Suspense } from "react";
import { DashboardHashtagGeneratorClient } from "./HashtagGeneratorClient";

export default function DashboardHashtagGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hashtag generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your hashtag generator…
          </p>
        </div>
      }
    >
      <DashboardHashtagGeneratorClient />
    </Suspense>
  );
}
