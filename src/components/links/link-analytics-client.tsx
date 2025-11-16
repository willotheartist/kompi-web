"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  BarChart3,
  MapPin,
  MousePointer2,
  Share2,
  QrCode,
  Link2,
  Pencil,
  Trash2,
} from "lucide-react";

export type LinkAnalyticsViewModel = {
  id: string;
  code: string | null;
  targetUrl: string;
  shortUrl: string | null;
  createdLabel: string;
  totalClicks: number;
  last7: number;
  last30: number;
  growth7: number;
  days: number;
  daily: { label: string; count: number }[];
  topReferrers: { label: string; count: number }[];
  devices: { label: string; count: number; pct: number }[];
};

type LinkAnalyticsClientProps = {
  vm: LinkAnalyticsViewModel;
};

export function LinkAnalyticsClient({ vm }: LinkAnalyticsClientProps) {
  const {
    id,
    code,
    targetUrl,
    shortUrl,
    createdLabel,
    totalClicks,
    last7,
    last30,
    growth7,
    days,
    daily,
    topReferrers,
    devices,
  } = vm;

  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();

  const displayShort = shortUrl ?? "Kompi link";

  async function handleShare() {
    const url = shortUrl ?? targetUrl;
    try {
      if (navigator.share) {
        await navigator.share({
          url,
          title: displayShort,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // ignore share errors
    }
  }

  function handleEdit() {
    router.push(`/links/${id}/edit`);
  }

  function handleConfirmDelete() {
    setDeleteOpen(true);
  }

  function handleCancelDelete() {
    setDeleteOpen(false);
  }

  function handleDelete() {
    startDeleteTransition(async () => {
      try {
        const res = await fetch(`/api/links/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          console.error("Failed to delete link");
          return;
        }
        setDeleteOpen(false);
        router.push("/links");
      } catch (error) {
        console.error("Error deleting link", error);
      }
    });
  }

  return (
    <main className="wf-dashboard-main w-full">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-5xl flex-col gap-6 pb-10 pt-6 md:gap-8 md:pb-12 md:pt-8">
        {/* Dashboard/PageHeader - breadcrumb row */}
        <div className="wf-dashboard-header flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/links"
              className="inline-flex items-center gap-2 text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
            <span className="inline-flex items-center gap-2 text-[color:var(--color-subtle)]">
              /
              <Link
                href="/links"
                className="text-[color:var(--color-text)] hover:underline underline-offset-4"
              >
                Links
              </Link>
            </span>
          </div>
        </div>

        {/* Summary header card */}
        <GlassCard className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-sm md:px-6 md:py-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* Left: title + URLs + meta */}
            <div className="min-w-0 flex-1 space-y-2">
              <h1 className="flex items-center gap-2 text-2xl font-semibold text-[color:var(--color-text)] md:text-3xl">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)]">
                  <Link2 className="h-5 w-5 text-[color:var(--color-text)]" />
                </span>
                <span className="truncate">{displayShort}</span>
              </h1>

              {shortUrl && (
                <p className="break-all text-sm text-[color:var(--color-accent)]">
                  {shortUrl}
                </p>
              )}

              <p className="break-all text-xs text-[color:var(--color-subtle)] md:text-sm">
                {targetUrl}
              </p>

              <div className="flex flex-wrap gap-3 text-[11px] text-[color:var(--color-subtle)] md:text-xs">
                <span className="inline-flex items-center gap-1">
                  <MousePointer2 className="h-3 w-3 opacity-70" />
                  Created: {createdLabel}
                </span>
                <span>Link ID: {id}</span>
                {code && <span>Code: {code}</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex w-full items-center justify-end gap-3 md:w-auto">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Edit link"
                className="h-8 w-8 rounded-full bg-transparent text-[color:var(--color-text)] hover:bg-[var(--color-accent-soft)]"
                onClick={handleEdit}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Share link"
                className="h-8 w-8 rounded-full bg-transparent text-[color:var(--color-text)] hover:bg-[var(--color-accent-soft)]"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>

              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Delete link"
                  className="h-8 w-8 rounded-full bg-transparent text-[color:var(--color-text)] hover:bg-[var(--color-accent-soft)]"
                  onClick={handleConfirmDelete}
                >
                  <Trash2 className="h-4 w-4 text-[color:var(--color-text)]" />
                </Button>

                <DialogContent className="max-w-sm rounded-3xl border border-[var(--color-border)] bg-[color:var(--color-surface)] p-6">
                  <DialogHeader>
                    <DialogTitle className="text-base font-semibold text-[color:var(--color-text)]">
                      Delete this link?
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm text-[color:var(--color-subtle)]">
                      This will permanently remove this Kompi link and all of
                      its analytics. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 rounded-full px-3 text-sm text-[color:var(--color-text)] hover:bg-[var(--color-accent-soft)]"
                      onClick={handleCancelDelete}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="h-8 rounded-full bg-[color:var(--color-accent)] px-4 text-sm font-semibold text-[color:var(--color-text)] hover:opacity-90"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting…" : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </GlassCard>

        {/* StatsRow */}
        <div className="wf-dashboard-stats-row grid gap-4 md:grid-cols-4">
          <GlassCard className="flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
            <p className="flex items-center gap-1 text-xs text-[color:var(--color-subtle)]">
              Total clicks
              <BarChart3 className="h-3 w-3 opacity-70" />
            </p>
            <p className="mt-1 text-2xl font-semibold text-[color:var(--color-text)]">
              {totalClicks}
            </p>
            <p className="mt-1 text-[10px] text-[color:var(--color-subtle)]">
              All-time engagements on this Kompi link.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
            <p className="text-xs text-[color:var(--color-subtle)]">
              Last 7 days
            </p>
            <p className="mt-1 text-2xl font-semibold text-[color:var(--color-text)]">
              {last7}
            </p>
            <p className="mt-1 text-[10px] text-[color:var(--color-subtle)]">
              {growth7 > 0
                ? `+${growth7}% vs previous 7 days`
                : growth7 < 0
                ? `${growth7}% vs previous 7 days`
                : "No change vs previous 7 days"}
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
            <p className="text-xs text-[color:var(--color-subtle)]">
              Last 30 days
            </p>
            <p className="mt-1 text-2xl font-semibold text-[color:var(--color-text)]">
              {last30}
            </p>
            <p className="mt-1 text-[10px] text-[color:var(--color-subtle)]">
              Rolling 30-day performance snapshot.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
            <p className="text-xs text-[color:var(--color-subtle)]">
              KR / QR ready
            </p>
            <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-[color:var(--color-text)]">
              <QrCode className="h-4 w-4 text-[color:var(--color-text)]" />
              Use with Kompi Codes™
            </p>
            <p className="mt-1 text-[10px] text-[color:var(--color-subtle)]">
              Generate branded Kompi Codes™ from this link in one click.
            </p>
          </GlassCard>
        </div>

        {/* Engagement over time - Data block */}
        <GlassCard className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 md:px-6 md:py-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                Engagements over time
              </p>
              <h2 className="text-base font-semibold text-[color:var(--color-text)]">
                Clicks across the last {days} days
              </h2>
            </div>
          </div>

          <div className="mt-4">
            {daily.length === 0 ? (
              <p className="text-sm text-[color:var(--color-subtle)]">
                No clicks yet. Share your link to start seeing activity.
              </p>
            ) : (
              <div className="flex h-40 items-end gap-2 md:h-48">
                {daily.map((d) => (
                  <div
                    key={d.label}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <div className="h-full w-full overflow-hidden rounded-full bg-[var(--color-bg)]">
                      <div
                        className="w-full rounded-full bg-[var(--color-accent)]"
                        style={{
                          height: `${
                            totalClicks ? (d.count / totalClicks) * 100 : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-[color:var(--color-subtle)]">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>

        {/* Bottom: referrers + devices */}
        <div className="grid gap-4 md:grid-cols-2">
          <GlassCard className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 md:px-6 md:py-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                  Top referrers
                </p>
                <h3 className="text-base font-semibold text-[color:var(--color-text)]">
                  Where people are clicking from
                </h3>
              </div>
            </div>
            {topReferrers.length === 0 ? (
              <p className="text-sm text-[color:var(--color-subtle)]">
                No referrer data yet. Share your Kompi link to start seeing
                sources.
              </p>
            ) : (
              <ul className="space-y-2 text-sm text-[color:var(--color-text)]">
                {topReferrers.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--color-bg)] px-3 py-2"
                  >
                    <span className="truncate">
                      {r.label === "Direct" ? "Direct / Unknown" : r.label}
                    </span>
                    <span className="text-xs text-[color:var(--color-accent)]">
                      {r.count} clicks
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>

          <GlassCard className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 md:px-6 md:py-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                  Devices
                </p>
                <h3 className="text-base font-semibold text-[color:var(--color-text)]">
                  How people are visiting
                </h3>
              </div>
              <MapPin className="h-4 w-4 text-[color:var(--color-subtle)]" />
            </div>
            {devices.length === 0 ? (
              <p className="text-sm text-[color:var(--color-subtle)]">
                No device data yet. We&apos;ll show distribution once this link
                receives traffic.
              </p>
            ) : (
              <div className="space-y-2 text-sm text-[color:var(--color-text)]">
                {devices.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex flex-1 items-center gap-2">
                      <span className="w-20 text-[color:var(--color-text)]">
                        {d.label}
                      </span>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[var(--color-bg)]">
                        <div
                          className="h-full rounded-full bg-[var(--color-accent)]"
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-[color:var(--color-subtle)]">
                      {d.count} · {d.pct}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
