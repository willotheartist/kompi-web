"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Variant = "public" | "dashboard";

interface ProfitMarginCalculatorProps {
  variant?: Variant;
}

type Scenario = "service" | "product" | "subscription";

function parseNumber(value: string): number {
  const cleaned = value.replace(/,/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function ProfitMarginCalculator({
  variant = "public",
}: ProfitMarginCalculatorProps) {
  const [scenario, setScenario] = useState<Scenario>("service");
  const [currency, setCurrency] = useState<string>("$");
  const [revenue, setRevenue] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [copied, setCopied] = useState<"summary" | null>(null);

  const { profit, marginPct, markupPct } = useMemo(() => {
    const r = parseNumber(revenue);
    const c = parseNumber(cost);
    const profit = r - c;
    const marginPct = r > 0 ? (profit / r) * 100 : 0;
    const markupPct = c > 0 ? (profit / c) * 100 : 0;
    return { profit, marginPct, markupPct };
  }, [revenue, cost]);

  const hasValues = revenue.trim().length > 0 || cost.trim().length > 0;

  const summary = useMemo(() => {
    if (!hasValues) return "";
    const profitLabel = `${currency}${profit.toFixed(2)}`;
    const marginLabel = `${marginPct.toFixed(1)}%`;
    const markupLabel = `${markupPct.toFixed(1)}%`;
    return `Profit: ${profitLabel} · Margin: ${marginLabel} · Markup: ${markupLabel}`;
  }, [hasValues, profit, marginPct, markupPct, currency]);

  function handlePresetChange(next: Scenario) {
    setScenario(next);
    if (next === "service") {
      // no-op: let them fill
    } else if (next === "product") {
      // small hint values
      setRevenue((prev) => (prev ? prev : "120"));
      setCost((prev) => (prev ? prev : "60"));
    } else if (next === "subscription") {
      setRevenue((prev) => (prev ? prev : "1500"));
      setCost((prev) => (prev ? prev : "500"));
    }
  }

  function handleCopySummary() {
    if (!summary) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(summary).catch(() => {});
    }
    setCopied("summary");
    setTimeout(() => {
      setCopied((current) => (current === "summary" ? null : current));
    }, 1500);
  }

  const wrapperPadding =
    variant === "dashboard" ? "p-5 sm:p-6 lg:p-7" : "p-5 sm:p-6 lg:p-8";

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-[#FBFBF8]",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold tracking-[0.26em] text-[#7C7C72] uppercase">
            BUSINESS TOOL
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-[#111111] sm:text-2xl">
            Check your profit margin before you hit publish.
          </h2>
          <p className="max-w-md text-xs text-[#6B6B6B] sm:text-sm">
            Plug in revenue and cost to see your profit, margin, and markup.
            Great for product pricing, retainers, and quick quotes.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 text-xs">
          <div className="flex gap-1 rounded-full bg-[#F0EFE8] p-1 text-[11px]">
            <button
              type="button"
              onClick={() => handlePresetChange("service")}
              className={[
                "rounded-full px-3 py-1 transition",
                scenario === "service"
                  ? "bg-[#111111] text-[#F7F7F3]"
                  : "text-[#555555]",
              ].join(" ")}
            >
              Service
            </button>
            <button
              type="button"
              onClick={() => handlePresetChange("product")}
              className={[
                "rounded-full px-3 py-1 transition",
                scenario === "product"
                  ? "bg-[#111111] text-[#F7F7F3]"
                  : "text-[#555555]",
              ].join(" ")}
            >
              Product
            </button>
            <button
              type="button"
              onClick={() => handlePresetChange("subscription")}
              className={[
                "rounded-full px-3 py-1 transition",
                scenario === "subscription"
                  ? "bg-[#111111] text-[#F7F7F3]"
                  : "text-[#555555]",
              ].join(" ")}
            >
              Subscription
            </button>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] text-[#6B6B6B] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
            Quick check only · Not tax advice
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        {/* LEFT – inputs */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#4B4B45]">
                Revenue
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-[#E3E1DA] bg-white px-3 py-2">
                <input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value.slice(0, 3))}
                  className="w-10 border-none bg-transparent text-sm font-semibold text-[#111111] outline-none"
                />
                <Input
                  type="text"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="ex: 5000"
                  className="h-8 flex-1 border-none bg-transparent px-0 text-sm outline-none focus-visible:ring-0"
                />
              </div>
              <p className="text-[11px] text-[#9A9A90]">
                Total sales for the project, launch, or month.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-[#4B4B45]">
                Cost
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-[#E3E1DA] bg-white px-3 py-2">
                <span className="text-sm text-[#6B6B6B]">
                  {currency || "$"}
                </span>
                <Input
                  type="text"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="ex: 2000"
                  className="h-8 flex-1 border-none bg-transparent px-0 text-sm outline-none focus-visible:ring-0"
                />
              </div>
              <p className="text-[11px] text-[#9A9A90]">
                Direct cost to deliver (tools, team, ads, etc).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-xs text-[11px] text-[#8B8B80]">
              Use this for quick back-of-the-envelope checks before you set
              prices on sales pages, QR menus, and offer PDFs.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full bg-[#111111] px-5 text-xs font-medium text-[#F7F7F3] hover:bg-black"
            >
              {hasValues ? "Update margins" : "Calculate margins"}
            </Button>
          </div>
        </div>

        {/* RIGHT – results */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#DFDDD5] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
              SUMMARY
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-[11px] text-[#78786E]">Profit</p>
                <p className="text-lg font-semibold text-[#111111]">
                  {hasValues ? `${currency}${profit.toFixed(2)}` : "—"}
                </p>
                <p className="text-[11px] text-[#9A9A90]">
                  Revenue – cost
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] text-[#78786E]">Margin</p>
                <p className="text-lg font-semibold text-[#111111]">
                  {hasValues ? `${marginPct.toFixed(1)}%` : "—"}
                </p>
                <p className="text-[11px] text-[#9A9A90]">
                  Profit ÷ revenue
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] text-[#78786E]">Markup</p>
                <p className="text-lg font-semibold text-[#111111]">
                  {hasValues ? `${markupPct.toFixed(1)}%` : "—"}
                </p>
                <p className="text-[11px] text-[#9A9A90]">
                  Profit ÷ cost
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-xs text-[11px] text-[#8B8B80]">
                Great rule of thumb: know your minimum comfortable margin, then
                price slightly above it to leave room for discounts.
              </p>
              <button
                type="button"
                onClick={handleCopySummary}
                className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#7A7A72] hover:text-[#111111]"
              >
                {copied === "summary" ? "COPIED" : "COPY SUMMARY"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-dashed border-[#DFDDD5] bg-[#F7F7F3] px-4 py-3 text-[11px] text-[#8B8B80]">
            This calculator is for quick estimates only and doesn&apos;t replace
            proper accounting or tax advice.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitMarginCalculator;
