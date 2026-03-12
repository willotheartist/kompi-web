"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Bot,
  Sparkles,
  Globe,
  Palette,
  Copy,
  RefreshCw,
  Plus,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

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

  const subtitle = useMemo(() => {
    const parts = [
      form.siteName || "Your site",
      form.status.toLowerCase(),
      form.allowedDomains.length
        ? `${form.allowedDomains.length} domain${form.allowedDomains.length > 1 ? "s" : ""}`
        : null,
    ].filter(Boolean);

    return parts.join(" · ");
  }, [form]);

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Widget"
      pageDescription="Control the widget identity, tone, colors, and allowed domains from the main dashboard."
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

          <a
            href="/dashboard/chat/sources"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-[13px] font-semibold text-[#111] transition hover:bg-[#f8f8fb]"
          >
            <Plus className="h-4 w-4" />
            Add source
          </a>
        </div>

        {loading ? (
          <KCard>
            <KCardInner>
              <div className="text-sm text-[#767680]">Loading widget settings…</div>
            </KCardInner>
          </KCard>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-[14px] xl:grid-cols-[1.1fr_380px]">
            <div className="grid gap-[14px]">
              <KCard>
                <KCardInner>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Core identity
                      </div>
                      <div className="text-[11px] text-[#76767e]">
                        Name, site, status, and visual basics.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Widget name">
                      <Input
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Kompi Chat"
                      />
                    </Field>

                    <Field label="Status">
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
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Assistant behaviour
                      </div>
                      <div className="text-[11px] text-[#76767e]">
                        How it sounds and replies.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <Field label="Welcome message">
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

                    <Field label="Fallback reply">
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
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Palette className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Color system
                      </div>
                      <div className="text-[11px] text-[#76767e]">
                        The look and feel of the widget itself.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Primary color">
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

                    <Field label="Text / accent color">
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
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                        Allowed domains
                      </div>
                      <div className="text-[11px] text-[#76767e]">
                        Comma-separated hostnames where the widget can run.
                      </div>
                    </div>
                  </div>

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
                </KCardInner>
              </KCard>

              <div className="flex items-center justify-between gap-3 rounded-[22px] border border-[#e4e4e7] bg-[#FAFAF7] px-5 py-4">
                <div
                  className={`text-sm font-medium ${
                    notice?.ok ? "text-[#245A3F]" : "text-red-600"
                  }`}
                >
                  {notice?.text || ""}
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
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                    Public token
                  </div>

                  <div className="mt-3 rounded-[16px] border border-[#e4e4e7] bg-[#FAFAF7] px-4 py-4 font-mono text-[13px] break-all text-[#6c6c75]">
                    {form.publicToken || "Generated on first save."}
                  </div>

                  <button
                    type="button"
                    onClick={copyToken}
                    disabled={!form.publicToken}
                    className="mt-3 inline-flex items-center gap-2 rounded-[12px] border border-[#e4e4e7] bg-white px-4 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#f7f7fb] disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied" : "Copy token"}
                  </button>
                </KCardInner>
              </KCard>

              <KCard>
                <KCardInner>
                  <div className="mb-[14px]">
                    <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                      Live preview
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-[#76767e]">{subtitle}</div>
                  </div>

                  <div className="space-y-4">
                    <div className="max-w-[86%] rounded-[18px] rounded-bl-[8px] bg-[#F4F4F1] px-4 py-3 text-sm leading-6 text-[#222]">
                      {form.welcomeMessage || "Hi — how can I help you today?"}
                    </div>

                    <div
                      className="ml-auto max-w-[84%] rounded-[18px] rounded-br-[8px] px-4 py-3 text-sm leading-6"
                      style={{
                        backgroundColor: form.primaryColor || "#C4C8FF",
                        color: form.accentColor || "#111111",
                      }}
                    >
                      What services do you offer?
                    </div>

                    <div className="max-w-[90%] rounded-[18px] rounded-bl-[8px] bg-[#F4F4F1] px-4 py-3 text-sm leading-6 text-[#222]">
                      {form.fallbackReply ||
                        "I can help answer common questions and guide visitors toward the right next step."}
                    </div>

                    <div className="rounded-[16px] border border-[#e4e4e7] bg-[#FCFCFA] px-4 py-3 text-[13px] text-[#6f6f78]">
                      {form.placeholder || "Ask a question…"}
                    </div>
                  </div>
                </KCardInner>
              </KCard>

              <KCard className="bg-[#111] text-white">
                <KCardInner>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Positioning
                  </div>
                  <div className="mt-2 text-[20px] font-semibold tracking-[-0.04em] text-white">
                    This should feel like a product, not a plugin.
                  </div>
                  <p className="mt-3 text-[13px] leading-6 text-white/72">
                    Tight copy, clean tone, proper domains, and sharp source
                    context are what make the chat feel expensive.
                  </p>
                </KCardInner>
              </KCard>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#111]">{label}</label>
      {children}
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