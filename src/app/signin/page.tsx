"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return toast.error("Enter your email");
    setLoading(true);
    const res = await signIn("credentials", {
      email: value,
      redirect: true,
      callbackUrl,
    });
    if (!res || res.error) {
      setLoading(false);
      toast.error("Sign-in failed");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-xs">
            K
          </div>
          <div>
            <div className="text-sm font-semibold">Kompi Links</div>
            <div className="text-[10px] text-neutral-500">
              Minimal link hub for pros.
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-neutral-900">
            Sign in to continue
          </h1>
          <p className="text-xs text-neutral-500">
            Dev: enter any email, we create your account automatically.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-neutral-600">Work email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing you in..." : "Continue"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
