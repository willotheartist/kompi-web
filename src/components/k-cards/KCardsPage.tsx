// src/components/k-cards/KCardsPage.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
  Share2,
  UserCircle2,
  Palette,
  Type,
  Square,
  Link2,
  Instagram,
  Youtube,
  Music2,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Globe2,
} from "lucide-react";
import type React from "react";

import { KCardThemeSection } from "./KCardThemeSection";
import {
  DEFAULT_KCARD_THEME,
  type KCardThemeState,
  type KCardButtonStyle,
  type KCardButtonShadow,
  type KCardFontToken,
} from "./kcard-theme-presets";

type DesignSection = "header" | "theme" | "text" | "buttons" | "colors";

const FONT_OPTIONS = [
  { value: "system", label: "System" },
  { value: "serif", label: "Serif" },
  { value: "display", label: "Display" },
];

const BUTTON_STYLES: KCardButtonStyle[] = ["solid", "glass", "outline"];
const BUTTON_SHADOWS: KCardButtonShadow[] = ["none", "soft", "hard"];

type KCardLink = {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
};

const INITIAL_LINKS: KCardLink[] = [
  { id: "1", title: "Portfolio", url: "https://your-site.com", enabled: true },
  { id: "2", title: "Book a call", url: "https://cal.com", enabled: true },
  { id: "3", title: "Shop", url: "https://shop.com", enabled: false },
];

const SOCIAL_ICON_MAP: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Instagram,
  YouTube: Youtube,
  TikTok: Music2,
  Twitter: Facebook, // placeholder
  LinkedIn: Linkedin,
  WhatsApp: MessageCircle,
  Email: Mail,
  Website: Globe2,
};

const SOCIAL_OPTIONS = Object.keys(SOCIAL_ICON_MAP);

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

  // theme — single source of truth for all style tokens
  const [theme, setTheme] = useState<KCardThemeState>(DEFAULT_KCARD_THEME);

  // keep title size as an independent tweak (optional to move into theme later)
  const [titleSize, setTitleSize] = useState<"small" | "large">("small");

  // links
  const [links, setLinks] = useState<KCardLink[]>(INITIAL_LINKS);

  // socials
  const [socials, setSocials] = useState<string[]>([
    "Instagram",
    "YouTube",
    "Website",
  ]);

  const {
    wallpaper,
    pageBackground,
    buttonColor,
    buttonTextColor,
    titleFont,
    pageFont,
    titleColor,
    pageTextColor,
    buttonStyle,
    buttonRadius,
    buttonShadow,
  } = theme;

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
      border: "1px solid transparent",
    };

    if (buttonStyle === "solid") {
      style.backgroundColor = buttonColor;
      style.color = buttonTextColor;
      style.border = "1px solid var(--color-border)";
    } else if (buttonStyle === "glass") {
      style.backgroundColor = "rgba(15,23,42,0.35)";
      style.color = "var(--color-text)";
      style.border = "1px solid var(--color-border)";
      style.backdropFilter = "blur(12px)";
    } else {
      style.backgroundColor = "transparent";
      style.color = buttonColor;
      style.border = `1px solid ${buttonColor}`;
      style.boxShadow = "none";
    }

    return style;
  }, [buttonStyle, buttonRadius, buttonShadow, buttonColor, buttonTextColor]);

  function toggleSocial(name: string) {
    setSocials((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );
  }

  // wrappers so panels mutate the same theme state
  function setPageBackgroundColor(value: string) {
    setTheme((prev: KCardThemeState) => ({
      ...prev,
      pageBackground: value,
    }));
  }

  function setButtonColorValue(value: string) {
    setTheme((prev: KCardThemeState) => ({
      ...prev,
      buttonColor: value,
    }));
  }

  function setButtonTextColorValue(value: string) {
    setTheme((prev: KCardThemeState) => ({
      ...prev,
      buttonTextColor: value,
    }));
  }

  const wallpaperStyle: React.CSSProperties = {
    // Respect design system: flat color only, no gradients
    backgroundColor: pageBackground || wallpaper,
  };

  function updateLink(id: string, patch: Partial<KCardLink>) {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, ...patch } : link
      )
    );
  }

  function addLink() {
    const id = String(Date.now());
    setLinks((prev) => [
      ...prev,
      { id, title: "New link", url: "https://", enabled: true },
    ]);
  }

  const visibleLinks = links.filter((l) => l.enabled);

  return (
    <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8 md:gap-8 md:pb-12">
        {/* Top header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-3xl">
              K-Cards
            </h1>
            <p className="text-sm text-[color:var(--color-subtle)] md:text-base">
              Design your page, preview it, then publish with a single Kompi
              link.
            </p>
          </div>
          <Button className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 text-sm font-semibold text-[color:var(--color-text)] hover:opacity-90">
            <Share2 className="h-4 w-4" />
            Publish K-Card
          </Button>
        </div>

        {/* Main layout: design + preview */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          {/* Design panel */}
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <CardHeader className="border-b border-[var(--color-border)] pb-3">
              <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                Design
              </CardTitle>
              <CardDescription className="text-xs text-[color:var(--color-subtle)]">
                Switch sections on the left. Tweak controls in the center.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-6 pt-4">
              {/* Section nav */}
              <nav className="w-40 shrink-0 space-y-1 border-r border-[var(--color-border)] pr-4">
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

              {/* Section content */}
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
                  <KCardThemeSection value={theme} onChange={setTheme} />
                )}

                {section === "text" && (
                  <TextSection
                    titleFont={titleFont}
                    setTitleFont={(v) =>
                      setTheme((prev) => ({ ...prev, titleFont: v }))
                    }
                    titleColor={titleColor}
                    setTitleColor={(v) =>
                      setTheme((prev) => ({ ...prev, titleColor: v }))
                    }
                    titleSize={titleSize}
                    setTitleSize={setTitleSize}
                    pageFont={pageFont}
                    setPageFont={(v) =>
                      setTheme((prev) => ({ ...prev, pageFont: v }))
                    }
                    pageTextColor={pageTextColor}
                    setPageTextColor={(v) =>
                      setTheme((prev) => ({ ...prev, pageTextColor: v }))
                    }
                  />
                )}

                {section === "buttons" && (
                  <ButtonsSection
                    buttonStyle={buttonStyle}
                    setButtonStyle={(v) =>
                      setTheme((prev) => ({ ...prev, buttonStyle: v }))
                    }
                    buttonRadius={buttonRadius}
                    setButtonRadius={(v) =>
                      setTheme((prev) => ({ ...prev, buttonRadius: v }))
                    }
                    buttonShadow={buttonShadow}
                    setButtonShadow={(v) =>
                      setTheme((prev) => ({ ...prev, buttonShadow: v }))
                    }
                    buttonColor={buttonColor}
                    setButtonColor={setButtonColorValue}
                    buttonTextColor={buttonTextColor}
                    setButtonTextColor={setButtonTextColorValue}
                  />
                )}

                {section === "colors" && (
                  <ColorsSection
                    titleColor={titleColor}
                    setTitleColor={(v) =>
                      setTheme((prev) => ({ ...prev, titleColor: v }))
                    }
                    pageTextColor={pageTextColor}
                    setPageTextColor={(v) =>
                      setTheme((prev) => ({ ...prev, pageTextColor: v }))
                    }
                    buttonColor={buttonColor}
                    setButtonColor={setButtonColorValue}
                    buttonTextColor={buttonTextColor}
                    setButtonTextColor={setButtonTextColorValue}
                  />
                )}

                {/* Social icons */}
                <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs font-medium text-[color:var(--color-text)]">
                    Social icons
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SOCIAL_OPTIONS.map((social) => {
                      const active = socials.includes(social);
                      const Icon = SOCIAL_ICON_MAP[social];
                      return (
                        <button
                          key={social}
                          type="button"
                          onClick={() => toggleSocial(social)}
                          className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[11px] transition",
                            active
                              ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)]"
                              : "border-[var(--color-border)] bg-[var(--color-bg)] text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
                          )}
                          aria-label={social}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live preview */}
          <Card className="flex justify-center border-none bg-transparent shadow-none">
            <CardContent className="flex justify-center pt-0">
              <div className="relative mx-auto h-[620px] w-[340px] rounded-[38px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-x-24 -top-1 h-3 rounded-b-full bg-[var(--color-bg)]" />
                <div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl"
                  style={wallpaperStyle}
                >
                  <div
                    className={cn(
                      "flex h-full w-full flex-col gap-4 p-5",
                      previewBodyFont
                    )}
                  >
                    {/* header */}
                    <div
                      className={cn(
                        "flex flex-col items-center gap-2 text-center",
                        previewTitleFont,
                        titleSize === "large" ? "mt-4" : "mt-2"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]",
                          profileLayout === "classic"
                            ? "h-14 w-14"
                            : "h-18 w-18"
                        )}
                      >
                        <UserCircle2 className="h-7 w-7 text-[color:var(--color-text)]" />
                      </div>
                      <div
                        className={cn(
                          "font-semibold",
                          titleSize === "large" ? "text-base" : "text-sm"
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
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {socials.map((s) => {
                        const Icon = SOCIAL_ICON_MAP[s];
                        return (
                          <span
                            key={s}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg)] text-[color:var(--color-text)]"
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                        );
                      })}
                    </div>

                    {/* links */}
                    <div className="mt-2 space-y-2">
                      {visibleLinks.length === 0 ? (
                        <div className="rounded-full border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-center text-[11px] text-[color:var(--color-subtle)]">
                          Add a link below to see it here.
                        </div>
                      ) : (
                        visibleLinks.slice(0, 5).map((link) => (
                          <button
                            key={link.id}
                            type="button"
                            className="flex w-full items-center justify-center px-4 py-2.5 text-[11px] font-medium transition"
                            style={buttonBaseStyles}
                          >
                            <span className="truncate">
                              {link.title || "Untitled link"}
                            </span>
                          </button>
                        ))
                      )}
                    </div>

                    <div className="mt-auto pt-4 text-center text-[10px] text-[color:var(--color-subtle)]">
                      kompi.app/yourcard · Analytics included
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Links manager */}
        <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-[color:var(--color-text)]">
              <span>Links</span>
              <Button
                type="button"
                size="sm"
                className="h-8 rounded-full border border-[var(--color-border)] bg-[var(--color-accent)] px-3 text-xs font-medium text-[color:var(--color-text)] hover:opacity-90"
                onClick={addLink}
              >
                <Link2 className="mr-1.5 h-3.5 w-3.5" />
                Add link
              </Button>
            </CardTitle>
            <CardDescription className="text-xs text-[color:var(--color-subtle)]">
              Manage the links that appear on this K-Card.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 md:flex-row md:items-center md:gap-4"
              >
                <div className="flex-1 space-y-2">
                  <Input
                    value={link.title}
                    onChange={(e) =>
                      updateLink(link.id, { title: e.target.value })
                    }
                    className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                    placeholder="Link title"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) =>
                      updateLink(link.id, { url: e.target.value })
                    }
                    className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                    placeholder="https://"
                  />
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() =>
                      updateLink(link.id, { enabled: !link.enabled })
                    }
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition",
                      link.enabled
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[color:var(--color-text)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-subtle)]"
                    )}
                  >
                    <span
                      className={cn(
                        "mr-1 h-2 w-2 rounded-full",
                        link.enabled
                          ? "bg-[var(--color-accent)]"
                          : "bg-[var(--color-border)]"
                      )}
                    />
                    {link.enabled ? "On" : "Off"}
                  </button>
                </div>
              </div>
            ))}

            {links.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-6 text-center text-sm text-[color:var(--color-subtle)]">
                No links yet. Click{" "}
                <span className="font-medium">Add link</span> to start
                building your K-Card.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
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
      <p className="text-xs font-medium text-[color:var(--color-text)]">
        Header
      </p>

      <div className="space-y-2">
        <p className="text-[11px] text-[color:var(--color-subtle)]">
          Profile image layout
        </p>
        <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] p-1 text-[11px]">
          <button
            type="button"
            onClick={() => setProfileLayout("classic")}
            className={cn(
              "flex-1 rounded-full px-3 py-1",
              profileLayout === "classic"
                ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                : "text-[color:var(--color-subtle)]"
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
                ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                : "text-[color:var(--color-subtle)]"
            )}
          >
            Hero
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            maxLength={40}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Subtitle
          </label>
          <Textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            maxLength={80}
          />
        </div>
      </div>
    </div>
  );
}

type TextSectionProps = {
  titleFont: KCardFontToken;
  setTitleFont: (v: KCardFontToken) => void;
  titleColor: string;
  setTitleColor: (v: string) => void;
  titleSize: "small" | "large";
  setTitleSize: (v: "small" | "large") => void;
  pageFont: KCardFontToken;
  setPageFont: (v: KCardFontToken) => void;
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
      <p className="text-xs font-medium text-[color:var(--color-text)]">
        Text
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Title font
          </label>
          <Select value={titleFont} onValueChange={setTitleFont}>
            <SelectTrigger className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent className="border border-[var(--color-border)] bg-[var(--color-surface)]">
              {FONT_OPTIONS.map((f) => (
                <SelectItem
                  key={f.value}
                  value={f.value}
                  className="text-xs text-[color:var(--color-text)]"
                >
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Title color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
            />
            <Input
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
              className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            />
          </div>
        </div>
      </div>

      <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Title size
          </label>
          <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] p-1 text-[11px]">
            <button
              type="button"
              onClick={() => setTitleSize("small")}
              className={cn(
                "flex-1 rounded-full px-3 py-1",
                titleSize === "small"
                  ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "text-[color:var(--color-subtle)]"
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
                  ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "text-[color:var(--color-subtle)]"
              )}
            >
              Large
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Page font
          </label>
          <Select value={pageFont} onValueChange={setPageFont}>
            <SelectTrigger className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent className="border border-[var(--color-border)] bg-[var(--color-surface)]">
              {FONT_OPTIONS.map((f) => (
                <SelectItem
                  key={f.value}
                  value={f.value}
                  className="text-xs text-[color:var(--color-text)]"
                >
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[color:var(--color-text)]">
          Page text color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
            value={pageTextColor}
            onChange={(e) => setPageTextColor(e.target.value)}
          />
          <Input
            value={pageTextColor}
            onChange={(e) => setPageTextColor(e.target.value)}
            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
          />
        </div>
      </div>
    </div>
  );
}

type ButtonsSectionProps = {
  buttonStyle: KCardButtonStyle;
  setButtonStyle: (v: KCardButtonStyle) => void;
  buttonRadius: number;
  setButtonRadius: (v: number) => void;
  buttonShadow: KCardButtonShadow;
  setButtonShadow: (v: KCardButtonShadow) => void;
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
      <p className="text-xs font-medium text-[color:var(--color-text)]">
        Buttons
      </p>

      <div className="space-y-1.5">
        <p className="text-[11px] text-[color:var(--color-subtle)]">Style</p>
        <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] p-1 text-[11px]">
          {BUTTON_STYLES.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setButtonStyle(style)}
              className={cn(
                "flex-1 rounded-full px-3 py-1 capitalize",
                buttonStyle === style
                  ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "text-[color:var(--color-subtle)]"
              )}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Corners
          </label>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[color:var(--color-subtle)]">
              Square
            </span>
            <input
              type="range"
              min={4}
              max={30}
              value={buttonRadius}
              onChange={(e) =>
                setButtonRadius(Number(e.target.value))
              }
              className="flex-1 accent-[var(--color-accent)]"
            />
            <span className="text-[11px] text-[color:var(--color-subtle)]">
              Round
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Shadow
          </label>
          <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] p-1 text-[11px]">
            {BUTTON_SHADOWS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setButtonShadow(s)}
                className={cn(
                  "flex-1 rounded-full px-3 py-1 capitalize",
                  buttonShadow === s
                    ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                    : "text-[color:var(--color-subtle)]"
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
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Button color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
            />
            <Input
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[color:var(--color-text)]">
            Button text
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
            />
            <Input
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
              className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type ColorsSectionProps = {
  titleColor: string;
  setTitleColor: (v: string) => void;
  pageTextColor: string;
  setPageTextColor: (v: string) => void;
  buttonColor: string;
  setButtonColor: (v: string) => void;
  buttonTextColor: string;
  setButtonTextColor: (v: string) => void;
};

function ColorsSection({
  titleColor,
  setTitleColor,
  pageTextColor,
  setPageTextColor,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
}: ColorsSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-[color:var(--color-text)]">
        Colors
      </p>

      <div className="grid gap-3 md:grid-cols-2">
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
          value={buttonTextColor}
          onChange={setButtonTextColor}
        />
      </div>
    </div>
  );
}

/* ---------- Shared bits ---------- */

type SectionButtonProps = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  onClick: () => void;
};

function SectionButton({
  label,
  icon: Icon,
  active,
  onClick,
}: SectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-xs transition-colors",
        active
          ? "bg-[var(--color-text)] text-[var(--color-bg)]"
          : "text-[color:var(--color-subtle)] hover:bg-[var(--color-bg)]"
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
};

function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[color:var(--color-text)]">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
        />
      </div>
    </div>
  );
}
