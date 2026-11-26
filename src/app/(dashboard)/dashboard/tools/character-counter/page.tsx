// src/app/dashboard/tools/character-counter/page.tsx
import { Suspense } from "react";
import { DashboardCharacterCounterClient } from "./CharacterCounterClient";

export default function DashboardCharacterCounterPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Character counter
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Loading your character counter…
          </p>
        </div>
      }
    >
      <DashboardCharacterCounterClient />
    </Suspense>
  );
}
