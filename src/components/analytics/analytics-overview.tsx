// src/components/analytics/analytics-overview.tsx
"use client";

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

  return (
    <div className="wf-dashboard-main flex flex-col gap-6">
      {/* Dashboard/PageHeader + FilterBar */}
      <div className="wf-dashboard-header border-b border-[color:var(--color-border)] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex h-5 w-1 rounded-full bg-[color:var(--color-accent)]" />
            <h1 className="text-xl font-semibold tracking-tight text-[color:var(--color-text)]">
              Analytics
            </h1>
          </div>
          <p className="text-sm text-[color:var(--color-subtle)]">
            Overview of engagements across all Links and Kompi Codes™ in this
            workspace.
          </p>
        </div>

        <div className="wf-dashboard-filters mt-4 flex flex-col gap-2 text-sm md:mt-0 md:flex-row md:items-center md:justify-end">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-accent-soft)] bg-[color:var(--color-accent-soft)] px-3 py-1 text-xs text-[color:var(--color-text)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
            <span>
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

      {/* Cards grid – Dashboard layout */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Top performing date – Stats card */}
        <Card className="lg:col-span-1">
          <CardContent className="flex h-full flex-col justify-between gap-4 p-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                Top performing date
              </p>
              <p className="text-[11px] text-[color:var(--color-subtle)]">
                by total engagements
              </p>
            </div>

            {topDate ? (
              <>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--color-accent)]">
                    Peak activity
                  </p>
                  <p className="text-2xl font-semibold text-[color:var(--color-text)]">
                    {format(new Date(topDate.date), "MMMM d, yyyy")}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--color-subtle)]">
                    <span className="font-semibold text-[color:var(--color-accent)]">
                      {topDate.count.toLocaleString()}
                    </span>{" "}
                    engagements
                  </p>
                </div>
                <p className="text-[11px] text-[color:var(--color-subtle)]">
                  Based on activity across all Links and Kompi Codes™.
                </p>
              </>
            ) : (
              <p className="text-sm text-[color:var(--color-subtle)]">
                No activity during this range yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Device donut – Dashboard/Stats + Chart */}
        <Card className="lg:col-span-2">
          <CardContent className="flex h-full flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                  Total engagements by device
                </p>
                <p className="mt-1 text-2xl font-semibold text-[color:var(--color-text)]">
                  <span className="text-[color:var(--color-accent)]">
                    {totalEngagements.toLocaleString()}
                  </span>{" "}
                  engagements
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="h-48 flex-1">
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
              <div className="flex flex-1 flex-col justify-center gap-2 text-sm">
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeseries line chart */}
        <Card className="lg:col-span-2">
          <CardContent className="h-64 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                Total engagements over time
              </p>
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

        {/* Referrer bar chart */}
        <Card>
          <CardContent className="h-64 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                Total engagements by referrer
              </p>
            </div>
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
          </CardContent>
        </Card>

        {/* Country table – Dashboard/DataTableBlock */}
        <Card className="lg:col-span-3">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-subtle)]">
                Total engagements by location
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-[color:var(--color-border)] text-xs uppercase text-[color:var(--color-subtle)]">
                  <tr>
                    <th className="py-2 pr-4 text-left">#</th>
                    <th className="py-2 pr-4 text-left">Country</th>
                    <th className="py-2 pr-4 text-right">Engagements</th>
                    <th className="py-2 pl-4 text-right">%</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((c, idx) => {
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
                  {countries.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-6 text-center text-[color:var(--color-subtle)]"
                      >
                        No engagement data yet for this range.
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
