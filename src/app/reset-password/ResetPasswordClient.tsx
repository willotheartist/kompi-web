// src/app/reset-password/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") ?? "";
  const emailFromUrl = searchParams.get("email") ?? "";

  const [email] = useState(emailFromUrl);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const disabled = !token || !email;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Could not reset password.");
        setLoading(false);
        return;
      }

      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center">
            <Image
              src="/Kompi..svg"
              alt="Kompi"
              width={96}
              height={96}
              className="h-20 w-20"
              priority
            />
          </div>

          <div className="space-y-1 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Choose a new password
            </h1>
          </div>

          <Card className="mt-6 border bg-white/80 backdrop-blur rounded-2xl shadow-sm">
            <CardContent className="p-5 space-y-4">
              {!token || !email ? (
                <p className="text-sm text-left text-muted-foreground">
                  This reset link is missing some information or has expired.
                  Please request a new one from the{" "}
                  <Link
                    href="/forgot-password"
                    className="underline font-medium"
                  >
                    Forgot password
                  </Link>{" "}
                  page.
                </p>
              ) : done ? (
                <div className="space-y-3 text-left text-sm text-muted-foreground">
                  <p>Your password has been updated.</p>
                  <Button
                    className="h-9 rounded-full"
                    onClick={() => router.push("/signin")}
                  >
                    Back to sign in
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={onSubmit}>
                  {error && (
                    <p className="text-xs text-red-500 text-left">{error}</p>
                  )}

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-muted-foreground">
                      New password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-muted-foreground">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 text-base rounded-full"
                  >
                    {loading ? "Updating password…" : "Update password"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative hidden md:block">
        <Image
          src="/kompisignin.png"
          alt="Kompi visual"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
