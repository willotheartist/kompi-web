"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
export function SessionControls(){const [busy,setBusy]=useState(false);const [error,setError]=useState("");return <><button disabled={busy} className="min-h-11 rounded-full border px-5 py-2 text-sm" onClick={async()=>{setBusy(true);try{const r=await fetch("/api/account/revoke-sessions",{method:"POST"});if(!r.ok)throw Error("Unable to sign out. Try again.");await signOut({callbackUrl:"/signin"});}catch(e){setError(e instanceof Error?e.message:"Try again.");setBusy(false);}}}>{busy?"Signing out…":"Sign out on all devices"}</button>{error&&<p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</>;}
