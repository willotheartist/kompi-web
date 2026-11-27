"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getKCardFontClass } from "@/lib/fonts";
import type { KCardThemeState } from "./kcard-theme-presets";
import { PRO_SKIN_THEMES } from "./kcard-pro-themes";
import { SkinBackdrop, skinButton, skinTitleStyle } from "./kcard-skins";
import { kcardButtonStyles, kcardWallpaperStyle } from "./kcard-style";
import {
  NINETIES_LIGHT_THEME,
  NINETIES_MIDNIGHT_THEME,
  NINETIES_TEAL_THEME,
  STANDARD_THEMES,
  THEME_COLLECTIONS,
  type ThemeOption,
} from "./kcard-standard-themes";

type KCardThemeSectionProps = {
  value: KCardThemeState;
  onChange: (theme: KCardThemeState) => void;
  /** Paid plan: Pro themes can be applied. */
  isPro?: boolean;
};

type ThemeTab = "random" | "standard" | "pro";

const TABS: { id: ThemeTab; label: string }[] = [
  { id: "random", label: "Random" },
  { id: "standard", label: "Standard" },
  { id: "pro", label: "Pro Themes" },
];

const PRO_THEMES: ThemeOption[] = [
  ...PRO_SKIN_THEMES,
  { id: "90s-teal", name: "90s Teal", tagline: "Retro type, chunky 3D buttons", theme: NINETIES_TEAL_THEME },
  { id: "90s-light", name: "90s Light", tagline: "Retro type, chunky 3D buttons", theme: NINETIES_LIGHT_THEME },
  { id: "90s-midnight", name: "90s Midnight", tagline: "Retro type, chunky 3D buttons", theme: NINETIES_MIDNIGHT_THEME },
];
const PRO_IDS = new Set(PRO_THEMES.map((t) => t.id));

function showUpgrade(go: () => void) {
  toast("Pro themes come with Kompi Pro", {
    description: "Upgrade to use Windows 95, Terminal, VHS and the rest — plus the verified badge.",
    action: { label: "Upgrade", onClick: go },
  });
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

/** A small live sample of a theme: background, name in its type, and three of its buttons. */
function ThemeTile({ option, selected, locked, onSelect }: { option: ThemeOption; selected: boolean; locked?: boolean; onSelect: () => void }) {
  const t = option.theme;
  const title = skinTitleStyle(t.skin);
  const base = kcardButtonStyles(t);
  const framed = t.skin === "win95" || t.skin === "macos";
  const square = t.skin === "win95" || t.skin === "macos" || t.skin === "arcade" || t.skin === "terminal";
  const bigTitle = t.skin === "terminal" || t.skin === "vhs" || t.skin === "win95" || t.skin === "macos";
  const isBlank = option.id === "blank";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex flex-col rounded-[18px] border bg-white p-1.5 text-left transition-colors",
        selected ? "border-[#151619]" : "border-[#E3E5E7] hover:border-[#CDD1D7]",
      )}
    >
      <div
        className={cn("relative isolate h-[164px] overflow-hidden rounded-[13px]", isBlank && "border border-dashed border-[#CDD1D7]")}
        style={isBlank ? { background: "#F7F7F8" } : kcardWallpaperStyle(t)}
      >
        <SkinBackdrop skin={t.skin} compact />
        <div className={cn("relative flex h-full flex-col items-center px-3 pt-3.5 transition-transform duration-300 group-hover:-translate-y-0.5", getKCardFontClass(t.pageFont))}>
          <div
            className={cn("flex flex-col items-center", framed && "w-full px-2 py-1.5", t.skin === "win95" && "bg-[#c0c0c0]", t.skin === "macos" && "border border-black bg-white")}
            style={t.skin === "win95" ? { boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #fff" } : undefined}
          >
            <span className={cn("mb-1 size-5", square ? "rounded-none" : "rounded-full")} style={{ background: isBlank ? "#DCDFE3" : t.titleColor, opacity: isBlank ? 1 : 0.22 }} />
            <span
              className={cn(
                "max-w-full truncate leading-none",
                getKCardFontClass(t.titleFont),
                t.skin === "arcade" ? "text-[9px]" : bigTitle ? "text-[17px]" : t.titleFont === "serif" ? "text-[17px]" : "text-[13px] font-semibold",
                title.className,
              )}
              style={{ color: isBlank ? "#80858C" : t.titleColor, ...title.style }}
            >
              {option.name}
            </span>
          </div>
          <div className="mt-2.5 flex w-full flex-col gap-[7px]">
            {[0, 1, 2].map((i) => {
              const sb = skinButton(t.skin, i, false);
              return (
                <span
                  key={i}
                  className="flex h-4 shrink-0 items-center justify-center overflow-hidden"
                  style={isBlank ? { border: "1px dashed #CDD1D7", borderRadius: 999 } : { ...base, ...sb.style, fontSize: 0, transform: undefined }}
                >
                  <span className="h-[3px] w-1/3 rounded-full bg-current opacity-60" style={isBlank ? { color: "#CDD1D7" } : undefined} />
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

const GRID = "grid grid-cols-2 gap-3 sm:grid-cols-3";

export function KCardThemeSection({ value, onChange, isPro = false }: KCardThemeSectionProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ThemeTab>("standard");
  const [picks, setPicks] = useState<ThemeOption[]>([]);

  const pool = [...STANDARD_THEMES, ...(isPro ? PRO_THEMES : [])].filter((t) => t.id !== "blank");

  function select(option: ThemeOption) {
    if (PRO_IDS.has(option.id) && !isPro) {
      showUpgrade(() => router.push("/dashboard/settings/billing"));
      return;
    }
    onChange(option.theme);
  }

  // Applies a random theme and lays out a fresh handful of alternatives.
  function shuffle() {
    const others = pool.filter((t) => !isSameTheme(t.theme, value));
    const bag = [...others];
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    const next = bag.slice(0, 6);
    setPicks(next);
    if (next[0]) onChange(next[0].theme);
  }

  const tile = (option: ThemeOption) => (
    <ThemeTile
      key={option.id}
      option={option}
      locked={PRO_IDS.has(option.id) && !isPro}
      selected={option.id === "blank" ? value.wallpaper === "none" && !STANDARD_THEMES.concat(PRO_THEMES).some((o) => o.id !== "blank" && isSameTheme(value, o.theme)) : isSameTheme(value, option.theme)}
      onSelect={() => select(option)}
    />
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-[11px] border border-[#E3E5E7] bg-white p-1 text-[14px]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "random") shuffle();
              }}
              className={cn(
                "h-9 rounded-[8px] px-3.5 transition-colors",
                activeTab === tab.id ? "bg-[#F1F2F4] font-medium text-[#151619]" : "text-[#80858C] hover:text-[#151619]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "random" && (
          <button
            type="button"
            onClick={shuffle}
            className="inline-flex h-9 items-center gap-2 rounded-[9px] bg-[#151619] px-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#2B2D31]"
          >
            <Shuffle className="h-4 w-4" /> Shuffle
          </button>
        )}
      </div>

      {activeTab === "random" && (
        <div className="space-y-3">
          <p className="text-[13px] text-[#80858C]">We picked one for you. Shuffle again, or try one of these.</p>
          <div className={GRID}>{picks.map(tile)}</div>
        </div>
      )}

      {activeTab === "standard" && (
        <div className="space-y-7">
          {THEME_COLLECTIONS.map((c) => (
            <div key={c.id} className="space-y-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#80858C]">{c.label}</p>
              <div className={GRID}>{c.themes.map(tile)}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "pro" && (
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
          <div className={GRID}>{PRO_THEMES.map(tile)}</div>
        </div>
      )}

      {/* Background colour: switches the Card to a solid colour */}
      <div className="flex items-center justify-between gap-4 border-t border-[#EDEEF0] pt-5">
        <div>
          <p className="text-[15px] font-medium text-[#151619]">Background colour</p>
          <p className="text-[12px] text-[#80858C]">Swap the background for a solid colour of your own.</p>
        </div>
        <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full">
          <span className="absolute inset-0 rounded-full border border-[#CDD1D7]" style={{ backgroundColor: value.pageBackground }} />
          <input
            type="color"
            value={value.pageBackground}
            onChange={(e) => onChange({ ...value, wallpaper: "none", pageBackground: e.target.value })}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>
    </div>
  );
}
