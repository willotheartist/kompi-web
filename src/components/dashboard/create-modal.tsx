"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Link2,
  QrCode,
  LayoutTemplate,
  ChevronLeft,
} from "lucide-react";

type Mode = "menu" | "link" | "kr" | "bio";

export function CreateModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("menu");
  const [loading, setLoading] = useState(false);

  // link form state
  const [destination, setDestination] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [title, setTitle] = useState("");

  const reset = () => {
    setMode("menu");
    setDestination("");
    setCustomCode("");
    setTitle("");
    setLoading(false);
  };

  const handleClose = (next: boolean) => {
    if (!next) {
      reset();
    }
    onOpenChange(next);
  };

  async function handleCreateLink(e: FormEvent) {
    e.preventDefault();
    const url = destination.trim();
    if (!url) {
      toast.error("Add a destination URL.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: url,
          code: customCode.trim() || undefined,
          title: title.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create link");
      }

      const data = await res.json();
      const linkId = data.id || data.link?.id;
      const code = data.code || data.link?.code;

      toast.success("Kompi link created.");

      handleClose(false);

      // Prefer analytics page
      if (linkId) {
        router.push(`/links/${linkId}`);
      } else if (code) {
        router.push(`/links/${code}`);
      } else {
        router.refresh();
      }
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof Error ? err.message : "Could not create link.";
      if (msg.toLowerCase().includes("unauthorized")) {
        toast.error("Please sign in again to create Kompi links.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl border border-white/15 bg-gradient-to-b from-[#020817] via-[#030b1f] to-[#020817] text-slate-50 shadow-[0_30px_120px_rgba(15,23,42,0.9)] rounded-3xl">
        {/* HEADER */}
        <DialogHeader>
          {mode !== "menu" && (
            <button
              type="button"
              onClick={() => setMode("menu")}
              className="inline-flex items-center gap-1 text-[10px] text-slate-300 hover:text-cyan-300 mb-2"
            >
              <ChevronLeft className="h-3 w-3" />
              Back
            </button>
          )}
          <DialogTitle className="text-2xl font-semibold text-slate-50">
            {mode === "menu" && "What do you want to create?"}
            {mode === "link" && "Create a new Kompi link"}
            {mode === "kr" && "Create a Kompi Code™"}
            {mode === "bio" && "Build a Link-in-bio hub"}
          </DialogTitle>
        </DialogHeader>

        {/* MENU MODE */}
        {mode === "menu" && (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={() => setMode("link")}
              className="group flex flex-col items-start gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-left"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-cyan-400/10 text-cyan-300">
                <Link2 className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Shorten a link
                </div>
                <p className="text-[11px] text-slate-300">
                  Turn any long URL into a branded Kompi link with
                  analytics baked in.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("kr")}
              className="group flex flex-col items-start gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-left"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-fuchsia-400/10 text-fuchsia-300">
                <QrCode className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Create a Kompi Code™
                </div>
                <p className="text-[11px] text-slate-300">
                  Generate on-brand KR codes linked to your Kompi
                  links for print and screens.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("bio")}
              className="group flex flex-col items-start gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-left"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-2xl bg-emerald-400/10 text-emerald-300">
                <LayoutTemplate className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  Build a Link-in-bio page
                </div>
                <p className="text-[11px] text-slate-300">
                  Launch a Kompi hub with your best links, socials,
                  and offers in minutes.
                </p>
              </div>
            </button>
          </div>
        )}

        {/* LINK MODE */}
        {mode === "link" && (
          <form
            onSubmit={handleCreateLink}
            className="mt-4 space-y-5 text-xs md:text-sm"
          >
            <section className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-200">
                  Destination URL
                </label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="https://example.com/my-long-url"
                  className="bg-white/5 border-white/15 text-xs md:text-sm placeholder:text-slate-500"
                  disabled={loading}
                />
              </div>

              <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-200">
                    Short link
                  </label>
                  <div className="flex items-center gap-2 text-[11px]">
                    <div className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                      kompi.app
                    </div>
                    <span className="text-slate-500">/</span>
                    <Input
                      value={customCode}
                      onChange={(e) =>
                        setCustomCode(e.target.value)
                      }
                      placeholder="custom-code (optional)"
                      className="bg-white/5 border-white/15 text-[11px] placeholder:text-slate-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-200">
                    Title (optional)
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Internal label e.g. Spring campaign hero"
                    className="bg-white/5 border-white/15 text-[11px] placeholder:text-slate-500"
                    disabled={loading}
                  />
                </div>
              </div>
            </section>

            {/* Slimmed-down options (visual only for now) */}
            <section className="grid gap-3 md:grid-cols-3 text-[10px] text-slate-300">
              <div className="p-3 rounded-2xl bg-white/3 border border-white/10">
                <div className="text-[10px] font-semibold text-slate-200 mb-1">
                  Kompi Code™ ready
                </div>
                <p>
                  Your link can be instantly turned into a branded KR
                  code from its analytics page.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/3 border border-white/10">
                <div className="text-[10px] font-semibold text-slate-200 mb-1">
                  Add to Link-in-bio
                </div>
                <p>
                  Surface this link on your Kompi hub with one
                  toggle (coming next).
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/3 border border-white/10">
                <div className="text-[10px] font-semibold text-slate-200 mb-1">
                  UTM presets
                </div>
                <p>
                  Apply workspace UTM rules to keep campaigns clean
                  and comparable.
                </p>
              </div>
            </section>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[9px] text-slate-300">
                You can edit destination, KR codes, and placements
                anytime from the link details page.
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 px-3 rounded-2xl text-[10px] border-white/20 text-slate-300 bg-transparent hover:bg-white/5"
                  disabled={loading}
                  onClick={() => handleClose(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    "h-8 px-4 rounded-2xl text-[10px] bg-white text-slate-900 hover:bg-slate-100",
                    loading && "opacity-70"
                  )}
                  disabled={loading}
                >
                  {loading ? "Creating…" : "Create Kompi link"}
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* KR & BIO modes — placeholders for now */}
        {mode === "kr" && (
          <div className="mt-4 text-sm text-slate-400">
            Kompi Codes™ creation will plug into your links shortly.
            For now, create a Kompi link and generate a KR code from
            its analytics page.
          </div>
        )}

        {mode === "bio" && (
          <div className="mt-4 text-sm text-slate-400">
            Link-in-bio builder is coming next. You&apos;ll be able to
            turn any workspace into a Kompi hub with themes, blocks,
            and link groups.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
export { CreateModal as CreateWorkspaceModal };
