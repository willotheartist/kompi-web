// src/components/contact/contact-form-inline.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ContactFormInlineProps = {
  formId: string;
  /**
   * Optional metadata to help you track where submissions came from.
   * These go into ContactSubmission.meta.
   */
  sourceSlug?: string;
  sourceType?: string; // e.g. "menu", "kcard", "bio"
};

export function ContactFormInline({
  formId,
  sourceSlug,
  sourceType,
}: ContactFormInlineProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formId) {
      toast.error("Contact form is not configured correctly.");
      return;
    }

    if (!message.trim()) {
      toast.error("Add a message before sending.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/contact-forms/${formId}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          message: message.trim(),
          meta: {
            sourceSlug: sourceSlug ?? null,
            sourceType: sourceType ?? null,
          },
        }),
      });

      if (!res.ok) {
        let msg = "Could not send your message. Please try again.";
        try {
          const body = await res.json();
          if (body?.error && typeof body.error === "string") {
            msg = body.error;
          }
        } catch {
          // ignore
        }
        toast.error(msg);
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent. We’ll be in touch soon.");
    } catch (err) {
      console.error("Contact form submit error:", err);
      toast.error("Something went wrong sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 md:p-5">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
            Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
            Message
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What can we help you with?"
            className="min-h-[100px] text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-[11px] text-[color:var(--color-subtle)]">
            This will send straight to your Kompi dashboard as a contact form submission.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full px-4 text-sm font-semibold"
          >
            {isSubmitting ? "Sending…" : "Send"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
