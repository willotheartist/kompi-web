// src/components/pricing/FeatureComparisonGrid.tsx
"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";

type Tier = "free" | "creator" | "suite";

type FeatureRow = {
  label: string;
  helper?: string;
  free: "yes" | "no" | "limited";
  creator: "yes" | "no" | "limited";
  suite: "yes" | "no" | "limited";
};

const rows: FeatureRow[] = [
  {
    label: "Kompi profile & links",
    helper: "Launch a simple, modern hub for all your links.",
    free: "yes",
    creator: "yes",
    suite: "yes",
  },
  {
    label: "Basic analytics",
    helper: "See views and clicks for your links.",
    free: "limited",
    creator: "yes",
    suite: "yes",
  },
  {
    label: "Advanced branding",
    helper: "More layouts, themes and visual customisation.",
    free: "no",
    creator: "yes",
    suite: "yes",
  },
  {
    label: "Custom domains",
    helper: "Use your own domain for links and pages.",
    free: "no",
    creator: "yes",
    suite: "yes",
  },
  {
    label: "Core tools",
    helper: "Password generator, WhatsApp link generator, UTM builder.",
    free: "yes",
    creator: "yes",
    suite: "yes",
  },
  {
    label: "Creator tools",
    helper: "Username, hashtag & Instagram font generators.",
    free: "no",
    creator: "yes",
    suite: "yes",
  },
  {
    label: "Full PDF toolkit",
    helper: "Merge, split, compress, convert and link PDFs.",
    free: "no",
    creator: "no",
    suite: "yes",
  },
  {
    label: "Image toolkit",
    helper: "Compress, resize, convert images and generate favicons.",
    free: "no",
    creator: "no",
    suite: "yes",
  },
  {
    label: "Business tools",
    helper: "Invoice generator, quote generator, brand kit generator.",
    free: "no",
    creator: "no",
    suite: "yes",
  },
  {
    label: "Priority support",
    helper: "Faster responses when you need help.",
    free: "no",
    creator: "yes",
    suite: "yes",
  },
  {
    label: "Early access to new tools",
    helper: "Try new Kompi tools before everyone else.",
    free: "no",
    creator: "no",
    suite: "yes",
  },
];

function Cell({ value, tier }: { value: FeatureRow[Tier]; tier: Tier }) {
  if (value === "yes") {
    return (
      <div className="flex items-center justify-center">
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full border"
          style={{
            borderColor: tier === "suite" ? "#1A1A1A" : "#D1D5DB",
            backgroundColor: tier === "suite" ? "#111827" : "#F9FAFB",
          }}
        >
          <Check
            className="h-3.5 w-3.5"
            style={{
              color: tier === "suite" ? "#F9FAFB" : "#111827",
            }}
          />
        </div>
      </div>
    );
  }

  if (value === "limited") {
    return (
      <div className="text-center text-xs font-medium text-[#6B7280]">
        Limited
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center text-[#D1D5DB]">
      <Minus className="h-4 w-4" />
    </div>
  );
}

export default function FeatureComparisonGrid() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Compare plans
        </h2>
        <p className="text-sm text-[#4B5563] sm:text-base">
          See what you get on Free, Creator, and Kompi Suite.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-[#E5E7EB] bg-white">
        <table className="min-w-full divide-y divide-[#E5E7EB]">
          <thead className="bg-[#F9FAFB]">
            <tr>
              <th className="py-4 pl-5 pr-3 text-left text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Features
              </th>
              <th className="px-3 py-4 text-center text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Free
              </th>
              <th className="px-3 py-4 text-center text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Creator
              </th>
              <th className="px-3 py-4 text-center text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                Kompi Suite
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-4 pl-5 pr-3 text-left align-top">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#111827]">
                      {row.label}
                    </p>
                    {row.helper && (
                      <p className="text-xs text-[#6B7280]">{row.helper}</p>
                    )}
                  </div>
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  <Cell value={row.free} tier="free" />
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  <Cell value={row.creator} tier="creator" />
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  <Cell value={row.suite} tier="suite" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-xs text-[#6B7280]">
        Kompi Suite includes everything in Free and Creator, plus the full tools
        library. As we ship new tools, Suite members get them automatically.
      </p>
    </div>
  );
}
