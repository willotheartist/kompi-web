"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type EventLite = { createdAt: string };

export function LinkAnalyticsChart({ events }: { events: EventLite[] }) {
  if (!events.length) {
    return (
      <div className="text-xs text-neutral-500">
        No clicks yet.
      </div>
    );
  }

  const counts = new Map<string, number>();
  for (const e of events) {
    const d = new Date(e.createdAt);
    if (isNaN(d.getTime())) continue;
    const key = d.toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const data = Array.from(counts.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, count]) => ({ date, count }));

  if (!data.length) {
    return (
      <div className="text-xs text-neutral-500">
        No clicks yet.
      </div>
    );
  }

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={24}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 999,
              padding: "6px 10px",
              border: "1px solid #E5E7EB",
              fontSize: 11,
            }}
            labelFormatter={(v) => v}
            formatter={(v) => [`${v} clicks`, ""]}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#111827"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
