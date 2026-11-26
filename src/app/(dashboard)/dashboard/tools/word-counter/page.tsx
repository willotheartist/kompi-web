// src/app/dashboard/tools/word-counter/page.tsx
import { Suspense } from "react";
import { DashboardWordCounterClient } from "./WordCounterClient";

export default function DashboardWordCounterPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Word counter
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your word counter…
          </p>
        </div>
      }
    >
      <DashboardWordCounterClient />
    </Suspense>
  );
}
