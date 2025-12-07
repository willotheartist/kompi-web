"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

type Area = "content" | "growth" | "files" | "utility";

type Tool = {
  slug: string;
  name: string;
  desc: string;
  area: Area;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
    icon: Link2,
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

const AREAS: { id: Area; title: string; label: string }[] = [
  {
    id: "content",
    title: "Creative content tools",
    label: "Write, format & post faster",
  },
  {
    id: "growth",
    title: "Growth & tracking tools",
    label: "Understand what’s working",
  },
  {
    id: "files",
    title: "File & PDF tools",
    label: "Tidy up assets and docs",
  },
  {
    id: "utility",
    title: "Utility tools",
    label: "Everyday helpers",
  },
];

export function ToolsMegaMenu() {
  const [open, setOpen] = useState(false);
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
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const isToolsRoute = pathname?.startsWith("/tools");

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
      >
        <span>Tools</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          role="dialog"
          className="
            fixed left-1/2 top-24 z-[60]
            w-[min(1200px,100vw-40px)]
            -translate-x-1/2
            rounded-[28px]
            border border-[color:var(--color-border)]
            bg-[#FBF9F3]
            text-[color:var(--color-text)]
            shadow-lg
            p-5 md:p-6
          "
        >
          {/* Top bar: just 'Browse all tools' on the right */}
          <div className="mb-3 flex justify-end">
            <Link
              href="/tools"
              onClick={() => {
                clearCloseTimer();
                setOpen(false);
              }}
              className="text-[12px] font-medium text-[#A5B0FF] underline-offset-2 hover:underline"
            >
              Browse all tools →
            </Link>
          </div>

          {/* Columns */}
          <div
            className="
              grid gap-5 md:gap-6
              [grid-template-columns:1.7fr_1.5fr_1.2fr_1.2fr]
              max-md:[grid-template-columns:1fr_1fr]
            "
          >
            {AREAS.map((area, idx) => {
              const tools = TOOLS.filter((t) => t.area === area.id);
              if (!tools.length) return null;

              return (
                <section
                  key={area.id}
                  className={[
                    "flex flex-col gap-3",
                    idx !== 0
                      ? "border-l border-dashed border-[rgba(15,23,42,0.1)] pl-4"
                      : "",
                  ].join(" ")}
                >
                  {/* Column header – plain text, no box, no all caps */}
                  <div className="space-y-0.5">
                    <div className="text-[13px] font-semibold tracking-tight text-[#1E2330]">
                      {area.title}
                    </div>
                    <div className="text-[12px] tracking-tight text-[color:var(--color-subtle)]">
                      {area.label}
                    </div>
                  </div>

                  {/* Tools list */}
                  <div className="space-y-1">
                    {tools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          onClick={() => {
                            clearCloseTimer();
                            setOpen(false);
                          }}
                          className="
                            group flex items-center justify-between gap-3
                            rounded-xl border border-transparent
                            bg-white/70 px-3 py-2.5
                            text-left text-[13px]
                            transition-all
                            hover:bg-white
                            hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                            hover:-translate-y-[1px]
                          "
                        >
                          <div className="space-y-0.5">
                            <div
                              className="
                                text-[14px] font-medium text-[#1E2330]
                                tracking-tight
                                transition-transform
                                group-hover:translate-x-[2px]
                              "
                            >
                              {tool.name}
                            </div>
                            <div
                              className="
                                text-[12px] tracking-tight
                                text-[color:var(--color-subtle)]
                                transition-transform
                                group-hover:translate-x-[2px]
                              "
                            >
                              {tool.desc}
                            </div>
                          </div>
                          <div
                            className="
                              flex h-8 w-8 items-center justify-center
                              rounded-full border border-[rgba(15,23,42,0.2)]
                              bg-white
                              text-[rgba(15,23,42,0.55)]
                              transition-all
                              group-hover:border-[#A5B0FF]
                              group-hover:text-[#A5B0FF]
                              group-hover:translate-x-[2px]
                            "
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-[rgba(15,23,42,0.08)] pt-3 text-[11px] text-[color:var(--color-subtle)]">
            <span>Use any tool free • No login needed</span>
            <Link
              href="/tools"
              onClick={() => {
                clearCloseTimer();
                setOpen(false);
              }}
              className="text-[11px] font-medium tracking-tight text-[#A5B0FF] hover:underline"
            >
              Browse all tools →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
