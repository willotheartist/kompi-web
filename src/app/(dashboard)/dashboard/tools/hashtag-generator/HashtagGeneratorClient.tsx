"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { HashtagGenerator } from "@/components/tools/HashtagGenerator";

function HashtagGeneratorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Build reusable hashtag sets while you&apos;re already planning content,
          links, and QR menus inside your Kompi workspace.
        </p>
      </div>

      <HashtagGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardHashtagGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Hashtag generator">
        <HashtagGeneratorContent />
      </DashboardLayout>
    </Suspense>
  );
}
