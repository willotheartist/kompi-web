"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Link2,
  QrCode,
  BarChart3,
  LayoutGrid,
  Globe,
  Shuffle,
  Users,
  ShieldCheck,
  FileDown,
  Sparkles,
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
    id: "create",
    label: "Create",
    items: [
      {
        title: "Short links",
        desc: "Memorable, trackable links with neat slugs.",
        href: "/features/url-shortener",
        icon: Link2,
      },
      {
        title: "KR Codes",
        desc: "Generate Kompi KR Codes for print, events and packaging.",
        href: "/KR-Codes-QR-Code-Generator",
        icon: LayoutGrid,
      },
      {
        title: "Kompi Codes™ (QR)",
        desc: "On-brand QR codes for campaigns and offline journeys.",
        href: "/KR-Codes-QR-Code-Generator",
        icon: QrCode,
      },
    ],
  },
  {
    id: "brand",
    label: "Brand & Publish",
    items: [
      {
        title: "Custom domains",
        desc: "Keep every click on your brand.",
        href: "#",
        icon: Globe,
      },
      {
        title: "Smart routing",
        desc: "Send visitors by device, geo or campaign.",
        href: "#",
        icon: Shuffle,
      },
      {
        title: "Link presets",
        desc: "Reusable UTM + branding defaults for teams.",
        href: "#",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "measure",
    label: "Measure",
    items: [
      {
        title: "Analytics",
        desc: "Clicks, referrers, locations and devices.",
        href: "#",
        icon: BarChart3,
      },
      {
        title: "Reports & export",
        desc: "Share clean numbers or export to CSV.",
        href: "#",
        icon: FileDown,
      },
    ],
  },
  {
    id: "collab",
    label: "Collaborate",
    items: [
      {
        title: "Workspaces & roles",
        desc: "Multi-brand, client-ready spaces with permissions.",
        href: "#",
        icon: Users,
      },
      {
        title: "Approvals",
        desc: "Optional reviews before links go live.",
        href: "#",
        icon: ShieldCheck,
      },
    ],
  },
];

export function FeaturesMegaMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    closeTimer.current = setTimeout(() => setOpen(false), 150); // small grace period
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

  const activeCat =
    CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        className="inline-flex items-center gap-1 px-1 py-1 text-sm font-medium text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-accent)]"
      >
        <span>Features</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Panel — centered to viewport */}
      {open && (
        <div
          role="dialog"
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          className="
            fixed left-1/2 top-24 z-[60] grid
            w-[min(1120px,100vw-40px)]
            -translate-x-1/2
            overflow-hidden rounded-3xl
            border border-[color:var(--color-border)]
            bg-[color:var(--color-surface)] text-[color:var(--color-text)]
            [grid-template-columns:260px_1fr_340px]
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
                          ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]"
                          : "text-[color:var(--color-subtle)] hover:bg-[color:var(--color-surface)]",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>{c.label}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
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
                <span className="h-4 w-0.5 rounded-full bg-[color:var(--color-accent)]" />
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
                  >
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[15px] font-semibold text-[color:var(--color-text)] group-hover:text-[color:var(--color-accent)]">
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

          {/* Right featured */}
          <div className="p-4">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
              <div className="space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  Featured
                </div>

                <div className="space-y-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]">
                      <Link2 className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[15px] font-semibold text-[color:var(--color-text)]">
                        One workspace, everything tracked
                      </div>
                      <div className="text-[13px] text-[color:var(--color-subtle)]">
                        Ship short links, KR Codes and Kompi Codes™ — then
                        report in minutes.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/signin"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-[14px] font-semibold text-[color:var(--color-text)] transition-colors hover:brightness-105"
              >
                Try Kompi free
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
