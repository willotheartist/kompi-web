// src/app/dashboard/tools/username-generator/UsernameGeneratorClient.tsx
"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { UsernameGenerator } from "@/components/tools/UsernameGenerator";

function UsernameGeneratorContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-xl space-y-1">
        <p className="text-sm text-muted-foreground">
          Quickly generate usernames and social handles while you&apos;re
          working on links, QR menus, and campaigns—without leaving your Kompi
          dashboard.
        </p>
      </div>

      <UsernameGenerator variant="dashboard" />
    </div>
  );
}

export function DashboardUsernameGeneratorClient() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout pageTitle="Username generator">
        <UsernameGeneratorContent />
      </DashboardLayout>
    </Suspense>
  );
}
