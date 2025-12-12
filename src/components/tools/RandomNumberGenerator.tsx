// src/components/tools/RandomNumberGenerator.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Variant = "public" | "dashboard";
type Mode = "integer" | "decimal";

interface RandomNumberGeneratorProps {
  variant?: Variant;
  _variant?: Variant; // backwards compat
}

export function RandomNumberGenerator({
  variant,
  _variant,
}: RandomNumberGeneratorProps) {
  const effectiveVariant: Variant = (variant ?? _variant ?? "public") as Variant;

  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [mode, setMode] = useState<Mode>("integer");
  const [decimalPlaces, setDecimalPlaces] = useState<string>("2");
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function generateRandomNumbers() {
    setError(null);
    setCopiedIndex(null);

    const minValue = Number(min);
    const maxValue = Number(max);
    const countValue = Number(count);
    const decimals = Number(decimalPlaces);

    if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
      setError("Please enter valid numbers for min and max.");
      return;
    }

    if (minValue > maxValue) {
      setError("Minimum value cannot be greater than maximum value.");
      return;
    }

    if (!Number.isFinite(minValue) || !Number.isFinite(maxValue)) {
      setError("Values must be finite numbers.");
      return;
    }

    if (Number.isNaN(countValue) || countValue < 1 || countValue > 50) {
      setError("Please choose between 1 and 50 numbers to generate.");
      return;
    }

    if (mode === "decimal") {
      if (
        Number.isNaN(decimals) ||
        !Number.isInteger(decimals) ||
        decimals < 0 ||
        decimals > 8
      ) {
        setError("Decimal places must be an integer between 0 and 8.");
        return;
      }
    }

    const next: string[] = [];
    for (let i = 0; i < countValue; i++) {
      const rand = Math.random() * (maxValue - minValue) + minValue;

      if (mode === "integer") {
        next.push(String(Math.round(rand)));
      } else {
        next.push(rand.toFixed(decimals));
      }
    }

    setResults(next);
  }

  function handleCopy(value: string, index: number) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex((current) => (current === index ? null : current));
    }, 1400);
  }

  const wrapperPadding = "p-5 sm:p-6 lg:p-7";

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-white",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
      data-variant={effectiveVariant}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        {/* LEFT – controls */}
        <div className="space-y-7">
          {/* Range */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Number range</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#6B6B6B]">
                  Minimum
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="w-full rounded-2xl border border-[#E5E5E0] bg-[#FBFBF8] px-3 py-2 text-sm outline-none focus-visible:border-black"
                  placeholder="e.g. 1"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#6B6B6B]">
                  Maximum
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="w-full rounded-2xl border border-[#E5E5E0] bg-[#FBFBF8] px-3 py-2 text-sm outline-none focus-visible:border-black"
                  placeholder="e.g. 100"
                />
              </div>
            </div>
          </div>

          {/* Count & mode */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">
              How many numbers?
            </p>
            <div className="grid gap-3 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#6B6B6B]">
                  Count
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="w-full rounded-2xl border border-[#E5E5E0] bg-[#FBFBF8] px-3 py-2 text-sm outline-none focus-visible:border-black"
                  min={1}
                  max={50}
                  placeholder="1–50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#6B6B6B]">
                  Mode
                </label>
                <div className="flex gap-2 rounded-2xl bg-[#F4F4F2] p-1">
                  <ModePill
                    label="Whole numbers"
                    active={mode === "integer"}
                    onClick={() => setMode("integer")}
                  />
                  <ModePill
                    label="Decimals"
                    active={mode === "decimal"}
                    onClick={() => setMode("decimal")}
                  />
                </div>
              </div>
            </div>

            {mode === "decimal" && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#6B6B6B]">
                  Decimal places
                </label>
                <input
                  type="number"
                  value={decimalPlaces}
                  onChange={(e) => setDecimalPlaces(e.target.value)}
                  className="w-full max-w-[140px] rounded-2xl border border-[#E5E5E0] bg-[#FBFBF8] px-3 py-2 text-sm outline-none focus-visible:border-black"
                  min={0}
                  max={8}
                  placeholder="0–8"
                />
                <p className="text-[11px] text-[#8B8B8B]">
                  Useful for percentages, test data, or price simulations.
                </p>
              </div>
            )}
          </div>

          {/* Helper text + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Set your range and count, then click{" "}
              <span className="font-medium">Generate numbers</span>. Tap a
              number to copy it.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              onClick={generateRandomNumbers}
            >
              {results.length > 0
                ? "Generate new numbers"
                : "Generate numbers"}
            </Button>
          </div>

          {error && (
            <p className="text-xs font-medium text-[#DC2626]">{error}</p>
          )}
        </div>

        {/* RIGHT – results */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium tracking-tight text-[#111111]">
              Results
            </h3>
            {results.length > 0 && (
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#A3A3A3]">
                Tap to copy
              </span>
            )}
          </div>

          {results.length > 0 ? (
            <div className="flex max-h-[320px] flex-col gap-2 overflow-auto pr-1">
              {results.map((value, index) => (
                <button
                  key={`${value}-${index}`}
                  type="button"
                  onClick={() => handleCopy(value, index)}
                  className="flex items-center justify-between rounded-2xl border border-[#E4E4DE] bg-[#F7F7F3] px-4 py-2.5 text-sm text-left transition hover:bg-black hover:text-white"
                >
                  <span className="truncate">{value}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
                    {copiedIndex === index ? "COPIED" : "COPY"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#E4E4DE] bg-[#FBFBF8] px-4 py-4 text-xs text-[#8B8B8B]">
              No numbers yet. Set a minimum and maximum value, choose how many
              you need, then click{" "}
              <span className="font-medium">Generate numbers</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 rounded-[999px] px-3 py-1.5 text-xs font-medium transition",
        active ? "bg-[#111111] text-white" : "bg-transparent text-[#111111]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default RandomNumberGenerator;
