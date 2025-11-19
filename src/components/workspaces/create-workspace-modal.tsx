"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateWorkspaceModal({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");

  async function handleCreate() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/workspaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmedName }),
        });

        if (!res.ok) {
          console.error("Create workspace failed", await res.text());
          return;
        }

        onOpenChange(false);
        setName("");
        // ensure server components re-fetch the active workspace & links list
        router.refresh();
      } catch (e) {
        console.error(e);
      }
    });
  }

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
          <DialogTitle className="text-base font-semibold text-[var(--color-text)]">
            Create workspace
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label
              className="text-xs font-medium"
              style={{ color: "var(--color-subtle)" }}
            >
              Name
            </label>
            <Input
              placeholder="e.g. Studio Alpha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm"
              style={{
                borderRadius: "var(--radius-md)",
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
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
              onClick={handleCreate}
              disabled={isPending || !name.trim()}
              className="px-5 text-sm font-medium"
              style={{
                borderRadius: "999px",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text)",
              }}
            >
              {isPending ? "Creating…" : "Create workspace"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
