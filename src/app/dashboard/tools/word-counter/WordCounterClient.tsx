// src/app/dashboard/tools/word-counter/WordCounterClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { WordCounter } from "@/components/tools/WordCounter";

function WordCounterContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Quickly check word and character counts without leaving your Kompi
          workspace. Perfect for crafting bios, link descriptions, and social
          copy.
        </p>
      </div>

      <WordCounter />
    </div>
  );
}

export function DashboardWordCounterClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Word counter">
        <WordCounterContent />
      </DashboardLayout>
    </Suspense>
  );
}
