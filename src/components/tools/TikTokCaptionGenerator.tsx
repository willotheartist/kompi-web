"use client";

import * as React from "react";
import { useState } from "react";

type Variant = "public" | "dashboard";

const tones = [
  "Chill",
  "High energy",
  "Educational",
  "Aesthetic",
  "Storytime",
  "Promo",
] as const;

const videoTypes = [
  "Tips",
  "Day in the life",
  "Before / after",
  "Mini-rant",
  "Tutorial",
] as const;

const lengthOptions = ["Short", "Medium", "Long"] as const;

type Tone = (typeof tones)[number];
type VideoType = (typeof videoTypes)[number];
type Length = (typeof lengthOptions)[number];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function splitKeywords(raw: string) {
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function buildHashtags(topic: string, keywords: string, platformTag: string) {
  const base = topic
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .slice(0, 24);

  const kws = splitKeywords(keywords).map((k) =>
    k
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "")
      .slice(0, 18)
  );

  const all = [base, ...kws, platformTag].filter(Boolean);
  const unique = Array.from(new Set(all)).slice(0, 6);

  if (!unique.length) return "";

  return (
    "\n\n" +
    unique
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
      .join(" ")
  );
}

function buildCaption(opts: {
  tone: Tone;
  videoType: VideoType;
  length: Length;
  topic: string;
  details: string;
  offer: string;
  customCta: string;
  includeHashtags: boolean;
}) {
  const {
    tone,
    videoType,
    length,
    topic,
    details,
    offer,
    customCta,
    includeHashtags,
  } = opts;

  const cleanTopic = topic.trim() || "this";
  const kwList = splitKeywords(details);
  const mainKw = kwList[0];
  const lowerTopic = cleanTopic.toLowerCase();
  const energyEmoji = ["⚡️", "🔥", "🚀", "💥"];
  const softEmoji = ["✨", "🌙", "🌿", "🫶"];

  const hooksByTone: Record<Tone, string[]> = {
    Chill: [
      `low-key ${lowerTopic} breakdown`,
      `${randomFrom(softEmoji)} soft ${lowerTopic} tips only`,
      `ok let’s talk ${lowerTopic} for a sec`,
      `${lowerTopic} but gentle`,
    ],
    "High energy": [
      `${randomFrom(energyEmoji)} watch this if you care about ${lowerTopic}`,
      `no one is talking about ${lowerTopic} like this`,
      `if ${lowerTopic} is on your 2025 list, stop scrolling`,
      `this ${lowerTopic} tip lives rent free in my head`,
    ],
    Educational: [
      `3 ${lowerTopic} mistakes nobody told you`,
      `if ${lowerTopic} feels confusing, save this`,
      `explaining ${lowerTopic} like you’re on FaceTime`,
      `tiny ${lowerTopic} lesson so you don’t have to Google it`,
    ],
    Aesthetic: [
      `${randomFrom(softEmoji)} cozy ${lowerTopic} moments`,
      `${lowerTopic}, but calm`,
      `pov: your ${lowerTopic} era actually feels soft`,
      `${lowerTopic} in neutral tones & nice light`,
    ],
    Storytime: [
      `pov: you’re in your ${lowerTopic} plot twist`,
      `storytime: how ${lowerTopic} got a little out of hand`,
      `this ${lowerTopic} arc still feels unreal`,
      `ok so the ${lowerTopic} story goes like this`,
    ],
    Promo: [
      `if you care about ${lowerTopic}, this one’s for you`,
      `soft launch of my ${offer || mainKw || "new drop"}`,
      `${randomFrom(energyEmoji)} quick ${lowerTopic} plug for the people in the back`,
      `been working on this ${lowerTopic} thing for a minute`,
    ],
  };

  const bodiesByVideoType: Record<VideoType, string[]> = {
    Tips: [
      `sharing the stuff I wish I had when I started`,
      `${mainKw ? `${mainKw} first, everything else later` : "start tiny, repeat often, let it stack"}`,
      `bookmark this so you don’t have to re-learn it in three months`,
    ],
    "Day in the life": [
      `tiny pieces of my ${lowerTopic} day that actually matter`,
      `nothing crazy, just realistic ${lowerTopic} that fits real life`,
      `this is what ${lowerTopic} looks like when you’re not chasing perfect`,
    ],
    "Before / after": [
      `old me would never have believed this ${lowerTopic} glow-up`,
      `${mainKw ? `from “idk ${mainKw}” to “ok I got it”` : "from chaos to kinda-sorted"}`,
      `screenshots for proof because it still feels fake`,
    ],
    "Mini-rant": [
      `lowkey rant but it&apos;s coming from love`,
      `tired of seeing ${lowerTopic} advice that makes no sense`,
      `this corner of TikTok needed a tiny reality check`,
    ],
    Tutorial: [
      `step by step so your brain can chill`,
      `pause, screenshot, and follow along later`,
      `you can literally copy-paste this into your own setup`,
    ],
  };

  const closersByTone: Record<Tone, string[]> = {
    Chill: [
      `save this for when you&apos;re ready to try`,
      `follow for more slow ${lowerTopic} upgrades`,
      `send this to the friend who loves cozy ${lowerTopic}`,
    ],
    "High energy": [
      `drop a “${mainKw || "ME"}” if this called you out`,
      `follow if you&apos;re actually doing ${lowerTopic} this year`,
      `comment “more” and I&apos;ll keep the ${lowerTopic} series going`,
    ],
    Educational: [
      `comment “notes” if you want part 2`,
      `save so your future self doesn&apos;t have to guess`,
      `share this with someone who&apos;s still overthinking ${lowerTopic}`,
    ],
    Aesthetic: [
      `follow for more soft ${lowerTopic} on your FYP`,
      `saving this sounds like a hug for later`,
      `tiny rituals, big feelings — more soon`,
    ],
    Storytime: [
      `want part two? you know what to comment`,
      `follow if you&apos;re also in your ${lowerTopic} era`,
      `share this with the friend who lives for storytime`,
    ],
    Promo: [
      customCta.trim()
        ? customCta.trim()
        : offer.trim()
        ? `link in bio for the ${offer.trim()}` 
        : `comment “link” and I&apos;ll drop the details`,
      `save this so you remember when you&apos;re ready`,
      `send this to the friend who needs this exact thing`,
    ],
  };

  const targetLines =
    length === "Short" ? 2 : length === "Medium" ? 3 : 4;

  const hook = randomFrom(hooksByTone[tone]);
  const body = randomFrom(bodiesByVideoType[videoType]);
  const closer = randomFrom(closersByTone[tone]);

  const extraLineOptions = [
    mainKw
      ? `yes, we&apos;re talking ${mainKw} without the overwhelm`
      : `no gatekeeping, just what actually helped`,
    offer.trim()
      ? `built this for ${offer.trim()} and people who need it`
      : `for people who are tired of starting over every Monday`,
    `screenshot if you&apos;re watching this at 1am`,
  ];

  const lines: string[] = [hook];

  if (targetLines >= 2) {
    lines.push(body);
  }
  if (targetLines >= 3) {
    lines.push(closer);
  }
  if (targetLines >= 4) {
    lines.splice(2, 0, randomFrom(extraLineOptions)); // insert before closer
  }

  let caption = lines.join("\n\n");

  if (includeHashtags) {
    caption += buildHashtags(cleanTopic, details, "tiktok");
  }

  return caption;
}

function generateCaptions(opts: Parameters<typeof buildCaption>[0] & { count?: number }) {
  const { count = 6, ...rest } = opts;
  const set = new Set<string>();
  let guard = 0;
  while (set.size < count && guard < count * 40) {
    set.add(buildCaption(rest));
    guard++;
  }
  return Array.from(set);
}

export function TikTokCaptionGenerator({ variant = "public" }: { variant?: Variant }) {
  const [tone, setTone] = useState<Tone>("High energy");
  const [videoType, setVideoType] = useState<VideoType>("Tips");
  const [length, setLength] = useState<Length>("Medium");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [offer, setOffer] = useState("");
  const [customCta, setCustomCta] = useState("");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [captions, setCaptions] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hasSuggestions = captions.length > 0;

  function handleGenerate() {
    const next = generateCaptions({
      tone,
      videoType,
      length,
      topic,
      details,
      offer,
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
          {/* Tone */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">Vibe</p>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
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

          {/* Video type + length */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#6B6B6B]">Video type</p>
              <div className="flex flex-wrap gap-2">
                {videoTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setVideoType(type)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs border transition",
                      videoType === type
                        ? "bg-[#020617] text-white border-[#020617]"
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
                        ? "bg-[#FF66C4] text-white border-[#FF66C4]"
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
              What is this video about?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ex: freelance design tips, café life, morning routine"
              className="w-full border-b border-black/80 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              This becomes the main theme Kompi writes around.
            </p>
          </div>

          {/* Details / keywords */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Details or keywords (optional)
            </label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="ex: beginner friendly, no fancy gear, side hustle, cozy edits"
              className="w-full border-b border-black/80 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Separate with commas. We&apos;ll weave them into lines & hashtags.
            </p>
          </div>

          {/* Offer */}
          <div className="space-y-3">
            <label className="text-[20px] font-semibold tracking-tight">
              Anything you&apos;re promoting? (optional)
            </label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="ex: Notion template, online course, in-person class"
              className="w-full border-b border-black/80 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Helps Kompi write softer promo lines when you pick the Promo vibe.
            </p>
          </div>

          {/* CTA + toggles */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-[20px] font-semibold tracking-tight">
                Call to action (optional)
              </label>
              <input
                type="text"
                value={customCta}
                onChange={(e) => setCustomCta(e.target.value)}
                placeholder="ex: Comment CHECKLIST and I'll DM you the template"
                className="w-full border-b border-black/80 bg-transparent py-2 text-[18px] outline-none placeholder:text-[#A3A3A3]"
              />
              <p className="text-xs text-[#8B8B8B]">
                Leave blank and Kompi will suggest CTAs that fit your vibe.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIncludeHashtags((v) => !v)}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border transition",
                  includeHashtags
                    ? "bg-[#FDF2FF] text-[#111111] border-[#FF66C4]"
                    : "bg-[#F4F4F2] text-[#555555] border-[#E1E1DE]",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-3 w-3 items-center justify-center rounded-full border",
                    includeHashtags
                      ? "bg-[#FF66C4] border-[#FF66C4]"
                      : "bg-white border-[#D4D4D4]",
                  ].join(" ")}
                />
                Include simple hashtag block
              </button>
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Click <span className="font-medium">Generate captions</span> to
              see options. Tap any caption to copy it for your post.
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
                  key={`${index}-${c.slice(0, 20)}`}
                  type="button"
                  onClick={() => handleCopy(c)}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-[#111827] bg-[#020617] px-4 py-3 text-left text-sm whitespace-pre-line text-[#E5E7EB] hover:bg-[#00F6C6] hover:text-[#020617] transition"
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
              No captions yet. Choose a vibe, video type, and topic, then hit{" "}
              <span className="font-medium">Generate captions</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TikTokCaptionGenerator;
