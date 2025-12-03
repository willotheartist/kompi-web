"use client";

import { useState } from "react";
import type React from "react";

import { cn } from "@/lib/utils";
import {
  DEFAULT_KCARD_THEME,
  type KCardThemeState,
} from "./kcard-theme-presets";

type KCardThemeSectionProps = {
  value: KCardThemeState;
  onChange: (theme: KCardThemeState) => void;
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

const PRO_THEMES: ThemeOption[] = [
  { id: "90s-teal", name: "90s Teal", theme: NINETIES_TEAL_THEME },
  { id: "90s-light", name: "90s Light", theme: NINETIES_LIGHT_THEME },
  { id: "90s-midnight", name: "90s Midnight", theme: NINETIES_MIDNIGHT_THEME },
];

const TABS: { id: ThemeTab; label: string }[] = [
  { id: "random", label: "Random" },
  { id: "standard", label: "Standard" },
  { id: "pro", label: "Pro Themes" },
];

function isSameTheme(a: KCardThemeState, b: KCardThemeState): boolean {
  return (
    a.wallpaper === b.wallpaper &&
    a.pageBackground === b.pageBackground &&
    a.buttonColor === b.buttonColor &&
    a.buttonTextColor === b.buttonTextColor
  );
}

export function KCardThemeSection({ value, onChange }: KCardThemeSectionProps) {
  const [activeTab, setActiveTab] = useState<ThemeTab>("random");

  const handleSelectTheme = (option: ThemeOption) => {
    onChange(option.theme);
  };

  const handleRandomizeTheme = () => {
    const pool = [...STANDARD_THEMES, ...PRO_THEMES].filter(
      (t) => t.id !== "blank"
    );
    if (!pool.length) return;
    const idx = Math.floor(Math.random() * pool.length);
    onChange(pool[idx].theme);
  };

  const isBlankActive = value.wallpaper === "none";

  const activeThemes =
    activeTab === "pro" ? PRO_THEMES : STANDARD_THEMES;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-[var(--color-bg)] p-1 text-xs font-medium">
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
                  "min-w-[96px] rounded-full px-4 py-2 transition",
                  active
                    ? "border border-black bg-white text-[#050505] shadow-[0_2px_0_#000000]"
                    : "bg-[#dedbd5] text-[#555555]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Themes grid */}
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
                  ? "border-black bg-white shadow-[0_2px_0_#000000]"
                  : "border-transparent bg-[#e9e6e1] hover:bg-[#e0ded9]"
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
