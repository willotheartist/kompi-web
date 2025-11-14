"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Smartphone,
  Share2,
  Link2,
  UserCircle2,
  Palette,
  Type,
  Square,
} from "lucide-react";

type DesignSection = "header" | "theme" | "text" | "buttons" | "colors";

type ThemePreset = {
  id: string;
  name: string;
  wallpaper: string;
  background: string;
  buttonColor: string;
  buttonTextColor: string;
};

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "custom",
    name: "Custom",
    wallpaper:
      "linear-gradient(135deg, #0f172a 0%, #020617 40%, #22c55e 100%)",
    background: "#020617",
    buttonColor: "#0f172a",
    buttonTextColor: "#f9fafb",
  },
  {
    id: "neon",
    name: "Neon",
    wallpaper: "linear-gradient(135deg,#22c55e,#a855f7,#f97316)",
    background: "#020617",
    buttonColor: "#020617",
    buttonTextColor: "#f9fafb",
  },
  {
    id: "sunset",
    name: "Sunset",
    wallpaper: "linear-gradient(135deg,#f97316,#ec4899,#6366f1)",
    background: "#020617",
    buttonColor: "#020617",
    buttonTextColor: "#fefce8",
  },
  {
    id: "air",
    name: "Air",
    wallpaper: "linear-gradient(135deg,#e0f2fe,#e5e7eb,#f9fafb)",
    background: "#ffffff",
    buttonColor: "#020617",
    buttonTextColor: "#f9fafb",
  },
];

const FONT_OPTIONS = [
  { value: "system", label: "System" },
  { value: "serif", label: "Serif" },
  { value: "display", label: "Display" },
];

const SOCIAL_OPTIONS = [
  "Instagram",
  "YouTube",
  "TikTok",
  "Twitter",
  "LinkedIn",
  "WhatsApp",
  "Email",
  "Website",
];

const BUTTON_STYLES = ["solid", "glass", "outline"] as const;
type ButtonStyle = (typeof BUTTON_STYLES)[number];

export default function KCardsPage() {
  const [section, setSection] = useState<DesignSection>("header");

  // header
  const [profileLayout, setProfileLayout] = useState<"classic" | "hero">(
    "classic"
  );
  const [title, setTitle] = useState("@yourname");
  const [subtitle, setSubtitle] = useState(
    "Designer · Creator · Founder"
  );

  // theme / wallpaper
  const [themeId, setThemeId] = useState<string>("neon");
  const activeTheme =
    THEME_PRESETS.find((t) => t.id === themeId) ?? THEME_PRESETS[0];

  const [wallpaper, setWallpaper] = useState<string>(activeTheme.wallpaper);
  const [pageBackground, setPageBackground] = useState<string>(
    activeTheme.background
  );

  // text
  const [titleFont, setTitleFont] = useState<string>("display");
  const [titleColor, setTitleColor] = useState<string>("#f9fafb");
  const [titleSize, setTitleSize] = useState<"small" | "large">("small");
  const [pageFont, setPageFont] = useState<string>("system");
  const [pageTextColor, setPageTextColor] = useState<string>("#e5e7eb");

  // socials
  const [socials, setSocials] = useState<string[]>([
    "Instagram",
    "YouTube",
    "Website",
  ]);

  // buttons
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>("solid");
  const [buttonRadius, setButtonRadius] = useState<number>(22);
  const [buttonShadow, setButtonShadow] = useState<"none" | "soft" | "hard">(
    "soft"
  );
  const [buttonColor, setButtonColor] = useState<string>(
    activeTheme.buttonColor
  );
  const [buttonTextColor, setButtonTextColor] = useState<string>(
    activeTheme.buttonTextColor
  );

  // colors section shortcuts
  const [wallpaperColorOverride, setWallpaperColorOverride] =
    useState<string>("");
  const [buttonTextColorOverride, setButtonTextColorOverride] =
    useState<string>("");

  const previewTitleFont = useMemo(() => {
    switch (titleFont) {
      case "serif":
        return "font-serif";
      case "display":
        return "font-semibold tracking-tight";
      default:
        return "font-sans";
    }
  }, [titleFont]);

  const previewBodyFont = useMemo(() => {
    switch (pageFont) {
      case "serif":
        return "font-serif";
      case "display":
        return "font-semibold tracking-tight";
      default:
        return "font-sans";
    }
  }, [pageFont]);

  const buttonBaseStyles = useMemo(() => {
    const style: React.CSSProperties = {
      borderRadius: buttonRadius,
      boxShadow:
        buttonShadow === "none"
          ? "none"
          : buttonShadow === "soft"
          ? "0 6px 14px rgba(15,23,42,0.35)"
          : "0 10px 24px rgba(15,23,42,0.6)",
    };

    if (buttonStyle === "solid") {
      style.backgroundColor = buttonColor;
      style.color = buttonTextColorOverride || buttonTextColor;
      style.border = "1px solid rgba(15,23,42,0.65)";
    } else if (buttonStyle === "glass") {
      style.backgroundColor = "rgba(15,23,42,0.35)";
      style.color = buttonTextColorOverride || "#f9fafb";
      style.border = "1px solid rgba(148,163,184,0.4)";
      style.backdropFilter = "blur(12px)";
    } else {
      style.backgroundColor = "transparent";
      style.color = buttonColor;
      style.border = `1px solid ${buttonColor}`;
      style.boxShadow = "none";
    }

    return style;
  }, [
    buttonStyle,
    buttonRadius,
    buttonShadow,
    buttonColor,
    buttonTextColor,
    buttonTextColorOverride,
  ]);

  function toggleSocial(name: string) {
    setSocials((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );
  }

  function applyTheme(theme: ThemePreset) {
    setThemeId(theme.id);
    setWallpaper(theme.wallpaper);
    setPageBackground(theme.background);
    setButtonColor(theme.buttonColor);
    setButtonTextColor(theme.buttonTextColor);
    setWallpaperColorOverride("");
    setButtonTextColorOverride("");
  }

  const wallpaperStyle: React.CSSProperties = {
    background:
      wallpaperColorOverride || wallpaper || activeTheme.wallpaper,
  };

  return (
    <div className="space-y-6">
      {/* Top header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            K-Cards
          </h1>
          <p className="text-sm text-slate-400">
            Design your page, preview it, then publish with a single Kompi
            link.
          </p>
        </div>
        <Button className="bg-slate-100 text-slate-950 hover:bg-white">
          <Share2 className="h-4 w-4 mr-2" />
          Publish K-Card
        </Button>
      </div>

      {/* Layout: design panel + preview */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start">
        {/* Design panel */}
        <Card className="bg-slate-950/80 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-100">
              Design
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Switch sections on the left. Tweak controls in the center.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6">
            {/* Left section nav */}
            <nav className="w-40 shrink-0 space-y-1 border-r border-slate-800 pr-4">
              <SectionButton
                label="Header"
                icon={UserCircle2}
                active={section === "header"}
                onClick={() => setSection("header")}
              />
              <SectionButton
                label="Theme"
                icon={Palette}
                active={section === "theme"}
                onClick={() => setSection("theme")}
              />
              <SectionButton
                label="Text"
                icon={Type}
                active={section === "text"}
                onClick={() => setSection("text")}
              />
              <SectionButton
                label="Buttons"
                icon={Square}
                active={section === "buttons"}
                onClick={() => setSection("buttons")}
              />
              <SectionButton
                label="Colors"
                icon={Palette}
                active={section === "colors"}
                onClick={() => setSection("colors")}
              />
            </nav>

            {/* Right section content */}
            <div className="flex-1 space-y-6">
              {section === "header" && (
                <HeaderSection
                  profileLayout={profileLayout}
                  setProfileLayout={setProfileLayout}
                  title={title}
                  setTitle={setTitle}
                  subtitle={subtitle}
                  setSubtitle={setSubtitle}
                />
              )}

              {section === "theme" && (
                <ThemeSection
                  themeId={themeId}
                  wallpaper={wallpaper}
                  pageBackground={pageBackground}
                  onWallpaperChange={setWallpaper}
                  onBackgroundChange={setPageBackground}
                  activeTheme={activeTheme}
                  onApplyTheme={applyTheme}
                />
              )}

              {section === "text" && (
                <TextSection
                  titleFont={titleFont}
                  setTitleFont={setTitleFont}
                  titleColor={titleColor}
                  setTitleColor={setTitleColor}
                  titleSize={titleSize}
                  setTitleSize={setTitleSize}
                  pageFont={pageFont}
                  setPageFont={setPageFont}
                  pageTextColor={pageTextColor}
                  setPageTextColor={setPageTextColor}
                />
              )}

              {section === "buttons" && (
                <ButtonsSection
                  buttonStyle={buttonStyle}
                  setButtonStyle={setButtonStyle}
                  buttonRadius={buttonRadius}
                  setButtonRadius={setButtonRadius}
                  buttonShadow={buttonShadow}
                  setButtonShadow={setButtonShadow}
                  buttonColor={buttonColor}
                  setButtonColor={setButtonColor}
                  buttonTextColor={buttonTextColor}
                  setButtonTextColor={setButtonTextColor}
                />
              )}

              {section === "colors" && (
                <ColorsSection
                  wallpaperColorOverride={wallpaperColorOverride}
                  setWallpaperColorOverride={setWallpaperColorOverride}
                  titleColor={titleColor}
                  setTitleColor={setTitleColor}
                  pageTextColor={pageTextColor}
                  setPageTextColor={setPageTextColor}
                  buttonColor={buttonColor}
                  setButtonColor={setButtonColor}
                  buttonTextColorOverride={buttonTextColorOverride}
                  setButtonTextColorOverride={setButtonTextColorOverride}
                />
              )}

              {/* Social icons live in every design tab */}
              <div className="space-y-3 border-t border-slate-800 pt-4">
                <p className="text-xs font-medium text-slate-300">
                  Social icons
                </p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_OPTIONS.map((social) => {
                    const active = socials.includes(social);
                    return (
                      <button
                        key={social}
                        type="button"
                        onClick={() => toggleSocial(social)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] transition",
                          active
                            ? "border-slate-100 bg-slate-100 text-slate-950"
                            : "border-slate-700 bg-slate-900/40 text-slate-200 hover:border-slate-400"
                        )}
                      >
                        <Link2 className="h-3 w-3" />
                        <span>{social}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live preview */}
        <Card className="bg-slate-950/80 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <Smartphone className="h-4 w-4 text-slate-400" />
              Live preview
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              How your K-Card looks on mobile.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative mx-auto h-[480px] w-[260px] rounded-[30px] border border-slate-800 bg-slate-900/90 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-x-16 -top-1 h-3 rounded-b-full bg-slate-900" />
              <div
                className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-900"
                style={wallpaperStyle}
              >
                <div
                  className={cn(
                    "flex-1 p-4",
                    previewBodyFont,
                    "flex flex-col gap-3"
                  )}
                  style={{ backgroundColor: pageBackground }}
                >
                  {/* header */}
                  <div
                    className={cn(
                      "flex flex-col items-center gap-2 text-center text-[11px]",
                      previewTitleFont,
                      titleSize === "large" ? "mt-3" : "mt-1"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-full border border-white/20 bg-black/10",
                        profileLayout === "classic"
                          ? "h-12 w-12"
                          : "h-16 w-16"
                      )}
                    >
                      <UserCircle2 className="h-7 w-7 text-white/80" />
                    </div>
                    <div
                      className={cn(
                        "font-semibold",
                        titleSize === "large" ? "text-sm" : "text-[13px]"
                      )}
                      style={{ color: titleColor }}
                    >
                      {title || "@yourname"}
                    </div>
                    <div
                      className="text-[11px]"
                      style={{ color: pageTextColor }}
                    >
                      {subtitle || "Short bio line for your card."}
                    </div>
                  </div>

                  {/* socials */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {socials.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 rounded-full bg-black/10 px-2 py-1 text-[10px] text-slate-100/90"
                      >
                        <Link2 className="h-3 w-3" />
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* buttons */}
                  <div className="mt-2 space-y-2">
                    {["Primary link", "Second link", "Third link"].map(
                      (label, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="flex w-full items-center justify-center px-3 py-2 text-[11px] font-medium transition"
                          style={buttonBaseStyles}
                        >
                          {label}
                        </button>
                      )
                    )}
                  </div>

                  <div className="mt-auto pt-3 text-center text-[10px] text-slate-400">
                    kompi.app/yourcard · Analytics included
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Sections ---------- */

type HeaderSectionProps = {
  profileLayout: "classic" | "hero";
  setProfileLayout: (v: "classic" | "hero") => void;
  title: string;
  setTitle: (v: string) => void;
  subtitle: string;
  setSubtitle: (v: string) => void;
};

function HeaderSection({
  profileLayout,
  setProfileLayout,
  title,
  setTitle,
  subtitle,
  setSubtitle,
}: HeaderSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-slate-300">Header</p>

      <div className="space-y-2">
        <p className="text-[11px] text-slate-400">Profile image layout</p>
        <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/60 p-1 text-[11px]">
          <button
            type="button"
            onClick={() => setProfileLayout("classic")}
            className={cn(
              "flex-1 rounded-full px-3 py-1",
              profileLayout === "classic"
                ? "bg-slate-100 text-slate-950"
                : "text-slate-300"
            )}
          >
            Classic
          </button>
          <button
            type="button"
            onClick={() => setProfileLayout("hero")}
            className={cn(
              "flex-1 rounded-full px-3 py-1",
              profileLayout === "hero"
                ? "bg-slate-100 text-slate-950"
                : "text-slate-300"
            )}
          >
            Hero
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-900/80 border-slate-700 text-sm text-slate-100 placeholder:text-slate-500"
            maxLength={40}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Subtitle
          </label>
          <Textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="bg-slate-900/80 border-slate-700 text-sm text-slate-100 placeholder:text-slate-500"
            maxLength={80}
          />
        </div>
      </div>
    </div>
  );
}

type ThemeSectionProps = {
  themeId: string;
  wallpaper: string;
  pageBackground: string;
  onWallpaperChange: (v: string) => void;
  onBackgroundChange: (v: string) => void;
  activeTheme: ThemePreset;
  onApplyTheme: (t: ThemePreset) => void;
};

function ThemeSection({
  themeId,
  wallpaper,
  pageBackground,
  onWallpaperChange,
  onBackgroundChange,
  activeTheme,
  onApplyTheme,
}: ThemeSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-slate-300">Theme</p>

      <div className="grid gap-3 sm:grid-cols-4">
        {THEME_PRESETS.map((theme) => {
          const active = theme.id === themeId;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onApplyTheme(theme)}
              className={cn(
                "flex flex-col gap-2 rounded-2xl border p-2 text-left text-[11px] transition",
                active
                  ? "border-slate-100 bg-slate-900"
                  : "border-slate-700 bg-slate-900/40 hover:border-slate-400"
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

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Wallpaper
          </label>
          <Input
            value={wallpaper}
            onChange={(e) => onWallpaperChange(e.target.value)}
            className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
          />
          <p className="text-[10px] text-slate-500">
            Accepts CSS gradients or solid hex colors.
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Page background
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
              value={pageBackground}
              onChange={(e) => onBackgroundChange(e.target.value)}
            />
            <Input
              value={pageBackground}
              onChange={(e) => onBackgroundChange(e.target.value)}
              className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <p className="text-[10px] text-slate-500">
        Theme presets are a starting point — fine-tune everything in Text,
        Buttons and Colors.
      </p>
    </div>
  );
}

type TextSectionProps = {
  titleFont: string;
  setTitleFont: (v: string) => void;
  titleColor: string;
  setTitleColor: (v: string) => void;
  titleSize: "small" | "large";
  setTitleSize: (v: "small" | "large") => void;
  pageFont: string;
  setPageFont: (v: string) => void;
  pageTextColor: string;
  setPageTextColor: (v: string) => void;
};

function TextSection({
  titleFont,
  setTitleFont,
  titleColor,
  setTitleColor,
  titleSize,
  setTitleSize,
  pageFont,
  setPageFont,
  pageTextColor,
  setPageTextColor,
}: TextSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-slate-300">Text</p>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Title font
          </label>
          <Select value={titleFont} onValueChange={setTitleFont}>
            <SelectTrigger className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {FONT_OPTIONS.map((f) => (
                <SelectItem
                  key={f.value}
                  value={f.value}
                  className="text-xs text-slate-100"
                >
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Title color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
            />
            <Input
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
              className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] items-center">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Title size
          </label>
          <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/60 p-1 text-[11px]">
            <button
              type="button"
              onClick={() => setTitleSize("small")}
              className={cn(
                "flex-1 rounded-full px-3 py-1",
                titleSize === "small"
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-300"
              )}
            >
              Small
            </button>
            <button
              type="button"
              onClick={() => setTitleSize("large")}
              className={cn(
                "flex-1 rounded-full px-3 py-1",
                titleSize === "large"
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-300"
              )}
            >
              Large
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Page font
          </label>
          <Select value={pageFont} onValueChange={setPageFont}>
            <SelectTrigger className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {FONT_OPTIONS.map((f) => (
                <SelectItem
                  key={f.value}
                  value={f.value}
                  className="text-xs text-slate-100"
                >
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300">
          Page text color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
            value={pageTextColor}
            onChange={(e) => setPageTextColor(e.target.value)}
          />
          <Input
            value={pageTextColor}
            onChange={(e) => setPageTextColor(e.target.value)}
            className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
          />
        </div>
      </div>
    </div>
  );
}

type ButtonsSectionProps = {
  buttonStyle: ButtonStyle;
  setButtonStyle: (v: ButtonStyle) => void;
  buttonRadius: number;
  setButtonRadius: (v: number) => void;
  buttonShadow: "none" | "soft" | "hard";
  setButtonShadow: (v: "none" | "soft" | "hard") => void;
  buttonColor: string;
  setButtonColor: (v: string) => void;
  buttonTextColor: string;
  setButtonTextColor: (v: string) => void;
};

function ButtonsSection({
  buttonStyle,
  setButtonStyle,
  buttonRadius,
  setButtonRadius,
  buttonShadow,
  setButtonShadow,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
}: ButtonsSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-slate-300">Buttons</p>

      <div className="space-y-1.5">
        <p className="text-[11px] text-slate-400">Style</p>
        <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/60 p-1 text-[11px]">
          {BUTTON_STYLES.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setButtonStyle(style)}
              className={cn(
                "flex-1 rounded-full px-3 py-1 capitalize",
                buttonStyle === style
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-300"
              )}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Corners
          </label>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500">Square</span>
            <input
              type="range"
              min={4}
              max={30}
              value={buttonRadius}
              onChange={(e) =>
                setButtonRadius(Number(e.target.value))
              }
              className="flex-1"
            />
            <span className="text-[11px] text-slate-500">Round</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Shadow
          </label>
          <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/60 p-1 text-[11px]">
            {["none", "soft", "hard"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  setButtonShadow(s as "none" | "soft" | "hard")
                }
                className={cn(
                  "flex-1 rounded-full px-3 py-1 capitalize",
                  buttonShadow === s
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Button color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
            />
            <Input
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Button text
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
            />
            <Input
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
              className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type ColorsSectionProps = {
  wallpaperColorOverride: string;
  setWallpaperColorOverride: (v: string) => void;
  titleColor: string;
  setTitleColor: (v: string) => void;
  pageTextColor: string;
  setPageTextColor: (v: string) => void;
  buttonColor: string;
  setButtonColor: (v: string) => void;
  buttonTextColorOverride: string;
  setButtonTextColorOverride: (v: string) => void;
};

function ColorsSection({
  wallpaperColorOverride,
  setWallpaperColorOverride,
  titleColor,
  setTitleColor,
  pageTextColor,
  setPageTextColor,
  buttonColor,
  setButtonColor,
  buttonTextColorOverride,
  setButtonTextColorOverride,
}: ColorsSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-slate-300">Colors</p>

      <div className="grid gap-3 md:grid-cols-2">
        <ColorField
          label="Wallpaper"
          value={wallpaperColorOverride}
          onChange={setWallpaperColorOverride}
          allowEmpty
        />
        <ColorField
          label="Title"
          value={titleColor}
          onChange={setTitleColor}
        />
        <ColorField
          label="Page text"
          value={pageTextColor}
          onChange={setPageTextColor}
        />
        <ColorField
          label="Buttons"
          value={buttonColor}
          onChange={setButtonColor}
        />
        <ColorField
          label="Button text"
          value={buttonTextColorOverride}
          onChange={setButtonTextColorOverride}
          allowEmpty
        />
      </div>
    </div>
  );
}

/* ---------- Reusable bits ---------- */

type SectionButtonProps = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  onClick: () => void;
};

function SectionButton({ label, icon: Icon, active, onClick }: SectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs",
        "transition-colors",
        active
          ? "bg-slate-100 text-slate-950"
          : "text-slate-300 hover:bg-slate-900/70"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  allowEmpty?: boolean;
};

function ColorField({ label, value, onChange, allowEmpty }: ColorFieldProps) {
  const displayValue = value || "";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-300">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
          value={displayValue || "#000000"}
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          value={displayValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={allowEmpty ? "Inherit" : "#000000"}
          className="bg-slate-900/80 border-slate-700 text-xs text-slate-100 placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}
