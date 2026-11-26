"use client";
import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { AuthFrame, authInput, authButton } from "@/components/auth/auth-frame";
import { safeReturnPath } from "@/lib/urls";
function SignInForm() {
  const params = useSearchParams(); const router = useRouter(); const { status } = useSession();
  const callback = safeReturnPath(params.get("callbackUrl"));
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  const [error, setError] = useState(params.get("error") ? "We could not sign you in. Please try again." : "");
  const [handle, setHandle] = useState(params.get("handle") || ""); const handled = useRef(false);
  async function finish() {
    const desired = handle || document.cookie.split("; ").find(c => c.startsWith("kompi_desired_handle="))?.split("=").slice(1).join("=");
    if (desired) {
      const res = await fetch("/api/handles/claim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ handle: decodeURIComponent(desired) }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Choose another handle to continue."); setBusy(false); return; }
      document.cookie = "kompi_desired_handle=; path=/; max-age=0; SameSite=Lax";
    }
    router.replace(callback); router.refresh();
  }
  useEffect(() => { if (status === "authenticated" && !handled.current) { handled.current = true; void finish().catch(() => setError("Could not finish signing in. Please try again.")); } }, [status]);
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setError("");
    try { const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) { setError(result.error.includes("EmailNotVerified") ? "Confirm your email first. You can request a new confirmation below." : "Check your email and password, or reset your password."); setBusy(false); return; }
      router.replace(callback); router.refresh();
    } catch { setError("Unable to sign in. Please try again."); setBusy(false); }
  }
  return <AuthFrame title="Welcome back." description="Your Cards, QR codes and links are right where you left them.">
    {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {status === "authenticated" ? <div><label className="text-sm font-medium">Your Kompi handle<input className={authInput} value={handle} onChange={e => setHandle(e.target.value)} /></label><button className={`${authButton} mt-5`} onClick={() => void finish()}>Continue</button></div> : <>
    <form onSubmit={submit} className="space-y-5"><label className="block text-sm font-medium">Email<input className={authInput} type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></label><label className="block text-sm font-medium">Password<input className={authInput} type="password" autoComplete="current-password" required maxLength={128} value={password} onChange={e => setPassword(e.target.value)} /></label><div className="text-right"><Link className="text-sm underline" href="/forgot-password">Forgot password?</Link></div><button className={authButton} disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form>
    <GoogleSignInButton disabled={busy} callbackUrl={`/signin?callbackUrl=${encodeURIComponent(callback)}${handle ? `&handle=${encodeURIComponent(handle)}` : ""}`}/>
    <p className="mt-6 text-sm">New here? <Link className="font-medium underline" href={`/signup?callbackUrl=${encodeURIComponent(callback)}`}>Create your Kompi</Link></p><p className="mt-3 text-sm"><Link className="text-neutral-600 underline" href="/verify-email">Resend email confirmation</Link></p></>}
  </AuthFrame>;
}
export default function SignInPage() { return <Suspense><SignInForm /></Suspense>; }
