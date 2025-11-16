"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home,
  Link2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  QrCode,
  LayoutTemplate,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/links", label: "Links", icon: Link2 },
  { href: "/k-cards", label: "K-Cards", icon: LayoutTemplate },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/kr-codes", label: "Kompi Codes", icon: QrCode },
  // 🔁 changed from "/settings" to "/dashboard/settings"
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

// Pattern: Shell/DashboardShell
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // ❌ no localStorage here – this avoids hydration mismatch
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div
      className={cn("wf-dashboard-shell", "flex min-h-screen")}
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Shell/AppSidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Shell/Main */}
      <div className="wf-dashboard-main flex min-w-0 flex-1 flex-col">
        {/* Shell/Topbar */}
        <div
          className={cn(
            "wf-dashboard-topbar-shell sticky top-0 z-40",
            "backdrop-blur-md"
          )}
          style={{
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="wf-dashboard-container mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <Topbar />
          </div>
        </div>

        {/* Content */}
        <main className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---------------- Sidebar (Shell/AppSidebar) ---------------- */

function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname() ?? "/";

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className={cn(
        "wf-dashboard-sidebar",
        "sticky left-0 top-0 flex h-screen flex-col justify-between"
      )}
      style={{
        backgroundColor: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
      }}
    >
      <div className="flex flex-col gap-6 px-3 py-6">
        {/* Logo + console label */}
        <Link
          href="/dashboard"
          className={cn(
            "wf-dashboard-logo flex items-center",
            collapsed ? "justify-center" : "justify-start px-1.5"
          )}
          aria-label="Kompi Dashboard Home"
        >
          {!collapsed && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Image
                  src="/Kompiwhite.svg"
                  alt="Kompi"
                  width={112}
                  height={24}
                  priority
                  className="h-6 w-28"
                />
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.16em]"
                style={{
                  color: "var(--color-subtle)",
                  fontFamily: "var(--font-instrument-serif)",
                  fontStyle: "italic",
                }}
              >
                workspace console
              </span>
            </div>
          )}

          {collapsed && (
            <Image
              src="/Kompiwhite.svg"
              alt="Kompi"
              width={24}
              height={24}
              priority
              className="h-6 w-6"
            />
          )}
          <span className="sr-only">Kompi</span>
        </Link>

        {/* Nav items */}
        <nav className="wf-dashboard-nav flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "wf-dashboard-nav-item group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                  collapsed && "justify-center"
                )}
                style={{
                  backgroundColor: active
                    ? "var(--color-accent-soft)"
                    : "transparent",
                  color: active
                    ? "var(--color-text)"
                    : "var(--color-subtle)",
                }}
              >
                {!collapsed && (
                  <span
                    className="wf-dashboard-nav-accent h-6 w-1 rounded-full"
                    style={{
                      backgroundColor: "var(--color-accent)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    !collapsed && "group-hover:translate-x-0.5 transition-transform"
                  )}
                />
                {!collapsed && (
                  <span
                    className="truncate"
                    style={
                      active
                        ? {
                            fontFamily: "var(--font-instrument-serif)",
                            fontStyle: "italic",
                          }
                        : undefined
                    }
                  >
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "wf-dashboard-sidebar-toggle flex w-full items-center justify-center py-3 text-xs font-medium uppercase tracking-wide"
        )}
        style={{
          borderTop: "1px solid var(--color-border)",
          color: "var(--color-subtle)",
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          {collapsed ? (
            <motion.div
              key="expand"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="collapse"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.18 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.aside>
  );
}

/* ---------------- Topbar w/ avatar menu (Shell/Topbar) ---------------- */

function Topbar() {
  const { data } = useSession();
  const display = data?.user?.name || data?.user?.email || "User";
  const initial = (display?.trim()?.[0] ?? "U").toUpperCase();

  const [open, setOpen] = useState(false);
  const menuRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="flex h-16 items-center justify-between gap-4">
      {/* Page title / meta */}
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.16em]"
            style={{
              color: "var(--color-subtle)",
            }}
          >
            Kompi dashboard
          </span>
          <span
            className="h-[2px] w-6 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
        </div>
        <div className="mt-1 flex items-baseline gap-2 text-sm font-semibold sm:text-base">
          <span>Today&apos;s</span>
          <span
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
            }}
          >
            workspace
          </span>
        </div>
      </div>

      {/* Account menu */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "wf-dashboard-avatar-btn flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition"
          )}
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-accent)",
            color: "var(--color-text)",
          }}
          aria-label="Open account menu"
        >
          {initial}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="wf-dashboard-account-menu absolute right-0 z-50 mt-2 w-56 rounded-2xl p-1.5"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              role="menu"
            >
              <div className="px-2.5 py-2">
                <div
                  className="text-xs"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Signed in as
                </div>
                <div
                  className="truncate text-sm font-medium"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontStyle: "italic",
                  }}
                >
                  {display}
                </div>
              </div>

              {/* 🔁 updated routes to new dashboard settings paths */}
              <MenuItem
                href="/dashboard/settings/profile"
                label="Profile"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                href="/dashboard/settings"
                label="Settings"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                href="/dashboard/support"
                label="Support"
                onClick={() => setOpen(false)}
              />

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              <button
                className={cn(
                  "wf-dashboard-account-menu-signout w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium transition"
                )}
                style={{ color: "var(--color-subtle)" }}
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MenuItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "wf-dashboard-account-menu-item block rounded-lg px-2.5 py-2 text-sm transition"
      )}
      role="menuitem"
      style={{ color: "var(--color-text)" }}
    >
      <span
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontStyle: "italic",
        }}
      >
        {label}
      </span>
    </Link>
  );
}

/* ---------------- utils ---------------- */

function useOutsideClose<T extends HTMLElement>(
  open: boolean,
  onClose: () => void
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);
  return ref;
}

export default DashboardLayout;
