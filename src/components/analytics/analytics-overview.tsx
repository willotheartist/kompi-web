// src/components/analytics/analytics-overview.tsx
"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, type Variants } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Download,
  Globe2,
  HelpCircle,
  Mail,
  MessageSquare,
  MessagesSquare,
  MousePointerClick,
  Sparkles,
  Users,
  Database,
  ExternalLink,
  Flame,
} from "lucide-react";

import type { AnalyticsOverviewData } from "@/lib/analytics-overview";
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

const DEVICE_COLORS = ["#C4C8FF", "#111113", "#8D9DFF", "#D9DCE7", "#ECEEF4"];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

const pageV: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } },
};

const gridV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT, staggerChildren: 0.05 },
  },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const hoverFx = {
  whileHover: { y: -2, transition: { duration: 0.16, ease: EASE_OUT } },
  whileTap: { scale: 0.995, transition: { duration: 0.12, ease: EASE_IN_OUT } },
};

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function signPct(n: number) {
  if (n > 0) return `+${n}%`;
  return `${n}%`;
}

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function csvEscape(v: unknown) {
  const s = String(v ?? "");
  if (s.includes('"') || s.includes(",") || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function prettyReferrerLabel(raw: string) {
  const s = (raw || "").trim();
  if (!s) return "direct";
  if (s === "Direct / Unknown") return "direct";
  return s.replace(/^www\./i, "");
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
      //
    }
  }
  return v;
}

function relTime(date: string | Date | null | undefined) {
  if (!date) return "";
  const value = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - value.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function TonePill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "lavender" | "amber";
}) {
  const tones = {
    default: "bg-[#f0f0f2] text-[#666a77]",
    green: "bg-[#EEF8F1] text-[#2D8A52]",
    lavender: "bg-[#EEF1FF] text-[#47568E]",
    amber: "bg-[#FFF4DD] text-[#A27017]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

function StatusPill({
  status,
}: {
  status: "ACTIVE" | "DRAFT" | "PAUSED" | null;
}) {
  if (!status) return <TonePill>Not configured</TonePill>;

  const map = {
    ACTIVE: { bg: "#EEF8F1", fg: "#2D8A52", dot: "#2D8A52" },
    DRAFT: { bg: "#F3F4F6", fg: "#6B7280", dot: "#9CA3AF" },
    PAUSED: { bg: "#FFF4DD", fg: "#A27017", dot: "#D9930D" },
  } as const;

  const c = map[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-[6px] text-[11px] font-semibold"
      style={{ background: c.bg, color: c.fg }}
    >
      <span className="inline-block h-[6px] w-[6px] rounded-full" style={{ background: c.dot }} />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function DeltaPill({ value }: { value?: number }) {
  if (typeof value !== "number") return null;

  const up = value > 0;
  const down = value < 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        up
          ? "bg-[#EEF8F1] text-[#2D8A52]"
          : down
          ? "bg-[#FCEBEC] text-[#B5475B]"
          : "bg-[#f0f0f2] text-[#666a77]"
      )}
    >
      {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
      {down ? <ArrowDownRight className="h-3.5 w-3.5" /> : null}
      {signPct(value)}
    </span>
  );
}

function ActionButton({
  children,
  href,
  onClick,
  accent = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  accent?: boolean;
}) {
  const className = cn(
    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition",
    accent
      ? "bg-[#C4C8FF] text-[#111] hover:brightness-105"
      : "border border-[#e4e4e7] bg-white text-[#111] hover:bg-[#f8f8fb]"
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function KCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={cardV}
      {...hoverFx}
      className={cn(
        "overflow-hidden rounded-[22px] border border-[#e4e4e7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.045)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function KCardInner({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

function StatCard({
  label,
  value,
  meta,
  delta,
  icon,
}: {
  label: string;
  value: string | number;
  meta?: string;
  delta?: number;
  icon: React.ReactNode;
}) {
  return (
    <KCard>
      <KCardInner className="p-[14px] px-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#76767e]">
              {label}
            </div>
            <div className="mt-2 flex items-end gap-2">
              <div className="text-[28px] font-extrabold leading-none tracking-[-0.05em] text-[#111113]">
                {value}
              </div>
              <DeltaPill value={delta} />
            </div>
            <div className="mt-3 text-[11px] text-[#76767e]">{meta}</div>
          </div>

          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-[#F4F4F6] text-[#111]">
            {icon}
          </div>
        </div>
      </KCardInner>
    </KCard>
  );
}

function MiniBarRow({
  label,
  value,
  frac,
  rightLabel,
  subtitle,
}: {
  label: string;
  value: number;
  frac: number;
  rightLabel?: string;
  subtitle?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_56px] items-center gap-3 rounded-[16px] border border-[#ededf0] bg-[#fafafb] px-4 py-3">
      <div className="min-w-0">
        <div className="truncate text-[13px] font-semibold text-[#111]">{label}</div>
        <div className="mt-0.5 text-[11px] text-[#76767e]">
          {subtitle ?? `${value.toLocaleString()} clicks`}
        </div>
      </div>

      <div className="h-[8px] w-full overflow-hidden rounded-full bg-white ring-1 ring-[#e4e4e7]">
        <div
          className="h-full rounded-full bg-[#C4C8FF]"
          style={{ width: `${Math.max(3, Math.round(clamp01(frac) * 100))}%` }}
        />
      </div>

      <div className="text-right text-[11px] font-semibold text-[#111]">
        {rightLabel ?? `${Math.round(clamp01(frac) * 100)}%`}
      </div>
    </div>
  );
}

export function AnalyticsOverview({ data }: Props) {
  const { dateRange, totalEngagements, topDate, totals, growth, chat } = data;

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

  const countryRowsRaw = (data.byCountry ?? []).filter((c) => (c.count ?? 0) > 0);
  const countryClicksTotal =
    countryRowsRaw.reduce((sum, r) => sum + (r.count ?? 0), 0) || 1;

  const countryRows = countryRowsRaw
    .slice()
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    .slice(0, 7)
    .map((r) => {
      const pct = (r.count / countryClicksTotal) * 100;
      const label = countryDisplayName(r.country);
      const code = /^[A-Za-z]{2}$/.test((r.country || "").trim())
        ? r.country.trim().toUpperCase()
        : "";

      return {
        key: `${r.country}-${label}`,
        country: label,
        code,
        flag: code ? toFlagEmoji(code) : "🌍",
        clicks: r.count,
        pctLabel: pct < 1 ? "<1%" : `${Math.round(pct)}%`,
        barFrac: clamp01(pct / 100),
      };
    });

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
        pctLabel: pct < 1 ? "<1%" : `${Math.round(pct)}%`,
        barFrac: clamp01(pct / 100),
      };
    });

  const topCountry = countryRows[0];
  const topRef = refRows[0];
  const topCamp = (data.byCampaign ?? [])[0];

  async function handleExportCsv() {
    const rows: string[] = [];

    rows.push(["Metric", "Value"].map(csvEscape).join(","));
    rows.push(["Date from", fromLabel].map(csvEscape).join(","));
    rows.push(["Date to", toLabel].map(csvEscape).join(","));
    rows.push(["Total engagements", totalEngagements].map(csvEscape).join(","));
    rows.push(["Link clicks", totals.linkClicks].map(csvEscape).join(","));
    rows.push(["Contact submissions", totals.contactSubmissions].map(csvEscape).join(","));
    rows.push(["Subscribers", totals.subscribers].map(csvEscape).join(","));
    rows.push(["K-card messages", totals.kcardMessages].map(csvEscape).join(","));
    rows.push(["Avg per day", avgPerDay.toFixed(2)].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Chat", ""].map(csvEscape).join(","));
    rows.push(["Widget configured", chat.hasWidget ? "Yes" : "No"].map(csvEscape).join(","));
    rows.push(["Chat conversations", chat.totals.conversations].map(csvEscape).join(","));
    rows.push(["Chat messages", chat.totals.messages].map(csvEscape).join(","));
    rows.push(["Chat leads", chat.totals.leads].map(csvEscape).join(","));
    rows.push(["Messages today", chat.totals.messagesToday].map(csvEscape).join(","));
    rows.push(["Knowledge sources", chat.totals.sources].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top countries", ""].map(csvEscape).join(","));
    rows.push(["Country", "Clicks"].map(csvEscape).join(","));
    for (const c of data.byCountry) rows.push([c.country, c.count].map(csvEscape).join(","));
    rows.push("");

    rows.push(["Top campaigns", ""].map(csvEscape).join(","));
    rows.push(["Campaign", "Clicks"].map(csvEscape).join(","));
    for (const c of data.byCampaign) {
      rows.push([c.campaign, c.count].map(csvEscape).join(","));
    }
    rows.push("");

    rows.push(["Top sources", ""].map(csvEscape).join(","));
    rows.push(["Source", "Clicks"].map(csvEscape).join(","));
    for (const s of data.byUtmSource) {
      rows.push([s.source, s.count].map(csvEscape).join(","));
    }
    rows.push("");

    rows.push(["Top mediums", ""].map(csvEscape).join(","));
    rows.push(["Medium", "Clicks"].map(csvEscape).join(","));
    for (const m of data.byUtmMedium) {
      rows.push([m.medium, m.count].map(csvEscape).join(","));
    }
    rows.push("");

    rows.push(["Top referrers", ""].map(csvEscape).join(","));
    rows.push(["Referrer", "Clicks"].map(csvEscape).join(","));
    for (const r of data.byReferrer) {
      rows.push([r.referrer, r.count].map(csvEscape).join(","));
    }
    rows.push("");

    rows.push(["Top links", ""].map(csvEscape).join(","));
    rows.push(
      ["Title", "Short code", "Target URL", "Clicks", "Top campaign", "Last click at"]
        .map(csvEscape)
        .join(",")
    );
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

    const blob = new Blob([rows.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
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
    <motion.div
      variants={pageV}
      initial="hidden"
      animate="show"
      className="wf-dashboard-main flex flex-col gap-[14px]"
    >
      <motion.div variants={gridV} initial="hidden" animate="show" className="space-y-[14px]">
        <KCard>
          <KCardInner className="px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                  Analytics overview
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h1 className="text-[24px] font-semibold tracking-[-0.05em] text-[#111] sm:text-[28px]">
                    Clearer signals across performance and chat.
                  </h1>
                </div>
                <p className="mt-2 max-w-3xl text-[13px] leading-6 text-[#666670]">
                  Track engagement, conversion, and Kompi Chat activity from one operating view.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex h-10 items-center gap-2 rounded-full border border-[#e4e4e7] bg-[#fafafb] px-4 text-[12px] font-semibold text-[#111]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#C4C8FF]" />
                  {fromLabel} — {toLabel}
                </div>

                <StatusPill status={chat.widget.status} />

                <ActionButton href="/dashboard/chat">
                  <Bot className="h-4 w-4" />
                  Open chat
                </ActionButton>

                <ActionButton onClick={handleExportCsv} accent>
                  <Download className="h-4 w-4" />
                  Export CSV
                </ActionButton>
              </div>
            </div>
          </KCardInner>
        </KCard>

        <div className="grid gap-[14px] xl:grid-cols-4">
          <StatCard
            label="Link clicks"
            value={totals.linkClicks.toLocaleString()}
            meta="Tracked click events"
            delta={growth.linkClicksPct}
            icon={<MousePointerClick className="h-4 w-4" />}
          />
          <StatCard
            label="Contact submissions"
            value={totals.contactSubmissions.toLocaleString()}
            meta="Forms + inbound"
            delta={growth.contactSubmissionsPct}
            icon={<Mail className="h-4 w-4" />}
          />
          <StatCard
            label="Subscribers"
            value={totals.subscribers.toLocaleString()}
            meta="New signups"
            delta={growth.subscribersPct}
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard
            label="K-card messages"
            value={totals.kcardMessages.toLocaleString()}
            meta="Direct inbound messages"
            delta={growth.kcardMessagesPct}
            icon={<Flame className="h-4 w-4" />}
          />
        </div>

        <div className="grid gap-[14px] xl:grid-cols-4">
          <StatCard
            label="Chat conversations"
            value={chat.totals.conversations.toLocaleString()}
            meta="Within selected range"
            delta={chat.growth.conversationsPct}
            icon={<MessagesSquare className="h-4 w-4" />}
          />
          <StatCard
            label="Chat messages"
            value={chat.totals.messages.toLocaleString()}
            meta="Visitor + assistant messages"
            delta={chat.growth.messagesPct}
            icon={<MessageSquare className="h-4 w-4" />}
          />
          <StatCard
            label="Chat leads"
            value={chat.totals.leads.toLocaleString()}
            meta="Captured from the widget"
            delta={chat.growth.leadsPct}
            icon={<Sparkles className="h-4 w-4" />}
          />
          <StatCard
            label="Knowledge coverage"
            value={chat.totals.sources.toLocaleString()}
            meta={
              chat.hasWidget
                ? `${chat.widget.allowedDomainsCount} allowed domain${
                    chat.widget.allowedDomainsCount === 1 ? "" : "s"
                  }`
                : "Chat not configured yet"
            }
            icon={<Database className="h-4 w-4" />}
          />
        </div>

        <div className="grid gap-[14px] xl:grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)]">
          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Engagement dynamics
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    Daily click volume across the selected range.
                  </div>
                </div>

                <TonePill tone="lavender">Timeseries</TonePill>
              </div>

              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.timeseries}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ececf1" />
                    <XAxis
                      dataKey="date"
                      tickMargin={10}
                      tick={{ fill: "#8a8a94", fontSize: 11 }}
                      axisLine={{ stroke: "#ececf1" }}
                      tickLine={{ stroke: "#ececf1" }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: "#8a8a94", fontSize: 11 }}
                      axisLine={{ stroke: "#ececf1" }}
                      tickLine={{ stroke: "#ececf1" }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 14,
                        border: "1px solid #e4e4e7",
                        background: "white",
                        color: "#111113",
                        fontSize: 12,
                        boxShadow: "0 12px 30px rgba(16,24,40,0.10)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#6670D6"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{
                        r: 5,
                        fill: "#6670D6",
                        stroke: "white",
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-[16px] border border-[#ededf0] bg-[#fafafb] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#76767e]">
                    Avg / day
                  </div>
                  <div className="mt-2 text-[24px] font-extrabold tracking-[-0.05em] text-[#111]">
                    {avgPerDay.toFixed(1)}
                  </div>
                  <div className="mt-2 text-[11px] text-[#76767e]">
                    Based on {totalDays.toLocaleString()} days
                  </div>
                </div>

                <div className="rounded-[16px] border border-[#ededf0] bg-[#fafafb] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#76767e]">
                    Active days
                  </div>
                  <div className="mt-2 text-[24px] font-extrabold tracking-[-0.05em] text-[#111]">
                    {activeDays.toLocaleString()}
                  </div>
                  <div className="mt-2 text-[11px] text-[#76767e]">
                    Days with at least one click
                  </div>
                </div>

                <div className="rounded-[16px] border border-[#ededf0] bg-[#fafafb] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#76767e]">
                    Peak day
                  </div>
                  <div className="mt-2 text-[24px] font-extrabold tracking-[-0.05em] text-[#111]">
                    {topDate ? format(new Date(topDate.date), "MMM d") : "—"}
                  </div>
                  <div className="mt-2 text-[11px] text-[#76767e]">
                    {topDate ? `${topDate.count.toLocaleString()} clicks` : "No activity yet"}
                  </div>
                </div>
              </div>
            </KCardInner>
          </KCard>

          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Device mix
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    Where engagement is happening.
                  </div>
                </div>

                <TonePill>Audience</TonePill>
              </div>

              <div className="flex flex-col items-center gap-5 xl:items-stretch">
                <div className="h-[170px] w-[170px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceChart}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={54}
                        outerRadius={76}
                        paddingAngle={3}
                      >
                        {deviceChart.map((_, idx) => (
                          <Cell key={idx} fill={DEVICE_COLORS[idx % DEVICE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 14,
                          border: "1px solid #e4e4e7",
                          background: "white",
                          color: "#111113",
                          fontSize: 12,
                          boxShadow: "0 12px 30px rgba(16,24,40,0.10)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full space-y-2">
                  {deviceChart.length ? (
                    deviceChart.map((d, idx) => (
                      <div
                        key={d.name}
                        className="flex items-center justify-between rounded-[14px] border border-[#ededf0] bg-[#fafafb] px-3 py-2.5"
                      >
                        <span className="inline-flex min-w-0 items-center gap-2 text-[13px] text-[#111]">
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor: DEVICE_COLORS[idx % DEVICE_COLORS.length],
                            }}
                          />
                          <span className="truncate">{d.name}</span>
                        </span>
                        <span className="text-[11px] text-[#76767e]">
                          <span className="font-semibold text-[#111]">
                            {d.value.toLocaleString()}
                          </span>{" "}
                          · {d.percent.toFixed(1)}%
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[16px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                      Device data will appear once clicks come in.
                    </div>
                  )}
                </div>
              </div>
            </KCardInner>
          </KCard>
        </div>

        <div className="grid gap-[14px] xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Top signals
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    Quick reads across campaign, referrer, and country.
                  </div>
                </div>

                <HelpCircle className="h-4 w-4 text-[#8a8a94]" />
              </div>

              <div className="flex flex-wrap gap-2">
                {topCountry ? (
                  <TonePill tone="lavender">
                    {topCountry.flag} Top country: {topCountry.country}
                  </TonePill>
                ) : null}

                {topRef ? <TonePill>Top referrer: {topRef.name}</TonePill> : null}

                {topCamp && topCamp.campaign !== "—" ? (
                  <TonePill tone="amber">Top campaign: {topCamp.campaign}</TonePill>
                ) : null}

                {chat.hasWidget ? (
                  <TonePill tone={chat.widget.status === "ACTIVE" ? "green" : "amber"}>
                    Chat: {chat.widget.status?.toLowerCase()}
                  </TonePill>
                ) : (
                  <TonePill>Chat not configured</TonePill>
                )}
              </div>

              <div className="mt-5 space-y-3">
                <MiniBarRow
                  label="Top referrer"
                  value={topRef?.clicks ?? 0}
                  frac={topRef ? topRef.barFrac : 0}
                  rightLabel={topRef?.pctLabel ?? "0%"}
                  subtitle={topRef ? topRef.name : "No referrer data"}
                />
                <MiniBarRow
                  label="Top country"
                  value={topCountry?.clicks ?? 0}
                  frac={topCountry ? topCountry.barFrac : 0}
                  rightLabel={topCountry?.pctLabel ?? "0%"}
                  subtitle={topCountry ? topCountry.country : "No country data"}
                />
                <MiniBarRow
                  label="Chat leads"
                  value={chat.totals.leads}
                  frac={
                    chat.totals.conversations > 0
                      ? clamp01(chat.totals.leads / chat.totals.conversations)
                      : 0
                  }
                  rightLabel={
                    chat.totals.conversations > 0
                      ? `${Math.round(
                          (chat.totals.leads / chat.totals.conversations) * 100
                        )}%`
                      : "0%"
                  }
                  subtitle="Lead capture vs conversations"
                />
              </div>
            </KCardInner>
          </KCard>

          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Chat intelligence
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    Widget readiness, recent conversations, and launch health.
                  </div>
                </div>

                <ActionButton href="/dashboard/chat" accent>
                  <Bot className="h-4 w-4" />
                  Manage chat
                </ActionButton>
              </div>

              {!chat.hasWidget ? (
                <div className="rounded-[18px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-8">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#111]">
                        No chat widget yet
                      </div>
                      <p className="mt-2 max-w-xl text-[13px] leading-6 text-[#666670]">
                        Set up Kompi Chat to track conversations, messages, and lead capture
                        directly from this analytics page.
                      </p>
                      <div className="mt-4">
                        <ActionButton href="/dashboard/chat/widget" accent>
                          <Bot className="h-4 w-4" />
                          Set up widget
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="rounded-[18px] border border-[#ededf0] bg-[#fafafb] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#76767e]">
                            Widget
                          </div>
                          <div className="mt-2 text-[15px] font-semibold text-[#111]">
                            {chat.widget.name || "Kompi Chat"}
                          </div>
                          <div className="mt-1 text-[11px] text-[#76767e]">
                            {chat.widget.siteName || "No site connected"}
                          </div>
                        </div>
                        <StatusPill status={chat.widget.status} />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <TonePill tone="lavender">
                          {chat.widget.sourcesCount} source
                          {chat.widget.sourcesCount === 1 ? "" : "s"}
                        </TonePill>
                        <TonePill>
                          {chat.widget.allowedDomainsCount} domain
                          {chat.widget.allowedDomainsCount === 1 ? "" : "s"}
                        </TonePill>
                      </div>
                    </div>

                    <div className="rounded-[18px] border border-[#ededf0] bg-[#111] p-4 text-white">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-white/45">
                        Launch readout
                      </div>
                      <div className="mt-2 text-[16px] font-semibold tracking-[-0.03em] text-white">
                        {chat.widget.status === "ACTIVE"
                          ? "Widget is live-ready."
                          : chat.widget.status === "PAUSED"
                          ? "Widget is paused."
                          : "Widget is still in draft."}
                      </div>
                      <p className="mt-2 text-[12px] leading-6 text-white/66">
                        Messages, conversations, and lead capture are now tracked here
                        alongside your workspace analytics.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-[#ededf0] bg-[#fafafb] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[13px] font-semibold text-[#111]">
                          Recent conversations
                        </div>
                        <div className="text-[11px] text-[#76767e]">
                          Latest activity from the widget
                        </div>
                      </div>

                      <Link
                        href="/dashboard/chat/conversations"
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#40528D] hover:underline"
                      >
                        View all
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {chat.recentConversations.length === 0 ? (
                      <div className="rounded-[16px] border border-dashed border-[#e4e4e7] bg-white p-4 text-[12px] text-[#76767e]">
                        No conversations yet.
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        {chat.recentConversations.map((conversation) => (
                          <div
                            key={conversation.id}
                            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[14px] border border-[#e8e8ec] bg-white p-3"
                          >
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="text-[12px] font-semibold text-[#111]">
                                  {conversation.visitorName}
                                </div>
                                <TonePill tone="lavender">{conversation.status}</TonePill>
                              </div>
                              <div className="mt-1 truncate text-[11px] text-[#76767e]">
                                {conversation.lastMessage}
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <div className="rounded-full bg-[#C4C8FF] px-2 py-0.5 text-[10px] font-bold text-[#111]">
                                {conversation.messageCount}
                              </div>
                              <div className="text-[10px] text-[#a0a0a8]">
                                {relTime(conversation.updatedAt)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </KCardInner>
          </KCard>
        </div>

        <div className="grid gap-[14px] xl:grid-cols-3">
          <KCard>
            <KCardInner>
              <div className="mb-5">
                <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                  Top campaigns
                </div>
                <div className="text-[11px] text-[#76767e]">
                  Ranked by click volume.
                </div>
              </div>

              <div className="grid gap-2">
                {data.byCampaign.length ? (
                  data.byCampaign.slice(0, 8).map((c, i) => (
                    <div
                      key={`${c.campaign}-${i}`}
                      className="flex items-center justify-between rounded-[14px] border border-[#ededf0] bg-[#fafafb] px-4 py-3"
                    >
                      <span className="min-w-0 truncate text-[13px] font-semibold text-[#111]">
                        {c.campaign}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111]">
                        {c.count.toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[16px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                    No campaign data yet. Add <span className="font-semibold text-[#111]">utm_campaign</span> to your URLs.
                  </div>
                )}
              </div>
            </KCardInner>
          </KCard>

          <KCard>
            <KCardInner>
              <div className="mb-5">
                <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                  Sources & mediums
                </div>
                <div className="text-[11px] text-[#76767e]">
                  How your clicks are attributed.
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#76767e]">
                    Sources
                  </div>
                  <div className="space-y-2">
                    {data.byUtmSource.length ? (
                      data.byUtmSource.slice(0, 5).map((s, i) => (
                        <div
                          key={`${s.source}-${i}`}
                          className="flex items-center justify-between rounded-[14px] border border-[#ededf0] bg-[#fafafb] px-4 py-3"
                        >
                          <span className="min-w-0 truncate text-[13px] text-[#111]">
                            {s.source}
                          </span>
                          <span className="text-[11px] font-semibold text-[#111]">
                            {s.count.toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[14px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-3 text-[12px] text-[#76767e]">
                        No sources yet.
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#76767e]">
                    Mediums
                  </div>
                  <div className="space-y-2">
                    {data.byUtmMedium.length ? (
                      data.byUtmMedium.slice(0, 5).map((m, i) => (
                        <div
                          key={`${m.medium}-${i}`}
                          className="flex items-center justify-between rounded-[14px] border border-[#ededf0] bg-[#fafafb] px-4 py-3"
                        >
                          <span className="min-w-0 truncate text-[13px] text-[#111]">
                            {m.medium}
                          </span>
                          <span className="text-[11px] font-semibold text-[#111]">
                            {m.count.toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[14px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-3 text-[12px] text-[#76767e]">
                        No mediums yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </KCardInner>
          </KCard>

          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Top links
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    What’s getting clicked right now.
                  </div>
                </div>

                <ActionButton href="/dashboard/links/new">
                  <ExternalLink className="h-4 w-4" />
                  New link
                </ActionButton>
              </div>

              <div className="grid gap-2">
                {data.topLinks.length ? (
                  data.topLinks.map((l) => (
                    <div
                      key={l.id}
                      className="rounded-[16px] border border-[#ededf0] bg-[#fafafb] px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 text-[13px] font-semibold text-[#111]">
                          <div className="truncate">{l.title ?? l.code ?? "Untitled link"}</div>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111]">
                          {l.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-[#76767e]">
                        <span className="min-w-0 truncate">
                          {l.utmCampaignTop ? `Campaign: ${l.utmCampaignTop}` : "Campaign: —"}
                        </span>
                        <span className="shrink-0">
                          {l.lastClickAt ? format(new Date(l.lastClickAt), "MMM d") : "—"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[16px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                    No link activity yet.
                  </div>
                )}
              </div>
            </KCardInner>
          </KCard>
        </div>

        <div className="grid gap-[14px] xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <KCard>
            <KCardInner>
              <div className="mb-5">
                <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                  Top referrers
                </div>
                <div className="text-[11px] text-[#76767e]">
                  Where clicks are coming from.
                </div>
              </div>

              {refRows.length ? (
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
                  <div className="pt-1 text-[11px] text-[#76767e]">
                    Based on <span className="font-semibold text-[#111]">{refTotal.toLocaleString()}</span> referrer-attributed clicks.
                  </div>
                </div>
              ) : (
                <div className="rounded-[16px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                  No referrer data yet.
                </div>
              )}
            </KCardInner>
          </KCard>

          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Top countries
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    Estimated by request geo when available.
                  </div>
                </div>

                <Globe2 className="h-4 w-4 text-[#8a8a94]" />
              </div>

              {countryRows.length ? (
                <div className="space-y-2">
                  {countryRows.map((row) => (
                    <div
                      key={row.key}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_56px] items-center gap-3 rounded-[16px] border border-[#ededf0] bg-[#fafafb] px-4 py-3"
                    >
                      <div className="min-w-0 flex items-center gap-3">
                        <span className="text-[18px] leading-none">{row.flag}</span>
                        <span className="truncate text-[13px] font-semibold text-[#111]">
                          {row.country}
                        </span>
                      </div>

                      <div className="h-[8px] w-full overflow-hidden rounded-full bg-white ring-1 ring-[#e4e4e7]">
                        <div
                          className="h-full rounded-full bg-[#C4C8FF]"
                          style={{
                            width: `${Math.max(3, Math.round(row.barFrac * 100))}%`,
                          }}
                        />
                      </div>

                      <div className="text-right text-[11px] font-semibold text-[#111]">
                        {row.pctLabel}
                      </div>
                    </div>
                  ))}

                  <div className="pt-1 text-[11px] text-[#76767e]">
                    Based on{" "}
                    <span className="font-semibold text-[#111]">
                      {countryClicksTotal.toLocaleString()}
                    </span>{" "}
                    geo-attributed clicks.
                  </div>
                </div>
              ) : (
                <div className="rounded-[16px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                  No location data yet.
                </div>
              )}
            </KCardInner>
          </KCard>
        </div>

        <KCard>
          <KCardInner className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[13px] text-[#666670]">
                <span className={`${instrumentSerif.className} italic text-[#111]`}>
                  Quiet insights.
                </span>{" "}
                Export the numbers, validate your campaigns, and keep chat performance in the same operating view.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <ActionButton onClick={handleExportCsv} accent>
                <Download className="h-4 w-4" />
                Export report
              </ActionButton>
              <ActionButton href="/dashboard/chat">
                <Bot className="h-4 w-4" />
                Open chat
              </ActionButton>
            </div>
          </KCardInner>
        </KCard>
      </motion.div>
    </motion.div>
  );
}