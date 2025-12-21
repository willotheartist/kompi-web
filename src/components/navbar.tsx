"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  User,
  Store,
  Users,
  Megaphone,
  Briefcase,
  Calendar,
  Sparkles,
  LayoutGrid,
  QrCode,
  Link2,
  Tag,
} from "lucide-react";
import { FeaturesMegaMenu } from "@/components/features-megamenu";
import { ToolsMegaMenu } from "@/components/tools-megamenu";
import "./navbar.css";

const ACTIVE_BLUE_CLASS = "wf-nav-link-active";
const ACTIVE_BLUE_BG = "wf-nav-cta-primary";
const ACTIVE_BLUE_SHADOW = "wf-nav-cta-primary-shadow";

type MobileSectionId =
  | "features"
  | "tools"
  | "customers"
  | "pricing";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastYRef = useRef(0);
  const ignoreScrollUntil = useRef<number | null>(null);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  
  const closeMobile = useCallback(() => setMobileOpen(false), []);


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
    <>
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

          {/* RIGHT CTAs (DESKTOP) */}
          <div className="hidden md:flex items-center gap-2.5">
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

          {/* MOBILE: hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); requestAnimationFrame(() => setMobileOpen(true)); }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface)"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>
      </div>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </>
  );
}


function MobileNavRow({
  label,
  onClick,
  right,
}: {
  label: string;
  onClick?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-5 text-left"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <span className="text-[22px] font-semibold tracking-tight">{label}</span>
      {right ?? <ChevronRight className="h-6 w-6 opacity-60" />}
    </button>
  );
}

function MobileNavSubLink({
  href,
  icon: Icon,
  title,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between py-4"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <span className="flex items-center gap-3 text-[18px]">
        <Icon className="h-5 w-5 opacity-70" />
        {title}
      </span>
      <ChevronRight className="h-5 w-5 opacity-50" />
    </Link>
  );
}

/** Linktree-style full-screen mobile menu */
function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const lastPathRef = useRef<string>(pathname ?? "");
  const [expanded, setExpanded] = useState<MobileSectionId | null>(null);

  useEffect(() => {
    // When opened, reset accordion state (defer to satisfy react-hooks/set-state-in-effect)
    if (!open) return;
    const raf = requestAnimationFrame(() => setExpanded(null));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    // Close ONLY when the route actually changes while the sheet is open.
    if (!open) {
      lastPathRef.current = pathname ?? "";
      return;
    }
    const next = pathname ?? "";
    if (lastPathRef.current !== next) {
      const raf = requestAnimationFrame(onClose);
      lastPathRef.current = next;
      return () => cancelAnimationFrame(raf);
    }
    lastPathRef.current = next;
  }, [pathname, open, onClose]);
// lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const toggle = (id: MobileSectionId) =>
    setExpanded((cur) => (cur === id ? null : id));

  return (
    <div
      className={[
        "fixed inset-0 z-70 md:hidden",
        "transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={[
          "absolute inset-x-0 top-0",
          "h-svh",
          "bg-(--color-bg) text-(--color-text)",
        ].join(" ")}
      >
        {/* Top bar */}
        <div className="mx-auto w-full max-w-2xl px-5 pt-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" onClick={onClose} className="inline-flex">
                <Image
                  src="/Kompi..svg"
                  alt="Kompi"
                  width={112}
                  height={28}
                  priority
                  className="h-7 w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                onClick={onClose}
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-(--color-border) px-4 text-[15px] font-semibold"
              >
                Log in
              </Link>

              <Link
                href="/signin"
                onClick={onClose}
                className="inline-flex h-10 items-center justify-center rounded-2xl px-4 text-[15px] font-semibold text-white"
                style={{ backgroundColor: "#1E2330" }}
              >
                Sign up free
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#D5FF3E" }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Menu content */}
          <div className="mt-8">
            {/* Features */}
            <MobileNavRow
              label="Features"
              onClick={() => toggle("features")}
              right={
                <ChevronDown
                  className={[
                    "h-6 w-6 opacity-70 transition-transform",
                    expanded === "features" ? "rotate-180" : "",
                  ].join(" ")}
                />
              }
            />
            {expanded === "features" && (
              <div className="pb-2">
                <MobileNavSubLink href="/kompi-suite" icon={Sparkles} title="Kompi Suite" onClick={onClose}/>
                <MobileNavSubLink href="/features/url-shortener" icon={Link2} title="Short links" onClick={onClose}/>
                <MobileNavSubLink href="/KR-Codes-QR-Code-Generator" icon={QrCode} title="KR Codes" onClick={onClose}/>
                <MobileNavSubLink href="/k-cards" icon={LayoutGrid} title="K-Cards" onClick={onClose}/>
                <MobileNavSubLink href="/qr-menus" icon={QrCode} title="QR Menus" onClick={onClose}/>
                <MobileNavSubLink href="/free-qr-code-generator" icon={QrCode} title="Free QR code" onClick={onClose}/>
                <MobileNavSubLink href="/claim" icon={Sparkles} title="Claim your handle" onClick={onClose}/>
                <MobileNavSubLink href="/creator-studio" icon={User} title="Creator Studio" onClick={onClose}/>
              </div>
            )}

            {/* Tools */}
            <MobileNavRow
              label="Tools"
              onClick={() => toggle("tools")}
              right={
                <ChevronDown
                  className={[
                    "h-6 w-6 opacity-70 transition-transform",
                    expanded === "tools" ? "rotate-180" : "",
                  ].join(" ")}
                />
              }
            />
            {expanded === "tools" && (
              <div className="pb-2">
                <MobileNavSubLink href="/tools" icon={Sparkles} title="Browse all tools" onClick={onClose}/>
                <MobileNavSubLink href="/tools/utm-builder" icon={Tag} title="UTM builder" onClick={onClose}/>
                <MobileNavSubLink href="/tools/password-generator" icon={Sparkles} title="Password generator" onClick={onClose}/>
                <MobileNavSubLink href="/tools/image-to-pdf" icon={Sparkles} title="Image to PDF" onClick={onClose}/>
                <MobileNavSubLink href="/tools/case-converter" icon={Sparkles} title="Case converter" onClick={onClose}/>
                <MobileNavSubLink href="/tools/hashtag-generator" icon={Sparkles} title="Hashtag generator" onClick={onClose}/>
              </div>
            )}

            {/* Customers */}
            <MobileNavRow
              label="Customers"
              onClick={() => toggle("customers")}
              right={
                <ChevronDown
                  className={[
                    "h-6 w-6 opacity-70 transition-transform",
                    expanded === "customers" ? "rotate-180" : "",
                  ].join(" ")}
                />
              }
            />
            {expanded === "customers" && (
              <div className="pb-2">
                <MobileNavSubLink href="/customers" icon={Users} title="All customers" onClick={onClose}/>
                <MobileNavSubLink href="/customers/creators" icon={User} title="Creators" onClick={onClose}/>
                <MobileNavSubLink href="/customers/small-business" icon={Store} title="Small businesses" onClick={onClose}/>
                <MobileNavSubLink href="/customers/communities" icon={Users} title="Communities" onClick={onClose}/>
                <MobileNavSubLink href="/customers/brands" icon={Megaphone} title="Brands" onClick={onClose}/>
                <MobileNavSubLink href="/customers/agencies" icon={Briefcase} title="Agencies" onClick={onClose}/>
                <MobileNavSubLink href="/customers/events" icon={Calendar} title="Events" onClick={onClose}/>
              </div>
            )}

            {/* Pricing */}
            <Link
              href="/pricing"
              onClick={onClose}
              className="block"
              style={{ textDecoration: "none" }}
            >
              <div
                className="w-full flex items-center justify-between py-5 text-left"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span className="text-[22px] font-semibold tracking-tight">Pricing</span>
                <ChevronRight className="h-6 w-6 opacity-60" />
              </div>
            </Link>

            <div className="h-10" />
          </div>

        </div>
      </div>
    </div>
  );
}

/** Customers mega menu (persona-based, desktop only) */
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

  // Close whenever the route changes (avoid setState directly in effect)
  useEffect(() => {
    clearCloseTimer();
    const t = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t);
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
            fixed left-1/2 top-24 z-60
            w-[min(1120px,100vw-40px)]
            -translate-x-1/2
            overflow-hidden rounded-3xl
            border border-(--color-border)
            bg-(--color-surface)
            text-(--color-text)
            grid gap-0
            grid-cols-[2fr_1.2fr]
          "
        >
          {/* Customer list */}
          <div className="border-r border-(--color-border) bg-(--color-bg) p-4 md:p-5">
            <div className="flex items-center gap-2 px-1 pb-3">
              <span className="h-4 w-0.5 rounded-full bg-(--color-accent)" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">
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
                    className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-(--color-surface)"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#A5B0FF] text-[#D5FF3E]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[15px] font-medium text-(--color-text) group-hover:text-[#1E2330]">
                        {c.title}
                      </div>
                      <div className="text-[12px] text-(--color-subtle) group-hover:text-[#1E2330]/80">
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
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface)">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src="/kompiimage19.png"
                  alt="Communities using Kompi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4 md:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--color-subtle)">
                  Featured
                </p>
                <h3 className="text-[18px] font-semibold leading-snug text-[#1E2330]">
                  Social movement, not just a link in bio.
                </h3>
                <p className="text-[13px] text-(--color-subtle)">
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
