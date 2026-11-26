"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { refreshWorkspaceSummary } from "@/components/dashboard/shell/use-workspace-summary";
import { cn } from "@/lib/utils";

export function DeleteCardButton({ cardId, title, className }: { cardId: string; title: string; className?: string }) {
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false);
  const router = useRouter();
  async function remove() {
    setBusy(true);
    try {
      const response = await fetch(`/api/k-cards?cardId=${encodeURIComponent(cardId)}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not delete this Card.");
      setOpen(false);
      toast.success("Card deleted.");
      void refreshWorkspaceSummary();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button
        className={cn("inline-grid size-9 place-items-center rounded-[9px] text-[#80858C] transition-colors hover:bg-[#FBEFED] hover:text-[#9B3E35]", className)}
        aria-label={`Delete ${title}`}
        title="Delete Card"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={17} />
      </button>
      <Dialog open={open} onOpenChange={(value) => { if (!busy) setOpen(value); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {title}?</DialogTitle>
            <DialogDescription>
              This permanently removes the Card design and its public page. Links and printed QR codes pointing to that page will stop opening it. Received messages stay in your inbox.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button disabled={busy} className="min-h-11 rounded-[10px] border border-[#E3E5E7] px-4 text-sm font-medium hover:bg-[#F7F8F9]" onClick={() => setOpen(false)}>
              Keep Card
            </button>
            <button disabled={busy} className="min-h-11 rounded-[10px] bg-[#9B3E35] px-4 text-sm font-medium text-white hover:bg-[#86342C] disabled:opacity-50" onClick={() => void remove()}>
              {busy ? "Deleting…" : "Delete Card"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
