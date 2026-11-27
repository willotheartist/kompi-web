import { DEFAULT_KCARD_THEME, type KCardThemeState } from "./kcard-theme-presets";

export type ThemeOption = { id: string; name: string; tagline?: string; theme: KCardThemeState };
export type ThemeCollection = { id: string; label: string; themes: ThemeOption[] };

/** Flat, quiet buttons: no shadow, optional hairline border. */
const t = (p: Partial<KCardThemeState>): KCardThemeState => ({
  ...DEFAULT_KCARD_THEME,
  buttonStyle: "solid",
  buttonShadow: "none",
  ...p,
});

// ---- Clean ----

const PAPER = t({ wallpaper: "none", pageBackground: "#f6f5f1", titleColor: "#151619", pageTextColor: "#5b5f66", buttonColor: "#ffffff", buttonTextColor: "#151619", buttonBorder: "#e3e2dc", buttonRadius: 14, titleFont: "system", pageFont: "system" });
const MONOCHROME = t({ wallpaper: "none", pageBackground: "#ffffff", titleColor: "#0a0a0a", pageTextColor: "#6b6b6b", buttonColor: "#0a0a0a", buttonTextColor: "#ffffff", buttonBorder: "#0a0a0a", buttonRadius: 999, titleFont: "display", pageFont: "system" });
const FOG = t({ wallpaper: "linear-gradient(180deg,#eef1f5 0%,#dfe5ec 100%)", pageBackground: "#e6ebf1", titleColor: "#1b2330", pageTextColor: "#5a6575", buttonColor: "#ffffff", buttonTextColor: "#1b2330", buttonBorder: "#d6dde6", buttonRadius: 12, titleFont: "display", pageFont: "system" });
const GRAPHITE = t({ wallpaper: "none", pageBackground: "#111214", titleColor: "#f4f4f5", pageTextColor: "#a1a1aa", buttonColor: "#1b1c1f", buttonTextColor: "#f4f4f5", buttonBorder: "#2c2d31", buttonRadius: 14, titleFont: "display", pageFont: "system" });
const SWISS = t({ wallpaper: "none", pageBackground: "#f2f2ee", titleColor: "#e6311f", pageTextColor: "#151619", buttonColor: "#151619", buttonTextColor: "#f2f2ee", buttonBorder: "#151619", buttonRadius: 0, titleFont: "space", pageFont: "space" });

// ---- Elegant ----

const IVORY = t({ wallpaper: "none", pageBackground: "#f3efe7", titleColor: "#2b2620", pageTextColor: "#6b6157", buttonStyle: "outline", buttonColor: "#2b2620", buttonTextColor: "#2b2620", buttonRadius: 999, titleFont: "serif", pageFont: "system" });
const NOIR_GOLD = t({ wallpaper: "none", pageBackground: "#0c0c0c", titleColor: "#e9dcbc", pageTextColor: "#a89c80", buttonStyle: "outline", buttonColor: "#c9b37e", buttonTextColor: "#c9b37e", buttonRadius: 2, titleFont: "serif", pageFont: "system" });
const SAGE = t({ wallpaper: "none", pageBackground: "#e6eae1", titleColor: "#2e3a2e", pageTextColor: "#5f6b5c", buttonColor: "#2e3a2e", buttonTextColor: "#eef1ea", buttonBorder: "#2e3a2e", buttonRadius: 999, titleFont: "serif", pageFont: "system" });
const CHAMPAGNE = t({ wallpaper: "linear-gradient(165deg,#f8f1e7 0%,#ecdcc8 100%)", pageBackground: "#f1e5d6", titleColor: "#3d2f23", pageTextColor: "#7a6652", buttonColor: "#fffaf3", buttonTextColor: "#3d2f23", buttonBorder: "#dcc9b0", buttonRadius: 999, titleFont: "serif", pageFont: "system" });
const MIDNIGHT_NAVY = t({ wallpaper: "none", pageBackground: "#0f1b33", titleColor: "#f5efe0", pageTextColor: "#aab3c5", buttonColor: "#f5efe0", buttonTextColor: "#0f1b33", buttonBorder: "#f5efe0", buttonRadius: 6, titleFont: "serif", pageFont: "system" });
const BORDEAUX = t({ wallpaper: "none", pageBackground: "#3a0f17", titleColor: "#f6e7e0", pageTextColor: "#d3b3aa", buttonStyle: "outline", buttonColor: "#f0cfc4", buttonTextColor: "#f0cfc4", buttonRadius: 999, titleFont: "serif", pageFont: "system" });

// ---- Bold ----

const ACID = t({ wallpaper: "none", pageBackground: "#0a0a0a", titleColor: "#d4ff3f", pageTextColor: "#bdbdbd", buttonColor: "#d4ff3f", buttonTextColor: "#0a0a0a", buttonBorder: "#d4ff3f", buttonRadius: 12, titleFont: "space", pageFont: "space" });
const COBALT = t({ wallpaper: "none", pageBackground: "#1f3dff", titleColor: "#ffffff", pageTextColor: "#c9d1ff", buttonColor: "#ffffff", buttonTextColor: "#1f3dff", buttonBorder: "#ffffff", buttonRadius: 999, titleFont: "display", pageFont: "system" });
const TERRACOTTA = t({ wallpaper: "none", pageBackground: "#c4673f", titleColor: "#fff3ea", pageTextColor: "#ffdcc8", buttonColor: "#fff3ea", buttonTextColor: "#7a3218", buttonBorder: "#fff3ea", buttonRadius: 16, titleFont: "display", pageFont: "system" });
const LAVENDER = t({ wallpaper: "linear-gradient(160deg,#efe9ff 0%,#f8e7f2 100%)", pageBackground: "#f2e8fb", titleColor: "#33264f", pageTextColor: "#6f6290", buttonColor: "#ffffff", buttonTextColor: "#33264f", buttonBorder: "#e2d6f3", buttonRadius: 999, titleFont: "display", pageFont: "system" });
const AURORA = t({ wallpaper: "radial-gradient(120% 70% at 0% 0%, #0f766e 0%, transparent 60%), radial-gradient(120% 70% at 100% 100%, #6d28d9 0%, transparent 60%), #0b0f19", pageBackground: "#0b0f19", titleColor: "#f8fafc", pageTextColor: "#cbd5e1", buttonColor: "#161d2c", buttonTextColor: "#f8fafc", buttonBorder: "#2c3650", buttonRadius: 16, titleFont: "display", pageFont: "system" });

// ---- Gradients (originals; ids and values unchanged so saved Cards still match) ----

// Completely blank: no wallpaper, solid page background.
const BLANK_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#f5f2eb",
};

const BLOOD_ORANGE_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #ff6721 0%, #ff8c24 45%, #ffb52e 100%)",
  pageBackground: "#ff7a2f",
  buttonColor: "#ffb52e",
  buttonTextColor: "#050505",
};

const SUNSET_PLUM_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #ff7a7a 0%, #f97316 35%, #7c3aed 100%)",
  pageBackground: "#0f172a",
  buttonColor: "#fbbf24",
  buttonTextColor: "#050505",
};

const MINT_CREAM_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #ecfdf3 0%, #a7f3d0 40%, #22c55e 100%)",
  pageBackground: "#022c22",
  buttonColor: "#bbf7d0",
  buttonTextColor: "#022c22",
};

const ULTRA_VIOLET_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #312e81 0%, #4c1d95 45%, #a855f7 100%)",
  pageBackground: "#020617",
  buttonColor: "#f97316",
  buttonTextColor: "#050505",
};

const NOIR_GLASS_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "radial-gradient(circle at 0 0, #27272a 0%, #020617 55%, #000000 100%)",
  pageBackground: "#020617",
  buttonColor: "#e4e4e7",
  buttonTextColor: "#020617",
};

const CANDY_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #fb7185 0%, #f97316 40%, #facc15 85%, #fef3c7 100%)",
  pageBackground: "#0f172a",
  buttonColor: "#facc15",
  buttonTextColor: "#050505",
};

const OCEAN_DEPTHS_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #0ea5e9 0%, #0369a1 40%, #022c22 100%)",
  pageBackground: "#020617",
  buttonColor: "#22c55e",
  buttonTextColor: "#022c22",
};

const SAND_DUNE_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #f97316 0%, #fbbf24 40%, #fde68a 100%)",
  pageBackground: "#292524",
  buttonColor: "#fef3c7",
  buttonTextColor: "#1f2933",
};

const NEON_POP_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #22c55e 0%, #22d3ee 35%, #6366f1 75%, #db2777 100%)",
  pageBackground: "#020617",
  buttonColor: "#a855f7",
  buttonTextColor: "#050505",
};

const MIDNIGHT_BLUR_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "radial-gradient(circle at 10% 0, #0ea5e9 0%, transparent 45%), radial-gradient(circle at 90% 100%, #a855f7 0%, #020617 60%)",
  pageBackground: "#020617",
  buttonColor: "#e5e7eb",
  buttonTextColor: "#020617",
};

const ROSE_CLOUD_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper:
    "linear-gradient(135deg, #fed7e2 0%, #f97373 30%, #fb7185 65%, #fef3c7 100%)",
  pageBackground: "#111827",
  buttonColor: "#fecaca",
  buttonTextColor: "#111827",
};

export const THEME_COLLECTIONS: ThemeCollection[] = [
  {
    id: "clean",
    label: "Clean",
    themes: [
      { id: "blank", name: "Blank", tagline: "Pick your own colour", theme: BLANK_THEME },
      { id: "paper", name: "Paper", tagline: "Warm white, hairline buttons", theme: PAPER },
      { id: "monochrome", name: "Monochrome", tagline: "Black on white, pill buttons", theme: MONOCHROME },
      { id: "fog", name: "Fog", tagline: "Soft grey, quiet and calm", theme: FOG },
      { id: "graphite", name: "Graphite", tagline: "Dark mode, done properly", theme: GRAPHITE },
      { id: "swiss", name: "Swiss", tagline: "Grid-sharp, red accent", theme: SWISS },
    ],
  },
  {
    id: "elegant",
    label: "Elegant",
    themes: [
      { id: "ivory", name: "Ivory", tagline: "Serif, cream, outline", theme: IVORY },
      { id: "noir-gold", name: "Noir & Gold", tagline: "Black tie", theme: NOIR_GOLD },
      { id: "sage", name: "Sage", tagline: "Muted green, editorial", theme: SAGE },
      { id: "champagne", name: "Champagne", tagline: "Warm, soft, premium", theme: CHAMPAGNE },
      { id: "midnight-navy", name: "Midnight Navy", tagline: "Deep navy, cream buttons", theme: MIDNIGHT_NAVY },
      { id: "bordeaux", name: "Bordeaux", tagline: "Wine red, blush outline", theme: BORDEAUX },
    ],
  },
  {
    id: "bold",
    label: "Bold",
    themes: [
      { id: "acid", name: "Acid", tagline: "Black and electric lime", theme: ACID },
      { id: "cobalt", name: "Cobalt", tagline: "One loud blue", theme: COBALT },
      { id: "terracotta", name: "Terracotta", tagline: "Earthy and warm", theme: TERRACOTTA },
      { id: "lavender", name: "Lavender", tagline: "Pastel, light and airy", theme: LAVENDER },
      { id: "aurora", name: "Aurora", tagline: "Teal and violet night sky", theme: AURORA },
    ],
  },
  {
    id: "gradients",
    label: "Gradients",
    themes: [
      { id: "blood-orange", name: "Blood Orange", theme: BLOOD_ORANGE_THEME },
      { id: "sunset-plum", name: "Sunset Plum", theme: SUNSET_PLUM_THEME },
      { id: "mint-cream", name: "Mint Cream", theme: MINT_CREAM_THEME },
      { id: "ultra-violet", name: "Ultra Violet", theme: ULTRA_VIOLET_THEME },
      { id: "noir-glass", name: "Noir Glass", theme: NOIR_GLASS_THEME },
      { id: "candy", name: "Candy", theme: CANDY_THEME },
      { id: "ocean-depths", name: "Ocean Depths", theme: OCEAN_DEPTHS_THEME },
      { id: "sand-dune", name: "Sand Dune", theme: SAND_DUNE_THEME },
      { id: "neon-pop", name: "Neon Pop", theme: NEON_POP_THEME },
      { id: "midnight-blur", name: "Midnight Blur", theme: MIDNIGHT_BLUR_THEME },
      { id: "rose-cloud", name: "Rose Cloud", theme: ROSE_CLOUD_THEME },
    ],
  },
];

export const STANDARD_THEMES: ThemeOption[] = THEME_COLLECTIONS.flatMap((c) => c.themes);

// ---- 90s Pro themes (Win95-ish) ----

export const NINETIES_TEAL_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#006b7f",
  titleColor: "#e1ffe7",
  pageTextColor: "#e1ffe7",
  buttonColor: "#ffffff",
  buttonTextColor: "#000000",
  buttonRadius: 10,
  buttonStyle: "solid",
  buttonShadow: "3d",
  titleFont: "retro",
  pageFont: "retro",
};

export const NINETIES_LIGHT_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#ffffff",
  titleColor: "#111827",
  pageTextColor: "#111827",
  buttonColor: "#ffffff",
  buttonTextColor: "#000000",
  buttonRadius: 10,
  buttonStyle: "solid",
  buttonShadow: "3d",
  titleFont: "retro",
  pageFont: "retro",
};

export const NINETIES_MIDNIGHT_THEME: KCardThemeState = {
  ...DEFAULT_KCARD_THEME,
  wallpaper: "none",
  pageBackground: "#003b34",
  titleColor: "#d7ffe8",
  pageTextColor: "#d7ffe8",
  buttonColor: "#c4ffe4",
  buttonTextColor: "#000000",
  buttonRadius: 10,
  buttonStyle: "solid",
  buttonShadow: "3d",
  titleFont: "retro",
  pageFont: "retro",
};

