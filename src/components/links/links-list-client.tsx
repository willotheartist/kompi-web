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
    <div className={cn("wf-dashboard-main space-y-6")}>
      {/* Dashboard/PageHeader + FilterBar */}
      <header className="wf-dashboard-header border-b border-[color:var(--color-border)] pb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[20px] font-semibold text-[color:var(--color-text)]">
            Your links
          </h1>
          <p className="text-sm text-[color:var(--color-subtle)]">
            Manage short links, track engagements, and jump into analytics.
          </p>
        </div>

        <div className="wf-dashboard-filters mt-4 flex flex-col gap-3 md:mt-0 md:flex-row md:items-center md:justify-end">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by URL, code, or short link…"
            className={cn(
              "order-1 w-full max-w-sm rounded-full border bg-transparent px-3 py-2 text-sm",
              "border-[color:var(--color-border)] text-[color:var(--color-text)]",
              "placeholder:text-[color:var(--color-subtle)]",
              "focus-visible:ring-1 focus-visible:ring-[color:var(--color-accent)] focus-visible:border-[color:var(--color-accent)]",
              "md:order-none"
            )}
            disabled={noLinksAtAll}
          />

          <Button
            asChild
            className="h-10 rounded-full px-4 text-[13px] font-semibold"
          >
            <Link href="/links/new">Create link</Link>
          </Button>
        </div>
      </header>

      {/* Empty state */}
      {noLinksAtAll ? (
        <section className="wf-dashboard-content flex min-h-[48vh] items-center justify-center">
          <Card className="wf-dashboard-empty-state mx-auto w-full max-w-lg px-6 py-8 text-center">
            <h2 className="text-lg font-semibold text-[color:var(--color-text)]">
              Ready to create your first link?
            </h2>
            <p className="mt-1 text-sm text-[color:var(--color-subtle)]">
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
        // List / Dashboard/ListWithMeta
        <section className="wf-dashboard-content space-y-3">
          {filtered.length === 0 ? (
            <Card className="wf-dashboard-inline-notice p-4 text-sm text-[color:var(--color-subtle)]">
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
                    "wf-dashboard-table-card group"
                  )}
                >
                  <div className="flex items-stretch gap-4 px-4 py-3 md:px-5">
                    {/* Left selector column */}
                    <div className="flex flex-col items-center gap-3 pt-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[color:var(--color-border)] text-[color:var(--color-accent)] focus-visible:ring-[color:var(--color-accent)]"
                      />
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)]"
                        style={faviconStyle}
                      >
                        {/* Fallback arrow when we don't have a favicon */}
                        {!host && (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[11px] font-semibold text-[color:var(--color-text)]">
                            →
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle content column */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      {/* Title row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-[15px] font-semibold text-[color:var(--color-text)]">
                          {title}
                        </h2>

                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide border",
                            link.isActive
                              ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]"
                              : "border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-subtle)]"
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
                            className="font-medium text-[color:var(--color-text)] underline decoration-[color:var(--color-accent)] underline-offset-4 hover:decoration-2"
                          >
                            {composedShortUrl}
                          </a>
                        </div>
                      )}

                      {/* Long destination */}
                      <div className="flex items-start gap-1.5 text-[13px] text-[color:var(--color-subtle)]">
                        <CornerDownRight className="mt-[2px] h-[14px] w-[14px] text-[color:var(--color-subtle)] opacity-80" />
                        <span className="truncate">{link.targetUrl}</span>
                      </div>

                      {/* Meta row */}
                      <div className="mt-1.5 flex flex-wrap gap-4 text-[12px] text-[color:var(--color-subtle)]">
                        <span className="inline-flex items-center gap-1">
                          <MousePointer2 className="h-[14px] w-[14px] text-[color:var(--color-subtle)] opacity-80" />
                          <span className="font-medium text-[color:var(--color-text)]">
                            {link.clicks ?? 0}
                          </span>
                          <span className="opacity-80">engagements</span>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-[14px] w-[14px] text-[color:var(--color-subtle)] opacity-80" />
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
                          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors",
                          link.isActive
                            ? "border-transparent bg-[color:var(--color-accent)]"
                            : "border-[color:var(--color-border)] bg-[color:var(--color-bg)]"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 rounded-full bg-[color:var(--color-surface)] shadow-sm transition-transform",
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
                          "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[color:var(--color-text)]",
                          "border-[color:var(--color-border)] bg-[color:var(--color-surface)]",
                          "transition-colors hover:bg-[color:var(--color-bg)]"
                        )}
                        aria-label={isCopied ? "Copied" : "Copy short link"}
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-[color:var(--color-accent)]" />
                        ) : (
                          <Copy className="h-4 w-4 text-[color:var(--color-subtle)]" />
                        )}
                      </button>

                      {/* View icon button */}
                      <Link
                        href={`/links/${link.id}`}
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[color:var(--color-text)]",
                          "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)]",
                          "transition-colors hover:bg-[color:var(--color-accent)]"
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
                          "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[color:var(--color-text)]",
                          "border-[color:var(--color-border)] bg-[color:var(--color-surface)]",
                          "hover:bg-[color:var(--color-bg)]"
                        )}
                      />
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      )}
    </div>
  );
}
