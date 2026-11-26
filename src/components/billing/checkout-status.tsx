"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export function CheckoutStatus({ sessionId }: { sessionId?: string }) {
 const router = useRouter(); const [message, setMessage] = useState("Confirming your subscription…");
 useEffect(() => { if (!sessionId) return; let cancelled = false;
 fetch("/api/billing/reconcile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId }) }).then(async res => { const data = await res.json(); if (!res.ok) throw new Error(data.error || "Unable to confirm checkout."); if (cancelled) return; setMessage(data.pending ? "Payment is still processing. Your plan updates after Stripe confirms it." : "Your subscription is confirmed."); if (data.ok) router.refresh(); }).catch(error => { if (!cancelled) setMessage(error.message); }); return () => { cancelled = true; }; }, [sessionId, router]);
 return sessionId ? <p role="status" className="rounded-xl bg-[#fff0fc] p-4 text-sm">{message}</p> : null;
}
