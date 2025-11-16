"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { FeaturesMegaMenu } from "@/components/features-megamenu";
import "./navbar.css";

const ACTIVE_BLUE_CLASS = "wf-nav-link-active";
const ACTIVE_BLUE_BG = "wf-nav-cta-primary";
const ACTIVE_BLUE_SHADOW = "wf-nav-cta-primary-shadow";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastYRef = useRef(0);
  const ignoreScrollUntil = useRef(Date.now() + 150); // <<< hydration safe
  const pathname = usePathname();

  useEffect(() => {
    ignoreScrollUntil.current = Date.now() + 150;

    const handleScroll = () => {
      // Ignore scroll for first ~150ms to prevent hydration hiding navbar
      if (Date.now() < ignoreScrollUntil.current) return;

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

          <SolutionsMegaMenu />

          <Link
            href="/pricing"
            className={[linkBase, isPricing ? activeColor : inactiveColor].join(" ")}
          >
            Pricing
          </Link>
        </nav>

        {/* RIGHT CTAs */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/signin"
            className={["wf-nav-cta-secondary", "hidden md:inline-flex"].join(" ")}
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

/** Solutions mega menu (hover intent with small leave delay) */
function SolutionsMegaMenu() {
  const [open, setOpen] = useState(false);
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
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

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

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
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
        <span>Solutions</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          className={[
            "wf-nav-solutions-panel",
            "absolute left-1/2 top-8 -translate-x-1/2",
          ].join(" ")}
          role="dialog"
        >
          <Link href="/#solutions-agencies" className="wf-nav-solutions-item group">
            <span className="wf-nav-solutions-title">Studios &amp; agencies</span>
            <span className="wf-nav-solutions-body">
              Client workspaces, branded links, clean reporting.
            </span>
          </Link>

          <Link href="/#solutions-creators" className="wf-nav-solutions-item group">
            <span className="wf-nav-solutions-title">
              Creators &amp; personal brands
            </span>
            <span className="wf-nav-solutions-body">
              Link-in-bio, Kompi Codes™, offers in one hub.
            </span>
          </Link>

          <Link href="/#solutions-teams" className="wf-nav-solutions-item group">
            <span className="wf-nav-solutions-title">Growth &amp; marketing teams</span>
            <span className="wf-nav-solutions-body">
              Smart routing, analytics, multi-brand control.
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
