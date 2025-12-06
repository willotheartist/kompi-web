"use client";

import * as React from "react";
import { useState } from "react";

type Variant = "public" | "dashboard";

const tonePresets = [
  "Professional",
  "Friendly",
  "Playful",
  "Aesthetic",
  "CTA-focused",
  "Short & punchy",
] as const;

type Tone = (typeof tonePresets)[number];

function normalizeNiche(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return "creator";
  return trimmed;
}

function getKeywordsList(raw: string) {
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildBio(tone: Tone, nicheInput: string, keywordsInput: string) {
  const niche = normalizeNiche(nicheInput);
  const kws = getKeywordsList(keywordsInput);
  const mainKw = kws[0];
  const extras =
    kws.length > 1 ? kws.slice(1, 3).join(" • ") : kws[1] ?? undefined;

  const coreLineParts: string[] = [];
  if (mainKw) coreLineParts.push(mainKw);
  if (extras) coreLineParts.push(extras);
  const coreLine = coreLineParts.length ? coreLineParts.join(" • ") : undefined;

  const emojisCommon = ["✨", "💫", "🌿", "📸", "🌸", "🔥", "⭐️", "💛"];
  const arrow = ["→", "→", "→", "↓"][Math.floor(Math.random() * 4)];
  const emoji = randomFrom(emojisCommon);

  const baseTemplates: Record<Tone, string[]> = {
    Professional: [
      `${niche} • tips & frameworks`,
      `Helping you level up in ${niche}`,
      `${emoji} ${niche} ${arrow} clear, simple breakdowns`,
      `${niche} strategies for modern builders`,
      `${niche} playbook • no fluff`,
      `${niche}${mainKw ? ` • ${mainKw}` : ""}`,
    ],
    Friendly: [
      `${emoji} ${niche} & good vibes`,
      `Sharing my ${niche} journey ${emoji}`,
      `Here for the ${niche} people`,
      `${niche} + real life moments`,
      `${emoji} everyday ${niche} inspiration`,
      `${niche} things only`,
    ],
    Playful: [
      `${niche}, chaos, coffee ☕️`,
      `Probably thinking about ${niche} rn`,
      `Certified ${niche} enthusiast ${emoji}`,
      `${emoji} low-key obsessed with ${niche}`,
      `${niche} + memes + DMs open`,
      `${niche} but make it fun`,
    ],
    Aesthetic: [
      `${niche} • curated daily 🌸`,
      `${emoji} soft ${niche} energy`,
      `${niche} visuals & slow moments`,
      `${niche} in neutrals & nice light`,
      `${niche} • moodboards • details`,
      `romanticising ${niche} ${emoji}`,
    ],
    "CTA-focused": [
      `${emoji} ${niche} tips daily ${arrow} follow along`,
      `New ${niche} drops — tap follow`,
      `Join the ${niche} community ${arrow}`,
      `${emoji} start your ${niche} era — stay tuned`,
      `${niche} resources weekly ${arrow} don’t miss out`,
      `Your shortcut to better ${niche} ${arrow}`,
    ],
    "Short & punchy": [
      `${niche}. daily.`,
      `${emoji} ${niche}. here.`,
      `${niche} things.`,
      `${niche} → this way`,
      `${niche}, no filler.`,
      `built on ${niche}.`,
    ],
  };

  const extraLines: Record<Tone, string[]> = {
    Professional: [
      mainKw ? `Focused on ${mainKw}.` : `Here to make it simple.`,
      `Actionable posts, no spam.`,
      `Save + share if it helps.`,
    ],
    Friendly: [
      `DMs open for ${niche} chat.`,
      mainKw ? `Big on ${mainKw} lately.` : `Sharing what I’m learning.`,
      `Here to hype you up.`,
    ],
    Playful: [
      `Posting when the vibe is right.`,
      `${emoji} chaos but make it ${niche}.`,
      `If you relate, you’re in the right place.`,
    ],
    Aesthetic: [
      coreLine ? coreLine : `details > perfection.`,
      `Snapshots from the ${niche} side of life.`,
      `${emoji} save what feels like you.`,
    ],
    "CTA-focused": [
      `Hit follow for more ${niche}.`,
      mainKw ? `Start with ${mainKw} today.` : `Start where you are.`,
      `Turn on notifications if you’re serious.`,
    ],
    "Short & punchy": [
      coreLine ? coreLine : `${emoji} stay a while.`,
      `scroll • save • repeat`,
      `built for people who get it`,
    ],
  };

  const firstLine = randomFrom(baseTemplates[tone]);
  const secondLine = randomFrom(extraLines[tone]);

  // Occasionally add a third, shorter CTA-ish line
  const maybeThird =
    Math.random() < 0.4
      ? randomFrom([
          `collabs: DM`,
          `📍 online`,
          `New here? Start below ${arrow}`,
          `Links in bio`,
        ])
      : null;

  const lines = [firstLine, secondLine, maybeThird].filter(Boolean) as string[];

  return lines.join("\n");
}

function generateBios(tone: Tone, niche: string, keywords: string, count = 6) {
  const set = new Set<string>();
  let guard = 0;
  while (set.size < count && guard < count * 20) {
    set.add(buildBio(tone, niche, keywords));
    guard++;
  }
  return Array.from(set);
}

export function InstagramBioGenerator({
  variant = "public",
}: {
  variant?: Variant;
}) {
  const [tone, setTone] = useState<Tone>("Friendly");
  const [niche, setNiche] = useState("");
  const [keywords, setKeywords] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hasSuggestions = bios.length > 0;

  function handleGenerate() {
    const next = generateBios(tone, niche, keywords, 8);
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
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* LEFT – controls */}
        <div className="space-y-8">
          {/* Tone chips */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Tone</p>
            <div className="flex flex-wrap gap-2">
              {tonePresets.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={[
                    "rounded-full px-4 py-2 text-sm border transition",
                    tone === t
                      ? "bg-[#FF66C4] text-white border-[#FF66C4]"
                      : "bg-[#F4F4F2] text-[#1E1E1E] border-[#E1E1DE]",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Niche */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Your niche
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="ex: fitness coach, designer, café owner"
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              This is the core of your bio — who you are or what you do.
            </p>
          </div>

          {/* Keywords */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Keywords (optional)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="ex: wellness, mindset, online coaching"
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Separate with commas. We&apos;ll sprinkle these into your bios where it
              makes sense.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Click{" "}
              <span className="font-medium">Generate bios</span> to see options.
              Tap any suggestion to copy it.
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
            <div className="flex max-h-[420px] flex-col gap-2 overflow-auto pr-1">
              {bios.map((b, index) => (
                <button
                  key={`${b}-${index}`}
                  type="button"
                  onClick={() => handleCopy(b)}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-[#E4E4DE] bg-[#F7F7F3] px-4 py-3 text-left text-sm whitespace-pre-line hover:bg-[#FF66C4] hover:text-white transition"
                >
                  <span className="flex-1">{b}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
                    {copied === b ? "Copied" : "Copy"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#E4E4DE] bg-[#FBFBF8] p-4 text-xs text-[#8B8B8B]">
              No bios yet. Choose a tone, add your niche and optional keywords,
              then hit <span className="font-medium">Generate bios</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstagramBioGenerator;
