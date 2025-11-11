"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CreateLinkForm({ workspaceId }: { workspaceId: string }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = targetUrl.trim();
    if (!url) {
      toast.error("Add a destination URL");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: url,
          code: code.trim() || undefined,
          workspaceId,
        }),
      });

      if (!res.ok) {
        toast.error(await res.text());
        return;
      }

      const link = await res.json();
      toast("Short link created", {
        description: `Code: ${link.code}`,
      });

      setTargetUrl("");
      setCode("");
      window.location.reload();
    });
  }

  return (
    <Card className="p-4 border border-neutral-100 shadow-sm">
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row gap-3 md:items-center"
      >
        <div className="flex-1 space-y-1">
          <label className="text-[10px] uppercase tracking-wide text-neutral-500">
            Destination URL
          </label>
          <Input
            placeholder="Paste a link to shorten"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
          />
        </div>
        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase tracking-wide text-neutral-400">
            Custom code (optional)
          </label>
          <Input
            placeholder="my-link"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex md:self-end">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto"
          >
            {isPending ? "Creating…" : "Create link"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
