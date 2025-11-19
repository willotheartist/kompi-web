"use client";

import Image from "next/image";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Sparkles } from "lucide-react";

type DashboardMode = "overview" | "performance";

type DashboardHeroStatsProps = {
  hasLinks: boolean;
  dashboardMode: DashboardMode;
  onModeChange: (mode: DashboardMode) => void;
  stats: {
    totalClicks: number;
    activeLinks: number;
    avgClicks: number;
  };
};

// Pattern: HeroA_Dashboard
export function DashboardHeroStats({
  hasLinks,
  dashboardMode,
  onModeChange,
  stats,
}: DashboardHeroStatsProps) {
  const { totalClicks, activeLinks, avgClicks } = stats;

  return (
    <section className="relative">
      <GlassCard
        className="relative overflow-hidden flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8"
        // keep card styling purely via tokens
      >
        {/* Left: copy + controls + KPIs */}
        <div className="relative z-10 flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Dashboard
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
              Your{" "}
              <span
                style={{
                  fontFamily:
                    "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                  fontStyle: "italic",
                }}
              >
                Kompi
              </span>{" "}
              workspace at a glance
            </h1>
            <p
              className="text-sm sm:text-base max-w-xl"
              style={{ color: "var(--color-subtle)" }}
            >
              {hasLinks
                ? "Track how every Kompi link and Kompi Code™ is performing, then create your next move in seconds."
                : "Create your first Kompi link or Kompi Code™ and see your clicks, scans and campaigns come to life."}
            </p>
          </div>

          {/* Mode toggle */}
          <div
            className="inline-flex items-center rounded-full p-1 gap-1 mt-1"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <button
              onClick={() => onModeChange("overview")}
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
              onClick={() => onModeChange("performance")}
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
              Performance focus
            </button>
          </div>

          {/* KPIs row */}
          <div className="mt-4 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <p
                className="mb-1 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Total clicks
              </p>
              <p className="text-xl font-semibold">
                {totalClicks.toLocaleString()}
              </p>
              <p
                className="text-[11px]"
                style={{ color: "var(--color-subtle)" }}
              >
                Across all Kompi links
              </p>
            </div>
            <div>
              <p
                className="mb-1 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Active links
              </p>
              <p className="text-xl font-semibold">
                {activeLinks.toLocaleString()}
              </p>
              <p
                className="text-[11px]"
                style={{ color: "var(--color-subtle)" }}
              >
                In this workspace
              </p>
            </div>
            <div>
              <p
                className="mb-1 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Avg clicks / link
              </p>
              <p className="text-xl font-semibold">
                {avgClicks.toLocaleString()}
              </p>
              <p
                className="text-[11px]"
                style={{ color: "var(--color-subtle)" }}
              >
                Simple average
              </p>
            </div>
          </div>
        </div>

        {/* Right: hero image block */}
        <div className="relative flex-1 min-h-[180px] sm:min-h-[220px] md:min-h-[260px]">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <Image
              src="/herobg.png"
              alt="Kompi dashboard hero"
              fill
              priority
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
