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

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const myKompiItems: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Links", href: "/links", icon: Link2 },
  { label: "K-Cards", href: "/k-cards", icon: LayoutGrid },
  { label: "QR Menus", href: "/qr-menus", icon: LayoutGrid },
  { label: "Kompi Codes™ (KR)", href: "/kr-codes", icon: QrCode },
  { label: "Bio Pages", href: "/bio-pages", icon: LayoutTemplate },
];

const growItems: NavItem[] = [
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  // keep existing /campaigns route but present as "Growth"
  { label: "Growth", href: "/campaigns", icon: Rocket },
];

const workspaceItems: NavItem[] = [
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
        "bg-(--color-surface) border-r border-(--color-border)",
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
          "rounded-full bg-(--color-accent) text-(--color-text)",
          "text-sm font-semibold",
          "shadow-(--shadow-md) hover:shadow-(--shadow-md)/90",
          "transition-shadow"
        )}
      >
        <Plus className="h-4 w-4" />
        Create new
      </Link>

      {/* Nav sections */}
      <nav className="flex flex-col gap-5 text-sm font-medium">
        <NavSection title="My Kompi">
          {myKompiItems.map((item) => (
            <NavItemRow key={item.href} item={item} pathname={pathname} />
          ))}
        </NavSection>

        <NavSection title="Grow">
          {growItems.map((item) => (
            <NavItemRow key={item.href} item={item} pathname={pathname} />
          ))}
        </NavSection>

        <NavSection title="Workspace">
          {workspaceItems.map((item) => (
            <NavItemRow key={item.href} item={item} pathname={pathname} />
          ))}
        </NavSection>
      </nav>

      {/* User */}
      <div className="mt-auto flex items-center gap-3 rounded-(--radius-md) border border-(--color-border) bg-(--color-bg) px-3 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-[999px] bg-(--color-surface) text-xs font-semibold text-(--color-text)">
          U
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-(--color-subtle)">
            Logged in
          </span>
          <span className="truncate text-xs font-medium text-(--color-text)">
            you@example.com
          </span>
        </div>
      </div>
    </aside>
  );
}

type NavSectionProps = {
  title: string;
  children: React.ReactNode;
};

function NavSection({ title, children }: NavSectionProps) {
  return (
    <div className="space-y-2">
      {/* Section header – same family as new page headers */}
      <h2 className="px-2 text-xs font-semibold text-(--color-subtle)">
        {title}
      </h2>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

type NavItemRowProps = {
  item: NavItem;
  pathname: string | null;
};

function NavItemRow({ item, pathname }: NavItemRowProps) {
  const Icon = item.icon;
  const active =
    item.href === "/"
      ? pathname === "/"
      : pathname?.startsWith(item.href);

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2",
          "rounded-full",
          "transition-colors",
          "text-(--color-subtle) hover:text-(--color-text) hover:bg-(--color-accent-soft)",
          active &&
            "bg-(--color-accent-soft) text-(--color-text) shadow-(--shadow-sm)"
        )}
      >
        <span
          className={cn(
            "h-6 w-6 inline-flex items-center justify-center rounded-full border text-[11px]",
            active
              ? "bg-(--color-text) text-(--color-bg) border-transparent"
              : "bg-(--color-bg) text-(--color-subtle) border-(--color-border)"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>

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
    </li>
  );
}
