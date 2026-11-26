"use client";

import React, { useDeferredValue, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, CornerDownRight, Link2, Loader2, MousePointerClick, Plus, Search, Sparkles, ToggleRight, X } from "lucide-react";
import { toast } from "sonner";
import LinkActionsMenu from "@/components/links/link-actions-menu";
import { CountUp, EASE, EmptyState, Meter, PageHeader, buttonStyles } from "@/components/dashboard/ui";
import { CopyButton, Favicon } from "@/components/dashboard/overview/overview-client";
import { refreshWorkspaceSummary } from "@/components/dashboard/shell/use-workspace-summary";
import { cn } from "@/lib/utils";

export type LinkListItem = {
  id: string;
  code: string | null;
  shortUrl: string | null;
  targetUrl: string;
  clicks: number | null;
  createdLabel: string;
  isActive: boolean;
  title?: string | null;
  createdAtIso: string;
};

type Cursor = { before: string; beforeId: string } | null;
type Status = "all" | "active" | "inactive";

type LinksListClientProps = {
  links: LinkListItem[];
  workspaceId?: string;
  onToggleActive?: (linkId: string, nextActive: boolean) => void;
  initialCursor?: Cursor;
  pageSize?: number;
  limit?: number;
  planName?: string;
  total?: number;
  /** Public origin for short links (kompi.app), which differs from the app origin. */
  shortBase?: string;
};

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function dateLabel(iso: string) {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 864e5);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: d.getFullYear() === new Date().getFullYear() ? undefined : "numeric" });
}

type RowProps = {
  link: LinkListItem;
  pending: boolean;
  onToggleActive: (id: string, next: boolean) => void;
  onDeleted: (id: string) => void;
};

const LinkRow = React.memo(function LinkRow({ link, pending, onToggleActive, onDeleted }: RowProps) {
  const shortUrl = link.shortUrl ?? (link.code ? `${typeof window !== "undefined" ? window.location.origin : ""}/r/${link.code}` : "");
  const host = hostOf(link.targetUrl);
  const title = link.title?.trim() || host || link.code || "Untitled link";

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12, transition: { duration: 0.18 } }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 rounded-[14px] border border-[#E3E5E7] bg-white px-4 py-3.5 transition-colors hover:border-[#CDD1D7] md:grid-cols-[auto_minmax(0,1fr)_110px_110px_auto]",
        !link.isActive && "bg-[#FCFCFC]",
      )}
    >
      <Link href={`/links/${link.id}`} prefetch={false} className={cn("transition-[opacity,filter]", !link.isActive && "opacity-50 grayscale")} aria-label={`Open ${title}`}>
        <Favicon url={link.targetUrl} size={40} />
      </Link>

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <Link href={`/links/${link.id}`} prefetch={false} className="truncate text-[15px] font-medium tracking-[-0.015em] hover:underline hover:underline-offset-4">
            {title}
          </Link>
          {!link.isActive && <span className="shrink-0 rounded-[5px] bg-[#F1F2F4] px-1.5 py-0.5 text-[11px] font-medium text-[#80858C]">Paused</span>}
        </div>
        {shortUrl && (
          <div className="flex min-w-0 items-center gap-1">
            <a href={shortUrl} target="_blank" rel="noreferrer" className="truncate text-[13px] font-medium text-[#3D5AFE] hover:underline hover:underline-offset-4">
              {shortUrl.replace(/^https?:\/\//, "")}
            </a>
            <CopyButton value={shortUrl} label="Copy short link" className="size-7 shrink-0" />
          </div>
        )}
        <p className="flex min-w-0 items-center gap-1 text-[13px] text-[#8A9099]">
          <CornerDownRight size={13} className="shrink-0" />
          <span className="truncate">{link.targetUrl}</span>
        </p>
      </div>

      <Link href={`/links/${link.id}`} prefetch={false} className="hidden items-center gap-1.5 text-[14px] text-[#5A5E65] hover:text-[#151619] md:flex" title="View analytics">
        <MousePointerClick size={15} className="text-[#A2A6AC]" />
        <span className="font-medium tabular-nums text-[#151619]">{(link.clicks ?? 0).toLocaleString()}</span>
        <span className="text-[#A2A6AC]">visits</span>
      </Link>
      <span className="hidden items-center gap-1.5 text-[13px] text-[#80858C] md:flex">
        <CalendarDays size={14} className="text-[#A2A6AC]" />
        {dateLabel(link.createdAtIso)}
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          role="switch"
          aria-checked={link.isActive}
          aria-label={link.isActive ? "Pause link" : "Activate link"}
          title={link.isActive ? "Active — click to pause" : "Paused — click to activate"}
          disabled={pending}
          onClick={() => onToggleActive(link.id, !link.isActive)}
          className={cn("relative mr-1 inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full transition-colors duration-200", link.isActive ? "bg-[#151619]" : "bg-[#DCDFE3]", pending && "opacity-60")}
        >
          <motion.span layout transition={{ type: "spring", stiffness: 600, damping: 32 }} className={cn("inline-block size-[18px] rounded-full bg-white", link.isActive ? "ml-[18px]" : "ml-[2px]")} />
        </button>
        <LinkActionsMenu id={link.id} shortUrl={shortUrl} onDeleted={onDeleted} />
      </div>

      <div className="col-span-3 -mt-1 flex items-center gap-4 pl-14 text-[12px] text-[#80858C] md:hidden">
        <span className="flex items-center gap-1">
          <MousePointerClick size={13} /> {(link.clicks ?? 0).toLocaleString()} visits
        </span>
        <span>{dateLabel(link.createdAtIso)}</span>
      </div>
    </motion.article>
  );
});

export function LinksListClient({ links, workspaceId, onToggleActive, initialCursor = null, pageSize = 50, limit = 20, planName = "Free", total, shortBase }: LinksListClientProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [items, setItems] = useState<LinkListItem[]>(links ?? []);
  const [cursor, setCursor] = useState<Cursor>(initialCursor);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(!!initialCursor);
  const [count, setCount] = useState(total ?? links.length);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    let out = items;
    if (statusFilter === "active") out = out.filter((l) => l.isActive);
    if (statusFilter === "inactive") out = out.filter((l) => !l.isActive);
    if (!q) return out;
    return out.filter((link) =>
      [link.targetUrl, link.code ?? "", link.shortUrl ?? "", link.title ?? ""].some((v) => v.toLowerCase().includes(q)),
    );
  }, [items, deferredQuery, statusFilter]);

  const totalClicks = useMemo(() => items.reduce((s, l) => s + (l.clicks ?? 0), 0), [items]);
  const activeCount = useMemo(() => items.filter((l) => l.isActive).length, [items]);
  const atLimit = count >= limit;
  const noLinksAtAll = items.length === 0;

  const handleToggleActive = (linkId: string, nextActive: boolean) => {
    if (onToggleActive) return onToggleActive(linkId, nextActive);
    setItems((prev) => prev.map((l) => (l.id === linkId ? { ...l, isActive: nextActive } : l)));
    startTransition(async () => {
      const revert = () => setItems((prev) => prev.map((l) => (l.id === linkId ? { ...l, isActive: !nextActive } : l)));
      try {
        const res = await fetch(`/api/links/${linkId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: nextActive }) });
        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          toast.error(msg || "Could not update link");
          revert();
          return;
        }
        toast.success(nextActive ? "Link is live again" : "Link paused");
      } catch {
        toast.error("Something went wrong updating this link");
        revert();
      }
    });
  };

  const handleDeleted = (id: string) => {
    setItems((prev) => prev.filter((l) => l.id !== id));
    setCount((c) => Math.max(0, c - 1));
    void refreshWorkspaceSummary();
  };

  async function loadMore() {
    if (!workspaceId || !cursor || loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const params = new URLSearchParams({ workspaceId, limit: String(pageSize), before: cursor.before, beforeId: cursor.beforeId });
      const res = await fetch(`/api/links?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) {
        toast.error("Could not load more links");
        return;
      }
      const json = (await res.json()) as {
        links: Array<{ id: string; code: string | null; targetUrl: string; clicks: number | null; createdAt: string; isActive: boolean; title?: string | null; shortUrl?: string | null }>;
        nextCursor: Cursor;
      };
      const more: LinkListItem[] = (json.links ?? []).map((link) => ({
        id: link.id,
        code: link.code ?? null,
        shortUrl: link.shortUrl ?? (link.code ? `${shortBase ?? window.location.origin}/r/${link.code}` : null),
        targetUrl: link.targetUrl,
        clicks: link.clicks ?? 0,
        createdLabel: link.createdAt ? new Date(link.createdAt).toISOString().slice(0, 10) : "",
        isActive: link.isActive ?? true,
        title: link.title ?? null,
        createdAtIso: link.createdAt,
      }));
      setItems((prev) => [...prev, ...more.filter((m) => !prev.some((p) => p.id === m.id))]);
      setCursor(json.nextCursor ?? null);
      setHasMore(!!json.nextCursor);
    } catch {
      toast.error("Could not load more links");
    } finally {
      setLoadingMore(false);
    }
  }

  const createButton = atLimit ? (
    <Link href="/dashboard/settings/billing" className={buttonStyles.primary}>
      <Sparkles size={16} /> Upgrade for more links
    </Link>
  ) : (
    <Link href="/links/new" className={buttonStyles.primary}>
      <Plus size={16} /> New link
    </Link>
  );

  return (
    <div>
      <PageHeader
        eyebrow="Short links"
        icon={Link2}
        title="A cleaner link. An easier way to connect."
        description="Shorten, share and follow every visit. Pause a link any time without deleting it."
        actions={
          <>
            <div className="hidden min-w-[180px] sm:block">
              <div className="mb-1.5 flex justify-between text-[12px] text-[#80858C]">
                <span>{planName} plan</span>
                <span className="tabular-nums">
                  {count.toLocaleString()} / {limit.toLocaleString()}
                </span>
              </div>
              <Meter used={count} max={limit} />
            </div>
            {createButton}
          </>
        }
      />

      {noLinksAtAll ? (
        <EmptyState icon={Link2} title="Ready for your first short link?" action={createButton}>
          Paste any long address and get a tidy kompi.app link that counts every visit.
        </EmptyState>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
            className="mb-5 flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-[#E3E5E7] pb-5 text-[14px] text-[#696C72]"
          >
            <span className="flex items-center gap-2">
              <Link2 size={16} className="text-[#A2A6AC]" />
              <CountUp value={count} className="text-[18px] font-medium tracking-[-0.03em] text-[#151619]" /> links
            </span>
            <span className="flex items-center gap-2">
              <MousePointerClick size={16} className="text-[#A2A6AC]" />
              <CountUp value={totalClicks} className="text-[18px] font-medium tracking-[-0.03em] text-[#151619]" /> visits{hasMore ? " (loaded)" : ""}
            </span>
            <span className="flex items-center gap-2">
              <ToggleRight size={16} className="text-[#A2A6AC]" />
              <CountUp value={activeCount} className="text-[18px] font-medium tracking-[-0.03em] text-[#151619]" /> active
            </span>
            <Link href="/analytics" className="group ml-auto flex items-center gap-1 text-[13px] hover:text-[#151619]">
              Full analytics <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.14 }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <label className="flex h-11 min-w-[220px] flex-1 items-center gap-2.5 rounded-[11px] border border-[#E3E5E7] bg-white px-3.5 transition-colors focus-within:border-[#80858C]">
              <Search size={17} className="text-[#8A9099]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles, destinations or codes…"
                aria-label="Search links"
                className="h-full flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#9A9EA4]"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="grid size-7 place-items-center rounded-[7px] text-[#80858C] hover:bg-[#F1F2F4]">
                  <X size={15} />
                </button>
              )}
            </label>
            <LayoutGroup id="link-status">
              <div className="flex items-center gap-1 rounded-[11px] border border-[#E3E5E7] bg-white p-1" role="tablist" aria-label="Filter by status">
                {(["all", "active", "inactive"] as Status[]).map((v) => {
                  const on = statusFilter === v;
                  const n = v === "all" ? items.length : v === "active" ? activeCount : items.length - activeCount;
                  return (
                    <button key={v} role="tab" aria-selected={on} onClick={() => setStatusFilter(v)} className={cn("relative flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-[14px] transition-colors", on ? "text-[#151619]" : "text-[#80858C] hover:text-[#151619]")}>
                      {on && <motion.span layoutId="link-status-pill" className="absolute inset-0 rounded-[8px] bg-[#F1F2F4]" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                      <span className="relative">{v === "all" ? "All" : v === "active" ? "Active" : "Paused"}</span>
                      <span className="relative text-[12px] tabular-nums text-[#A2A6AC]">{n}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </motion.div>

          <div className="mb-2 hidden grid-cols-[40px_minmax(0,1fr)_110px_110px_88px] gap-x-4 px-4 text-[12px] font-medium uppercase tracking-[0.06em] text-[#A2A6AC] md:grid">
            <span />
            <span>Link</span>
            <span>Visits</span>
            <span>Created</span>
            <span className="text-right">Status</span>
          </div>

          <div className="space-y-2">
            <AnimatePresence initial={false} mode="popLayout">
              {filtered.map((link) => (
                <LinkRow key={link.id} link={link} pending={isPending} onToggleActive={handleToggleActive} onDeleted={handleDeleted} />
              ))}
            </AnimatePresence>
            {!filtered.length && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 rounded-[14px] border border-dashed border-[#D6D9DE] bg-white px-6 py-10 text-center text-[14px] text-[#80858C]">
                <Search size={20} className="text-[#B0B4BA]" />
                No links match that search or filter.
                <button
                  onClick={() => {
                    setQuery("");
                    setStatusFilter("all");
                  }}
                  className="mt-1 text-[14px] font-medium text-[#151619] hover:underline hover:underline-offset-4"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>

          {workspaceId && hasMore && (
            <div className="flex justify-center pt-5">
              <button type="button" className={buttonStyles.secondary} onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? <Loader2 size={16} className="animate-spin" /> : null}
                {loadingMore ? "Loading…" : "Load more links"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
