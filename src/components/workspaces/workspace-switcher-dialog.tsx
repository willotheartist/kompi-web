"use client";

import { useEffect, useState, useTransition } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Workspace = {
  id: string;
  name: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function WorkspaceSwitcherDialog({ open, onOpenChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/workspaces", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) {
          setWorkspaces(json.workspaces ?? []);
        }
      } catch {
        // noop – keep UI minimal
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

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
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-sm)",
          color: "var(--color-text)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Switch workspace
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-2">
          {loading && (
            <p
              className="text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              Loading workspaces…
            </p>
          )}

          {!loading && workspaces.length === 0 && (
            <p
              className="text-sm"
              style={{ color: "var(--color-subtle)" }}
            >
              You don&apos;t have any workspaces yet.
            </p>
          )}

          {!loading &&
            workspaces.map((ws) => (
              <Button
                key={ws.id}
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-start"
                disabled={isPending}
                onClick={() => handleSwitch(ws.id)}
                style={{
                  borderRadius: "999px",
                  borderColor: "var(--color-border)",
                  backgroundColor: "transparent",
                  color: "var(--color-text)",
                }}
              >
                {ws.name}
              </Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
