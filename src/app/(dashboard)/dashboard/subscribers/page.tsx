// src/app/dashboard/subscribers/page.tsx

import { Suspense } from "react";
import { SubscribersTable } from "@/components/subscribers/subscribers-table";

export const dynamic = "force-dynamic"; // optional, if you're already using something like this

export default function SubscribersPage() {
  return (
    <div className="wf-dashboard-content space-y-5">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-[color:var(--color-text)] md:text-xl">
            Subscribers
          </h1>
          <p className="text-sm text-[color:var(--color-subtle)]">
            Manage people who’ve subscribed through your Kompi flows.
          </p>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-6 text-sm text-[color:var(--color-subtle)]">
            Loading subscribers…
          </div>
        }
      >
        <SubscribersTable />
      </Suspense>
    </div>
  );
}
