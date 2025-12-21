// src/components/links/links-list-client.tsx
"use client";

import React, { useDeferredValue, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateLinkForm } from "@/components/links/create-link-form";
import LinkActionsMenu from "@/components/links/link-actions-menu";
import {
  MousePointer2,
  CalendarDays,
  CornerDownRight,
  Copy,
  Eye,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const FREE_LINK_LIMIT = 20;

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

type LinksListClientProps = {
  links: LinkListItem[];
  workspaceId?: string;
  onToggleActive?: (linkId: string, nextActive: boolean) => void;
  initialCursor?: Cursor;
  pageSize?: number;
};

function getHost(targetUrl: string): string | null {
  try {
    return new URL(targetUrl).hostname;
  } catch {
    return null;
  }
}

function Favicon({ host, title }: { host: string | null; title: string }) {
  if (!host) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg)">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-accent) text-[11px] font-semibold text-(--color-text)">
          →
        </span>
      </div>
    );
  }

  const src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    host
  )}&sz=64`;

  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-(--color-border) bg-(--color-bg)">
      <img
        src={src}
        alt={`${title} favicon`}
        className="h-6 w-6"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

type RowProps = {
  link: LinkListItem;
  isPending: boolean;
  isCopied: boolean;
  onToggleActive: (id: string, next: boolean) => void;
  onCopy: (id: string, url: string) => void;
};

const LinkRow = React.memo(function LinkRow({
  link,
  isPending,
  isCopied,
  onToggleActive,
  onCopy,
}: RowProps) {
  const composedShortUrl =
    link.shortUrl ??
    (link.code
      ? `${typeof window !== "undefined" ? window.location.origin : ""}/r/${
          link.code
        }`
      : "");

  const host = getHost(link.targetUrl);

  const displayTitle =
    link.title?.trim() ||
    (host && link.code ? `${host} – ${link.code}` : host || link.code || "untitled");

  return (
    <article
      className={cn(
        "wf-dashboard-table-card group rounded-3xl border border-(--color-border) bg-white",
        "transition-colors hover:bg-(--color-bg)"
      )}
    >
      <div className="flex items-stretch gap-4 px-5 py-4 md:px-6">
        <div className="flex items-center justify-center">
          <Favicon host={host} title={displayTitle} />
        </div>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[15px] font-semibold text-(--color-text)">
              {displayTitle}
            </h2>

            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide border",
                link.isActive
                  ? "border-(--color-accent) bg-(--color-accent-soft) text-(--color-text)"
                  : "border-(--color-border) bg-(--color-bg) text-(--color-subtle)"
              )}
            >
              {link.isActive ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>

          {composedShortUrl && (
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <a
                href={composedShortUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-(--color-text) underline decoration-(--color-accent) underline-offset-4 hover:decoration-2"
              >
                {composedShortUrl}
              </a>
            </div>
          )}

          <div className="flex items-start gap-1.5 text-[13px] text-(--color-subtle)">
            <CornerDownRight className="mt-0.5 h-3.5 w-3.5" />
            <span className="truncate">{link.targetUrl}</span>
          </div>

          <div className="mt-1.5 flex flex-wrap gap-4 text-[12px] text-(--color-subtle)">
            <span className="inline-flex items-center gap-1">
              <MousePointer2 className="h-3.5 w-3.5" />
              <span className="font-medium text-(--color-text)">
                {link.clicks ?? 0}
              </span>
              <span className="opacity-80">engagements</span>
            </span>

            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span className="opacity-80">{link.createdLabel}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            role="switch"
            aria-checked={link.isActive}
            disabled={isPending}
            onClick={() => onToggleActive(link.id, !link.isActive)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors",
              link.isActive
                ? "border-transparent bg-(--color-accent)"
                : "border-(--color-border) bg-(--color-bg)",
              isPending && "cursor-not-allowed opacity-60"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 rounded-full bg-(--color-surface) transition-transform",
                link.isActive ? "translate-x-4" : "translate-x-1"
              )}
            />
          </button>

          <button
            type="button"
            onClick={() => {
              if (!composedShortUrl) return;
              onCopy(link.id, composedShortUrl);
            }}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border text-(--color-text)",
              "border-(--color-border) bg-(--color-surface)",
              "transition-colors hover:bg-(--color-bg)"
            )}
            aria-label={isCopied ? "Copied" : "Copy short link"}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-(--color-accent)" />
            ) : (
              <Copy className="h-4 w-4 text-(--color-subtle)" />
            )}
          </button>

          {/* 👇 Disable prefetch for each row (mass-prefetch can slow the page) */}
          <Link
            prefetch={false}
            href={`/links/${link.id}`}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border",
              "border-(--color-accent) bg-(--color-accent-soft) transition-colors hover:bg-(--color-accent)"
            )}
            aria-label="View analytics"
          >
            <Eye className="h-4 w-4" />
          </Link>

          <LinkActionsMenu
            id={link.id}
            shortUrl={composedShortUrl}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border text-(--color-text)",
              "border-(--color-border) bg-(--color-surface) transition-colors hover:bg-(--color-bg)"
            )}
          />
        </div>
      </div>
    </article>
  );
});

export function LinksListClient({
  links,
  workspaceId,
  onToggleActive,
  initialCursor = null,
  pageSize = 50,
}: LinksListClientProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">(
    "all"
  );

  const [items, setItems] = useState<LinkListItem[]>(links ?? []);
  const [cursor, setCursor] = useState<Cursor>(initialCursor);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(!!initialCursor);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    let out = items;

    if (statusFilter === "active") out = out.filter((l) => l.isActive);
    if (statusFilter === "inactive") out = out.filter((l) => !l.isActive);

    if (!q) return out;

    return out.filter((link) => {
      const title = (link.title ?? "").toLowerCase();
      return (
        link.targetUrl.toLowerCase().includes(q) ||
        (link.code && link.code.toLowerCase().includes(q)) ||
        (link.shortUrl && link.shortUrl.toLowerCase().includes(q)) ||
        title.includes(q)
      );
    });
  }, [items, deferredQuery, statusFilter]);

  if (!links) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  const usedLinks = items.length;
  const isAtLimit = usedLinks >= FREE_LINK_LIMIT;
  const noLinksAtAll = usedLinks === 0;

  const handleToggleActive = (linkId: string, nextActive: boolean) => {
    if (onToggleActive) return onToggleActive(linkId, nextActive);

    setItems((prev) =>
      prev.map((l) => (l.id === linkId ? { ...l, isActive: nextActive } : l))
    );

    startTransition(async () => {
      try {
        const res = await fetch(`/api/links/${linkId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: nextActive }),
        });

        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          toast.error(msg || "Could not update link");
          setItems((prev) =>
            prev.map((l) =>
              l.id === linkId ? { ...l, isActive: !nextActive } : l
            )
          );
          return;
        }

        toast.success(nextActive ? "Link enabled" : "Link disabled");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong updating this link");
        setItems((prev) =>
          prev.map((l) =>
            l.id === linkId ? { ...l, isActive: !nextActive } : l
          )
        );
      }
    });
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    });
  };

  async function loadMore() {
    if (!workspaceId) return;
    if (!cursor || loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const params = new URLSearchParams();
      params.set("workspaceId", workspaceId);
      params.set("limit", String(pageSize));
      params.set("before", cursor.before);
      params.set("beforeId", cursor.beforeId);

      const res = await fetch(`/api/links?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        toast.error("Could not load more links");
        return;
      }

      const json = (await res.json()) as {
        links: Array<{
          id: string;
          code: string | null;
          targetUrl: string;
          clicks: number | null;
          createdAt: string;
          isActive: boolean;
          title?: string | null;
        }>;
        nextCursor: Cursor;
      };

      const more: LinkListItem[] = (json.links ?? []).map((link) => {
        const composedShortUrl =
          link.code && typeof window !== "undefined"
            ? `${window.location.origin}/r/${link.code}`
            : link.code
            ? `/r/${link.code}`
            : null;

        const createdLabel = link.createdAt
          ? new Date(link.createdAt).toISOString().slice(0, 10)
          : "";

        return {
          id: link.id,
          code: link.code ?? null,
          shortUrl: composedShortUrl,
          targetUrl: link.targetUrl,
          clicks: link.clicks ?? 0,
          createdLabel,
          isActive: link.isActive ?? true,
          title: link.title ?? null,
          createdAtIso: link.createdAt,
        };
      });

      setItems((prev) => [...prev, ...more]);
      setCursor(json.nextCursor ?? null);
      setHasMore(!!json.nextCursor);
    } catch (e) {
      console.error(e);
      toast.error("Could not load more links");
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className={cn("wf-dashboard-main space-y-6")}>
      <header className="wf-dashboard-header">
        <div className="w-full rounded-4xl bg-[#006476] px-6 py-6 sm:px-10 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex justify-start lg:items-center lg:justify-center">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                  <div className="absolute -left-4 top-3 h-16 w-14 rounded-2xl bg-[#F5FF47]" />
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#FF5A4A]">
                    <img
                      src="/kompi-business.png"
                      alt="Kompi hero"
                      className="h-full w-full object-cover"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <p
                    className="text-[32px] sm:text-[40px]"
                    style={{
                      fontFamily: '"Instrument Serif", serif',
                      fontWeight: 400,
                      color: "#F4FBFF",
                    }}
                  >
                    Your links.
                  </p>
                  <p
                    className="text-sm sm:text-base"
                    style={{
                      fontFamily: '"Inter Tight", sans-serif',
                      color: "rgba(244,251,255,0.9)",
                    }}
                  >
                    Manage short links, track engagement, and jump into analytics.
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="inline-flex w-full max-w-xs items-center rounded-full bg-white p-1 text-sm lg:max-w-[320px]">
                    {["all", "active", "inactive"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          setStatusFilter(v as "all" | "active" | "inactive")
                        }
                        className={cn(
                          "flex-1 rounded-full px-4 py-2 transition",
                          statusFilter === v
                            ? "bg-[#006476] text-white"
                            : "text-[#006476]"
                        )}
                      >
                        {v[0].toUpperCase() + v.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by title, URL, code, or short link..."
                      className={cn(
                        "h-11 flex-1 rounded-full border-0 bg-white px-4 text-sm",
                        "text-[#003426] placeholder:text-[rgba(0,0,0,0.4)]",
                        "focus-visible:ring-2 focus-visible:ring-[#00A7C0] focus-visible:ring-offset-0"
                      )}
                      disabled={noLinksAtAll}
                    />

                    {/* 👇 Disable prefetch; this page is heavy + you don’t want eager loading */}
                    <Button
                      asChild
                      disabled={isAtLimit}
                      className="h-11 rounded-full px-6 text-[15px] font-semibold shadow-none disabled:opacity-60"
                      style={{
                        backgroundColor: "#D8FF3B",
                        color: "#003426",
                        fontFamily: '"Inter Tight", sans-serif',
                      }}
                    >
                      <Link prefetch={false} href="/links/new">
                        Create link
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 text-right lg:mt-0">
              <p
                className="text-xs sm:text-sm"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontWeight: 400,
                  color: "#F4FBFF",
                }}
              >
                {usedLinks}/{FREE_LINK_LIMIT} links used on the Free plan
                {isAtLimit
                  ? " - you've hit your Free limit. Upgrade to Creator for more links."
                  : " - upgrade to Creator for higher limits."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {noLinksAtAll ? (
        <section className="wf-dashboard-content flex min-h-[48vh] items-center justify-center">
          <Card className="wf-dashboard-empty-state mx-auto w-full max-w-lg rounded-3xl bg-white px-6 py-8 text-center">
            <h2 className="text-lg font-semibold text-(--color-text)">
              Ready to create your first link?
            </h2>
            <p className="mt-1 text-sm text-(--color-subtle)">
              Spin up a clean short link and start tracking clicks in seconds.
            </p>

            {workspaceId ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-5 rounded-full px-5 py-2 text-sm font-medium">
                    Create link
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-semibold">
                      Create a new link
                    </DialogTitle>
                  </DialogHeader>
                  <CreateLinkForm workspaceId={workspaceId} />
                </DialogContent>
              </Dialog>
            ) : null}
          </Card>
        </section>
      ) : (
        <section className="wf-dashboard-content space-y-4">
          {filtered.length === 0 ? (
            <Card className="wf-dashboard-inline-notice rounded-2xl bg-white p-4 text-sm text-(--color-subtle)">
              No links found. Try a different search or filter.
            </Card>
          ) : (
            filtered.map((link) => (
              <LinkRow
                key={link.id}
                link={link}
                isPending={isPending}
                isCopied={copiedId === link.id}
                onToggleActive={handleToggleActive}
                onCopy={handleCopy}
              />
            ))
          )}

          {workspaceId && hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading…
                  </span>
                ) : (
                  "Load more"
                )}
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
