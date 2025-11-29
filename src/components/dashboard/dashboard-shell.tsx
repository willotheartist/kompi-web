"use client";

import { useState, useMemo, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateModal } from "@/components/dashboard/create-modal";
import { DashboardAnnouncementBanner } from "@/components/dashboard/dashboard-announcement-banner";
import { DashboardHeroStats } from "@/components/dashboard/dashboard-hero-stats";
import { DashboardQuickCreate } from "@/components/dashboard/dashboard-quick-create";
import { DashboardFeatureGrid } from "@/components/dashboard/dashboard-feature-grid";
import { DashboardTipsCard } from "@/components/dashboard/dashboard-tips-card";
import { DashboardRecentLinks } from "@/components/dashboard/dashboard-recent-links";
import { DashboardInviteTeammates } from "@/components/dashboard/dashboard-invite-teammates";
import type { LinkSummary } from "@/components/dashboard/dashboard-types";
import { PlanLimitModal } from "@/components/billing/plan-limit-modal";
import { DashboardActivityStrip } from "@/components/dashboard/dashboard-activity-strip";

type DashboardMode = "overview" | "performance";
type QuickMode = "link" | "kr";

export type { LinkSummary } from "@/components/dashboard/dashboard-types";

// Pattern: Shell/DashboardMain
export function DashboardShell({ links }: { links: LinkSummary[] }) {
  const router = useRouter();
  const [quickMode, setQuickMode] = useState<QuickMode>("link");
  const [dashboardMode, setDashboardMode] =
    useState<DashboardMode>("overview");
  const [quickUrl, setQuickUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [limitOpen, setLimitOpen] = useState(false);

  const hasLinks = links.length > 0;

  const { totalClicks, activeLinks, avgClicks, topLinks } = useMemo(() => {
    const total = links.reduce(
      (sum, link) => sum + (link.clicks ?? 0),
      0
    );
    const count = links.length;
    const avg = count > 0 ? Math.round(total / count) : 0;

    const sortedTop = [...links]
      .sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0))
      .slice(0, 3);

    return {
      totalClicks: total,
      activeLinks: count,
      avgClicks: avg,
      topLinks: sortedTop,
    };
  }, [links]);

  async function handleQuickCreate(e: FormEvent<HTMLFormElement>) {
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
        const lower = msg.toLowerCase();

        // Free plan limit: show upgrade modal, no thrown error
        if (lower.includes("free plan limit")) {
          setLimitOpen(true);
          return;
        }

        // Other errors still bubble to the catch() block
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

      const lower = message.toLowerCase();

      if (lower.includes("unauthorized")) {
        toast.error("Please sign in again to create links.");
      } else if (lower.includes("free plan limit")) {
        setLimitOpen(true);
      } else {
        toast.error("Could not create link. Check your URL and try again.");
      }
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
      <div className="wf-dashboard-main flex flex-col gap-6">
        <DashboardAnnouncementBanner />

        <DashboardHeroStats
          hasLinks={hasLinks}
          dashboardMode={dashboardMode}
          onModeChange={setDashboardMode}
          stats={{
            totalClicks,
            activeLinks,
            avgClicks,
          }}
        />

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.8fr),minmax(0,1.2fr)]">
          <DashboardQuickCreate
            quickMode={quickMode}
            onQuickModeChange={setQuickMode}
            quickUrl={quickUrl}
            onQuickUrlChange={setQuickUrl}
            isCreating={isCreating}
            onSubmit={handleQuickCreate}
            onOpenAdvanced={() => setCreateOpen(true)}
          />

          {/* NEW: Workspace snapshot strip (replaces DashboardActivityCard) */}
          <DashboardActivityStrip
            clicks={totalClicks}
            scans={0}          // TODO: wire real scan count
            linksCreated={activeLinks}
            codesCreated={0}   // TODO: wire real Kompi Code count
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr),minmax(0,1.2fr)]">
          <DashboardFeatureGrid />
          <DashboardTipsCard />
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr),minmax(0,1.3fr)]">
          <DashboardRecentLinks links={links} />
          <DashboardInviteTeammates />
        </section>
      </div>

      <CreateModal open={createOpen} onOpenChange={setCreateOpen} />
      <PlanLimitModal
        open={limitOpen}
        onOpenChange={setLimitOpen}
        limit={20}
        featureLabel="links"
      />
    </>
  );
}
