"use client";

/*
 * Pro Card skins. A skin is more than a colour palette: it adds a backdrop, an optional
 * frame around the profile, its own button chrome and small period details
 * (a Win95 taskbar, a VHS on-screen display, an arcade score line…).
 * Colours and fonts still come from the theme, so people can tweak them afterwards.
 */

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { KCardSkin } from "./kcard-theme-presets";
import { cn } from "@/lib/utils";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const SUN_MASK = "linear-gradient(180deg,#000 0 52%,transparent 52% 56%,#000 56% 64%,transparent 64% 69%,#000 69% 77%,transparent 77% 83%,#000 83% 89%,transparent 89% 96%,#000 96%)";

const SCANLINES = "repeating-linear-gradient(0deg, rgba(0,0,0,.28) 0px, rgba(0,0,0,.28) 1px, transparent 1px, transparent 3px)";

/* ---------------- Backdrops ---------------- */

export function SkinBackdrop({ skin, compact }: { skin?: KCardSkin; compact?: boolean }) {
  if (!skin) return null;
  switch (skin) {
    case "terminal":
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(51,255,102,.10) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,.55) 100%)" }} />
          <div className="absolute inset-0 opacity-70" style={{ backgroundImage: SCANLINES }} />
          <div className="kc-flicker absolute inset-0 bg-[#33ff66] opacity-[0.025]" />
        </div>
      );
    case "vhs":
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.16] mix-blend-screen" style={{ backgroundImage: NOISE }} />
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: SCANLINES }} />
          <div className="kc-tracking absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/[0.09] to-transparent" />
        </div>
      );
    case "arcade":
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20px 30px, #fff 50%, transparent 51%), radial-gradient(1px 1px at 90px 120px, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 160px 60px, #f9f871 50%, transparent 51%), radial-gradient(1px 1px at 230px 180px, #fff 50%, transparent 51%), radial-gradient(1px 1px at 60px 220px, #05d9e8 50%, transparent 51%)",
              backgroundSize: "260px 260px",
            }}
          />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: SCANLINES }} />
        </div>
      );
    case "vaporwave":
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Sun, sitting on the horizon */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              bottom: "calc(38% - 6px)",
              width: compact ? 70 : 250,
              height: compact ? 70 : 250,
              background: "linear-gradient(180deg,#ffe86b 0%,#ff9a3c 45%,#ff2a9d 100%)",
              WebkitMaskImage: SUN_MASK,
              maskImage: SUN_MASK,
              opacity: 0.9,
            }}
          />
          {/* Grid floor */}
          <div className="absolute inset-x-0 bottom-0 h-[38%] overflow-hidden [perspective:220px]">
            <div
              className="kc-grid absolute inset-x-[-50%] bottom-[-40%] h-[180%] origin-bottom"
              style={{
                transform: "rotateX(62deg)",
                backgroundImage: "linear-gradient(#ff71ce 1.5px, transparent 1.5px), linear-gradient(90deg, #ff71ce 1.5px, transparent 1.5px)",
                backgroundSize: "36px 36px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2b0b4a] via-transparent to-transparent" />
          </div>
        </div>
      );
    case "win95":
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Win95Taskbar compact={compact} />
        </div>
      );
    case "macos":
      return <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.045) 0 1px, transparent 1px 2px)" }} />;
    case "y2k":
      return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-white">
          {[
            [8, 14, 22],
            [82, 9, 14],
            [70, 30, 18],
            [12, 58, 12],
            [88, 64, 24],
            [20, 86, 16],
          ].map(([l, t, s], i) => (
            <span key={i} className="kc-twinkle absolute" style={{ left: `${l}%`, top: `${t}%`, fontSize: s, animationDelay: `${i * 0.7}s` }}>
              ✦
            </span>
          ))}
        </div>
      );
    case "geocities":
      return (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 10px 10px, #fff 50%, transparent 51%), radial-gradient(1px 1px at 40px 60px, #ffff00 50%, transparent 51%), radial-gradient(1px 1px at 70px 25px, #fff 50%, transparent 51%)",
            backgroundSize: "80px 80px",
          }}
        />
      );
    case "roboto":
      return (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex h-1.5">
          <span className="flex-1 bg-[#4285F4]" />
          <span className="flex-1 bg-[#EA4335]" />
          <span className="flex-1 bg-[#FBBC05]" />
          <span className="flex-1 bg-[#34A853]" />
        </div>
      );
    default:
      return null;
  }
}

function VhsOsd({ compact }: { compact?: boolean }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const t = `${Math.floor(secs / 3600)}:${String(Math.floor(secs / 60) % 60).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  return (
    <div className={cn("mb-6 flex w-full items-center justify-between text-white", compact ? "text-[13px]" : "text-[22px]")} style={{ textShadow: "2px 0 #ff2a6d, -2px 0 #05d9e8" }}>
      <span>PLAY ▶</span>
      <span className="tabular-nums">SP {t}</span>
    </div>
  );
}

/* ---------------- Header frames ---------------- */

export function SkinHeader({ skin, title, children, compact }: { skin?: KCardSkin; title: string; children: ReactNode; compact?: boolean }) {
  const file = (title || "me").replace(/^@/, "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 14) || "me";
  if (skin === "win95") {
    return (
      <div className="mx-auto w-full max-w-[340px] bg-[#c0c0c0] p-[3px] text-black" style={{ boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff" }}>
        <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-1.5 py-[3px] text-white">
          <span className={cn("truncate font-bold", compact ? "text-[9px]" : "text-[12px]")}>{file}.exe</span>
          <span className="flex gap-[2px]">
            {["_", "□", "×"].map((g) => (
              <span key={g} className="grid h-[14px] w-[16px] place-items-center bg-[#c0c0c0] text-[10px] leading-none text-black" style={{ boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #fff" }}>
                {g}
              </span>
            ))}
          </span>
        </div>
        <div className="px-3 py-5">{children}</div>
      </div>
    );
  }
  if (skin === "macos") {
    return (
      <div className="mx-auto w-full max-w-[340px] border border-black bg-white text-black" style={{ boxShadow: "3px 3px 0 #000" }}>
        <div className="relative flex h-5 items-center justify-center border-b border-black">
          <span className="absolute inset-x-1 inset-y-[4px]" style={{ backgroundImage: "repeating-linear-gradient(180deg,#000 0 1px,transparent 1px 2px)" }} />
          <span className="absolute left-2 top-1/2 size-[11px] -translate-y-1/2 border border-black bg-white" />
          <span className={cn("relative bg-white px-2 font-bold", compact ? "text-[9px]" : "text-[12px]")}>{file}</span>
        </div>
        <div className="px-3 py-5">{children}</div>
      </div>
    );
  }
  if (skin === "terminal") {
    return (
      <div className="w-full text-left">
        <p className={cn("mb-3 text-[#33ff66] opacity-70", compact ? "text-[11px]" : "text-[17px]")}>C:\KOMPI\{file.toUpperCase()}&gt; type profile.txt</p>
        {children}
      </div>
    );
  }
  if (skin === "vhs") {
    return (
      <div className="w-full">
        <VhsOsd compact={compact} />
        {children}
      </div>
    );
  }
  if (skin === "arcade") {
    return (
      <div className="w-full">
        <div className={cn("mb-5 flex justify-between text-[#f9f871]", compact ? "text-[7px]" : "text-[10px]")}>
          <span>1UP 004210</span>
          <span className="text-[#ff2a6d]">HI-SCORE 999990</span>
        </div>
        {children}
      </div>
    );
  }
  if (skin === "geocities") {
    return (
      <div className="w-full">
        <div className="mb-4 overflow-hidden whitespace-nowrap border-y-2 border-[#ffff00] py-1 text-[#ffff00]">
          <span className="kc-marquee inline-block pl-[100%]">★ Welcome to my homepage! ★ Sign my guestbook ★ Thanks for visiting ★</span>
        </div>
        {children}
      </div>
    );
  }
  return <>{children}</>;
}

/** Extra styling for the name, per skin. */
export function skinTitleStyle(skin?: KCardSkin): { className?: string; style?: CSSProperties } {
  switch (skin) {
    case "vhs":
      return { className: "uppercase tracking-[0.04em]", style: { textShadow: "3px 0 #ff2a6d, -3px 0 #05d9e8" } };
    case "terminal":
      return { style: { textShadow: "0 0 6px rgba(51,255,102,.55)" } };
    case "arcade":
      return { className: "uppercase leading-relaxed", style: { textShadow: "3px 3px 0 #ff2a6d" } };
    case "vaporwave":
      return { className: "italic uppercase tracking-[0.06em]", style: { textShadow: "3px 3px 0 #01cdfe" } };
    case "y2k":
      return { className: "bg-gradient-to-b from-[#1b3a8c] via-[#4f7bd6] to-[#0b1f5c] bg-clip-text !text-transparent" };
    case "geocities":
      return { className: "kc-rainbow bg-clip-text !text-transparent", style: { backgroundImage: "linear-gradient(90deg,#ff0000,#ff9900,#ffff00,#33ff00,#00ccff,#cc00ff,#ff0000)", backgroundSize: "200% 100%" } };
    default:
      return {};
  }
}

/** Type sizes for skins whose fonts run unusually small (VT323) or large (Press Start 2P). */
export function skinSizes(skin: KCardSkin | undefined, fullSize: boolean): { title?: string; bio?: string } {
  switch (skin) {
    case "terminal":
    case "vhs":
    case "win95":
    case "macos":
      return fullSize ? { title: "text-[34px]", bio: "text-[20px] leading-tight" } : { title: "text-xl", bio: "text-[13px] leading-tight" };
    case "arcade":
      return fullSize ? { title: "text-[19px]", bio: "text-[11px] leading-[1.7]" } : { title: "text-[12px]", bio: "text-[8px] leading-[1.7]" };
    default:
      return {};
  }
}

/** Blinking cursor after the bio for the terminal skin. */
export function SkinBioSuffix({ skin }: { skin?: KCardSkin }) {
  if (skin !== "terminal") return null;
  return <span className="kc-blink ml-1 inline-block h-[0.9em] w-[0.55em] translate-y-[0.12em] bg-current" />;
}

/* ---------------- Buttons ---------------- */

const ARCADE = ["#ff2a6d", "#05d9e8", "#f9f871", "#7bff6b"];

export function skinButton(skin: KCardSkin | undefined, index: number, fullSize = true): { style?: CSSProperties; className?: string; prefix?: string; suffix?: string } {
  const big = fullSize ? 21 : 13; // VT323 runs small, so its buttons get bigger type
  switch (skin) {
    case "win95":
      return {
        style: { background: "#c0c0c0", color: "#000", borderRadius: 0, border: "none", boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf", fontSize: big },
        className: "active:translate-y-px",
      };
    case "macos":
      return { style: { background: "#fff", color: "#000", borderRadius: 7, border: "1px solid #000", boxShadow: "2px 2px 0 #000", fontSize: big }, className: "active:translate-x-[2px] active:translate-y-[2px]" };
    case "terminal":
      return {
        style: { background: "transparent", color: "#33ff66", borderRadius: 0, border: "1px dashed #33ff66", boxShadow: "none", textShadow: "0 0 6px rgba(51,255,102,.55)", fontSize: big },
        className: "hover:!bg-[#33ff66] hover:!text-black hover:[text-shadow:none]",
        prefix: "> ",
      };
    case "vhs":
      return {
        style: { background: "rgba(255,255,255,0.05)", color: "#fff", borderRadius: 0, border: "2px solid #fff", boxShadow: "none", textShadow: "2px 0 #ff2a6d, -2px 0 #05d9e8", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: big },
        prefix: "▶ ",
      };
    case "arcade": {
      const c = ARCADE[index % ARCADE.length];
      return { style: { background: c, color: "#120024", borderRadius: 0, border: "3px solid #000", boxShadow: "5px 5px 0 #000", fontSize: fullSize ? 11 : 8, lineHeight: 1.6 }, className: "hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1" };
    }
    case "vaporwave":
      return { style: { background: "linear-gradient(90deg, rgba(255,113,206,.35), rgba(1,205,254,.35))", color: "#fff", borderRadius: 999, border: "1.5px solid rgba(255,255,255,.85)", boxShadow: "none", backdropFilter: "blur(6px)", letterSpacing: "0.06em" } };
    case "y2k":
      return {
        style: {
          background: "linear-gradient(180deg,#ffffff 0%,#e6ecf5 46%,#b8c6db 50%,#eef2f8 100%)",
          color: "#1b3a8c",
          borderRadius: 999,
          border: "1px solid #8a9bb8",
          boxShadow: "inset 0 1px 0 #fff, 0 2px 0 rgba(27,58,140,.15)",
          fontWeight: 700,
        },
      };
    case "geocities":
      return {
        style: { background: "#000080", color: "#ffff00", borderRadius: 0, border: "3px ridge #c0c0c0", boxShadow: "none", textDecoration: "underline" },
        prefix: "» ",
        suffix: " «",
      };
    case "roboto":
      return { style: { background: "#fff", color: "#1a73e8", borderRadius: 999, border: "1px solid #dadce0", boxShadow: "none", fontWeight: 500 }, className: "hover:!bg-[#f1f6fe]" };
    default:
      return {};
  }
}

/* ---------------- Footer extras ---------------- */

function visitorNumber(seed: string) {
  let h = 7;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return String(1000 + (h % 98000)).padStart(6, "0");
}

function Win95Taskbar({ compact }: { compact?: boolean }) {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  const bevel = "inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf";
  return (
    <div
      className={cn("absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#c0c0c0] px-1.5 text-black", compact ? "h-6 text-[9px]" : "h-9 text-[13px]")}
      style={{ boxShadow: "inset 0 1px #dfdfdf, inset 0 2px #fff" }}
    >
      <span className="flex h-[78%] items-center gap-1.5 px-2 font-bold" style={{ boxShadow: bevel }}>
        <span className="grid grid-cols-2 gap-[1px]">
          <span className="size-[5px] bg-[#f25022]" />
          <span className="size-[5px] bg-[#7fba00]" />
          <span className="size-[5px] bg-[#00a4ef]" />
          <span className="size-[5px] bg-[#ffb900]" />
        </span>
        Start
      </span>
      <span className="flex h-[78%] items-center px-2.5 tabular-nums" style={{ boxShadow: "inset 1px 1px #808080, inset -1px -1px #fff" }}>
        {clock || "12:00"}
      </span>
    </div>
  );
}

export function SkinFooter({ skin, seed, compact }: { skin?: KCardSkin; seed: string; compact?: boolean }) {
  if (skin === "arcade") return <p className={cn("kc-blink text-center text-[#f9f871]", compact ? "text-[8px]" : "text-[11px]")}>INSERT COIN</p>;
  if (skin === "geocities") {
    return (
      <div className="flex flex-col items-center gap-2 text-center text-[#ffff00]">
        <span className="rounded-sm bg-black px-2 py-0.5 font-mono text-[13px] tracking-[0.2em] text-[#33ff00] ring-1 ring-[#c0c0c0]">{visitorNumber(seed)}</span>
        <span className={compact ? "text-[9px]" : "text-[12px]"}>🚧 This page is under construction 🚧</span>
      </div>
    );
  }
  if (skin === "terminal") return <p className={cn("text-center opacity-70", compact ? "text-[10px]" : "text-[15px]")}>EOF — {visitorNumber(seed)} bytes free</p>;
  return null;
}
