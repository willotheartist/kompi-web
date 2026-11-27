"use client";

import { useState } from "react";
import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getKCardFontClass } from "@/lib/fonts";
import {
  DEFAULT_KCARD_THEME,
  type KCardThemeState,
} from "./kcard-theme-presets";
import { PRO_SKIN_THEMES } from "./kcard-pro-themes";
import { SkinBackdrop, skinButton, skinTitleStyle } from "./kcard-skins";
import { kcardButtonStyles, kcardWallpaperStyle } from "./kcard-style";

type KCardThemeSectionProps = {
  value: KCardThemeState;
  onChange: (theme: KCardThemeState) => void;
  /** Paid plan: Pro themes can be applied. */
  isPro?: boolean;
};

type ThemeTab = "random" | "standard" | "pro";

type ThemeOption = {
  id: string;
  name: string;
  theme: KCardThemeState;
};

// ---- Base themes ----

// Completely blank: no wallpaper, solid page background.
const BLANK_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#f5f2eb",
};

// Your original Blood Orange look
const BLOOD_ORANGE_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #ff6721 0%, #ff8c24 45%, #ffb52e 100%)",
  pageBackground: "#ff7a2f",
  buttonColor: "#ffb52e",
  buttonTextColor: "#050505",
};

const SUNSET_PLUM_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #ff7a7a 0%, #f97316 35%, #7c3aed 100%)",
  pageBackground: "#0f172a",
  buttonColor: "#fbbf24",
  buttonTextColor: "#050505",
};

const MINT_CREAM_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #ecfdf3 0%, #a7f3d0 40%, #22c55e 100%)",
  pageBackground: "#022c22",
  buttonColor: "#bbf7d0",
  buttonTextColor: "#022c22",
};

const ULTRA_VIOLET_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #312e81 0%, #4c1d95 45%, #a855f7 100%)",
  pageBackground: "#020617",
  buttonColor: "#f97316",
  buttonTextColor: "#050505",
};

const NOIR_GLASS_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "radial-gradient(circle at 0 0, #27272a 0%, #020617 55%, #000000 100%)",
  pageBackground: "#020617",
  buttonColor: "#e4e4e7",
  buttonTextColor: "#020617",
};

const CANDY_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #fb7185 0%, #f97316 40%, #facc15 85%, #fef3c7 100%)",
  pageBackground: "#0f172a",
  buttonColor: "#facc15",
  buttonTextColor: "#050505",
};

const OCEAN_DEPTHS_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #0ea5e9 0%, #0369a1 40%, #022c22 100%)",
  pageBackground: "#020617",
  buttonColor: "#22c55e",
  buttonTextColor: "#022c22",
};

const SAND_DUNE_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #f97316 0%, #fbbf24 40%, #fde68a 100%)",
  pageBackground: "#292524",
  buttonColor: "#fef3c7",
  buttonTextColor: "#1f2933",
};

const NEON_POP_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #22c55e 0%, #22d3ee 35%, #6366f1 75%, #db2777 100%)",
  pageBackground: "#020617",
  buttonColor: "#a855f7",
  buttonTextColor: "#050505",
};

const MIDNIGHT_BLUR_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "radial-gradient(circle at 10% 0, #0ea5e9 0%, transparent 45%), radial-gradient(circle at 90% 100%, #a855f7 0%, #020617 60%)",
  pageBackground: "#020617",
  buttonColor: "#e5e7eb",
  buttonTextColor: "#020617",
};

const ROSE_CLOUD_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #fed7e2 0%, #f97373 30%, #fb7185 65%, #fef3c7 100%)",
  pageBackground: "#111827",
  buttonColor: "#fecaca",
  buttonTextColor: "#111827",
};

// ---- 90s Pro themes (Win95-ish) ----

const NINETIES_TEAL_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#006b7f",
  titleColor: "#e1ffe7",
  pageTextColor: "#e1ffe7",
  buttonColor: "#ffffff",
  buttonTextColor: "#000000",
  buttonRadius: 10,
  buttonStyle: "solid",
  buttonShadow: "3d",
  titleFont: "retro",
  pageFont: "retro",
};

const NINETIES_LIGHT_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#ffffff",
  titleColor: "#111827",
  pageTextColor: "#111827",
  buttonColor: "#ffffff",
  buttonTextColor: "#000000",
  buttonRadius: 10,
  buttonStyle: "solid",
  buttonShadow: "3d",
  titleFont: "retro",
  pageFont: "retro",
};

const NINETIES_MIDNIGHT_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#003b34",
  titleColor: "#d7ffe8",
  pageTextColor: "#d7ffe8",
  buttonColor: "#c4ffe4",
  buttonTextColor: "#000000",
  buttonRadius: 10,
  buttonStyle: "solid",
  buttonShadow: "3d",
  titleFont: "retro",
  pageFont: "retro",
};

const STANDARD_THEMES: ThemeOption[] = [
  { id: "blank", name: "Blank", theme: BLANK_THEME },
  { id: "blood-orange", name: "Blood Orange", theme: BLOOD_ORANGE_THEME },
  { id: "sunset-plum", name: "Sunset Plum", theme: SUNSET_PLUM_THEME },
  { id: "mint-cream", name: "Mint Cream", theme: MINT_CREAM_THEME },
  { id: "ultra-violet", name: "Ultra Violet", theme: ULTRA_VIOLET_THEME },
  { id: "noir-glass", name: "Noir Glass", theme: NOIR_GLASS_THEME },
  { id: "candy", name: "Candy", theme: CANDY_THEME },
  { id: "ocean-depths", name: "Ocean Depths", theme: OCEAN_DEPTHS_THEME },
  { id: "sand-dune", name: "Sand Dune", theme: SAND_DUNE_THEME },
  { id: "neon-pop", name: "Neon Pop", theme: NEON_POP_THEME },
  { id: "midnight-blur", name: "Midnight Blur", theme: MIDNIGHT_BLUR_THEME },
  { id: "rose-cloud", name: "Rose Cloud", theme: ROSE_CLOUD_THEME },
];

const CLASSIC_PRO_THEMES: ThemeOption[] = [
  { id: "90s-teal", name: "90s Teal", theme: NINETIES_TEAL_THEME },
  { id: "90s-light", name: "90s Light", theme: NINETIES_LIGHT_THEME },
  { id: "90s-midnight", name: "90s Midnight", theme: NINETIES_MIDNIGHT_THEME },
];

const TABS: { id: ThemeTab; label: string }[] = [
  { id: "random", label: "Random" },
  { id: "standard", label: "Standard" },
  { id: "pro", label: "Pro Themes" },
];

const PRO_THEMES: (ThemeOption & { tagline?: string })[] = [...PRO_SKIN_THEMES, ...CLASSIC_PRO_THEMES.map((t) => ({ ...t, tagline: "Retro type, chunky 3D buttons" }))];

function showUpgrade(go: () => void) {
  toast("Pro themes come with Kompi Pro", {
    description: "Upgrade to use Windows 95, Terminal, VHS and the rest — plus the verified badge.",
    action: { label: "Upgrade", onClick: go },
  });
}

/** A small live sample of a Pro theme: its backdrop, name styling and button chrome. */
function ProTile({ option, selected, locked, onSelect }: { option: ThemeOption & { tagline?: string }; selected: boolean; locked: boolean; onSelect: () => void }) {
  const t = option.theme;
  const title = skinTitleStyle(t.skin);
  const base = kcardButtonStyles(t);
  const framed = t.skin === "win95" || t.skin === "macos";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex flex-col rounded-[18px] border bg-white p-1.5 text-left transition-colors",
        selected ? "border-[#151619]" : "border-[#E3E5E7] hover:border-[#CDD1D7]",
      )}
    >
      <div className="relative isolate h-[164px] overflow-hidden rounded-[13px]" style={kcardWallpaperStyle(t)}>
        <SkinBackdrop skin={t.skin} compact />
        <div className={cn("relative flex h-full flex-col items-center px-3 pt-3.5", getKCardFontClass(t.pageFont))}>
          <div
            className={cn("flex flex-col items-center", framed && "w-full px-2 py-1.5", t.skin === "win95" && "bg-[#c0c0c0]", t.skin === "macos" && "border border-black bg-white")}
            style={t.skin === "win95" ? { boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #fff" } : undefined}
          >
            <span className={cn("mb-1 size-5 bg-black/25", t.skin === "win95" || t.skin === "macos" || t.skin === "arcade" || t.skin === "terminal" ? "rounded-none" : "rounded-full")} />
            <span
              className={cn("max-w-full truncate leading-none", getKCardFontClass(t.titleFont), t.skin === "arcade" ? "text-[9px]" : t.skin && ["terminal", "vhs", "win95", "macos"].includes(t.skin) ? "text-[17px]" : "text-[13px] font-semibold", title.className)}
              style={{ color: t.titleColor, ...title.style }}
            >
              {option.name}
            </span>
          </div>
          <div className="mt-2.5 flex w-full flex-col gap-[7px]">
            {[0, 1, 2].map((i) => {
              const sb = skinButton(t.skin, i, false);
              return (
                <span key={i} className="flex h-4 shrink-0 items-center justify-center overflow-hidden" style={{ ...base, ...sb.style, fontSize: 0 }}>
                  <span className="h-[3px] w-1/3 rounded-full bg-current opacity-60" />
                </span>
              );
            })}
          </div>
        </div>
        {locked && (
          <span className="absolute right-2 top-2 rounded-[6px] bg-[#151619] px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.05em] text-white">PRO</span>
        )}
      </div>
      <div className="px-1.5 pb-1 pt-2">
        <p className="truncate text-[13px] font-medium text-[#151619]">{option.name}</p>
        {option.tagline && <p className="truncate text-[11.5px] text-[#80858C]">{option.tagline}</p>}
      </div>
    </button>
  );
}

function isSameTheme(a: KCardThemeState, b: KCardThemeState): boolean {
  return (
    (a.skin ?? null) === (b.skin ?? null) &&
    a.wallpaper === b.wallpaper &&
    a.pageBackground === b.pageBackground &&
    a.buttonColor === b.buttonColor &&
    a.buttonTextColor === b.buttonTextColor
  );
}

export function KCardThemeSection({ value, onChange, isPro = false }: KCardThemeSectionProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ThemeTab>("random");

  const handleSelectTheme = (option: ThemeOption) => {
    onChange(option.theme);
  };

  const handleRandomizeTheme = () => {
    const pool = [...STANDARD_THEMES, ...(isPro ? PRO_THEMES : [])].filter(
      (t) => t.id !== "blank"
    );
    if (!pool.length) return;
    const idx = Math.floor(Math.random() * pool.length);
    onChange(pool[idx].theme);
  };

  const isBlankActive = value.wallpaper === "none";

  const activeThemes = STANDARD_THEMES;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex">
        <div className="inline-flex rounded-[11px] border border-[#E3E5E7] bg-white p-1 text-[14px]">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            const isRandom = tab.id === "random";

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  if (isRandom) handleRandomizeTheme();
                }}
                className={cn(
                  "h-9 rounded-[8px] px-3.5 transition-colors",
                  active
                    ? "bg-[#F1F2F4] font-medium text-[#151619]"
                    : "text-[#80858C] hover:text-[#151619]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "pro" ? (
        <div className="space-y-3">
          {!isPro && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#E3E5E7] px-4 py-3">
              <p className="text-[13px] text-[#3C4045]">
                <span className="font-medium text-[#151619]">Pro themes</span> change the whole Card — frames, backdrops, buttons and type.
              </p>
              <Link href="/dashboard/settings/billing" className="inline-flex h-8 items-center rounded-[9px] bg-[#151619] px-3 text-[13px] font-medium text-white transition-colors hover:bg-[#2B2D31]">
                Upgrade
              </Link>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PRO_THEMES.map((option) => (
              <ProTile
                key={option.id}
                option={option}
                locked={!isPro}
                selected={isSameTheme(value, option.theme)}
                onSelect={() => (isPro ? handleSelectTheme(option) : showUpgrade(() => router.push("/dashboard/settings/billing")))}
              />
            ))}
          </div>
        </div>
      ) : (
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {activeThemes.map((option) => {
          const isBlank = option.id === "blank";

          const selected = isBlank
            ? isBlankActive
            : isSameTheme(value, option.theme);

          const previewStyle: React.CSSProperties = isBlank
            ? {
                background:
                  "linear-gradient(135deg,#f7f3eb 0%,#f1ece3 45%,#e9e4db 100%)",
              }
            : {
                background:
                  option.theme.wallpaper === "none"
                    ? option.theme.pageBackground
                    : option.theme.wallpaper,
              };

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectTheme(option)}
              className={cn(
                "flex h-32 flex-col rounded-3xl border px-3 py-2 text-left text-xs transition",
                selected
                  ? "border-[#151619] bg-white"
                  : "border-[#E3E5E7] bg-white hover:border-[#CDD1D7]"
              )}
            >
              <div
                className="mb-2 flex-1 rounded-2xl p-2"
                style={previewStyle}
              >
                {isBlank ? (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/60 text-[10px] font-semibold text-white/70">
                    <span className="px-2 py-1">Blank</span>
                  </div>
                ) : (
                  <div className="h-full w-full rounded-2xl" />
                )}
              </div>
              <p className="truncate text-[11px] font-semibold text-[var(--color-text)]">
                {option.name}
              </p>
            </button>
          );
        })}
      </div>
      )}

      {/* Page background color – only active for Blank */}
      <div className="border-t border-[var(--color-border)] pt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-[var(--color-text)]">
              Page Background Color
            </p>
            {!isBlankActive && (
              <p className="text-[11px] text-[var(--color-subtle)]">
                Pick the <span className="font-medium">Blank</span> theme to edit this.
              </p>
            )}
          </div>
          <label
            className={cn(
              "relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full",
              !isBlankActive && "opacity-40"
            )}
          >
            <span
              className="absolute inset-0 rounded-full border border-black"
              style={{ backgroundColor: value.pageBackground }}
            />
            <input
              type="color"
              value={value.pageBackground}
              onChange={(e) =>
                onChange({
                  ...value,
                  wallpaper: "none",
                  pageBackground: e.target.value,
                })
              }
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
