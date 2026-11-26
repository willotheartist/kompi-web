import { Suspense } from "react";
import { DashboardJsonFormatterClient } from "./JsonFormatterClient";

export default function DashboardJsonFormatterPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            JSON formatter
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your JSON formatter…
          </p>
        </div>
      }
    >
      <DashboardJsonFormatterClient />
    </Suspense>
  );
}
