"use client";

import * as React from "react";
import { useState } from "react";

type Variant = "public" | "dashboard";

const platforms = ["Instagram", "TikTok", "YouTube", "Generic"] as const;
const goals = [
  "Balanced reach",
  "Niche community",
  "Viral reach",
  "Saves & shares",
] as const;
const contentTypes = [
  "Photo post",
  "Carousel",
  "Reel / short",
  "Story",
  "Live / event",
] as const;
const hashtagCounts = [12, 18, 24] as const;

type Platform = (typeof platforms)[number];
type Goal = (typeof goals)[number];
type ContentType = (typeof contentTypes)[number];

interface HashtagSet {
  id: string;
  label: string;
  description: string;
  tags: string[];
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function toSlugWords(phrase: string): string[] {
  return phrase
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.slice(0, 18));
}

function buildTopicTags(topic: string): string[] {
  if (!topic.trim()) return [];
  const words = toSlugWords(topic);
  if (!words.length) return [];
  const joined = words.join("");
  const first = words[0];
  const tags = new Set<string>();

  tags.add(`#${joined}`);
  if (words.length > 1) {
    tags.add(`#${first}${words[1]}`);
  }
  if (words.length === 1 && first.length > 4) {
    tags.add(`#${first}tips`);
  }

  return Array.from(tags);
}

function buildKeywordTags(keywords: string): string[] {
  const raw = keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const result: string[] = [];
  for (const word of raw) {
    const parts = toSlugWords(word);
    if (!parts.length) continue;
    result.push(`#${parts.join("")}`);
  }
  return Array.from(new Set(result));
}

function platformBaseTags(platform: Platform): string[] {
  switch (platform) {
    case "Instagram":
      return [
        "#instagram",
        "#instagood",
        "#reels",
        "#reelitfeelit",
        "#reelsinstagram",
        "#contentcreator",
        "#smallcreators",
      ];
    case "TikTok":
      return [
        "#tiktok",
        "#fyp",
        "#foryou",
        "#tiktoktaughtme",
        "#tiktokmadebuyit",
        "#tiktokcreator",
        "#smallcreator",
      ];
    case "YouTube":
      return [
        "#youtube",
        "#youtubeshorts",
        "#shorts",
        "#ytcreator",
        "#creators",
        "#contentcreators",
      ];
    case "Generic":
    default:
      return [
        "#content",
        "#onlinebusiness",
        "#creator",
        "#creatoreconomy",
        "#personalbrand",
      ];
  }
}

function goalFlavorTags(goal: Goal): string[] {
  switch (goal) {
    case "Balanced reach":
      return [
        "#discoverweekly",
        "#onmyfeed",
        "#forcreators",
        "#slowgrowth",
        "#stayconsistent",
      ];
    case "Niche community":
      return [
        "#smallbutmighty",
        "#corneroftheinternet",
        "#veryniche",
        "#communityfirst",
        "#madeforthisgroup",
      ];
    case "Viral reach":
      return [
        "#viral",
        "#trending",
        "#algorithm",
        "#hook",
        "#mustwatch",
      ];
    case "Saves & shares":
      return [
        "#saveforthislater",
        "#sendtoafriend",
        "#bookmarkthis",
        "#keepthishandy",
        "#shareworthy",
      ];
    default:
      return [];
  }
}

function contentTypeTags(contentType: ContentType): string[] {
  switch (contentType) {
    case "Photo post":
      return ["#photo", "#feedpost", "#aesthetic"];
    case "Carousel":
      return ["#carousel", "#swipe", "#swipeforideas"];
    case "Reel / short":
      return ["#reelsvideo", "#shortformvideo", "#shortsfeed"];
    case "Story":
      return ["#storytime", "#dailyupdate"];
    case "Live / event":
      return ["#liveevent", "#livestream", "#behindthescenes"];
    default:
      return [];
  }
}

function brandTags(brand: string): string[] {
  if (!brand.trim()) return [];
  const cleaned = brand.replace(/^@/, "").trim();
  if (!cleaned) return [];
  const slug = toSlugWords(cleaned).join("");
  if (!slug) return [];
  return [`#${slug}`, `#team${slug}`];
}

function trimAndShuffle(tags: string[], max: number): string[] {
  const unique = Array.from(new Set(tags));
  // Fisher–Yates
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unique[i], unique[j]] = [unique[j], unique[i]];
  }
  return unique.slice(0, max);
}

function generateHashtagSets(opts: {
  platform: Platform;
  goal: Goal;
  contentType: ContentType;
  topic: string;
  keywords: string;
  brand: string;
  count: (typeof hashtagCounts)[number];
}): HashtagSet[] {
  const { platform, goal, contentType, topic, keywords, brand, count } = opts;

  const topicTags = buildTopicTags(topic);
  const keywordTags = buildKeywordTags(keywords);
  const platformTags = platformBaseTags(platform);
  const goalTags = goalFlavorTags(goal);
  const typeTags = contentTypeTags(contentType);
  const branded = brandTags(brand);

  const baseCore = [...topicTags, ...keywordTags];

  // Three styles: Balanced, Niche-heavy, Reach-heavy
  const sets: HashtagSet[] = [];

  // 1. Balanced mix
  sets.push({
    id: "balanced",
    label: "Balanced mix",
    description: "Blend of niche, context, and platform tags.",
    tags: trimAndShuffle(
      [
        ...baseCore,
        ...platformTags.slice(0, 3),
        ...goalTags.slice(0, 2),
        ...typeTags.slice(0, 2),
        ...branded.slice(0, 2),
      ],
      count
    ),
  });

  // 2. Niche-first
  sets.push({
    id: "niche",
    label: "Niche community",
    description: "Heavier on specific, community-style tags.",
    tags: trimAndShuffle(
      [
        ...baseCore,
        ...keywordTags,
        ...goalFlavorTags("Niche community"),
        ...typeTags,
        ...branded,
      ],
      count
    ),
  });

  // 3. Reach-first
  sets.push({
    id: "reach",
    label: "Reach & discovery",
    description: "More broad and discovery-focused tags.",
    tags: trimAndShuffle(
      [
        ...baseCore.slice(0, Math.ceil(count / 3)),
        ...platformTags,
        ...goalFlavorTags("Viral reach"),
        ...typeTags.slice(0, 2),
        ...branded.slice(0, 1),
      ],
      count
    ),
  });

  return sets;
}

export function HashtagGenerator({ variant = "public" }: { variant?: Variant }) {
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [goal, setGoal] = useState<Goal>("Balanced reach");
  const [contentType, setContentType] = useState<ContentType>("Reel / short");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState<(typeof hashtagCounts)[number]>(18);
  const [sets, setSets] = useState<HashtagSet[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const hasSuggestions = sets.length > 0;

  function handleGenerate() {
    const next = generateHashtagSets({
      platform,
      goal,
      contentType,
      topic,
      keywords,
      brand,
      count,
    });
    setSets(next);
    setCopiedId(null);
  }

  function handleCopy(setId: string, tags: string[]) {
    const text = tags.join(" ");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedId(setId);
    setTimeout(() => {
      setCopiedId((current) => (current === setId ? null : current));
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
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1.05fr] lg:items-start">
        {/* LEFT – controls */}
        <div className="space-y-8">
          {/* Platform */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">
              Platform
            </p>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={[
                    "rounded-full px-4 py-2 text-sm border transition",
                    platform === p
                      ? "bg-[#E8F739] text-[#1E2330] border-[#1E2330]"
                      : "bg-[#F4F4F2] text-[#1E2330] border-[#E1E1DE]",
                  ].join(" ")}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Goal & content type */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#6B6B6B]">
                What&apos;s the goal?
              </p>
              <div className="flex flex-wrap gap-2">
                {goals.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs border transition text-left",
                      goal === g
                        ? "bg-[#1E2330] text-white border-[#1E2330]"
                        : "bg-[#F4F4F2] text-[#111111] border-[#E1E1DE]",
                    ].join(" ")}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-[#6B6B6B]">
                Content type
              </p>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setContentType(c)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs border transition text-left",
                      contentType === c
                        ? "bg-[#F4C6FF] text-[#1E2330] border-[#1E2330]"
                        : "bg-[#F4F4F2] text-[#111111] border-[#E1E1DE]",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Topic */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              What is this post about?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ex: small café marketing, cozy desk setup, beginner workouts"
              className="w-full border-b border-black/80 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              This becomes the core of your hashtag sets.
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
              placeholder="ex: morning routine, content ideas, minimal setup"
              className="w-full border-b border-black/80 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Separate with commas. We&apos;ll turn them into extra niche tags.
            </p>
          </div>

          {/* Brand / handle */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Brand or handle (optional)
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="ex: @kompi, @studiohandle"
              className="w-full border-b border-black/80 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              We&apos;ll generate a couple of light branded tags if you add this.
            </p>
          </div>

          {/* Count & CTA row */}
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#6B6B6B]">
                How many hashtags?
              </p>
              <div className="flex flex-wrap gap-2">
                {hashtagCounts.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCount(c)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs border transition",
                      count === c
                        ? "bg-[#E8F739] text-[#1E2330] border-[#1E2330]"
                        : "bg-[#F4F4F2] text-[#111111] border-[#E1E1DE]",
                    ].join(" ")}
                  >
                    ~{c} tags
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <p className="max-w-xs text-xs text-[#8B8B8B]">
                Click <span className="font-medium">Generate hashtag sets</span>{" "}
                to see options. Tap any set to copy the full line.
              </p>
              <button
                type="button"
                onClick={handleGenerate}
                className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90"
              >
                {hasSuggestions ? "Generate more sets" : "Generate hashtag sets"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT – suggestions */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium text-[#111111]">
              Suggested hashtag groups
            </h3>
            {hasSuggestions && (
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#A3A3A3]">
                tap to copy
              </span>
            )}
          </div>

          {hasSuggestions ? (
            <div className="flex max-h-[460px] flex-col gap-3 overflow-auto pr-1">
              {sets.map((set, index) => (
                <button
                  key={`${set.id}-${index}`}
                  type="button"
                  onClick={() => handleCopy(set.id, set.tags)}
                  className="flex flex-col items-start gap-2 rounded-3xl border border-[#E4E4DE] bg-[#F7F7F3] px-4 py-4 text-left text-sm transition hover:bg-[#1E2330] hover:text-white"
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.14em] uppercase">
                        {set.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#6B7280] group-hover:text-[#E5E7EB]">
                        {set.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
                      {copiedId === set.id ? "Copied" : "Copy group"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {set.tags.map((tag, tagIndex) => (
                      <span
                        key={`${set.id}-${tagIndex}-${tag.slice(1, 10)}`}
                        className="rounded-full bg-white/80 px-2 py-1 text-[11px] text-[#111827] group-hover:bg-[#111827] group-hover:text-[#F9FAFB]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#E4E4DE] bg-[#FBFBF8] p-4 text-xs text-[#8B8B8B]">
              No hashtags yet. Choose a platform and goal, describe your post,
              then hit <span className="font-medium">Generate hashtag sets</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HashtagGenerator;
