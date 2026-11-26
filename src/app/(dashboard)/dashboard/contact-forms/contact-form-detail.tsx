// src/app/dashboard/contact-forms/contact-form-detail.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  User,
  MessageSquare,
  Phone,
  Tag,
  ShieldCheck,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type ContactFormDetailProps = {
  formId: string;
};

type FormVM = {
  id: string;
  title: string;
  description: string | null;

  includeName: boolean;
  includeMessage: boolean;
  includePhone: boolean;
  includeSubject: boolean;

  subjectOptions: string[];
  tags: string[];

  buttonLabel: string | null;
  successMessage: string | null;

  notificationsEmail: string | null;

  autoReplySubject: string | null;
  autoReplyBody: string | null;

  accentHex: string | null;
  themeLayout: string | null;
  themeFont: string | null;
  themeCorners: string | null;

  spamHoneypotEnabled: boolean;

  createdAt: string;
};

type SubmissionVM = {
  id: string;
  name: string | null;
  email: string | null;
  message: string;
  meta: Record<string, unknown> | null;
  createdAt: string;
};

export function ContactFormDetail({ formId }: ContactFormDetailProps) {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormVM | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionVM[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [subjectOptionsText, setSubjectOptionsText] = useState("");
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    async function load() {
      if (!formId || formId === "new") {
        setError("No form ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Load config + submissions in parallel
        const [configRes, submissionsRes] = await Promise.all([
          fetch(`/api/contact-forms/${formId}`),
          fetch(`/api/contact-forms/${formId}/submissions`),
        ]);

        if (!configRes.ok) {
          let msg = "Failed to load contact form settings";
          try {
            const body = await configRes.json();
            if (body?.error && typeof body.error === "string") {
              msg = body.error;
            }
          } catch {
            // ignore
          }
          setError(msg);
          return;
        }

        const configJson = (await configRes.json()) as { form: FormVM };
        const loadedForm = configJson.form;

        if (!loadedForm) {
          setError("Contact form not found.");
          return;
        }

        setForm(loadedForm);
        setSubjectOptionsText(
          (loadedForm.subjectOptions ?? []).join("\n")
        );
        setTagsText((loadedForm.tags ?? []).join(", "));

        if (submissionsRes.ok) {
          const submissionsJson = (await submissionsRes.json()) as {
            submissions: SubmissionVM[];
          };

          setSubmissions(
            Array.isArray(submissionsJson.submissions)
              ? submissionsJson.submissions
              : []
          );
        } else {
          setSubmissions([]);
        }
      } catch (err) {
        console.error("ContactFormDetail load error:", err);
        setError("Failed to load contact form");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [formId]);

  async function handleSave() {
    if (!form) return;

    try {
      setSaving(true);
      setError(null);

      const subjectOptions = subjectOptionsText
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);

      const tags = tagsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch(`/api/contact-forms/${form.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description ?? "",

          includeName: form.includeName,
          includeMessage: form.includeMessage,
          includePhone: form.includePhone,
          includeSubject: form.includeSubject,

          subjectOptions,
          tags,

          buttonLabel: form.buttonLabel ?? "",
          successMessage: form.successMessage ?? "",

          notificationsEmail: form.notificationsEmail ?? "",

          autoReplySubject: form.autoReplySubject ?? "",
          autoReplyBody: form.autoReplyBody ?? "",

          accentHex: form.accentHex ?? "",
          themeLayout: form.themeLayout ?? "",
          themeFont: form.themeFont ?? "",
          themeCorners: form.themeCorners ?? "",

          spamHoneypotEnabled: form.spamHoneypotEnabled,
        }),
      });

      if (!res.ok) {
        let msg = "Failed to save form settings";
        try {
          const body = await res.json();
          if (body?.error && typeof body.error === "string") {
            msg = body.error;
          }
        } catch {
          // ignore
        }
        setError(msg);
        toast.error(msg);
        return;
      }

      const json = (await res.json()) as { form: FormVM };
      if (json.form) {
        setForm(json.form);
        setSubjectOptionsText(
          (json.form.subjectOptions ?? []).join("\n")
        );
        setTagsText((json.form.tags ?? []).join(", "));
      }

      toast.success("Form settings saved");
    } catch (err) {
      console.error("ContactFormDetail save error:", err);
      const msg = "Failed to save form settings";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  if (!formId || formId === "new") {
    return (
      <div className="wf-dashboard-content space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/dashboard/contact-forms"
            className="inline-flex items-center gap-2 text-xs text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to contact forms
          </Link>
        </div>

        <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
          <p className="text-sm text-[color:var(--color-subtle)]">
            No form ID provided. Use the contact forms dashboard to choose a
            form to inspect.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="wf-dashboard-content space-y-4">
      {/* Header / breadcrumb */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/dashboard/contact-forms"
          className="inline-flex items-center gap-2 text-xs text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to contact forms
        </Link>
      </div>

      {/* Heading card */}
      <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-4 md:px-6 md:py-5">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-3 w-40" />
          </div>
        ) : error ? (
          <div className="space-y-2">
            <h1 className="text-base font-semibold text-[color:var(--color-text)]">
              Failed to load contact form
            </h1>
            <p className="text-sm text-[color:var(--color-subtle)]">
              {error}
            </p>
            <p className="text-xs text-[color:var(--color-subtle)]">
              If this keeps happening, check the server logs for the underlying
              error on{" "}
              <code className="rounded bg-[color:var(--color-bg)] px-1 py-0.5 text-[10px]">
                /api/contact-forms/{formId}
              </code>
              .
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                Contact form
              </p>
              <h1 className="text-xl font-semibold text-[color:var(--color-text)] md:text-2xl">
                {form?.title || "Untitled form"}
              </h1>
              <p className="text-xs text-[color:var(--color-subtle)]">
                Created{" "}
                {form?.createdAt
                  ? new Date(form.createdAt).toLocaleString()
                  : "—"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 rounded-full px-3 text-xs"
                disabled={saving || loading || !form}
                onClick={handleSave}
              >
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Form settings */}
      <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-4 md:px-6 md:py-5">
        {loading || !form ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Form settings
                </p>
                <p className="text-xs text-[color:var(--color-subtle)]">
                  Control which fields appear, how the button reads, and what
                  happens after someone submits.
                </p>
              </div>
            </div>

            {/* Basic info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Title
                </label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. General enquiries"
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Description
                </label>
                <Input
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                  placeholder="Short intro that appears above the form."
                  className="text-sm"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Fields
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={form.includeName ? "default" : "outline"}
                    size="sm"
                    className="h-7 rounded-full px-3 text-[11px]"
                    onClick={() =>
                      setForm((prev) =>
                        prev
                          ? { ...prev, includeName: !prev.includeName }
                          : prev
                      )
                    }
                  >
                    <User className="mr-1.5 h-3 w-3" />
                    Name
                  </Button>
                  <Button
                    type="button"
                    variant={form.includeMessage ? "default" : "outline"}
                    size="sm"
                    className="h-7 rounded-full px-3 text-[11px]"
                    onClick={() =>
                      setForm((prev) =>
                        prev
                          ? { ...prev, includeMessage: !prev.includeMessage }
                          : prev
                      )
                    }
                  >
                    <MessageSquare className="mr-1.5 h-3 w-3" />
                    Message
                  </Button>
                  <Button
                    type="button"
                    variant={form.includePhone ? "default" : "outline"}
                    size="sm"
                    className="h-7 rounded-full px-3 text-[11px]"
                    onClick={() =>
                      setForm((prev) =>
                        prev
                          ? { ...prev, includePhone: !prev.includePhone }
                          : prev
                      )
                    }
                  >
                    <Phone className="mr-1.5 h-3 w-3" />
                    Phone
                  </Button>
                  <Button
                    type="button"
                    variant={form.includeSubject ? "default" : "outline"}
                    size="sm"
                    className="h-7 rounded-full px-3 text-[11px]"
                    onClick={() =>
                      setForm((prev) =>
                        prev
                          ? { ...prev, includeSubject: !prev.includeSubject }
                          : prev
                      )
                    }
                  >
                    <MessageSquare className="mr-1.5 h-3 w-3" />
                    Subject dropdown
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Anti-spam
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant={
                      form.spamHoneypotEnabled ? "default" : "outline"
                    }
                    size="sm"
                    className="h-7 rounded-full px-3 text-[11px]"
                    onClick={() =>
                      setForm((prev) =>
                        prev
                          ? {
                              ...prev,
                              spamHoneypotEnabled:
                                !prev.spamHoneypotEnabled,
                            }
                          : prev
                      )
                    }
                  >
                    <ShieldCheck className="mr-1.5 h-3 w-3" />
                    Honeypot field
                  </Button>
                  <p className="text-[11px] text-[color:var(--color-subtle)]">
                    Blocks basic bots by ignoring hidden field fills.
                  </p>
                </div>
              </div>
            </div>

            {/* Subject options + tags */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                    Subject options
                  </label>
                  <span className="text-[10px] text-[color:var(--color-subtle)]">
                    One per line, shown when subject dropdown is enabled.
                  </span>
                </div>
                <Textarea
                  value={subjectOptionsText}
                  onChange={(e) => setSubjectOptionsText(e.target.value)}
                  rows={4}
                  placeholder={"General enquiry\nCollaboration\nBooking"}
                  className="text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                    Tags
                  </label>
                  <span className="text-[10px] text-[color:var(--color-subtle)]">
                    Comma-separated, added to every submission.
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Input
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    placeholder="vip, inbound, kcard, menu"
                    className="text-sm"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {(form.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-bg)] px-2 py-0.5 text-[10px] text-[color:var(--color-subtle)]"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Copy & notifications */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Button label
                </label>
                <Input
                  value={form.buttonLabel ?? ""}
                  onChange={(e) =>
                    setForm((prev) =>
                      prev
                        ? { ...prev, buttonLabel: e.target.value }
                        : prev
                    )
                  }
                  placeholder="Send message"
                  className="text-sm"
                />

                <label className="mt-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Success message
                </label>
                <Textarea
                  value={form.successMessage ?? ""}
                  onChange={(e) =>
                    setForm((prev) =>
                      prev
                        ? { ...prev, successMessage: e.target.value }
                        : prev
                    )
                  }
                  rows={3}
                  placeholder="Thanks – we’ve received your message and will reply soon."
                  className="text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                  Notification email
                </label>
                <Input
                  type="email"
                  value={form.notificationsEmail ?? ""}
                  onChange={(e) =>
                    setForm((prev) =>
                      prev
                        ? { ...prev, notificationsEmail: e.target.value }
                        : prev
                    )
                  }
                  placeholder="Where should new enquiries be emailed?"
                  className="text-sm"
                />

                <div className="mt-3 space-y-2">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                    Auto-response (optional)
                  </p>
                  <Input
                    value={form.autoReplySubject ?? ""}
                    onChange={(e) =>
                      setForm((prev) =>
                        prev
                          ? {
                              ...prev,
                              autoReplySubject: e.target.value,
                            }
                          : prev
                      )
                    }
                    placeholder="Thanks for reaching out"
                    className="text-sm"
                  />
                  <Textarea
                    value={form.autoReplyBody ?? ""}
                    onChange={(e) =>
                      setForm((prev) =>
                        prev
                          ? {
                              ...prev,
                              autoReplyBody: e.target.value,
                            }
                          : prev
                      )
                    }
                    rows={3}
                    placeholder="We’ve received your message and will get back to you as soon as possible."
                    className="text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Submissions list */}
      <Card className="rounded-3xl border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-4 md:px-6 md:py-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
              Submissions
            </p>
            {!loading && !error && (
              <p className="text-xs text-[color:var(--color-subtle)]">
                {submissions.length}{" "}
                {submissions.length === 1 ? "entry" : "entries"} collected.
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 rounded-full px-3 text-xs"
            onClick={() => {
              // simple reload – keeps logic minimal for now
              window.location.reload();
            }}
          >
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : error ? (
          <p className="text-sm text-[color:var(--color-subtle)]">
            {error}
          </p>
        ) : submissions.length === 0 ? (
          <p className="text-sm text-[color:var(--color-subtle)]">
            No submissions yet. Share this form and check back once people
            start reaching out.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((s) => (
              <li
                key={s.id}
                className="rounded-2xl bg-[color:var(--color-bg)] px-4 py-3 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {s.name && (
                      <span className="inline-flex items-center gap-1 text-[color:var(--color-text)]">
                        <User className="h-3 w-3 text-[color:var(--color-subtle)]" />
                        {s.name}
                      </span>
                    )}
                    {s.email && (
                      <span className="inline-flex items-center gap-1 text-[color:var(--color-subtle)]">
                        <Mail className="h-3 w-3" />
                        {s.email}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[color:var(--color-subtle)]">
                    {new Date(s.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="mt-2 flex items-start gap-2 text-[13px] text-[color:var(--color-text)]">
                  <MessageSquare className="mt-[2px] h-3.5 w-3.5 text-[color:var(--color-subtle)]" />
                  <p className="whitespace-pre-wrap">{s.message}</p>
                </div>

                {s.meta != null && (
                  <details className="mt-2 text-[11px] text-[color:var(--color-subtle)]">
                    <summary className="cursor-pointer text-[color:var(--color-text)]">
                      View extra metadata
                    </summary>
                    <pre className="mt-1 max-h-40 overflow-auto rounded bg-black/5 p-2 text-[10px]">
                      {JSON.stringify(s.meta, null, 2)}
                    </pre>
                  </details>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
