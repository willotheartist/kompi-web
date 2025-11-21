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
  LayoutGrid,
  Rocket,
  Globe2,
  ChevronDown,
} from "lucide-react";

const navGroups = [
  {
    section: "My Kompi",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home },
      { href: "/links", label: "Links", icon: Link2 },
      { href: "/k-cards", label: "K-Cards", icon: LayoutGrid },
      { href: "/kr-codes", label: "Kompi Codes™ (KR)", icon: QrCode },
    ],
  },
  {
    section: "Grow",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/growth", label: "Growth", icon: Rocket },
    ],
  },
  {
    section: "Workspace",
    items: [
      {
        href: "/dashboard/settings/domains",
        label: "Custom domains",
        icon: Globe2,
      },
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

// Pattern: Shell/DashboardShell
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div
      className={cn("wf-dashboard-shell", "flex min-h-screen")}
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="wf-dashboard-main flex min-w-0 flex-1 flex-col">
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
          <div className="wf-dashboard-container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Topbar />
          </div>
        </div>

        <main className="wf-dashboard-content mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---------------- Sidebar (Linktree-style grouped nav) ---------------- */

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
      animate={{ width: collapsed ? 80 : 260 }}
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
        {/* Brand */}
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
                  src="/Kompi..svg"
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
                  fontFamily: "Instrument Serif, system-ui, serif",
                  fontStyle: "italic",
                }}
              >
                Dashboard
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

        {/* Grouped nav like Linktree */}
        <nav className="wf-dashboard-nav mt-2 flex flex-col gap-4 text-sm">
          {navGroups.map((group) => (
            <div key={group.section} className="flex flex-col gap-1.5">
              {!collapsed && (
                <div
                  className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "var(--color-subtle)" }}
                >
                  {group.section}
                </div>
              )}

              <div className="flex flex-col gap-1">
                {group.items.map(({ href, label, icon: Icon }) => {
                  const active =
                    href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(href);

                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "wf-dashboard-nav-item group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                        collapsed && "justify-center"
                      )}
                      style={{
                        backgroundColor: active
                          ? "var(--color-accent-soft)"
                          : "transparent",
                        color: "var(--color-text)",
                      }}
                    >
                      {!collapsed && (
                        <span
                          className="wf-dashboard-nav-accent h-6 w-1 rounded-full"
                          style={{
                            backgroundColor: active
                              ? "var(--color-accent)"
                              : "transparent",
                          }}
                          aria-hidden="true"
                        />
                      )}

                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          !collapsed &&
                            "group-hover:translate-x-0.5 transition-transform"
                        )}
                      />

                      {!collapsed && (
                        <span className="truncate">{label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
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

/* ---------------- Topbar w/ Linktree-style account pill ---------------- */

function Topbar() {
  const { data } = useSession();
  const email = data?.user?.email ?? "";
  const name = data?.user?.name ?? "";
  const display = name || email || "User";
  const initial = (display?.trim()?.[0] ?? "U").toUpperCase();

  const planLabel = "Free";

  const [open, setOpen] = useState(false);
  const menuRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="flex h-16 items-center justify-between gap-4">
      {/* Left: workspace label */}
      <div className="flex min-w-0 flex-col">
        <span
          className="text-[11px] uppercase tracking-[0.16em]"
          style={{ color: "var(--color-subtle)" }}
        >
          Workspace
        </span>
        <span className="text-sm font-medium">Kompi Studio</span>
      </div>

      {/* Right: compact account control */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--color-text)",
          }}
          aria-label="Open account menu"
        >
          <span className="truncate max-w-[160px]">{display}</span>

          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
            style={{
              backgroundColor: "var(--color-accent-soft)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            {planLabel}
          </span>

          <div className="flex items-center gap-1">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-accent)",
                color: "var(--color-text)",
              }}
            >
              {initial}
            </div>
            <ChevronDown
              className="h-4 w-4"
              style={{ color: "var(--color-subtle)" }}
            />
          </div>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="wf-dashboard-account-menu absolute right-0 z-50 mt-2 w-72 rounded-2xl p-1.5"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              role="menu"
            >
              {/* Header row */}
              <div className="flex items-center gap-3 px-3 py-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                >
                  {initial}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Signed in as
                  </span>
                  <span className="truncate text-sm font-medium">
                    {display}
                  </span>
                </div>
              </div>

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              {/* Workspace actions */}
              <MenuItem
                href="/dashboard"
                label="Switch workspace"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                href="/dashboard?createWorkspace=1"
                label="Create new workspace"
                onClick={() => setOpen(false)}
              />

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              {/* Account / billing */}
              <MenuItem
                href="/dashboard/settings/profile"
                label="Account"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                href="/dashboard/settings"
                label="Workspace settings"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                href="/pricing"
                label="Upgrade"
                onClick={() => setOpen(false)}
              />

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              {/* Support / feedback */}
              <MenuItem
                href="/dashboard/support"
                label="Ask a question"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                href="/dashboard/support"
                label="Help topics"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                href="/dashboard/support"
                label="Share feedback"
                onClick={() => setOpen(false)}
              />

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              {/* Sign out */}
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
                Log out
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
      <span>{label}</span>
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
