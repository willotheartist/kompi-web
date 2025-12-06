// src/components/tools/UsernameGenerator.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Vibe = "clean" | "playful" | "edgy";
type Length = "short" | "medium" | "long";

type UsernameGeneratorProps = {
  variant?: "public" | "dashboard";
};

const CLEAN_PREFIXES = [
  "hey",
  "its",
  "real",
  "studio",
  "madeby",
  "weare",
  "hello",
  "go",
  "team",
  "buildwith",
];

const PLAYFUL_PREFIXES = [
  "tiny",
  "super",
  "cosmic",
  "pixel",
  "sunny",
  "minty",
  "lil",
  "soft",
  "lucky",
  "magic",
];

const EDGY_PREFIXES = [
  "void",
  "ghost",
  "hyper",
  "neon",
  "dark",
  "zero",
  "glitch",
  "raw",
  "night",
  "ultra",
];

const CLEAN_ROOTS = [
  "studio",
  "labs",
  "creative",
  "design",
  "digital",
  "collective",
  "media",
  "works",
  "systems",
  "club",
];

const PLAYFUL_ROOTS = [
  "panda",
  "peach",
  "sprout",
  "pixel",
  "cloud",
  "comet",
  "otter",
  "sprinkle",
  "spark",
  "biscuit",
];

const EDGY_ROOTS = [
  "byte",
  "hacker",
  "razor",
  "signal",
  "cipher",
  "matrix",
  "static",
  "shadow",
  "nexus",
  "vandal",
];

const NUM_ENDINGS = ["", "", "", "01", "x", "hq", "lab", "tv", "io", "app"];

const lengthOptions: Length[] = ["short", "medium", "long"];
const vibeOptions: Vibe[] = ["clean", "playful", "edgy"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugifyBase(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .slice(0, 18);
}

function buildUsername(options: {
  base: string;
  vibe: Vibe;
  length: Length;
  useDots: boolean;
  useUnderscores: boolean;
  includeNumbers: boolean;
}) {
  const { base, vibe, length, useDots, useUnderscores, includeNumbers } =
    options;

  const hasBase = base.trim().length > 0;
  const baseSlug = hasBase ? slugifyBase(base) : "";

  const prefixes =
    vibe === "clean"
      ? CLEAN_PREFIXES
      : vibe === "playful"
      ? PLAYFUL_PREFIXES
      : EDGY_PREFIXES;

  const roots =
    vibe === "clean"
      ? CLEAN_ROOTS
      : vibe === "playful"
      ? PLAYFUL_ROOTS
      : EDGY_ROOTS;

  const joinerPool: string[] = [];
  if (useDots) joinerPool.push(".");
  if (useUnderscores) joinerPool.push("_");
  const joiner = joinerPool.length > 0 ? randomFrom(joinerPool) : "";

  // Tune structure depending on desired length
  const prefixChance =
    length === "short" ? 0.15 : length === "medium" ? 0.45 : 0.8;
  const usePrefix = Math.random() < prefixChance;

  const parts: string[] = [];

  if (usePrefix) {
    parts.push(randomFrom(prefixes));
  }

  if (hasBase) {
    parts.push(baseSlug);
  } else {
    parts.push(randomFrom(roots));
  }

  let core = parts.join(joiner || "");

  if (includeNumbers) {
    const ending = randomFrom(NUM_ENDINGS);
    if (ending) {
      core += ending;
    } else if (Math.random() < 0.4) {
      core += String(10 + Math.floor(Math.random() * 89));
    }
  }

  // --- Enforce length feel ---
  const maxShort = 10;
  const maxMedium = 16;
  const maxLong = 26;
  const minLong = 14;

  // For LONG: if it's still short, add extra flavour (root or numbers)
  if (length === "long" && core.length < minLong) {
    if (joiner && Math.random() < 0.7) {
      core += joiner + randomFrom(roots);
    } else if (includeNumbers) {
      core += String(100 + Math.floor(Math.random() * 900));
    } else {
      core += randomFrom(roots);
    }
  }

  // Final clamp per length
  if (length === "short" && core.length > maxShort) {
    core = core.slice(0, maxShort);
  } else if (length === "medium" && core.length > maxMedium) {
    core = core.slice(0, maxMedium);
  } else if (length === "long" && core.length > maxLong) {
    core = core.slice(0, maxLong);
  }

  return core;
}

function generateUsernames(
  count: number,
  opts: Parameters<typeof buildUsername>[0]
) {
  const set = new Set<string>();
  let guard = 0;
  while (set.size < count && guard < count * 10) {
    set.add(buildUsername(opts));
    guard++;
  }
  return Array.from(set);
}

export function UsernameGenerator({ variant = "public" }: UsernameGeneratorProps) {
  const [base, setBase] = useState("");
  const [vibe, setVibe] = useState<Vibe>("edgy");
  const [length, setLength] = useState<Length>("medium");
  const [useDots, setUseDots] = useState(true);
  const [useUnderscores, setUseUnderscores] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hasSuggestions = usernames.length > 0;

  const lengthIndex = lengthOptions.indexOf(length);
  const vibeIndex = vibeOptions.indexOf(vibe);

  function handleGenerate() {
    const next = generateUsernames(12, {
      base,
      vibe,
      length,
      useDots,
      useUnderscores,
      includeNumbers,
    });
    setUsernames(next);
    setCopied(null);
  }

  function handleCopy(name: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(name).catch(() => {
        // ignore
      });
    }
    setCopied(name);
    // reset after a moment, but only if it's still the same name
    setTimeout(() => {
      setCopied((current) => (current === name ? null : current));
    }, 1600);
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

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
        <div className="space-y-8">
          {/* Base word */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[22px] leading-tight font-semibold tracking-[-0.03em]">
                Base word or name (optional)
              </label>
              <input
                type="text"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                placeholder="ex: ghost, panda, jack..."
                className="w-full border-0 border-b border-black/80 bg-transparent px-0 pb-1.5 text-[20px] font-normal tracking-tight outline-none placeholder:text-[rgba(129,140,248,1)] focus-visible:border-[rgba(129,140,248,1)]"
              />
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
                ? "Short · easier to type"
                : length === "medium"
                ? "Medium · balanced"
                : "Long · more unique options"}
            </p>
          </div>

          {/* Vibe slider */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Vibe</p>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={vibeIndex}
              onChange={(e) =>
                setVibe(vibeOptions[Number(e.target.value)] ?? "clean")
              }
              className="block w-full accent-[#8C88FF]"
            />
            <p className="text-sm text-[#111111]">
              {vibe === "clean"
                ? "Clean · simple and professional"
                : vibe === "playful"
                ? "Playful · softer, more fun handles"
                : "Edgy · techy, sharper names"}
            </p>
          </div>

          {/* Characters / toggles */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Characters</p>
            <div className="flex flex-wrap gap-3">
              <TogglePill
                label="Dots"
                active={useDots}
                onClick={() => setUseDots((v) => !v)}
              />
              <TogglePill
                label="Underscores"
                active={useUnderscores}
                onClick={() => setUseUnderscores((v) => !v)}
              />
              <TogglePill
                label="Numbers"
                active={includeNumbers}
                onClick={() => setIncludeNumbers((v) => !v)}
              />
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Click <span className="font-medium">Generate usernames</span> to
              see fresh ideas. Tap any username to copy it.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90"
              onClick={handleGenerate}
            >
              {hasSuggestions ? "Generate more usernames" : "Generate usernames"}
            </Button>
          </div>
        </div>

        {/* RIGHT – suggestions */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium tracking-tight text-[#111111]">
              Suggestions
            </h3>
            {hasSuggestions && (
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#A3A3A3]">
                Tap to copy
              </span>
            )}
          </div>

          {hasSuggestions ? (
            <div className="flex max-h-[420px] flex-col gap-2 overflow-auto pr-1">
              {usernames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleCopy(name)}
                  className="flex items-center justify-between rounded-full border border-[#E4E4DE] bg-[#F7F7F3] px-4 py-2.5 text-sm text-left transition hover:bg-black hover:text-white"
                >
                  <span className="truncate">@{name}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
                    {copied === name ? "COPIED" : "COPY"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#E4E4DE] bg-[#FBFBF8] px-4 py-4 text-xs text-[#8B8B8B]">
              No usernames yet. Add a base word (or leave it blank), adjust the
              sliders, then hit{" "}
              <span className="font-medium">Generate usernames</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TogglePill({
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
        "inline-flex min-w-[120px] items-center justify-center rounded-[24px] px-5 py-3 text-sm font-medium transition",
        active
          ? "bg-[#111111] text-white"
          : "bg-[#F4F4F2] text-[#111111]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default UsernameGenerator;
