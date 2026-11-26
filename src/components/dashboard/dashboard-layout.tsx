"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, LayoutGroup, motion, MotionConfig } from "framer-motion";
import { ArrowUpRight, ChevronRight, Menu, PanelLeftClose, PanelLeftOpen, Plus, Search, X } from "lucide-react";
import { AccountMenu } from "./account-menu";
import { CommandPalette } from "./shell/command-palette";
import { CreateMenu } from "./shell/create-menu";
import { RouteProgress } from "./shell/route-progress";
import { CREATE_OPTIONS, useCreate } from "./shell/create-actions";
import { FOOTER_NAV, NAV_GROUPS, isActive, titleFor, type NavItem } from "./shell/nav";
import { useWorkspaceSummary } from "./shell/use-workspace-summary";
import { PUBLIC_SITE_URL } from "@/lib/urls";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const COLLAPSE_KEY = "kompi-sidebar-collapsed";

/**
 * Pages historically wrapped themselves in <DashboardLayout>. The shell now lives in the
 * route-group layout so it persists between pages; nested instances just render children.
 */
const ShellContext = createContext(false);

type Props = { children: ReactNode; pageTitle?: string; pageEyebrow?: string; pageDescription?: string };

export function DashboardLayout({ children }: Props) {
  const nested = useContext(ShellContext);
  if (nested) return <>{children}</>;
  return (
    <ShellContext.Provider value>
      <MotionConfig reducedMotion="user">
        <Shell>{children}</Shell>
      </MotionConfig>
    </ShellContext.Provider>
  );
}

export default DashboardLayout;

function Shell({ children }: { children: ReactNode }) {
  const path = usePathname() || "/";
  const { status } = useSession();
  // "loading" is treated as signed in: private routes are already protected by the proxy,
  // so this avoids flashing a Sign in button on every hard load.
  const guest = status === "unauthenticated";
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { title, parent } = titleFor(path);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore a per-browser preference after hydration.
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {}
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((v) => {
      try {
        localStorage.setItem(COLLAPSE_KEY, v ? "0" : "1");
      } catch {}
      return !v;
    });
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        e.preventDefault();
        toggleCollapsed();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleCollapsed]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile overlays after navigating.
    setDrawerOpen(false);
    setSheetOpen(false);
  }, [path]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#151619]" style={{ ["--sidebar-w" as string]: collapsed ? "76px" : "260px" }}>
      <Suspense>
        <RouteProgress />
      </Suspense>

      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 260 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-[#E3E5E7] bg-white lg:flex"
      >
        <Sidebar path={path} collapsed={collapsed} guest={guest} onSearch={() => setPaletteOpen(true)} onToggle={toggleCollapsed} />
      </motion.aside>

      <div className="transition-[padding] duration-300 ease-[cubic-bezier(.16,1,.3,1)] lg:pl-[var(--sidebar-w)]">
        <header className="sticky top-0 z-30 border-b border-[#E3E5E7] bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-8">
            <div className="flex min-w-0 items-center gap-2">
              <button
                className="-ml-1 grid size-10 place-items-center rounded-[10px] text-[#3C4045] hover:bg-[#F3F4F5] lg:hidden"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <Link href={guest ? PUBLIC_SITE_URL : "/dashboard"} className="mr-1 text-[20px] font-medium tracking-[-0.05em] lg:hidden">
                K.
              </Link>
              <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[15px]">
                {parent && (
                  <>
                    <Link href={parent.href} className="hidden truncate text-[#80858C] transition-colors hover:text-[#151619] sm:block">
                      {parent.label}
                    </Link>
                    <ChevronRight size={15} className="hidden shrink-0 text-[#B0B4BA] sm:block" />
                  </>
                )}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={title}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="truncate font-medium"
                  >
                    {title}
                  </motion.span>
                </AnimatePresence>
              </nav>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setPaletteOpen(true)}
                className="hidden h-10 w-[260px] items-center gap-2.5 rounded-[10px] border border-[#E3E5E7] bg-[#FAFAFB] px-3 text-[14px] text-[#8A9099] transition-colors hover:border-[#CDD1D7] hover:text-[#3C4045] md:flex xl:w-[320px]"
              >
                <Search size={16} />
                <span className="flex-1 text-left">Search or jump to…</span>
                <kbd className="rounded-[5px] border border-[#E3E5E7] bg-white px-1.5 text-[11px] font-medium text-[#80858C]">⌘K</kbd>
              </button>
              <button
                onClick={() => setPaletteOpen(true)}
                className="grid size-10 place-items-center rounded-[10px] text-[#3C4045] hover:bg-[#F3F4F5] md:hidden"
                aria-label="Search"
              >
                <Search size={19} />
              </button>
              {guest ? (
                <Link className="rounded-full bg-[#151619] px-5 py-2.5 text-sm font-medium text-white" href={`/signin?callbackUrl=${encodeURIComponent(path)}`}>
                  Sign in
                </Link>
              ) : (
                <AccountMenu />
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] px-4 pb-32 pt-6 sm:px-8 sm:pt-8 lg:pb-12">
          <motion.div key={transitionKey(path)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, ease: EASE }}>
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile tab bar */}
      {!guest && <MobileTabs path={path} onCreate={() => setSheetOpen(true)} />}

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} path={path} guest={guest} onSearch={() => { setDrawerOpen(false); setPaletteOpen(true); }} />
      <CreateSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} signedIn={!guest} />
    </div>
  );
}

/** Sub-pages that share an inner layout (settings tabs) keep their wrapper mounted. */
function transitionKey(path: string) {
  return path.startsWith("/dashboard/settings") ? "/dashboard/settings" : path;
}

function Sidebar({ path, collapsed, guest, onSearch, onToggle, onClose }: { path: string; collapsed: boolean; guest: boolean; onSearch: () => void; onToggle?: () => void; onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col px-3 pb-4 pt-5">
      <div className={cn("flex items-start justify-between", collapsed ? "flex-col items-center gap-3" : "px-2")}>
        <Link href={guest ? PUBLIC_SITE_URL : "/dashboard"} className="block">
          <span className="text-[28px] font-medium leading-none tracking-[-0.06em]">{collapsed ? "K." : "Kompi."}</span>
          {!collapsed && <span className="mt-2 block whitespace-nowrap text-[13px] text-[#80858C]">A little more connected.</span>}
        </Link>
        {onClose ? (
          <button onClick={onClose} aria-label="Close menu" className="grid size-8 place-items-center rounded-[8px] text-[#696C72] hover:bg-[#F3F4F5]">
            <X size={18} />
          </button>
        ) : (
          <button
            onClick={onToggle}
            className="grid size-8 place-items-center rounded-[8px] text-[#8A9099] transition-colors hover:bg-[#F3F4F5] hover:text-[#151619]"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={`${collapsed ? "Expand" : "Collapse"} sidebar (⌘\\)`}
          >
            {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <CreateMenu collapsed={collapsed} />
        {collapsed && (
          <button onClick={onSearch} title="Search (⌘K)" aria-label="Search" className="grid h-10 w-full place-items-center rounded-[10px] text-[#696C72] hover:bg-[#F3F4F5]">
            <Search size={18} />
          </button>
        )}
      </div>

      <LayoutGroup id="sidebar">
        <nav aria-label="Workspace" className="mt-5 flex-1 space-y-5 overflow-y-auto overflow-x-hidden">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className={cn("mb-1.5 h-4 px-3 text-[11px] font-medium uppercase tracking-[0.09em] text-[#A2A6AC] transition-opacity", collapsed && "opacity-0")}>
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} active={isActive(item, path)} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4 space-y-0.5 border-t border-[#EDEEF0] pt-3">
          {!guest && !collapsed && <PlanMeter />}
          {FOOTER_NAV.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item, path)} collapsed={collapsed} subtle />
          ))}
          {!collapsed && (
            <a href={PUBLIC_SITE_URL} className="group flex items-center gap-1.5 px-3 pt-2 text-[13px] text-[#8A9099] transition-colors hover:text-[#151619]">
              Visit kompi.app
              <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
          )}
        </div>
      </LayoutGroup>
    </div>
  );
}

function NavLink({ item, active, collapsed, subtle }: { item: NavItem; active: boolean; collapsed: boolean; subtle?: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-[11px] text-[14px] transition-colors",
        subtle ? "h-10" : "h-11",
        collapsed ? "justify-center px-0" : "px-3",
        active ? "font-medium text-[#151619]" : "text-[#5A5E65] hover:text-[#151619]",
      )}
    >
      {active ? (
        <motion.span layoutId="nav-active" className="absolute inset-0 rounded-[11px] bg-[#FBE4FA]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
      ) : (
        <span className="absolute inset-0 rounded-[11px] bg-[#F3F4F5] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
      )}
      <span className="relative grid place-items-center transition-transform duration-200 ease-out group-hover:scale-110 group-active:scale-95">
        <Icon size={subtle ? 17 : 18} strokeWidth={active ? 2 : 1.75} />
      </span>
      {!collapsed && <span className="relative truncate">{item.label}</span>}
    </Link>
  );
}

function PlanMeter() {
  const summary = useWorkspaceSummary();
  if (!summary?.usage) return <div className="mb-2 h-[94px] rounded-[12px] border border-[#EDEEF0] bg-[#FAFAFB]" />;
  const rows = [
    { label: "Cards", used: summary.usage.kCards, max: summary.limits.kCards },
    { label: "QR codes", used: summary.usage.krCodes, max: summary.limits.krCodes },
    { label: "Links", used: summary.usage.links, max: summary.limits.links },
  ];
  const free = !summary.plan || summary.plan === "FREE";
  return (
    <Link href="/dashboard/settings/billing" className="group mb-2 block rounded-[12px] border border-[#EDEEF0] bg-[#FAFAFB] p-3 transition-colors hover:border-[#DCDFE3]">
      <div className="mb-2.5 flex items-center justify-between text-[12px]">
        <span className="font-medium text-[#151619]">{summary.planName} plan</span>
        <span className="text-[#8A9099] transition-colors group-hover:text-[#151619]">{free ? "Upgrade" : "Manage"}</span>
      </div>
      <div className="space-y-2">
        {rows.map((r) => {
          const pct = Math.min(100, r.max ? (r.used / r.max) * 100 : 0);
          return (
            <div key={r.label}>
              <div className="mb-1 flex justify-between text-[11px] text-[#80858C]">
                <span>{r.label}</span>
                <span className="tabular-nums">
                  {r.used.toLocaleString()} / {r.max.toLocaleString()}
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-[#E9EBEE]">
                <motion.div
                  className={cn("h-full rounded-full", pct >= 90 ? "bg-[#B4473E]" : "bg-[#151619]")}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(pct, r.used ? 3 : 0)}%` }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Link>
  );
}

const MOBILE_TABS = [NAV_GROUPS[0].items[0], NAV_GROUPS[1].items[0], null, NAV_GROUPS[1].items[1], NAV_GROUPS[1].items[2]] as const;

function MobileTabs({ path, onCreate }: { path: string; onCreate: () => void }) {
  return (
    <nav
      aria-label="Mobile workspace"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 items-end border-t border-[#E3E5E7] bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md lg:hidden"
    >
      <LayoutGroup id="mobile-tabs">
        {MOBILE_TABS.map((item, i) => {
          if (!item)
            return (
              <div key="create" className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={onCreate}
                  aria-label="Create"
                  className="mb-1 grid size-12 place-items-center rounded-full bg-[#151619] text-white"
                >
                  <Plus size={22} />
                </motion.button>
              </div>
            );
          const Icon = item.icon;
          const active = isActive(item, path);
          return (
            <Link
              key={i}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn("relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-[12px] text-[11px]", active ? "font-medium text-[#151619]" : "text-[#696C72]")}
            >
              {active && <motion.span layoutId="mtab" className="absolute inset-x-2 inset-y-0.5 rounded-[12px] bg-[#FBE4FA]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
              <Icon size={20} strokeWidth={active ? 2 : 1.75} className="relative" />
              <span className="relative">{item.short ?? item.label}</span>
            </Link>
          );
        })}
      </LayoutGroup>
    </nav>
  );
}

function MobileDrawer({ open, onClose, path, guest, onSearch }: { open: boolean; onClose: () => void; path: string; guest: boolean; onSearch: () => void }) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-[#151619]/30 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-label="Menu"
            className="fixed inset-y-0 left-0 z-[61] flex w-[min(300px,86vw)] flex-col border-r border-[#E3E5E7] bg-white lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <Sidebar path={path} collapsed={false} guest={guest} onSearch={onSearch} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CreateSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { create, busy } = useCreate();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-[#151619]/30 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            role="dialog"
            aria-label="Create"
            className="fixed inset-x-0 bottom-0 z-[61] rounded-t-[22px] border-t border-[#E3E5E7] bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 lg:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.36, ease: EASE }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => info.offset.y > 80 && onClose()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#DCDFE3]" />
            <p className="mb-3 px-1 text-[17px] font-medium tracking-[-0.02em]">What would you like to make?</p>
            <div className="space-y-2">
              {CREATE_OPTIONS.map((o, i) => {
                const Icon = o.icon;
                return (
                  <motion.button
                    key={o.kind}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: EASE }}
                    disabled={busy !== null}
                    onClick={() => void create(o.kind)}
                    className="flex w-full items-center gap-3.5 rounded-[14px] border border-[#E3E5E7] p-3 text-left active:bg-[#F3F4F5]"
                  >
                    <span className="grid size-11 place-items-center rounded-[11px]" style={{ background: o.tint }}>
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[15px] font-medium">{o.label}</span>
                      <span className="block text-[13px] text-[#80858C]">{o.description}</span>
                    </span>
                    <ChevronRight size={18} className="text-[#B0B4BA]" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
