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
    // full template apply (wallpaper, colors, fonts, buttons…)
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
      {/* Header + tabs */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-[color:var(--color-text)]">
          Theme
        </p>

        <div
          className="inline-flex items-center rounded-full border bg-[var(--color-bg)] p-0.5 text-[11px]"
          style={{ borderColor: "var(--color-border)" }}
        >
          <button
            type="button"
            onClick={() => setThemeTab("customizable")}
            className={cn(
              "rounded-full px-2.5 py-1 transition",
              themeTab === "customizable"
                ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                : "text-[color:var(--color-subtle)]"
            )}
          >
            Customizable
          </button>
          <button
            type="button"
            onClick={() => setThemeTab("curated")}
            className={cn(
              "rounded-full px-2.5 py-1 transition",
              themeTab === "curated"
                ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                : "text-[color:var(--color-subtle)]"
            )}
          >
            Curated
          </button>
        </div>
      </div>

      {/* Preset grid */}
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
                  ? "bg-[var(--color-bg)] border border-[var(--color-text)]"
                  : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text)]"
              )}
            >
              <div
                className="h-16 w-full rounded-xl border"
                style={{
                  background: theme.wallpaper,
                  borderColor: "rgba(15,23,42,0.6)",
                }}
              />
              <span className="truncate text-[color:var(--color-text)]">
                {theme.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Background override */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-[color:var(--color-text)]">
          Page background
        </p>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="h-8 w-10 cursor-pointer rounded bg-transparent"
            style={{ border: "1px solid var(--color-border)" }}
            value={value.pageBackground}
            onChange={(e) => handleBackgroundChange(e.target.value)}
          />
          <Input
            value={value.pageBackground}
            onChange={(e) => handleBackgroundChange(e.target.value)}
            className="h-9 rounded-2xl bg-[var(--color-bg)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
          />
        </div>
        <p className="text-[10px] text-[color:var(--color-subtle)]">
          Wallpaper comes from the theme. Background controls the surface behind
          your content.
        </p>
      </div>
    </div>
  );
}
