// src/app/dashboard/tools/password-generator/page.tsx
import { Suspense } from "react";
import { DashboardPasswordGeneratorClient } from "./PasswordGeneratorClient";

export default function DashboardPasswordGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Password generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your password generator…
          </p>
        </div>
      }
    >
      <DashboardPasswordGeneratorClient />
    </Suspense>
  );
}
