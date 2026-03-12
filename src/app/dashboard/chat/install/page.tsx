"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Code2,
  Copy,
  CheckCheck,
  Sparkles,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  RefreshCw,
  Plus,
  Globe2,
  Rocket,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

type WidgetData = {
  publicToken: string;
  status: string;
  name: string | null;
  siteName: string | null;
  allowedDomains?: string[];
} | null;

function snippetForToken(token: string, base: string) {
  return `<script src="${base}/chat-widget.js" data-kompi-chat="${token}" defer></script>`;
}

const CHECKLIST = [
  {
    icon: Rocket,
    title: "Activate the widget",
    body: "Set the widget status to Active so the launcher and embed can actually render on a live site.",
    href: "/dashboard/chat/widget",
    linkLabel: "Open widget settings",
  },
  {
    icon: ShieldCheck,
    title: "Lock allowed domains",
    body: "Add the client domain before launch so the widget feels controlled, secure, and properly scoped.",
    href: "/dashboard/chat/widget",
    linkLabel: "Manage domains",
  },
  {
    icon: BookOpen,
    title: "Add knowledge sources",
    body: "Connect real FAQs, URLs, and business context so replies feel useful instead of generic.",
    href: "/dashboard/chat/sources",
    linkLabel: "Manage knowledge",
  },
];

function KCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-[#e7e7ea] bg-white shadow-[0_16px_42px_rgba(0,0,0,0.05)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function KCardInner({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function StatRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[18px] border border-[#ececf0] bg-[#fafafc] px-4 py-4">
      <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111]">
        {icon}
        {label}
      </span>
      <span className="text-[13px] text-[#6f6f78]">{value}</span>
    </div>
  );
}

export default function DashboardChatInstallPage() {
  const [widget, setWidget] = useState<WidgetData>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [appUrl, setAppUrl] = useState("https://app.kompi.co");

  useEffect(() => {
    setAppUrl(window.location.origin);
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/chat/widget", { cache: "no-store" });
        const json = (await res.json()) as { widget?: WidgetData };
        if (mounted && json.widget) setWidget(json.widget);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const snippet = widget ? snippetForToken(widget.publicToken, appUrl) : "";

  const launchScore = useMemo(() => {
    if (!widget) return 0;
    let score = 0;
    if (widget.status === "ACTIVE") score += 1;
    if ((widget.allowedDomains?.length ?? 0) > 0) score += 1;
    return score;
  }, [widget]);

  async function handleCopySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      //
    }
  }

  async function handleCopyToken() {
    if (!widget?.publicToken) return;
    try {
      await navigator.clipboard.writeText(widget.publicToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2200);
    } catch {
      //
    }
  }

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Install"
      pageDescription="Copy the embed, verify launch readiness, and put Kompi Chat live on the client site."
    >
      <div className="space-y-[14px]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#C4C8FF] px-4 text-[13px] font-semibold text-[#111]"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <Link
            href="/dashboard/chat/sources"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-[13px] font-semibold text-[#111] transition hover:bg-[#f8f8fb]"
          >
            <Plus className="h-4 w-4" />
            Add source
          </Link>
        </div>

        {loading ? (
          <KCard>
            <KCardInner>
              <div className="text-sm text-[#767680]">Loading install details…</div>
            </KCardInner>
          </KCard>
        ) : !widget ? (
          <KCard>
            <KCardInner className="p-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                <Code2 className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-[22px] font-semibold tracking-[-0.04em] text-[#111]">
                Create your widget first
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6f6f7a]">
                Your public install token is generated the first time you save a widget.
                Once that exists, this page becomes your launch handoff.
              </p>
              <Link
                href="/dashboard/chat/widget"
                className="mt-6 inline-flex items-center justify-center rounded-[14px] bg-[#C4C8FF] px-5 py-3 text-sm font-semibold text-[#111]"
              >
                Go to widget settings
              </Link>
            </KCardInner>
          </KCard>
        ) : (
          <div className="grid gap-[14px] xl:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-[14px]">
              <KCard
                style={{
                  background: "linear-gradient(180deg, #17181b 0%, #101114 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    padding: "24px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.08)",
                          padding: "7px 12px",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.68)",
                        }}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Install snippet
                      </div>

                      <div
                        style={{
                          marginTop: 16,
                          fontSize: 28,
                          lineHeight: 1,
                          fontWeight: 700,
                          letterSpacing: "-0.05em",
                          color: "#ffffff",
                        }}
                      >
                        Launch {widget.name || "Kompi Chat"}
                      </div>

                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 14,
                          color: "rgba(255,255,255,0.58)",
                        }}
                      >
                        {widget.siteName || "Your site"} · production-ready embed
                      </div>
                    </div>

                    <button
                      onClick={handleCopySnippet}
                      className="inline-flex h-11 items-center gap-2 rounded-[14px] px-4 text-sm font-semibold transition"
                      style={
                        copied
                          ? {
                              background: "#3A9459",
                              color: "#fff",
                            }
                          : {
                              background: "rgba(255,255,255,0.1)",
                              color: "#fff",
                            }
                      }
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy snippet
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div style={{ padding: 24 }}>
                  <pre
                    style={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      overflowX: "auto",
                      borderRadius: 24,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.06)",
                      padding: 20,
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.86)",
                      fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    }}
                  >
                    {snippet}
                  </pre>
                </div>

                <div className="grid gap-0 md:grid-cols-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div
                    style={{
                      padding: 24,
                      borderRight: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      Public token
                    </div>

                    <div
                      style={{
                        marginTop: 10,
                        wordBreak: "break-all",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.72)",
                        fontFamily:
                          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      }}
                    >
                      {widget.publicToken}
                    </div>

                    <button
                      onClick={handleCopyToken}
                      className="mt-3 inline-flex items-center gap-2 rounded-[12px] px-4 py-2 text-sm font-semibold transition"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      {copiedToken ? "Copied" : "Copy token"}
                    </button>
                  </div>

                  <div style={{ padding: 24 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      Placement
                    </div>

                    <p
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.64)",
                      }}
                    >
                      Paste the snippet right before the closing{" "}
                      <code
                        style={{
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.1)",
                          padding: "2px 6px",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        &lt;/body&gt;
                      </code>{" "}
                      tag on the client website.
                    </p>
                  </div>
                </div>
              </KCard>

              <KCard>
                <KCardInner>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-bold tracking-[-0.03em] text-[#111]">
                        Embed handoff
                      </div>
                      <div className="mt-1 text-[12px] text-[#777782]">
                        This is the only script most clients need.
                      </div>
                    </div>

                    <div className="rounded-full bg-[#EEF8F1] px-3 py-1 text-[11px] font-semibold text-[#2D8A52]">
                      Simple install
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-[#e8e8ec] bg-[#fafafc] p-4">
                    <div className="text-[12px] font-semibold text-[#111]">
                      What the script does
                    </div>
                    <div className="mt-2 grid gap-2 text-[13px] leading-6 text-[#6a6a74]">
                      <p>Loads the Kompi launcher.</p>
                      <p>Opens a branded floating chat panel.</p>
                      <p>Connects to this widget using the public token above.</p>
                    </div>
                  </div>
                </KCardInner>
              </KCard>
            </div>

            <div className="grid gap-[14px] self-start">
              <KCard>
                <KCardInner>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold tracking-[-0.03em] text-[#111]">
                        Launch readiness
                      </div>
                      <div className="text-[11px] text-[#777782]">
                        How close this widget is to going live.
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 rounded-[22px] border border-[#e7e7ec] bg-[#fafafc] p-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                          Score
                        </div>
                        <div className="mt-1 text-[30px] font-extrabold tracking-[-0.06em] text-[#111]">
                          {launchScore}/2
                        </div>
                      </div>

                      <div className="h-[8px] w-[140px] overflow-hidden rounded-full bg-[#e8e8ed]">
                        <div
                          className="h-full rounded-full bg-[#6670D6] transition-all"
                          style={{ width: `${(launchScore / 2) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <StatRow
                      label="Widget status"
                      value={
                        <span className="rounded-full bg-[#EEF1FF] px-2.5 py-1 text-[11px] font-semibold text-[#47568E]">
                          {widget.status}
                        </span>
                      }
                    />
                    <StatRow label="Site name" value={widget.siteName || "Not set"} />
                    <StatRow
                      label="Allowed domains"
                      value={widget.allowedDomains?.length ?? 0}
                      icon={<Globe2 className="h-4 w-4 text-[#6a78b0]" />}
                    />
                  </div>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold tracking-[-0.03em] text-[#111]">
                        Before you go live
                      </div>
                      <div className="text-[11px] text-[#777782]">
                        A clean launch feels more premium.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {CHECKLIST.map(({ icon: Icon, title, body, href, linkLabel }, i) => (
                      <div
                        key={title}
                        className="flex gap-4 rounded-[22px] border border-[#e7e7ec] bg-[#FAFAF7] p-4"
                      >
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEF1FF] text-sm font-bold text-[#5568A4]">
                          {i + 1}
                        </div>

                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 text-sm font-semibold text-[#111]">
                            <Icon className="h-3.5 w-3.5 shrink-0 text-[#8D9DFF]" />
                            {title}
                          </p>
                          <p className="mt-1 text-[13px] leading-5 text-[#6f6f78]">
                            {body}
                          </p>
                          <Link
                            href={href}
                            className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#40528D] hover:underline"
                          >
                            {linkLabel}
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </KCardInner>
              </KCard>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
