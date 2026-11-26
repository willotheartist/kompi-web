// src/components/contact/contact-form-card.tsx
"use client";

import { useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ContactFormCardProps = {
  formId: string;
  heading?: string;
  description?: string;
  successMessage?: string;
  compact?: boolean;
};

export function ContactFormCard({
  formId,
  heading = "Get in touch",
  description = "Drop your details and a quick message. We’ll get back to you soon.",
  successMessage = "Thanks – your message has been sent.",
  compact = false,
}: ContactFormCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formId) {
      setError("No form ID configured.");
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Add a quick message so we know how to help.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(`/api/contact-forms/${formId}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        let msg = "Something went wrong sending your message.";
        try {
          const body = await res.json();
          if (body?.error && typeof body.error === "string") {
            msg = body.error;
          }
        } catch {
          // ignore parse error
        }
        setError(msg);
        return;
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("ContactFormCard submit error:", err);
      setError("Something went wrong sending your message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card
      className={
        compact
          ? "rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4"
          : "rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 md:p-6"
      }
    >
      <div className="space-y-1.5 mb-4">
        <h2 className="text-base font-semibold text-[color:var(--color-text)] md:text-lg">
          {heading}
        </h2>
        {description && (
          <p className="text-xs md:text-sm text-[color:var(--color-subtle)]">
            {description}
          </p>
        )}
      </div>

      {sent ? (
        <div className="rounded-2xl bg-[color:var(--color-bg)] px-4 py-3 text-sm text-[color:var(--color-text)]">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Taylor Swift"
                autoComplete="name"
                disabled={submitting}
                className="text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={submitting}
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
              Message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you’re looking for, dates, budget, or any key details."
              disabled={submitting}
              rows={compact ? 3 : 4}
              className="text-sm resize-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
              className="rounded-full px-4 text-sm font-semibold"
            >
              {submitting ? "Sending…" : "Send message"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
