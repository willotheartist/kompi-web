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
        title: "Bio pages",
        desc: "Polished link-in-bio hubs for real brands.",
        href: "#",
        icon: LayoutGrid,
      },
      {
        title: "Kompi Codes™ (QR)",
        desc: "On-brand QR codes for print, events and packaging.",
        href: "#",
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
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-100 hover:text-white transition-colors px-1 py-1"
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
            fixed left-1/2 -translate-x-1/2 top-24 z-[60]
            w-[min(1120px,100vw-40px)]
            overflow-hidden rounded-3xl
            border border-neutral-200/70
            bg-white text-neutral-900
            shadow-[0_30px_120px_rgba(3,7,18,0.28)]
            backdrop-blur
            grid [grid-template-columns:270px_1fr_360px]
          "
        >
          {/* Left rail */}
          <div className="bg-neutral-50 border-r border-neutral-200 p-3">
            <div className="px-2 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
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
                        "w-full text-left rounded-2xl px-4 py-3 text-[15px] transition-colors",
                        isActive
                          ? "bg-white shadow-sm text-neutral-900"
                          : "text-neutral-700 hover:bg-white/70",
                      ].join(" ")}
                    >
                      {c.label}
                      {isActive && <span className="ml-1 text-[color:var(--color-accent)]">▸</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Middle column */}
          <div className="p-4">
            <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              {activeCat.label}
            </div>
            <div className="grid gap-2">
              {activeCat.items.map((it) => {
                const Icon = it.icon ?? Sparkles;
                return (
                  <Link
                    key={it.title}
                    href={it.href}
                    className="group flex items-start gap-4 rounded-2xl px-4 py-3 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white ring-1 ring-black/5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[15px] font-semibold text-neutral-900 group-hover:underline underline-offset-2">
                        {it.title}
                      </div>
                      <div className="text-[13px] text-neutral-500">{it.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right featured */}
          <div className="p-4">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
              <div className="space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Featured
                </div>

                <div className="rounded-xl border border-neutral-200 p-4 bg-[radial-gradient(120%_120%_at_80%_0%,rgba(0,0,0,0.08),transparent_40%)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white ring-1 ring-black/5">
                      <Link2 className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[15px] font-semibold">
                        One workspace, everything tracked
                      </div>
                      <div className="text-[13px] text-neutral-500">
                        Ship links, bio pages and Kompi Codes™ — then report in minutes.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/signin"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-[14px] font-semibold text-white hover:brightness-110 transition-all shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
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
