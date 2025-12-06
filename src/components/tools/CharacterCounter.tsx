// src/components/tools/CharacterCounter.tsx
"use client";

import * as React from "react";
import { useState } from "react";

type Variant = "public" | "dashboard";

interface CharacterCounterProps {
  variant?: Variant;
}

function getStats(value: string) {
  const chars = value.length;
  const charsNoSpaces = value.replace(/\s+/g, "").length;
  const words = value.trim()
    ? value.trim().split(/\s+/).length
    : 0;
  const lines = value === "" ? 0 : value.split(/\r\n|\r|\n/).length;

  return { chars, charsNoSpaces, words, lines };
}

export function CharacterCounter({ variant = "public" }: CharacterCounterProps) {
  const [text, setText] = useState("");
  const stats = getStats(text);

  const wrapperPadding = "p-5 sm:p-6 lg:p-7";

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-white",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:items-start">
        {/* LEFT – input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[18px] leading-tight font-semibold tracking-[-0.03em]">
              Paste or type your text
            </label>
            <p className="text-xs text-[#8B8B8B]">
              Perfect for social posts, ad copy, meta descriptions, and product
              snippets where every character counts.
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={variant === "dashboard" ? 6 : 8}
            placeholder="Paste your text here to see live character, word, and line counts…"
            className="min-h-[180px] w-full rounded-3xl border border-[#E5E5E0] bg-[#FBFBF8] px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-[#A3A3A3] focus-visible:border-black"
          />

          <p className="text-[11px] text-[#8B8B8B]">
            Counts update as you type. No tracking, no storage—everything runs
            in your browser.
          </p>
        </div>

        {/* RIGHT – stats */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium tracking-tight text-[#111111]">
            Live counts
          </h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              label="Characters"
              value={stats.chars}
              helper="Includes spaces"
            />
            <StatCard
              label="Characters (no spaces)"
              value={stats.charsNoSpaces}
              helper="Great for SEO & code"
            />
            <StatCard
              label="Words"
              value={stats.words}
              helper="Rough reading length"
            />
            <StatCard
              label="Lines"
              value={stats.lines}
              helper="Useful for scripts & docs"
            />
          </div>

          {/* Social / SEO reference */}
          <div className="space-y-2 rounded-3xl border border-[#E4E4DE] bg-[#F7F7F3] px-4 py-4 text-xs text-[#4B5563]">
            <p className="font-medium text-[#111111]">
              Quick reference for common limits
            </p>
            <ul className="space-y-1.5">
              <li>• Meta description: ~150–160 characters</li>
              <li>• Short social post: ~140–280 characters</li>
              <li>• Snappy product blurb: ~80–120 characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard(props: {
  label: string;
  value: number;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5E5E0] bg-[#FFFFFF] px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#9CA3AF]">
        {props.label}
      </p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-[#111827]">
        {props.value}
      </p>
      {props.helper && (
        <p className="mt-1 text-[11px] text-[#6B7280]">{props.helper}</p>
      )}
    </div>
  );
}

export default CharacterCounter;
