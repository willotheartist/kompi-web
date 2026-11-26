"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function DowngradeButton() {
 const [pending, setPending] = useState(false); const router = useRouter();
 return <button disabled={pending} className="min-h-11 rounded-xl border px-4 py-2 text-sm disabled:opacity-50" onClick={async () => {
 if (!window.confirm("Cancel renewal? You keep paid access until the current billing period ends. Existing Cards, QR codes and links will stay available.")) return;
 setPending(true); try { const res = await fetch("/api/billing/downgrade", { method: "POST" }); const data = await res.json(); if (!res.ok) throw new Error(data.error); toast.success("Renewal cancelled. Your paid access continues until the end of this billing period."); router.refresh(); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not cancel renewal."); } finally { setPending(false); }
 }}>{pending ? "Cancelling…" : "Cancel renewal"}</button>;
}
