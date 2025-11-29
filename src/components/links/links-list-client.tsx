"use client";

import { useMemo, useState, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">(
    "all",
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let out = links;

    if (statusFilter === "active") {
      out = out.filter((link) => link.isActive);
    } else if (statusFilter === "inactive") {
      out = out.filter((link) => !link.isActive);
    }

    if (!q) return out;

    return out.filter((link) => {
      const title = (link.title ?? "").toLowerCase();
      return (
        link.targetUrl.toLowerCase().includes(q) ||
        (link.code && link.code.toLowerCase().includes(q)) ||
        (link.shortUrl && link.shortUrl.toLowerCase().includes(q)) ||
        (title && title.includes(q))
      );
    });
  }, [links, query, statusFilter]);

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
  const usedLinks = links.length;
  const remainingLinks = Math.max(FREE_LINK_LIMIT - usedLinks, 0);
  const isAtLimit = usedLinks >= FREE_LINK_LIMIT;


  const handleToggleActive = (linkId: string, nextActive: boolean) => {
    // If parent provided a handler, delegate to it
    if (onToggleActive) {
      onToggleActive(linkId, nextActive);
      return;
    }

    // Default behaviour: call API and reload
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
          return;
        }

        toast.success(nextActive ? "Link enabled" : "Link disabled");
        window.location.reload();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong updating this link");
      }
    });
  };

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
          <p className="text-xs text-[color:var(--color-subtle)]">
            {usedLinks} / {FREE_LINK_LIMIT} links used on the Free plan
            {isAtLimit ? " – delete a link to create more." : ""}
          </p>
        </div>

        <div className="wf-dashboard-filters mt-4 flex flex-col gap-3 md:mt-0 md:flex-row md:items-center md:justify-end">
          {/* Status filter pill */}
          <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={cn(
                "rounded-full px-3 py-1 transition",
                statusFilter === "all"
                  ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]"
                  : "text-[color:var(--color-subtle)] hover:bg-[color:var(--color-bg)]",
              )}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("active")}
              className={cn(
                "rounded-full px-3 py-1 transition",
                statusFilter === "active"
                  ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]"
                  : "text-[color:var(--color-subtle)] hover:bg-[color:var(--color-bg)]",
              )}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("inactive")}
              className={cn(
                "rounded-full px-3 py-1 transition",
                statusFilter === "inactive"
                  ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]"
                  : "text-[color:var(--color-subtle)] hover:bg-[color:var(--color-bg)]",
              )}
            >
              Inactive
            </button>
          </div>

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, URL, code, or short link…"
            className={cn(
              "order-1 w-full max-w-sm rounded-full border bg-white px-3 py-2 text-sm",
              "border-[color:var(--color-border)] text-[color:var(--color-text)]",
              "placeholder:text-[color:var(--color-subtle)]",
              "focus-visible:ring-1 focus-visible:ring-[color:var(--color-accent)] focus-visible:border-[color:var(--color-accent)]",
              "md:order-none",
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
          <Card className="wf-dashboard-empty-state mx-auto w-full max-w-lg rounded-3xl bg-white px-6 py-8 text-center">
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
        <section className="wf-dashboard-content space-y-4">
          {filtered.length === 0 ? (
            <Card className="wf-dashboard-inline-notice rounded-2xl bg-white p-4 text-sm text-[color:var(--color-subtle)]">
              No links found. Try a different search or filter.
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

              const displayTitle =
                link.title?.trim() ||
                (host && link.code
                  ? `${host} – ${link.code}`
                  : host || link.code || "untitled");

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
                    "wf-dashboard-table-card group rounded-3xl border border-[color:var(--color-border)] bg-white",
                    "transition-colors hover:bg-[color:var(--color-bg)]",
                  )}
                >
                  <div className="flex items-stretch gap-4 px-5 py-4 md:px-6">
                    {/* Left favicon column */}
                    <div className="flex items-center justify-center">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)]"
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
                          {displayTitle}
                        </h2>

                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide border",
                            link.isActive
                              ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]"
                              : "border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-subtle)]",
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
                        onClick={() => handleToggleActive(link.id, !link.isActive)}
                        disabled={isPending}
                        className={cn(
                          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors",
                          link.isActive
                            ? "border-transparent bg-[color:var(--color-accent)]"
                            : "border-[color:var(--color-border)] bg-[color:var(--color-bg)]",
                          isPending && "cursor-not-allowed opacity-60",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 rounded-full bg-[color:var(--color-surface)] transition-transform",
                            link.isActive ? "translate-x-4" : "translate-x-1",
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
                          "transition-colors hover:bg-[color:var(--color-bg)]",
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
                          "transition-colors hover:bg-[color:var(--color-accent)]",
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
                          "transition-colors hover:bg-[color:var(--color-bg)]",
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
