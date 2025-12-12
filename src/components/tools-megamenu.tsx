//src/components/tools-megamenu.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Type,
  Hash,
  MessageCircle,
  Quote,
  Video,
  LineChart,
  Link2,
  Percent,
  Calculator,
  FileImage,
  FileText,
  FileCode2,
  Lock,
  Dice5,
  Braces,
  Sparkles,
  Tag,
} from "lucide-react";

type Area = "content" | "growth" | "files" | "utility";

type Tool = {
  slug: string;
  name: string;
  desc: string;
  area: Area;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Category = {
  id: Area;
  label: string;
  kicker: string;
  items: Tool[];
};

const TOOLS: Tool[] = [
  // CONTENT
  {
    slug: "instagram-bio-generator",
    name: "Instagram bio generator",
    desc: "Write on-brand bios in seconds.",
    area: "content",
    icon: Quote,
  },
  {
    slug: "instagram-caption-generator",
    name: "Instagram caption generator",
    desc: "Scroll-stopping captions for posts.",
    area: "content",
    icon: MessageCircle,
  },
  {
    slug: "tiktok-bio-generator",
    name: "TikTok bio generator",
    desc: "Short, punchy profile intros.",
    area: "content",
    icon: Quote,
  },
  {
    slug: "tiktok-caption-generator",
    name: "TikTok caption generator",
    desc: "Ideas that fit TikTok's tone.",
    area: "content",
    icon: MessageCircle,
  },
  {
    slug: "youtube-title-generator",
    name: "YouTube title generator",
    desc: "High-converting titles for videos.",
    area: "content",
    icon: Video,
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag generator",
    desc: "Find hashtags that match your post.",
    area: "content",
    icon: Hash,
  },
  {
    slug: "case-converter",
    name: "Case converter",
    desc: "UPPER, lower, Title and more.",
    area: "content",
    icon: Type,
  },
  {
    slug: "character-counter",
    name: "Character counter",
    desc: "Stay inside platform limits.",
    area: "content",
    icon: Type,
  },
  {
    slug: "word-counter",
    name: "Word counter",
    desc: "Simple word & character counts.",
    area: "content",
    icon: Type,
  },

  // GROWTH / TRACKING
  {
    slug: "utm-builder",
    name: "UTM builder",
    desc: "Tag links for clean campaign data.",
    area: "growth",
    icon: Tag,
  },
  {
    slug: "profit-margin-calculator",
    name: "Profit margin calculator",
    desc: "Margin and markup, no spreadsheet.",
    area: "growth",
    icon: Percent,
  },
  {
    slug: "hourly-rate-calculator",
    name: "Hourly rate calculator",
    desc: "Turn project fees into hourly rates.",
    area: "growth",
    icon: Calculator,
  },
  {
    slug: "whatsapp-link-generator",
    name: "WhatsApp link generator",
    desc: "Create click-to-chat links in seconds.",
    area: "growth",
    icon: MessageCircle,
  },

  // FILES / PDF
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    desc: "Turn images into a single PDF.",
    area: "files",
    icon: FileImage,
  },
  {
    slug: "pdf-converter",
    name: "PDF converter",
    desc: "Convert PDFs between formats.",
    area: "files",
    icon: FileText,
  },
  {
    slug: "pdf-to-image",
    name: "PDF to image",
    desc: "Export PDF pages as images.",
    area: "files",
    icon: FileCode2,
  },

  // UTILITY
  {
    slug: "password-generator",
    name: "Password generator",
    desc: "Strong, random passwords on demand.",
    area: "utility",
    icon: Lock,
  },
  {
    slug: "random-number-generator",
    name: "Random number generator",
    desc: "Pick fair numbers in any range.",
    area: "utility",
    icon: Dice5,
  },
  {
    slug: "json-formatter",
    name: "JSON formatter",
    desc: "Pretty-print and validate JSON quickly.",
    area: "utility",
    icon: Braces,
  },
  {
    slug: "username-generator",
    name: "Username generator",
    desc: "Fresh username ideas for new accounts.",
    area: "utility",
    icon: LineChart,
  },
];

// Curated subset to avoid overwhelm (still “Browse all tools” for the full list)
const CURATED: Record<Area, string[]> = {
  content: [
    "instagram-caption-generator",
    "instagram-bio-generator",
    "tiktok-caption-generator",
    "youtube-title-generator",
    "hashtag-generator",
    "case-converter",
  ],
  growth: [
    "utm-builder",
    "whatsapp-link-generator",
    "profit-margin-calculator",
    "hourly-rate-calculator",
  ],
  files: ["image-to-pdf", "pdf-converter", "pdf-to-image"],
  utility: [
    "password-generator",
    "json-formatter",
    "random-number-generator",
    "username-generator",
  ],
};

const AREA_META: Record<Area, { label: string; kicker: string }> = {
  content: { label: "Content", kicker: "Write, format & post faster" },
  growth: { label: "Growth", kicker: "Track + improve what converts" },
  files: { label: "Files", kicker: "Clean up PDFs & assets" },
  utility: { label: "Utility", kicker: "Quick helpers for daily work" },
};

export function ToolsMegaMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Area>("content");
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  // Tell Navbar "a megamenu is open" so it doesn't scroll-hide
  useEffect(() => {
    if (open) document.documentElement.setAttribute("data-megamenu-open", "1");
    else document.documentElement.removeAttribute("data-megamenu-open");
    return () => document.documentElement.removeAttribute("data-megamenu-open");
  }, [open]);

  // Close on click-outside / Esc
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close whenever the route changes
  useEffect(() => {
    clearCloseTimer();
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isToolsRoute = pathname?.startsWith("/tools");

  const categories: Category[] = useMemo(() => {
    const bySlug = new Map(TOOLS.map((t) => [t.slug, t]));
    const build = (id: Area): Category => ({
      id,
      label: AREA_META[id].label,
      kicker: AREA_META[id].kicker,
      items: CURATED[id]
        .map((slug) => bySlug.get(slug))
        .filter(Boolean) as Tool[],
    });

    return [build("content"), build("growth"), build("files"), build("utility")];
  }, []);

  const activeCat = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      {/* Trigger */}
      <button
        type="button"
        className={[
          "inline-flex items-center gap-1",
          "text-sm font-medium",
          "wf-nav-link",
          open || isToolsRoute ? "wf-nav-link-active" : "",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>Tools</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Panel — same layout language as Features */}
      {open && (
        <div
          role="dialog"
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          className="
            fixed left-1/2 top-24 z-[60] grid
            w-[min(1360px,100vw-40px)]
            -translate-x-1/2
            overflow-hidden rounded-3xl
            border border-[color:var(--color-border)]
            bg-[color:var(--color-surface)] text-[color:var(--color-text)]
            [grid-template-columns:280px_1fr_420px]
          "
        >
          {/* Left rail */}
          <div className="border-r border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3">
            <div className="px-2 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
              Browse tools
            </div>

            <ul className="flex flex-col gap-2">
              {categories.map((c) => {
                const isActive = c.id === active;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(c.id)}
                      onFocus={() => setActive(c.id)}
                      className={[
                        "w-full rounded-2xl px-4 py-3 text-left text-[15px] transition-colors",
                        isActive
                          ? "bg-[color:#C4C8FF] text-[color:var(--color-text)]"
                          : "text-[color:var(--color-subtle)] hover:bg-[color:var(--color-surface)]",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>{c.label}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[color:#C4C8FF]" />
                        )}
                      </span>
                      <div className="mt-0.5 text-[12px] tracking-tight text-[color:var(--color-subtle)]">
                        {c.kicker}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 px-2">
              <Link
                href="/tools"
                onClick={() => {
                  clearCloseTimer();
                  setOpen(false);
                }}
                className="text-[12px] font-medium text-[color:#C4C8FF] underline-offset-2 hover:underline"
              >
                Browse all tools →
              </Link>
            </div>
          </div>

          {/* Middle column */}
          <div className="p-4">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2 px-1">
                <span className="h-4 w-0.5 rounded-full bg-[color:#C4C8FF]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  {activeCat.label}
                </span>
              </div>

              <Link
                href="/tools"
                onClick={() => {
                  clearCloseTimer();
                  setOpen(false);
                }}
                className="text-[12px] font-medium text-[color:#C4C8FF] hover:underline underline-offset-2"
              >
                All tools →
              </Link>
            </div>

            <div className="grid gap-2">
              {activeCat.items.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => {
                      clearCloseTimer();
                      setOpen(false);
                    }}
                    className="group flex items-start gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-[color:var(--color-bg)]"
                  >
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[color:#C4C8FF] text-[color:var(--color-text)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[15px] font-semibold text-[color:var(--color-text)] group-hover:text-[color:#C4C8FF]">
                        {tool.name}
                      </div>
                      <div className="text-[13px] text-[color:var(--color-subtle)]">
                        {tool.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 px-1 text-[11px] text-[color:var(--color-subtle)]">
              Curated highlights — see everything on{" "}
              <Link
                href="/tools"
                onClick={() => {
                  clearCloseTimer();
                  setOpen(false);
                }}
                className="font-medium text-[color:#C4C8FF] hover:underline underline-offset-2"
              >
                Tools
              </Link>
              .
            </div>
          </div>

          {/* Right featured — VISUAL (Linktree-style) */}
          <div className="p-4">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
              {/* Visual */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/kompi-analytics.png"
                  alt="Kompi tools + analytics preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Copy + CTAs */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                    Featured
                  </p>
                  <h3 className="text-[18px] font-semibold leading-snug text-[color:var(--color-text)]">
                    Tools that feel instant
                  </h3>
                  <p className="text-[13px] text-[color:var(--color-subtle)]">
                    Use any tool free — then connect the winners to short links,
                    QR codes and analytics.
                  </p>
                </div>

                <div className="mt-4 grid gap-2">
                  <Link
                    href="/tools"
                    onClick={() => {
                      clearCloseTimer();
                      setOpen(false);
                    }}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-2.5 text-[14px] font-semibold text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-bg)]"
                  >
                    Explore tools
                  </Link>

                  <Link
                    href="/signin"
                    onClick={() => {
                      clearCloseTimer();
                      setOpen(false);
                    }}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[color:#C4C8FF] px-5 py-2.5 text-[14px] font-semibold text-[color:var(--color-text)] transition-colors hover:brightness-105"
                  >
                    Sign up free
                  </Link>
                </div>

                <div className="mt-3 text-center text-[11px] text-[color:var(--color-subtle)]">
                  No login needed for tools • Upgrade when you’re ready
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
