"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
export function CreateCardButton({ workspaceId }: { workspaceId?: string }) { const [busy, setBusy] = useState(false); const router = useRouter(); return <button disabled={busy} className="flex min-h-12 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white disabled:opacity-50" onClick={async () => { setBusy(true); try { const res = await fetch("/api/k-cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ workspaceId }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error || "Could not create your Card."); router.push(`/k-cards?cardId=${data.kcard.id}`); } catch(e) { toast.error(e instanceof Error ? e.message : "Please try again."); setBusy(false); } }}><Plus size={18}/>{busy ? "Creating…" : "Create Card"}</button>; }
