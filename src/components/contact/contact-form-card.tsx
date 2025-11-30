// FILE: src/components/contact/contact-form-card.tsx

"use client";

import { FormEvent, useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ContactFormCardProps = {
  formId: string;
  heading?: string;
  description?: string;
  meta?: Record<string, unknown>;
};

export function ContactFormCard({
  formId,
  heading = "Contact",
  description = "Drop a quick message and we’ll get back to you.",
  meta,
}: ContactFormCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      toast.error("Add a message first");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/contact-forms/${encodeURIComponent(formId)}/submissions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.trim() || undefined,
              email: email.trim() || undefined,
              message: trimmedMessage,
              meta,
            }),
          },
        );

        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          toast.error(msg || "Something went wrong");
          return;
        }

        toast.success("Message sent");
        setName("");
        setEmail("");
        setMessage("");
      } catch (err) {
        console.error(err);
        toast.error("Could not send your message");
      }
    });
  }

  return (
    <Card className="w-full max-w-md rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 shadow-sm">
      <div className="mb-3 space-y-1">
        <h2 className="text-sm font-semibold text-[color:var(--color-text)]">
          {heading}
        </h2>
        {description && (
          <p className="text-xs text-[color:var(--color-subtle)]">
            {description}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-[color:var(--color-text)]">
            Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-9 rounded-2xl text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-[color:var(--color-text)]">
            Email
          </label>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-9 rounded-2xl text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-[color:var(--color-text)]">
            Message
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="How can we help?"
            className="rounded-2xl text-xs"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-1 h-9 w-full rounded-full text-xs font-semibold"
        >
          {isPending ? "Sending…" : "Send message"}
        </Button>
      </form>
    </Card>
  );
}
