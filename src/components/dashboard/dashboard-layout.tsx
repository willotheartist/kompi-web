// src/components/dashboard/dashboard-layout.tsx
"use client";

import { Suspense, useState, useEffect, useRef, useMemo, useCallback } from "react";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
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
  Rocket,
  Globe2,
  ChevronDown,
  Wrench,
  IdCard,
  UtensilsCrossed,
  Hammer,
  KeyRound,
} from "lucide-react";
import { getToolById } from "@/lib/tools-config";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";

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
        children: [{ href: "/dashboard/k-cards/messages", label: "Messages" }],
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
        children: [{ href: "/dashboard/kr-codes/your", label: "Your QR codes" }],
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

/**
 * ------------------------------------------------------------------
 * Module-scope caches so we don't refetch on every navigation.
 * ------------------------------------------------------------------
 */
const toolsCache = new Map<
  string,
  { ts: number; value: string[]; inflight?: Promise<string[]> }
>();

const workspacesCache: {
  ts: number;
  value: { id: string; name: string }[];
  inflight?: Promise<{ id: string; name: string }[]>;
} = { ts: 0, value: [] };

const CACHE_TTL_MS = 60_000;

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
  const searchParams = useSearchParams();

  const workspaceId = searchParams?.get("workspaceId") ?? "default";
  const storageKey = `kompi:enabledTools:${workspaceId}`;

  const [toolIds, setToolIds] = useState<Parameters<typeof getToolById>[0][]>([]);

  // Instant paint: localStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setToolIds(parsed);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  // Listen for updates
  useEffect(() => {
    const onToolsUpdated = () => {
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) setToolIds(parsed);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("kompi:tools-updated", onToolsUpdated);
    return () => {
      window.removeEventListener("kompi:tools-updated", onToolsUpdated);
    };
  }, [storageKey]);

  // Only compute the querystring once per render
  const qs = useMemo(() => searchParams?.toString() ?? "", [searchParams]);
  const toolsUrl = useMemo(() => (qs ? `/api/tools?${qs}` : "/api/tools"), [qs]);

  // Network load (deduped + cached)
  useEffect(() => {
    let cancelled = false;

    async function loadTools() {
      try {
        const now = Date.now();
        const cached = toolsCache.get(workspaceId);

        // ✅ use in-memory cache (fastest)
        if (cached && now - cached.ts < CACHE_TTL_MS) {
          setToolIds(cached.value as any);
          return;
        }

        // ✅ if already fetching, await it
        if (cached?.inflight) {
          const next = await cached.inflight;
          if (!cancelled) setToolIds(next as any);
          return;
        }

        const inflight = fetch(toolsUrl)
          .then(async (res) => {
            if (!res.ok) return [];
            const json = await res.json();
            return (json.toolIds ?? []) as string[];
          })
          .catch(() => []);

        toolsCache.set(workspaceId, {
          ts: now,
          value: cached?.value ?? [],
          inflight,
        });

        const next = await inflight;
        if (cancelled) return;

        setToolIds((prev) => {
          const same =
            prev.length === next.length && prev.every((v, i) => v === next[i]);
          return same ? prev : (next as any);
        });

        toolsCache.set(workspaceId, { ts: Date.now(), value: next });

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
  }, [workspaceId, storageKey, toolsUrl]);

  const toolsItems: NavItem[] = useMemo(() => {
    return [
      {
        href: "/dashboard/tools",
        label: "Tools",
        icon: Hammer,
      },
      ...toolIds
        .map((id) => getToolById(id))
        .filter(Boolean)
        .map((tool) => {
          const icon = tool!.id === "password-generator" ? KeyRound : Wrench;
          return {
            href: tool!.dashboardPath,
            label: tool!.name,
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

                        {!collapsed && (
                          <span className="truncate">{label}</span>
                        )}
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
            whileHover={{
              scale: 1.06,
              rotate: collapsed ? 6 : -6,
            }}
            whileTap={{ scale: 0.94, rotate: 0 }}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{
              backgroundColor: "#123932",
            }}
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

type Workspace = {
  id: string;
  name: string;
};

function Topbar(props: Parameters<typeof TopbarInner>[0]) {
  return (
    <Suspense fallback={null}>
      <TopbarInner {...props} />
    </Suspense>
  );
}

function TopbarInner({ pageTitle }: { pageTitle?: string }) {
  const { data } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const email = data?.user?.email ?? "";
  const name = data?.user?.name ?? "";
  const display = name || email || "User";
  const initial = (display?.trim()?.[0] ?? "U").toUpperCase();

  const planLabel = "Free";

  const [open, setOpen] = useState(false);
  const menuRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [wsLoading, setWsLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const activeWorkspaceIdFromUrl = searchParams?.get("workspaceId") ?? null;

  // ✅ Only fetch when the dropdown is opened (huge win)
  const ensureWorkspacesLoaded = useCallback(async () => {
    if (wsLoading) return;
    if (workspaces.length > 0) return;

    const now = Date.now();

    // fast path: module cache
    if (workspacesCache.value.length && now - workspacesCache.ts < CACHE_TTL_MS) {
      setWorkspaces(workspacesCache.value);
      return;
    }

    // dedupe inflight
    if (workspacesCache.inflight) {
      const next = await workspacesCache.inflight;
      setWorkspaces(next);
      return;
    }

    setWsLoading(true);
    try {
      const inflight = fetch("/api/workspaces")
        .then(async (res) => {
          if (!res.ok) return [];
          const json = await res.json();
          return (json.workspaces ?? []) as Workspace[];
        })
        .catch(() => []);

      workspacesCache.inflight = inflight;
      const next = await inflight;

      workspacesCache.ts = Date.now();
      workspacesCache.value = next;
      workspacesCache.inflight = undefined;

      setWorkspaces(next);
    } finally {
      setWsLoading(false);
    }
  }, [wsLoading, workspaces.length]);

  // After creation modal closes, refresh cache once
  useEffect(() => {
    if (createOpen) return;

    const t = setTimeout(async () => {
      try {
        const res = await fetch("/api/workspaces");
        if (!res.ok) return;
        const json = await res.json();
        const next = (json.workspaces ?? []) as Workspace[];
        setWorkspaces(next);
        workspacesCache.ts = Date.now();
        workspacesCache.value = next;
        workspacesCache.inflight = undefined;
      } catch {
        // ignore
      }
    }, 250);

    return () => clearTimeout(t);
  }, [createOpen]);

  const activeWorkspace: Workspace | null = useMemo(() => {
    if (!workspaces.length) return null;
    if (activeWorkspaceIdFromUrl) {
      const byId = workspaces.find((w) => w.id === activeWorkspaceIdFromUrl);
      if (byId) return byId;
    }
    return workspaces[0] ?? null;
  }, [workspaces, activeWorkspaceIdFromUrl]);

  const buildUrlWithWorkspace = (id: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("workspaceId", id);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const handleWorkspaceSwitch = (id: string) => {
    const next = buildUrlWithWorkspace(id);
    router.push(next);
    setOpen(false);
  };

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

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={async () => {
            const next = !open;
            setOpen(next);
            if (next) {
              await ensureWorkspacesLoaded();
            }
          }}
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--color-text)",
          }}
          aria-label="Open account menu"
        >
          <span className="max-w-40 truncate">{display}</span>

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

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="wf-dashboard-account-menu absolute right-0 z-50 mt-2 w-80 rounded-2xl p-1.5"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              role="menu"
            >
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
                <div className="flex min-w-0 flex-col">
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Signed in as
                  </span>
                  <span className="truncate text-sm font-medium">{display}</span>
                </div>
              </div>

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              <div className="px-3 py-2">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span
                    className="text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Workspace
                  </span>
                  <button
                    type="button"
                    onClick={() => setCreateOpen(true)}
                    className="text-[11px] font-medium underline-offset-2 hover:underline"
                    style={{ color: "var(--color-text)" }}
                  >
                    + New
                  </button>
                </div>

                <div className="max-h-40 space-y-1 overflow-auto">
                  {wsLoading && (
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      Loading workspaces…
                    </div>
                  )}

                  {!wsLoading && workspaces.length === 0 && (
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      No workspaces yet.
                    </div>
                  )}

                  {!wsLoading &&
                    workspaces.map((ws) => {
                      const isActive = ws.id === activeWorkspace?.id;
                      return (
                        <button
                          key={ws.id}
                          type="button"
                          onClick={() => handleWorkspaceSwitch(ws.id)}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition"
                          style={{
                            backgroundColor: isActive
                              ? "var(--color-accent-soft)"
                              : "transparent",
                            color: "var(--color-text)",
                          }}
                        >
                          <span className="truncate">{ws.name}</span>
                          {isActive && (
                            <span
                              className="text-[11px] uppercase tracking-wide"
                              style={{ color: "var(--color-subtle)" }}
                            >
                              Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              <MenuItem href="/dashboard/settings/profile" label="Account" onClick={() => setOpen(false)} />
              <MenuItem href="/dashboard/settings" label="Workspace settings" onClick={() => setOpen(false)} />
              <MenuItem href="/pricing" label="Upgrade" onClick={() => setOpen(false)} />

              <div
                className="my-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />

              <MenuItem href="/dashboard/support" label="Ask a question" onClick={() => setOpen(false)} />
              <MenuItem href="/dashboard/support" label="Help topics" onClick={() => setOpen(false)} />
              <MenuItem href="/dashboard/support" label="Share feedback" onClick={() => setOpen(false)} />

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
                Log out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <CreateWorkspaceModal open={createOpen} onOpenChange={setCreateOpen} />
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
