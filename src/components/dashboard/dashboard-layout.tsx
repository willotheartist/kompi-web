// src/components/dashboard/dashboard-layout.tsx
"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
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
  Wrench,
  IdCard,
  UtensilsCrossed,
  Hammer,
  KeyRound,
} from "lucide-react";
import { getToolById } from "@/lib/tools-config";
import { AccountMenu } from "@/components/dashboard/account-menu";

type NavChild = {
  href: string;
  label: string;
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

const baseNavGroups: NavGroup[] = [
  {
    section: "My Kompi",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home },
      { href: "/links", label: "Links", icon: Link2 },
      {
        href: "/k-cards",
        label: "K-Cards",
        icon: IdCard,
        children: [{ href: "/messages", label: "Messages" }],
      },
      {
        href: "/dashboard/qr-menus",
        label: "QR Menus",
        icon: UtensilsCrossed,
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
  // Single-workspace mode: don't label anything "Workspace" in the UI.
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

type ToolId = Parameters<typeof getToolById>[0];

/**
 * ------------------------------------------------------------------
 * Module-scope cache so we don't refetch on every navigation.
 * Single-workspace mode uses one key: "default".
 * ------------------------------------------------------------------
 */
const toolsCache = new Map<
  string,
  { ts: number; value: ToolId[]; inflight?: Promise<ToolId[]> }
>();

const CACHE_TTL_MS = 60_000;
const WORKSPACE_KEY = "default";

/* ---------------- helpers ---------------- */

function parseToolIds(raw: string | null): ToolId[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const strings = parsed.filter((x): x is string => typeof x === "string");
    return strings as ToolId[];
  } catch {
    return [];
  }
}

function parseToolIdsFromApi(json: unknown): ToolId[] {
  if (!json || typeof json !== "object") return [];
  const toolIds = (json as Record<string, unknown>).toolIds;
  if (!Array.isArray(toolIds)) return [];
  const strings = toolIds.filter((x): x is string => typeof x === "string");
  return strings as ToolId[];
}

/* ---------------- Animated sidebar icon ---------------- */

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
      whileHover={{ rotate: -8, scale: 1.08 }}
      whileTap={{ rotate: 0, scale: 0.95 }}
      animate={{ scale: active ? 1.06 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="flex items-center justify-center"
    >
      <Icon className="h-5 w-5 shrink-0" />
    </motion.div>
  );
}

// Pattern: Shell/DashboardShell
export function DashboardLayout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle?: string;
}) {
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
            <Topbar pageTitle={pageTitle} />
          </div>
        </div>

        <main className="wf-dashboard-content mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */

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

  // Single-workspace mode: stable key
  const storageKey = `kompi:enabledTools:${WORKSPACE_KEY}`;

  /**
   * ✅ HYDRATION FIX:
   * Never read localStorage in the first render (server vs client mismatch).
   * Start empty, then populate in an effect.
   */
  const [toolIds, setToolIds] = useState<ToolId[]>([]);

  // Load from localStorage after mount
  useEffect(() => {
    let cancelled = false;

    const t = window.setTimeout(() => {
      if (cancelled) return;
      try {
        setToolIds(parseToolIds(localStorage.getItem(storageKey)));
      } catch {
        setToolIds([]);
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [storageKey]);

  // Listen for updates (custom event) and refresh from localStorage
  useEffect(() => {
    const onToolsUpdated = () => {
      setToolIds(() => {
        try {
          return parseToolIds(localStorage.getItem(storageKey));
        } catch {
          return [];
        }
      });
    };

    window.addEventListener("kompi:tools-updated", onToolsUpdated);
    return () => {
      window.removeEventListener("kompi:tools-updated", onToolsUpdated);
    };
  }, [storageKey]);

  // Single-workspace mode: do not forward querystring workspaceId to API
  const toolsUrl = "/api/tools";

  // Network load (deduped + cached)
  useEffect(() => {
    let cancelled = false;

    async function loadTools() {
      try {
        const now = Date.now();
        const cached = toolsCache.get(WORKSPACE_KEY);

        // ✅ use in-memory cache (fastest)
        if (cached && now - cached.ts < CACHE_TTL_MS) {
          setToolIds(cached.value);
          return;
        }

        // ✅ if already fetching, await it
        if (cached?.inflight) {
          const next = await cached.inflight;
          if (!cancelled) setToolIds(next);
          return;
        }

        const inflight: Promise<ToolId[]> = fetch(toolsUrl)
          .then(async (res) => {
            if (!res.ok) return [];
            const json: unknown = await res.json();
            return parseToolIdsFromApi(json);
          })
          .catch(() => []);

        toolsCache.set(WORKSPACE_KEY, {
          ts: now,
          value: cached?.value ?? [],
          inflight,
        });

        const next = await inflight;
        if (cancelled) return;

        setToolIds((prev) => {
          const same =
            prev.length === next.length && prev.every((v, i) => v === next[i]);
          return same ? prev : next;
        });

        toolsCache.set(WORKSPACE_KEY, { ts: Date.now(), value: next });

        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // ignore
        }
      } catch (error) {
        console.error("TOOLS_NAV_LOAD_ERROR", error);
      }
    }

    loadTools();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  const toolsItems: NavItem[] = useMemo(() => {
    return [
      {
        href: "/dashboard/tools",
        label: "Tools",
        icon: Hammer,
      },
      ...toolIds
        .map((id) => getToolById(id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t))
        .map((tool) => {
          const icon = tool.id === "password-generator" ? KeyRound : Wrench;
          return {
            href: tool.dashboardPath,
            label: tool.name,
            icon,
          };
        }),
    ];
  }, [toolIds]);

  const navGroups: NavGroup[] = useMemo(() => {
    return [
      baseNavGroups[0],
      baseNavGroups[1],
      { section: "Tools", items: toolsItems },
      baseNavGroups[2],
    ];
  }, [toolsItems]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 240 }}
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
      <div className="flex flex-col gap-4 px-3 py-4">
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

        {/* Grouped nav */}
        <nav className="wf-dashboard-nav mt-2 flex flex-col gap-3 text-sm">
          {navGroups.map((group) => (
            <div key={group.section} className="flex flex-col gap-1.5">
              {!collapsed && (
                <h2 className="px-2.5 text-[11px] font-medium text-(--color-subtle)">
                  {group.section}
                </h2>
              )}

              <div className="flex flex-col gap-1">
                {group.items.map(({ href, label, icon: Icon, children }) => {
                  const childActive = (children ?? []).some((child: NavChild) =>
                    pathname.startsWith(child.href)
                  );

                  const active =
                    href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(href) || childActive;

                  return (
                    <div key={href} className="flex flex-col gap-0.5">
                      <Link
                        href={href}
                        className={cn(
                          "wf-dashboard-nav-item group flex items-center rounded-lg px-2.5 py-1 text-sm font-medium transition",
                          collapsed ? "justify-center" : "gap-1.5",
                          active
                            ? "bg-[#f6f6f6] text-(--color-text)"
                            : "text-(--color-subtle) hover:bg-[#f6f6f6]"
                        )}
                      >
                        {!collapsed && (
                          <span
                            className="wf-dashboard-nav-accent mr-1 h-5 w-0.5 rounded-1px"
                            style={{
                              backgroundColor: active
                                ? "var(--color-accent)"
                                : "transparent",
                            }}
                            aria-hidden="true"
                          />
                        )}

                        <AnimatedIcon Icon={Icon} active={active} />

                        {!collapsed && <span className="truncate">{label}</span>}
                      </Link>

                      {children && !collapsed && (
                        <div
                          className="ml-5 flex flex-col gap-0.5 border-l pl-3"
                          style={{ borderColor: "var(--color-border)" }}
                        >
                          {children.map((child: NavChild) => {
                            const childIsActive = pathname.startsWith(child.href);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "wf-dashboard-nav-subitem flex items-center rounded-xl px-2.5 py-1 text-sm font-medium transition"
                                )}
                                style={{
                                  color: childIsActive
                                    ? "var(--color-text)"
                                    : "var(--color-subtle)",
                                  backgroundColor: childIsActive
                                    ? "var(--color-accent-soft)"
                                    : "transparent",
                                }}
                              >
                                {child.label}
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

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="wf-dashboard-sidebar-toggle flex w-full items-center justify-center border-t"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="py-3">
          <motion.div
            whileHover={{ scale: 1.06, rotate: collapsed ? 6 : -6 }}
            whileTap={{ scale: 0.94, rotate: 0 }}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: "#123932" }}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" style={{ color: "#F5FF7A" }} />
            ) : (
              <ChevronLeft className="h-4 w-4" style={{ color: "#F5FF7A" }} />
            )}
          </motion.div>
        </div>
      </button>
    </motion.aside>
  );
}

/* ---------------- Topbar ---------------- */

function Topbar(props: Parameters<typeof TopbarInner>[0]) {
  return (
    <Suspense fallback={null}>
      <TopbarInner {...props} />
    </Suspense>
  );
}

function TopbarInner({ pageTitle }: { pageTitle?: string }) {
  return (
    <div className="flex h-16 items-center justify-between gap-4">
      <div className="flex min-w-0 flex-col">
        <h1
          className="truncate text-xl font-semibold leading-tight sm:text-2xl"
          style={{
            letterSpacing: "-0.04em",
            fontFamily:
              '"Inter Tight", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          {pageTitle ?? "Overview"}
        </h1>
      </div>

      <AccountMenu />
    </div>
  );
}

export default DashboardLayout;
