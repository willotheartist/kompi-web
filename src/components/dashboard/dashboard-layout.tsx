"use client";

import { Suspense, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home,
  Link2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Rocket,
  Globe2,
  IdCard,
  MessageSquare,
  Bot,
  Database,
  Code2,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import { AccountMenu } from "@/components/dashboard/account-menu";

type NavChild = {
  href: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children?: NavChild[];
};

type NavGroup = {
  section: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    section: "My Kompi",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home },
      {
        href: "/dashboard/chat",
        label: "Chat",
        icon: MessageSquare,
        children: [
          { href: "/dashboard/chat", label: "Dashboard", icon: Sparkles },
          { href: "/dashboard/chat/sources", label: "Knowledge", icon: Database },
          { href: "/dashboard/chat/widget", label: "Widget", icon: Bot },
          { href: "/dashboard/chat/install", label: "Install", icon: Code2 },
          {
            href: "/dashboard/chat/conversations",
            label: "Conversations",
            icon: MessagesSquare,
          },
        ],
      },
      { href: "/links", label: "Links", icon: Link2 },
      {
        href: "/k-cards",
        label: "K-Cards",
        icon: IdCard,
        children: [{ href: "/messages", label: "Messages" }],
      },
      {
        href: "/kr-codes",
        label: "KR Codes",
        icon: QrCode,
        children: [{ href: "/kr-codes/your", label: "Your QR codes" }],
      },
    ],
  },
  {
    section: "Grow",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/growth", label: "Growth", icon: Rocket },
    ],
  },
  {
    section: "Settings",
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

function AnimatedIcon({
  Icon,
  active,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ rotate: 0, scale: 1 }}
      whileHover={{ rotate: -6, scale: 1.06 }}
      whileTap={{ rotate: 0, scale: 0.96 }}
      animate={{ scale: active ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="flex items-center justify-center"
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
    </motion.div>
  );
}

export function DashboardLayout({
  children,
  pageTitle,
  pageEyebrow,
  pageDescription,
}: {
  children: React.ReactNode;
  pageTitle?: string;
  pageEyebrow?: string;
  pageDescription?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="flex min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(196,200,255,0.18), transparent 28%), linear-gradient(180deg, #f7f7f6 0%, #f1f1f1 100%)",
        color: "var(--color-text)",
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-40 border-b border-black/6 bg-[rgba(241,241,241,0.78)] backdrop-blur-xl">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <Topbar
              pageTitle={pageTitle}
              pageEyebrow={pageEyebrow}
              pageDescription={pageDescription}
            />
          </div>
        </div>

        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar(props: Parameters<typeof SidebarInner>[0]) {
  return (
    <Suspense fallback={null}>
      <SidebarInner {...props} />
    </Suspense>
  );
}

function SidebarInner({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname() ?? "/";

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 268 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="sticky left-0 top-0 hidden h-screen shrink-0 flex-col justify-between border-r border-black/6 bg-[rgba(255,255,255,0.68)] backdrop-blur-2xl lg:flex"
    >
      <div className="flex min-h-0 flex-1 flex-col px-3 py-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center rounded-[22px] border border-black/6 bg-white/80 px-3 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)]",
            collapsed ? "justify-center" : "justify-between"
          )}
          aria-label="Kompi Dashboard Home"
        >
          {!collapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#C4C8FF] text-[15px] font-semibold text-[#111]">
                  K
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold tracking-[-0.03em] text-[#111]">
                    Kompi
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[#7a7a84]">
                    Admin console
                  </div>
                </div>
              </div>

              <Image
                src="/Kompi..svg"
                alt="Kompi"
                width={84}
                height={18}
                priority
                className="hidden h-4 w-auto xl:block"
              />
            </>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#C4C8FF] text-[15px] font-semibold text-[#111]">
              K
            </div>
          )}
        </Link>

        <nav className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
          {navGroups.map((group) => (
            <div key={group.section} className="flex flex-col gap-2">
              {!collapsed && (
                <h2 className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a9aa2]">
                  {group.section}
                </h2>
              )}

              <div className="flex flex-col gap-1">
                {group.items.map(({ href, label, icon: Icon, children }) => {
                  const childActive = (children ?? []).some((child) =>
                    child.href === "/dashboard/chat"
                      ? pathname === "/dashboard/chat"
                      : pathname.startsWith(child.href)
                  );

                  const active =
                    href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(href) || childActive;

                  return (
                    <div key={href} className="flex flex-col gap-1">
                      <Link
                        href={href}
                        className={cn(
                          "group flex items-center rounded-[18px] px-2.5 py-2.5 text-[13px] font-medium transition",
                          collapsed ? "justify-center" : "gap-2.5",
                          active
                            ? "border border-black/6 bg-white text-[#111] shadow-[0_8px_22px_rgba(0,0,0,0.04)]"
                            : "text-[#666671] hover:bg-white/80 hover:text-[#111]"
                        )}
                      >
                        {!collapsed && (
                          <span
                            className="h-5 w-[3px] shrink-0 rounded-full"
                            style={{
                              background: active ? "#C4C8FF" : "transparent",
                            }}
                            aria-hidden="true"
                          />
                        )}

                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] transition",
                            active ? "bg-[#EEF1FF] text-[#4f5d9d]" : "bg-transparent"
                          )}
                        >
                          <AnimatedIcon Icon={Icon} active={active} />
                        </div>

                        {!collapsed && (
                          <span className="min-w-0 truncate tracking-[-0.02em]">
                            {label}
                          </span>
                        )}
                      </Link>

                      {children && !collapsed && active && (
                        <div className="ml-[27px] flex flex-col gap-1 border-l border-black/6 pl-3">
                          {children.map((child) => {
                            const ChildIcon = child.icon;
                            const childIsActive =
                              child.href === "/dashboard/chat"
                                ? pathname === "/dashboard/chat"
                                : pathname.startsWith(child.href);

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "flex min-h-[34px] items-center gap-2 rounded-[14px] px-2.5 py-2 text-[12px] font-medium transition",
                                  childIsActive
                                    ? "bg-[#EEF1FF] text-[#40528D]"
                                    : "text-[#777782] hover:bg-white/80 hover:text-[#111]"
                                )}
                              >
                                {ChildIcon ? (
                                  <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                                ) : null}
                                <span className="truncate">{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-black/6 p-3">
        <div
          className={cn(
            "mb-3 rounded-[18px] border border-black/6 bg-white/80 p-3 shadow-[0_8px_22px_rgba(0,0,0,0.03)]",
            collapsed ? "flex justify-center" : "flex items-center justify-between gap-3"
          )}
        >
          {!collapsed ? (
            <>
              <div>
                <div className="text-[12px] font-semibold tracking-[-0.02em] text-[#111]">
                  Pro workspace
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#85858f]">
                  Core workspace active
                </div>
              </div>
              <div className="rounded-full bg-[#C4C8FF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#111]">
                Live
              </div>
            </>
          ) : (
            <div className="rounded-full bg-[#C4C8FF] px-2 py-1 text-[10px] font-semibold text-[#111]">
              Pro
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-[18px] border border-black/6 bg-white/80 py-3 transition hover:bg-white"
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: collapsed ? 6 : -6 }}
            whileTap={{ scale: 0.95, rotate: 0 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111]"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-[#C4C8FF]" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-[#C4C8FF]" />
            )}
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
}

function Topbar(props: Parameters<typeof TopbarInner>[0]) {
  return (
    <Suspense fallback={null}>
      <TopbarInner {...props} />
    </Suspense>
  );
}

function TopbarInner({
  pageTitle,
  pageEyebrow,
  pageDescription,
}: {
  pageTitle?: string;
  pageEyebrow?: string;
  pageDescription?: string;
}) {
  return (
    <div className="flex min-h-[84px] items-center justify-between gap-5 py-4">
      <div className="min-w-0">
        {pageEyebrow ? (
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a8a94]">
            {pageEyebrow}
          </div>
        ) : null}

        <h1
          className="truncate text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-tight text-[#111]"
          style={{
            letterSpacing: "-0.055em",
            fontFamily:
              '"Inter Tight", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          {pageTitle ?? "Overview"}
        </h1>

        {pageDescription ? (
          <p className="mt-1 max-w-2xl truncate text-[13px] text-[#73737c] sm:text-sm">
            {pageDescription}
          </p>
        ) : null}
      </div>

      <div className="shrink-0 rounded-[18px] border border-black/6 bg-white/80 px-2 py-1.5 shadow-[0_8px_22px_rgba(0,0,0,0.03)]">
        <AccountMenu />
      </div>
    </div>
  );
}

export default DashboardLayout;