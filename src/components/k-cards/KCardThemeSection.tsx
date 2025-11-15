"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  KCARD_THEME_PRESETS,
  type KCardThemeState,
} from "./kcard-theme-presets";

type ThemeTab = "customizable" | "curated";

type KCardThemeSectionProps = {
  value: KCardThemeState;
  onChange: (v: KCardThemeState) => void;
};

export function KCardThemeSection({ value, onChange }: KCardThemeSectionProps) {
  const [themeTab, setThemeTab] = useState<ThemeTab>("customizable");

  const themesForTab = KCARD_THEME_PRESETS.filter((theme) =>
    themeTab === "customizable" ? !theme.curated : theme.curated
  );

  function handleSelectTheme(theme: KCardThemeState) {
    // 🚀 FULL TEMPLATE APPLY
    // This overwrites wallpaper, background, colors, FONTS,
    // button radius, button style, button shadow, etc.
    onChange({ ...theme });
  }

  function handleBackgroundChange(next: string) {
    onChange({
      ...value,
      pageBackground: next,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-300">Theme</p>

        <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/40 p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setThemeTab("customizable")}
            className={cn(
              "px-2.5 py-1 rounded-full transition",
              themeTab === "customizable"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-400"
            )}
          >
            Customizable
          </button>
          <button
            type="button"
            onClick={() => setThemeTab("curated")}
            className={cn(
              "px-2.5 py-1 rounded-full transition",
              themeTab === "curated"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-400"
            )}
          >
            Curated
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {themesForTab.map((theme) => {
          const active = value.id === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleSelectTheme(theme)}
              className={cn(
                "flex flex-col gap-2 rounded-2xl p-2 text-left text-[11px] transition",
                active
                  ? "bg-slate-900 border border-slate-100"
                  : "bg-slate-900/40 border border-slate-700 hover:border-slate-400"
              )}
            >
              <div
                className="h-16 w-full rounded-xl border border-slate-900"
                style={{ background: theme.wallpaper }}
              />
              <span className="truncate text-slate-200">{theme.name}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-300">
          Page background
        </p>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
            value={value.pageBackground}
            onChange={(e) => handleBackgroundChange(e.target.value)}
          />
          <Input
            value={value.pageBackground}
            onChange={(e) => handleBackgroundChange(e.target.value)}
            className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
          />
        </div>
        <p className="text-[10px] text-slate-500">
          Wallpaper comes from the theme. Background controls the card surface behind your content.
        </p>
      </div>
    </div>
  );
}
