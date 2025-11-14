"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { FeaturesMegaMenu } from "@/components/features-megamenu";

const ACTIVE_BLUE_CLASS = "text-[#365DFF]";
const ACTIVE_BLUE_BG = "bg-[#365DFF]";
const ACTIVE_BLUE_SHADOW = "shadow-[0_10px_30px_rgba(54,93,255,0.45)]";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
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

  const linkBase = "text-sm font-medium transition-colors hover:text-white";
  const inactiveColor = "text-zinc-100";
  const activeColor = ACTIVE_BLUE_CLASS;

  const isPricing = pathname?.startsWith("/pricing");

  return (
    <div
      className={[
        "fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300",
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
        atTop ? "mt-4" : "mt-2",
      ].join(" ")}
    >
      <header
        className={[
          "w-full max-w-7xl",
          "px-6 py-4",
          "rounded-3xl",
          "bg-[#03071E]/95 backdrop-blur-2xl",
          "shadow-[0_18px_70px_rgba(3,7,18,0.55)]",
          "border border-white/10",
          "flex items-center justify-between gap-6",
        ].join(" ")}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center hover:opacity-95 transition-opacity"
        >
          <Image
            src="/Kompiwhite.svg"
            alt="Kompi"
            width={120}
            height={40}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* NAV (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="text-zinc-100">
            <FeaturesMegaMenu />
          </div>

          <SolutionsMegaMenu />

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
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className={[
              "hidden md:inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
              "border border-white/18",
              "text-zinc-100 hover:text-white hover:border-white/40 transition-colors",
            ].join(" ")}
          >
            Log in
          </Link>

          <Link
            href="/signin"
            className={[
              "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold",
              ACTIVE_BLUE_BG,
              "text-white",
              ACTIVE_BLUE_SHADOW,
              "hover:brightness-110 transition-all",
            ].join(" ")}
          >
            Sign up free
          </Link>
        </div>
      </header>
    </div>
  );
}

/** Solutions mega menu (hover-intent with small leave delay) */
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
    // small grace period so cursor can travel from trigger to panel
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  // Optional: close on click outside / Esc
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
          open ? ACTIVE_BLUE_CLASS : "text-zinc-100",
          "hover:text-white transition-colors",
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
            "absolute left-1/2 top-8 -translate-x-1/2",
            "w-[340px]",
            "rounded-2xl border border-white/10",
            "bg-[#04071F]/98 backdrop-blur-2xl",
            "shadow-[0_22px_80px_rgba(3,7,18,0.9)]",
            "p-4 grid gap-2",
          ].join(" ")}
          role="dialog"
        >
          <Link
            href="/#solutions-agencies"
            className="group flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-semibold text-white">
              Studios & agencies
            </span>
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300">
              Client workspaces, branded links, clean reporting.
            </span>
          </Link>

          <Link
            href="/#solutions-creators"
            className="group flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-semibold text-white">
              Creators & personal brands
            </span>
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300">
              Link-in-bio, Kompi Codes™, offers in one hub.
            </span>
          </Link>

          <Link
            href="/#solutions-teams"
            className="group flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-semibold text-white">
              Growth & marketing teams
            </span>
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300">
              Smart routing, analytics, multi-brand control.
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
