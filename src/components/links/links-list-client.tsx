"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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
};

export function LinksListClient({ links }: LinksListClientProps) {
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

  return (
    <div className="space-y-4">
      {/* Header + search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          Your links
        </h1>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by URL, code, or short link..."
          className="w-full max-w-sm"
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card className="p-4 text-sm text-muted-foreground">
            No links found. Try a different search.
          </Card>
        ) : (
          filtered.map((link) => {
            const isCopied = copiedId === link.id;

            return (
              <Card
                key={link.id}
                className={cn(
                  "flex flex-col gap-2 rounded-2xl border bg-background/70 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between",
                  !link.isActive && "opacity-60"
                )}
              >
                <div className="space-y-1">
                  {/* Short URL / code */}
                  <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                    {link.shortUrl ? (
                      <a
                        href={link.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-primary hover:underline"
                      >
                        {link.shortUrl}
                      </a>
                    ) : link.code ? (
                      <span className="text-primary">
                        /r/{link.code}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        No short URL
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {link.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* Target URL */}
                  <div className="truncate text-xs text-muted-foreground">
                    {link.targetUrl}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                    <span>Clicks: {link.clicks ?? 0}</span>
                    <span>Created: {link.createdLabel}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-0 md:justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (!link.shortUrl) return; // ✅ guard null
                      if (typeof navigator === "undefined") return;

                      navigator.clipboard
                        .writeText(link.shortUrl)
                        .then(() => {
                          setCopiedId(link.id);
                          setTimeout(
                            () => setCopiedId(null),
                            1500
                          );
                        })
                        .catch(() => {});
                    }}
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                  >
                    <a href={`/links/${link.id}`}>View</a>
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
