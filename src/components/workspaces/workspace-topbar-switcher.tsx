"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";

type Workspace = {
  id: string;
  name: string;
};

export function WorkspaceTopbarSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Fetch workspaces
  async function loadWorkspaces() {
    try {
      setLoading(true);
      const res = await fetch("/api/workspaces", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      setWorkspaces(json.workspaces ?? []);
    } catch {
      // keep UI quiet
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkspaces();
  }, []);

  // When create modal closes, refresh list
  useEffect(() => {
    if (!createOpen) {
      const t = setTimeout(() => {
        loadWorkspaces();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [createOpen]);

  const activeWorkspaceIdFromUrl = searchParams?.get("workspaceId") ?? null;

  const activeWorkspace = useMemo(() => {
    if (!workspaces.length) return null;
    if (activeWorkspaceIdFromUrl) {
      const byId = workspaces.find((w) => w.id === activeWorkspaceIdFromUrl);
      if (byId) return byId;
    }
    // Fallback: first workspace (matches getActiveWorkspace behaviour)
    return workspaces[0];
  }, [workspaces, activeWorkspaceIdFromUrl]);

  const buildUrlWithWorkspace = (id: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("workspaceId", id);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const handleSwitch = (id: string) => {
    startTransition(() => {
      const next = buildUrlWithWorkspace(id);
      router.push(next);
      setOpenMenu(false);
    });
  };

  const label = activeWorkspace?.name ?? (loading ? "Loading…" : "No workspace");

  return (
    <div className="relative inline-flex flex-col gap-1 min-w-0">
      {/* Label + current workspace pill */}
      <span
        className="text-[11px] uppercase tracking-[0.16em]"
        style={{ color: "var(--color-subtle)" }}
      >
        Workspace
      </span>

      <button
        type="button"
        disabled={loading || !workspaces.length}
        onClick={() => setOpenMenu((v) => !v)}
        className={cn(
          "inline-flex items-center justify-between gap-2 rounded-full px-3 py-2 text-xs sm:text-sm w-full",
          "border transition-colors shadow-sm"
        )}
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        <span className="truncate max-w-[160px]">{label}</span>
        <ChevronDown
          className="h-3 w-3 flex-shrink-0"
          style={{ color: "var(--color-subtle)" }}
        />
      </button>

      {/* Dropdown menu – now aligned under the pill, same width */}
      {openMenu && (
        <div
          className="absolute left-0 top-[110%] z-40 mt-1 w-full rounded-2xl p-1.5 shadow-lg"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="max-h-64 overflow-auto">
            {loading && (
              <div
                className="px-3 py-2 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Loading workspaces…
              </div>
            )}

            {!loading && workspaces.length === 0 && (
              <div
                className="px-3 py-2 text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                You don&apos;t have any workspaces yet.
              </div>
            )}

            {!loading &&
              workspaces.map((ws) => {
                const isActive = ws.id === activeWorkspace?.id;
                return (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => handleSwitch(ws.id)}
                    disabled={isPending}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition"
                    )}
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

          <div
            className="my-1 h-px"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          <button
            type="button"
            className="block w-full rounded-lg px-2.5 py-2 text-left text-sm"
            style={{ color: "var(--color-text)" }}
            onClick={() => {
              setOpenMenu(false);
              setCreateOpen(true);
            }}
          >
            + New workspace
          </button>
        </div>
      )}

      {/* Reuse existing modal for creation */}
      <CreateWorkspaceModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
