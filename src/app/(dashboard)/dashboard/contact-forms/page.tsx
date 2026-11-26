// src/app/dashboard/contact-forms/page.tsx

import { Suspense } from "react";
import { ContactFormsTable } from "./contact-forms-table";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function ContactFormsPage() {
  return (
    <div className="wf-dashboard-content space-y-5">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-[color:var(--color-text)] md:text-xl">
            Contact forms
          </h1>
          <p className="text-sm text-[color:var(--color-subtle)]">
            View and manage your Kompi contact forms and their submissions.
          </p>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-6 text-sm text-[color:var(--color-subtle)]">
            Loading contact forms…
          </div>
        }
      >
        <ContactFormsTable />
      </Suspense>
    </div>
  );
}
