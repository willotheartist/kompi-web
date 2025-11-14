"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";

export function CreateWorkspaceEmpty() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="mx-auto w-full max-w-xl rounded-3xl border border-slate-800/70 bg-[#030816]/95 px-6 py-8 text-center shadow-[0_22px_80px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-semibold text-white">No workspace yet</h2>
        <p className="mt-1 text-sm text-slate-400">
          Create a workspace to start adding links, Kompi Codes™, and analytics.
        </p>

        <div className="mt-5">
          <Button
            className="rounded-full bg-[#43C7FF] px-5 py-2 font-semibold text-slate-900 hover:bg-[#30b2eb]"
            onClick={() => setOpen(true)}
          >
            Create workspace
          </Button>
        </div>
      </Card>

      {/* Correct modal: workspace creation (not link creation) */}
      <CreateWorkspaceModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
