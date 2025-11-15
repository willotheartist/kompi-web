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
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Back + breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/links"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white/80"
          >
            / Links
          </Link>
        </div>
      </div>

      {/* Summary header */}
      <GlassCard className="border-white/10 bg-white/5 px-5 py-4 md:px-6 md:py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* Left: title + URLs + meta */}
          <div className="flex-1 min-w-0 space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
              <Link2 className="h-6 w-6 text-cyan-400" />
              <span className="truncate">{displayShort}</span>
            </h1>

            {shortUrl && (
              <p className="text-sm text-cyan-300 break-all">{shortUrl}</p>
            )}

            <p className="text-xs md:text-sm text-slate-400 break-all">
              {targetUrl}
            </p>

            <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-slate-500">
              <span>Created: {createdLabel}</span>
              <span>Link ID: {id}</span>
              {code && <span>Code: {code}</span>}
            </div>
          </div>

          {/* Actions: simple white icons */}
          <div className="flex items-center justify-end gap-3 w-full md:w-auto">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Edit link"
              className="h-8 w-8 rounded-md bg-transparent text-slate-200 hover:text-white hover:bg-white/5"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Share link"
              className="h-8 w-8 rounded-md bg-transparent text-slate-200 hover:text-white hover:bg-white/5"
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
                className="h-8 w-8 rounded-md bg-transparent text-red-300 hover:text-red-200 hover:bg-red-500/10"
                onClick={handleConfirmDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <DialogContent className="max-w-sm rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-base font-semibold text-slate-50">
                    Delete this link?
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-slate-400">
                    This will permanently remove this Kompi link and all of its
                    analytics. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-8 px-3 rounded-full text-sm text-slate-300 hover:bg-white/5"
                    onClick={handleCancelDelete}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="h-8 px-4 rounded-full text-sm bg-red-500 text-white hover:bg-red-500/90"
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

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-4">
        <GlassCard className="py-4 px-4 flex flex-col justify-between">
          <p className="text-xs text-slate-400 flex items-center gap-1">
            Total clicks
            <BarChart3 className="h-3 w-3 text-slate-500" />
          </p>
          <p className="text-2xl font-semibold mt-1">{totalClicks}</p>
          <p className="text-[10px] text-slate-500 mt-1">
            All-time engagements on this Kompi link.
          </p>
        </GlassCard>

        <GlassCard className="py-4 px-4 flex flex-col justify-between">
          <p className="text-xs text-slate-400">Last 7 days</p>
          <p className="text-2xl font-semibold mt-1">{last7}</p>
          <p className="text-[10px] text-slate-500 mt-1">
            {growth7 > 0
              ? `+${growth7}% vs previous 7 days`
              : growth7 < 0
              ? `${growth7}% vs previous 7 days`
              : "No change vs previous 7 days"}
          </p>
        </GlassCard>

        <GlassCard className="py-4 px-4 flex flex-col justify-between">
          <p className="text-xs text-slate-400">Last 30 days</p>
          <p className="text-2xl font-semibold mt-1">{last30}</p>
          <p className="text-[10px] text-slate-500 mt-1">
            Rolling 30-day performance snapshot.
          </p>
        </GlassCard>

        <GlassCard className="py-4 px-4 flex flex-col justify-between">
          <p className="text-xs text-slate-400">KR / QR ready</p>
          <p className="text-lg font-semibold mt-1 flex items-center gap-2">
            <QrCode className="h-4 w-4 text-cyan-400" />
            Use with Kompi Codes™
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Generate branded Kompi Codes™ from this link in one click.
          </p>
        </GlassCard>
      </div>

      {/* Engagement over time */}
      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-[0.16em]">
              Engagements over time
            </p>
            <h2 className="text-base font-semibold">
              Clicks across the last {days} days
            </h2>
          </div>
        </div>

        <div className="mt-4">
          {daily.length === 0 ? (
            <p className="text-sm text-slate-500">
              No clicks yet. Share your link to start seeing activity.
            </p>
          ) : (
            <div className="flex items-end gap-2 h-40 md:h-48">
              {daily.map((d) => (
                <div
                  key={d.label}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div className="w-full bg-slate-900/70 rounded-full h-full overflow-hidden">
                    <div
                      className="bg-cyan-400/80 rounded-full w-full"
                      style={{
                        height: `${
                          totalClicks ? (d.count / totalClicks) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">{d.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Bottom: referrers + devices */}
      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-[0.16em]">
                Top referrers
              </p>
              <h3 className="text-base font-semibold">
                Where people are clicking from
              </h3>
            </div>
          </div>
          {topReferrers.length === 0 ? (
            <p className="text-sm text-slate-500">
              No referrer data yet. Share your Kompi link to start seeing
              sources.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-slate-200">
              {topReferrers.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-3 py-2"
                >
                  <span className="truncate">
                    {r.label === "Direct" ? "Direct / Unknown" : r.label}
                  </span>
                  <span className="text-xs text-cyan-300">
                    {r.count} clicks
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-[0.16em]">
                Devices
              </p>
              <h3 className="text-base font-semibold">
                How people are visiting
              </h3>
            </div>
            <MapPin className="h-4 w-4 text-slate-400" />
          </div>
          {devices.length === 0 ? (
            <p className="text-sm text-slate-500">
              No device data yet. We&apos;ll show distribution once this link
              receives traffic.
            </p>
          ) : (
            <div className="space-y-2 text-sm text-slate-200">
              {devices.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-20 text-slate-200">{d.label}</span>
                    <div className="w-28 h-1.5 rounded-full bg-slate-900/70 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] via-[#4f46e5] to-[#a855f7]"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {d.count} · {d.pct}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
