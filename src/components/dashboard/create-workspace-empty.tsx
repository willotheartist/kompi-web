"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";

export function CreateWorkspaceEmpty() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card
        className="mx-auto w-full max-w-3xl px-10 py-12 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "none", // no shadows
          color: "var(--color-text)",
        }}
      >
        <div className="mb-6 flex justify-center">
          <Image
            src="/workspacekompi.png"
            alt="Kompi workspace illustration"
            width={96}
            height={96}
            className="h-24 w-24"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          No workspace yet
        </h2>

        <p
          className="mt-3 text-sm md:text-base leading-relaxed"
          style={{ color: "var(--color-subtle)" }}
        >
          Create a workspace to start adding links, Kompi Codes™, and analytics.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setOpen(true)}
            // force rectangular, radius 20, no shadow
            className="!rounded-[20px] shadow-none px-7 py-2.5 text-sm md:text-base font-medium"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-text)",
            }}
          >
            Create workspace
          </Button>
        </div>
      </Card>

      <CreateWorkspaceModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
