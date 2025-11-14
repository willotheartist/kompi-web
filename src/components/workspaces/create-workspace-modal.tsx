"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 32);
}

export function CreateWorkspaceModal({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  async function handleCreate() {
    const body = {
      name: name.trim(),
      slug: (slug || slugify(name)).trim(),
    };
    if (!body.name || !body.slug) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/workspaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          console.error("Create workspace failed", await res.text());
          return;
        }

        onOpenChange(false);
        // ensure server components re-fetch the active workspace & links list
        router.refresh();
      } catch (e) {
        console.error(e);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border border-white/10 bg-[#050816]/95 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Create workspace</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">Name</label>
            <Input
              placeholder="e.g. Studio Alpha"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug) setSlug(slugify(e.target.value));
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">Slug</label>
            <Input
              placeholder="studio-alpha"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
            />
            <p className="text-[11px] text-slate-500">
              Used in URLs and switching. Letters, numbers and dashes only.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              className="border-white/20 text-slate-200 hover:bg-white/10"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#43C7FF] text-slate-900 hover:bg-[#30b2eb]"
              onClick={handleCreate}
              disabled={isPending || !name.trim()}
            >
              {isPending ? "Creating…" : "Create workspace"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
