"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

export function SessionControls() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <>
      <button
        disabled={busy}
        className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#E3E5E7] bg-white px-4 text-[14px] font-medium transition-colors hover:border-[#CDD1D7] hover:bg-[#F7F8F9] disabled:opacity-60"
        onClick={async () => {
          setBusy(true);
          try {
            const r = await fetch("/api/account/revoke-sessions", { method: "POST" });
            if (!r.ok) throw Error("Unable to sign out. Try again.");
            await signOut({ callbackUrl: "/signin" });
          } catch (e) {
            setError(e instanceof Error ? e.message : "Try again.");
            setBusy(false);
          }
        }}
      >
        {busy && <Loader2 size={15} className="animate-spin" />}
        {busy ? "Signing out…" : "Sign out on all devices"}
      </button>
      {error && <p role="alert" className="mt-2 text-sm text-[#9B3E35]">{error}</p>}
    </>
  );
}
