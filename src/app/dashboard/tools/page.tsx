"use client";

import * as React from "react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { TOOL_DEFINITIONS } from "@/lib/tools-config";
import { ToolCard } from "@/components/tools/ToolCard";

type EnabledState = Record<string, boolean>;

function ToolsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [enabled, setEnabled] = useState<EnabledState>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Load enabled tools for this workspace
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams?.toString() ?? "");
        const qs = params.toString();
        const url = qs ? `/api/tools?${qs}` : "/api/tools";

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;

        const json = await res.json();
        const map: EnabledState = {};
        (json.toolIds ?? []).forEach((id: string) => {
          map[id] = true;
        });
        setEnabled(map);
      } catch (error) {
        console.error("TOOLS_PAGE_LOAD_ERROR", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchParams]);

  async function handleToggle(id: string) {
    const next = !enabled[id];

    // optimistic update
    setEnabled((prev) => ({
      ...prev,
      [id]: next,
    }));

    try {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      const workspaceId = params.get("workspaceId");

      const res = await fetch("/api/tools/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolId: id,
          enabled: next,
          workspaceId,
        }),
      });

      if (!res.ok) {
        console.error("TOOLS_TOGGLE_ERROR_STATUS", res.status);
        // revert optimistic change on error
        setEnabled((prev) => ({
          ...prev,
          [id]: !next,
        }));
        return;
      }

      // Refresh layout + sidebar so nav picks up the new tools
      router.refresh();
    } catch (error) {
      console.error("TOOLS_TOGGLE_ERROR", error);
      // revert optimistic change on error
      setEnabled((prev) => ({
        ...prev,
        [id]: !next,
      }));
    }
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Explore tools
        </h1>
        <p className="mt-1 text-sm text-muted-foreground max-w-xl">
          Add Kompi tools to your workspace so they&apos;re always one click away
          while you&apos;re working on links, QR codes, menus, and more.
        </p>
      </header>

      <section>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading tools…</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TOOL_DEFINITIONS.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                enabled={!!enabled[tool.id]}
                onToggle={() => handleToggle(tool.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function DashboardToolsPage() {
  return (
    <Suspense fallback={null}>
      <DashboardLayout>
        <ToolsContent />
      </DashboardLayout>
    </Suspense>
  );
}
