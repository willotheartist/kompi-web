// FILE: src/components/engagement/locked-content.tsx

"use client";

import { ReactNode, useState, FormEvent, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type LockedContentProps = {
  workspaceId: string;
  sourceSlug?: string;
  listId?: string;
  title?: string;
  teaser?: string;
  children: ReactNode;
};

export function LockedContent({
  workspaceId,
  sourceSlug,
  listId,
  title = "Unlock this content",
  teaser = "Join the list to unlock this section.",
  children,
}: LockedContentProps) {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Add an email first");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workspaceId,
            listId,
            email: trimmed,
            sourceSlug,
            sourceType: "locked-content",
            tags: ["locked"],
          }),
        });

        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          toast.error(msg || "Could not unlock right now");
          return;
        }

        setUnlocked(true);

        await fetch("/api/engagement-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workspaceId,
            type: "content-unlock",
            value: sourceSlug ?? null,
            context: { sourceSlug, location: "locked-content" },
          }),
        }).catch(() => {});
      } catch (err) {
        console.error(err);
        toast.error("Could not unlock right now");
      }
    });
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-3xl border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-sm sm:p-5">
      <div className="mb-3 space-y-1">
        <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
          {title}
        </h3>
        <p className="text-xs text-[color:var(--color-subtle)]">
          {teaser}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 rounded-full text-xs"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="h-9 rounded-full px-4 text-xs font-semibold"
        >
          {isPending ? "Unlocking…" : "Unlock"}
        </Button>
      </form>
    </div>
  );
}
