"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  Globe,
  Palette,
  Copy,
  RefreshCw,
  Plus,
  CheckCircle2,
  Orbit,
  ShieldCheck,
  ExternalLink,
  Radio,
  MessageSquareText,
  PaintBucket,
  LockKeyhole,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { KompiChatPreview } from "@/components/chat/KompiChatPreview";

type WidgetPayload = {
  id?: string;
  name: string;
  siteName: string | null;
  siteUrl: string | null;
  status: "DRAFT" | "ACTIVE" | "PAUSED";
  welcomeMessage: string | null;
  placeholder: string | null;
  fallbackReply: string | null;
  tone: string | null;
  primaryColor: string | null;
  accentColor: string | null;
  allowedDomains: string[];
  publicToken?: string;
};

const EMPTY_FORM: WidgetPayload = {
  name: "Kompi Chat",
  siteName: "",
  siteUrl: "",
  status: "DRAFT",
  welcomeMessage: "Hi — how can I help you today?",
  placeholder: "Ask a question…",
  fallbackReply:
    "Thanks — I’ve noted that. I can help answer common questions and guide visitors toward the right next step.",
  tone: "helpful",
  primaryColor: "#C4C8FF",
  accentColor: "#111111",
  allowedDomains: [],
};

const TONES = ["helpful", "warm", "concise", "professional", "friendly"];

function KCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-[#e4e4e7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] ${className}`}
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

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
          {title}
        </div>
        <div className="mt-0.5 text-[11px] leading-5 text-[#76767e]">
          {description}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#111]">{label}</label>
      {children}
      {hint ? <p className="mt-2 text-[11px] leading-5 text-[#7a7a84]">{hint}</p> : null}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-11 w-full rounded-[16px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20 ${
        props.className || ""
      }`}
    />
  );
}

function StatusPill({ status }: { status: WidgetPayload["status"] }) {
  const map = {
    ACTIVE: "bg-[#EEF8F1] text-[#2D8A52]",
    DRAFT: "bg-[#F3F4F6] text-[#6B7280]",
    PAUSED: "bg-[#FFF4DD] text-[#A27017]",
  } as const;

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${map[status]}`}>
      {status}
    </span>
  );
}

function MiniStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
        {label}
      </div>
      <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
        {value}
      </div>
      {sub ? <div className="mt-1 text-[11px] text-[#7a7a84]">{sub}</div> : null}
    </div>
  );
}

export default function DashboardChatWidgetPage() {
  const [form, setForm] = useState<WidgetPayload>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ text: string; ok: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/chat/widget", { cache: "no-store" });
        const json = (await res.json()) as { widget?: WidgetPayload | null };

        if (!mounted) return;

        const widget = json.widget;
        if (widget) {
          setForm({
            ...EMPTY_FORM,
            ...widget,
            siteName: widget.siteName ?? "",
            siteUrl: widget.siteUrl ?? "",
            welcomeMessage: widget.welcomeMessage ?? "",
            placeholder: widget.placeholder ?? "",
            fallbackReply: widget.fallbackReply ?? "",
            tone: widget.tone ?? "helpful",
            primaryColor: widget.primaryColor ?? "#C4C8FF",
            accentColor: widget.accentColor ?? "#111111",
            allowedDomains: widget.allowedDomains ?? [],
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    try {
      const res = await fetch("/api/chat/widget", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          allowedDomains: form.allowedDomains.join(", "),
        }),
      });

      const json = (await res.json()) as { widget?: WidgetPayload; error?: string };

      if (!res.ok) {
        setNotice({ text: json.error || "Could not save widget.", ok: false });
        return;
      }

      const widget = json.widget;
      if (widget) {
        setForm({
          ...form,
          ...widget,
          siteName: widget.siteName ?? "",
          siteUrl: widget.siteUrl ?? "",
          welcomeMessage: widget.welcomeMessage ?? "",
          placeholder: widget.placeholder ?? "",
          fallbackReply: widget.fallbackReply ?? "",
          tone: widget.tone ?? "helpful",
          primaryColor: widget.primaryColor ?? "#C4C8FF",
          accentColor: widget.accentColor ?? "#111111",
          allowedDomains: widget.allowedDomains ?? [],
        });
      }

      setNotice({ text: "Widget saved.", ok: true });
    } catch {
      setNotice({ text: "Could not save widget.", ok: false });
    } finally {
      setSaving(false);
    }
  }

  async function copyToken() {
    if (!form.publicToken) return;
    try {
      await navigator.clipboard.writeText(form.publicToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      //
    }
  }

  const readinessChecks = useMemo(
    () => [
      {
        ok: form.status === "ACTIVE",
        label: "Widget is active",
      },
      {
        ok: form.allowedDomains.length > 0,
        label: "Allowed domains added",
      },
      {
        ok: Boolean((form.siteName || "").trim()),
        label: "Site identity filled in",
      },
      {
        ok: Boolean((form.welcomeMessage || "").trim()),
        label: "Welcome message ready",
      },
    ],
    [form]
  );

  const readiness = readinessChecks.filter((item) => item.ok).length;
  const readinessPct = Math.round((readiness / readinessChecks.length) * 100);

  const subtitle = useMemo(() => {
    const parts = [
      form.siteName || "No site linked yet",
      form.status.toLowerCase(),
      form.allowedDomains.length
        ? `${form.allowedDomains.length} domain${form.allowedDomains.length > 1 ? "s" : ""}`
        : "no domain lock",
    ].filter(Boolean);

    return parts.join(" · ");
  }, [form]);

  const tokenPreview = form.publicToken
    ? `${form.publicToken.slice(0, 12)}…${form.publicToken.slice(-6)}`
    : "Generated on first save";

  const cleanSiteUrl = (form.siteUrl || "").trim();

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Widget"
      pageDescription="Control identity, tone, colours, and domain rules from one clean setup panel."
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

          <Link
            href="/dashboard/chat/install"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-[13px] font-semibold text-[#111] transition hover:bg-[#f8f8fb]"
          >
            <ExternalLink className="h-4 w-4" />
            Open install
          </Link>
        </div>

        {loading ? (
          <KCard>
            <KCardInner>
              <div className="text-sm text-[#767680]">Loading widget settings…</div>
            </KCardInner>
          </KCard>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-[14px] xl:grid-cols-[minmax(0,1fr)_400px]"
          >
            <div className="grid gap-[14px]">
              <KCard>
                <KCardInner>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                          Widget studio
                        </div>
                        <div className="mt-1 text-[24px] font-semibold tracking-[-0.05em] text-[#111]">
                          {form.name || "Kompi Chat"}
                        </div>
                        <div className="mt-1 text-[12px] text-[#6f6f78]">{subtitle}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusPill status={form.status} />
                        <button
                          type="submit"
                          disabled={saving}
                          className="inline-flex h-10 items-center rounded-[12px] bg-[#111] px-4 text-[13px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                        >
                          {saving ? "Saving…" : "Save"}
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-4">
                      <MiniStat
                        label="Readiness"
                        value={`${readiness}/4`}
                        sub={`${readinessPct}% launch ready`}
                      />
                      <MiniStat
                        label="Domains"
                        value={String(form.allowedDomains.length)}
                        sub={
                          form.allowedDomains.length
                            ? "Scoped install"
                            : "Open / unsecured"
                        }
                      />
                      <MiniStat
                        label="Tone"
                        value={form.tone ? form.tone[0].toUpperCase() + form.tone.slice(1) : "—"}
                        sub="Current reply style"
                      />
                      <MiniStat
                        label="Token"
                        value={form.publicToken ? "Live" : "Pending"}
                        sub={form.publicToken ? "Public token ready" : "Save to generate"}
                      />
                    </div>
                  </div>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <SectionHeader
                    icon={Bot}
                    title="Core identity"
                    description="Define what the visitor sees, what site this belongs to, and whether it is actually live."
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Widget name">
                      <Input
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Kompi Chat"
                      />
                    </Field>

                    <Field label="Status" hint="Only Active widgets are publicly available.">
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            status: e.target.value as WidgetPayload["status"],
                          }))
                        }
                        className="h-11 w-full rounded-[16px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="ACTIVE">Active</option>
                        <option value="PAUSED">Paused</option>
                      </select>
                    </Field>

                    <Field label="Company / site name">
                      <Input
                        value={form.siteName ?? ""}
                        onChange={(e) => setForm((prev) => ({ ...prev, siteName: e.target.value }))}
                        placeholder="Wall & Fifth"
                      />
                    </Field>

                    <Field label="Site URL">
                      <Input
                        value={form.siteUrl ?? ""}
                        onChange={(e) => setForm((prev) => ({ ...prev, siteUrl: e.target.value }))}
                        placeholder="https://example.com"
                      />
                    </Field>
                  </div>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <SectionHeader
                    icon={MessageSquareText}
                    title="Assistant behaviour"
                    description="Tune first impression, visitor guidance, and fallback quality."
                  />

                  <div className="grid gap-4">
                    <Field
                      label="Welcome message"
                      hint="First assistant message shown inside the widget."
                    >
                      <textarea
                        rows={3}
                        value={form.welcomeMessage ?? ""}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, welcomeMessage: e.target.value }))
                        }
                        className="w-full rounded-[18px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 py-2.5 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                      />
                    </Field>

                    <Field label="Input placeholder">
                      <Input
                        value={form.placeholder ?? ""}
                        onChange={(e) => setForm((prev) => ({ ...prev, placeholder: e.target.value }))}
                        placeholder="Ask a question…"
                      />
                    </Field>

                    <Field
                      label="Fallback reply"
                      hint="Used when the assistant cannot confidently match the question to your sources."
                    >
                      <textarea
                        rows={4}
                        value={form.fallbackReply ?? ""}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, fallbackReply: e.target.value }))
                        }
                        className="w-full rounded-[18px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 py-2.5 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                      />
                    </Field>

                    <Field label="Tone">
                      <Input
                        value={form.tone ?? ""}
                        onChange={(e) => setForm((prev) => ({ ...prev, tone: e.target.value }))}
                        placeholder="helpful"
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {TONES.map((tone) => (
                          <button
                            key={tone}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, tone }))}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                              form.tone === tone
                                ? "bg-[#C4C8FF] text-[#111]"
                                : "border border-[#e4e4e7] bg-white text-[#6f6f7a] hover:bg-[#f7f7fb] hover:text-[#111]"
                            }`}
                          >
                            {tone}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <SectionHeader
                    icon={PaintBucket}
                    title="Colour system"
                    description="Keep the widget aligned to the client brand without overcomplicating it."
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Primary colour">
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={form.primaryColor ?? "#C4C8FF"}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, primaryColor: e.target.value }))
                          }
                          className="h-11 w-12 rounded-[14px] border border-[#e4e4e7] bg-transparent p-1"
                        />
                        <Input
                          value={form.primaryColor ?? ""}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, primaryColor: e.target.value }))
                          }
                          placeholder="#C4C8FF"
                        />
                      </div>
                    </Field>

                    <Field label="Text / accent colour">
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={form.accentColor ?? "#111111"}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, accentColor: e.target.value }))
                          }
                          className="h-11 w-12 rounded-[14px] border border-[#e4e4e7] bg-transparent p-1"
                        />
                        <Input
                          value={form.accentColor ?? ""}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, accentColor: e.target.value }))
                          }
                          placeholder="#111111"
                        />
                      </div>
                    </Field>
                  </div>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <SectionHeader
                    icon={Globe}
                    title="Allowed domains"
                    description="Lock the widget to approved hostnames so the install feels controlled and client-safe."
                  />

                  <Field
                    label="Approved hostnames"
                    hint="Comma-separated only. Example: example.com, app.example.com"
                  >
                    <textarea
                      rows={3}
                      value={form.allowedDomains.join(", ")}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          allowedDomains: e.target.value
                            .split(",")
                            .map((v) => v.trim())
                            .filter(Boolean),
                        }))
                      }
                      placeholder="example.com, www.example.com"
                      className="w-full rounded-[18px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 py-2.5 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                    />
                  </Field>

                  {form.allowedDomains.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {form.allowedDomains.map((domain) => (
                        <span
                          key={domain}
                          className="inline-flex rounded-full border border-[#e4e4e7] bg-[#fafafb] px-3 py-1.5 text-[12px] font-medium text-[#3d3d45]"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </KCardInner>
              </KCard>

              <div className="flex items-center justify-between gap-3 rounded-[22px] border border-[#e4e4e7] bg-[#FAFAF7] px-5 py-4">
                <div
                  className={`text-sm font-medium ${
                    notice?.ok ? "text-[#245A3F]" : "text-red-600"
                  }`}
                >
                  {notice?.text || "Save changes when you're ready."}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center rounded-[12px] bg-[#C4C8FF] px-4 text-[14px] font-semibold text-[#111] transition hover:brightness-105 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save widget"}
                </button>
              </div>
            </div>

            <div className="grid gap-[14px] self-start">
              <KCard>
                <KCardInner>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                        Widget access
                      </div>
                      <div className="mt-1 text-[14px] font-semibold text-[#111]">
                        Public token
                      </div>
                      <div className="mt-1 text-[12px] text-[#6f6f78]">
                        Used by the launcher script to connect the live widget.
                      </div>
                    </div>
                    <div className="rounded-full bg-[#EEF8F1] px-2.5 py-1 text-[10px] font-semibold text-[#2D8A52]">
                      Public
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-[#e4e4e7] bg-[#FAFAF7] px-4 py-4">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[#8a8a94]">
                      Token preview
                    </div>
                    <div className="mt-2 break-all font-mono text-[13px] text-[#555760]">
                      {tokenPreview}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={copyToken}
                      disabled={!form.publicToken}
                      className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-[#e4e4e7] bg-white px-4 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#f7f7fb] disabled:opacity-50"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied" : "Copy token"}
                    </button>

                    <Link
                      href="/dashboard/chat/install"
                      className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-[#e4e4e7] bg-white px-4 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#f7f7fb]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open install
                    </Link>
                  </div>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <div className="mb-4 flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Radio className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Launch readiness
                      </div>
                      <div className="text-[11px] text-[#76767e]">
                        A quick operator view before install.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                          Score
                        </div>
                        <div className="mt-2 text-[26px] font-bold tracking-[-0.05em] text-[#111]">
                          {readiness}/4
                        </div>
                      </div>
                      <div className="text-[12px] font-medium text-[#6f6f78]">
                        {readinessPct}% ready
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e8e8ed]">
                      <div
                        className="h-full rounded-full bg-[#6670D6] transition-all"
                        style={{ width: `${readinessPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {readinessChecks.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-[16px] border border-[#e4e4e7] bg-[#fafafb] px-4 py-3"
                      >
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            item.ok ? "text-[#2D8A52]" : "text-[#b0b0b8]"
                          }`}
                        />
                        <div className="text-[13px] font-medium text-[#111]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <div className="mb-4 flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Orbit className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Live preview
                      </div>
                      <div className="text-[11px] text-[#76767e]">
                        What visitors will actually see.
                      </div>
                    </div>
                  </div>

                  <KompiChatPreview
                    widgetName={form.name || "Kompi Chat"}
                    siteName={form.siteName || "Your site"}
                    primaryColor={form.primaryColor || "#C4C8FF"}
                    accentColor={form.accentColor || "#111111"}
                    welcomeMessage={form.welcomeMessage || "Hi — how can I help you today?"}
                    fallbackReply={
                      form.fallbackReply ||
                      "I can help answer common questions and guide visitors toward the right next step."
                    }
                    placeholder={form.placeholder || "Ask a question…"}
                    status={form.status}
                    showDeviceFrame
                  />
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <div className="mb-4 flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <LockKeyhole className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Deployment notes
                      </div>
                      <div className="text-[11px] text-[#76767e]">
                        The bits that most affect perceived quality.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[16px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                      <div className="text-[12px] font-semibold text-[#111]">
                        Best performing setup
                      </div>
                      <p className="mt-1 text-[12px] leading-6 text-[#6f6f78]">
                        Active widget, scoped domains, a short welcome message, and
                        real knowledge sources.
                      </p>
                    </div>

                    <div className="rounded-[16px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                      <div className="text-[12px] font-semibold text-[#111]">
                        Avoid
                      </div>
                      <p className="mt-1 text-[12px] leading-6 text-[#6f6f78]">
                        Generic fallback copy, empty site identity, and open domain
                        installs that feel unfinished.
                      </p>
                    </div>
                  </div>
                </KCardInner>
              </KCard>

              <KCard className="bg-[#111] text-white">
                <KCardInner>
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        Quality note
                      </div>
                      <div className="mt-2 text-[20px] font-semibold tracking-[-0.04em] text-white">
                        Premium chat feels configured, not improvised.
                      </div>
                      <p className="mt-3 text-[13px] leading-6 text-white/72">
                        Tight copy, scoped installs, brand fit, and knowledge-backed
                        replies are what justify a premium monthly fee.
                      </p>
                    </div>
                  </div>
                </KCardInner>
              </KCard>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
