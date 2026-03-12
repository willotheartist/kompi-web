"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Copy,
  CheckCheck,
  CircleDot,
  Zap,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  RefreshCw,
  Plus,
  Globe2,
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
    icon: Zap,
    title: "Activate the widget",
    body: "Set the widget status to Active so the embed can go live cleanly.",
    href: "/dashboard/chat/widget",
    linkLabel: "Widget settings",
  },
  {
    icon: ShieldCheck,
    title: "Lock allowed domains",
    body: "Add the real client domain so the widget only loads where it should.",
    href: "/dashboard/chat/widget",
    linkLabel: "Widget settings",
  },
  {
    icon: BookOpen,
    title: "Add knowledge sources",
    body: "Give the assistant real URLs, FAQs, and brand context before install.",
    href: "/dashboard/chat/sources",
    linkLabel: "Manage sources",
  },
];

function KCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[22px] border border-[#e4e4e7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.045)] ${className}`}
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
  return <div className={`p-4 ${className}`}>{children}</div>;
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

  async function handleCopySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      //
    }
  }

  async function handleCopyToken() {
    if (!widget?.publicToken) return;
    try {
      await navigator.clipboard.writeText(widget.publicToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    } catch {
      //
    }
  }

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Install"
      pageDescription="Copy the real embed snippet, verify the token, and launch the widget on a live site from inside the main dashboard."
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
              <div className="text-sm text-[#767680]">Loading…</div>
            </KCardInner>
          </KCard>
        ) : !widget ? (
          <KCard>
            <KCardInner className="p-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                <Code2 className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[#111]">
                Create your widget first
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6f6f7a]">
                A public install token is generated when you save your first widget.
              </p>
              <Link
                href="/dashboard/chat/widget"
                className="mt-5 inline-flex items-center justify-center rounded-[12px] bg-[#C4C8FF] px-5 py-2.5 text-sm font-semibold text-[#111]"
              >
                Go to widget settings
              </Link>
            </KCardInner>
          </KCard>
        ) : (
          <div className="grid gap-[14px] xl:grid-cols-[1.08fr_0.92fr]">
            <KCard className="overflow-hidden bg-[#111] text-white shadow-[0_16px_46px_rgba(0,0,0,0.22)]">
              <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    Install snippet
                  </div>
                  <div className="mt-1 text-base font-semibold text-white">
                    {widget.name || "Kompi Chat"} · {widget.siteName || "Your site"}
                  </div>
                </div>

                <button
                  onClick={handleCopySnippet}
                  className={`inline-flex items-center gap-2 rounded-[12px] px-4 py-2 text-sm font-semibold transition ${
                    copied
                      ? "bg-[#3A9459] text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
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

              <div className="p-6">
                <pre className="whitespace-pre-wrap break-all rounded-[24px] border border-white/10 bg-white/5 p-5 font-mono text-[13px] leading-6 text-white/82">
                  {snippet}
                </pre>
              </div>

              <div className="grid gap-0 border-t border-white/10 md:grid-cols-2">
                <div className="border-b border-white/10 px-6 py-5 md:border-b-0 md:border-r md:border-white/10">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Public token
                  </div>
                  <div className="mt-2 break-all font-mono text-[13px] text-white/68">
                    {widget.publicToken}
                  </div>

                  <button
                    onClick={handleCopyToken}
                    className="mt-3 inline-flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedToken ? "Copied" : "Copy token"}
                  </button>
                </div>

                <div className="px-6 py-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Install note
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    Paste this just before the closing{" "}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 text-[12px] text-white/75">
                      &lt;/body&gt;
                    </code>{" "}
                    tag on the client website.
                  </p>
                </div>
              </div>
            </KCard>

            <div className="grid gap-[14px]">
              <KCard>
                <KCardInner>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <CircleDot className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Before you go live
                      </div>
                      <div className="text-[11px] text-[#777782]">
                        Launch cleanly, not half-finished.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {CHECKLIST.map(({ icon: Icon, title, body, href, linkLabel }, i) => (
                      <div
                        key={title}
                        className="flex gap-4 rounded-[22px] border border-[#e4e4e7] bg-[#FAFAF7] p-4"
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

              <KCard>
                <KCardInner>
                  <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                    Launch state
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[20px] border border-[#e4e4e7] bg-[#fafafc] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-semibold text-[#111]">Widget status</span>
                        <span className="rounded-full bg-[#EEF1FF] px-2.5 py-1 text-[11px] font-semibold text-[#47568E]">
                          {widget.status}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[20px] border border-[#e4e4e7] bg-[#fafafc] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-semibold text-[#111]">Site name</span>
                        <span className="text-[13px] text-[#6f6f78]">
                          {widget.siteName || "Not set"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[20px] border border-[#e4e4e7] bg-[#fafafc] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111]">
                          <Globe2 className="h-4 w-4 text-[#6a78b0]" />
                          Allowed domains
                        </span>
                        <span className="text-[13px] text-[#6f6f78]">
                          {widget.allowedDomains?.length ?? 0}
                        </span>
                      </div>
                    </div>
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