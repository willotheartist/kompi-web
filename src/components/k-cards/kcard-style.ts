import type React from "react";
import type { KCardThemeState } from "./kcard-theme-presets";
import type { KCardSticker } from "./kcard-stickers";

/** Button styles from a theme. Shared by the editor preview and the public Card page. */
export function kcardButtonStyles(theme: Pick<KCardThemeState, "buttonStyle" | "buttonRadius" | "buttonShadow" | "buttonColor" | "buttonTextColor" | "buttonBorder">): React.CSSProperties {
  const { buttonStyle, buttonRadius, buttonShadow, buttonColor, buttonTextColor, buttonBorder } = theme;
  const style: React.CSSProperties = {
    borderRadius: buttonRadius,
    boxShadow:
      buttonShadow === "soft"
        ? "0 6px 14px rgba(15,23,42,0.35)"
        : buttonShadow === "hard"
          ? "0 10px 24px rgba(15,23,42,0.6)"
          : buttonShadow === "3d"
            ? "0 6px 0 rgba(0,0,0,0.45), 0 12px 0 rgba(0,0,0,0.3)"
            : "none",
    border: "1px solid transparent",
  };

  if (buttonStyle === "solid") {
    style.backgroundColor = buttonColor;
    style.color = buttonTextColor;
    style.border = `1px solid ${buttonBorder || "rgba(15,23,42,0.5)"}`;
  } else if (buttonStyle === "glass") {
    style.backgroundColor = "rgba(15,23,42,0.35)";
    style.color = "var(--color-surface)";
    style.border = "1px solid rgba(15,23,42,0.35)";
    style.backdropFilter = "blur(12px)";
  } else {
    style.backgroundColor = "transparent";
    style.color = buttonColor;
    style.border = `1px solid ${buttonColor}`;
    style.boxShadow = "none";
  }
  return style;
}

/** Page background: the wallpaper, or the solid colour when there is none. */
export function kcardWallpaperStyle(theme: Pick<KCardThemeState, "wallpaper" | "pageBackground">): React.CSSProperties {
  const w = theme.wallpaper?.trim();
  return w && w.toLowerCase() !== "none" ? { background: w } : { background: theme.pageBackground || "#020617" };
}

/** Paid plans get Pro skins and the verified badge. */
export function isPaidPlan(plan?: string | null) {
  return Boolean(plan && plan !== "FREE");
}

/** Stickers from saved Card data, with anything malformed dropped. */
export function sanitizeStickers(raw: unknown): KCardSticker[] {
  if (!Array.isArray(raw)) return [];
  const num = (v: unknown, min: number, max: number) => (typeof v === "number" && Number.isFinite(v) ? Math.max(min, Math.min(max, v)) : null);
  const out: KCardSticker[] = [];
  for (const item of raw.slice(0, 24)) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const x = num(o.x, -400, 400), y = num(o.y, 0, 4000), size = num(o.size, 20, 300), r = num(o.r, -360, 360);
    if (typeof o.id !== "string" || typeof o.s !== "string" || x === null || y === null || size === null || r === null) continue;
    out.push({ id: o.id.slice(0, 32), s: o.s.slice(0, 40), x, y, size, r });
  }
  return out;
}
