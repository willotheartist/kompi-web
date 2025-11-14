"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
        className="rounded-full px-5"
        onClick={() => setOpen(true)}
      >
        Create workspace
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a workspace</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <label className="text-sm text-muted-foreground">
              Workspace name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={suggested}
            />
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancel
              </Button>
              <Button onClick={onCreate} disabled={pending}>
                {pending ? "Creating…" : "Create workspace"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
