"use client";
import { useState } from "react";
import { toast } from "sonner";
import { planName } from "@/lib/plan-limits";
export function UpgradeButton({ plan = "CREATOR", disabled = false }: { plan?: "STARTER" | "CREATOR" | "BUSINESS"; disabled?: boolean }) {
 const [loading, setLoading] = useState(false);
 return <button className="min-h-11 w-full rounded-xl bg-[#181818] px-5 py-3 text-sm font-medium text-white disabled:opacity-50" disabled={loading || disabled} onClick={async () => {
 setLoading(true); try { const res = await fetch("/api/billing/create-checkout-session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan }) }); const data = await res.json(); if (!res.ok || !data.url) throw new Error(data.error || "Could not open checkout."); window.location.assign(data.url); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not open checkout."); setLoading(false); }
 }}>{loading ? "Opening checkout…" : disabled ? "Checkout coming soon" : `Choose ${planName(plan)}`}</button>;
}
