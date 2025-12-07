// src/components/tools/YoutubeTitleGenerator.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Tone = "curious" | "educational" | "hype";
type Length = "short" | "medium" | "long";

interface YoutubeTitleGeneratorProps {
  variant?: "public" | "dashboard";
}

const lengthOptions: Length[] = ["short", "medium", "long"];

const toneOptions: Tone[] = ["curious", "educational", "hype"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildTitles(opts: {
  topic: string;
  audience: string;
  outcome: string;
  tone: Tone;
  length: Length;
}) {
  const baseTopic = opts.topic.trim() || "your next YouTube video";
  const audience = opts.audience.trim();
  const outcome = opts.outcome.trim();

  const hooksCurious = [
    "Nobody is talking about",
    "The truth about",
    "What no one tells you about",
    "Before you try",
    "You&apos;re doing this wrong:",
  ];

  const hooksEducational = [
    "How to",
    "Beginner&apos;s guide:",
    "Step-by-step:",
    "Everything you need to know about",
    "The simple way to",
  ];

  const hooksHype = [
    "I tried",
    "Watch me",
    "This changed my",
    "Stop scrolling:",
    "You need to see this about",
  ];

  const outcomes = outcome
    ? [
        `to ${outcome}`,
        `that actually ${outcome}`,
        `for people who want to ${outcome}`,
      ]
    : [
        "that actually works",
        "in 10 minutes",
        "without burning out",
        "on a tiny budget",
      ];

  const audiences = audience
    ? [
        `for ${audience}`,
        `${audience} edition`,
        `even if you&apos;re ${audience}`,
      ]
    : ["for beginners", "no experience needed", "even if you&apos;re busy"];

  const shortEndings = ["(it works)", "in 5 minutes", "no fluff", "explained"];

  const titles: string[] = [];

  function addTitle(str: string) {
    titles.push(str.replace(/\s+/g, " ").trim());
  }

  const hookSet =
    opts.tone === "curious"
      ? hooksCurious
      : opts.tone === "educational"
      ? hooksEducational
      : hooksHype;

  // Pattern 1
  if (opts.length === "short") {
    addTitle(
      `${randomFrom(hookSet)} ${baseTopic} ${randomFrom(shortEndings)}`
    );
  } else if (opts.length === "medium") {
    addTitle(
      `${randomFrom(hookSet)} ${baseTopic} ${randomFrom(audiences)}`
    );
  } else {
    addTitle(
      `${randomFrom(hookSet)} ${baseTopic} ${randomFrom(outcomes)} (${randomFrom(
        audiences
      )})`
    );
  }

  // Pattern 2
  if (opts.length === "short") {
    addTitle(`${baseTopic}: ${randomFrom(shortEndings)}`);
  } else if (opts.length === "medium") {
    addTitle(`${baseTopic}: ${randomFrom(outcomes)}`);
  } else {
    addTitle(
      `${baseTopic}: ${randomFrom(outcomes)} ${randomFrom(audiences)}`
    );
  }

  // Pattern 3
  if (opts.length === "short") {
    addTitle(`Don&apos;t make this ${baseTopic} mistake`);
  } else if (opts.length === "medium") {
    addTitle(`I fixed my ${baseTopic} (here&apos;s how)`);
  } else {
    addTitle(
      `From zero to posted: my full ${baseTopic} process ${randomFrom(audiences)}`
    );
  }

  return Array.from(new Set(titles)).slice(0, 9);
}

export function YoutubeTitleGenerator({
  variant = "public",
}: YoutubeTitleGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [outcome, setOutcome] = useState("");
  const [tone, setTone] = useState<Tone>("curious");
  const [length, setLength] = useState<Length>("medium");
  const [titles, setTitles] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const lengthIndex = lengthOptions.indexOf(length);
  const toneIndex = toneOptions.indexOf(tone);

  function handleGenerate() {
    const ideas = buildTitles({
      topic,
      audience,
      outcome,
      tone,
      length,
    });
    setTitles(ideas);
    setCopied(null);
  }

  function handleCopy(title: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(title).catch(() => {
        // ignore
      });
    }
    setCopied(title);
    setTimeout(() => {
      setCopied((current) => (current === title ? null : current));
    }, 1600);
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  const hasTitles = titles.length > 0;

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-white",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        {/* LEFT – controls */}
        <div className="space-y-7">
          <div className="space-y-3">
            <label className="block text-[22px] leading-tight font-semibold tracking-[-0.03em]">
              What&apos;s your video about?
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ex: starting a YouTube channel as a solo creator, simple Notion setup, editing on your phone..."
              className="min-h-[80px] w-full rounded-2xl border border-[#E5E5E0] bg-[#FBFBF8] px-3 py-2.5 text-sm outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#111827]">
                Who is this for?
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="ex: new creators, small business owners..."
                className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
              />
              <p className="text-[11px] text-[#9CA3AF]">
                Optional, but helps tailor the title.
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#111827]">
                What result do you promise?
              </label>
              <input
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="ex: grow faster, stay consistent, save time..."
                className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
              />
              <p className="text-[11px] text-[#9CA3AF]">
                This becomes the benefit or payoff in the title.
              </p>
            </div>
          </div>

          {/* Length slider */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Length</p>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={lengthIndex}
              onChange={(e) =>
                setLength(lengthOptions[Number(e.target.value)] ?? "medium")
              }
              className="block w-full accent-[#8C88FF]"
            />
            <p className="text-sm text-[#111111]">
              {length === "short"
                ? "Short · snappy titles for shorts & fast content"
                : length === "medium"
                ? "Medium · balanced titles for most videos"
                : "Long · more context for tutorials and deep dives"}
            </p>
          </div>

          {/* Tone slider */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Tone</p>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={toneIndex}
              onChange={(e) =>
                setTone(toneOptions[Number(e.target.value)] ?? "curious")
              }
              className="block w-full accent-[#8C88FF]"
            />
            <p className="text-sm text-[#111111]">
              {tone === "curious"
                ? "Curious · hooky, pattern-breaking titles"
                : tone === "educational"
                ? "Educational · clear value-first titles"
                : "Hype · energetic, bold titles"}
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Click{" "}
              <span className="font-medium">Generate titles</span> to see ideas
              based on your topic. Tap any title to copy it.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90"
              onClick={handleGenerate}
            >
              {hasTitles ? "Generate more titles" : "Generate titles"}
            </Button>
          </div>
        </div>

        {/* RIGHT – suggestions */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium tracking-tight text-[#111111]">
              Title ideas
            </h3>
            {hasTitles && (
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#A3A3A3]">
                Tap to copy
              </span>
            )}
          </div>

          {hasTitles ? (
            <div className="flex max-h-[420px] flex-col gap-2 overflow-auto pr-1">
              {titles.map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => handleCopy(title)}
                  className="flex items-center justify-between rounded-2xl border border-[#E4E4DE] bg-[#F7F7F3] px-4 py-2.5 text-sm text-left transition hover:bg-black hover:text-white"
                >
                  <span className="mr-3 line-clamp-2 text-left">{title}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
                    {copied === title ? "COPIED" : "COPY"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#E4E4DE] bg-[#FBFBF8] px-4 py-4 text-xs text-[#8B8B8B]">
              No titles yet. Describe your video, pick a tone and length, then
              hit <span className="font-medium">Generate titles</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YoutubeTitleGenerator;
