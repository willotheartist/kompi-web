// FILE: src/components/subscribers/subscribe-inline-form.tsx

"use client";

import { useState, useTransition, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SubscribeInlineFormProps = {
  workspaceId?: string;
  listId?: string;
  sourceSlug?: string;
  sourceType?: string;
  layout?: "inline" | "stacked";
  showPhone?: boolean;
};

export function SubscribeInlineForm({
  workspaceId,
  listId,
  sourceSlug,
  sourceType,
  layout = "inline",
  showPhone = false,
}: SubscribeInlineFormProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedEmail && !trimmedPhone) {
      toast.error("Add an email or phone number");
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
            email: trimmedEmail || undefined,
            phone: trimmedPhone || undefined,
            sourceSlug,
            sourceType,
          }),
        });

        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          toast.error(msg || "Something went wrong");
          return;
        }

        toast.success("You're in 🎉");
        setEmail("");
        setPhone("");
      } catch (err) {
        console.error(err);
        toast.error("Could not subscribe right now");
      }
    });
  }

  const isStacked = layout === "stacked";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full",
        isStacked
          ? "space-y-2"
          : "flex flex-col gap-2 sm:flex-row sm:items-center",
      )}
    >
      <div className={cn("flex-1", isStacked && "space-y-2")}>
        <Input
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "h-10 rounded-full text-sm",
            !isStacked && "w-full",
          )}
        />
        {showPhone && (
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 rounded-full text-sm"
          />
        )}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "h-10 rounded-full px-4 text-xs font-semibold",
          isStacked && "w-full",
        )}
      >
        {isPending ? "Joining…" : "Join list"}
      </Button>
    </form>
  );
}
