"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import JsonFormatter from "@/components/tools/JsonFormatter";

function JsonFormatterContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Clean and validate JSON while you&apos;re debugging links, webhooks,
          and integrations—without leaving Kompi.
        </p>
      </div>

      <JsonFormatter variant="dashboard" />
    </div>
  );
}

export function DashboardJsonFormatterClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="JSON formatter">
        <JsonFormatterContent />
      </DashboardLayout>
    </Suspense>
  );
}
