import { Inter_Tight, Instrument_Serif, Onest, Barlow_Semi_Condensed, Baloo_2, Space_Grotesk } from "next/font/google";

import localFont from "next/font/local";
import type { KCardFontToken } from "@/components/k-cards/kcard-theme-presets";

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-accent",
  display: "swap",
});

export const onest = Onest({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});


export const retroVhsFont = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-kcard-retro",
});

export const comicFont = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-kcard-comic",
});

export const spaceFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-kcard-space",
});

// Self-hosted Card theme fonts (src/fonts/kcard). Not preloaded: only Cards using them load the files.
export const robotoFont = localFont({
  src: [
    { path: "../fonts/kcard/roboto-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/kcard/roboto-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/kcard/roboto-latin-700-normal.woff2", weight: "700" },
  ],
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const terminalFont = localFont({
  src: "../fonts/kcard/vt323-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const pixelFont = localFont({
  src: "../fonts/kcard/press-start-2p-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

export const silkscreenFont = localFont({
  src: [
    { path: "../fonts/kcard/silkscreen-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/kcard/silkscreen-latin-700-normal.woff2", weight: "700" },
  ],
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

export function getKCardFontClass(token: KCardFontToken): string {
  switch (token) {
    case "system":
      return interTight.className;
    case "serif":
      return instrumentSerif.className;
    case "display":
      return onest.className;
    case "retro":
      return retroVhsFont.className;
    case "comic":
      return comicFont.className;
    case "space":
      return spaceFont.className;
    case "roboto":
      return robotoFont.className;
    case "terminal":
      return terminalFont.className;
    case "pixel":
      return pixelFont.className;
    case "silkscreen":
      return silkscreenFont.className;
    default:
      return interTight.className;
  }
}
