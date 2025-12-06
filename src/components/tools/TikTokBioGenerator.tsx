"use client";

import * as React from "react";
import { useState } from "react";

type Variant = "public" | "dashboard";

const tonePresets = [
  "Chill",
  "High energy",
  "Educational",
  "Aesthetic",
  "Storytime",
  "CTA-focused",
] as const;

const hookStyles = [
  "Direct",
  "POV",
  "Question",
  "One-liner",
] as const;

type Tone = (typeof tonePresets)[number];
type HookStyle = (typeof hookStyles)[number];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getKeywordsList(raw: string) {
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function normalizeNiche(raw: string) {
  const trimmed = raw.trim();
  return trimmed || "creator";
}

function buildBio(opts: {
  tone: Tone;
  hookStyle: HookStyle;
  niche: string;
  audience: string;
  keywords: string;
  customCta: string;
}) {
  const { tone, hookStyle, niche, audience, keywords, customCta } = opts;
  const coreNiche = normalizeNiche(niche);
  const targetAudience = audience.trim() || "people like you";
  const kws = getKeywordsList(keywords);
  const mainKw = kws[0];
  const emojiEnergy = ["⚡️", "🔥", "💥", "🚀"];
  const emojiChill = ["🌊", "🌿", "🌙", "☁️"];
  const emojiSoft = ["✨", "💫", "🌸", "🫶"];
  const arrow = ["→", "→", "↓", "↘︎"][Math.floor(Math.random() * 4)];

  // Hook line (first line)
  const hookPools: Record<HookStyle, string[]> = {
    Direct: [
      `${coreNiche} for ${targetAudience}`,
      `${coreNiche}${mainKw ? ` • ${mainKw}` : ""}`,
      `${coreNiche} on your FYP`,
      `Your new fav ${coreNiche} on here`,
    ],
    POV: [
      `POV: you scroll & land in ${coreNiche} TikTok`,
      `POV: you finally find ${coreNiche} that makes sense`,
      `POV: you’re in your ${coreNiche} era`,
      `POV: this side of TikTok is now yours`,
    ],
    Question: [
      `Ever wished ${coreNiche} content felt less cringe?`,
      `Trying to get into ${coreNiche} but don’t know where to start?`,
      `What if ${coreNiche} actually felt fun?`,
      `Ready to stop overthinking ${coreNiche}?`,
    ],
    "One-liner": [
      `${coreNiche}, but main character energy`,
      `${coreNiche} but calmer`,
      `${coreNiche}, chaos & comfort`,
      `${coreNiche} for people who hate fluff`,
    ],
  };

  // Tone-based middle line
  const middlePools: Record<Tone, string[]> = {
    Chill: [
      `${randomFrom(emojiChill)} soft takes, low pressure`,
      `little drops of ${coreNiche} when you need them`,
      `slow growth, real vibes`,
      `no perfect feeds, just real ${coreNiche}`,
    ],
    "High energy": [
      `${randomFrom(emojiEnergy)} high-energy tips & mini rants`,
      `quick hits so you don’t swipe away`,
      `loud about ${coreNiche} so you don’t have to be`,
      `zero chill, full ${coreNiche} mode`,
    ],
    Educational: [
      `${randomFrom(emojiSoft)} tiny breakdowns, no gatekeeping`,
      `turning confusing ${coreNiche} into 15s lessons`,
      `simple frameworks, real examples`,
      `learn ${coreNiche} without leaving your FYP`,
    ],
    Aesthetic: [
      `${randomFrom(emojiSoft)} cozy scenes + ${coreNiche}`,
      `romanticising ${coreNiche} one clip at a time`,
      `soft edits, soft sounds, real ${coreNiche}`,
      `built for people who like calm corners of TikTok`,
    ],
    Storytime: [
      `messy stories from my ${coreNiche} era`,
      `plot twists, lessons & unhinged side quests`,
      `main character arcs but make it ${coreNiche}`,
      `screenshots of texts I probably shouldn’t show you`,
    ],
    "CTA-focused": [
      `stay if ${coreNiche} is on your mind this year`,
      `trying to build a tiny corner of ${coreNiche} TikTok`,
      `helping ${targetAudience} take one small step`,
      `mini challenges & check-ins for ${coreNiche}`,
    ],
  };

  // CTA line
  const ctaLine =
    customCta.trim() ||
    randomFrom([
      `${randomFrom(emojiSoft)} follow for more ${coreNiche} on your FYP`,
      `comment "${mainKw || "more"}" for the next part`,
      `save this profile for when you’re finally ready`,
      `turn on notes so you don’t miss the next drop`,
      `send this to the friend who needs this era`,
    ]);

  const hook = randomFrom(hookPools[hookStyle]);
  const middle = randomFrom(middlePools[tone]);

  const lines = [hook, middle, ctaLine];

  return lines.join("\n");
}

function generateBios(opts: {
  tone: Tone;
  hookStyle: HookStyle;
  niche: string;
  audience: string;
  keywords: string;
  customCta: string;
  count?: number;
}) {
  const { count = 8 } = opts;
  const set = new Set<string>();
  let guard = 0;
  while (set.size < count && guard < count * 30) {
    set.add(buildBio(opts));
    guard++;
  }
  return Array.from(set);
}

export function TikTokBioGenerator({ variant = "public" }: { variant?: Variant }) {
  const [tone, setTone] = useState<Tone>("Chill");
  const [hookStyle, setHookStyle] = useState<HookStyle>("Direct");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [keywords, setKeywords] = useState("");
  const [customCta, setCustomCta] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hasSuggestions = bios.length > 0;

  function handleGenerate() {
    const next = generateBios({
      tone,
      hookStyle,
      niche,
      audience,
      keywords,
      customCta,
    });
    setBios(next);
    setCopied(null);
  }

  function handleCopy(text: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(text);
    setTimeout(() => {
      setCopied((c) => (c === text ? null : c));
    }, 1500);
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-6 sm:p-7 lg:p-8";

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-white",
        "flex flex-col gap-8 sm:gap-9 lg:gap-10",
        wrapperPadding,
      ].join(" ")}
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        {/* LEFT – controls */}
        <div className="space-y-8">
          {/* Tone chips */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Vibe</p>
            <div className="flex flex-wrap gap-2">
              {tonePresets.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={[
                    "rounded-full px-4 py-2 text-sm border transition",
                    tone === t
                      ? "bg-[#00F6C6] text-[#020617] border-[#00F6C6]"
                      : "bg-[#F4F4F2] text-[#1E1E1E] border-[#E1E1DE]",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Hook style */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Hook style</p>
            <div className="flex flex-wrap gap-2">
              {hookStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setHookStyle(style)}
                  className={[
                    "rounded-full px-3 py-1.5 text-xs border transition",
                    hookStyle === style
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-[#F4F4F2] text-[#111111] border-[#E1E1DE]",
                  ].join(" ")}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Niche */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              What corner of TikTok is this?
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="ex: fitness coach, café owner, UI designer"
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              This could be your role, niche, or the main theme of your content.
            </p>
          </div>

          {/* Audience */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Who are you talking to?
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="ex: beginners, busy creatives, small cafés"
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Helps Kompi write bios that feel like they&apos;re for specific people.
            </p>
          </div>

          {/* Keywords */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Keywords or themes (optional)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="ex: routines, online business, cozy recipes"
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Separate with commas. We&apos;ll weave them into your lines where it fits.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Call to action (optional)
            </label>
            <input
              type="text"
              value={customCta}
              onChange={(e) => setCustomCta(e.target.value)}
              placeholder='ex: "Follow for daily cozy routines"'
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Leave blank if you want Kompi to choose a CTA based on your vibe.
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Click <span className="font-medium">Generate bios</span> to see
              options. Tap any bio to copy it to your clipboard.
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90"
            >
              {hasSuggestions ? "Generate more bios" : "Generate bios"}
            </button>
          </div>
        </div>

        {/* RIGHT – suggestions */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium text-[#111111]">
              Suggestions
            </h3>
            {hasSuggestions && (
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#A3A3A3]">
                tap to copy
              </span>
            )}
          </div>

          {hasSuggestions ? (
            <div className="flex max-h-[460px] flex-col gap-2 overflow-auto pr-1">
              {bios.map((b, index) => (
                <button
                  key={`${index}-${b.slice(0, 18)}`}
                  type="button"
                  onClick={() => handleCopy(b)}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-[#E4E4DE] bg-[#050816] px-4 py-3 text-left text-sm whitespace-pre-line text-[#F9FAFB] hover:bg-[#00F6C6] hover:text-[#020617] transition"
                >
                  <span className="flex-1 text-left">{b}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
                    {copied === b ? "Copied" : "Copy"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#E4E4DE] bg-[#FBFBF8] p-4 text-xs text-[#8B8B8B]">
              No bios yet. Pick a vibe and hook style, describe your corner of
              TikTok, then hit{" "}
              <span className="font-medium">Generate bios</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TikTokBioGenerator;
