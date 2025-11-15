"use client";

import { useMemo, useState } from "react";
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
import { onest } from "@/lib/fonts";
import {
  MousePointer2,
  CalendarDays,
  CornerDownRight,
  Copy,
  Eye,
  Check,
} from "lucide-react";

export type LinkListItem = {
  id: string;
  code: string | null;
  shortUrl: string | null;
  targetUrl: string;
  clicks: number | null;
  createdLabel: string;
  isActive: boolean;
};

type LinksListClientProps = {
  links: LinkListItem[];
  workspaceId?: string;
  /**
   * Optional handler for activating/deactivating a link.
   * Parent can wire this to a server action or API call.
   */
  onToggleActive?: (linkId: string, nextActive: boolean) => void;
};

export function LinksListClient({
  links,
  workspaceId,
  onToggleActive,
}: LinksListClientProps) {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;

    return links.filter((link) => {
      return (
        link.targetUrl.toLowerCase().includes(q) ||
        (link.code && link.code.toLowerCase().includes(q)) ||
        (link.shortUrl && link.shortUrl.toLowerCase().includes(q))
      );
    });
  }, [links, query]);

  if (!links) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  const noLinksAtAll = links.length === 0;

  return (
    <div className={cn("space-y-5", onest.className)}>
      {/* Header + search + create */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[20px] font-semibold text-white">Your links</h1>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <Button
            asChild
            className="order-2 h-10 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-4 text-[13px] font-semibold text-white shadow-[0_12px_40px_rgba(15,23,42,0.85)] hover:brightness-110 sm:order-1"
          >
            <Link href="/links/new">Create link</Link>
          </Button>

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by URL, code, or short link…"
            className={cn(
              "order-1 w-full max-w-sm rounded-2xl border border-white/10",
              "bg-slate-900/70 text-slate-100 placeholder:text-slate-500",
              "shadow-[0_10px_30px_rgba(15,23,42,0.75)] focus-visible:ring-sky-500/60 sm:order-2"
            )}
            disabled={noLinksAtAll}
          />
        </div>
      </div>

      {/* Empty state */}
      {noLinksAtAll ? (
        <div className="flex min-h-[48vh] items-center justify-center">
          <Card className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.9)]">
            <h2 className="text-lg font-semibold text-white">
              Ready to create your first link?
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Spin up a clean short link and start tracking clicks in seconds.
            </p>

            {workspaceId ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-5 rounded-2xl bg-white/95 px-5 py-2 text-sm font-medium text-slate-900 hover:bg-white">
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
        </div>
      ) : (
        // List
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
              No links found. Try a different search.
            </Card>
          ) : (
            filtered.map((link) => {
              const isCopied = copiedId === link.id;
              const composedShortUrl =
                link.shortUrl ??
                (link.code
                  ? `${
                      typeof window !== "undefined"
                        ? window.location.origin
                        : ""
                    }/r/${link.code}`
                  : "");

              let host: string | null = null;
              try {
                host = new URL(link.targetUrl).hostname;
              } catch {
                host = null;
              }

              const title =
                host && link.code
                  ? `${host} – ${link.code}`
                  : host || link.code || "untitled";

              // Use site favicon as the “logo bubble” where possible
              const faviconStyle =
                host != null
                  ? {
                      backgroundImage: `url(https://${host}/favicon.ico)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined;

              return (
                <article
                  key={link.id}
                  className={cn(
                    "group rounded-3xl border border-white/5 bg-slate-900/70",
                    "shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition-all",
                    "hover:border-sky-500/70 hover:bg-slate-900/90 hover:shadow-[0_24px_70px_rgba(15,23,42,1)]"
                  )}
                >
                  <div className="flex items-stretch gap-4 px-4 py-3 md:px-5">
                    {/* Left selector column */}
                    <div className="flex flex-col items-center gap-3 pt-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/25 bg-slate-900 text-sky-400 focus:ring-sky-500/70"
                      />
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-950/60"
                        style={faviconStyle}
                      >
                        {/* Fallback arrow when we don't have a favicon */}
                        {!host && (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-[11px] font-semibold text-slate-950">
                            →
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle content column */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      {/* Title row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-[15px] font-semibold text-slate-50">
                          {title}
                        </h2>

                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
                            link.isActive
                              ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
                              : "bg-slate-700/60 text-slate-300 ring-1 ring-slate-500/40"
                          )}
                        >
                          {link.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>

                      {/* Short link */}
                      {composedShortUrl && (
                        <div className="flex flex-wrap items-center gap-2 text-[13px]">
                          <a
                            href={composedShortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-sky-300 hover:text-sky-200 hover:underline"
                          >
                            {composedShortUrl}
                          </a>
                        </div>
                      )}

                      {/* Long destination */}
                      <div className="flex items-start gap-1.5 text-[13px] text-slate-300">
                        <CornerDownRight className="mt-[2px] h-[14px] w-[14px] opacity-60" />
                        <span className="truncate">{link.targetUrl}</span>
                      </div>

                      {/* Meta row */}
                      <div className="mt-1.5 flex flex-wrap gap-4 text-[12px] text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <MousePointer2 className="h-[14px] w-[14px] opacity-60" />
                          <span className="font-medium text-slate-100">
                            {link.clicks ?? 0}
                          </span>
                          <span className="opacity-80">engagements</span>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-[14px] w-[14px] opacity-60" />
                          <span className="opacity-80">
                            {link.createdLabel}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Right actions column */}
                    <div className="flex items-center gap-2 pt-1">
                      {/* Active / inactive toggle */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={link.isActive}
                        onClick={() =>
                          onToggleActive?.(link.id, !link.isActive)
                        }
                        className={cn(
                          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition",
                          link.isActive
                            ? "border-emerald-400 bg-emerald-500/80"
                            : "border-slate-500 bg-slate-700"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                            link.isActive ? "translate-x-4" : "translate-x-1"
                          )}
                        />
                      </button>

                      {/* Copy icon button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!composedShortUrl) return;
                          if (typeof navigator === "undefined") return;

                          navigator.clipboard
                            .writeText(composedShortUrl)
                            .then(() => {
                              setCopiedId(link.id);
                              setTimeout(() => setCopiedId(null), 1200);
                            })
                            .catch(() => {});
                        }}
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                          "border border-white/10 bg-white/5 text-slate-100",
                          "transition hover:border-sky-500/60 hover:bg-slate-900"
                        )}
                        aria-label={isCopied ? "Copied" : "Copy short link"}
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-sky-400" />
                        ) : (
                          <Copy className="h-4 w-4 opacity-80" />
                        )}
                      </button>

                      {/* View icon button */}
                      <Link
                        href={`/links/${link.id}`}
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                          "border border-sky-500/70 bg-sky-500/20 text-sky-200",
                          "shadow-[0_8px_26px_rgba(56,189,248,0.55)] transition",
                          "hover:bg-sky-500/30"
                        )}
                        aria-label="View link analytics"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      {/* 3-dots menu button */}
                      <LinkActionsMenu
                        id={link.id}
                        shortUrl={composedShortUrl}
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                          "border border-white/15 bg-white/5 text-white",
                          "hover:bg-white/10"
                        )}
                      />
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
