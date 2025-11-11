"use client";

import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Link2,
  BarChart3,
  Copy,
  ExternalLink,
  Filter,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type LinkListItem = {
  id: string;
  code: string | null;
  shortUrl: string | null;
  targetUrl: string;
  createdLabel: string;
  clicks: number;
};

export function LinksListClient({ links }: { links: LinkListItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showActive] = useState<"active" | "all">("active"); // placeholder for future filter

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return links.filter((l) => {
      if (!q) return true;
      return (
        (l.shortUrl || "").toLowerCase().includes(q) ||
        l.targetUrl.toLowerCase().includes(q) ||
        (l.code || "").toLowerCase().includes(q)
      );
    });
  }, [links, query]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Kompi Links</h1>
            <p className="text-sm text-slate-400">
              Every short link and Kompi Code™ in one clean, trackable list.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 text-xs text-slate-400">
            <span>
              Total links:{" "}
              <span className="text-cyan-300 font-semibold">
                {links.length}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Click into any card for full analytics.
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search links by destination, code, or Kompi URL..."
              className="pl-8 bg-white/5 border-white/15 text-sm placeholder:text-slate-500"
            />
            <Link2 className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className={cn(
                "h-9 rounded-2xl text-xs px-3 border-white/15 text-slate-300 bg-transparent",
                showActive === "active" && "bg-white/5 text-cyan-300"
              )}
            >
              Show: Active
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-2xl text-xs px-3 border-white/15 text-slate-300 bg-transparent flex items-center gap-1"
            >
              <Filter className="h-3 w-3" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      {/* Links list */}
      {filtered.length === 0 ? (
        <GlassCard>
          <p className="text-sm text-slate-400">
            No links match your search yet. Try a different query or create a new Kompi link from the dashboard.
          </p>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((link) => (
            <GlassCard
              key={link.id}
              className="border border-white/10 hover:border-cyan-400/40 bg-white/5 hover:bg-white/8 transition-all cursor-pointer"
            >
              <div
                className="flex flex-col lg:flex-row gap-3 lg:items-center"
                onClick={() => router.push(`/links/${link.id}`)}
              >
                {/* Main info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-50 truncate">
                      {link.shortUrl || link.code || "Kompi link"}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 truncate">
                    {link.targetUrl}
                  </p>
                  <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 mt-1">
                    <span>Created: {link.createdLabel}</span>
                    {link.code && (
                      <span>
                        Code: <span className="text-slate-300">{link.code}</span>
                      </span>
                    )}
                    <span>ID: {link.id.slice(0, 8)}...</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 text-xs md:text-sm text-slate-300">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{link.clicks}</span>
                    <span className="text-[10px] text-slate-500">
                      total clicks
                    </span>
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="font-semibold">Live</span>
                    <span className="text-[10px] text-emerald-400">
                      tracking
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="flex flex-row lg:flex-col items-end gap-2 flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.shortUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 rounded-2xl text-[10px] px-3 border-white/20 text-slate-100 bg-transparent hover:bg-white/10 flex items-center gap-1"
                      onClick={() => {
                        if (typeof navigator !== "undefined") {
                          navigator.clipboard
                            .writeText(link.shortUrl)
                            .catch(() => {});
                        }
                      }}
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                  )}
                  {link.targetUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="h-8 rounded-2xl text-[10px] px-3 border-white/20 text-slate-100 bg-transparent hover:bg-white/10 flex items-center gap-1"
                    >
                      <a
                        href={link.targetUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Visit
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
