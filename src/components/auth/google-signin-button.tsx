"use client";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
export function GoogleSignInButton({ callbackUrl, disabled = false }: { callbackUrl: string; disabled?: boolean }) {
  const [available, setAvailable] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState("");
  useEffect(() => { let active = true; getProviders().then(providers => { if (active) setAvailable(Boolean(providers?.google)); }).catch(() => {}); return () => { active = false; }; }, []);
  if (!available) return null;
  return <><div className="my-5 text-center text-sm text-neutral-500">or</div><button className="h-12 w-full rounded-full border border-neutral-300 text-base font-medium disabled:opacity-50" disabled={disabled || busy} onClick={async () => { setBusy(true); setError(""); try { await signIn("google", { callbackUrl }); } catch { setError("Google sign-in could not open. Please try again."); setBusy(false); } }}>Continue with Google</button>{error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}</>;
}
