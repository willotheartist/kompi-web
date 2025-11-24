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
import { FileText, Copy, QrCode, Trash2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id: string;
  shortUrl: string; // full short URL
  className?: string;
};

export default function LinkActionsMenu({ id, shortUrl, className }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const qrUrl = `/api/links/${id}/qr`;

  async function handleCopy() {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short link copied", { description: shortUrl });
    } catch {
      toast.error("Could not copy link");
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        toast.error(msg || "Failed to delete link");
        return;
      }

      toast.success("Link deleted");
      setDeleteOpen(false);
      window.location.reload();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[color:var(--color-text)]",
            "border-[color:var(--color-border)] bg-[color:var(--color-surface)]",
            "hover:bg-[color:var(--color-bg)] transition-colors",
            className
          )}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="More actions"
        >
          <MoreHorizontal className="h-4 w-4 text-[color:var(--color-subtle)]" />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div
            className={cn(
              "absolute right-0 z-40 mt-2 w-60 rounded-2xl border",
              "border-[color:var(--color-border)] bg-[color:var(--color-surface)]",
              "shadow-md"
            )}
          >
            <ul className="py-1 text-sm text-[color:var(--color-text)]">
              <li>
                <Link
                  href={`/links/${id}`}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-[color:var(--color-bg)]"
                  onClick={() => setMenuOpen(false)}
                >
                  <FileText className="h-4 w-4 text-[color:var(--color-subtle)]" />
                  <span>View link details</span>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[color:var(--color-bg)]"
                  onClick={async () => {
                    await handleCopy();
                    setMenuOpen(false);
                  }}
                >
                  <Copy className="h-4 w-4 text-[color:var(--color-subtle)]" />
                  <span>Copy short URL</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[color:var(--color-bg)]"
                  onClick={() => {
                    setQrOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  <QrCode className="h-4 w-4 text-[color:var(--color-subtle)]" />
                  <span>Show QR code</span>
                </button>
              </li>

              <li className="mt-1 border-t border-[color:var(--color-border)] pt-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-red-500 hover:bg-red-50"
                  onClick={() => {
                    setDeleteOpen(true);
                    setMenuOpen(false);
                  }}
                  disabled={deleting}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete link</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* QR modal */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <DialogHeader>
            <DialogTitle className="text-[color:var(--color-text)]">
              Download QR code
            </DialogTitle>
            <DialogDescription className="text-sm text-[color:var(--color-subtle)]">
              Perfect for cards, posters, menus, and packaging.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-3 shadow-sm">
              <Image
                src={qrUrl}
                alt="QR code"
                width={192}
                height={192}
                className="h-48 w-48"
              />
            </div>
            <div className="flex flex-col items-center gap-1 text-xs text-[color:var(--color-subtle)]">
              <span className="break-all">{shortUrl}</span>
              <a
                href={qrUrl}
                download={`${id}.png`}
                className="mt-1 inline-flex items-center rounded-full border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text)]"
              >
                Download PNG
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-[color:var(--color-text)]">
              Delete this link?
            </DialogTitle>
            <DialogDescription className="text-sm text-[color:var(--color-subtle)]">
              This will permanently remove the link and its analytics. This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2 text-xs text-[color:var(--color-subtle)]">
            <span className="font-mono break-all text-[color:var(--color-text)]">
              {shortUrl}
            </span>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-8 rounded-full border-[color:var(--color-border)] bg-transparent px-3 text-sm text-[color:var(--color-text)] hover:bg-[color:var(--color-bg)]"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-8 rounded-full bg-red-500 px-4 text-sm font-semibold text-white hover:bg-red-600"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
