// src/components/analytics/analytics-overview.tsx
"use client";

import React from "react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  TrendingUp,
  MousePointerClick,
  Mail,
  Users,
  Flame,
  HelpCircle,
} from "lucide-react";

import type { AnalyticsOverviewData } from "@/lib/analytics-overview";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { instrumentSerif } from "@/lib/fonts";

type Props = {
  data: AnalyticsOverviewData;
};

const DEVICE_LABELS: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
  bot: "Bot",
  unknown: "Unknown",
};

const DEVICE_COLORS: string[] = [
  "var(--color-accent)",
  "var(--color-text)",
  "var(--color-accent-soft)",
  "var(--color-subtle)",
  "var(--color-border)",
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

const pageV: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

const gridV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT, staggerChildren: 0.06 },
  },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

const softHover = {
  whileHover: { y: -2, transition: { duration: 0.18, ease: EASE_OUT } },
  whileTap: { scale: 0.99, transition: { duration: 0.12, ease: EASE_IN_OUT } },
};

function signPct(n: number) {
  if (n > 0) return `+${n}%`;
  return `${n}%`;
}

function csvEscape(v: unknown) {
  const s = String(v ?? "");
  if (s.includes('"') || s.includes(",") || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function toFlagEmoji(countryCode: string) {
  const cc = (countryCode || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "🌍";
  const A = 0x1f1e6;
  const first = cc.charCodeAt(0) - 65 + A;
  const second = cc.charCodeAt(1) - 65 + A;
  return String.fromCodePoint(first, second);
}

function countryDisplayName(codeOrLabel: string) {
  const v = (codeOrLabel || "").trim();
  if (!v || v === "—") return "Unknown";
  if (/^[A-Za-z]{2}$/.test(v) && typeof Intl !== "undefined" && "DisplayNames" in Intl) {
    try {
      const dn = new Intl.DisplayNames(["en"], { type: "region" });
      const name = dn.of(v.toUpperCase());
      if (name) return name;
    } catch {
      // ignore
    }
  }
  return v;
}

function prettyReferrerLabel(raw: string) {
  const s = (raw || "").trim();
  if (!s) return "direct";
  if (s === "Direct / Unknown") return "direct";
  return s.replace(/^www\./i, "");
}

function KpiIcon({
  kind,
}: {
  kind: "engagements" | "clicks" | "submissions" | "subs" | "peak";
}) {
  const base =
    "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-(--color-border) bg-white shadow-[0_1px_0_rgba(16,24,40,0.04)]";

  const iconClass = "h-5 w-5 text-(--color-text)";

  if (kind === "engagements")
    return (
      <span className={base}>
        <TrendingUp className={iconClass} />
      </span>
    );
  if (kind === "clicks")
    return (
      <span className={base}>
        <MousePointerClick className={iconClass} />
      </span>
    );
  if (kind === "submissions")
    return (
      <span className={base}>
        <Mail className={iconClass} />
      </span>
    );
  if (kind === "subs")
    return (
      <span className={base}>
        <Users className={iconClass} />
      </span>
    );
  return (
    <span className={base}>
      <Flame className={iconClass} />
    </span>
  );
}

function MetricCard({
  label,
  value,
  subline,
  deltaPct,
  icon,
}: {
  label: string;
  value: string;
  subline?: string;
  deltaPct?: number;
  icon?: React.ReactNode;
}) {
  const showDelta = typeof deltaPct === "number";
  const up = (deltaPct ?? 0) > 0;
  const down = (deltaPct ?? 0) < 0;

  return (
    <motion.div variants={cardV} {...softHover}>
      <Card className="rounded-4xl border border-(--color-border) bg-white shadow-[0_10px_30px_rgba(16,24,40,0.06)]">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">
                {label}
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-(--color-text)">
                {value}
              </p>

              {subline ? (
                <p className="mt-2 text-sm text-(--color-subtle)">{subline}</p>
              ) : (
                <div className="mt-2 h-5" />
              )}

              {showDelta ? (
                <div className="mt-2 inline-flex items-center gap-1.5">
                  <span
                    className={[
                      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                      up
                        ? "bg-emerald-50 text-emerald-700"
                        : down
                        ? "bg-rose-50 text-rose-700"
                        : "bg-(--color-bg) text-(--color-subtle)",
                    ].join(" ")}
                  >
                    {up ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : down ? (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    ) : null}
                    {signPct(deltaPct)}
                  </span>
                  <span className="text-xs text-(--color-subtle)">vs previous period</span>
                </div>
              ) : null}
            </div>

            <div className="shrink-0">{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PanelCard({
  title,
  subtitle,
  right,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={cardV} {...softHover} className={className}>
      <Card className="rounded-4xl border border-(--color-border) bg-white shadow-[0_10px_30px_rgba(16,24,40,0.06)]">
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-(--color-text)">{title}</p>
              {subtitle ? (
                <p className="mt-1 text-xs text-(--color-subtle)">{subtitle}</p>
              ) : null}
            </div>
            {right ? <div className="shrink-0">{right}</div> : null}
          </div>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg) px-3 py-1 text-xs font-semibold text-(--color-text)">
      {children}
    </span>
  );
}

function MiniBarRow({
  label,
  value,
  frac,
  rightLabel,
}: {
  label: string;
  value: number;
  frac: number;
  rightLabel?: string;
}) {
  return (
    <div className="grid grid-cols-[1.2fr,1fr,64px] items-center gap-3 rounded-3xl border border-(--color-border) bg-(--color-bg) px-4 py-2.5">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-(--color-text)">{label}</p>
        <p className="mt-0.5 text-[11px] text-(--color-subtle)">
          {value.toLocaleString()} click{value === 1 ? "" : "s"}
        </p>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/70 ring-1 ring-(--color-border)">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.max(3, Math.round(clamp01(frac) * 100))}%`,
            background: "var(--color-accent)",
          }}
        />
      </div>

      <div className="text-right text-xs font-semibold text-(--color-text)">
        {rightLabel ?? `${Math.round(clamp01(frac) * 100)}%`}
      </div>
    </div>
  );
}

export function AnalyticsOverview({ data }: Props) {
  const { dateRange, totalEngagements, topDate, totals, growth } = data;

  const fromLabel = format(dateRange.from, "MMM d, yyyy");
  const toLabel = format(dateRange.to, "MMM d, yyyy");

  const deviceTotal = data.byDevice.reduce((sum, d) => sum + d.count, 0) || 1;

  const deviceChart = data.byDevice.map((d) => {
    const key = d.device.toLowerCase();
    return {
      name: DEVICE_LABELS[key] ?? d.device,
      value: d.count,
      percent: (d.count / deviceTotal) * 100,
    };
  });

  const referrerChart = data.byReferrer.map((r) => ({
    name: prettyReferrerLabel(r.referrer),
    value: r.count,
  }));

  const totalDays = data.timeseries.length || 1;
  const activeDays = data.timeseries.filter((d) => d.count > 0).length;
  const avgPerDay = totalEngagements / totalDays;

  // Countries
  const countryRowsRaw = (data.byCountry ?? []).filter((c) => (c.count ?? 0) > 0);
  const countryClicksTotal = countryRowsRaw.reduce((sum, r) => sum + (r.count ?? 0), 0) || 1;

  const countryRows = countryRowsRaw
    .slice()
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    .slice(0, 7)
    .map((r) => {
      const pct = (r.count / countryClicksTotal) * 100;
      const label = countryDisplayName(r.country);
      const code = /^[A-Za-z]{2}$/.test((r.country || "").trim()) ? r.country.trim().toUpperCase() : "";
      return {
        key: `${r.country}-${label}`,
        country: label,
        code,
        flag: code ? toFlagEmoji(code) : "🌍",
        clicks: r.count,
        pct,
        pctLabel: pct < 1 ? "<1%" : `${Math.round(pct)}%`,
        barFrac: clamp01(pct / 100),
      };
    });

  // Referrers (compact list with bars)
  const refTotal = referrerChart.reduce((s, r) => s + r.value, 0) || 1;
  const refRows = referrerChart
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 7)
    .map((r) => {
      const pct = (r.value / refTotal) * 100;
      return {
        key: r.name,
        name: r.name,
        clicks: r.value,
        pct,
        pctLabel: pct < 1 ? "<1%" : `${Math.round(pct)}%`,
        barFrac: clamp01(pct / 100),
      };
    });

  // Mini highlights
  const topCountry = countryRows[0];
  const topRef = refRows[0];
  const topCamp = (data.byCampaign ?? [])[0];

  const hasHighlights =
    (topCountry && topCountry.clicks > 0) ||
    (topRef && topRef.clicks > 0) ||
    (topCamp && topCamp.count > 0 && topCamp.campaign !== "—");

  async function handleExportCsv() {
    const rows: string[] = [];

    rows.push(["Metric", "Value"].map(csvEscape).join(","));
    rows.push(["Date from", fromLabel].map(csvEscape).join(","));
    rows.push(["Date to", toLabel].map(csvEscape).join(","));
    rows.push(["Total engagements", totalEngagements].map(csvEscape).join(","));
    rows.push(["Link clicks", totals.linkClicks].map(csvEscape).join(","));
    rows.push(["Contact submissions", totals.contactSubmissions].map(csvEscape).join(","));
    rows.push(["Subscribers", totals.subscribers].map(csvEscape).join(","));
    rows.push(["Avg per day", avgPerDay.toFixed(2)].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top countries", ""].map(csvEscape).join(","));
    rows.push(["Country", "Clicks"].map(csvEscape).join(","));
    for (const c of data.byCountry) rows.push([c.country, c.count].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top campaigns", ""].map(csvEscape).join(","));
    rows.push(["Campaign", "Clicks"].map(csvEscape).join(","));
    for (const c of data.byCampaign) rows.push([c.campaign, c.count].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top sources", ""].map(csvEscape).join(","));
    rows.push(["Source", "Clicks"].map(csvEscape).join(","));
    for (const s of data.byUtmSource) rows.push([s.source, s.count].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top mediums", ""].map(csvEscape).join(","));
    rows.push(["Medium", "Clicks"].map(csvEscape).join(","));
    for (const m of data.byUtmMedium) rows.push([m.medium, m.count].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top referrers", ""].map(csvEscape).join(","));
    rows.push(["Referrer", "Clicks"].map(csvEscape).join(","));
    for (const r of data.byReferrer) rows.push([r.referrer, r.count].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top links", ""].map(csvEscape).join(","));
    rows.push(["Title", "Short code", "Target URL", "Clicks", "Top campaign", "Last click at"].map(csvEscape).join(","));
    for (const l of data.topLinks) {
      rows.push(
        [
          l.title ?? "—",
          l.code ?? "—",
          l.targetUrl,
          l.clicks,
          l.utmCampaignTop ?? "—",
          l.lastClickAt ? format(new Date(l.lastClickAt), "MMM d, yyyy HH:mm") : "—",
        ]
          .map(csvEscape)
          .join(",")
      );
    }

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kompi-analytics-${format(dateRange.from, "yyyy-MM-dd")}_to_${format(
      dateRange.to,
      "yyyy-MM-dd"
    )}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <motion.div variants={pageV} initial="hidden" animate="show" className="wf-dashboard-main flex flex-col gap-6">
      {/* Header */}
      <motion.div variants={gridV} initial="hidden" animate="show" className="pb-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight text-(--color-text)">Analytics</h1>
            <p className="text-sm text-(--color-subtle)">Campaign + link performance across your workspace.</p>
          </div>

          <div className="flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-4 py-2 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
              <span className="font-medium text-(--color-text)">
                {fromLabel} — {toLabel}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-full border-(--color-border) bg-white px-4 text-xs shadow-[0_1px_0_rgba(16,24,40,0.04)]"
              onClick={handleExportCsv}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </motion.div>

      {/* KPI grid */}
      <motion.div variants={gridV} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Total engagements"
          value={totalEngagements.toLocaleString()}
          subline="Across selected range"
          deltaPct={growth.totalEngagementsPct}
          icon={<KpiIcon kind="engagements" />}
        />
        <MetricCard
          label="Link clicks"
          value={totals.linkClicks.toLocaleString()}
          subline="Tracked click events"
          deltaPct={growth.linkClicksPct}
          icon={<KpiIcon kind="clicks" />}
        />
        <MetricCard
          label="Contact submissions"
          value={totals.contactSubmissions.toLocaleString()}
          subline="Forms + inbound"
          deltaPct={growth.contactSubmissionsPct}
          icon={<KpiIcon kind="submissions" />}
        />
        <MetricCard
          label="Subscribers"
          value={totals.subscribers.toLocaleString()}
          subline="New signups"
          deltaPct={growth.subscribersPct}
          icon={<KpiIcon kind="subs" />}
        />
      </motion.div>

      {/* Highlights row */}
      {hasHighlights ? (
        <motion.div variants={gridV} initial="hidden" animate="show">
          <motion.div variants={cardV} {...softHover}>
            <Card className="rounded-4xl border border-(--color-border) bg-white shadow-[0_10px_30px_rgba(16,24,40,0.06)]">
              <CardContent className="p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">Highlights</p>
                    <p className="mt-1 text-sm text-(--color-subtle)">Quick signals from this range.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {topCountry ? (
                      <Chip>
                        <span className="text-base leading-none">{topCountry.flag}</span>
                        <span className="truncate">Top country: {topCountry.country}</span>
                      </Chip>
                    ) : null}
                    {topRef ? (
                      <Chip>
                        <span className="truncate">Top referrer: {topRef.name}</span>
                      </Chip>
                    ) : null}
                    {topCamp && topCamp.campaign !== "—" ? (
                      <Chip>
                        <span className="truncate">Top campaign: {topCamp.campaign}</span>
                      </Chip>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ) : null}

      <motion.div variants={gridV} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
        {/* Timeseries */}
        <PanelCard
          className="lg:col-span-2"
          title="Engagement dynamics"
          subtitle="Daily click volume over the selected range."
          right={
            <span className="rounded-full border border-(--color-border) bg-(--color-bg) px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">
              Timeseries
            </span>
          }
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeseries}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="date"
                  tickMargin={10}
                  tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={{ stroke: "var(--color-border)" }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={{ stroke: "var(--color-border)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid var(--color-border)",
                    background: "white",
                    color: "var(--color-text)",
                    fontSize: 12,
                    boxShadow: "0 12px 30px rgba(16,24,40,0.10)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-accent)"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "var(--color-accent)",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-3xl border border-(--color-border) bg-(--color-bg) p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">Avg / day</p>
              <p className="mt-2 text-2xl font-semibold text-(--color-text)">{avgPerDay.toFixed(1)}</p>
              <p className="mt-1 text-xs text-(--color-subtle)">Based on {totalDays.toLocaleString()} days</p>
            </div>

            <div className="rounded-3xl border border-(--color-border) bg-(--color-bg) p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">Active days</p>
              <p className="mt-2 text-2xl font-semibold text-(--color-text)">{activeDays.toLocaleString()}</p>
              <p className="mt-1 text-xs text-(--color-subtle)">Days with ≥ 1 click</p>
            </div>

            <div className="rounded-3xl border border-(--color-border) bg-(--color-bg) p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">Peak day</p>
              {topDate ? (
                <>
                  <p className="mt-2 text-2xl font-semibold text-(--color-text)">
                    {format(new Date(topDate.date), "MMM d")}
                  </p>
                  <p className="mt-1 text-xs text-(--color-subtle)">
                    <span className="font-semibold text-(--color-text)">{topDate.count.toLocaleString()}</span> clicks
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-(--color-subtle)">No activity yet</p>
              )}
            </div>
          </div>
        </PanelCard>

        {/* Devices */}
        <PanelCard title="Devices" subtitle="Where your audience is engaging from.">
          <div className="flex items-center gap-6">
            <div className="h-44 w-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceChart} dataKey="value" nameKey="name" innerRadius={62} outerRadius={84} paddingAngle={3}>
                    {deviceChart.map((_, idx) => (
                      <Cell key={idx} fill={DEVICE_COLORS[idx % DEVICE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 14,
                      border: "1px solid var(--color-border)",
                      background: "white",
                      color: "var(--color-text)",
                      fontSize: 12,
                      boxShadow: "0 12px 30px rgba(16,24,40,0.10)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              {deviceChart.length ? (
                deviceChart.map((d, idx) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between rounded-2xl border border-(--color-border) bg-(--color-bg) px-3 py-2"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2 text-sm text-(--color-text)">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: DEVICE_COLORS[idx % DEVICE_COLORS.length] }}
                      />
                      <span className="truncate">{d.name}</span>
                    </span>
                    <span className="shrink-0 text-xs text-(--color-subtle)">
                      <span className="font-semibold text-(--color-text)">{d.value.toLocaleString()}</span> ·{" "}
                      <span className="font-semibold text-(--color-accent)">{d.percent.toFixed(1)}%</span>
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-(--color-subtle)">Device data will appear once clicks come in.</p>
              )}
            </div>
          </div>
        </PanelCard>
      </motion.div>

      {/* Campaign + UTM + Top links */}
      <motion.div variants={gridV} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
        <PanelCard title="Top campaigns" subtitle="Ranked by click volume.">
          <div className="space-y-2">
            {data.byCampaign.length ? (
              data.byCampaign.slice(0, 8).map((c, i) => (
                <motion.div
                  key={c.campaign + i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.02 }}
                  className="flex items-center justify-between rounded-3xl border border-(--color-border) bg-(--color-bg) px-4 py-2.5"
                >
                  <span className="min-w-0 truncate text-sm font-medium text-(--color-text)">{c.campaign}</span>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-(--color-text) shadow-[0_1px_0_rgba(16,24,40,0.04)]">
                    {c.count.toLocaleString()}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-(--color-subtle)">
                No campaign data yet. Add <span className="font-semibold text-(--color-text)">utm_campaign</span> to your URLs.
              </p>
            )}
          </div>
        </PanelCard>

        {/* FIXED: UTM spacing (more compact + 2-column layout) */}
        <PanelCard title="Sources & mediums" subtitle="How clicks are attributed (UTM).">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">Sources</p>
                <span className="text-[11px] text-(--color-subtle)">{data.byUtmSource.length ? "Top" : ""}</span>
              </div>

              <div className="space-y-2">
                {data.byUtmSource.length ? (
                  data.byUtmSource.slice(0, 5).map((s, i) => (
                    <motion.div
                      key={s.source + i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.02 }}
                      className="flex items-center justify-between rounded-3xl border border-(--color-border) bg-(--color-bg) px-4 py-2.5"
                    >
                      <span className="min-w-0 truncate text-sm text-(--color-text)">{s.source}</span>
                      <span className="shrink-0 text-xs font-semibold text-(--color-text)">{s.count.toLocaleString()}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-(--color-subtle)">No sources yet.</p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">Mediums</p>
                <span className="text-[11px] text-(--color-subtle)">{data.byUtmMedium.length ? "Top" : ""}</span>
              </div>

              <div className="space-y-2">
                {data.byUtmMedium.length ? (
                  data.byUtmMedium.slice(0, 5).map((m, i) => (
                    <motion.div
                      key={m.medium + i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.02 }}
                      className="flex items-center justify-between rounded-3xl border border-(--color-border) bg-(--color-bg) px-4 py-2.5"
                    >
                      <span className="min-w-0 truncate text-sm text-(--color-text)">{m.medium}</span>
                      <span className="shrink-0 text-xs font-semibold text-(--color-text)">{m.count.toLocaleString()}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-(--color-subtle)">No mediums yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* small note, compact */}
          {(data.byUtmSource.length === 0 || data.byUtmMedium.length === 0) && (
            <div className="mt-3 rounded-3xl border border-(--color-border) bg-(--color-bg) px-4 py-3 text-xs text-(--color-subtle)">
              Tip: add <span className="font-semibold text-(--color-text)">utm_source</span> and{" "}
              <span className="font-semibold text-(--color-text)">utm_medium</span> to see cleaner attribution.
            </div>
          )}
        </PanelCard>

        <PanelCard title="Top links" subtitle="What’s getting clicked right now.">
          <div className="space-y-2">
            {data.topLinks.length ? (
              data.topLinks.map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.03 }}
                  className="rounded-3xl border border-(--color-border) bg-(--color-bg) px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-sm font-semibold text-(--color-text)">
                      {l.title ?? l.code ?? "Untitled link"}
                    </span>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-(--color-text) shadow-[0_1px_0_rgba(16,24,40,0.04)]">
                      {l.clicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3 text-xs text-(--color-subtle)">
                    <span className="min-w-0 truncate">
                      {l.utmCampaignTop ? `Campaign: ${l.utmCampaignTop}` : "Campaign: —"}
                    </span>
                    <span className="shrink-0">{l.lastClickAt ? format(new Date(l.lastClickAt), "MMM d") : "—"}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-(--color-subtle)">No link activity yet.</p>
            )}
          </div>
        </PanelCard>
      </motion.div>

      {/* Referrers + Countries */}
      <motion.div variants={gridV} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
        {/* FIXED: Top referrers no longer cramped bar chart */}
        <PanelCard className="lg:col-span-1" title="Top referrers" subtitle="Where clicks are coming from.">
          {refRows.length ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-(--color-subtle)">
                <span className="font-semibold uppercase tracking-[0.14em]">Referrer</span>
                <span className="font-semibold uppercase tracking-[0.14em]">Share</span>
              </div>

              <div className="space-y-2">
                {refRows.map((r) => (
                  <MiniBarRow
                    key={r.key}
                    label={r.name}
                    value={r.clicks}
                    frac={r.barFrac}
                    rightLabel={r.pctLabel}
                  />
                ))}
              </div>

              <div className="pt-1 text-xs text-(--color-subtle)">
                Based on{" "}
                <span className="font-semibold text-(--color-text)">{refTotal.toLocaleString()}</span>{" "}
                referrer-attributed clicks.
              </div>
            </div>
          ) : (
            <div className="rounded-4xl border border-(--color-border) bg-(--color-bg) p-6">
              <p className="text-sm font-semibold text-(--color-text)">No referrer data yet.</p>
              <p className="mt-2 text-sm text-(--color-subtle)">
                Many clicks show as <span className="font-semibold text-(--color-text)">direct</span> (e.g. QR scans, typed URLs, some apps).
              </p>
            </div>
          )}
        </PanelCard>

        <PanelCard
          className="lg:col-span-2"
          title="Top countries"
          subtitle="Estimated by request geo (when available)."
          right={
            <span className="inline-flex items-center gap-2 text-xs text-(--color-subtle)">
              <HelpCircle className="h-4 w-4" />
            </span>
          }
        >
          {countryRows.length ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-(--color-subtle)">
                <span className="font-semibold uppercase tracking-[0.14em]">Country</span>
                <span className="font-semibold uppercase tracking-[0.14em]">Clicks</span>
              </div>

              <div className="space-y-2">
                {countryRows.map((row) => (
                  <div
                    key={row.key}
                    className="grid grid-cols-[1.2fr,1fr,52px] items-center gap-3 rounded-3xl border border-(--color-border) bg-(--color-bg) px-4 py-3"
                  >
                    <div className="min-w-0 flex items-center gap-3">
                      <span className="text-xl leading-none">{row.flag}</span>
                      <span className="truncate text-sm font-medium text-(--color-text)">{row.country}</span>
                    </div>

                    <div className="h-3 w-full overflow-hidden rounded-full bg-white/70 ring-1 ring-(--color-border)">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(2, Math.round(row.barFrac * 100))}%`,
                          background: "var(--color-accent)",
                        }}
                      />
                    </div>

                    <div className="text-right text-sm font-semibold text-(--color-text)">{row.pctLabel}</div>
                  </div>
                ))}
              </div>

              <div className="pt-1 text-xs text-(--color-subtle)">
                Based on{" "}
                <span className="font-semibold text-(--color-text)">{countryClicksTotal.toLocaleString()}</span>{" "}
                geo-attributed clicks.
              </div>
            </div>
          ) : (
            <div className="rounded-4xl border border-(--color-border) bg-(--color-bg) p-6">
              <p className="text-sm font-semibold text-(--color-text)">No location data yet.</p>
              <p className="mt-2 text-sm text-(--color-subtle)">
                Once geo headers are present (after deploy), we’ll show country distribution here.
              </p>
            </div>
          )}
        </PanelCard>
      </motion.div>

      {/* Small footer note (optional, subtle) */}
      <motion.div variants={gridV} initial="hidden" animate="show">
        <motion.div variants={cardV} {...softHover}>
          <Card className="rounded-4xl border border-(--color-border) bg-white shadow-[0_10px_30px_rgba(16,24,40,0.06)]">
            <CardContent className="p-6">
              <p className="text-sm text-(--color-subtle)">
                <span className={`${instrumentSerif.className} italic text-(--color-text)`}>Quiet insights.</span>{" "}
                Export CSV anytime to share results or validate campaigns.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button className="h-11 rounded-full px-6 text-sm font-semibold" style={{ backgroundColor: "#D5FF3F", color: "#111111" }} onClick={handleExportCsv}>
                  <Download className="mr-2 h-4 w-4" />
                  Export your report
                </Button>
                <Button variant="outline" className="h-11 rounded-full border-(--color-border) bg-white px-6 text-sm font-semibold" onClick={() => {}}>
                  View top links
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
