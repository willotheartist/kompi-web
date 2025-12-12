//src/components/features-megamenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Link2,
  QrCode,
  BarChart3,
  LayoutGrid,
  Users,
  Sparkles,
  Tag,
} from "lucide-react";

type Item = {
  title: string;
  desc: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Category = {
  id: string;
  label: string;
  items: Item[];
};

const CATEGORIES: Category[] = [
  {
    id: "suite",
    label: "Kompi Suite",
    items: [
      {
        title: "Kompi Suite",
        desc: "All Kompi tools, one workspace.",
        href: "/kompi-suite",
        icon: Sparkles,
      },
      {
        title: "Short links",
        desc: "Branded slugs + clean tracking.",
        href: "/features/url-shortener",
        icon: Link2,
      },
      {
        title: "KR Codes",
        desc: "QR codes built for real-world use.",
        href: "/KR-Codes-QR-Code-Generator",
        icon: QrCode,
      },
      {
        title: "K-Cards",
        desc: "A premium alternative to link-in-bio.",
        href: "/k-cards",
        icon: LayoutGrid,
      },
    ],
  },
  {
    id: "share",
    label: "Share & Publish",
    items: [
      {
        title: "Link in bio",
        desc: "Your handle, your homepage.",
        href: "/creator-studio",
        icon: Users,
      },
      {
        title: "QR Menus",
        desc: "Restaurant menus you can update anytime.",
        href: "/qr-menus",
        icon: QrCode,
      },
      {
        title: "Free QR code",
        desc: "Fast QR codes — no login needed.",
        href: "/free-qr-code-generator",
        icon: QrCode,
      },
      {
        title: "Claim your handle",
        desc: "Reserve your Kompi name.",
        href: "/claim",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "grow",
    label: "Grow & Engage",
    items: [
      {
        title: "Customers",
        desc: "See use-cases by persona.",
        href: "/customers",
        icon: Users,
      },
      {
        title: "Pricing",
        desc: "Plans for creators, teams & agencies.",
        href: "/pricing",
        icon: Sparkles,
      },
      {
        title: "UTM builder",
        desc: "Campaign tags in seconds.",
        href: "/tools/utm-builder",
        icon: Tag,
      },
    ],
  },
  {
    id: "insights",
    label: "Measure & Optimize",
    items: [
      {
        title: "Analytics",
        desc: "Clicks, devices, referrers — explained.",
        href: "/kompi-suite",
        icon: BarChart3,
      },
    ],
  },
];

export function FeaturesMegaMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
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

  const activeCat = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

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
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-1 py-1 text-sm font-medium text-[color:var(--color-text)] transition-colors hover:text-[color:#C4C8FF]"
      >
        <span>Features</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Panel — centered to viewport (stable positioning) */}
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
              Explore
            </div>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((c) => {
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
                    </button>
                  </li>
                );
              })}
            </ul>
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
            </div>

            <div className="grid gap-2">
              {activeCat.items.map((it) => {
                const Icon = it.icon ?? Sparkles;
                return (
                  <Link
                    key={it.title}
                    href={it.href}
                    className="group flex items-start gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-[color:var(--color-bg)]"
                    onClick={() => {
                      clearCloseTimer();
                      setOpen(false);
                    }}
                  >
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[color:#C4C8FF] text-[color:var(--color-text)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[15px] font-semibold text-[color:var(--color-text)] group-hover:text-[color:#C4C8FF]">
                        {it.title}
                      </div>
                      <div className="text-[13px] text-[color:var(--color-subtle)]">
                        {it.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right featured — VISUAL (Linktree-style) */}
          <div className="p-4">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
              {/* Visual */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/kompi-branding.png"
                  alt="Kompi Suite preview"
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
                    Meet Kompi Suite
                  </h3>
                  <p className="text-[13px] text-[color:var(--color-subtle)]">
                    Links, KR Codes, K-Cards and QR menus — with analytics that
                    show what actually works.
                  </p>
                </div>

                <div className="mt-4 grid gap-2">
                  <Link
                    href="/kompi-suite"
                    onClick={() => {
                      clearCloseTimer();
                      setOpen(false);
                    }}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-2.5 text-[14px] font-semibold text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-bg)]"
                  >
                    Explore Kompi Suite
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
