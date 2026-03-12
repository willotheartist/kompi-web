"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import {
  LayoutGrid,
  Database,
  RectangleHorizontal,
  Download,
  MessageSquare,
  Settings,
  RefreshCw,
  Plus,
  Menu,
  X,
} from "lucide-react";

type ShellAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "default" | "accent";
};

type ShellProps = {
  title: string;
  children: ReactNode;
  actions?: ShellAction[];
};

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  count?: number;
};

function initials(name: string, fallback = "K") {
  const clean = name.trim();
  if (!clean) return fallback;
  const out = clean
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
  return out || fallback;
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function KompiChatAdminShell({
  title,
  children,
  actions = [],
}: ShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = useMemo<NavItem[]>(
    () => [
      {
        href: "/dashboard/chat",
        label: "Dashboard",
        icon: <LayoutGrid className="h-4 w-4" />,
      },
      {
        href: "/dashboard/chat/sources",
        label: "Knowledge",
        icon: <Database className="h-4 w-4" />,
      },
      {
        href: "/dashboard/chat/widget",
        label: "Widget",
        icon: <RectangleHorizontal className="h-4 w-4" />,
      },
      {
        href: "/dashboard/chat/install",
        label: "Install",
        icon: <Download className="h-4 w-4" />,
      },
      {
        href: "/dashboard/chat/conversations",
        label: "Conversations",
        icon: <MessageSquare className="h-4 w-4" />,
      },
      {
        href: "/dashboard/chat/settings",
        label: "Settings",
        icon: <Settings className="h-4 w-4" />,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f1f1f1] text-[#111113]">
      <div className="flex min-h-screen">
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/20 transition md:hidden",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={cn(
            "fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-[#e4e4e7] bg-[rgba(255,255,255,0.72)] px-3 py-4 backdrop-blur-xl transition-transform md:sticky md:z-10 md:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="grid h-[40px] w-[40px] place-items-center rounded-[14px] bg-[#C4C8FF] text-[15px] font-semibold text-[#111]">
              K
            </div>
            <div>
              <div className="text-[14px] font-semibold tracking-[-0.03em] text-[#111]">
                Kompi Chat
              </div>
              <div className="text-[11px] text-[#76767e]">Admin console</div>
            </div>
          </div>

          <div className="mt-8 px-2">
            <div className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a9aa2]">
              Navigate
            </div>

            <nav className="space-y-1">
              {nav.map((item) => {
                const active =
                  item.href === "/dashboard/chat"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-[14px] border px-4 py-3 text-[13px] font-medium transition",
                      active
                        ? "border-[#ededf0] bg-white text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                        : "border-transparent text-[#5a5a63] hover:bg-white hover:text-[#222]"
                    )}
                  >
                    <span className="text-current">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.count ? (
                      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#f0f0f2] px-1.5 text-[10px] font-bold text-[#78787f]">
                        {item.count}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto px-2">
            <div className="flex items-center gap-3 rounded-[16px] border border-[#e4e4e7] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#C4C8FF] text-[11px] font-semibold text-[#111]">
                {initials("Wills")}
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#111]">Wills</div>
                <div className="text-[10px] text-[#7c7c86]">Pro workspace</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="sticky top-0 z-30 border-b border-[#e4e4e7] bg-[rgba(241,241,241,0.82)] px-4 py-[14px] backdrop-blur-md sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  className="grid h-9 w-9 place-items-center rounded-[11px] border border-[#e4e4e7] bg-white text-[#111] md:hidden"
                >
                  {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>

                <span className="text-[12px] text-[#76767e]">Chat</span>
                <span className="text-[12px] text-[#c0c0c6]">/</span>
                <span className="text-[14px] font-semibold tracking-[-0.02em] text-[#111]">
                  {title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {actions.map((action, i) => {
                  const content = (
                    <>
                      {action.icon ? <span className="shrink-0">{action.icon}</span> : null}
                      <span>{action.label}</span>
                    </>
                  );

                  const className =
                    action.variant === "accent"
                      ? "inline-flex h-11 items-center gap-2 rounded-[12px] bg-[#C4C8FF] px-4 text-[14px] font-semibold text-[#111] transition hover:brightness-105"
                      : "inline-flex h-11 items-center gap-2 rounded-[12px] border border-[#e4e4e7] bg-[rgba(255,255,255,0.86)] px-4 text-[14px] font-semibold text-[#2d2d33] transition hover:bg-white";

                  if (action.href) {
                    return (
                      <Link key={`${action.label}-${i}`} href={action.href} className={className}>
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={`${action.label}-${i}`}
                      type="button"
                      onClick={action.onClick}
                      className={className}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-[14px] sm:p-5">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function KCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] border border-[#e4e4e7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.045)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function KCardInner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

export function KPill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "green" | "lavender" | "amber";
}) {
  const tones = {
    default: "bg-[#f0f0f2] text-[#666a77]",
    green: "bg-[#EEF8F1] text-[#2D8A52]",
    lavender: "bg-[#EEF1FF] text-[#47568E]",
    amber: "bg-[#FFF4DD] text-[#A27017]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function StatusDotPill({
  status,
}: {
  status: "ACTIVE" | "DRAFT" | "PAUSED" | "URL" | "FAQ" | "TEXT";
}) {
  const map = {
    ACTIVE: { bg: "#EEF8F1", fg: "#2D8A52", dot: "#2D8A52" },
    DRAFT: { bg: "#F3F4F6", fg: "#6B7280", dot: "#9CA3AF" },
    PAUSED: { bg: "#FFF4DD", fg: "#A27017", dot: "#D9930D" },
    URL: { bg: "#EEF1FF", fg: "#47568E", dot: "#8D9DFF" },
    FAQ: { bg: "#FFF7ED", fg: "#925C1A", dot: "#F5A742" },
    TEXT: { bg: "#EEFAF0", fg: "#2A6B3C", dot: "#4DAB6D" },
  } as const;

  const c = map[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[11px] font-semibold"
      style={{ background: c.bg, color: c.fg }}
    >
      <span
        className="inline-block h-[6px] w-[6px] rounded-full"
        style={{ background: c.dot }}
      />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}