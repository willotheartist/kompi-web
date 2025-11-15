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

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // ❌ no localStorage here – this avoids hydration mismatch
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#020817] via-[#030b1f] to-[#020817] text-slate-50">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Topbar />
          </div>
        </div>

        {/* Page content */}
        <main className="mx-auto w-full max-w-6xl p-6">{children}</main>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */

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
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn(
        "h-screen sticky top-0 left-0 border-r border-white/10",
        "bg-white/[0.04] backdrop-blur-2xl",
        "flex flex-col justify-between"
      )}
    >
      <div className="flex flex-col gap-6 py-6 px-3">
        {/* Logo */}
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-start px-1.5"
          )}
          aria-label="Kompi Dashboard Home"
        >
          {!collapsed && (
            <Image
              src="/Kompiwhite.svg"
              alt="Kompi"
              width={112}
              height={24}
              priority
              className="h-6 w-28"
            />
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
        <nav className="flex flex-col gap-1">
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
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
                  active
                    ? "bg-white/10 text-cyan-300"
                    : "text-slate-200 hover:bg-white/10 hover:text-cyan-300"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center w-full py-3 border-t border-white/10 text-slate-400 hover:text-cyan-300 transition"
      >
        <AnimatePresence initial={false} mode="wait">
          {collapsed ? (
            <motion.div
              key="expand"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="collapse"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.aside>
  );
}

/* ---------------- Topbar w/ avatar menu ---------------- */

function Topbar() {
  const { data } = useSession();
  const display = data?.user?.name || data?.user?.email || "User";
  const initial = (display?.trim()?.[0] ?? "U").toUpperCase();

  const [open, setOpen] = useState(false);
  const menuRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="h-14 flex items-center justify-between">
      <div className="text-sm text-zinc-400">
        <span className="font-medium text-zinc-100">Dashboard</span>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="h-9 w-9 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-sm font-semibold text-white hover:bg-zinc-700/70 transition"
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
              transition={{ duration: 0.14 }}
              className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0A0E23]/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.65)] p-1.5 z-50"
              role="menu"
            >
              <div className="px-2.5 py-2">
                <div className="text-xs text-zinc-400">Signed in as</div>
                <div className="text-sm font-medium text-zinc-100 truncate">
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

              <div className="my-1 h-px bg-white/10" />

              <button
                className="w-full text-left rounded-lg px-2.5 py-2 text-sm text-red-300 hover:bg-white/5 hover:text-red-200 transition"
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
      className="block rounded-lg px-2.5 py-2 text-sm text-zinc-200 hover:bg:white/5 hover:text-white transition hover:bg-white/5"
      role="menuitem"
    >
      {label}
    </Link>
  );
}

/* ---------------- utils ---------------- */

function useOutsideClose<T extends HTMLElement>(open: boolean, onClose: () => void) {
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
