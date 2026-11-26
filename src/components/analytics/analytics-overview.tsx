"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  BarChart3,
  CalendarDays,
  Download,
  Globe2,
  Inbox,
  Link2,
  Megaphone,
  Monitor,
  MousePointerClick,
  QrCode,
  Share2,
  Smartphone,
  Tablet,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { AnalyticsOverviewData } from "@/lib/analytics-overview";
import { CountUp, Delta, EASE, PageHeader, Panel, Rise, Stagger, buttonStyles } from "@/components/dashboard/ui";
import { Favicon } from "@/components/dashboard/overview/overview-client";
import { cn } from "@/lib/utils";

type Props = { data: AnalyticsOverviewData; range?: number; ranges?: number[]; shortBase?: string };

const INK = "#151619";
const BLUE = "#3D5AFE";

function csvEscape(v: unknown) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function referrerLabel(raw: string) {
  const s = (raw || "").trim().replace(/^www\./i, "");
  if (!s || s === "direct" || s === "Direct / Unknown") return "Direct or unknown";
  if (s === "app") return "Mobile app";
  return s;
}

function flag(code: string) {
  const cc = (code || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "🌍";
  return String.fromCodePoint(cc.charCodeAt(0) - 65 + 0x1f1e6, cc.charCodeAt(1) - 65 + 0x1f1e6);
}

function countryName(code: string) {
  const v = (code || "").trim();
  if (!v || v === "UNKNOWN") return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(v.toUpperCase()) ?? v;
  } catch {
    return v;
  }
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function relTime(iso: string | null) {
  if (!iso) return "—";
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const DEVICE_ICON: Record<string, LucideIcon> = { Mobile: Smartphone, Desktop: Monitor, Tablet: Tablet };

export function AnalyticsOverview({ data, range = 30, ranges = [7, 30, 90], shortBase }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [pendingRange, setPendingRange] = useState<number | null>(null);
  const { totals, growth, timeseries } = data;

  const days = timeseries.length || 1;
  const avgPerDay = totals.linkClicks / days;
  const qrVisits = data.topLinks.filter((l) => l.qrCode).reduce((s, l) => s + l.clicks, 0);
  const best = data.topDate && data.topDate.count > 0 ? data.topDate : null;

  const deviceTotal = data.byDevice.reduce((s, d) => s + d.count, 0);
  const devices = data.byDevice
    .filter((d) => d.device !== "Bot")
    .sort((a, b) => b.count - a.count)
    .map((d) => ({ ...d, pct: deviceTotal ? (d.count / deviceTotal) * 100 : 0 }));

  const chartData = useMemo(() => timeseries.map((p) => ({ ...p, label: p.date })), [timeseries]);
  const weekdayData = useMemo(() => {
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const buckets = names.map((n) => ({ day: n, count: 0 }));
    for (const p of timeseries) buckets[new Date(`${p.date}T00:00:00Z`).getUTCDay()].count += p.count;
    return [...buckets.slice(1), buckets[0]];
  }, [timeseries]);

  function setRange(r: number) {
    if (r === range) return;
    setPendingRange(r);
    const next = new URLSearchParams(params.toString());
    next.set("range", String(r));
    router.push(`/analytics?${next.toString()}`, { scroll: false });
  }

  function exportCsv() {
    const rows: string[] = [];
    const push = (...cells: unknown[]) => rows.push(cells.map(csvEscape).join(","));
    push("Kompi analytics", `${timeseries[0]?.date ?? ""} to ${timeseries[timeseries.length - 1]?.date ?? ""}`);
    push();
    push("Date", "Visits");
    timeseries.forEach((p) => push(p.date, p.count));
    push();
    push("Link", "Short URL", "Destination", "Visits", "Last visit");
    data.topLinks.forEach((l) => push(l.title || l.qrCode?.title || hostOf(l.targetUrl), l.code ? `${shortBase ?? ""}/r/${l.code}` : "", l.targetUrl, l.clicks, l.lastClickAt ?? ""));
    push();
    push("Referrer", "Visits");
    data.byReferrer.forEach((r) => push(referrerLabel(r.referrer), r.count));
    push();
    push("Country", "Visits");
    data.byCountry.forEach((c) => push(countryName(c.country), c.count));
    push();
    push("Device", "Visits");
    data.byDevice.forEach((d) => push(d.device, d.count));
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `kompi-analytics-${range}d.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const kpis: { label: string; value: number; delta?: number; icon: LucideIcon; tint: string; color: string; hint: string; format?: (n: number) => string }[] = [
    { label: "Visits", value: totals.linkClicks, delta: growth.linkClicksPct, icon: MousePointerClick, tint: "#E6ECFA", color: BLUE, hint: "Short links and dynamic QR codes" },
    { label: "Daily average", value: avgPerDay, icon: TrendingUp, tint: "#E7F0EA", color: "#2F7D55", hint: `Across ${days} days`, format: (n) => (n >= 10 ? Math.round(n).toLocaleString() : n.toFixed(1)) },
    { label: "Card messages", value: totals.kcardMessages, delta: growth.kcardMessagesPct, icon: Inbox, tint: "#FBEEDF", color: "#C76A1C", hint: "Sent through your Cards" },
    { label: "Best day", value: best?.count ?? 0, icon: CalendarDays, tint: "#FBE4FA", color: "#B24BB0", hint: best ? new Date(`${best.date}T00:00:00Z`).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short", timeZone: "UTC" }) : "No visits yet" },
  ];

  const empty = totals.linkClicks === 0;

  return (
    <div className={cn("transition-opacity duration-300", pendingRange && "opacity-60")}>
      <PageHeader
        eyebrow="Analytics"
        icon={BarChart3}
        title="What’s getting attention."
        description="Visits to your short links and dynamic QR codes, where they came from and when."
        actions={
          <>
            <LayoutGroup id="range">
              <div className="flex items-center gap-1 rounded-[11px] border border-[#E3E5E7] bg-white p-1" role="tablist" aria-label="Date range">
                {ranges.map((r) => {
                  const on = (pendingRange ?? range) === r;
                  return (
                    <button key={r} role="tab" aria-selected={on} onClick={() => setRange(r)} className={cn("relative h-9 rounded-[8px] px-3 text-[14px] transition-colors", on ? "text-[#151619]" : "text-[#80858C] hover:text-[#151619]")}>
                      {on && <motion.span layoutId="range-pill" className="absolute inset-0 rounded-[8px] bg-[#F1F2F4]" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                      <span className="relative">{r} days</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
            <button onClick={exportCsv} className={buttonStyles.secondary}>
              <Download size={16} /> Export CSV
            </button>
          </>
        }
      />

      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Rise key={k.label} className="rounded-[16px] border border-[#E3E5E7] bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[13px] text-[#696C72] sm:text-[14px]">
                <span className="grid size-7 place-items-center rounded-[8px]" style={{ background: k.tint, color: k.color }}>
                  <Icon size={15} strokeWidth={2} />
                </span>
                {k.label}
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <CountUp value={k.value} format={k.format} className="text-[30px] font-medium leading-none tracking-[-0.05em] sm:text-[36px]" />
                {k.delta !== undefined && <Delta value={k.delta} />}
              </div>
              <p className="mt-3 truncate text-[12px] text-[#8A9099]">{k.hint}</p>
            </Rise>
          );
        })}
      </Stagger>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.15 }} className="mt-6">
        <Panel
          title="Visits over time"
          icon={TrendingUp}
          bodyClassName="p-0 sm:p-0"
          action={
            <span className="text-[13px] text-[#80858C]">
              {growth.linkClicksPct === 0 ? "Same as" : growth.linkClicksPct > 0 ? "Up on" : "Down on"} the previous {range} days
            </span>
          }
        >
          <div className="relative h-[280px] px-2 pb-3 pt-5 sm:h-[340px]">
            {empty && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-center">
                <p className="text-[15px] font-medium">No visits in this period.</p>
                <p className="max-w-xs text-[14px] text-[#80858C]">Share a short link or put a dynamic QR code in front of people.</p>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 18, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="an-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={BLUE} stopOpacity={0.16} />
                    <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#EEF0F2" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  minTickGap={28}
                  tick={{ fontSize: 12, fill: "#8A9099" }}
                  tickFormatter={(d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString(undefined, { day: "numeric", month: "short", timeZone: "UTC" })}
                />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={40} tick={{ fontSize: 12, fill: "#8A9099" }} />
                <Tooltip content={<ChartTip />} cursor={{ stroke: "#CDD1D7", strokeDasharray: "3 3" }} />
                <Area type="monotone" dataKey="count" name="Visits" stroke={BLUE} strokeWidth={2} fill="url(#an-fill)" animationDuration={900} activeDot={{ r: 4.5, strokeWidth: 2, stroke: "#fff" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </motion.div>

      <Stagger className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Rise>
          <Panel title="Top links & codes" icon={Link2} bodyClassName="p-2 sm:p-2" className="h-full" action={<Link href="/links" className="text-[13px] text-[#80858C] hover:text-[#151619]">All links</Link>}>
            {!data.topLinks.length ? (
              <PanelEmpty text="Your most visited links and QR codes will rank here." />
            ) : (
              <div>
                {data.topLinks.map((l, i) => {
                  const max = data.topLinks[0]?.clicks || 1;
                  const href = l.qrCode ? `/kr-codes/${l.qrCode.id}` : `/links/${l.id}`;
                  return (
                    <Link key={l.id} href={href} className="group relative flex items-center gap-3 overflow-hidden rounded-[12px] px-3 py-2.5 transition-colors hover:bg-[#F7F8F9]">
                      <motion.span
                        className="absolute inset-y-1.5 left-1.5 rounded-[9px] bg-[#F3F5FB]"
                        initial={{ width: 0 }}
                        animate={{ width: `calc(${(l.clicks / max) * 100}% - 12px)` }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.04 }}
                      />
                      <span className="relative w-5 text-center text-[12px] tabular-nums text-[#A2A6AC]">{i + 1}</span>
                      <span className="relative">
                        {l.qrCode ? (
                          <span className="grid size-9 place-items-center rounded-[10px] bg-[#E7F0EA] text-[#2F7D55]">
                            <QrCode size={17} />
                          </span>
                        ) : (
                          <Favicon url={l.targetUrl} />
                        )}
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium">{l.title || l.qrCode?.title || hostOf(l.targetUrl)}</span>
                        <span className="block truncate text-[12px] text-[#80858C]">
                          {l.qrCode ? "QR code" : l.code ? `kompi.app/r/${l.code}` : hostOf(l.targetUrl)} · last visit {relTime(l.lastClickAt)}
                        </span>
                      </span>
                      <span className="relative text-[14px] font-medium tabular-nums">{l.clicks.toLocaleString()}</span>
                    </Link>
                  );
                })}
                {qrVisits > 0 && <p className="px-3 pb-2 pt-3 text-[12px] text-[#8A9099]">{qrVisits.toLocaleString()} of these visits came from scanning your QR codes.</p>}
              </div>
            )}
          </Panel>
        </Rise>

        <Rise>
          <Panel title="When people visit" icon={CalendarDays} className="h-full">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekdayData} margin={{ top: 6, right: 0, left: -24, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#EEF0F2" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8A9099" }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8A9099" }} />
                  <Tooltip cursor={{ fill: "#F5F6F7" }} content={<BarTip />} />
                  <Bar dataKey="count" name="Visits" fill={INK} radius={[6, 6, 2, 2]} maxBarSize={34} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-5 border-t border-[#EDEEF0] pt-5">
              <p className="mb-3 text-[13px] font-medium text-[#3C4045]">Devices</p>
              {!devices.length ? (
                <p className="text-[13px] text-[#8A9099]">No device data yet.</p>
              ) : (
                <>
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-[#EEF0F2]">
                    {devices.map((d, i) => (
                      <motion.span
                        key={d.device}
                        initial={{ width: 0 }}
                        animate={{ width: `${d.pct}%` }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.08 }}
                        style={{ background: ["#151619", BLUE, "#B24BB0", "#A2A6AC"][i % 4] }}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {devices.map((d, i) => {
                      const Icon = DEVICE_ICON[d.device] ?? Globe2;
                      return (
                        <span key={d.device} className="flex items-center gap-1.5 text-[13px] text-[#5A5E65]">
                          <span className="size-2 rounded-full" style={{ background: ["#151619", BLUE, "#B24BB0", "#A2A6AC"][i % 4] }} />
                          <Icon size={14} className="text-[#A2A6AC]" />
                          {d.device} <span className="tabular-nums text-[#151619]">{Math.round(d.pct)}%</span>
                        </span>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </Panel>
        </Rise>
      </Stagger>

      <Stagger className="mt-6 grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <Rise>
          <BarList
            title="Referrers"
            icon={Share2}
            rows={data.byReferrer.map((r) => ({ key: r.referrer, label: referrerLabel(r.referrer), value: r.count, lead: r.referrer && r.referrer !== "direct" && r.referrer !== "unknown" && r.referrer !== "app" ? <Favicon url={`https://${r.referrer}`} size={24} /> : <span className="grid size-6 place-items-center rounded-[7px] bg-[#F1F2F4] text-[#80858C]"><Globe2 size={13} /></span> }))}
            empty="Where visitors come from — social apps, websites, email."
          />
        </Rise>
        <Rise>
          <BarList
            title="Countries"
            icon={Globe2}
            rows={data.byCountry.map((c) => ({ key: c.country, label: countryName(c.country), value: c.count, lead: <span className="w-6 text-center text-[17px] leading-none">{flag(c.country)}</span> }))}
            empty="A map of where your visitors are, by country."
          />
        </Rise>
        <Rise className="lg:col-span-2 2xl:col-span-1">
          <BarList
            title="Campaigns"
            icon={Megaphone}
            rows={data.byCampaign.filter((c) => c.campaign !== "—").map((c) => ({ key: c.campaign, label: c.campaign, value: c.count }))}
            empty="Add utm_campaign to a link to compare campaigns here."
          />
        </Rise>
      </Stagger>
    </div>
  );
}

function PanelEmpty({ text }: { text: string }) {
  return <p className="px-4 py-10 text-center text-[14px] text-[#8A9099]">{text}</p>;
}

function BarList({ title, icon, rows, empty }: { title: string; icon: LucideIcon; rows: { key: string; label: string; value: number; lead?: React.ReactNode }[]; empty: string }) {
  const total = rows.reduce((s, r) => s + r.value, 0) || 1;
  const max = rows[0]?.value || 1;
  return (
    <Panel title={title} icon={icon} bodyClassName="p-3 sm:p-3" className="h-full">
      {!rows.length ? (
        <PanelEmpty text={empty} />
      ) : (
        <div className="space-y-1">
          {rows.slice(0, 8).map((r, i) => (
            <div key={r.key} className="relative flex items-center gap-3 overflow-hidden rounded-[10px] px-3 py-2">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-[10px] bg-[#F3F4F5]"
                initial={{ width: 0 }}
                animate={{ width: `${(r.value / max) * 100}%` }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.04 }}
              />
              {r.lead && <span className="relative">{r.lead}</span>}
              <span className="relative min-w-0 flex-1 truncate text-[14px]">{r.label}</span>
              <span className="relative text-[12px] tabular-nums text-[#8A9099]">{Math.round((r.value / total) * 100)}%</span>
              <span className="relative w-12 text-right text-[14px] font-medium tabular-nums">{r.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

type TipProps = { active?: boolean; payload?: { value?: number }[]; label?: string };

function ChartTip({ active, payload, label }: TipProps) {
  if (!active || !payload?.length || !label) return null;
  return (
    <div className="rounded-[10px] border border-[#E3E5E7] bg-white px-3 py-2 text-[13px]">
      <p className="text-[#80858C]">{new Date(`${label}T00:00:00Z`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" })}</p>
      <p className="mt-0.5 font-medium">
        {(payload[0].value ?? 0).toLocaleString()} {payload[0].value === 1 ? "visit" : "visits"}
      </p>
    </div>
  );
}

function BarTip({ active, payload, label }: TipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[10px] border border-[#E3E5E7] bg-white px-3 py-2 text-[13px]">
      <p className="text-[#80858C]">{label}s</p>
      <p className="mt-0.5 font-medium">{(payload[0].value ?? 0).toLocaleString()} visits</p>
    </div>
  );
}
