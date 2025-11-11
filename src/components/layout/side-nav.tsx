"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link2,
  QrCode,
  LayoutTemplate,
  BarChart3,
  Rocket,
  Globe2,
  Settings,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Links", href: "/links", icon: Link2 },
  { label: "Kompi Codes™ (KR)", href: "/kr-codes", icon: QrCode },
  { label: "Bio Pages", href: "/bio-pages", icon: LayoutTemplate },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Campaigns", href: "/campaigns", icon: Rocket },
  { label: "Custom domains", href: "/domains", icon: Globe2 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col",
        "w-64 h-screen sticky top-0",
        "bg-[#020817] border-r border-white/5",
        "px-4 py-5 gap-6"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl bg-white text-black flex items-center justify-center text-base font-semibold">
          K
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">
            Kompi Links
          </span>
          <span className="text-xs text-slate-400">
            Links, KR codes & hubs
          </span>
        </div>
      </div>

      {/* Create new */}
      <Link
        href="/links/new"
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "w-full rounded-2xl py-2.5",
          "bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#22d3ee]",
          "text-sm font-semibold text-white",
          "shadow-[0_18px_40px_rgba(15,23,42,0.7)] hover:brightness-110 transition-all"
        )}
      >
        <Plus className="h-4 w-4" />
        Create new
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 text-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-2xl",
                "text-slate-300 hover:text-white hover:bg-white/5 transition-all",
                active &&
                  "bg-white text-slate-900 font-semibold shadow-[0_14px_32px_rgba(15,23,42,0.75)]"
              )}
            >
              <span
                className={cn(
                  "h-6 w-6 inline-flex items-center justify-center rounded-full",
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-white/5 text-slate-300"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-3 py-3 flex items-center gap-3">
        <div className="h-8 w-8 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-xs font-semibold">
          U
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-300">
            Logged in
          </span>
          <span className="text-xs text-white font-medium truncate">
            you@example.com
          </span>
        </div>
      </div>
    </aside>
  );
}
