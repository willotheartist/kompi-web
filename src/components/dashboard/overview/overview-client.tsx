"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Copy,
  Eye,
  IdCard,
  Inbox,
  Link2,
  Loader2,
  MousePointerClick,
  Plus,
  QrCode,
  ScanLine,
  type LucideIcon,
} from "lucide-react";
import type { DashboardOverview, SeriesKey } from "@/lib/dashboard-overview";
import { CountUp, Delta, EASE, Meter, Panel, Rise, Sparkline, Stagger, buttonStyles } from "../ui";
import { useCreate } from "../shell/create-actions";
import { cn } from "@/lib/utils";

// Kept local so the overview bundle does not pull in the QR studio libraries.
const KR_TYPE_NAMES: Record<string, string> = { url: "Website", file: "PDF / file", social: "Social", app: "App", wifi: "Wi-Fi", email: "Email", sms: "SMS", phone: "Phone", text: "Text", location: "Location" };

const METRIC_META: Record<SeriesKey, { icon: LucideIcon; color: string; tint: string; href: string }> = {
  links: { icon: MousePointerClick, color: "#3D5AFE", tint: "#E6ECFA", href: "/links" },
  qr: { icon: ScanLine, color: "#2F7D55", tint: "#E7F0EA", href: "/kr-codes/your" },
  cards: { icon: Eye, color: "#B24BB0", tint: "#FBE4FA", href: "/dashboard/cards" },
  messages: { icon: Inbox, color: "#C76A1C", tint: "#FBEEDF", href: "/messages" },
};

function greeting(hour: number) {
  if (hour < 5) return "Up late";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Greeting({ name }: { name?: string | null }) {
  const [now, setNow] = useState<Date | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- greeting depends on the viewer's local clock.
  useEffect(() => setNow(new Date()), []);
  const first = name?.trim().split(/\s+/)[0];
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mb-2.5 h-4 text-[12px] font-medium uppercase tracking-[0.1em] text-[#80858C]"
        >
          {now ? now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }) : ""}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
          className="text-[30px] font-medium leading-[1.1] tracking-[-0.055em] sm:text-[40px]"
        >
          {now ? greeting(now.getHours()) : "Welcome back"}
          {first ? `, ${first}` : ""}.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          className="mt-2.5 text-[15px] text-[#696C72]"
        >
          Here’s how your Cards, codes and links did over the last 30 days.
        </motion.p>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.12 }} className="flex gap-2">
        <Link href="/analytics" className={buttonStyles.secondary}>
          <BarChart3 size={16} /> Analytics
        </Link>
        <Link href="/kr-codes" className={buttonStyles.primary}>
          <Plus size={16} /> New QR code
        </Link>
      </motion.div>
    </header>
  );
}

export function OverviewClient({ data }: { data: DashboardOverview }) {
  return (
    <div className="space-y-6">
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {data.metrics.map((m) => (
          <Rise key={m.key}>
            <StatCard metric={m} />
          </Rise>
        ))}
      </Stagger>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <ActivityPanel series={data.series} />
        <MakePanel counts={data.counts} limits={data.plan.limits} planName={data.plan.name} />
      </div>

      <Stagger className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <Rise>
          <RecentLinks links={data.recentLinks} />
        </Rise>
        <Rise>
          <RecentCodes codes={data.recentCodes} />
        </Rise>
        <Rise className="lg:col-span-2 2xl:col-span-1">
          <YourCards cards={data.cards} />
        </Rise>
      </Stagger>
    </div>
  );
}

function StatCard({ metric }: { metric: DashboardOverview["metrics"][number] }) {
  const meta = METRIC_META[metric.key];
  const Icon = meta.icon;
  return (
    <Link
      href={meta.href}
      className="group block h-full rounded-[16px] border border-[#E3E5E7] bg-white p-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#CDD1D7] sm:p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[13px] text-[#696C72] sm:text-[14px]">
          <span className="grid size-7 place-items-center rounded-[8px] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110" style={{ background: meta.tint, color: meta.color }}>
            <Icon size={15} strokeWidth={2} />
          </span>
          {metric.label}
        </span>
        <ArrowUpRight size={15} className="text-[#C2C5CA] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#151619]" />
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <CountUp value={metric.period} className="text-[30px] font-medium leading-none tracking-[-0.05em] sm:text-[36px]" />
        {metric.delta === null ? <span className="rounded-[6px] bg-[#EEF3ED] px-1.5 py-0.5 text-[12px] font-medium text-[#357452]">New</span> : <Delta value={metric.delta} />}
      </div>
      <Sparkline data={metric.spark} stroke={meta.color} height={36} className="mt-4" />
      <p className="mt-2 text-[12px] text-[#8A9099]">{metric.allTime.toLocaleString()} all time</p>
    </Link>
  );
}

const RANGE = [
  { key: "links", label: "Links" },
  { key: "qr", label: "QR" },
  { key: "cards", label: "Cards" },
  { key: "messages", label: "Messages" },
] as const;

function ActivityPanel({ series }: { series: DashboardOverview["series"] }) {
  const [active, setActive] = useState<SeriesKey[]>(["links", "qr", "cards"]);
  const total = useMemo(() => series.reduce((s, p) => s + active.reduce((a, k) => a + p[k], 0), 0), [series, active]);
  const empty = useMemo(() => series.every((p) => p.links + p.qr + p.cards + p.messages === 0), [series]);
  const toggle = (k: SeriesKey) => setActive((cur) => (cur.includes(k) ? (cur.length > 1 ? cur.filter((x) => x !== k) : cur) : [...cur, k]));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}>
      <Panel
        title="Activity"
        icon={BarChart3}
        bodyClassName="p-0 sm:p-0"
        action={
          <div className="flex flex-wrap items-center gap-1">
            {RANGE.map((r) => {
              const on = active.includes(r.key);
              return (
                <button
                  key={r.key}
                  onClick={() => toggle(r.key)}
                  aria-pressed={on}
                  className={cn(
                    "flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1 text-[13px] transition-colors",
                    on ? "border-[#E3E5E7] bg-white text-[#151619]" : "border-transparent text-[#8A9099] hover:text-[#151619]",
                  )}
                >
                  <span className="size-2 rounded-full transition-opacity" style={{ background: METRIC_META[r.key].color, opacity: on ? 1 : 0.3 }} />
                  {r.label}
                </button>
              );
            })}
          </div>
        }
      >
        <div className="flex items-baseline gap-2 px-5 pt-5 sm:px-6">
          <CountUp value={total} className="text-[26px] font-medium tracking-[-0.04em]" />
          <span className="text-[14px] text-[#80858C]">interactions · last 30 days</span>
        </div>
        <div className="relative h-[260px] px-2 pb-3 pt-2 sm:h-[300px]">
          {empty && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-center">
              <p className="text-[15px] font-medium">Quiet so far.</p>
              <p className="max-w-xs text-[14px] text-[#80858C]">Share a link, print a code or publish your Card. Visits appear here as they happen.</p>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
              <defs>
                {RANGE.map((r) => (
                  <linearGradient key={r.key} id={`ov-${r.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={METRIC_META[r.key].color} stopOpacity={0.14} />
                    <stop offset="100%" stopColor={METRIC_META[r.key].color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} stroke="#EEF0F2" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#8A9099" }}
                tickFormatter={(d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString(undefined, { day: "numeric", month: "short", timeZone: "UTC" })}
                minTickGap={28}
              />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8A9099" }} width={40} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#CDD1D7", strokeDasharray: "3 3" }} />
              {RANGE.filter((r) => active.includes(r.key)).map((r) => (
                <Area
                  key={r.key}
                  type="monotone"
                  dataKey={r.key}
                  name={r.label}
                  stroke={METRIC_META[r.key].color}
                  strokeWidth={1.8}
                  fill={`url(#ov-${r.key})`}
                  animationDuration={900}
                  animationEasing="ease-out"
                  activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </motion.div>
  );
}

type TooltipPayload = { name?: string; value?: number; color?: string; dataKey?: string };
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length || !label) return null;
  return (
    <div className="min-w-[160px] rounded-[10px] border border-[#E3E5E7] bg-white px-3 py-2.5 text-[13px]">
      <p className="mb-1.5 font-medium">{new Date(`${label}T00:00:00Z`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" })}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center justify-between gap-4 text-[#5A5E65]">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: METRIC_META[p.dataKey as SeriesKey]?.color }} />
            {p.name}
          </span>
          <span className="font-medium tabular-nums text-[#151619]">{p.value?.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

function MakePanel({ counts, limits, planName }: { counts: DashboardOverview["counts"]; limits: DashboardOverview["plan"]["limits"]; planName: string }) {
  const { create, busy } = useCreate();
  const items = [
    { kind: "card" as const, label: "Kompi Card", body: "Your links and contact details at one address.", icon: IdCard, tint: "#FBE4FA", used: counts.cards, max: limits.kCards, manage: "/dashboard/cards" },
    { kind: "qr" as const, label: "QR code", body: "Design it, print it, follow every scan.", icon: QrCode, tint: "#E7F0EA", used: counts.qr, max: limits.krCodes, manage: "/kr-codes/your" },
    { kind: "link" as const, label: "Short link", body: "A cleaner link that tracks visits.", icon: Link2, tint: "#E6ECFA", used: counts.links, max: limits.links, manage: "/links" },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}>
      <Panel title="Make something" icon={Plus} bodyClassName="p-2 sm:p-2" action={<Link href="/dashboard/settings/billing" className="text-[13px] text-[#80858C] hover:text-[#151619]">{planName} plan</Link>}>
        {items.map((item, i) => {
          const Icon = item.icon;
          const full = item.used >= item.max;
          return (
            <motion.div
              key={item.kind}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.28 + i * 0.06 }}
              className="group rounded-[12px] p-3 transition-colors hover:bg-[#F7F8F9]"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-[11px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" style={{ background: item.tint }}>
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <Link href={item.manage} className="text-[15px] font-medium hover:underline hover:underline-offset-4">
                      {item.label}s
                    </Link>
                    <button
                      onClick={() => void create(item.kind)}
                      disabled={busy !== null || full}
                      title={full ? "Plan limit reached" : `New ${item.label}`}
                      className="inline-flex h-8 items-center gap-1 rounded-[8px] border border-[#E3E5E7] bg-white px-2.5 text-[13px] font-medium transition-colors hover:border-[#151619] disabled:opacity-40"
                    >
                      {busy === item.kind ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} New
                    </button>
                  </div>
                  <p className="mt-0.5 text-[13px] leading-snug text-[#80858C]">{item.body}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <Meter used={item.used} max={item.max} className="flex-1" />
                    <span className="shrink-0 text-[12px] tabular-nums text-[#80858C]">
                      {item.used.toLocaleString()} / {item.max.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </Panel>
    </motion.div>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function Favicon({ url, size = 36 }: { url: string; size?: number }) {
  const host = hostOf(url);
  const [failed, setFailed] = useState(false);
  // An image that fails before hydration never fires React's onError, so check once mounted.
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <span className="grid shrink-0 place-items-center overflow-hidden rounded-[10px] border border-[#E9EBEE] bg-[#F8F9FA]" style={{ width: size, height: size }}>
      {host && !failed ? (
        <img
          ref={img}
          src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`}
          alt=""
          width={size * 0.5}
          height={size * 0.5}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <Link2 size={size * 0.45} className="text-[#8A9099]" />
      )}
    </span>
  );
}

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void navigator.clipboard?.writeText(value).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        });
      }}
      aria-label={done ? "Copied" : label}
      title={done ? "Copied" : label}
      className={cn("inline-grid size-8 place-items-center rounded-[8px] text-[#80858C] transition-colors hover:bg-[#F1F2F4] hover:text-[#151619]", className)}
    >
      <motion.span key={done ? "y" : "n"} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
        {done ? <Check size={15} className="text-[#2F7D55]" /> : <Copy size={15} />}
      </motion.span>
    </button>
  );
}

function ListEmpty({ icon: Icon, text, href, cta }: { icon: LucideIcon; text: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
      <span className="grid size-11 place-items-center rounded-[12px] border border-[#E9EBEE] bg-[#F8F9FA] text-[#80858C]">
        <Icon size={20} strokeWidth={1.7} />
      </span>
      <p className="max-w-[240px] text-[14px] text-[#80858C]">{text}</p>
      <Link href={href} className="inline-flex items-center gap-1.5 text-[14px] font-medium hover:underline hover:underline-offset-4">
        {cta} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function ViewAll({ href }: { href: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1 text-[13px] text-[#80858C] transition-colors hover:text-[#151619]">
      View all <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

function RecentLinks({ links }: { links: DashboardOverview["recentLinks"] }) {
  return (
    <Panel title="Recent links" icon={Link2} action={<ViewAll href="/links" />} bodyClassName="p-2 sm:p-2" className="h-full">
      {!links.length ? (
        <ListEmpty icon={Link2} text="Short links you create appear here, with their visits." href="/links/new" cta="Create a short link" />
      ) : (
        links.map((l) => (
          <Link key={l.id} href={`/links/${l.id}`} className="group flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors hover:bg-[#F7F8F9]">
            <Favicon url={l.targetUrl} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">{l.title || hostOf(l.targetUrl) || l.targetUrl}</p>
              <p className="truncate text-[13px] text-[#80858C]">{l.shortUrl?.replace(/^https?:\/\//, "") ?? l.targetUrl}</p>
            </div>
            {l.shortUrl && <CopyButton value={l.shortUrl} label="Copy short link" className="opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" />}
            <span className="w-16 shrink-0 text-right text-[13px] tabular-nums text-[#5A5E65]">
              {l.clicks.toLocaleString()} <span className="text-[#A2A6AC]">visits</span>
            </span>
          </Link>
        ))
      )}
    </Panel>
  );
}

function RecentCodes({ codes }: { codes: DashboardOverview["recentCodes"] }) {
  return (
    <Panel title="Recent QR codes" icon={QrCode} action={<ViewAll href="/kr-codes/your" />} bodyClassName="p-2 sm:p-2" className="h-full">
      {!codes.length ? (
        <ListEmpty icon={QrCode} text="Design a code worth scanning. Saved codes show up here." href="/kr-codes" cta="Create a QR code" />
      ) : (
        codes.map((c) => (
          <Link key={c.id} href={`/kr-codes?krcodeId=${c.id}`} className="group flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors hover:bg-[#F7F8F9]">
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#E7F0EA] text-[#2F7D55] transition-transform duration-300 group-hover:rotate-[-6deg]">
              <QrCode size={18} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">{c.title || hostOf(c.destination) || KR_TYPE_NAMES[c.type || "url"] || "QR code"}</p>
              <p className="truncate text-[13px] text-[#80858C]">
                {KR_TYPE_NAMES[c.type || "url"] ?? "QR code"} · {c.dynamic ? "Dynamic" : "Direct"}
              </p>
            </div>
            <span className="w-16 shrink-0 text-right text-[13px] tabular-nums text-[#5A5E65]">
              {c.dynamic ? (
                <>
                  {c.scans.toLocaleString()} <span className="text-[#A2A6AC]">scans</span>
                </>
              ) : (
                <span className="text-[#A2A6AC]">—</span>
              )}
            </span>
          </Link>
        ))
      )}
    </Panel>
  );
}

function YourCards({ cards }: { cards: DashboardOverview["cards"] }) {
  return (
    <Panel title="Your Cards" icon={IdCard} action={<ViewAll href="/dashboard/cards" />} bodyClassName="p-2 sm:p-2" className="h-full">
      {!cards.length ? (
        <ListEmpty icon={IdCard} text="Put your links, socials and contact details in one Card." href="/dashboard/cards" cta="Create your Card" />
      ) : (
        cards.map((c) => (
          <Link key={c.id} href={`/k-cards?cardId=${c.id}`} className="group flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors hover:bg-[#F7F8F9]">
            <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-[#E9EBEE] bg-[#FBE4FA] text-[14px] font-medium">
              {c.avatar ? <img src={c.avatar} alt="" className="h-full w-full object-cover" /> : c.title.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">{c.title}</p>
              <p className="truncate text-[13px] text-[#80858C]">{c.slug ? `kompi.app/${c.slug}` : "No public address yet"}</p>
            </div>
            <StatusDot on={c.published} />
          </Link>
        ))
      )}
    </Panel>
  );
}

export function StatusDot({ on, onLabel = "Live", offLabel = "Draft" }: { on: boolean; onLabel?: string; offLabel?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium", on ? "bg-[#EEF3ED] text-[#357452]" : "bg-[#F1F2F4] text-[#696C72]")}>
      <span className="relative flex size-1.5">
        {on && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#357452] opacity-50 [animation-duration:2.4s]" />}
        <span className={cn("relative inline-flex size-1.5 rounded-full", on ? "bg-[#357452]" : "bg-[#A2A6AC]")} />
      </span>
      {on ? onLabel : offLabel}
    </span>
  );
}
