"use client";

import { useState, useTransition, FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type EditLinkFormProps = {
  id: string;
  initialTargetUrl: string;
  initialCode: string;
  initialTitle?: string | null;
  initialIsActive: boolean;
  shortUrl?: string | null;
};

export function EditLinkForm({
  id,
  initialTargetUrl,
  initialCode,
  initialTitle,
  initialIsActive,
  shortUrl,
}: EditLinkFormProps) {
  const [targetUrl, setTargetUrl] = useState(initialTargetUrl);
  const [code, setCode] = useState(initialCode);
  const [title, setTitle] = useState(initialTitle ?? "");
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const shortPreview = useMemo(() => {
    if (shortUrl) {
      const idx = shortUrl.indexOf("/r/");
      if (idx !== -1) {
        const base = shortUrl.slice(0, idx);
        return code
          ? `${base}/r/${code}`
          : `${base}/r/your-code`;
      }
      return shortUrl;
    }
    if (code) {
      return `/r/${code}`;
    }
    return "";
  }, [shortUrl, code]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const url = targetUrl.trim();
    if (!url) {
      toast.error("Destination URL is required");
      return;
    }

    const nextTitle = title.trim();

    startTransition(async () => {
      try {
        const res = await fetch(`/api/links/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetUrl: url,
            code: code.trim() || null,
            title: nextTitle || null,
            isActive,
          }),
        });

        if (res.status === 409) {
          toast.error("That custom code is already in use");
          return;
        }

        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          toast.error(msg || "Could not update link");
          return;
        }

        toast.success("Link updated");
        router.push(`/links/${id}`);
        router.refresh();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong updating this link");
      }
    });
  }

  return (
    <div className="w-full">
      <Card className="mx-auto max-w-2xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm md:p-7">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-[color:var(--color-text)] md:text-2xl">
              Edit link
            </h1>
            <p className="text-sm text-[color:var(--color-subtle)]">
              Update the destination URL, title, custom code, or status for this Kompi link.
            </p>
          </div>

          {/* Destination URL */}
          <div className="space-y-2">
            <label
              htmlFor="destination-url"
              className="text-sm font-medium text-[color:var(--color-text)]"
            >
              Destination URL
            </label>
            <Input
              id="destination-url"
              placeholder="https://example.com"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="h-11 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            />
            <p className="text-xs text-[color:var(--color-subtle)]">
              This is where visitors will land when they click your Kompi link.
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="link-title"
              className="text-sm font-medium text-[color:var(--color-text)]"
            >
              Title{" "}
              <span className="font-normal text-[color:var(--color-subtle)]">
                (optional)
              </span>
            </label>
            <Input
              id="link-title"
              placeholder="Give this link a friendly name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            />
            <p className="text-xs text-[color:var(--color-subtle)]">
              Shown in your dashboard and analytics to make this link easier to recognize.
            </p>
          </div>

          {/* Custom code + short link preview */}
          <div className="space-y-2">
            <label
              htmlFor="custom-code"
              className="text-sm font-medium text-[color:var(--color-text)]"
            >
              Custom code{" "}
              <span className="font-normal text-[color:var(--color-subtle)]">
                (optional)
              </span>
            </label>
            <Input
              id="custom-code"
              placeholder="my-link"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-11 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
            />
            <p className="text-xs text-[color:var(--color-subtle)]">
              This is the part after <code>/r/</code> in your short link. It must be unique.
            </p>
            {shortPreview && (
              <p className="text-xs text-[color:var(--color-subtle)]">
                Short link preview:{" "}
                <span className="font-medium text-[color:var(--color-text)]">
                  {shortPreview}
                </span>
              </p>
            )}
          </div>

          {/* Status toggle */}
          <div className="space-y-2 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[color:var(--color-text)]">
                  Link status
                </p>
                <p className="text-xs text-[color:var(--color-subtle)]">
                  Disable this link to stop new visitors from being redirected.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActive((prev) => !prev)}
                className={
                  "inline-flex h-6 w-11 items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-0.5 transition-all " +
                  (isActive ? "justify-end" : "justify-start")
                }
              >
                <span className="h-4 w-4 rounded-full bg-[color:var(--color-accent)]" />
              </button>
            </div>
            <p className="text-xs text-[color:var(--color-subtle)]">
              Current state:{" "}
              <span className="font-medium text-[color:var(--color-text)]">
                {isActive ? "Active" : "Inactive"}
              </span>
            </p>
          </div>

          {/* Footer actions */}
          <div className="flex justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-full border-[color:var(--color-border)] bg-transparent px-4 text-sm font-medium text-[color:var(--color-text)] hover:bg-[color:var(--color-surface)]"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 rounded-full bg-[color:var(--color-accent)] px-5 text-sm font-semibold text-[color:var(--color-text)] hover:opacity-90 disabled:opacity-70"
              disabled={isPending}
            >
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
