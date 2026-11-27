import type { ProductLook } from "@/components/store/product-view";
import { DEFAULT_KCARD_THEME, type KCardThemeState } from "@/components/k-cards/kcard-theme-presets";
import { kcardButtonStyles, kcardWallpaperStyle } from "@/components/k-cards/kcard-style";
import { getKCardFontClass } from "./fonts";

function isLight(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.82;
}

/** Product pages borrow the seller's Card theme so the store feels like their brand. */
export function productLookFromCard(themeRaw: unknown): ProductLook {
  const theme: KCardThemeState = { ...DEFAULT_KCARD_THEME, ...((themeRaw ?? {}) as Partial<KCardThemeState>) };
  const button = kcardButtonStyles(theme);
  // Solid buttons read best on the light purchase panel; outline/glass ones fall back to ink.
  // Light buttons would vanish on the white panel, so those use ink too.
  const panelButton = theme.buttonStyle === "solid" && !isLight(theme.buttonColor) ? button : { backgroundColor: "#151619", color: "#fff", border: "1px solid #151619", borderRadius: theme.buttonRadius };
  return {
    background: kcardWallpaperStyle(theme),
    titleColor: theme.titleColor || "#f9fafb",
    textColor: theme.pageTextColor || "#e5e7eb",
    titleFont: getKCardFontClass(theme.titleFont),
    bodyFont: getKCardFontClass(theme.pageFont),
    button: { ...panelButton, boxShadow: "none" },
  };
}
