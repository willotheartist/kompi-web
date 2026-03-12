"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Database,
  Plus,
  Search,
  Trash2,
  Globe2,
  HelpCircle,
  FileText,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

type ChatSource = {
  id: string;
  type: "URL" | "TEXT" | "FAQ";
  label: string | null;
  value: string;
  createdAt: string;
};

const TYPE_CONFIG: Record<
  ChatSource["type"],
  {
    icon: typeof Globe2;
    hint: string;
    title: string;
    example: string;
    bg: string;
    fg: string;
  }
> = {
  URL: {
    icon: Globe2,
    title: "URL",
    hint: "Pricing pages, services, support pages, policies, landing pages.",
    example: "https://example.com/pricing",
    bg: "#EEF1FF",
    fg: "#47568E",
  },
  FAQ: {
    icon: HelpCircle,
    title: "FAQ",
    hint: "Short repeatable Q&A for shipping, timelines, availability, bookings.",
    example: "Do you work internationally? Yes — we work with clients worldwide.",
    bg: "#FFF7ED",
    fg: "#925C1A",
  },
  TEXT: {
    icon: FileText,
    title: "TEXT",
    hint: "Brand notes, support guidance, refund policy, qualification rules, sales context.",
    example: "We usually respond within 24 hours and offer design subscriptions for startups.",
    bg: "#EEFAF0",
    fg: "#2A6B3C",
  },
};

function relTime(str: string) {
  const diff = Date.now() - new Date(str).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function StatusDotPill({
  status,
}: {
  status: "URL" | "FAQ" | "TEXT";
}) {
  const map = {
    URL: { bg: "#EEF1FF", fg: "#47568E", dot: "#8D9DFF" },
    FAQ: { bg: "#FFF7ED", fg: "#925C1A", dot: "#F5A742" },
    TEXT: { bg: "#EEFAF0", fg: "#2A6B3C", dot: "#4DAB6D" },
  } as const;

  const c = map[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[11px] font-semibold"
      style={{ background: c.bg, color: c.fg }}
    >
      <span
        className="inline-block h-[6px] w-[6px] rounded-full"
        style={{ background: c.dot }}
      />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

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

export default function DashboardChatSourcesPage() {
  const [sources, setSources] = useState<ChatSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<ChatSource["type"]>("URL");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  async function loadSources() {
    const res = await fetch("/api/chat/sources", { cache: "no-store" });
    const json = (await res.json()) as { sources?: ChatSource[] };
    setSources(Array.isArray(json.sources) ? json.sources : []);
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await loadSources();
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
      const res = await fetch("/api/chat/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, value, type }),
      });

      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setNotice(json.error || "Could not add source.");
        return;
      }

      setLabel("");
      setValue("");
      setType("URL");
      await loadSources();
      setNotice("Source added.");
    } catch {
      setNotice("Could not add source.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    setNotice(null);

    try {
      const res = await fetch(`/api/chat/sources/${id}`, { method: "DELETE" });
      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setNotice(json.error || "Could not delete source.");
        return;
      }

      setSources((prev) => prev.filter((s) => s.id !== id));
      setNotice("Source deleted.");
    } catch {
      setNotice("Could not delete source.");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sources;
    return sources.filter((source) => {
      return (
        source.type.toLowerCase().includes(q) ||
        (source.label ?? "").toLowerCase().includes(q) ||
        source.value.toLowerCase().includes(q)
      );
    });
  }, [query, sources]);

  const counts = useMemo(() => {
    return {
      total: sources.length,
      url: sources.filter((s) => s.type === "URL").length,
      faq: sources.filter((s) => s.type === "FAQ").length,
      text: sources.filter((s) => s.type === "TEXT").length,
    };
  }, [sources]);

  const currentType = TYPE_CONFIG[type];
  const Icon = currentType.icon;

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Knowledge"
      pageDescription="Feed the assistant real context so the replies feel informed, specific, and useful."
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

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("add-source-form");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-[13px] font-semibold text-[#111] transition hover:bg-[#f8f8fb]"
          >
            <Plus className="h-4 w-4" />
            Add source
          </button>
        </div>

        <div className="grid gap-[14px] xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="grid gap-[14px] self-start">
            <KCard>
              <KCardInner>
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                      Knowledge base
                    </div>
                    <div className="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#111]">
                      {counts.total} source{counts.total === 1 ? "" : "s"}
                    </div>
                    <div className="mt-1 text-[12px] text-[#6f6f78]">
                      URLs, FAQs, and business context powering replies.
                    </div>
                  </div>

                  <div className="rounded-full bg-[#EEF8F1] px-2.5 py-1 text-[10px] font-semibold text-[#2D8A52]">
                    Live context
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                      URLs
                    </div>
                    <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
                      {counts.url}
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                      FAQs
                    </div>
                    <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
                      {counts.faq}
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                      Text notes
                    </div>
                    <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
                      {counts.text}
                    </div>
                  </div>
                </div>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div id="add-source-form" className="mb-5 flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                      Add a source
                    </div>
                    <div className="text-[11px] leading-5 text-[#76767e]">
                      Good chat depends on grounded context, not generic filler.
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {(["URL", "FAQ", "TEXT"] as const).map((item) => {
                      const itemConfig = TYPE_CONFIG[item];
                      const ItemIcon = itemConfig.icon;
                      const active = type === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setType(item)}
                          className={`rounded-[16px] border p-3 text-left transition ${
                            active
                              ? "border-[#C4C8FF] bg-[#F6F7FF]"
                              : "border-[#e4e4e7] bg-[#fafafb] hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="grid h-8 w-8 place-items-center rounded-full"
                              style={{
                                background: itemConfig.bg,
                                color: itemConfig.fg,
                              }}
                            >
                              <ItemIcon className="h-4 w-4" />
                            </div>
                            <div className="text-[12px] font-semibold text-[#111]">
                              {item}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-[20px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                        style={{ background: currentType.bg, color: currentType.fg }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#111]">
                          {currentType.title} source
                        </div>
                        <div className="mt-1 text-[12px] leading-5 text-[#6f6f78]">
                          {currentType.hint}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#111]">
                      Label
                    </label>
                    <input
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Pricing page"
                      className="h-11 w-full rounded-[16px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#111]">
                      Value
                    </label>
                    {type === "TEXT" ? (
                      <textarea
                        rows={5}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={currentType.example}
                        className="w-full rounded-[18px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 py-2.5 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                      />
                    ) : (
                      <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={currentType.example}
                        className="h-11 w-full rounded-[16px] border border-[#e4e4e7] bg-[#FBFBFD] px-3 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                      />
                    )}
                  </div>

                  <div className="rounded-[18px] border border-[#e4e4e7] bg-[#111] p-4 text-white">
                    <div className="flex items-start gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                          Best practice
                        </div>
                        <p className="mt-2 text-[13px] leading-6 text-white/75">
                          Mix all three. URLs give discoverable sources, FAQs handle repeated questions, and text blocks add the private logic that makes responses feel smart.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[13px] text-[#245A3F]">{notice || ""}</div>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex h-11 items-center rounded-[12px] bg-[#C4C8FF] px-4 text-[14px] font-semibold text-[#111] transition hover:brightness-105 disabled:opacity-60"
                    >
                      {saving ? "Adding…" : "Add source"}
                    </button>
                  </div>
                </form>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div className="mb-4 flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF8F1] text-[#2D8A52]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                      Source quality note
                    </div>
                    <div className="text-[11px] leading-5 text-[#76767e]">
                      Short, clear, high-signal context works better than dumping random copy.
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    "Use real page labels instead of vague names like “Info” or “Stuff”.",
                    "Paste concise business rules, not giant walls of unfocused text.",
                    "Add FAQs for repeat questions like pricing, support, timelines, and bookings.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[16px] border border-[#e4e4e7] bg-[#fafafb] px-4 py-3 text-[13px] leading-6 text-[#111]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </KCardInner>
            </KCard>
          </div>

          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Current sources
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    Search, review, and clean what powers the assistant.
                  </div>
                </div>

                <div className="relative w-full max-w-[280px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a94]" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search sources"
                    className="h-11 w-full rounded-full border border-[#e4e4e7] bg-[#FBFBFD] pl-10 pr-3 text-sm text-[#111] outline-none transition focus:border-[#C4C8FF] focus:ring-4 focus:ring-[#C4C8FF]/20"
                  />
                </div>
              </div>

              {loading ? (
                <div className="rounded-[14px] border border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                  Loading sources…
                </div>
              ) : filtered.length === 0 ? (
                <div className="rounded-[20px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-10 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#EEF1FF] text-[#8D9DFF]">
                    <Database className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-sm font-medium text-[#111]">
                    {sources.length === 0 ? "No sources yet" : "No matching sources"}
                  </div>
                  <div className="mt-1 text-[12px] leading-5 text-[#72727c]">
                    {sources.length === 0
                      ? "Add a URL, FAQ, or text block so the assistant has grounded context."
                      : "Try another search term."}
                  </div>
                </div>
              ) : (
                <div className="grid gap-2">
                  {filtered.map((source) => {
                    const itemConfig = TYPE_CONFIG[source.type];
                    const ItemIcon = itemConfig.icon;
                    const isUrl = source.type === "URL";

                    return (
                      <div
                        key={source.id}
                        className="group flex items-start gap-3 rounded-[18px] border border-[#ededf0] bg-[#fafafb] p-4 transition hover:bg-white"
                      >
                        <div
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                          style={{
                            background: itemConfig.bg,
                            color: itemConfig.fg,
                          }}
                        >
                          <ItemIcon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <StatusDotPill status={source.type} />
                            {source.label ? (
                              <span className="text-sm font-semibold text-[#111]">
                                {source.label}
                              </span>
                            ) : null}
                            <span className="text-[11px] text-[#8a8a94]">
                              {relTime(source.createdAt)}
                            </span>
                          </div>

                          <p className="mt-2 break-all text-[13px] leading-6 text-[#666670]">
                            {source.value}
                          </p>

                          {isUrl ? (
                            <a
                              href={source.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#40528D] hover:underline"
                            >
                              Open source
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : null}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(source.id)}
                          disabled={deleting === source.id}
                          className="rounded-xl p-2 text-[#8a8a94] opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </KCardInner>
          </KCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
