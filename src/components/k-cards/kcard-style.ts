import type React from "react";
import type { KCardThemeState } from "./kcard-theme-presets";

/** Button styles from a theme. Shared by the editor preview and the public Card page. */
export function kcardButtonStyles(theme: Pick<KCardThemeState, "buttonStyle" | "buttonRadius" | "buttonShadow" | "buttonColor" | "buttonTextColor">): React.CSSProperties {
  const { buttonStyle, buttonRadius, buttonShadow, buttonColor, buttonTextColor } = theme;
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
    style.border = "1px solid rgba(15,23,42,0.5)";
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
