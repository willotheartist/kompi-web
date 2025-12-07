// src/components/tools/HourlyRateCalculator.tsx
"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

interface HourlyRateCalculatorProps {
  variant?: "public" | "dashboard";
}

type Inputs = {
  targetIncome: number; // yearly before tax
  yearlyExpenses: number;
  workingWeeks: number;
  hoursPerWeek: number;
  billablePercentage: number; // 0-100
};

function parseNumber(value: string): number {
  const n = Number(value.replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function computeRate(inputs: Inputs) {
  const {
    targetIncome,
    yearlyExpenses,
    workingWeeks,
    hoursPerWeek,
    billablePercentage,
  } = inputs;

  const totalTarget = targetIncome + yearlyExpenses;
  const totalHours = workingWeeks * hoursPerWeek;
  const effectiveHours = (totalHours * billablePercentage) / 100;

  if (!effectiveHours) {
    return {
      base: 0,
      padded: 0,
      effectiveHours,
    };
  }

  const base = totalTarget / effectiveHours;
  const padded = base * 1.2; // 20% buffer for gaps, risk, and surprise expenses

  return {
    base,
    padded,
    effectiveHours,
  };
}

export function HourlyRateCalculator({
  variant = "public",
}: HourlyRateCalculatorProps) {
  const [targetIncome, setTargetIncome] = useState("45000");
  const [yearlyExpenses, setYearlyExpenses] = useState("5000");
  const [workingWeeks, setWorkingWeeks] = useState("46");
  const [hoursPerWeek, setHoursPerWeek] = useState("30");
  const [billablePercentage, setBillablePercentage] = useState("60");

  const numbers: Inputs = {
    targetIncome: parseNumber(targetIncome),
    yearlyExpenses: parseNumber(yearlyExpenses),
    workingWeeks: parseNumber(workingWeeks) || 1,
    hoursPerWeek: parseNumber(hoursPerWeek) || 1,
    billablePercentage: parseNumber(billablePercentage) || 0,
  };

  const result = useMemo(() => computeRate(numbers), [numbers]);

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  const hasResult = result.padded > 0;

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-white",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        {/* LEFT – inputs */}
        <div className="space-y-7">
          <div className="space-y-3">
            <label className="block text-[22px] leading-tight font-semibold tracking-[-0.03em]">
              What do you need your freelance rate to cover?
            </label>
            <p className="text-sm text-[#6B7280]">
              This calculator helps you reverse–engineer an hourly rate from
              your income goals, expenses, and realistic billable time.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Target yearly income"
              prefix="£"
              value={targetIncome}
              onChange={setTargetIncome}
              helper="What you want to pay yourself before tax."
            />
            <Field
              label="Yearly business expenses"
              prefix="£"
              value={yearlyExpenses}
              onChange={setYearlyExpenses}
              helper="Software, equipment, subscriptions, etc."
            />
            <Field
              label="Working weeks per year"
              value={workingWeeks}
              onChange={setWorkingWeeks}
              helper="After holidays and planned breaks."
            />
            <Field
              label="Hours per week"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              helper="Total hours, not just client work."
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">
              % of time that&apos;s billable
            </p>
            <input
              type="range"
              min={10}
              max={90}
              step={5}
              value={billablePercentage}
              onChange={(e) => setBillablePercentage(e.target.value)}
              className="block w-full accent-[#8C88FF]"
            />
            <p className="text-sm text-[#111111]">
              Around {billablePercentage}% of your time will realistically be
              paid work once you factor in admin, marketing, and breaks.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Adjust the numbers to match your situation. This isn&apos;t
              financial advice—just a clearer starting point.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90"
              onClick={() => {}}
            >
              Recalculate automatically
            </Button>
          </div>
        </div>

        {/* RIGHT – results */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-tight text-[#111111]">
              Suggested minimum hourly rate
            </h3>
            <div className="rounded-3xl bg-[#1E2330] px-5 py-6 text-[#F9FAFB]">
              {hasResult ? (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9CA3AF]">
                    RECOMMENDED FLOOR
                  </p>
                  <p className="text-3xl font-semibold">
                    £{result.padded.toFixed(2)}
                    <span className="text-sm font-normal text-[#D1D5DB]">
                      {" "}
                      / hour
                    </span>
                  </p>
                  <p className="text-xs text-[#E5E7EB]">
                    Your base rate would be around{" "}
                    <span className="font-semibold">
                      £{result.base.toFixed(2)}/hour
                    </span>{" "}
                    before adding a 20% buffer for gaps, risk, and
                    underestimates.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#E5E7EB]">
                  Start filling in your numbers to see a suggested minimum
                  hourly rate that covers income, expenses, and realistic
                  billable time.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 rounded-2xl border border-[#E5E5E0] bg-[#F7F7F3] p-4 text-xs text-[#374151]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
              HOW THIS IS CALCULATED
            </p>
            <p>
              We add your{" "}
              <span className="font-semibold">target income</span> and{" "}
              <span className="font-semibold">yearly expenses</span>, then
              divide by your realistic{" "}
              <span className="font-semibold">billable hours</span> in a year.
              Finally, we add a buffer so you&apos;re not under–charging.
            </p>
            {hasResult && (
              <p className="mt-2 text-[11px] text-[#6B7280]">
                Based on your inputs, that&apos;s around{" "}
                <span className="font-semibold">
                  {result.effectiveHours.toFixed(0)} billable hours/year
                </span>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  helper?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#111827]">
        {props.label}
      </label>
      <div className="flex items-center rounded-xl border border-[#E5E5E0] bg-white px-3 py-2">
        {props.prefix && (
          <span className="mr-1 text-xs text-[#6B7280]">{props.prefix}</span>
        )}
        <input
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="h-5 w-full bg-transparent text-xs outline-none placeholder:text-[#9CA3AF]"
          inputMode="decimal"
        />
      </div>
      {props.helper && (
        <p className="text-[11px] text-[#9CA3AF]">{props.helper}</p>
      )}
    </div>
  );
}

export default HourlyRateCalculator;
