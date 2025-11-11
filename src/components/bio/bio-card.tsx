"use client";

import { useEffect, useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Bio = {
  id: string;
  slug: string;
  title: string | null;
  description: string | null;
};

export function BioCard({
  workspaceId,
  baseUrl,
}: {
  workspaceId: string;
  baseUrl: string;
}) {
  const [bio, setBio] = useState<Bio | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/bio?workspaceId=${workspaceId}`);
      if (!res.ok) return;
      const data = await res.json();
      if (!data) return;
      setBio(data);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setSlug(data.slug || "");
    };
    load();
  }, [workspaceId]);

  const onSave = () => {
    if (!slug.trim()) {
      toast.error("Add a public slug");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId,
          title,
          description,
          slug,
        }),
      });

      if (!res.ok) {
        toast.error(await res.text());
        return;
      }

      const data = await res.json();
      setBio(data);
      setOpen(false);
      toast("Bio page updated", {
        description: `${baseUrl}/p/${data.slug}`,
      });
    });
  };

  const url = bio ? `${baseUrl}/p/${bio.slug}` : null;

  return (
    <Card className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase text-neutral-500">
            Public bio page
          </div>
          <div className="text-sm text-neutral-800">
            Clean link-in-bio for this workspace.
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              {bio ? "Edit" : "Create"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {bio ? "Edit bio page" : "Create bio page"}
              </DialogTitle>
              <DialogDescription>
                This page is public and perfect for your socials.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 flex flex-col gap-3">
              <label className="space-y-1">
                <span className="text-xs text-neutral-600">
                  Title
                </span>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your name or brand"
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-neutral-600">
                  Description
                </span>
                <Textarea
                  rows={3}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Short line about what you do"
                />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-neutral-600">
                  Public URL
                </span>
                <div className="flex items-center gap-1 text-xs bg-neutral-50 border border-neutral-200 rounded-full px-3 py-2">
                  <span className="text-neutral-500">
                    {baseUrl}/p/
                  </span>
                  <input
                    className="flex-1 bg-transparent border-none outline-none text-neutral-900"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </label>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={isPending}
                  onClick={onSave}
                >
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {url && (
        <div className="text-xs text-neutral-500">
          Live at{" "}
          <a
            href={url}
            className="underline text-neutral-900"
            target="_blank"
          >
            {url}
          </a>
        </div>
      )}
    </Card>
  );
}
