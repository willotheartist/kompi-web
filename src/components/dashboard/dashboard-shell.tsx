"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  ArrowUpRight,
  Zap,
  QrCode,
  Link2,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CreateModal } from "@/components/dashboard/create-modal";

export type LinkSummary = {
  id: string;
  code: string | null;
  shortUrl?: string | null;
  targetUrl: string;
  createdAt: string;
  clicks?: number | null;
};

type DashboardMode = "overview" | "performance";
type QuickMode = "link" | "kr";

export function DashboardShell({ links }: { links: LinkSummary[] }) {
  const router = useRouter();
  const [quickMode, setQuickMode] = useState<QuickMode>("link");
  const [dashboardMode, setDashboardMode] =
    useState<DashboardMode>("overview");
  const [quickUrl, setQuickUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  async function handleQuickCreate(e: FormEvent) {
    e.preventDefault();
    const trimmed = quickUrl.trim();
    if (!trimmed) {
      toast.error("Paste a URL first.");
      return;
    }

    try {
      setIsCreating(true);

      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          quickMode === "link"
            ? { targetUrl: trimmed }
            : { targetUrl: trimmed, createKr: true }
        ),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create link");
      }

      const data = await res.json();
      const code =
        data.code || data.link?.code || data.shortCode || data.slug;
      const shortUrl =
        data.shortUrl ||
        data.link?.shortUrl ||
        (code ? `${window.location.origin}/r/${code}` : null);

      toast.success(
        quickMode === "link"
          ? shortUrl
            ? `Kompi link created: ${shortUrl}`
            : "Kompi link created."
          : shortUrl
          ? `Kompi KR-ready link created: ${shortUrl}`
          : "Kompi KR-ready link created."
      );

      setQuickUrl("");
      router.refresh();
    } catch (err: unknown) {
      console.error("Quick create error:", err);
      const message =
        err instanceof Error ? err.message : "Unknown error";
      toast.error(
        message.toLowerCase().includes("unauthorized")
          ? "Please sign in again to create links."
          : "Could not create link. Check your URL and try again."
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 pb-2 border-b border-white/5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold">Kompi Dashboard</h1>
              <span className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-slate-300 border border-white/10">
                Workspace: Studio
              </span>
            </div>
            <p className="text-sm text-slate-400">
              {dashboardMode === "overview"
                ? "Your Kompi links, Kompi Codes™ (KR), bio pages and activity at a glance."
                : "Performance view with key metrics across your Kompi stack."}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 gap-1">
              <button
                onClick={() => setDashboardMode("overview")}
                className={`px-3 py-1.5 rounded-2xl text-xs font-medium ${
                  dashboardMode === "overview"
                    ? "bg-white text-slate-900"
                    : "text-slate-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setDashboardMode("performance")}
                className={`px-3 py-1.5 rounded-2xl text-xs font-medium ${
                  dashboardMode === "performance"
                    ? "bg-white text-slate-900"
                    : "text-slate-300"
                }`}
              >
                Performance
              </button>
            </div>

            {/* Create button */}
            <Button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="mt-1 h-9 px-3 rounded-2xl text-xs bg-white text-slate-900 hover:bg-slate-100 inline-flex items-center gap-2 shadow-[0_10px_40px_rgba(15,23,42,0.6)]"
            >
              <Plus className="h-3.5 w-3.5" />
              Create
            </Button>
          </div>
        </header>

        {/* Row 1: Quick create + metrics */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,2.2fr),minmax(0,1.4fr)]">
          {/* Quick create */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
                  Quick create
                </p>
                <h2 className="text-lg font-semibold">
                  Create a{" "}
                  {quickMode === "link"
                    ? "short link"
                    : "Kompi Code™ (KR)"}{" "}
                  in seconds
                </h2>
                <p className="text-sm text-slate-400">
                  Smart defaults from your active workspace. Analytics
                  included.
                </p>
              </div>
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                <button
                  onClick={() => setQuickMode("link")}
                  className={`px-3 py-1.5 rounded-full text-xs flex items-center ${
                    quickMode === "link"
                      ? "bg-white text-slate-900 font-semibold"
                      : "text-slate-200"
                  }`}
                >
                  <Link2 className="h-3.5 w-3.5 mr-1" />
                  Short link
                </button>
                <button
                  onClick={() => setQuickMode("kr")}
                  className={`px-3 py-1.5 rounded-full text-xs flex items-center ${
                    quickMode === "kr"
                      ? "bg-white text-slate-900 font-semibold"
                      : "text-slate-200"
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5 mr-1" />
                  KR code
                </button>
              </div>
            </div>

            <form
              className="flex flex-col md:flex-row gap-3 items-stretch"
              onSubmit={handleQuickCreate}
            >
              <Input
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                disabled={isCreating}
                className="bg-white/5 border-white/15 text-sm placeholder:text-slate-500"
                placeholder={
                  quickMode === "link"
                    ? "Paste any long URL to shorten with Kompi..."
                    : "Paste a destination URL to generate a Kompi KR code..."
                }
              />
              <Button
                type="submit"
                disabled={isCreating}
                className="whitespace-nowrap rounded-2xl px-6 text-sm bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-60"
              >
                {isCreating
                  ? "Working..."
                  : quickMode === "link"
                  ? "Create Kompi link"
                  : "Generate KR code"}
              </Button>
            </form>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <span>Auto-UTMs from workspace rules</span>
              <span>•</span>
              <span>Instant analytics & history</span>
              <span>•</span>
              <span>KR-ready for print & screens</span>
            </div>
          </GlassCard>

          {/* Metrics snapshot */}
          <GlassCard className="grid grid-cols-3 gap-4 items-stretch">
            <div>
              <p className="text-xs text-slate-400 mb-1">
                Last 7 days clicks
              </p>
              <p className="text-2xl font-semibold">12,480</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                +18% vs previous
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">
                Active Kompi links
              </p>
              <p className="text-2xl font-semibold">238</p>
              <p className="text-xs text-slate-400">
                Across 3 workspaces
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">
                KR code scans
              </p>
              <p className="text-2xl font-semibold">4,102</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <Zap className="h-4 w-4" />
                +36% this week
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Row 2: Getting started + Activity */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.4fr)]">
          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.16em]">
                  Getting started
                </p>
                <h3 className="text-base font-semibold">
                  60% complete — finish setting up Kompi
                </h3>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>✅ Create your first Kompi link</li>
              <li>✅ Publish a Link-in-bio page</li>
              <li>✅ Generate at least one Kompi Code™ (KR)</li>
              <li>⬜ Connect your custom domain</li>
              <li>⬜ Invite a teammate & assign roles</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.16em]">
                  Activity
                </p>
                <h3 className="text-base font-semibold">
                  Clicks & scans at a glance
                </h3>
              </div>
              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>
            <div className="h-24 rounded-2xl bg-white/5 flex items-end gap-1 px-2 pb-2">
              {[8, 10, 7, 12, 16, 14, 18].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: `${v * 4}%`,
                    opacity: 1,
                  }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="flex-1 rounded-full bg-gradient-to-t from-[#22d3ee] via-[#4f46e5] to-[#a855f7]"
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Wire this to real Prisma analytics when you’re ready.
            </p>
          </GlassCard>
        </div>

        {/* Row 3: Recent links */}
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-[0.16em]">
                Recent links
              </p>
              <h3 className="text-base font-semibold">
                Manage and track your latest Kompi links
              </h3>
            </div>
          </div>

          {links.length === 0 ? (
            <p className="text-sm text-slate-400">
              You don&apos;t have any Kompi links yet. Create one above
              to see it here instantly.
            </p>
          ) : (
            <div className="space-y-2">
              {links.map((link) => {
                const short =
                  link.shortUrl ||
                  (link.code ? `kompi.app/${link.code}` : null);
                const created = link.createdAt.slice(0, 10);
                const clicks =
                  typeof link.clicks === "number" ? link.clicks : 0;

                return (
                  <button
                    key={link.id}
                    onClick={() =>
                      router.push(`/links/${link.id}`)
                    }
                    className="w-full text-left rounded-2xl bg-white/5 hover:bg-white/10 transition-all px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      {short && (
                        <p className="text-sm font-semibold text-slate-50 truncate">
                          {short}
                        </p>
                      )}
                      <p className="text-xs md:text-sm text-slate-400 truncate">
                        {link.targetUrl}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-xs md:text-sm text-slate-300">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">
                          {clicks}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          clicks
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">
                          {created}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          created
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Modal mount */}
      <CreateModal open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
