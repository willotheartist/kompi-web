// e.g. src/components/k-cards/kcard-style.ts
import type { KCardThemeState } from "./kcard-theme-presets";
import type React from "react";

export function getKCardButtonBaseStyles(
  theme: KCardThemeState
): React.CSSProperties {
  const {
    buttonRadius,
    buttonShadow,
    buttonStyle,
    buttonColor,
    buttonTextColor,
  } = theme;

  const style: React.CSSProperties = {
    borderRadius: buttonRadius,
    boxShadow:
      buttonShadow === "none"
        ? "none"
        : buttonShadow === "soft"
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
    // outline
    style.backgroundColor = "transparent";
    style.color = buttonColor;
    style.border = `1px solid ${buttonColor}`;
    style.boxShadow = "none";
  }

  return style;
}
