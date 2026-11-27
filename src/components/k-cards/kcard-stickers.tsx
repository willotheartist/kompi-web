"use client";

/*
 * Card stickers: original artwork drawn as SVG (viewBox 0 0 120 120).
 * Each sticker is rendered with a white die-cut outline so it reads as a real sticker
 * on any background.
 */

import { useId, type ReactNode } from "react";

export type KCardSticker = {
  id: string;
  /** Key into STICKERS. */
  s: string;
  /** Horizontal offset from the Card's centre line, in px. */
  x: number;
  /** Distance from the top of the Card content, in px. */
  y: number;
  /** Width in px. */
  size: number;
  /** Rotation in degrees. */
  r: number;
};

const BOLD = "var(--font-primary), 'Arial Black', Arial, sans-serif";
const MONO = "ui-monospace, 'Courier New', monospace";

function starPath(cx: number, cy: number, points: number, outer: number, inner: number, rot = -90) {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = ((rot + (i * 180) / points) * Math.PI) / 180;
    d += `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }
  return d + "Z";
}

const BURST = starPath(60, 60, 14, 54, 42);
const STAR5 = starPath(60, 62, 5, 52, 22);
const SPARK = "M60 6C64 40 80 56 114 60C80 64 64 80 60 114C56 80 40 64 6 60C40 56 56 40 60 6Z";
const HEART = "M60 104C24 78 8 60 8 40C8 22 22 10 38 10C48 10 56 16 60 24C64 16 72 10 82 10C98 10 112 22 112 40C112 60 96 78 60 104Z";
const JAGGED = "M14 34L32 30L30 12L48 24L60 8L70 26L90 14L88 34L110 36L96 52L112 66L92 70L98 92L78 84L70 106L58 88L42 104L38 84L16 90L26 72L8 60L26 50Z";

const text = (t: string, opts: { x?: number; y: number; size: number; fill: string; family?: string; weight?: number; spacing?: number; rotate?: number }) => (
  <text
    x={opts.x ?? 60}
    y={opts.y}
    textAnchor="middle"
    fontFamily={opts.family ?? BOLD}
    fontWeight={opts.weight ?? 900}
    fontSize={opts.size}
    letterSpacing={opts.spacing ?? 0}
    fill={opts.fill}
    transform={opts.rotate ? `rotate(${opts.rotate} 60 60)` : undefined}
  >
    {t}
  </text>
);

type StickerDef = { name: string; art: ReactNode };

export const STICKERS: Record<string, StickerDef> = {
  // ---------- Shout ----------
  "new-burst": {
    name: "New",
    art: (
      <>
        <path d={BURST} fill="#ff3d8b" />
        {text("NEW!", { y: 70, size: 30, fill: "#fff", rotate: -10 })}
      </>
    ),
  },
  "hot-tag": {
    name: "Hot",
    art: (
      <g transform="rotate(-12 60 60)">
        <path d="M30 28H96Q104 28 104 36V84Q104 92 96 92H30L12 60Z" fill="#ff6a1f" />
        <circle cx="30" cy="60" r="6" fill="#fff" />
        {text("HOT", { x: 66, y: 72, size: 32, fill: "#fff8e8" })}
      </g>
    ),
  },
  sale: {
    name: "Sale",
    art: (
      <>
        <circle cx="60" cy="60" r="52" fill="#ffd400" />
        <circle cx="60" cy="60" r="43" fill="none" stroke="#151619" strokeWidth="2.5" strokeDasharray="5 5" />
        {text("SALE", { y: 71, size: 30, fill: "#151619", rotate: 8 })}
      </>
    ),
  },
  "hire-me": {
    name: "Hire me",
    art: (
      <>
        <path d="M14 22H106Q112 22 112 28V76Q112 82 106 82H52L30 104L34 82H14Q8 82 8 76V28Q8 22 14 22Z" fill="#3d5afe" />
        {text("HIRE ME", { y: 60, size: 21, fill: "#fff", spacing: 1 })}
      </>
    ),
  },
  "link-in-bio": {
    name: "Link in bio",
    art: (
      <g transform="rotate(-6 60 60)">
        <rect x="4" y="38" width="112" height="44" rx="22" fill="#151619" />
        {text("LINKS ↓", { y: 68, size: 20, fill: "#d4ff3f", spacing: 1.5 })}
      </g>
    ),
  },
  open: {
    name: "Open",
    art: (
      <>
        <rect x="10" y="30" width="100" height="60" rx="12" fill="#1b0b10" />
        <rect x="16" y="36" width="88" height="48" rx="8" fill="none" stroke="#ff4d6d" strokeWidth="3" />
        {text("OPEN", { y: 71, size: 28, fill: "#ff8fa3", spacing: 3 })}
      </>
    ),
  },
  wow: {
    name: "Wow",
    art: (
      <>
        <path d={JAGGED} fill="#ffe14d" />
        {text("WOW!", { y: 70, size: 27, fill: "#e5202e", rotate: -8 })}
      </>
    ),
  },
  "thank-you": {
    name: "Thank you",
    art: (
      <g transform="rotate(-8 60 60)">
        <path d="M4 44H22V80H4L12 62Z" fill="#c2185b" />
        <path d="M116 44H98V80H116L108 62Z" fill="#c2185b" />
        <rect x="16" y="38" width="88" height="40" rx="4" fill="#ff5c93" />
        {text("THANK YOU", { y: 64, size: 15, fill: "#fff", spacing: 1 })}
      </g>
    ),
  },

  // ---------- Doodles ----------
  arrow: {
    name: "Arrow",
    art: (
      <g fill="none" stroke="#151619" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 30C40 10 76 18 72 44C68 64 40 58 48 42C56 26 92 40 98 86" />
        <path d="M84 76L98 90L106 72" />
      </g>
    ),
  },
  sparkle: { name: "Sparkle", art: <path d={SPARK} fill="#ffd84d" /> },
  heart: {
    name: "Heart",
    art: (
      <>
        <path d={HEART} fill="#ff3b5c" />
        <path d="M30 30Q36 22 46 24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      </>
    ),
  },
  smiley: {
    name: "Smiley",
    art: (
      <>
        <circle cx="60" cy="60" r="52" fill="#ffd60a" />
        <ellipse cx="44" cy="48" rx="6" ry="10" fill="#151619" />
        <ellipse cx="76" cy="48" rx="6" ry="10" fill="#151619" />
        <path d="M34 70Q60 96 86 70" fill="none" stroke="#151619" strokeWidth="6" strokeLinecap="round" />
      </>
    ),
  },
  bolt: { name: "Bolt", art: <path d="M70 6L22 68H54L44 114L98 46H64Z" fill="#ffcf24" stroke="#151619" strokeWidth="3" strokeLinejoin="round" /> },
  star: { name: "Star", art: <path d={STAR5} fill="#ff8a1f" stroke="#151619" strokeWidth="3" strokeLinejoin="round" /> },
  daisy: {
    name: "Daisy",
    art: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx="60" cy="28" rx="12" ry="24" fill="#fff" stroke="#e6e1d6" strokeWidth="1.5" transform={`rotate(${i * 36} 60 60)`} />
        ))}
        <circle cx="60" cy="60" r="16" fill="#ffc21a" />
      </>
    ),
  },
  rainbow: {
    name: "Rainbow",
    art: (
      <g fill="none" strokeWidth="10">
        <path d="M12 92A48 48 0 0 1 108 92" stroke="#ff4d4d" />
        <path d="M22 92A38 38 0 0 1 98 92" stroke="#ffb020" />
        <path d="M32 92A28 28 0 0 1 88 92" stroke="#3ecf6b" />
        <path d="M42 92A18 18 0 0 1 78 92" stroke="#3d8bff" />
      </g>
    ),
  },
  sun: {
    name: "Sun",
    art: (
      <>
        <path d={starPath(60, 60, 12, 56, 40)} fill="#ff9f1c" />
        <circle cx="60" cy="60" r="32" fill="#ffd23f" />
      </>
    ),
  },
  cloud: { name: "Cloud", art: <path d="M30 88Q8 88 10 68Q12 50 32 50Q34 28 58 26Q80 26 86 46Q110 44 110 68Q108 88 88 88Z" fill="#e9f4ff" stroke="#9cc9f5" strokeWidth="3" /> },

  // ---------- Retro ----------
  floppy: {
    name: "Floppy",
    art: (
      <>
        <path d="M14 10H96L110 24V106Q110 110 106 110H14Q10 110 10 106V14Q10 10 14 10Z" fill="#2b59c3" />
        <rect x="32" y="10" width="50" height="34" fill="#c9d1d9" />
        <rect x="66" y="16" width="10" height="22" fill="#2b59c3" />
        <rect x="24" y="62" width="72" height="48" fill="#f5f5f0" />
        <path d="M32 76H88M32 88H76" stroke="#9aa3ad" strokeWidth="3" />
      </>
    ),
  },
  cassette: {
    name: "Cassette",
    art: (
      <>
        <rect x="6" y="24" width="108" height="72" rx="8" fill="#ff6b9a" />
        <rect x="18" y="34" width="84" height="34" rx="4" fill="#fff4d6" />
        <circle cx="40" cy="51" r="9" fill="#151619" />
        <circle cx="80" cy="51" r="9" fill="#151619" />
        <rect x="49" y="47" width="22" height="8" fill="#151619" />
        <path d="M30 96L36 80H84L90 96" fill="#e0457a" />
      </>
    ),
  },
  cursor: {
    name: "Cursor",
    art: <path d="M30 8V98L52 78L66 110L80 104L66 72H96Z" fill="#fff" stroke="#151619" strokeWidth="6" strokeLinejoin="round" />,
  },
  "pixel-heart": {
    name: "Pixel heart",
    art: (
      <path
        d="M20 30H50V40H70V30H100V40H110V70H100V80H90V90H80V100H70V110H50V100H40V90H30V80H20V70H10V40H20Z"
        fill="#ff2a6d"
        stroke="#151619"
        strokeWidth="4"
      />
    ),
  },
  play: {
    name: "Play",
    art: (
      <>
        <rect x="6" y="34" width="108" height="52" fill="#0b0b2a" />
        {text("PLAY ▶", { y: 70, size: 24, fill: "#fff", family: MONO, weight: 700 })}
      </>
    ),
  },
  "one-up": {
    name: "1UP",
    art: (
      <>
        <rect x="14" y="30" width="92" height="60" fill="#35d07f" stroke="#151619" strokeWidth="5" />
        {text("1UP", { y: 73, size: 30, fill: "#151619", family: MONO, weight: 700 })}
      </>
    ),
  },
  disc: {
    name: "CD",
    art: (
      <>
        <defs>
          <linearGradient id="kc-cd" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c9f2ff" />
            <stop offset=".3" stopColor="#f6c8ff" />
            <stop offset=".6" stopColor="#fff3b0" />
            <stop offset="1" stopColor="#b8ffd9" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="url(#kc-cd)" stroke="#a8b3c2" strokeWidth="2" />
        <circle cx="60" cy="60" r="16" fill="#fff" stroke="#a8b3c2" strokeWidth="2" />
        <circle cx="60" cy="60" r="6" fill="#d7dde5" />
      </>
    ),
  },
  y2k: {
    name: "Y2K",
    art: (
      <>
        <path d={starPath(60, 60, 4, 56, 18, -90)} fill="#c7d3e6" />
        {text("Y2K", { y: 72, size: 34, fill: "#3b4a6b" })}
      </>
    ),
  },
};

export type StickerPack = { id: string; name: string; description: string; stickers: string[] };

export const STICKER_PACKS: StickerPack[] = [
  { id: "shout", name: "Shout", description: "Get people to click: launches, offers and calls to action.", stickers: ["new-burst", "hot-tag", "sale", "hire-me", "link-in-bio", "open", "wow", "thank-you"] },
  { id: "doodles", name: "Doodles", description: "Hand-drawn bits to make your Card feel like you.", stickers: ["arrow", "sparkle", "heart", "smiley", "bolt", "star", "daisy", "rainbow", "sun", "cloud"] },
  { id: "retro", name: "Retro", description: "Floppies, cassettes and pixels. Pairs well with the Pro skins.", stickers: ["floppy", "cassette", "cursor", "pixel-heart", "play", "one-up", "disc", "y2k"] },
];

/** A sticker drawn with a white die-cut edge. */
export function StickerArt({ s, className }: { s: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const def = STICKERS[s];
  if (!def) return null;
  return (
    <svg viewBox="-8 -8 136 136" className={className} aria-label={def.name} role="img" overflow="visible">
      <defs>
        <filter id={`kcs-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="grow" />
          <feFlood floodColor="#ffffff" />
          <feComposite in2="grow" operator="in" result="edge" />
          <feMerge>
            <feMergeNode in="edge" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#kcs-${id})`}>{def.art}</g>
    </svg>
  );
}
