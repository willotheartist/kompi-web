// src/components/subscribers/subscribers-table.tsx
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SubscriberRow = {
  id: string;
  email: string | null;
  phone: string | null;
  sourceSlug: string | null;
  sourceType: string | null;
  tags: string[];
  createdAt: string;
};

type ApiResponse = {
  subscribers: SubscriberRow[];
};

export function SubscribersTable() {
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [filtered, setFiltered] = useState<SubscriberRow[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/subscribers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          console.error("Failed to load subscribers");
          return;
        }

        const data = (await res.json()) as ApiResponse | SubscriberRow[];
        const list = Array.isArray(data)
          ? data
          : Array.isArray((data as ApiResponse).subscribers)
          ? (data as ApiResponse).subscribers
          : [];

        if (!cancelled) {
          setSubscribers(list);
          setFiltered(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFiltered(subscribers);
      return;
    }

    setFiltered(
      subscribers.filter((s) => {
        const email = s.email?.toLowerCase() ?? "";
        const phone = s.phone?.toLowerCase() ?? "";
        const src = s.sourceSlug?.toLowerCase() ?? "";
        const type = s.sourceType?.toLowerCase() ?? "";
        const tagsJoined = s.tags.join(",").toLowerCase();
        return (
          email.includes(q) ||
          phone.includes(q) ||
          src.includes(q) ||
          type.includes(q) ||
          tagsJoined.includes(q)
        );
      })
    );
  }, [query, subscribers]);

  const total = subscribers.length;

  return (
    <div className="wf-dashboard-main flex flex-col gap-4">
      <header className="wf-dashboard-header flex flex-col gap-3 border-b border-[color:var(--color-border)] pb-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[color:var(--color-text)]">
            Subscribers
          </h1>
          <p className="text-sm text-[color:var(--color-subtle)]">
            People who&apos;ve joined your lists from menus, K-Cards and bio
            pages.
          </p>
          <p className="text-xs text-[color:var(--color-subtle)]">
            {total.toLocaleString()} subscriber{total === 1 ? "" : "s"} total.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email, phone, source or tags…"
            className={cn(
              "h-9 w-full rounded-full border bg-white px-3 text-sm",
              "border-[color:var(--color-border)] text-[color:var(--color-text)]",
              "placeholder:text-[color:var(--color-subtle)]",
              "focus-visible:ring-1 focus-visible:ring-[color:var(--color-accent)] focus-visible:border-[color:var(--color-accent)]"
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 rounded-full px-3 text-xs"
            onClick={() => setQuery("")}
          >
            Clear
          </Button>
        </div>
      </header>

      <section className="wf-dashboard-content">
        <div className="overflow-x-auto rounded-3xl border border-[color:var(--color-border)] bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-[color:var(--color-bg)] text-xs uppercase text-[color:var(--color-subtle)]">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Source</th>
                <th className="px-4 py-2 text-left">Tags</th>
                <th className="px-4 py-2 text-right">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-xs text-[color:var(--color-subtle)]"
                  >
                    Loading subscribers…
                  </td>
                </tr>
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-xs text-[color:var(--color-subtle)]"
                  >
                    No subscribers found yet.
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t border-[color:var(--color-border)] text-[13px]"
                  >
                    <td className="max-w-[220px] truncate px-4 py-2 text-[color:var(--color-text)]">
                      {s.email || "—"}
                    </td>
                    <td className="max-w-[160px] truncate px-4 py-2 text-[color:var(--color-text)]">
                      {s.phone || "—"}
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-2 text-[color:var(--color-subtle)]">
                      {s.sourceType && (
                        <span className="mr-1 inline-flex rounded-full bg-[color:var(--color-bg)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[color:var(--color-subtle)]">
                          {s.sourceType}
                        </span>
                      )}
                      {s.sourceSlug || "—"}
                    </td>
                    <td className="px-4 py-2 text-[color:var(--color-subtle)]">
                      {s.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {s.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex rounded-full bg-[color:var(--color-bg)] px-2 py-0.5 text-[10px] text-[color:var(--color-subtle)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-right text-[color:var(--color-subtle)]">
                      {s.createdAt
                        ? format(new Date(s.createdAt), "MMM d, yyyy")
                        : "—"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
