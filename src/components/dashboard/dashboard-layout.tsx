"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Link2, BarChart3, Settings, ChevronLeft, ChevronRight, QrCode } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/links", label: "Links", icon: Link2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/kr-codes", label: "Kompi Codes", icon: QrCode },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(collapsed));
  }, [collapsed]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#020817] via-[#030b1f] to-[#020817] text-slate-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 240 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={cn(
          "h-screen sticky top-0 left-0 border-r border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col justify-between"
        )}
      >
        <div className="flex flex-col gap-6 py-6 px-3">
          {/* Logo */}
          <div className="text-center font-bold text-lg text-cyan-300 tracking-tight">
            {collapsed ? "K" : "Kompi"}
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
                  "hover:bg-white/10 hover:text-cyan-300"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            ))}
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

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
