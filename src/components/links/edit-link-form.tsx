"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type EditLinkFormProps = {
  id: string;
  initialTargetUrl: string;
  initialCode: string;
};

export function EditLinkForm({
  id,
  initialTargetUrl,
  initialCode,
}: EditLinkFormProps) {
  const [targetUrl, setTargetUrl] = useState(initialTargetUrl);
  const [code, setCode] = useState(initialCode);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const url = targetUrl.trim();
    if (!url) {
      toast.error("Destination URL is required");
      return;
    }

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
          }),
        });

        if (res.status === 409) {
          toast.error("That custom code is already in use");
          return;
        }

        if (!res.ok) {
          toast.error("Could not update link");
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
    <div className="max-w-2xl">
      <Card className="border-white/10 bg-slate-950/80 p-6 md:p-7">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-semibold text-white">
              Edit link
            </h1>
            <p className="text-sm text-slate-400">
              Update the destination URL or custom code for this Kompi link.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="destination-url"
                className="text-sm font-medium text-slate-100"
              >
                Destination URL
              </label>
              <Input
                id="destination-url"
                placeholder="https://example.com"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="custom-code"
                className="text-sm font-medium text-slate-100"
              >
                Custom code (optional)
              </label>
              <Input
                id="custom-code"
                placeholder="my-link"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <p className="text-xs text-slate-500">
                This is the part after <code>/r/</code> in your short link. It
                must be unique in this workspace.
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-xl border-white/20 text-slate-200 hover:bg-white/5"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 rounded-xl bg-sky-500 px-5 text-sm font-semibold text-white hover:bg-sky-600"
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
