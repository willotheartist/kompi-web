"use client";

import * as React from "react";
import { useState } from "react";

type Variant = "public" | "dashboard";

const tonePresets = [
  "Educational",
  "Friendly",
  "Playful",
  "Aesthetic",
  "Storytelling",
  "CTA-focused",
] as const;

const postTypes = ["Feed post", "Reel", "Story", "Carousel"] as const;
const lengthOptions = ["Short", "Medium", "Long"] as const;

type Tone = (typeof tonePresets)[number];
type PostType = (typeof postTypes)[number];
type Length = (typeof lengthOptions)[number];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getKeywordsList(raw: string) {
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function buildHashtags(topic: string, rawKeywords: string) {
  const base = topic.trim().toLowerCase().replace(/\s+/g, "");
  const kws = getKeywordsList(rawKeywords).map((k) =>
    k
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "")
  );
  const core = [base, ...kws].filter(Boolean);

  const unique = Array.from(new Set(core));
  const limited = unique.slice(0, 6);

  if (!limited.length) return "";

  return (
    "\n\n" +
    limited
      .map((k) => (k.startsWith("#") ? k : `#${k}`))
      .join(" ")
  );
}

function buildCaption(opts: {
  tone: Tone;
  topic: string;
  keywords: string;
  postType: PostType;
  length: Length;
  customCta: string;
  includeHashtags: boolean;
}) {
  const { tone, topic, keywords, postType, length, customCta, includeHashtags } =
    opts;

  const cleanTopic = topic.trim() || "this";
  const kws = getKeywordsList(keywords);
  const mainKw = kws[0];

  const hooksByTone: Record<Tone, string[]> = {
    Educational: [
      `3 things about ${cleanTopic} nobody told you`,
      `If you're serious about ${cleanTopic}, read this`,
      `Save this before you forget it 👇`,
      `The simplest way to think about ${cleanTopic}`,
    ],
    Friendly: [
      `Okay, let’s talk about ${cleanTopic} for a sec`,
      `If you’re into ${cleanTopic}, you’ll love this`,
      `Little update from my ${cleanTopic} world 🌿`,
      `Here’s what’s been working for me with ${cleanTopic}`,
    ],
    Playful: [
      `POV: you finally start taking ${cleanTopic} seriously`,
      `I blame ${cleanTopic} for this 😅`,
      `Raise your hand if ${cleanTopic} is your personality now 🙋‍♀️`,
      `Low-key obsessed with ${cleanTopic} lately`,
    ],
    Aesthetic: [
      `Soft moments + ${cleanTopic} 🌸`,
      `${cleanTopic}, but make it calm`,
      `Pinned: tiny ${cleanTopic} rituals that feel good`,
      `${cleanTopic} in neutrals & nice light`,
    ],
    Storytelling: [
      `I wasn’t going to share this about ${cleanTopic}…`,
      `Quick story from my ${cleanTopic} era:`,
      `I used to overthink ${cleanTopic} so much`,
      `The moment ${cleanTopic} finally clicked for me`,
    ],
    "CTA-focused": [
      `If ${cleanTopic} is on your list this week, read this`,
      `Ready to level up your ${cleanTopic}?`,
      `Don’t scroll past if ${cleanTopic} has been on your mind`,
      `This is your sign to start with ${cleanTopic}`,
    ],
  };

  const bodyLines: Record<Tone, string[]> = {
    Educational: [
      mainKw
        ? `Start with ${mainKw}, then layer everything else on top.`
        : `Start small, repeat often, and let the results stack.`,
      `Keep this saved so you don’t have to relearn it later.`,
      `Pick one tip and actually try it today.`,
    ],
    Friendly: [
      `Honestly, I’m just figuring it out as I go too.`,
      `If this helps, send it to a friend who’d vibe with it.`,
      `We’re all just trying things until they work.`,
    ],
    Playful: [
      `Screenshot this so you can pretend it was your idea later.`,
      `If you relate, we’re already friends.`,
      `10/10 would recommend trying this at least once.`,
    ],
    Aesthetic: [
      `Little reminder that progress can look soft and slow.`,
      `Not perfect, but it feels like me.`,
      `Saving this here so future me remembers.`,
    ],
    Storytelling: [
      `Somewhere in the middle, I stopped overthinking and started experimenting.`,
      `It wasn’t instant, but it was worth the tiny steps.`,
      `Looking back, this is where everything shifted.`,
    ],
    "CTA-focused": [
      customCta.trim()
        ? customCta.trim()
        : `Comment “${mainKw || "details"}” and I’ll send you more info.`,
      `Save this so you don’t lose it later.`,
      `Share this with someone who needs the nudge.`,
    ],
  };

  const postSuffixByType: Record<PostType, string[]> = {
    "Feed post": [
      `Swipe for more context.`,
      `Save this post so you can come back to it.`,
      `Read this twice, then bookmark it.`,
    ],
    Reel: [
      `Watch it twice if it hits.`,
      `Rewatch this when you need the reminder.`,
      `Send this reel to your future self.`,
    ],
    Story: [
      `Tap through for the full story.`,
      `Reply if you want part two.`,
      `Screenshots are allowed.`,
    ],
    Carousel: [
      `Swipe to the end for the good part.`,
      `Frame one is the hook, last frame is the reminder.`,
      `Don’t skip the last slide.`,
    ],
  };

  const targetLines =
    length === "Short" ? 1 : length === "Medium" ? 2 : 3;

  const hook = randomFrom(hooksByTone[tone]);
  const body = randomFrom(bodyLines[tone]);
  const suffix = randomFrom(postSuffixByType[postType]);

  const lines = [hook];

  if (targetLines >= 2) {
    lines.push(body);
  }
  if (targetLines >= 3) {
    lines.push(suffix);
  }

  let caption = lines.join("\n\n");

  if (includeHashtags) {
    caption += buildHashtags(cleanTopic, keywords);
  }

  return caption;
}

function generateCaptions(opts: {
  tone: Tone;
  topic: string;
  keywords: string;
  postType: PostType;
  length: Length;
  customCta: string;
  includeHashtags: boolean;
  count?: number;
}) {
  const { count = 6 } = opts;
  const set = new Set<string>();
  let guard = 0;
  while (set.size < count && guard < count * 30) {
    set.add(buildCaption(opts));
    guard++;
  }
  return Array.from(set);
}

export function InstagramCaptionGenerator({
  variant = "public",
}: {
  variant?: Variant;
}) {
  const [tone, setTone] = useState<Tone>("Educational");
  const [postType, setPostType] = useState<PostType>("Feed post");
  const [length, setLength] = useState<Length>("Medium");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [customCta, setCustomCta] = useState("");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [captions, setCaptions] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hasSuggestions = captions.length > 0;

  function handleGenerate() {
    const next = generateCaptions({
      tone,
      topic,
      keywords,
      postType,
      length,
      customCta,
      includeHashtags,
      count: 8,
    });
    setCaptions(next);
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
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1.1fr] lg:items-start">
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

          {/* Post type + length */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#6B6B6B]">Post type</p>
              <div className="flex flex-wrap gap-2">
                {postTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPostType(type)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs border transition",
                      postType === type
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-[#F4F4F2] text-[#111111] border-[#E1E1DE]",
                    ].join(" ")}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-[#6B6B6B]">Length</p>
              <div className="flex flex-wrap gap-2">
                {lengthOptions.map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setLength(len)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs border transition",
                      length === len
                        ? "bg-[#FF8AE2] text-white border-[#FF8AE2]"
                        : "bg-[#F4F4F2] text-[#111111] border-[#E1E1DE]",
                    ].join(" ")}
                  >
                    {len}
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
              placeholder="ex: morning routine, design tips, new menu launch"
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              This helps Kompi understand the focus of your caption.
            </p>
          </div>

          {/* Keywords / details */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Keywords or details (optional)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="ex: launch, discount code, morning habits"
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Separate with commas. We&apos;ll weave them into hooks, lines, and hashtags.
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
              placeholder='ex: "Comment MORNING for the checklist"'
              className="w-full border-b border-black/75 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Leave blank if you want Kompi to suggest CTAs for you.
            </p>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => setIncludeHashtags((v) => !v)}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border transition",
                includeHashtags
                  ? "bg-[#FDF2FF] text-[#111111] border-[#FF8AE2]"
                  : "bg-[#F4F4F2] text-[#555555] border-[#E1E1DE]",
              ].join(" ")}
            >
              <span
                className={[
                  "inline-flex h-3 w-3 items-center justify-center rounded-full border",
                  includeHashtags ? "bg-[#FF8AE2] border-[#FF8AE2]" : "bg-white border-[#D4D4D4]",
                ].join(" ")}
              />
              Include hashtag suggestions
            </button>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Click{" "}
              <span className="font-medium">Generate captions</span> to see
              options. Tap any caption to copy it for your post.
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90"
            >
              {hasSuggestions ? "Generate more captions" : "Generate captions"}
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
              {captions.map((c, index) => (
                <button
                  key={`${index}-${c.slice(0, 16)}`}
                  type="button"
                  onClick={() => handleCopy(c)}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-[#E4E4DE] bg-[#F7F7F3] px-4 py-3 text-left text-sm whitespace-pre-line hover:bg-[#FF8AE2] hover:text-white transition"
                >
                  <span className="flex-1">{c}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
                    {copied === c ? "Copied" : "Copy"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#E4E4DE] bg-[#FBFBF8] p-4 text-xs text-[#8B8B8B]">
              No captions yet. Choose a tone, post type, and topic, then hit{" "}
              <span className="font-medium">Generate captions</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstagramCaptionGenerator;
