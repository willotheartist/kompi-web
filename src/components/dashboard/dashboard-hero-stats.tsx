"use client";

import {
  Eye,
  Link2,
  QrCode,
  IdCard,
  MessageSquare,
  UserPlus,
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

const formatNumber = (value: number) => value.toLocaleString();

type StatCard = {
  label: string;
  value: string;
  delta: string; // keep as string so you can later swap to real computed deltas
  Icon: React.ComponentType<{ className?: string }>;
};

export function DashboardHeroStats({ stats }: DashboardHeroStatsProps) {
  const { totalClicks, activeLinks } = stats;

  // NOTE: placeholders until wired (design-first)
  const cards: StatCard[] = [
    { label: "Views", value: formatNumber(totalClicks), delta: "+0%", Icon: Eye },
    { label: "Links created", value: formatNumber(activeLinks), delta: "+0%", Icon: Link2 },
    { label: "QR Scans", value: formatNumber(0), delta: "+0%", Icon: QrCode },
    { label: "K-Card Taps", value: formatNumber(0), delta: "+0%", Icon: IdCard },
    { label: "Messages", value: formatNumber(0), delta: "+0%", Icon: MessageSquare },
    { label: "Leads", value: formatNumber(0), delta: "+0%", Icon: UserPlus },
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Lifetime totals</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {cards.map(({ label, value, delta, Icon }) => (
          <div
            key={label}
            className="rounded-2xl bg-white p-5"
          >
            <div className="text-sm font-medium text-neutral-700">{label}</div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(162, 184, 255, 0.55)" }}
                >
                  <Icon className="h-5 w-5 text-neutral-900" />
                </div>

                <div className="text-4xl font-semibold tracking-tight text-neutral-900">
                  {value}
                </div>
              </div>

              <div
                className="rounded-full px-3 py-1 text-xs font-medium text-neutral-900"
                style={{ backgroundColor: "#DDFB73" }}
              >
                {delta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
