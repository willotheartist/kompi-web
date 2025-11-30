// src/components/subscribers/subscribe-inline.tsx
"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SubscribeInlineProps = {
  workspaceId?: string;
  workspaceSlug?: string;
  listId?: string;
  listName?: string;
  sourceSlug?: string;
  sourceType?: string;
  compact?: boolean;
  showPhoneField?: boolean;
};

export function SubscribeInline({
  workspaceId,
  workspaceSlug,
  listId,
  listName,
  sourceSlug,
  sourceType = "kcard",
  compact = false,
  showPhoneField = true,
}: SubscribeInlineProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedEmail && !trimmedPhone) {
      setError("Add an email or phone number.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId,
          workspaceSlug,
          listId,
          listName,
          email: trimmedEmail || undefined,
          phone: trimmedPhone || undefined,
          sourceSlug,
          sourceType,
        }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        setStatus("error");
        setError(msg || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (compact) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 rounded-full bg-[color:var(--color-surface)] px-2 py-1 text-xs"
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-8 flex-1 rounded-full border-0 bg-transparent px-2 text-xs focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="sm"
          className="h-8 rounded-full px-3 text-[11px]"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Joining…" : "Join"}
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 rounded-2xl bg-[color:var(--color-surface)] p-3 text-xs"
    >
      <div className="space-y-1">
        <p className="text-[11px] font-medium text-[color:var(--color-text)]">
          Stay in the loop
        </p>
        <p className="text-[11px] text-[color:var(--color-subtle)]">
          Drop your details to get updates, offers, or drops first.
        </p>
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-8 rounded-full border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 text-[11px]"
        />
        {showPhoneField && (
          <Input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-8 rounded-full border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 text-[11px]"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          type="submit"
          size="sm"
          className="h-8 rounded-full px-4 text-[11px] font-semibold"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Joining…" : "Join list"}
        </Button>
        <p
          className={cn(
            "text-[10px]",
            status === "error" && "text-red-500",
            status === "success" && "text-[color:var(--color-subtle)]"
          )}
        >
          {status === "success"
            ? "You’re in. Thanks for subscribing!"
            : error}
        </p>
      </div>
    </form>
  );
}
