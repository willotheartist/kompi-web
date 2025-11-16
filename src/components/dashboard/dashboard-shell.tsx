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
        <header
          className="flex items-start justify-between gap-4 pb-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold leading-tight">
                Kompi{" "}
                <span
                  style={{
                    fontFamily:
                      "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                    fontStyle: "italic",
                    borderBottom: "2px solid var(--color-accent)",
                  }}
                >
                  Dashboard
                </span>
              </h1>
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                }}
              >
                Workspace: Studio
              </span>
            </div>
            <p
              className="text-sm max-w-xl"
              style={{ color: "var(--color-subtle)" }}
            >
              {dashboardMode === "overview"
                ? "Your Kompi links, Kompi Codes™ (KR), bio pages and activity at a glance."
                : "Performance view with key metrics across your Kompi stack."}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div
              className="inline-flex items-center rounded-full p-1 gap-1"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <button
                onClick={() => setDashboardMode("overview")}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={
                  dashboardMode === "overview"
                    ? {
                        backgroundColor: "var(--color-accent-soft)",
                        color: "var(--color-text)",
                      }
                    : { color: "var(--color-subtle)" }
                }
              >
                Overview
              </button>
              <button
                onClick={() => setDashboardMode("performance")}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={
                  dashboardMode === "performance"
                    ? {
                        backgroundColor: "var(--color-accent-soft)",
                        color: "var(--color-text)",
                      }
                    : { color: "var(--color-subtle)" }
                }
              >
                Performance
              </button>
            </div>

            {/* Create button */}
            <Button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="mt-1 h-9 px-4 rounded-full text-xs inline-flex items-center gap-2"
              style={{
                backgroundColor: "var(--color-text)",
                color: "var(--color-bg)",
                borderRadius: "999px",
              }}
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
                <p
                  className="text-[11px] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Quick create
                </p>
                <h2 className="text-lg font-semibold">
                  Create a{" "}
                  <span
                    style={{
                      fontFamily:
                        "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                      fontStyle: "italic",
                    }}
                  >
                    {quickMode === "link"
                      ? "short link"
                      : "Kompi Code™ (KR)"}
                  </span>{" "}
                  in seconds
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Smart defaults from your active workspace. Analytics
                  included.
                </p>
              </div>
              <div
                className="flex items-center gap-1 rounded-full p-1"
                style={{
                  backgroundColor: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <button
                  onClick={() => setQuickMode("link")}
                  className="px-3 py-1.5 rounded-full text-xs flex items-center"
                  style={
                    quickMode === "link"
                      ? {
                          backgroundColor: "var(--color-accent-soft)",
                          color: "var(--color-text)",
                        }
                      : { color: "var(--color-subtle)" }
                  }
                >
                  <Link2 className="h-3.5 w-3.5 mr-1" />
                  Short link
                </button>
                <button
                  onClick={() => setQuickMode("kr")}
                  className="px-3 py-1.5 rounded-full text-xs flex items-center"
                  style={
                    quickMode === "kr"
                      ? {
                          backgroundColor: "var(--color-accent-soft)",
                          color: "var(--color-text)",
                        }
                      : { color: "var(--color-subtle)" }
                  }
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
                className="text-sm"
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
                placeholder={
                  quickMode === "link"
                    ? "Paste any long URL to shorten with Kompi..."
                    : "Paste a destination URL to generate a Kompi KR code..."
                }
              />
              <Button
                type="submit"
                disabled={isCreating}
                className="whitespace-nowrap rounded-full px-6 text-sm"
                style={{
                  backgroundColor: "var(--color-text)",
                  color: "var(--color-bg)",
                  borderRadius: "999px",
                  opacity: isCreating ? 0.7 : 1,
                }}
              >
                {isCreating
                  ? "Working..."
                  : quickMode === "link"
                  ? "Create Kompi link"
                  : "Generate KR code"}
              </Button>
            </form>

            <div
              className="flex flex-wrap gap-4 text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              <span>Auto-UTMs from workspace rules</span>
              <span>•</span>
              <span>Instant analytics &amp; history</span>
              <span>•</span>
              <span>KR-ready for print &amp; screens</span>
            </div>
          </GlassCard>

          {/* Metrics snapshot */}
          <GlassCard className="grid grid-cols-3 gap-4 items-stretch">
            <div>
              <p
                className="mb-1 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Last 7 days clicks
              </p>
              <p className="text-2xl font-semibold">12,480</p>
              <p
                className="text-xs flex items-center gap-1"
                style={{ color: "var(--color-accent)" }}
              >
                <ArrowUpRight className="h-4 w-4" />
                +18% vs previous
              </p>
            </div>
            <div>
              <p
                className="mb-1 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Active Kompi links
              </p>
              <p className="text-2xl font-semibold">238</p>
              <p
                className="text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Across 3 workspaces
              </p>
            </div>
            <div>
              <p
                className="mb-1 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                KR code scans
              </p>
              <p className="text-2xl font-semibold">4,102</p>
              <p
                className="text-xs flex items-center gap-1"
                style={{ color: "var(--color-accent)" }}
              >
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
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Getting started
                </p>
                <h3 className="text-base font-semibold">
                  <span
                    style={{
                      fontFamily:
                        "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                      fontStyle: "italic",
                    }}
                  >
                    60% complete
                  </span>{" "}
                  — finish setting up Kompi
                </h3>
              </div>
            </div>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "var(--color-text)" }}
            >
              <li>✅ Create your first Kompi link</li>
              <li>✅ Publish a Link-in-bio page</li>
              <li>✅ Generate at least one Kompi Code™ (KR)</li>
              <li>⬜ Connect your custom domain</li>
              <li>⬜ Invite a teammate &amp; assign roles</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Activity
                </p>
                <h3 className="text-base font-semibold">
                  Clicks &amp; scans at a glance
                </h3>
              </div>
              <BarChart3
                className="h-5 w-5"
                style={{ color: "var(--color-subtle)" }}
              />
            </div>
            <div
              className="h-24 rounded-2xl flex items-end gap-1 px-2 pb-2"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              {[8, 10, 7, 12, 16, 14, 18].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: `${v * 4}%`,
                    opacity: 1,
                  }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="flex-1 rounded-full"
                  style={{ backgroundColor: "var(--color-accent-soft)" }}
                />
              ))}
            </div>
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              Wire this to real Prisma analytics when you’re ready.
            </p>
          </GlassCard>
        </div>

        {/* Row 3: Recent links */}
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p
                className="text-xs uppercase tracking-[0.16em]"
                style={{ color: "var(--color-subtle)" }}
              >
                Recent links
              </p>
              <h3 className="text-base font-semibold">
                Manage and track your latest{" "}
                <span
                  style={{
                    fontFamily:
                      "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                    fontStyle: "italic",
                  }}
                >
                  Kompi links
                </span>
              </h3>
            </div>
          </div>

          {links.length === 0 ? (
            <p
              className="text-sm"
              style={{ color: "var(--color-subtle)" }}
            >
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
                    onClick={() => router.push(`/links/${link.id}`)}
                    className="w-full text-left rounded-2xl px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 transition-colors"
                    style={{
                      backgroundColor: "var(--color-bg)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      {short && (
                        <p className="text-sm font-semibold truncate">
                          {short}
                        </p>
                      )}
                      <p
                        className="text-xs md:text-sm truncate"
                        style={{ color: "var(--color-subtle)" }}
                      >
                        {link.targetUrl}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-6 text-xs md:text-sm"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">
                          {clicks}
                        </span>
                        <span className="text-[10px]">clicks</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">
                          {created}
                        </span>
                        <span className="text-[10px]">created</span>
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
