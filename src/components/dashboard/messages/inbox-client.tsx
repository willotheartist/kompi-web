"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, IdCard, Inbox, Mail, MessageSquareText, Phone, Search, Tag, X } from "lucide-react";
import { CopyButton } from "../overview/overview-client";
import { EASE, EmptyState, PageHeader, buttonStyles } from "../ui";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  intentLabel: string | null;
  createdAt: string;
  cardName: string;
};

const TINTS = ["#FBE4FA", "#E7F0EA", "#E6ECFA", "#F6EEDF", "#ECEDEE"];

function tintFor(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TINTS[h % TINTS.length];
}

function relative(iso: string) {
  const d = new Date(iso);
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function displayName(m: Message) {
  return m.name?.trim() || m.email?.trim() || m.phone?.trim() || "Anonymous visitor";
}

function Initial({ m, size = 40 }: { m: Message; size?: number }) {
  const name = displayName(m);
  return (
    <span className="grid shrink-0 place-items-center rounded-full text-[#151619]" style={{ width: size, height: size, background: tintFor(name), fontSize: size * 0.4 }}>
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function InboxClient({ items, thisWeek = 0 }: { items: Message[]; thisWeek?: number }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((m) => [m.name, m.email, m.phone, m.message, m.intentLabel, m.cardName].some((v) => v?.toLowerCase().includes(q)));
  }, [items, query]);

  const selected = filtered.find((m) => m.id === selectedId) ?? filtered[0] ?? null;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key !== "j" && e.key !== "k" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const idx = filtered.findIndex((m) => m.id === selected?.id);
      const next = e.key === "j" || e.key === "ArrowDown" ? Math.min(filtered.length - 1, idx + 1) : Math.max(0, idx - 1);
      if (filtered[next]) {
        e.preventDefault();
        setSelectedId(filtered[next].id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, selected?.id]);

  return (
    <div>
      <PageHeader
        eyebrow="Messages"
        icon={Inbox}
        title="People who reached out."
        description={
          items.length
            ? `${items.length.toLocaleString()} ${items.length === 1 ? "message" : "messages"} from your Cards${thisWeek ? ` · ${thisWeek} this week` : ""}.`
            : "Messages sent through your Kompi Cards land here."
        }
      />

      {!items.length ? (
        <EmptyState
          icon={MessageSquareText}
          title="No messages yet."
          action={
            <Link href="/dashboard/cards" className={buttonStyles.secondary}>
              <IdCard size={16} /> Open your Cards
            </Link>
          }
        >
          Turn on “Get in touch” in a Card and share it. When someone writes to you, their message appears here.
        </EmptyState>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* List */}
          <div className={cn("min-w-0 overflow-hidden rounded-[16px] border border-[#E3E5E7] bg-white lg:sticky lg:top-24", mobileOpen && "hidden lg:block")}>
            <div className="border-b border-[#EDEEF0] p-3">
              <label className="flex h-10 items-center gap-2 rounded-[10px] bg-[#F5F6F7] px-3 focus-within:bg-white focus-within:ring-1 focus-within:ring-[#CDD1D7]">
                <Search size={16} className="text-[#8A9099]" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search messages…" aria-label="Search messages" className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#9A9EA4]" />
                {query && (
                  <button onClick={() => setQuery("")} aria-label="Clear search" className="text-[#80858C]">
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>
            <div className="max-h-[calc(100vh-260px)] min-h-[200px] overflow-y-auto p-1.5" role="listbox" aria-label="Messages">
              {!filtered.length && <p className="px-4 py-8 text-center text-[14px] text-[#80858C]">Nothing matches “{query}”.</p>}
              {filtered.map((m, i) => {
                const active = selected?.id === m.id;
                return (
                  <motion.button
                    key={m.id}
                    role="option"
                    aria-selected={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE, delay: Math.min(i, 12) * 0.025 }}
                    onClick={() => {
                      setSelectedId(m.id);
                      setMobileOpen(true);
                    }}
                    className={cn("relative flex w-full items-start gap-3 rounded-[12px] p-3 text-left transition-colors", !active && "hover:bg-[#F7F8F9]")}
                  >
                    {active && <motion.span layoutId="inbox-active" className="absolute inset-0 rounded-[12px] bg-[#F1F2F4]" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                    <span className="relative">
                      <Initial m={m} />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-[14px] font-medium">{displayName(m)}</span>
                        <span className="shrink-0 text-[12px] text-[#A2A6AC]">{relative(m.createdAt)}</span>
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-[#80858C]">
                        {m.message?.trim() || (m.intentLabel ? `Wants to: ${m.intentLabel}` : "Left their contact details")}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Reading pane */}
          <div className={cn("min-w-0", !mobileOpen && "hidden lg:block")}>
            <AnimatePresence mode="wait">
              {selected && (
                <motion.article
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="rounded-[16px] border border-[#E3E5E7] bg-white"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EDEEF0] p-5 sm:p-7">
                    <div className="flex min-w-0 items-center gap-4">
                      <button onClick={() => setMobileOpen(false)} className="grid size-9 place-items-center rounded-[9px] text-[#696C72] hover:bg-[#F3F4F5] lg:hidden" aria-label="Back to messages">
                        <ArrowLeft size={18} />
                      </button>
                      <Initial m={selected} size={52} />
                      <div className="min-w-0">
                        <h2 className="truncate text-[22px] font-medium tracking-[-0.035em]">{displayName(selected)}</h2>
                        <p className="mt-0.5 text-[13px] text-[#80858C]">
                          {new Date(selected.createdAt).toLocaleString(undefined, { weekday: "short", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })} · via {selected.cardName}
                        </p>
                      </div>
                    </div>
                    {selected.email && (
                      <a href={`mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent("Re: your message")}`} className={buttonStyles.primary}>
                        <Mail size={16} /> Reply by email
                      </a>
                    )}
                  </div>

                  <div className="p-5 sm:p-7">
                    {selected.intentLabel && (
                      <span className="mb-4 inline-flex items-center gap-1.5 rounded-[7px] bg-[#F1F2F4] px-2 py-1 text-[13px] text-[#3C4045]">
                        <Tag size={13} /> {selected.intentLabel}
                      </span>
                    )}
                    <p className="whitespace-pre-wrap text-[17px] leading-[1.6] tracking-[-0.01em] text-[#151619]">
                      {selected.message?.trim() || <span className="text-[#80858C]">No message — they left their contact details so you can get in touch.</span>}
                    </p>
                  </div>

                  {(selected.email || selected.phone) && (
                    <div className="grid gap-2 border-t border-[#EDEEF0] p-5 sm:grid-cols-2 sm:p-7">
                      {selected.email && <ContactRow icon={Mail} label="Email" value={selected.email} href={`mailto:${selected.email}`} />}
                      {selected.phone && <ContactRow icon={Phone} label="Phone" value={selected.phone} href={`tel:${selected.phone.replace(/\s+/g, "")}`} />}
                    </div>
                  )}
                </motion.article>
              )}
            </AnimatePresence>
            <p className="mt-3 hidden text-center text-[12px] text-[#A2A6AC] lg:block">
              Tip: use <kbd className="font-sans">j</kbd> / <kbd className="font-sans">k</kbd> to move between messages.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[12px] border border-[#EDEEF0] px-3.5 py-3">
      <span className="grid size-9 place-items-center rounded-[9px] bg-[#F5F6F7] text-[#5A5E65]">
        <Icon size={16} />
      </span>
      <a href={href} className="min-w-0 flex-1">
        <span className="block text-[12px] text-[#A2A6AC]">{label}</span>
        <span className="block truncate text-[14px] font-medium hover:underline hover:underline-offset-4">{value}</span>
      </a>
      <CopyButton value={value} label={`Copy ${label.toLowerCase()}`} />
    </div>
  );
}
