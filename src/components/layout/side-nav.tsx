"use client";

import Image from "next/image";
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
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Links", href: "/links", icon: Link2 },
  { label: "K-Cards", href: "/k-cards", icon: LayoutGrid },
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
        "bg-[var(--color-surface)] border-r border-[var(--color-border)]",
        "px-4 py-5 gap-6",
        "font-sans text-sm"
      )}
    >
      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-3 px-1.5 py-1.5"
        aria-label="Kompi Dashboard Home"
      >
        <Image
          src="/Kompi..svg"
          alt="Kompi"
          width={112}
          height={24}
          priority
          className="h-6 w-28"
        />
        <span className="sr-only">Kompi</span>
      </Link>

      {/* Create new */}
      <Link
        href="/links/new"
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "w-full py-2.5 px-3",
          "rounded-full bg-[var(--color-accent)] text-[var(--color-text)]",
          "text-sm font-semibold",
          "shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-md)]/90",
          "transition-shadow"
        )}
      >
        <Plus className="h-4 w-4" />
        Create new
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 text-sm font-medium">
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
                "flex items-center gap-3 px-3 py-2",
                "rounded-full",
                "transition-colors",
                "text-[var(--color-subtle)] hover:text-[var(--color-text)] hover:bg-[var(--color-accent-soft)]",
                active &&
                  "bg-[var(--color-accent-soft)] text-[var(--color-text)] shadow-[var(--shadow-sm)]"
              )}
            >
              <span
                className={cn(
                  "h-6 w-6 inline-flex items-center justify-center rounded-full border text-[11px]",
                  active
                    ? "bg-[var(--color-text)] text-[var(--color-bg)] border-transparent"
                    : "bg-[var(--color-bg)] text-[var(--color-subtle)] border-[var(--color-border)]"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>

              {/* This is where Instrument Serif Italic should kick in */}
              <span
                className={cn(
                  "truncate",
                  active
                    ? "font-accent italic font-medium" // Instrument Serif Italic
                    : "font-sans font-medium"          // Inter Tight
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] px-3 py-3 flex items-center gap-3">
        <div className="h-8 w-8 rounded-[999px] bg-[var(--color-surface)] text-[var(--color-text)] flex items-center justify-center text-xs font-semibold">
          U
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-[var(--color-subtle)]">
            Logged in
          </span>
          <span className="text-xs text-[var(--color-text)] font-medium truncate">
            you@example.com
          </span>
        </div>
      </div>
    </aside>
  );
}
