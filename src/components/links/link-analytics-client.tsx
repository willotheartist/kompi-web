"use client";

import Link from "next/link";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  BarChart3,
  MapPin,
  MousePointer2,
  Share2,
  QrCode,
  Link2,
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

export function LinkAnalyticsClient({ vm }: { vm: LinkAnalyticsViewModel }) {
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

  const handleCopy = () => {
    if (!shortUrl) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shortUrl).catch(() => {});
    }
  };

  // IMPORTANT:
  // No fake sidebar spacing here.
  // This component renders INSIDE <DashboardLayout>'s <main>,
  // so it should be full-width with standard padding from the layout.

  return (
    <div className="flex flex-col gap-6">
      {/* Back + breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/"
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
      <GlassCard className="border-white/10 bg-white/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-1">
            <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
              <Link2 className="h-6 w-6 text-cyan-400" />
              {shortUrl ?? "Kompi link"}
            </h1>
            {shortUrl && (
              <p className="text-sm text-cyan-300 break-all">
                {shortUrl}
              </p>
            )}
            <p className="text-xs md:text-sm text-slate-400 break-all">
              {targetUrl}
            </p>
            <div className="flex flex-wrap gap-4 text-[10px] md:text-xs text-slate-500 mt-1">
              <span>Created: {createdLabel}</span>
              <span>Link ID: {id}</span>
              {code && <span>Code: {code}</span>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-stretch gap-2 w-full md:w-auto md:min-w-[220px]">
            <div className="flex gap-2">
              {shortUrl && (
                <Button
                  type="button"
                  className="flex-1 rounded-2xl h-9 text-xs bg-white text-slate-900 hover:bg-slate-100"
                  onClick={handleCopy}
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copy link
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="rounded-2xl h-9 text-xs border-white/20 text-slate-100 bg-transparent hover:bg-white/5"
              >
                <Link href={targetUrl} target="_blank">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Visit
                </Link>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded-2xl h-8 text-[10px] border-white/15 text-slate-200 bg-transparent hover:bg-white/5"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-2xl h-8 text-[10px] border-white/15 text-slate-200 bg-transparent hover:bg-white/5"
              >
                <QrCode className="h-3 w-3 mr-1" />
                Create KR code
              </Button>
            </div>
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
        <div className="h-40 rounded-2xl bg-white/5 flex items-end gap-2 px-3 py-3">
          {daily.map((d) => (
            <div
              key={d.label}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className="w-full rounded-full bg-gradient-to-t from-[#22d3ee] via-[#4f46e5] to-[#a855f7]"
                style={{
                  height:
                    d.count === 0
                      ? "4px"
                      : `${8 + Math.min(d.count * 6, 90)}px`,
                }}
              />
              <span className="text-[8px] text-slate-500">
                {d.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-2">
          Based on recorded click events. Use the main Analytics view
          for workspace-wide reporting.
        </p>
      </GlassCard>

      {/* Referrers & Devices */}
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
            <MousePointer2 className="h-4 w-4 text-slate-400" />
          </div>
          {topReferrers.length === 0 ? (
            <p className="text-sm text-slate-500">
              No referrer data yet. Share your Kompi link to start
              seeing sources.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-slate-200">
              {topReferrers.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-3 py-2"
                >
                  <span className="truncate">
                    {r.label === "Direct"
                      ? "Direct / Unknown"
                      : r.label}
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
              No device data yet. We&apos;ll show distribution once this
              link receives traffic.
            </p>
          ) : (
            <div className="space-y-2 text-sm text-slate-200">
              {devices.map((d) => (
                <div
                  key={d.label}
                  className="flex flex-col gap-1 rounded-2xl bg-white/5 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <span>{d.label}</span>
                    <span className="text-xs text-cyan-300">
                      {d.pct}% ({d.count})
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] via-[#4f46e5] to-[#a855f7]"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
