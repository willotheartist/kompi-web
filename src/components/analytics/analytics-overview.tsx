// src/components/analytics/analytics-overview.tsx
"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import type { AnalyticsOverviewData } from "@/lib/analytics-overview";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { instrumentSerif } from "@/lib/fonts";

type Props = {
  data: AnalyticsOverviewData;
};

const DEVICE_LABELS: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
  bot: "Bot",
  unknown: "Unknown",
};

const DEVICE_COLORS: string[] = [
  "var(--color-accent)",
  "var(--color-accent-soft)",
  "var(--color-text)",
  "var(--color-subtle)",
  "var(--color-border)",
];

export function AnalyticsOverview({ data }: Props) {
  const { dateRange, totalEngagements, topDate } = data;

  const fromLabel = format(dateRange.from, "MMM d, yyyy");
  const toLabel = format(dateRange.to, "MMM d, yyyy");

  const deviceTotal = data.byDevice.reduce((sum, d) => sum + d.count, 0) || 1;

  const deviceChart = data.byDevice.map((d) => {
    const key = d.device.toLowerCase();
    return {
      name: DEVICE_LABELS[key] ?? d.device,
      value: d.count,
      percent: (d.count / deviceTotal) * 100,
    };
  });

  const referrerChart = data.byReferrer.map((r) => ({
    name: r.referrer,
    value: r.count,
  }));

  const countries = data.byCountry;
  const countriesSorted = [...countries].sort((a, b) => b.count - a.count);

  const totalDays = data.timeseries.length || 1;
  const activeDays = data.timeseries.filter((d) => d.count > 0).length;
  const avgPerDay = totalEngagements / totalDays;
  const uniqueDevices = data.byDevice.filter((d) => d.count > 0).length;
  const topCountry = countriesSorted[0]?.country ?? "—";

  return (
    <div className="wf-dashboard-main flex flex-col gap-6">
      {/* Pattern: DashboardPageHeaderA */}
      <div className="wf-dashboard-header border-b border-[color:var(--color-border)] pb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-1 rounded-full bg-[color:var(--color-accent)]" />
              <h1 className="text-xl font-semibold tracking-tight text-[color:var(--color-text)]">
                Insights
              </h1>
            </div>
            <p className="text-sm text-[color:var(--color-subtle)]">
              Lifetime insights across your Links and Kompi Codes™ in this
              workspace.
            </p>
          </div>

          <div className="wf-dashboard-filters flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
              <span className="font-medium text-[color:var(--color-text)]">
                {fromLabel} — {toLabel}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full px-3 text-xs"
            >
              Add filters
            </Button>
          </div>
        </div>
      </div>

      {/* Pattern: StatsRowA – lifetime KPI row */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="flex h-full flex-col justify-between gap-1 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--color-subtle)]">
              Total engagements
            </p>
            <p className="text-2xl font-semibold text-[color:var(--color-text)]">
              {totalEngagements.toLocaleString()}
            </p>
            <p className="text-xs text-[color:var(--color-subtle)]">
              Across the selected date range.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="flex h-full flex-col justify-between gap-1 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--color-subtle)]">
              Avg engagements / day
            </p>
            <p className="text-2xl font-semibold text-[color:var(--color-text)]">
              {avgPerDay.toFixed(1)}
            </p>
            <p className="text-xs text-[color:var(--color-subtle)]">
              Based on {totalDays.toLocaleString()} days of activity.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="flex h-full flex-col justify-between gap-1 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--color-subtle)]">
              Active days
            </p>
            <p className="text-2xl font-semibold text-[color:var(--color-text)]">
              {activeDays.toLocaleString()}
            </p>
            <p className="text-xs text-[color:var(--color-subtle)]">
              Days with at least one engagement.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="flex h-full flex-col justify-between gap-1 p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--color-subtle)]">
              Audience snapshot
            </p>
            <p className="text-sm font-semibold text-[color:var(--color-text)]">
              {uniqueDevices} device types · Top: {topCountry}
            </p>
            {topDate ? (
              <p className="text-xs text-[color:var(--color-subtle)]">
                Peak on{" "}
                <span className="font-medium text-[color:var(--color-accent)]">
                  {format(new Date(topDate.date), "MMM d")}
                </span>{" "}
                with {topDate.count.toLocaleString()} engagements.
              </p>
            ) : (
              <p className="text-xs text-[color:var(--color-subtle)]">
                Peak activity data will appear once you start getting clicks.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pattern: InsightsGridA – main charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Activity over time */}
        <Card className="lg:col-span-2 border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="h-64 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                  Activity
                </p>
                <p className="text-xs text-[color:var(--color-subtle)]">
                  Total engagements over time.
                </p>
              </div>
              <span className="rounded-full bg-[color:var(--color-bg)] px-2 py-1 text-[10px] font-medium text-[color:var(--color-subtle)]">
                Timeseries
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeseries}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="date"
                  tickMargin={8}
                  tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={{ stroke: "var(--color-border)" }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={{ stroke: "var(--color-border)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    color: "var(--color-text)",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "var(--color-accent)",
                    stroke: "var(--color-bg)",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Devices donut */}
        <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="flex h-64 flex-col gap-4 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                  Devices
                </p>
                <p className="text-xs text-[color:var(--color-subtle)]">
                  Where your audience is engaging from.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="h-40 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceChart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {deviceChart.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={
                            DEVICE_COLORS[idx % DEVICE_COLORS.length] ??
                            "var(--color-accent)"
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2 text-xs">
                {deviceChart.map((d, idx) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between text-[color:var(--color-text)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            DEVICE_COLORS[idx % DEVICE_COLORS.length] ??
                            "var(--color-accent)",
                        }}
                      />
                      <span>{d.name}</span>
                    </span>
                    <span className="text-[color:var(--color-subtle)]">
                      {d.value.toLocaleString()} ·{" "}
                      <span className="text-[color:var(--color-accent)]">
                        {d.percent.toFixed(1)}%
                      </span>
                    </span>
                  </div>
                ))}
                {deviceChart.length === 0 && (
                  <p className="text-xs text-[color:var(--color-subtle)]">
                    Device breakdown will appear once you start getting
                    engagements.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pattern: PromoBandA – hero CTA */}
      <Card className="border-none bg-transparent p-0">
        <CardContent className="flex flex-col gap-6 overflow-hidden rounded-3xl bg-[#e3e3e3] px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
          <div className="max-w-xl space-y-3">
            <p className="text-3xl leading-[1.1] tracking-[-0.03em] text-[color:var(--color-text)] md:text-4xl">
              <span>Connect your </span>
              <span
                className={`${instrumentSerif.className} italic`}
              >
                world.
              </span>
              <br />
              <span>Grow your </span>
              <span
                className={`${instrumentSerif.className} italic`}
              >
                brand.
              </span>
            </p>
            <p className="text-sm text-[color:var(--color-subtle)]">
              Turn every click into a clear signal. See which links are pulling
              their weight and where your audience loves to tap.
            </p>
            <Button
              className="mt-2 rounded-full px-6 py-2 text-sm font-semibold shadow-sm hover:shadow-md"
              style={{
                backgroundColor: "#D5FF3F",
                color: "#111111",
              }}
            >
              Explore your link insights
            </Button>
          </div>

          <div className="flex w-full max-w-xs justify-center md:max-w-sm md:justify-end">
            <div className="relative flex h-40 w-40 items-center justify-center md:h-56 md:w-56">
              <Image
                src="/herowoman.png"
                alt="Creator smiling with bright green glasses"
                fill
                className="rounded-3xl object-contain"
                priority
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pattern: InsightsGridB – sources + geography */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Referrer bar chart */}
        <Card className="lg:col-span-1 border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="h-64 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                  Top traffic sources
                </p>
                <p className="text-xs text-[color:var(--color-subtle)]">
                  Where engagements are coming from.
                </p>
              </div>
            </div>
            {referrerChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={referrerChart}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="name"
                    tickMargin={8}
                    tick={{ fontSize: 11, fill: "var(--color-subtle)" }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={{ stroke: "var(--color-border)" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={{ stroke: "var(--color-border)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    fill="var(--color-accent)"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-start text-xs text-[color:var(--color-subtle)]">
                Referrer insights will appear once traffic starts hitting your
                links.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Country table */}
        <Card className="lg:col-span-2 border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <CardContent className="px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                  Audience by location
                </p>
                <p className="text-xs text-[color:var(--color-subtle)]">
                  Countries ranked by total engagements.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-[color:var(--color-border)] text-xs uppercase text-[color:var(--color-subtle)]">
                  <tr>
                    <th className="py-2 pr-4 text-left">#</th>
                    <th className="py-2 pr-4 text-left">Country</th>
                    <th className="py-2 pr-4 text-right">Engagements</th>
                    <th className="py-2 pl-4 text-right">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {countriesSorted.map((c, idx) => {
                    const pct =
                      totalEngagements === 0
                        ? 0
                        : (c.count / totalEngagements) * 100;
                    return (
                      <tr
                        key={c.country + idx}
                        className="border-b border-[color:var(--color-border)] last:border-0"
                      >
                        <td className="py-2 pr-4 text-[color:var(--color-subtle)]">
                          {idx + 1}
                        </td>
                        <td className="py-2 pr-4 text-[color:var(--color-text)]">
                          {c.country}
                        </td>
                        <td className="py-2 pr-4 text-right text-[color:var(--color-text)]">
                          {c.count.toLocaleString()}
                        </td>
                        <td className="py-2 pl-4 text-right text-[color:var(--color-subtle)]">
                          <span className="font-medium text-[color:var(--color-accent)]">
                            {pct.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {countriesSorted.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-6 text-center text-[color:var(--color-subtle)]"
                      >
                        Location data will appear as soon as people start
                        engaging with your links.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
