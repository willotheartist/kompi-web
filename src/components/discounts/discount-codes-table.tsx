// src/components/discounts/discount-codes-table.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import type { DiscountCode } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

type DiscountCodeWithMeta = DiscountCode & {
  remainingDays?: number | null;
};

export function DiscountCodesTable() {
  const [codes, setCodes] = useState<DiscountCodeWithMeta[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, startCreateTransition] = useTransition();
  const [creatingCode, setCreatingCode] = useState("");
  const [creatingDescription, setCreatingDescription] = useState("");
  const [creatingSubscriberOnly, setCreatingSubscriberOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/discount-codes", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to load discount codes");
        }

        const body = await res.json();
        const raw: DiscountCode[] = body?.codes ?? body?.discounts ?? [];

        const withMeta: DiscountCodeWithMeta[] = raw.map((c) => {
          let remainingDays: number | null = null;
          if (c.expiresAt) {
            const now = new Date();
            const ms = c.expiresAt.getTime
              ? c.expiresAt.getTime() - now.getTime()
              : new Date(c.expiresAt as unknown as string).getTime() -
                now.getTime();
            remainingDays = Math.ceil(ms / (1000 * 60 * 60 * 24));
          }
          return { ...c, remainingDays };
        });

        if (!cancelled) {
          setCodes(withMeta);
        }
      } catch (err) {
        console.error("load discount codes error:", err);
        if (!cancelled) {
          setCodes([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const code = creatingCode.trim();

    if (!code) {
      toast.error("Add a discount code, e.g. SPRING20");
      return;
    }

    startCreateTransition(async () => {
      try {
        const res = await fetch("/api/discount-codes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            description: creatingDescription.trim() || undefined,
            isSubscriberOnly: creatingSubscriberOnly,
          }),
        });

        if (!res.ok) {
          let msg = "Could not create discount code.";
          try {
            const body = await res.json();
            if (body?.error && typeof body.error === "string") {
              msg = body.error;
            }
          } catch {
            // ignore
          }
          toast.error(msg);
          return;
        }

        const body = await res.json();
        const created: DiscountCode = body?.discount ?? body?.code ?? body;

        let remainingDays: number | null = null;
        if (created.expiresAt) {
          const now = new Date();
          const ms =
            new Date(created.expiresAt as unknown as string).getTime() -
            now.getTime();
          remainingDays = Math.ceil(ms / (1000 * 60 * 60 * 24));
        }

        setCodes((prev) => {
          const base = prev ?? [];
          const createdWithMeta: DiscountCodeWithMeta = {
            ...(created as DiscountCode),
            remainingDays,
          };
          return [createdWithMeta, ...base];
        });

        setCreatingCode("");
        setCreatingDescription("");
        setCreatingSubscriberOnly(false);
        toast.success("Discount code created");
      } catch (err) {
        console.error("create discount error:", err);
        toast.error("Could not create discount code.");
      }
    });
  }

  const hasCodes = (codes?.length ?? 0) > 0;

  return (
    <div className="wf-dashboard-content space-y-5">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-[color:var(--color-text)] md:text-xl">
            Discount codes
          </h1>
          <p className="text-sm text-[color:var(--color-subtle)]">
            Create simple discount codes you can drop into KCards, menus, and landing pages.
          </p>
        </div>
      </header>

      {/* Create inline form */}
      <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 md:p-5">
        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-3 md:flex-row md:items-end"
        >
          <div className="flex-1 space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
              Code
            </label>
            <Input
              value={creatingCode}
              onChange={(e) => setCreatingCode(e.target.value.toUpperCase())}
              placeholder="SPRING20"
              className="text-sm"
              disabled={isCreating}
            />
          </div>

          <div className="flex-1 space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
              Description (optional)
            </label>
            <Input
              value={creatingDescription}
              onChange={(e) => setCreatingDescription(e.target.value)}
              placeholder="20% off for email subscribers"
              className="text-sm"
              disabled={isCreating}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[color:var(--color-subtle)] md:self-end">
            <button
              type="button"
              onClick={() => setCreatingSubscriberOnly((v) => !v)}
              className={cn(
                "inline-flex h-5 w-9 items-center rounded-full border transition-colors",
                creatingSubscriberOnly
                  ? "border-transparent bg-[color:var(--color-accent)]"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-bg)]",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 rounded-full bg-[color:var(--color-surface)] transition-transform",
                  creatingSubscriberOnly ? "translate-x-4" : "translate-x-1",
                )}
              />
            </button>
            <span>Subscribers only</span>
          </div>

          <div className="md:self-end">
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full rounded-full px-4 text-sm font-semibold md:w-auto"
            >
              {isCreating ? "Creating…" : "Create code"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Table / list */}
      <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <div className="border-b border-[color:var(--color-border)] px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
            Codes
          </p>
        </div>

        {isLoading ? (
          <div className="px-4 py-6 text-sm text-[color:var(--color-subtle)]">
            Loading discount codes…
          </div>
        ) : !hasCodes ? (
          <div className="px-4 py-6 text-sm text-[color:var(--color-subtle)]">
            No discount codes yet. Create one above and drop it into your Kompi flows.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-[color:var(--color-border)] text-xs uppercase text-[color:var(--color-subtle)]">
                <tr>
                  <th className="py-2 px-4 text-left">Code</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Audience</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-right">Created</th>
                  <th className="py-2 px-4 text-right">Expires</th>
                </tr>
              </thead>
              <tbody>
                {codes!.map((c) => {
                  const createdAt =
                    c.createdAt instanceof Date
                      ? c.createdAt
                      : new Date(c.createdAt as unknown as string);

                  const expiresAt = c.expiresAt
                    ? c.expiresAt instanceof Date
                      ? c.expiresAt
                      : new Date(c.expiresAt as unknown as string)
                    : null;

                  const statusLabel = !c.isActive
                    ? "Inactive"
                    : expiresAt && expiresAt.getTime() < Date.now()
                    ? "Expired"
                    : "Active";

                  return (
                    <tr
                      key={c.id}
                      className="border-b border-[color:var(--color-border)] last:border-0"
                    >
                      <td className="py-2 px-4 font-semibold text-[color:var(--color-text)]">
                        {c.code}
                      </td>
                      <td className="py-2 px-4 text-[color:var(--color-subtle)]">
                        {c.description || "—"}
                      </td>
                      <td className="py-2 px-4 text-[color:var(--color-subtle)]">
                        {c.isSubscriberOnly ? "Subscribers only" : "Anyone"}
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                            statusLabel === "Active"
                              ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]"
                              : "bg-[color:var(--color-bg)] text-[color:var(--color-subtle)]",
                          )}
                        >
                          {statusLabel}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-right text-[color:var(--color-subtle)]">
                        {format(createdAt, "MMM d, yyyy")}
                      </td>
                      <td className="py-2 px-4 text-right text-[color:var(--color-subtle)]">
                        {expiresAt ? format(expiresAt, "MMM d, yyyy") : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
