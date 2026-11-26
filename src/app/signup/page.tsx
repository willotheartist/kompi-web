"use client";
import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthFrame, authInput, authButton } from "@/components/auth/auth-frame";
import { safeReturnPath } from "@/lib/urls";
function SignUpForm() {
  const params = useSearchParams(); const callback = safeReturnPath(params.get("callbackUrl"));
  const [form, setForm] = useState({ name: "", email: "", password: "", handle: params.get("handle") || "" });
  const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [sent, setSent] = useState(false);
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setError("");
    try { const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const data = await res.json(); if (!res.ok) throw new Error(data.error || "Could not create your account."); setSent(true); if (data.deliveryPending) setError("Your account was created, but email delivery failed. Request a new confirmation."); } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); } finally { setBusy(false); }
  }
  return <AuthFrame title={sent ? "Check your inbox." : "Make your first connection."} description={sent ? "Confirm your email, then sign in to your new Kompi workspace." : "Start free with a Card, 20 short links and five saved QR codes."}>
    {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {sent ? <div className="space-y-5"><p className="text-base">We sent a confirmation to <strong>{form.email}</strong>.</p><Link className={authButton} href={`/verify-email?email=${encodeURIComponent(form.email)}`}>Resend confirmation</Link><Link className="block text-center underline" href="/signin">Back to sign in</Link></div> : <>
    <form onSubmit={submit} className="space-y-4">{(["name", "email", "handle", "password"] as const).map(key => <label key={key} className="block text-sm font-medium">{{name:"Your name",email:"Email",handle:"Your Kompi handle",password:"Password"}[key]}<input className={authInput} type={key === "password" ? "password" : key === "email" ? "email" : "text"} autoComplete={key === "password" ? "new-password" : key === "handle" ? "username" : key} required={key !== "name"} minLength={key === "password" ? 8 : key === "handle" ? 3 : undefined} maxLength={key === "password" ? 128 : key === "handle" ? 30 : 254} value={form[key]} onChange={e => setForm({ ...form, [key]: key === "handle" ? e.target.value.toLowerCase().replace(/\s/g, "") : e.target.value })} />{key === "handle" && <span className="mt-2 block text-sm font-normal text-neutral-500">kompi.app/{form.handle || "your-name"}. Letters, numbers and hyphens.</span>}</label>)}<button className={`${authButton} mt-5`} disabled={busy}>{busy ? "Creating your account…" : "Create free account"}</button></form><div className="my-5 text-center text-sm text-neutral-500">or</div><button className="h-12 w-full rounded-full border border-neutral-300 text-base font-medium" onClick={() => void signIn("google", { callbackUrl: `/signin?handle=${encodeURIComponent(form.handle)}&callbackUrl=${encodeURIComponent(callback)}` })}>Continue with Google</button><p className="mt-6 text-sm">Already have an account? <Link className="underline" href="/signin">Sign in</Link></p></>}
  </AuthFrame>;
}
export default function SignUpPage() { return <Suspense><SignUpForm /></Suspense>; }
