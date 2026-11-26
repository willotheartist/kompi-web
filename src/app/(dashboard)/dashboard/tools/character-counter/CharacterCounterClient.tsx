// src/app/dashboard/tools/character-counter/CharacterCounterClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { CharacterCounter } from "@/components/tools/CharacterCounter";

function CharacterCounterContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Check character and word counts for social posts, ad copy, and meta
          descriptions while you&apos;re working on campaigns inside Kompi.
        </p>
      </div>

      <CharacterCounter variant="dashboard" />
    </div>
  );
}

export function DashboardCharacterCounterClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Character counter">
        <CharacterCounterContent />
      </DashboardLayout>
    </Suspense>
  );
}
