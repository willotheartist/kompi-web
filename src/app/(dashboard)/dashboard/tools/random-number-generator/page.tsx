// src/app/dashboard/tools/random-number-generator/page.tsx
import { Suspense } from "react";
import { DashboardRandomNumberGeneratorClient } from "./RandomNumberGeneratorClient";

export default function DashboardRandomNumberGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Random number generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your random number generator…
          </p>
        </div>
      }
    >
      <DashboardRandomNumberGeneratorClient />
    </Suspense>
  );
}
