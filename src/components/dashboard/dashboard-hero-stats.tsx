"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Link2,
  MousePointer2,
  QrCode,
  FilePlus2,
} from "lucide-react";

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

const formatNumber = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toLocaleString();
};

export function DashboardHeroStats({ stats }: DashboardHeroStatsProps) {
  const { totalClicks, activeLinks, avgClicks } = stats;

  // Derived temporary stats until you wire real data
  const linksCreated = activeLinks;
  const qrCodesCreated = 0;
  const qrScans = totalClicks;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer state update to the next animation frame to satisfy
    // react-hooks/set-state-in-effect (no synchronous setState in the effect body)
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  const cards = [
    { label: "Clicks", metric: formatNumber(totalClicks), Icon: Eye },
    { label: "Links", metric: formatNumber(activeLinks), Icon: Link2 },
    { label: "Avg / link", metric: formatNumber(avgClicks), Icon: MousePointer2 },
    { label: "Links made", metric: formatNumber(linksCreated), Icon: FilePlus2 },
    { label: "QRs made", metric: formatNumber(qrCodesCreated), Icon: QrCode },
    { label: "QR scans", metric: formatNumber(qrScans), Icon: QrCode },
  ];

  return (
    <section className="space-y-4 sm:space-y-5">
      <h1 className="text-xl font-semibold sm:text-2xl">Lifetime totals</h1>

      {/* One row, clean, evenly spaced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {cards.map(({ label, metric, Icon }, index) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-[24px] px-4 py-3 sm:px-5 sm:py-4 transition-all duration-300
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{
              backgroundColor: "var(--muted)",
              transitionDelay: `${index * 60}ms`,
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70">
              <Icon className="h-4 w-4" style={{ color: "var(--color-subtle)" }} />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-semibold sm:text-xl">{metric}</span>
              <span
                className="text-xs sm:text-sm"
                style={{ color: "var(--color-subtle)" }}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
