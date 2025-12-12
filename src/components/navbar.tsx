//src/components/navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  User,
  Store,
  Users,
  Megaphone,
  Briefcase,
  Calendar,
} from "lucide-react";
import { FeaturesMegaMenu } from "@/components/features-megamenu";
import { ToolsMegaMenu } from "@/components/tools-megamenu";
import "./navbar.css";

const ACTIVE_BLUE_CLASS = "wf-nav-link-active";
const ACTIVE_BLUE_BG = "wf-nav-cta-primary";
const ACTIVE_BLUE_SHADOW = "wf-nav-cta-primary-shadow";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastYRef = useRef(0);
  const ignoreScrollUntil = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize the ignore window once on mount to avoid hydration issues
    if (ignoreScrollUntil.current === null) {
      ignoreScrollUntil.current = Date.now() + 150;
    }

    const handleScroll = () => {
      // Ignore scroll for first ~150ms to prevent hydration hiding navbar
      if (
        ignoreScrollUntil.current !== null &&
        Date.now() < ignoreScrollUntil.current
      ) {
        return;
      }

      // ✅ If any megamenu is open, don't auto-hide the navbar on scroll
      const menuOpen =
        document.documentElement.getAttribute("data-megamenu-open") === "1";

      if (menuOpen) {
        setHidden(false);
        const yNow = window.scrollY || 0;
        setAtTop(yNow < 8);
        lastYRef.current = yNow;
        return;
      }

      const y = window.scrollY || 0;
      const diff = y - lastYRef.current;

      setAtTop(y < 8);

      if (Math.abs(diff) > 4) {
        if (y > 40 && diff > 0) setHidden(true);
        else setHidden(false);
      }

      lastYRef.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkBase = "wf-nav-link";
  const inactiveColor = "";
  const activeColor = ACTIVE_BLUE_CLASS;

  const isPricing = pathname?.startsWith("/pricing");

  return (
    <div
      className={[
        "fixed inset-x-0 top-0 z-50 flex justify-center",
        "transition-all duration-300",
        hidden ? "wf-nav-hidden" : "wf-nav-visible",
        atTop ? "wf-nav-top" : "wf-nav-scrolled",
      ].join(" ")}
    >
      <header
        className={[
          "wf-nav-shell",
          "w-full max-w-7xl",
          "px-4 md:px-6 py-3 md:py-4",
          "rounded-2xl md:rounded-3xl",
          "flex items-center justify-between gap-4 md:gap-6",
        ].join(" ")}
      >
        {/* LOGO */}
        <Link href="/" className="wf-nav-logo">
          <Image
            src="/Kompi..svg"
            alt="Kompi"
            width={120}
            height={40}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* NAV (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="wf-nav-link-wrap">
            <FeaturesMegaMenu />
          </div>

          <div className="wf-nav-link-wrap">
            <ToolsMegaMenu />
          </div>

          <CustomersMegaMenu />

          <Link
            href="/pricing"
            className={[linkBase, isPricing ? activeColor : inactiveColor].join(
              " "
            )}
          >
            Pricing
          </Link>
        </nav>

        {/* RIGHT CTAs */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/signin"
            className={["wf-nav-cta-secondary", "hidden md:inline-flex"].join(
              " "
            )}
          >
            Log in
          </Link>

          <Link
            href="/signin"
            className={[
              "inline-flex items-center justify-center",
              "text-sm font-semibold",
              "rounded-full px-4 py-2",
              ACTIVE_BLUE_BG,
              ACTIVE_BLUE_SHADOW,
            ].join(" ")}
          >
            Sign up free
          </Link>
        </div>
      </header>
    </div>
  );
}

/** Customers mega menu (persona-based, similar feel to Features) */
function CustomersMegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const CUSTOMERS = [
    {
      id: "creators",
      title: "Creators & personal brands",
      desc: "Grow your audience with links, K-Cards and Kompi Codes™.",
      href: "/customers/creators",
      icon: User,
    },
    {
      id: "small-business",
      title: "Small businesses",
      desc: "QR menus, offers and trackable links in one simple workspace.",
      href: "/customers/small-business",
      icon: Store,
    },
    {
      id: "communities",
      title: "Communities & memberships",
      desc: "Events, updates and member-only links powered by Kompi.",
      href: "/customers/communities",
      icon: Users,
    },
    {
      id: "brands",
      title: "Brands & marketing teams",
      desc: "Campaign routing, clean analytics and multi-channel reporting.",
      href: "/customers/brands",
      icon: Megaphone,
    },
    {
      id: "agencies",
      title: "Studios & agencies",
      desc: "Client workspaces, branded links and clear exportable reports.",
      href: "/customers/agencies",
      icon: Briefcase,
    },
    {
      id: "events",
      title: "Events & venues",
      desc: "QR schedules, menus, sponsors and real-time scan insights.",
      href: "/customers/events",
      icon: Calendar,
    },
  ] as const;

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
          open ? "wf-nav-link-active" : "",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>Customers</span>
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
            w-[min(1120px,100vw-40px)]
            -translate-x-1/2
            overflow-hidden rounded-3xl
            border border-[color:var(--color-border)]
            bg-[color:var(--color-surface)]
            text-[color:var(--color-text)]
           
            grid gap-0
            [grid-template-columns:2fr_1.2fr]
          "
        >
          {/* Customer list */}
          <div className="border-r border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 md:p-5">
            <div className="flex items-center gap-2 px-1 pb-3">
              <span className="h-4 w-0.5 rounded-full bg-[color:var(--color-accent)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                Customers
              </span>
            </div>
            <div className="grid gap-1.5">
              {CUSTOMERS.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.id}
                    href={c.href}
                    onClick={() => {
                      clearCloseTimer();
                      setOpen(false);
                    }}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-[color:var(--color-surface)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-[#A5B0FF] text-[#D5FF3E]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[15px] font-medium text-[color:var(--color-text)] group-hover:text-[#1E2330]">
                        {c.title}
                      </div>
                      <div className="text-[12px] text-[color:var(--color-subtle)] group-hover:text-[#1E2330]/80">
                        {c.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Featured story / CTA */}
          <div className="p-4 md:p-5">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/kompiimage19.png"
                  alt="Communities using Kompi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4 md:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  Featured
                </p>
                <h3 className="text-[18px] font-semibold leading-snug text-[#1E2330]">
                  Social movement, not just a link in bio.
                </h3>
                <p className="text-[13px] text-[color:var(--color-subtle)]">
                  Communities, brands and teams use Kompi to turn everyday links
                  and QR codes into ongoing conversations, not one-off clicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
