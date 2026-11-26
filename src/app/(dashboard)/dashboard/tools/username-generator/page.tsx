// src/app/dashboard/tools/username-generator/page.tsx
import { Suspense } from "react";
import { DashboardUsernameGeneratorClient } from "./UsernameGeneratorClient";

export default function DashboardUsernameGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Username generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your username generator…
          </p>
        </div>
      }
    >
      <DashboardUsernameGeneratorClient />
    </Suspense>
  );
}
