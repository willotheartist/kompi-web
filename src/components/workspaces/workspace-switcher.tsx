"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Workspace {
  id: string;
  name: string;
}

interface Props {
  workspaces: Workspace[];
  activeWorkspaceId: string;
}

export function WorkspaceSwitcher({ workspaces, activeWorkspaceId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const switchWorkspace = (id: string) => {
    startTransition(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("workspaceId", id);
      window.location.href = url.toString();
    });
  };

  const createWorkspace = () => {
    if (!name.trim()) {
      toast.error("Name your workspace");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        toast.error(await res.text());
        return;
      }

      const ws = await res.json();
      setOpen(false);
      setName("");

      const url = new URL(window.location.href);
      url.searchParams.set("workspaceId", ws.id);
      window.location.href = url.toString();
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {workspaces.map((w) => (
        <Button
          key={w.id}
          type="button"
          size="sm"
          variant={w.id === activeWorkspaceId ? "default" : "outline"}
          disabled={isPending}
          onClick={() => switchWorkspace(w.id)}
        >
          {w.name}
        </Button>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-dashed"
            disabled={isPending}
          >
            + New workspace
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create workspace</DialogTitle>
            <DialogDescription>
              Separate links and analytics into their own space.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-col gap-3">
            <Input
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={createWorkspace}
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
