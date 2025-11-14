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
    <div className="flex flex-col gap-6">
      {/* Top bar with range + filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Analytics
          </h1>
          <p className="text-sm text-slate-400">
            Overview of engagements across all Links and Kompi Codes™ in this
            workspace.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="rounded-full bg-slate-900/70 border border-white/10 px-3 py-1 text-slate-200">
            {fromLabel} — {toLabel}
          </div>
          <Button variant="outline" size="sm" className="border-white/10">
            Add filters
          </Button>
        </div>
      </div>

      {/* Cards grid – mimics Bitly layout */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Top performing date */}
        <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-1">
          <CardContent className="flex h-full flex-col justify-between gap-4 p-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Top performing date
              </p>
              <p className="text-[11px] text-slate-500">
                by total engagements
              </p>
            </div>

            {topDate ? (
              <>
                <div>
                  <p className="text-2xl font-semibold text-white">
                    {format(new Date(topDate.date), "MMMM d, yyyy")}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {topDate.count.toLocaleString()} engagements
                  </p>
                </div>
                <p className="text-[11px] text-slate-500">
                  Based on activity across all Links and Kompi Codes™.
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-400">
                No activity during this range yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Device donut */}
        <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-2">
          <CardContent className="flex h-full flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Total engagements by device
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {totalEngagements.toLocaleString()} engagements
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
                        <Cell key={idx} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2 text-sm">
                {deviceChart.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between text-slate-200"
                  >
                    <span>{d.name}</span>
                    <span className="text-slate-400">
                      {d.value.toLocaleString()} · {d.percent.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeseries line chart */}
        <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-2">
          <CardContent className="h-64 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total engagements over time
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeseries}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickMargin={8} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Referrer bar chart */}
        <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
          <CardContent className="h-64 p-4">
            <div className="mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total engagements by referrer
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referrerChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tickMargin={8}
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Country table */}
        <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-3">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Total engagements by location
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-white/5 text-xs uppercase text-slate-400">
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
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="py-2 pr-4 text-slate-500">
                          {idx + 1}
                        </td>
                        <td className="py-2 pr-4 text-slate-100">
                          {c.country}
                        </td>
                        <td className="py-2 pr-4 text-right text-slate-100">
                          {c.count.toLocaleString()}
                        </td>
                        <td className="py-2 pl-4 text-right text-slate-400">
                          {pct.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                  {countries.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-6 text-center text-slate-400"
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
