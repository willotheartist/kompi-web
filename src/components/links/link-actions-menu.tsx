"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  MoreVertical,
  FileText,
  Copy,
  QrCode,
  Trash2,
} from "lucide-react";

type Props = {
  id: string;
  shortUrl: string; // full short URL
  className?: string;
};

export default function LinkActionsMenu({ id, shortUrl, className }: Props) {
  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const qrUrl = `/api/links/${id}/qr`;

  async function handleCopy() {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch {
      // ignore
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this link? This will also remove its analytics.")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Failed to delete link");
        return;
      }
      window.location.reload();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="relative">
        {/* Trigger */}
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10",
            "bg-slate-950/70 text-slate-300 shadow-[0_10px_30px_rgba(15,23,42,0.8)]",
            "hover:border-sky-500/70 hover:bg-slate-900 hover:text-white",
            className
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="More actions"
        >
          <MoreVertical className="h-4 w-4 text-white/80" />
        </Button>

        {/* Dropdown */}
        {open && (
          <div
            className={cn(
              "absolute right-0 z-40 mt-2 w-60 rounded-2xl border border-white/10",
              "bg-slate-950/95 text-slate-100 shadow-[0_18px_48px_rgba(15,23,42,0.95)]"
            )}
          >
            <ul className="py-1 text-sm">
              <li>
                <Link
                  href={`/links/${id}`}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800/80"
                  onClick={() => setOpen(false)}
                >
                  <FileText className="h-4 w-4" />
                  <span>View link details</span>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-800/80"
                  onClick={async () => {
                    await handleCopy();
                    setOpen(false);
                  }}
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy short URL</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-800/80"
                  onClick={() => {
                    setQrOpen(true);
                    setOpen(false);
                  }}
                >
                  <QrCode className="h-4 w-4" />
                  <span>Show QR code</span>
                </button>
              </li>

              <li className="mt-1 border-t border-white/10 pt-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-red-400 hover:bg-red-950/40 hover:text-red-300"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{deleting ? "Deleting…" : "Delete link"}</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* QR modal */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Download QR code</DialogTitle>
            <DialogDescription>
              Perfect for cards, posters, menus, and packaging.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              <Image
                src={qrUrl}
                alt="QR code"
                width={192}
                height={192}
                className="h-48 w-48"
              />
            </div>
            <div className="flex flex-col items-center gap-1 text-xs text-neutral-500">
              <span className="break-all">{shortUrl}</span>
              <a
                href={qrUrl}
                download={`${id}.png`}
                className="mt-1 inline-flex items-center rounded-full border border-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-900"
              >
                Download PNG
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
