import { Inter_Tight, Instrument_Serif, Onest, Barlow_Semi_Condensed, Baloo_2, Space_Grotesk } from "next/font/google";

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
    default:
      return interTight.className;
  }
}
