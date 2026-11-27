import { DEFAULT_KCARD_THEME, type KCardSkin, type KCardThemeState } from "./kcard-theme-presets";

export type ProThemeOption = { id: string; name: string; tagline: string; theme: KCardThemeState };

const base = (skin: KCardSkin, t: Partial<KCardThemeState>): KCardThemeState => ({
  ...DEFAULT_KCARD_THEME,
  buttonStyle: "solid",
  buttonShadow: "none",
  ...t,
  skin,
});

export const PRO_SKIN_THEMES: ProThemeOption[] = [
  {
    id: "win95",
    name: "Windows 95",
    tagline: "Bevels, title bar, Start button",
    theme: base("win95", { wallpaper: "none", pageBackground: "#008080", titleColor: "#000000", pageTextColor: "#000000", buttonColor: "#c0c0c0", buttonTextColor: "#000000", buttonRadius: 0, titleFont: "silkscreen", pageFont: "terminal" }),
  },
  {
    id: "terminal",
    name: "Terminal",
    tagline: "Green phosphor, blinking cursor",
    theme: base("terminal", { wallpaper: "none", pageBackground: "#030a04", titleColor: "#33ff66", pageTextColor: "#33ff66", buttonColor: "#33ff66", buttonTextColor: "#030a04", buttonStyle: "outline", buttonRadius: 0, titleFont: "terminal", pageFont: "terminal" }),
  },
  {
    id: "vhs",
    name: "VHS Tape",
    tagline: "PLAY ▶, tracking lines, RGB split",
    theme: base("vhs", { wallpaper: "linear-gradient(180deg,#07071d 0%,#160a33 55%,#2b0a2e 100%)", pageBackground: "#07071d", titleColor: "#ffffff", pageTextColor: "#d9d9ff", buttonColor: "#ffffff", buttonTextColor: "#ffffff", buttonRadius: 0, titleFont: "terminal", pageFont: "terminal" }),
  },
  {
    id: "arcade",
    name: "Arcade",
    tagline: "Pixel type, hi-score, insert coin",
    theme: base("arcade", { wallpaper: "radial-gradient(circle at 50% 0%, #3a0a6b 0%, #120024 60%)", pageBackground: "#120024", titleColor: "#ffffff", pageTextColor: "#05d9e8", buttonColor: "#ff2a6d", buttonTextColor: "#120024", buttonRadius: 0, titleFont: "pixel", pageFont: "pixel" }),
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    tagline: "Sunset, neon grid, ａｅｓｔｈｅｔｉｃ",
    theme: base("vaporwave", { wallpaper: "linear-gradient(180deg,#2b0b4a 0%,#6a1fb8 48%,#ff71ce 100%)", pageBackground: "#2b0b4a", titleColor: "#ffffff", pageTextColor: "#ffe3f7", buttonColor: "#ffffff", buttonTextColor: "#ffffff", buttonRadius: 999, titleFont: "serif", pageFont: "space" }),
  },
  {
    id: "macos",
    name: "Classic Mac",
    tagline: "1-bit dither, platinum window",
    theme: base("macos", { wallpaper: "repeating-conic-gradient(#8c8c8c 0 25%, #b8b8b8 0 50%) 0 0 / 4px 4px", pageBackground: "#a3a3a3", titleColor: "#000000", pageTextColor: "#000000", buttonColor: "#ffffff", buttonTextColor: "#000000", buttonRadius: 7, titleFont: "silkscreen", pageFont: "terminal" }),
  },
  {
    id: "y2k",
    name: "Y2K Chrome",
    tagline: "Bubble buttons, sparkles",
    theme: base("y2k", { wallpaper: "linear-gradient(160deg,#d7e8ff 0%,#a9caff 45%,#e8d6ff 100%)", pageBackground: "#cfe0ff", titleColor: "#1b3a8c", pageTextColor: "#2a3f7a", buttonColor: "#eef2f8", buttonTextColor: "#1b3a8c", buttonRadius: 999, titleFont: "comic", pageFont: "comic" }),
  },
  {
    id: "geocities",
    name: "GeoCities",
    tagline: "Starfield, marquee, hit counter",
    theme: base("geocities", { wallpaper: "none", pageBackground: "#000033", titleColor: "#ffff00", pageTextColor: "#ffffff", buttonColor: "#000080", buttonTextColor: "#ffff00", buttonRadius: 0, titleFont: "comic", pageFont: "comic" }),
  },
  {
    id: "roboto",
    name: "Roboto",
    tagline: "Clean Material, Google colours",
    theme: base("roboto", { wallpaper: "none", pageBackground: "#f8f9fa", titleColor: "#202124", pageTextColor: "#5f6368", buttonColor: "#ffffff", buttonTextColor: "#1a73e8", buttonRadius: 999, titleFont: "roboto", pageFont: "roboto" }),
  },
];
