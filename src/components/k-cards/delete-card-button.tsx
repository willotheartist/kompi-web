"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
export function DeleteCardButton({ cardId, title }: { cardId: string; title: string }) {
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false); const router = useRouter();
  async function remove() { setBusy(true); try { const response = await fetch(`/api/k-cards?cardId=${encodeURIComponent(cardId)}`, { method: "DELETE" }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not delete this Card."); setOpen(false); toast.success("Card deleted."); router.refresh(); } catch (error) { toast.error(error instanceof Error ? error.message : "Please try again."); } finally { setBusy(false); } }
  return <><button className="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-500 hover:bg-red-50 hover:text-red-700" aria-label={`Delete ${title}`} onClick={()=>setOpen(true)}><Trash2 size={18}/></button><Dialog open={open} onOpenChange={value=>{if(!busy)setOpen(value);}}><DialogContent><DialogHeader><DialogTitle>Delete {title}?</DialogTitle><DialogDescription>This permanently removes the Card design and its public page. Links and printed QR codes pointing to that page will stop opening it. Received messages stay in your inbox.</DialogDescription></DialogHeader><div className="mt-5 flex flex-wrap justify-end gap-3"><button disabled={busy} className="min-h-11 rounded-full border px-5 text-sm" onClick={()=>setOpen(false)}>Keep Card</button><button disabled={busy} className="min-h-11 rounded-full bg-red-700 px-5 text-sm text-white disabled:opacity-50" onClick={()=>void remove()}>{busy ? "Deleting…" : "Delete Card"}</button></div></DialogContent></Dialog></>;
}
