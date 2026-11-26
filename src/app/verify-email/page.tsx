"use client";
import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthFrame, authInput, authButton } from "@/components/auth/auth-frame";
function VerifyForm() { const params = useSearchParams(); const [email, setEmail] = useState(params.get("email") || ""); const token = params.get("token"); const [message, setMessage] = useState(""); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(""); try { const res = await fetch("/api/auth/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, ...(token ? { token } : {}) }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error || "Please try again."); setMessage(token ? "Your email is confirmed. You can now sign in." : "If your account needs confirmation, a new link is on its way."); setDone(!!token); } catch(e) { setMessage(e instanceof Error ? e.message : "Please try again."); } finally { setBusy(false); } }
  return <AuthFrame title="Confirm your email." description="One quick check to keep your account yours."><form onSubmit={submit} className="space-y-5"><label className="block text-sm font-medium">Email<input className={authInput} type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></label>{message && <p role="status" className="text-base">{message}</p>}{!done && <button className={authButton} disabled={busy}>{busy ? "Please wait…" : token ? "Confirm email" : "Send confirmation link"}</button>}<Link className="block text-center underline" href="/signin">Sign in</Link></form></AuthFrame>;
}
export default function VerifyPage() { return <Suspense><VerifyForm /></Suspense>; }
