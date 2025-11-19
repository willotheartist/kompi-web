// src/components/k-cards/KCardsPage.tsx
"use client";

import {
  useMemo,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from "react";

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
  UploadCloud,
} from "lucide-react";

import type React from "react";

import { KCardThemeSection } from "./KCardThemeSection";
import { KCardPreview } from "./KCardPreview";
import {
  DEFAULT_KCARD_THEME,
  type KCardThemeState,
  type KCardButtonStyle,
  type KCardButtonShadow,
  type KCardFontToken,
} from "./kcard-theme-presets";

type DesignSection = "header" | "theme" | "text" | "buttons" | "colors" | "links";

const SECTION_LABELS: Record<DesignSection, string> = {
  header: "Header",
  theme: "Theme",
  text: "Text",
  buttons: "Buttons",
  colors: "Colors",
  links: "Links",
};

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

type SaveStatus = "idle" | "saving" | "saved" | "error";

export type KCardsInitialData = {
  profileLayout?: "classic" | "hero";
  title?: string;
  subtitle?: string;
  titleSize?: "small" | "large";
  theme?: KCardThemeState;
  links?: KCardLink[];
  socials?: string[];
  avatarDataUrl?: string | null;
};

type KCardsPageProps = {
  initialData?: KCardsInitialData | null;
};

export default function KCardsPage({ initialData }: KCardsPageProps) {
  // which section is currently "active" for the left nav
  const [activeSection, setActiveSection] = useState<DesignSection>("header");

  // refs for scroll + intersection observer
  const headerRef = useRef<HTMLElement | null>(null);
  const themeRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLElement | null>(null);
  const buttonsRef = useRef<HTMLElement | null>(null);
  const colorsRef = useRef<HTMLElement | null>(null);
  const linksRef = useRef<HTMLElement | null>(null);

  const sectionRefs: Record<
    DesignSection,
    React.RefObject<HTMLElement | null>
  > = {
    header: headerRef,
    theme: themeRef,
    text: textRef,
    buttons: buttonsRef,
    colors: colorsRef,
    links: linksRef,
  };

  // header
  const [profileLayout, setProfileLayout] = useState<"classic" | "hero">(
    initialData?.profileLayout === "hero" ? "hero" : "classic"
  );
  const [title, setTitle] = useState(initialData?.title ?? "@yourname");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle ?? "Designer · Creator · Founder");

  // profile image – persisted as data URL in K-Card JSON
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(
    initialData?.avatarDataUrl ?? null
  );
  const avatarPreview = avatarDataUrl;

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setAvatarDataUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setAvatarDataUrl(result);
      }
    };
    reader.readAsDataURL(file);
  }

  // theme — single source of truth for all style tokens
  const [theme, setTheme] = useState<KCardThemeState>(
    (initialData?.theme as KCardThemeState | undefined) ?? DEFAULT_KCARD_THEME
  );

  // keep title size as an independent tweak
  const [titleSize, setTitleSize] = useState<"small" | "large">(
    initialData?.titleSize === "large" ? "large" : "small"
  );

  // links
  const [links, setLinks] = useState<KCardLink[]>(
    (initialData?.links as KCardLink[] | undefined) ?? INITIAL_LINKS
  );

  // socials
  const [socials, setSocials] = useState<string[]>(
    initialData?.socials ?? ["Instagram", "YouTube", "Website"]
  );

  // autosave state
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialLoadRef = useRef(true);

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
  }, [buttonStyle, buttonRadius, buttonShadow, buttonColor, buttonTextColor]);

  function toggleSocial(name: string) {
    setSocials((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );
  }

  // wrappers so panels mutate the same theme state
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
    background: wallpaper,
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

  // -------- Autosave whenever relevant state changes --------
  useEffect(() => {
    if (isInitialLoadRef.current) {
      return;
    }

    const payload = {
      profileLayout,
      title,
      subtitle,
      titleSize,
      theme,
      links,
      socials,
      avatarDataUrl,
    };

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus("saving");

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/k-cards", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to save K-Card");

        setSaveStatus("saved");
        setLastSavedAt(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Failed to autosave K-Card", err);
        setSaveStatus("error");
      }
    }, 800);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [profileLayout, title, subtitle, titleSize, theme, links, socials, avatarDataUrl]);

  // IntersectionObserver for auto-highlight in the sections list
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Track which section is most visible
        let bestId: DesignSection | null = null;
        let bestRatio = 0;

        entries.forEach((entry) => {
          const idAttr = entry.target.getAttribute("data-section-id");
          const id = idAttr as DesignSection | null;
          if (!id) return;

          const ratio = entry.intersectionRatio;

          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        // Only update when a section is meaningfully visible
        if (bestId && bestRatio > 0.2) {
          setActiveSection(bestId);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6],
      }
    );

    (Object.keys(sectionRefs) as DesignSection[]).forEach((key) => {
      const el = sectionRefs[key].current;
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  function scrollToSection(id: DesignSection) {
    const el = sectionRefs[id].current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className="wf-dashboard-main w-full"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* LEFT: Sections list */}
        <aside className="hidden w-40 shrink-0 lg:block">
          <div className="sticky top-20">
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ color: "var(--color-subtle)" }}
            >
              Sections
            </p>
            <nav className="space-y-1">
              {(Object.keys(SECTION_LABELS) as DesignSection[]).map((id) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-full px-3 py-1.5 text-left text-xs transition",
                      active
                        ? "bg-[var(--color-accent-soft)]"
                        : "hover:bg-[var(--color-surface)]"
                    )}
                    style={{
                      color: active
                        ? "var(--color-text)"
                        : "var(--color-subtle)",
                    }}
                  >
                    <span>{SECTION_LABELS[id]}</span>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: active
                          ? "var(--color-accent)"
                          : "transparent",
                      }}
                    />
                  </button>
                );
              })}
            </nav>
            {/* Tiny save indicator */}
            <div
              className="mt-4 text-[11px]"
              style={{ color: "var(--color-subtle)" }}
            >
              {saveStatus === "saving" && "Saving…"}
              {saveStatus === "saved" &&
                (lastSavedAt ? `Saved ${lastSavedAt}` : "Saved")}
              {saveStatus === "error" && "Error saving – changes kept locally"}
            </div>
          </div>
        </aside>

        {/* MIDDLE + RIGHT */}
        <div className="flex w-full flex-1 gap-8">
          {/* MIDDLE: editor stack */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* Header section */}
            <section
              ref={headerRef}
              data-section-id="header"
              className="scroll-mt-24"
            >
              <Card
                className="rounded-2xl shadow-sm"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[var(--color-text)]">
                    Header
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Profile layout, avatar, title and subtitle for your K-Card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <HeaderSection
                    profileLayout={profileLayout}
                    setProfileLayout={setProfileLayout}
                    title={title}
                    setTitle={setTitle}
                    subtitle={subtitle}
                    setSubtitle={setSubtitle}
                    onAvatarChange={handleAvatarChange}
                    avatarPreview={avatarPreview}
                  />
                </CardContent>
              </Card>
            </section>

            {/* Theme section */}
            <section
              ref={themeRef}
              data-section-id="theme"
              className="scroll-mt-24"
            >
              <Card
                className="rounded-2xl shadow-sm"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[var(--color-text)]">
                    Theme
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Background and overall visual style.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <KCardThemeSection value={theme} onChange={setTheme} />
                </CardContent>
              </Card>
            </section>

            {/* Text section */}
            <section
              ref={textRef}
              data-section-id="text"
              className="scroll-mt-24"
            >
              <Card
                className="rounded-2xl shadow-sm"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[var(--color-text)]">
                    Text
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Typography and text colors for your K-Card.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </section>

            {/* Buttons section */}
            <section
              ref={buttonsRef}
              data-section-id="buttons"
              className="scroll-mt-24"
            >
              <Card
                className="rounded-2xl shadow-sm"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[var(--color-text)]">
                    Buttons
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Shape, shadow and colors for your primary links.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </section>

            {/* Colors section */}
            <section
              ref={colorsRef}
              data-section-id="colors"
              className="scroll-mt-24"
            >
              <Card
                className="rounded-2xl shadow-sm"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[var(--color-text)]">
                    Colors
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Fine-tune title, text and button colors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </section>

            {/* Links manager */}
            <section
              ref={linksRef}
              data-section-id="links"
              className="scroll-mt-24"
            >
              <Card
                className="rounded-2xl shadow-sm"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm font-semibold text-[var(--color-text)]">
                    <span>Links</span>
                    <Button
                      type="button"
                      size="sm"
                      className="inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs font-medium"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-text)",
                      }}
                      onClick={addLink}
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      Add link
                    </Button>
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Manage the links that appear on this K-Card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {links.map((link) => (
                    <div
                      key={link.id}
                      className="flex flex-col gap-2 rounded-2xl px-4 py-3 md:flex-row md:items-center md:gap-0"
                      style={{ backgroundColor: "var(--color-bg)" }}
                    >
                      <div className="flex-1 space-y-2">
                        <Input
                          value={link.title}
                          onChange={(e) =>
                            updateLink(link.id, { title: e.target.value })
                          }
                          className="h-9 rounded-2xl text-sm"
                          style={{
                            backgroundColor: "var(--color-surface)",
                            color: "var(--color-text)",
                            borderColor: "var(--color-border)",
                          }}
                          placeholder="Link title"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) =>
                            updateLink(link.id, { url: e.target.value })
                          }
                          className="h-9 rounded-2xl text-xs"
                          style={{
                            backgroundColor: "var(--color-surface)",
                            color: "var(--color-text)",
                            borderColor: "var(--color-border)",
                          }}
                          placeholder="https://"
                        />
                      </div>
                      <div className="mt-1 flex items-center gap-2 self-start md:mt-0 md:self-auto">
                        <button
                          type="button"
                          onClick={() =>
                            updateLink(link.id, { enabled: !link.enabled })
                          }
                          className={cn(
                            "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition"
                          )}
                          style={{
                            border: "1px solid var(--color-border)",
                            backgroundColor: link.enabled
                              ? "var(--color-accent-soft)"
                              : "var(--color-surface)",
                            color: link.enabled
                              ? "var(--color-text)"
                              : "var(--color-subtle)",
                          }}
                        >
                          <span
                            className={cn("mr-1 h-2 w-2 rounded-full")}
                            style={{
                              backgroundColor: link.enabled
                                ? "var(--color-accent)"
                                : "var(--color-border)",
                            }}
                          />
                          {link.enabled ? "On" : "Off"}
                        </button>
                      </div>
                    </div>
                  ))}

                  {links.length === 0 && (
                    <div
                      className="rounded-2xl border border-dashed px-4 py-6 text-center text-sm"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-bg)",
                        color: "var(--color-subtle)",
                      }}
                    >
                      No links yet. Click{" "}
                      <span className="font-medium">Add link</span> to start
                      building your K-Card.
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* RIGHT: Frozen preview (320 × 680, responsive) */}
          <aside className="hidden w-[360px] shrink-0 lg:block">
            <div className="sticky top-20 flex justify-end">
              <KCardPreview
                wallpaperStyle={wallpaperStyle}
                pageBackground={pageBackground}
                previewTitleFont={previewTitleFont}
                previewBodyFont={previewBodyFont}
                title={title}
                subtitle={subtitle}
                titleColor={titleColor}
                pageTextColor={pageTextColor}
                titleSize={titleSize}
                profileLayout={profileLayout}
                avatarPreview={avatarPreview}
                socials={socials}
                socialIconMap={SOCIAL_ICON_MAP}
                visibleLinks={visibleLinks}
                buttonBaseStyles={buttonBaseStyles}
              />
            </div>
          </aside>
        </div>
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
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  avatarPreview: string | null;
};

function HeaderSection({
  profileLayout,
  setProfileLayout,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  onAvatarChange,
  avatarPreview,
}: HeaderSectionProps) {
  return (
    <div className="space-y-6">
      {/* Avatar upload */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg)]">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Profile preview"
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <UserCircle2 className="h-7 w-7" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-[var(--color-text)]">
            Profile image
          </p>
          <p
            className="text-[11px]"
            style={{ color: "var(--color-subtle)" }}
          >
            Upload an avatar for this K-Card. Square images work best.
          </p>
          <div className="flex items-center gap-2">
            <label>
              <span
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                }}
              >
                <UploadCloud className="h-3.5 w-3.5" />
                Upload image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onAvatarChange}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Layout toggle */}
      <div className="space-y-2">
        <p className="text-[11px] text-[var(--color-subtle)]">
          Profile image layout
        </p>
        <div className="inline-flex rounded-full bg-[var(--color-bg)] p-1 text-[11px]">
          <button
            type="button"
            onClick={() => setProfileLayout("classic")}
            className={cn(
              "flex-1 rounded-full px-3 py-1",
              profileLayout === "classic"
                ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                : "text-[var(--color-subtle)]"
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
                : "text-[var(--color-subtle)]"
            )}
          >
            Hero
          </button>
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-9 rounded-2xl text-sm"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
              borderColor: "var(--color-border)",
            }}
            maxLength={40}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Subtitle
          </label>
          <Textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="rounded-2xl text-sm"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
              borderColor: "var(--color-border)",
            }}
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
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Title font
          </label>
          <Select value={titleFont} onValueChange={setTitleFont}>
            <SelectTrigger
              className="h-9 rounded-2xl text-xs"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            >
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent
              className="text-xs"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              {FONT_OPTIONS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Title color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded bg-transparent"
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
            />
            <Input
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
              className="h-9 rounded-2xl text-xs"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Title size
          </label>
          <div className="inline-flex rounded-full bg-[var(--color-bg)] p-1 text-[11px]">
            <button
              type="button"
              onClick={() => setTitleSize("small")}
              className={cn(
                "flex-1 rounded-full px-3 py-1",
                titleSize === "small"
                  ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "text-[var(--color-subtle)]"
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
                  : "text-[var(--color-subtle)]"
              )}
            >
              Large
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Page font
          </label>
          <Select value={pageFont} onValueChange={setPageFont}>
            <SelectTrigger
              className="h-9 rounded-2xl text-xs"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            >
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent
              className="text-xs"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              {FONT_OPTIONS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[var(--color-text)]">
          Page text color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="h-8 w-10 cursor-pointer rounded bg-transparent"
            value={pageTextColor}
            onChange={(e) => setPageTextColor(e.target.value)}
          />
          <Input
            value={pageTextColor}
            onChange={(e) => setPageTextColor(e.target.value)}
            className="h-9 rounded-2xl text-xs"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
              borderColor: "var(--color-border)",
            }}
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
      <div className="space-y-1.5">
        <p className="text-[11px] text-[var(--color-subtle)]">Style</p>
        <div className="inline-flex rounded-full bg-[var(--color-bg)] p-1 text-[11px]">
          {BUTTON_STYLES.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setButtonStyle(style)}
              className={cn(
                "flex-1 rounded-full px-3 py-1 capitalize",
                buttonStyle === style
                  ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "text-[var(--color-subtle)]"
              )}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Corners
          </label>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[var(--color-subtle)]">
              Square
            </span>
            <input
              type="range"
              min={4}
              max={30}
              value={buttonRadius}
              onChange={(e) => setButtonRadius(Number(e.target.value))}
              className="flex-1 accent-[var(--color-accent)]"
            />
            <span className="text-[11px] text-[var(--color-subtle)]">
              Round
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Shadow
          </label>
          <div className="inline-flex rounded-full bg-[var(--color-bg)] p-1 text-[11px]">
            {BUTTON_SHADOWS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setButtonShadow(s)}
                className={cn(
                  "flex-1 rounded-full px-3 py-1 capitalize",
                  buttonShadow === s
                    ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                    : "text-[var(--color-subtle)]"
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
          <label className="text-xs font-medium text-[var(--color-text)]">
            Button color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded bg-transparent"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
            />
            <Input
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className="h-9 rounded-2xl text-xs"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)]">
            Button text
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-8 w-10 cursor-pointer rounded bg-transparent"
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
            />
            <Input
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
              className="h-9 rounded-2xl text-xs"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
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
      <div className="grid gap-3 md:grid-cols-2">
        <ColorField label="Title" value={titleColor} onChange={setTitleColor} />
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

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[var(--color-text)]">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          className="h-8 w-10 cursor-pointer rounded bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 rounded-2xl text-xs"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            borderColor: "var(--color-border)",
          }}
        />
      </div>
    </div>
  );
}
