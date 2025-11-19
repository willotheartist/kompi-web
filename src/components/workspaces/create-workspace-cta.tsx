"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateWorkspaceCTA() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const suggested = useMemo(() => {
    return "My workspace";
  }, []);

  const onCreate = async () => {
    setError(null);
    const finalName = (name || suggested).trim();
    if (!finalName) {
      setError("Please enter a name.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/workspaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: finalName }),
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(txt || "Failed to create workspace");
        }
        setOpen(false);
        router.refresh();
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : "Something went wrong. Please try again.";
        setError(message);
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={pending}
        className="px-5 text-sm font-medium"
        style={{
          borderRadius: "999px",
          backgroundColor: "var(--color-accent)",
          color: "var(--color-text)",
        }}
      >
        Create workspace
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-[var(--color-text)]">
              Create a workspace
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: "var(--color-subtle)" }}>
                Workspace name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={suggested}
                className="text-sm"
                style={{
                  borderRadius: "var(--radius-md)",
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-text)",
                }}
              />
              {error && (
                <p className="text-xs" style={{ color: "var(--color-text)" }}>
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
                className="px-4 text-sm"
                style={{
                  borderRadius: "999px",
                  borderColor: "var(--color-border)",
                  backgroundColor: "transparent",
                  color: "var(--color-text)",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={onCreate}
                disabled={pending}
                className="px-5 text-sm font-medium"
                style={{
                  borderRadius: "999px",
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-text)",
                }}
              >
                {pending ? "Creating…" : "Create workspace"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
