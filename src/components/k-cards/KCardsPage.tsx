// src/components/k-cards/KCardsPage.tsx
"use client";

import {
  useMemo,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from "react";

import { getKCardFontClass } from "@/lib/fonts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";


import { cn } from "@/lib/utils";

import {
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
  Image as ImageIcon,
  Video,
  Sparkles,
  Trash2,
  Plus,
  Search,
  GripVertical,
  Copy,
  Check,
  Contact,
  ExternalLink,
  Eye,
  Loader2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
import { MessageButtonSettings } from "./MessageButtonSettings";
import { LinkLogo, linkHost } from "./LinkLogo";

type DesignSection =
  | "header"
  | "theme"
  | "text"
  | "buttons"
  | "colors"
  | "links";

const SECTION_LABELS: Record<DesignSection, string> = {
  header: "Header",
  theme: "Theme",
  text: "Text",
  buttons: "Buttons",
  colors: "Colors",
  links: "Links",
};

const SECTION_ICONS: Record<
  DesignSection,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  header: UserCircle2,
  theme: Palette,
  text: Type,
  buttons: Square,
  colors: Palette,
  links: Link2,
};

const FONT_OPTIONS = [
  { value: "system", label: "System" },
  { value: "serif", label: "Serif" },
  { value: "display", label: "Display" },
];

const _BUTTON_STYLES: KCardButtonStyle[] = ["solid", "glass", "outline"];
const _BUTTON_SHADOWS: KCardButtonShadow[] = ["none", "soft", "hard", "3d"];

type KCardLink = {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
};

type KCardContactIntent = {
  key: string;
  label: string;
  enabled: boolean;
};

type KCardContact = {
  enabled: boolean;
  buttonLabel: string;
  // If true: hide message textarea, collect email only (you asked for email-only)
  emailOnly?: boolean;
  intents: KCardContactIntent[];
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

const _SOCIAL_OPTIONS = Object.keys(SOCIAL_ICON_MAP);

function slugFromTitle(raw: string): string {
  if (!raw) return "";
  let s = raw.trim().toLowerCase();

  // strip leading @
  if (s.startsWith("@")) s = s.slice(1);

  // replace non-alphanumeric with hyphens
  s = s.replace(/[^a-z0-9]+/g, "-");

  // trim hyphens
  s = s.replace(/^-+|-+$/g, "");

  // ignore empty / placeholder
  if (!s || s === "yourname") return "";

  return s;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

type KCardShareResponse = {
  slug?: string;
  isPublic?: boolean;
  error?: string;
};


export type KCardsInitialData = {
  profileLayout?: "classic" | "hero";
  title?: string;
  subtitle?: string;
  titleSize?: "small" | "large";
  theme?: KCardThemeState;
  links?: KCardLink[];
  socials?: string[];
  socialUrls?: Record<string, string>;
  avatarDataUrl?: string | null;
  avatarSize?: "small" | "medium" | "large";
  headerTextSize?: "small" | "medium" | "large";
  avatarShadow?: "shadow" | "flat";
  contact?: KCardContact;
  contactDetails?: { email: string; phone: string; company?: string };

};

type KCardsPageProps = {
  cardId: string;
  initialData?: KCardsInitialData | null;
  baseUrl: string;
};

export default function KCardsPage({ initialData, baseUrl, cardId }: KCardsPageProps) {
  const [contactDetails, setContactDetails] = useState(initialData?.contactDetails || { email: "", phone: "", company: "" });
  // which section is currently "active" for the left nav
  const [activeSection, setActiveSection] =
    useState<DesignSection>("header");


  const [addOpen, setAddOpen] = useState(false);
  // refs for scroll + intersection observer
  const headerRef = useRef<HTMLElement | null>(null);
  const themeRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLElement | null>(null);
  const buttonsRef = useRef<HTMLElement | null>(null);
  const colorsRef = useRef<HTMLElement | null>(null);
  const linksRef = useRef<HTMLElement | null>(null);


  const sectionRefs = useMemo<
    Record<DesignSection, React.RefObject<HTMLElement | null>>
  >(
    () => ({
      header: headerRef,
      theme: themeRef,
      text: textRef,
      buttons: buttonsRef,
      colors: colorsRef,
      links: linksRef,
    }),
    [],
  );

  // header
  const [profileLayout, _setProfileLayout] = useState<"classic" | "hero">(
    initialData?.profileLayout === "hero" ? "hero" : "classic",
  );
  const [title, setTitle] = useState(initialData?.title ?? "@yourname");
  const [subtitle, setSubtitle] = useState(
    initialData?.subtitle ?? "Designer · Creator · Founder",
  );

  // header sizing (applies to the live K-Card)
  const [avatarSize, setAvatarSize] = useState<
    "small" | "medium" | "large"
  >(initialData?.avatarSize ?? "medium");
  const [headerTextSize, setHeaderTextSize] = useState<
    "small" | "medium" | "large"
  >(initialData?.headerTextSize ?? "medium");

  const [avatarShadow, setAvatarShadow] = useState<"shadow" | "flat">(
    initialData?.avatarShadow ?? "shadow",
  );

  // profile image – persisted as data URL in K-Card JSON
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(
    initialData?.avatarDataUrl ?? null,
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
    (initialData?.theme as KCardThemeState | undefined) ??
      DEFAULT_KCARD_THEME,
  );

  // keep title size as an independent tweak
  const [titleSize, _setTitleSize] = useState<"small" | "large">(
    initialData?.titleSize === "large" ? "large" : "small",
  );

  // links
  const [links, setLinks] = useState<KCardLink[]>(
    (initialData?.links as KCardLink[] | undefined) ?? INITIAL_LINKS,
  );

  const [contact, setContact] = useState<KCardContact>(() => {
    type RawContact = Partial<KCardContact> & { intents?: unknown };

    const raw: RawContact = (initialData?.contact as RawContact | undefined) ?? {};
    const rawIntents = Array.isArray(raw.intents) ? raw.intents : null;

    const asObj = (v: unknown): v is Record<string, unknown> =>
      typeof v === "object" && v !== null;

    const intents: KCardContactIntent[] =
      rawIntents && rawIntents.length
        ? rawIntents
            .map((v) => {
              if (!asObj(v)) return null;

              const key = String(v["key"] ?? "").trim();
              const label = String(v["label"] ?? "").trim();

              let enabled = true;
              const enabledRaw = v["enabled"];
              if (typeof enabledRaw === "boolean") enabled = enabledRaw;

              if (!key || !label) return null;
              return { key, label, enabled };
            })
            .filter((v): v is KCardContactIntent => Boolean(v))
        : [
            { key: "hire", label: "Hire me", enabled: true },
            { key: "collab", label: "Collaborate", enabled: true },
          ];

    const enabled = typeof raw.enabled === "boolean" ? raw.enabled : false;
    const buttonLabel =
      typeof raw.buttonLabel === "string" && raw.buttonLabel.trim()
        ? raw.buttonLabel
        : "Message me";
    const emailOnly = typeof raw.emailOnly === "boolean" ? raw.emailOnly : true;

    return { enabled, buttonLabel, emailOnly, intents };
  });


  const [draggingLinkId, setDraggingLinkId] = useState<string | null>(null);

  // socials
  const [socials, setSocials] = useState<string[]>(
    initialData?.socials ?? ["Instagram", "YouTube", "Website"],
  );
  const [socialUrls, setSocialUrls] = useState<Record<string, string>>(
    initialData?.socialUrls ?? {},
  );

  function setSocialUrl(platform: string, url: string) {
    setSocialUrls((prev) => ({
      ...prev,
      [platform]: url,
    }));
  }

  // autosave state
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const saveTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialLoadRef = useRef(true);

  // Sharing (public URL / slug)
  const [shareSlug, setShareSlug] = useState<string>("");
  const [shareIsPublic, setShareIsPublic] = useState<boolean>(true);
  const [shareLoading, setShareLoading] = useState<boolean>(true);
  const [shareSaving, setShareSaving] = useState<boolean>(false);
  // Last published address/visibility, to show whether there are unpublished changes.
  const [savedShare, setSavedShare] = useState<{ slug: string; isPublic: boolean } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const publicUrl =
    shareSlug && shareIsPublic ? `${baseUrl}/${shareSlug}` : null;

  const derivedSlugFromTitle = slugFromTitle(title);
  const visualSlug = shareSlug || derivedSlugFromTitle || "yourname";

  const shareDisplayUrl = `${baseUrl}/${visualSlug}`;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`/api/k-cards/share?cardId=${encodeURIComponent(cardId)}`);
        if (!res.ok) throw new Error("Failed to load share settings");
        const data: KCardShareResponse = await res.json();
        if (cancelled) return;
        setShareSlug(data.slug ?? "");
        setShareIsPublic(data.isPublic ?? true);
        setSavedShare({ slug: data.slug ?? "", isPublic: data.isPublic ?? true });
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setShareLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [baseUrl, cardId]);

  async function saveShareSettings() {
    if (!shareSlug.trim()) {
      toast.error("Add a public slug for your K-Card");
      return;
    }

    setShareSaving(true);
    try {
      const res = await fetch("/api/k-cards/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId,
          slug: shareSlug,
          isPublic: shareIsPublic,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update share settings");
        return;
      }

      setShareSlug(data.slug ?? shareSlug);
      setShareIsPublic(data.isPublic ?? true);
      setSavedShare({ slug: data.slug ?? shareSlug, isPublic: data.isPublic ?? true });

      if (data.slug) {
        toast.success(data.isPublic ?? true ? "Your Card is live" : "Card hidden from the public", {
          description: `${baseUrl}/${data.slug}`,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while saving");
    } finally {
      setShareSaving(false);
    }
  }

  async function copyPublicUrl() {
    const urlToCopy = publicUrl || shareDisplayUrl;

    try {
      await navigator.clipboard.writeText(urlToCopy);
      toast.success("K-Card link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  }


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

  const previewTitleFont = useMemo(
    () => getKCardFontClass(titleFont),
    [titleFont]
  );

  const previewBodyFont = useMemo(
    () => getKCardFontClass(pageFont),
    [pageFont]
  );

  
const buttonBaseStyles = useMemo(() => {
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
}, [
  buttonStyle,
  buttonRadius,
  buttonShadow,
  buttonColor,
  buttonTextColor,
]);


  function toggleSocial(name: string) {
    setSocials((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name],
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
        link.id === id ? { ...link, ...patch } : link,
      ),
    );
  }

  function addLink() {
    const id = String(Date.now());
    setLinks((prev) => [
      ...prev,
      { id, title: "New link", url: "https://", enabled: true },
    ]);
  }


  function handleLinkDragStart(id: string) {
    setDraggingLinkId(id);
  }

  function handleLinkDragEnd() {
    setDraggingLinkId(null);
  }

  function handleLinkDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleLinkDrop(
    e: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) {
    e.preventDefault();
    if (!draggingLinkId || draggingLinkId === targetId) return;

    setLinks((prev) => {
      const next = [...prev];
      const fromIndex = next.findIndex((l) => l.id === draggingLinkId);
      const toIndex = next.findIndex((l) => l.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });

    setDraggingLinkId(null);
  }

  const visibleLinks = links.filter((l) => l.enabled);

  // mark initial load as completed so autosave can run
  useEffect(() => {
    isInitialLoadRef.current = false;
  }, []);

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
      socialUrls,
      avatarDataUrl,
      avatarSize,
      headerTextSize,
      avatarShadow,
      contact,
      contactDetails,
    };

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus("saving");

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/k-cards?cardId=${encodeURIComponent(cardId)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) { const error = await res.json().catch(() => ({})); throw new Error(error.error || "Could not save your Card."); }

        setSaveStatus("saved");
        setLastSavedAt(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Failed to autosave K-Card", err);
        setSaveStatus("error");
        toast.error(err instanceof Error ? err.message : "Could not save your Card.");
      }
    }, 800);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    profileLayout,
    title,
    subtitle,
    titleSize,
    theme,
    links,
    socials,
    socialUrls,
    avatarDataUrl,
    avatarSize,
    headerTextSize,
    avatarShadow,
    cardId,
    contactDetails,
    contact
  ]);

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
        if (bestId && bestRatio > 0) {
          setActiveSection(bestId);
        }
      },
      {
        root: null,
        // Ignore the area under the sticky shell + publish bar.
        rootMargin: "-200px 0px -35% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 1],
      },
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

  const publishDirty = !savedShare || savedShare.slug !== shareSlug || savedShare.isPublic !== shareIsPublic;
  const isLive = Boolean(savedShare?.isPublic && savedShare.slug);
  const previewNode = (
    <KCardPreview
      className="![width:min(320px,calc((100vh-400px)*0.4706),100%)]"
      contact={contact}
      wallpaperStyle={wallpaperStyle}
      pageBackground={pageBackground}
      previewTitleFont={previewTitleFont}
      previewBodyFont={previewBodyFont}
      title={title}
      subtitle={subtitle}
      titleColor={titleColor}
      pageTextColor={pageTextColor}
      titleSize={titleSize}
      _profileLayout={profileLayout}
      avatarPreview={avatarPreview}
      socials={socials}
      socialUrls={socialUrls}
      visibleLinks={visibleLinks}
      buttonBaseStyles={buttonBaseStyles}
      avatarSize={avatarSize}
      headerTextSize={headerTextSize}
      avatarShadow={avatarShadow}
    />
  );

  return (
    <div
      className="kc-editor -mx-4 -mt-6 sm:-mx-8 sm:-mt-8"
      style={EDITOR_VARS}
    >
      {/* Publish bar + section tabs */}
      <div className="sticky top-16 z-20 border-b border-[#E3E5E7] bg-white">
        <section aria-label="Publish your Card" className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 pb-3 pt-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#E3E5E7] bg-[#FBE4FA] text-[15px] font-medium">
              {avatarPreview ? <img src={avatarPreview} alt="" className="h-full w-full object-cover" /> : (title || "K").slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-2 truncate text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                <span className="truncate">{title || "Untitled Card"}</span>
                <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", isLive ? "bg-[#EEF3ED] text-[#357452]" : "bg-[#F1F2F4] text-[#696C72]")}>
                  <span className={cn("size-1.5 rounded-full", isLive ? "bg-[#357452]" : "bg-[#A2A6AC]")} />
                  {isLive ? "Live" : "Draft"}
                </span>
              </p>
              <p role="status" className="flex items-center gap-1.5 text-[12px] text-[#80858C]">
                {saveStatus === "saving" ? (
                  <><Loader2 className="h-3 w-3 animate-spin" /> Saving design…</>
                ) : saveStatus === "error" ? (
                  <span className="text-[#9B3E35]">Design not saved. Keep this page open and try again.</span>
                ) : saveStatus === "saved" ? (
                  <><Check className="h-3 w-3 text-[#357452]" /> {lastSavedAt ? `Design saved ${lastSavedAt}` : "Design saved"}</>
                ) : (
                  "Changes save automatically"
                )}
              </p>
            </div>
          </div>

          <div className="ml-auto flex w-full flex-wrap items-center gap-2 lg:w-auto">
            <label className="flex h-10 w-full min-w-0 items-center rounded-[10px] border border-[#E3E5E7] bg-white pl-3 text-[14px] transition-colors focus-within:border-[#80858C] sm:w-auto sm:flex-1 lg:w-[300px] lg:flex-none">
              <span className="shrink-0 text-[#8A9099]">{baseUrl.replace(/^https?:\/\//, "")}/</span>
              <input
                aria-label="Card handle"
                className="h-full min-w-0 flex-1 bg-transparent pr-3 font-medium text-[#151619] outline-none placeholder:font-normal placeholder:text-[#A2A6AC]"
                value={shareSlug}
                onChange={(e) => setShareSlug(e.target.value)}
                placeholder="your-name"
              />
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={shareIsPublic}
              onClick={() => setShareIsPublic((v) => !v)}
              className="flex h-10 items-center gap-2 rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[14px] text-[#3C4045] transition-colors hover:border-[#CDD1D7]"
              title={shareIsPublic ? "Anyone with the address can see this Card" : "Only you can see this Card"}
            >
              <span className={cn("relative inline-flex h-[18px] w-[30px] items-center rounded-full transition-colors", shareIsPublic ? "bg-[#151619]" : "bg-[#DCDFE3]")}>
                <span className={cn("inline-block size-[14px] rounded-full bg-white transition-transform duration-200", shareIsPublic ? "translate-x-[14px]" : "translate-x-[2px]")} />
              </span>
              Public
            </button>
            {publicUrl && (
              <a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[14px] font-medium text-[#151619] transition-colors hover:border-[#CDD1D7] hover:bg-[#F7F8F9]">
                View <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              type="button"
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-[10px] px-4 text-[14px] font-medium transition-colors",
                publishDirty
                  ? "bg-[#151619] text-white hover:bg-[#2B2D31] disabled:opacity-40"
                  : "border border-[#E3E5E7] bg-white text-[#357452]",
              )}
              disabled={shareSaving || shareLoading || !shareSlug || !publishDirty}
              onClick={() => void saveShareSettings()}
            >
              {shareSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : !publishDirty ? <Check className="h-4 w-4" /> : null}
              {shareSaving ? "Publishing…" : publishDirty ? (shareIsPublic ? "Publish" : "Save") : isLive ? "Published" : "Saved"}
            </button>
          </div>
        </section>

        <nav aria-label="Card sections" className="flex gap-1 overflow-x-auto px-3 pb-2 sm:px-7">
          {(Object.keys(SECTION_LABELS) as DesignSection[]).map((id) => {
            const active = activeSection === id;
            const Icon = SECTION_ICONS[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative flex h-9 shrink-0 items-center gap-2 rounded-[9px] px-3 text-[14px] transition-colors",
                  active ? "font-medium text-[#151619]" : "text-[#80858C] hover:text-[#151619]",
                )}
              >
                {active && <motion.span layoutId="kc-section-pill" className="absolute inset-0 rounded-[9px] bg-[#F1F2F4]" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                {Icon && <Icon className="relative h-4 w-4" />}
                <span className="relative">{SECTION_LABELS[id]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="grid gap-8 px-4 py-6 sm:px-8 sm:py-8 xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* Editor stack */}
          <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6">
            {/* Header section */}
            <section
              ref={headerRef}
              data-section-id="header"
              className="scroll-mt-[200px]"
            >
              <Card className="rounded-[16px] border border-[#E3E5E7] bg-white shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                    Header
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <HeaderSection
                    title={title}
                    setTitle={setTitle}
                    subtitle={subtitle}
                    setSubtitle={setSubtitle}
                    onAvatarChange={handleAvatarChange}
                    onAvatarClear={() => setAvatarDataUrl(null)}
                    avatarPreview={avatarPreview}
                    socials={socials}
                    socialIconMap={SOCIAL_ICON_MAP}
                    onToggleSocial={toggleSocial}
                    socialUrls={socialUrls}
                    setSocialUrl={setSocialUrl}
                    avatarSize={avatarSize}
                    setAvatarSize={setAvatarSize}
                    headerTextSize={headerTextSize}
                    setHeaderTextSize={setHeaderTextSize}
                    avatarShadow={avatarShadow}
                    setAvatarShadow={setAvatarShadow}
                  />
                </CardContent>
              </Card>
            </section>

            {/* Theme section */}
            <section
              ref={themeRef}
              data-section-id="theme"
              className="scroll-mt-[200px]"
            >
              <Card className="rounded-[16px] border border-[#E3E5E7] bg-white shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                    Theme
                  </CardTitle>
                  <CardDescription className="text-[13px] text-[#80858C]">
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
              className="scroll-mt-[200px]"
            >
              <Card className="rounded-[16px] border border-[#E3E5E7] bg-white shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                    Text
                  </CardTitle>
                  <CardDescription className="text-[13px] text-[#80858C]">
                    Typography and text colors for your K-Card.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TextSection
                    titleFont={titleFont}
                    setTitleFont={(v: KCardFontToken) =>
                      setTheme((prev) => ({ ...prev, titleFont: v }))
                    }
                    pageFont={pageFont}
                    setPageFont={(v: KCardFontToken) =>
                      setTheme((prev) => ({ ...prev, pageFont: v }))
                    }
                    titleColor={titleColor}
                    setTitleColor={(v: string) =>
                      setTheme((prev) => ({ ...prev, titleColor: v }))
                    }
                    pageTextColor={pageTextColor}
                    setPageTextColor={(v: string) =>
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
              className="scroll-mt-[200px]"
            >
              <Card className="rounded-[16px] border border-[#E3E5E7] bg-white shadow-none">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                    Buttons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ButtonsSection
                    buttonStyle={buttonStyle}
                    setButtonStyle={(v: KCardButtonStyle) =>
                      setTheme((prev) => ({ ...prev, buttonStyle: v }))
                    }
                    buttonRadius={buttonRadius}
                    setButtonRadius={(v: number) =>
                      setTheme((prev) => ({ ...prev, buttonRadius: v }))
                    }
                    buttonShadow={buttonShadow}
                    setButtonShadow={(v: KCardButtonShadow) =>
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
              className="scroll-mt-[200px]"
            >
              <Card className="rounded-[16px] border border-[#E3E5E7] bg-white shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                    Colors
                  </CardTitle>
                  <CardDescription className="text-[13px] text-[#80858C]">
                    Fine-tune title, text and button colors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorsSection
                    titleColor={titleColor}
                    setTitleColor={(v: string) =>
                      setTheme((prev) => ({ ...prev, titleColor: v }))
                    }
                    pageTextColor={pageTextColor}
                    setPageTextColor={(v: string) =>
                      setTheme((prev) => ({
                        ...prev,
                        pageTextColor: v,
                      }))
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
              className="scroll-mt-[200px]"
            >
              <Card className="rounded-[16px] border border-[#E3E5E7] bg-white shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                    <span>Links</span>
                    <button
                      type="button"
                      onClick={() => setAddOpen(true)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-[9px] bg-[#151619] px-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#2B2D31]"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {links.map((link) => (
                    <div
                      key={link.id}
                      draggable
                      onDragStart={() => handleLinkDragStart(link.id)}
                      onDragEnd={handleLinkDragEnd}
                      onDragOver={handleLinkDragOver}
                      onDrop={(e) => handleLinkDrop(e, link.id)}
                      className={cn(
                        "group flex items-center gap-3 rounded-[14px] border bg-white py-3 pl-2 pr-3 transition-[opacity,border-color]",
                        link.enabled ? "border-[#E3E5E7] hover:border-[#CDD1D7]" : "border-dashed border-[#DCDFE3]",
                        draggingLinkId === link.id ? "opacity-60" : "opacity-100",
                      )}
                    >
                      <button
                        type="button"
                        className="flex h-10 w-5 shrink-0 cursor-grab items-center justify-center text-[#C2C5CA] transition-colors hover:text-[#696C72] active:cursor-grabbing"
                        aria-label="Drag to reorder"
                        title="Drag to reorder"
                      >
                        <GripVertical className="h-4 w-4" />
                      </button>

                      <LinkLogo url={link.url} size={44} muted={!link.enabled} />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Input
                            value={link.title}
                            onChange={(e) => updateLink(link.id, { title: e.target.value })}
                            className={cn(
                              "h-8 rounded-[7px] border-0 bg-transparent px-1.5 text-[15px] font-medium shadow-none transition-colors hover:bg-[#F5F6F7] focus-visible:bg-[#F5F6F7] focus-visible:outline-none focus-visible:ring-0",
                              link.enabled ? "text-[#151619]" : "text-[#80858C]",
                            )}
                            placeholder={linkHost(link.url) ?? "Title"}
                            aria-label="Link title"
                          />
                          {!link.enabled && <span className="shrink-0 rounded-[5px] bg-[#F1F2F4] px-1.5 py-0.5 text-[11px] font-medium text-[#80858C]">Hidden</span>}
                        </div>
                        <Input
                          value={link.url}
                          onChange={(e) => updateLink(link.id, { url: e.target.value })}
                          className="h-7 rounded-[7px] border-0 bg-transparent px-1.5 text-[13px] text-[#80858C] shadow-none transition-colors hover:bg-[#F5F6F7] focus-visible:bg-[#F5F6F7] focus-visible:text-[#151619] focus-visible:outline-none focus-visible:ring-0"
                          placeholder="Paste a link, e.g. dribbble.com/you"
                          aria-label="Link address"
                        />
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={link.enabled}
                        aria-label={link.enabled ? "Hide this link" : "Show this link"}
                        title={link.enabled ? "Shown on your Card" : "Hidden from your Card"}
                        onClick={() => updateLink(link.id, { enabled: !link.enabled })}
                        className={cn("relative inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full transition-colors duration-200", link.enabled ? "bg-[#151619]" : "bg-[#DCDFE3]")}
                      >
                        <span className={cn("inline-block size-[18px] rounded-full bg-white transition-transform duration-200", link.enabled ? "translate-x-[18px]" : "translate-x-[2px]")} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLinks((prev) => prev.filter((l) => l.id !== link.id))}
                        className="grid size-9 shrink-0 place-items-center rounded-[9px] text-[#A2A6AC] transition-colors hover:bg-[#FBEFED] hover:text-[#9B3E35]"
                        aria-label="Delete link"
                        title="Delete link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
                      <span className="font-medium">Add</span>{" "}
                      to start building your K-Card.
                    </div>
                  )}
                
                  {/* Contact / Message button */}
                  {contact.enabled && (
                    <MessageButtonSettings contact={contact} setContact={setContact} />
                  )}
</CardContent>
              </Card>
            </section>

            {/* Contact card download */}
            <section aria-label="Save contact details">
              <Card className="rounded-[16px] border border-[#E3E5E7] bg-white shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-[16px] font-medium tracking-[-0.02em] text-[#151619]">
                    <Contact className="h-4 w-4 text-[#80858C]" /> Save contact
                  </CardTitle>
                  <CardDescription className="text-[13px] text-[#80858C]">
                    Visitors can download these as a contact card. Leave them blank to hide the button.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {(["email", "phone", "company"] as const).map((field) => (
                      <label key={field} className="text-[13px] font-medium capitalize text-[#3C4045]">
                        {field}
                        <input
                          className="mt-1.5 h-11 w-full rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[15px] font-normal normal-case outline-none transition-colors focus:border-[#80858C]"
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          value={contactDetails[field] || ""}
                          onChange={(e) => setContactDetails((prev) => ({ ...prev, [field]: e.target.value }))}
                        />
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {addOpen && (
            <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setAddOpen(false)}
                className="absolute inset-0 bg-black/40"
              />

              <div className="relative w-full max-w-[420px] rounded-[32px] bg-white p-5 border border-[#E3E5E7]">
                <button
                  type="button"
                  onClick={() => setAddOpen(false)}
                  className="absolute right-4 top-4 text-[18px] leading-none text-black/60 hover:text-black"
                  aria-label="Close"
                >
                  ×
                </button>

                <div className="mb-4 text-center">
                  <p className="text-[15px] font-semibold tracking-tight text-[#050505]">
                    Add to your K-Card
                  </p>
                  <p className="mt-1 text-[12px] text-black/55">
                    Choose what you want to add.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      addLink();
                      setAddOpen(false);
                    }}
                    className="w-full rounded-[22px] border border-black/10 bg-[#F5F6F7] px-4 py-4 text-left hover:bg-white transition"
                  >
                    <div className="text-[13px] font-semibold text-[#050505]">Link</div>
                    <div className="mt-1 text-[11px] text-black/55">Add a normal link button.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setContact((prev) => ({ ...prev, enabled: true }));
                      setAddOpen(false);
                      toast.success("Contact button added");
                    }}
                    className="w-full rounded-[22px] border border-black/10 bg-[#F5F6F7] px-4 py-4 text-left hover:bg-white transition"
                  >
                    <div className="text-[13px] font-semibold text-[#050505]">Contact Button</div>
                    <div className="mt-1 text-[11px] text-black/55">Let visitors message you.</div>
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* Live preview */}
          <aside className="hidden xl:block" aria-label="Live preview">
            <div className="sticky top-[196px] rounded-[16px] border border-[#E3E5E7] bg-[#F5F6F7]">
              <div className="flex items-center justify-between border-b border-[#E3E5E7] px-4 py-3 text-[13px]">
                <span className="flex items-center gap-2 font-medium text-[#3C4045]">
                  <Eye className="h-4 w-4 text-[#80858C]" /> Live preview
                </span>
                <span className="text-[#A2A6AC]">Updates as you edit</span>
              </div>
              <div className="flex justify-center px-4 py-5">{previewNode}</div>
              <div className="flex items-center gap-2 border-t border-[#E3E5E7] px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate px-1 text-[13px] text-[#5A5E65]">{shareDisplayUrl.replace(/^https?:\/\//, "")}</span>
                <button type="button" onClick={copyPublicUrl} className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-[#E3E5E7] bg-white px-2.5 text-[13px] font-medium hover:border-[#CDD1D7]">
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
              </div>
            </div>
          </aside>
      </div>

      {/* Mobile preview */}
      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        className="fixed bottom-24 right-4 z-30 inline-flex h-11 items-center gap-2 rounded-full bg-[#151619] px-4 text-[14px] font-medium text-white xl:hidden"
      >
        <Eye className="h-4 w-4" /> Preview
      </button>
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-[#151619]/60 p-6 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div initial={{ y: 24, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}>
              <KCardPreview
                className="![width:min(340px,calc((100vh-160px)*0.4706),calc(100vw-48px))]"
                contact={contact}
                wallpaperStyle={wallpaperStyle}
                pageBackground={pageBackground}
                previewTitleFont={previewTitleFont}
                previewBodyFont={previewBodyFont}
                title={title}
                subtitle={subtitle}
                titleColor={titleColor}
                pageTextColor={pageTextColor}
                titleSize={titleSize}
                _profileLayout={profileLayout}
                avatarPreview={avatarPreview}
                socials={socials}
                socialUrls={socialUrls}
                visibleLinks={visibleLinks}
                buttonBaseStyles={buttonBaseStyles}
                avatarSize={avatarSize}
                headerTextSize={headerTextSize}
                avatarShadow={avatarShadow}
              />
            </motion.div>
            <button type="button" onClick={() => setPreviewOpen(false)} className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-medium text-[#151619]">
              <X className="h-4 w-4" /> Close preview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Neutral palette for the editor chrome (matches the dashboard), overriding the beige site tokens. */
const EDITOR_VARS = {
  "--color-bg": "#F5F6F7",
  "--color-surface": "#ffffff",
  "--color-border": "#E3E5E7",
  "--color-text": "#151619",
  "--color-subtle": "#696C72",
  "--color-accent": "#FBE4FA",
  "--color-accent-soft": "#FDF3FC",
} as React.CSSProperties;

/* ---------- Sections ---------- */

type HeaderSectionProps = {
  title: string;
  setTitle: (v: string) => void;
  subtitle: string;
  setSubtitle: (v: string) => void;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAvatarClear: () => void;
  avatarPreview: string | null;
  socials: string[];
  socialIconMap: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  >;
  onToggleSocial: (name: string) => void;
  socialUrls: Record<string, string>;
  setSocialUrl: (platform: string, url: string) => void;
  avatarSize: "small" | "medium" | "large";
  setAvatarSize: (v: "small" | "medium" | "large") => void;
  headerTextSize: "small" | "medium" | "large";
  setHeaderTextSize: (v: "small" | "medium" | "large") => void;
  avatarShadow: "shadow" | "flat";
  setAvatarShadow: (v: "shadow" | "flat") => void;
};

function HeaderSection({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  onAvatarChange,
  onAvatarClear,
  avatarPreview,
  socials,
  socialIconMap,
  onToggleSocial,
  socialUrls,
  setSocialUrl,
  avatarSize,
  setAvatarSize,
  headerTextSize,
  setHeaderTextSize,
  avatarShadow,
  setAvatarShadow,
}: HeaderSectionProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [socialSearch, setSocialSearch] = useState("");
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => setIsPickerOpen(true);

  const triggerFilePicker = () => {
    setIsPickerOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAvatarChange(e);
    setIsPickerOpen(false);
  };

  const handleClearAvatar = () => {
    onAvatarClear();
    setIsPickerOpen(false);
  };

  const avatarSizeClasses =
    avatarSize === "small"
      ? "h-12 w-12"
      : avatarSize === "medium"
        ? "h-14 w-14"
        : "h-18 w-18";

  const filteredSocialOptions = (
    Object.keys(socialIconMap) as string[]
  ).filter(
    (name) =>
      !socialSearch.trim() ||
      name
        .toLowerCase()
        .includes(socialSearch.trim().toLowerCase()),
  );

  return (
    <>
      {/* Avatar + title / subtitle */}
      <Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openPicker}
              className={cn(
                "group relative flex items-center justify-center rounded-full transition hover:scale-[1.02]",
                avatarSizeClasses,
              )}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile preview"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserCircle2 className="h-7 w-7" />
              )}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition group-hover:opacity-100">
                <span className="text-[10px] font-medium text-white">
                  Edit
                </span>
              </div>
            </button>

            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={40}
                  placeholder="@yourname"
                  className={cn(
                    "block w-full border-0 border-b border-[var(--color-border)] bg-transparent px-0 py-1 text-sm font-semibold outline-none focus-visible:border-[var(--color-text)]",
                  )}
                />
              </div>

              <div className="space-y-1">
                <textarea
                  value={subtitle}
                  onChange={(e) =>
                    setSubtitle(e.target.value)
                  }
                  rows={2}
                  maxLength={80}
                  placeholder="Your Brand. Your World."
                  className={cn(
                    "block w-full resize-none border-0 border-b border-[var(--color-border)] bg-transparent px-0 py-1 text-xs outline-none focus-visible:border-[var(--color-text)]",
                  )}
                />
              </div>
            </div>
          </div>

          {/* Layout + sizes */}
          <div className="grid gap-6 pt-2 md:grid-cols-3">
            {/* Avatar style */}
            <div className="space-y-2">
              <p className="text-[11px] text-[var(--color-subtle)]">
                Avatar style
              </p>
              <div className="inline-flex rounded-full bg-[var(--color-bg)] p-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setAvatarShadow("shadow")}
                  className={cn(
                    "flex-1 rounded-full px-3 py-1",
                    avatarShadow === "shadow"
                      ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                      : "text-[var(--color-subtle)]",
                  )}
                >
                  Shadow
                </button>
                <button
                  type="button"
                  onClick={() => setAvatarShadow("flat")}
                  className={cn(
                    "flex-1 rounded-full px-3 py-1",
                    avatarShadow === "flat"
                      ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                      : "text-[var(--color-subtle)]",
                  )}
                >
                  Flat
                </button>
              </div>
            </div>

            {/* Profile image size */}
            <div className="space-y-2">
              <p className="text-[11px] text-[var(--color-subtle)]">
                Profile image size
              </p>
              <div className="flex items-center gap-3">
                {(
                  ["small", "medium", "large"] as const
                ).map((size, idx) => {
                  const isActive = avatarSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setAvatarSize(size)}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-105"
                    >
                      <span
                        className={cn(
                          "rounded-full",
                          idx === 0 && "h-4 w-4",
                          idx === 1 && "h-5 w-5",
                          idx === 2 && "h-6 w-6",
                          isActive
                            ? "scale-110"
                            : "opacity-70",
                        )}
                        style={{
                          backgroundColor: isActive
                            ? "var(--color-accent)"
                            : "var(--color-border)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text size */}
            <div className="space-y-2">
              <p className="text-[11px] text-[var(--color-subtle)]">
                Text size
              </p>
              <div className="flex items-center gap-3">
                {(
                  ["small", "medium", "large"] as const
                ).map((size) => {
                  const isActive =
                    headerTextSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setHeaderTextSize(size)
                      }
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border transition",
                        isActive
                          ? "bg-[var(--color-accent-soft)]"
                          : "bg-transparent",
                      )}
                      style={{
                        borderColor: isActive
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                      }}
                    >
                      <span
                        className={cn(
                          "font-semibold",
                          size === "small" && "text-xs",
                          size === "medium" && "text-sm",
                          size === "large" && "text-lg",
                          isActive
                            ? "text-[var(--color-text)]"
                            : "text-[var(--color-subtle)]",
                        )}
                      >
                        t
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social media chips */}
          <div className="space-y-2 pt-1">
            <p className="text-[11px] font-medium text-[var(--color-text)]">
              Social media
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {socials.map((name) => {
                const Icon = socialIconMap[name];
                if (!Icon) return null;
                const active = true;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onToggleSocial(name)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition",
                      active
                        ? "border-transparent bg-[var(--color-accent)]"
                        : "border-[var(--color-border)] bg-[var(--color-bg)]",
                    )}
                    style={{
                      color: active
                        ? "#050505"
                        : "var(--color-text)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  setIsSocialDialogOpen(true)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] transition hover:bg-[var(--color-surface)]"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Hidden native file input for "Select image or GIF" */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Profile image picker dialog */}
            <DialogContent className="max-w-sm rounded-3xl">
              <DialogHeader className="space-y-1">
                <DialogTitle className="text-sm font-semibold">
                  Profile image
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Choose how you want to update your profile
                  image.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-2 space-y-2 text-xs">
                <button
                  type="button"
                  onClick={triggerFilePicker}
                  className="flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left transition hover:bg-[var(--color-bg)]"
                  style={{
                    borderColor: "var(--color-border)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                      <ImageIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <div className="text-[12px] font-semibold">
                        Select image or GIF
                      </div>
                      <div
                        className="text-[10px]"
                        style={{
                          color: "var(--color-subtle)",
                        }}
                      >
                        Upload a new profile picture from
                        your device.
                      </div>
                    </span>
                  </span>
                  <span
                    className="text-[14px]"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toast("Video profile coming soon", {
                      description:
                        "You’ll soon be able to use short videos here.",
                    })
                  }
                  className="flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left transition hover:bg-[var(--color-bg)]"
                  style={{
                    borderColor: "var(--color-border)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-bg)]">
                      <Video className="h-4 w-4" />
                    </span>
                    <span>
                      <div className="text-[12px] font-semibold">
                        Select video
                      </div>
                      <div
                        className="text-[10px]"
                        style={{
                          color: "var(--color-subtle)",
                        }}
                      >
                        Use a short looping video as your
                        profile.
                      </div>
                    </span>
                  </span>
                  <span
                    className="text-[14px]"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toast("AI styling coming soon", {
                      description:
                        "We’re working on AI-powered profile looks.",
                    })
                  }
                  className="flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left transition hover:bg-[var(--color-bg)]"
                  style={{
                    borderColor: "var(--color-border)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-bg)]">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span>
                      <div className="text-[12px] font-semibold">
                        Restyle your image with AI
                      </div>
                      <div
                        className="text-[10px]"
                        style={{
                          color: "var(--color-subtle)",
                        }}
                      >
                        Generate new styles from your
                        existing photo.
                      </div>
                    </span>
                  </span>
                  <span
                    className="text-[14px]"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toast("Canva integration coming soon", {
                      description:
                        "Design custom avatars in Canva, then sync them.",
                    })
                  }
                  className="flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left transition hover:bg-[var(--color-bg)]"
                  style={{
                    borderColor: "var(--color-border)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-bg)]">
                      <span className="text-[11px] font-semibold">
                        Canva
                      </span>
                    </span>
                    <span>
                      <div className="text-[12px] font-semibold">
                        Design with Canva
                      </div>
                      <div
                        className="text-[10px]"
                        style={{
                          color: "var(--color-subtle)",
                        }}
                      >
                        Open Canva to create a unique profile
                        image.
                      </div>
                    </span>
                  </span>
                  <span
                    className="text-[14px]"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAvatar}
                  disabled={!avatarPreview}
                  className="mt-1 flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-[11px] font-medium transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100/80">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </span>
                    <span>Delete current profile image</span>
                  </span>
                </button>
              </div>
            </DialogContent>
          </div>
        </div>
      </Dialog>

      {/* Social media picker dialog */}
      <Dialog
        open={isSocialDialogOpen}
        onOpenChange={setIsSocialDialogOpen}
      >
        <DialogContent className="max-w-sm rounded-3xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-sm font-semibold">
              Add social icon
            </DialogTitle>
            <DialogDescription className="text-xs">
              Choose which social platforms appear on your
              K-Card.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3 text-xs">
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                backgroundColor: "var(--color-bg)",
                border:
                  "1px solid var(--color-border)",
              }}
            >
              <Search className="h-3.5 w-3.5" />
              <input
                value={socialSearch}
                onChange={(e) =>
                  setSocialSearch(e.target.value)
                }
                placeholder="Search"
                className="flex-1 bg-transparent text-[11px] outline-none"
                style={{ color: "var(--color-text)" }}
              />
            </div>

            <div className="max-h-72 space-y-1 overflow-y-auto">
              {filteredSocialOptions.map((name) => {
                const Icon = socialIconMap[name];
                if (!Icon) return null;
                const isActive = socials.includes(name);

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      if (!isActive) onToggleSocial(name);
                      setEditingPlatform(name);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[12px] transition hover:bg-[var(--color-bg)]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{name}</span>
                    </span>
                    <span
                      className="text-[11px]"
                      style={{
                        color: "var(--color-subtle)",
                      }}
                    >
                      {socialUrls[name]?.trim() ? "Linked" : isActive ? "Added" : "Add"}
                    </span>
                  </button>
                );
              })}
            </div>

            {editingPlatform && (
              <div className="mt-3 space-y-2 border-t border-[var(--color-border)] pt-3">
                <p
                  className="text-[11px] font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {editingPlatform === "YouTube"
                    ? "Enter your YouTube channel link"
                    : editingPlatform === "Instagram"
                    ? "Enter your Instagram profile link"
                    : editingPlatform === "TikTok"
                    ? "Enter your TikTok profile link"
                    : editingPlatform === "Email"
                    ? "Enter your email link (mailto:you@example.com)"
                    : `Enter your ${editingPlatform} link`}
                </p>
                <Input
                  value={socialUrls[editingPlatform] ?? ""}
                  onChange={(e) => setSocialUrl(editingPlatform, e.target.value)}
                  placeholder={
                    editingPlatform === "YouTube"
                      ? "https://youtube.com/@yourchannel"
                      : editingPlatform === "Instagram"
                      ? "https://instagram.com/yourusername"
                      : editingPlatform === "TikTok"
                      ? "https://www.tiktok.com/@yourusername"
                      : editingPlatform === "LinkedIn"
                      ? "https://www.linkedin.com/in/yourprofile"
                      : editingPlatform === "WhatsApp"
                      ? "https://wa.me/1234567890"
                      : editingPlatform === "Email"
                      ? "mailto:you@example.com"
                      : "https://your-link.com"
                  }
                  className="h-9 rounded-2xl text-xs"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                    borderColor: "var(--color-border)",
                  }}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-full px-3 text-[11px]"
                    onClick={() => setEditingPlatform(null)}
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

type TextSectionProps = {
  titleFont: KCardFontToken;
  setTitleFont: (v: KCardFontToken) => void;
  pageFont: KCardFontToken;
  setPageFont: (v: KCardFontToken) => void;
  titleColor: string;
  setTitleColor: (v: string) => void;
  pageTextColor: string;
  setPageTextColor: (v: string) => void;
};

function TextSection({
  titleFont,
  setTitleFont,
  pageFont,
  setPageFont,
  titleColor,
  setTitleColor,
  pageTextColor,
  setPageTextColor,
}: TextSectionProps) {
  return (
    <div className="space-y-8">
      {/* Title font row */}
      <div className="space-y-3">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Title Font
        </p>
        <div className="flex flex-wrap gap-4">
          {FONT_OPTIONS.map((opt) => {
            const active = titleFont === opt.value;
            const isSerif = opt.value === "serif";
            const isDisplay = opt.value === "display";

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTitleFont(opt.value as KCardFontToken)}
                className={cn(
                  "min-w-[120px] rounded-[18px] border px-6 py-3 text-sm tracking-[0.02em] transition",
                  active
                    ? "border-black bg-white"
                    : "border-[#E3E5E7] bg-white text-[#5A5E65] hover:border-[#CDD1D7]",
                  isDisplay && "font-semibold",
                  isSerif && "font-serif"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Page font row */}
      <div className="space-y-3">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Page Font
        </p>
        <div className="flex flex-wrap gap-4">
          {FONT_OPTIONS.map((opt) => {
            const active = pageFont === opt.value;
            const isSerif = opt.value === "serif";
            const isDisplay = opt.value === "display";

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPageFont(opt.value as KCardFontToken)}
                className={cn(
                  "min-w-[120px] rounded-[18px] border px-6 py-3 text-sm tracking-[0.02em] transition",
                  active
                    ? "border-black bg-white"
                    : "border-[#E3E5E7] bg-white text-[#5A5E65] hover:border-[#CDD1D7]",
                  isDisplay && "font-semibold",
                  isSerif && "font-serif"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[14px] font-medium text-[#3C4045]">
            Title Color
          </p>
          <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border border-black"
              style={{ backgroundColor: titleColor }}
            />
            <input
              type="color"
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-[14px] font-medium text-[#3C4045]">
            Page Text Color
          </p>
          <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border border-black"
              style={{ backgroundColor: pageTextColor }}
            />
            <input
              type="color"
              value={pageTextColor}
              onChange={(e) => setPageTextColor(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
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
    <div className="space-y-8">
      {/* Style row */}
      <div className="space-y-3">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Style
        </p>
        <div className="flex flex-wrap gap-4">
          {(["solid", "glass", "outline"] as const).map((style) => {
            const active = buttonStyle === style;
            const label =
              style == "solid" ? "Solid" : style == "glass" ? "Glass" : "Outline";

            return (
              <button
                key={style}
                type="button"
                onClick={() => setButtonStyle(style)}
                className={cn(
                  "min-w-[120px] rounded-[18px] border px-6 py-3 text-sm font-medium tracking-[0.02em] transition",
                  active
                    ? "border-black bg-white"
                    : "border-[#E3E5E7] bg-white text-[#5A5E65] hover:border-[#CDD1D7]"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shadows row */}
      <div className="space-y-3">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Shadows
        </p>
        <div className="flex flex-wrap gap-4">
          {(["none", "soft", "hard", "3d"] as const).map((shadow) => {
            const active = buttonShadow === shadow;
            const label =
              shadow == "none"
                ? "None"
                : shadow == "soft"
                ? "Soft"
                : shadow == "hard"
                ? "Hard"
                : "3D";

            return (
              <button
                key={shadow}
                type="button"
                onClick={() => setButtonShadow(shadow)}
                className={cn(
                  "min-w-[96px] rounded-[18px] border px-6 py-3 text-sm font-medium tracking-[0.02em] transition",
                  active
                    ? "border-black bg-white"
                    : "border-[#E3E5E7] bg-white text-[#5A5E65] hover:border-[#CDD1D7]"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Corners slider */}
      <div className="space-y-3">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Corners
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-text)]">Square</span>
          <div className="flex-1 rounded-full bg-[#ECEEF0] px-3 py-2">
            <input
              type="range"
              min={0}
              max={40}
              value={buttonRadius}
              onChange={(e) => setButtonRadius(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "#151619" }}
            />
          </div>
          <span className="text-sm text-[var(--color-text)]">Round</span>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[14px] font-medium text-[#3C4045]">
            Button Color
          </p>
          <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border border-black"
              style={{ backgroundColor: buttonColor }}
            />
            <input
              type="color"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-[14px] font-medium text-[#3C4045]">
            Button Text Color
          </p>
          <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border border-black"
              style={{ backgroundColor: buttonTextColor }}
            />
            <input
              type="color"
              value={buttonTextColor}
              onChange={(e) => setButtonTextColor(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Title Color
        </p>
        <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
          <span
            className="absolute inset-0 rounded-full border border-black"
            style={{ backgroundColor: titleColor }}
          />
          <input
            type="color"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Page Text Color
        </p>
        <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
          <span
            className="absolute inset-0 rounded-full border border-black"
            style={{ backgroundColor: pageTextColor }}
          />
          <input
            type="color"
            value={pageTextColor}
            onChange={(e) => setPageTextColor(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Buttons
        </p>
        <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
          <span
            className="absolute inset-0 rounded-full border border-black"
            style={{ backgroundColor: buttonColor }}
          />
          <input
            type="color"
            value={buttonColor}
            onChange={(e) => setButtonColor(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] font-medium text-[#3C4045]">
          Button Text
        </p>
        <label className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center">
          <span
            className="absolute inset-0 rounded-full border border-black"
            style={{ backgroundColor: buttonTextColor }}
          />
          <input
            type="color"
            value={buttonTextColor}
            onChange={(e) => setButtonTextColor(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>
    </div>
  );
}

/* ---------- Shared bits ---------- */
 
