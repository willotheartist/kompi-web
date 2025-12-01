// src/app/forgot-password/page.tsx
"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
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
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter the email you use for Kompi and we’ll send a reset link.
            </p>
          </div>

          <Card className="mt-6 border bg-white/80 backdrop-blur rounded-2xl shadow-sm">
            <CardContent className="p-5 space-y-4">
              {error && (
                <p className="text-xs text-red-500 text-left">{error}</p>
              )}

              {sent ? (
                <p className="text-sm text-left text-muted-foreground">
                  If an account exists for <span className="font-medium">{email}</span>, you’ll
                  get an email with a link to reset your password in a few
                  minutes.
                </p>
              ) : (
                <form className="space-y-4" onSubmit={onSubmit}>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 text-base rounded-full"
                  >
                    {loading ? "Sending link…" : "Send reset link"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            Remember your password?{" "}
            <Link className="font-medium underline text-foreground" href="/signin">
              Back to sign in
            </Link>
          </p>
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
