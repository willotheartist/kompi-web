"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Copy, Download, MoreHorizontal, Pencil, QrCode, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  shortUrl: string;
  className?: string;
  onDeleted?: (id: string) => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const item = "flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left text-[14px] text-[#3C4045] transition-colors hover:bg-[#F3F4F5] hover:text-[#151619]";

export default function LinkActionsMenu({ id, shortUrl, className, onDeleted }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const qrUrl = `/api/links/${id}/qr`;

  useEffect(() => {
    if (!menuOpen) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setMenuOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [menuOpen]);

  async function handleCopy() {
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
      if (onDeleted) onDeleted(id);
      else window.location.reload();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="relative" ref={root}>
        <button
          type="button"
          className={cn("inline-grid size-9 place-items-center rounded-[9px] text-[#80858C] transition-colors hover:bg-[#F1F2F4] hover:text-[#151619]", menuOpen && "bg-[#F1F2F4] text-[#151619]", className)}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="More actions"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <MoreHorizontal size={18} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.16, ease: EASE }}
              style={{ transformOrigin: "top right" }}
              className="absolute right-0 top-[calc(100%+6px)] z-40 w-56 rounded-[12px] border border-[#E3E5E7] bg-white p-1.5"
            >
              <Link role="menuitem" href={`/links/${id}`} className={item} onClick={() => setMenuOpen(false)}>
                <BarChart3 size={16} className="text-[#80858C]" /> Details & analytics
              </Link>
              <Link role="menuitem" href={`/links/${id}/edit`} className={item} onClick={() => setMenuOpen(false)}>
                <Pencil size={16} className="text-[#80858C]" /> Edit link
              </Link>
              <button role="menuitem" type="button" className={item} onClick={async () => { await handleCopy(); setMenuOpen(false); }}>
                <Copy size={16} className="text-[#80858C]" /> Copy short URL
              </button>
              <button role="menuitem" type="button" className={item} onClick={() => { setQrOpen(true); setMenuOpen(false); }}>
                <QrCode size={16} className="text-[#80858C]" /> Quick QR code
              </button>
              <div className="my-1 h-px bg-[#EDEEF0]" />
              <button
                role="menuitem"
                type="button"
                className={cn(item, "text-[#9B3E35] hover:bg-[#FBEFED] hover:text-[#9B3E35]")}
                onClick={() => { setDeleteOpen(true); setMenuOpen(false); }}
                disabled={deleting}
              >
                <Trash2 size={16} /> Delete link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Quick QR code</DialogTitle>
            <DialogDescription>A plain code for this link. For styled, trackable codes use the QR studio.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="rounded-[14px] border border-[#E3E5E7] bg-white p-3">
              <img src={qrUrl} alt="QR code" width={192} height={192} className="size-48" />
            </div>
            <p className="break-all text-center text-[13px] text-[#80858C]">{shortUrl}</p>
            <div className="flex gap-2">
              <a href={qrUrl} download={`${id}.png`} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] bg-[#151619] px-4 text-[14px] font-medium text-white hover:bg-[#2B2D31]">
                <Download size={15} /> Download PNG
              </a>
              <Link href="/kr-codes" className="inline-flex min-h-10 items-center rounded-[10px] border border-[#E3E5E7] px-4 text-[14px] font-medium hover:bg-[#F7F8F9]">
                Open QR studio
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={(v) => !deleting && setDeleteOpen(v)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this link?</DialogTitle>
            <DialogDescription>This permanently removes the link and its analytics. Anyone opening it will see an error.</DialogDescription>
          </DialogHeader>
          <div className="mt-3 rounded-[10px] border border-[#E3E5E7] bg-[#FAFAFB] px-3 py-2 font-mono text-[12px] break-all text-[#3C4045]">{shortUrl}</div>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" className="min-h-10 rounded-[10px] border border-[#E3E5E7] px-4 text-[14px] font-medium hover:bg-[#F7F8F9]" onClick={() => setDeleteOpen(false)} disabled={deleting}>
              Keep link
            </button>
            <button type="button" className="min-h-10 rounded-[10px] bg-[#9B3E35] px-4 text-[14px] font-medium text-white hover:bg-[#86342C] disabled:opacity-50" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete link"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
