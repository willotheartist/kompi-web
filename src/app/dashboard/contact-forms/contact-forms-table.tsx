// src/app/dashboard/contact-forms/contact-forms-table.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { MessageSquare, Plus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type ContactFormRow = {
  id: string;
  title: string;
  createdAt: string;
  submissionsCount?: number | null;
};

type ApiListResponse = {
  forms: ContactFormRow[];
};

export function ContactFormsTable() {
  const [forms, setForms] = useState<ContactFormRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function loadForms() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/contact-forms");

      if (!res.ok) {
        let msg = "Failed to load contact forms";
        try {
          const body = await res.json();
          if (body?.error && typeof body.error === "string") {
            msg = body.error;
          }
        } catch {
          // ignore
        }
        setError(msg);
        setForms([]);
        return;
      }

      const json = (await res.json()) as ApiListResponse;
      setForms(Array.isArray(json.forms) ? json.forms : []);
    } catch (err) {
      console.error("loadForms error:", err);
      setError("Failed to load contact forms");
      setForms([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadForms();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    try {
      setCreating(true);
      setError(null);

      const res = await fetch("/api/contact-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        let msg = "Failed to create contact form";
        try {
          const body = await res.json();
          if (body?.error && typeof body.error === "string") {
            msg = body.error;
          }
        } catch {
          // ignore
        }
        setError(msg);
        return;
      }

      setNewTitle("");
      // refresh list
      await loadForms();
    } catch (err) {
      console.error("handleCreate error:", err);
      setError("Failed to create contact form");
    } finally {
      setCreating(false);
    }
  }

  const hasForms = (forms?.length ?? 0) > 0;

  return (
    <div className="wf-dashboard-main flex flex-col gap-5">
      {/* Header */}
      <header className="wf-dashboard-header border-b border-[color:var(--color-border)] pb-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
              Inbox
            </p>
            <h1 className="text-xl font-semibold text-[color:var(--color-text)]">
              Contact forms
            </h1>
            <p className="text-sm text-[color:var(--color-subtle)]">
              Collect enquiries from menus, K-Cards, and landing pages – then
              review them here.
            </p>
          </div>
        </div>
      </header>

      {/* Create form row */}
      <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 md:px-5 md:py-4">
        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-3 md:flex-row md:items-center"
        >
          <div className="flex-1 space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
              New contact form
            </label>
            <Input
              placeholder="e.g. General enquiries, Private dining, Brand collaborations"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={creating}
              className="text-sm"
            />
          </div>
          <div className="flex md:self-end">
            <Button
              type="submit"
              disabled={creating || !newTitle.trim()}
              className="w-full md:w-auto rounded-full px-4 text-sm font-semibold"
            >
              {creating ? "Creating…" : (
                <>
                  <Plus className="mr-1.5 h-4 w-4" />
                  Create form
                </>
              )}
            </Button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-xs text-red-500">
            {error}
          </p>
        )}
      </Card>

      {/* Forms list */}
      <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 md:px-5 md:py-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
              Forms
            </p>
            {!loading && (
              <p className="text-xs text-[color:var(--color-subtle)]">
                {forms?.length ?? 0}{" "}
                {(forms?.length ?? 0) === 1 ? "form" : "forms"} in this
                workspace.
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : !hasForms ? (
          <div className="rounded-2xl bg-[color:var(--color-bg)] px-4 py-6 text-sm text-[color:var(--color-subtle)]">
            You haven&apos;t created any contact forms yet. Use the box above to
            spin up your first one – perfect for private bookings, collab
            requests, or general enquiries.
          </div>
        ) : (
          <ul className="space-y-2">
            {forms!.map((form) => (
              <li
                key={form.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-[color:var(--color-bg)] px-4 py-3 text-sm"
              >
                <div className="flex flex-1 items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--color-accent-soft)]">
                    <MessageSquare className="h-4 w-4 text-[color:var(--color-text)]" />
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/contact-forms/${form.id}`}
                      className="block truncate font-medium text-[color:var(--color-text)] hover:underline"
                    >
                      {form.title || "Untitled form"}
                    </Link>
                    <p className="text-[11px] text-[color:var(--color-subtle)]">
                      Created{" "}
                      {form.createdAt
                        ? format(new Date(form.createdAt), "MMM d, yyyy")
                        : "—"}
                      {typeof form.submissionsCount === "number" && (
                        <> · {form.submissionsCount} submissions</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[color:var(--color-subtle)]">
                  <Link
                    href={`/dashboard/contact-forms/${form.id}`}
                    className="rounded-full bg-[color:var(--color-surface)] px-3 py-1 text-[11px] font-medium text-[color:var(--color-text)] hover:bg-[color:var(--color-accent-soft)]"
                  >
                    View inbox
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
