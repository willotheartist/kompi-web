// src/app/signup/page.tsx
"use client";

import { Suspense, useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function SignupInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const prefilledHandle = searchParams.get("handle") ?? "";
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState(prefilledHandle);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [loading, setLoading] = useState<"google" | "email" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const disabled = loading !== null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading("email");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          handle,
          name,
          marketingOptIn,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Could not create account");
        setLoading(null);
        return;
      }

      // Auto-sign in with credentials
      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (signInResult?.error) {
        // account created but login failed – just send them to sign-in
        router.push("/signin");
        return;
      }

      router.push(signInResult?.url ?? callbackUrl);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left: form */}
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
              Create your Kompi
            </h1>
            <p className="text-sm text-muted-foreground">
              Claim your handle and set up your Kompi in a few clicks.
            </p>
          </div>

          <Card className="mt-6 border bg-white/80 backdrop-blur rounded-2xl shadow-sm">
            <CardContent className="p-5 space-y-4">
              {error && (
                <p className="text-xs text-red-500 text-left">{error}</p>
              )}

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

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    At least 8 characters.
                  </p>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground">
                    Kompi handle
                  </label>
                  <div className="flex items-stretch gap-2">
                    <div className="inline-flex items-center rounded-xl border bg-muted px-3 text-sm text-muted-foreground">
                      kompi.app/
                    </div>
                    <input
                      type="text"
                      required
                      className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                      value={handle}
                      onChange={(e) =>
                        setHandle(e.target.value.replace(/\s+/g, "").toLowerCase())
                      }
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    This will be your public profile link and workspace slug.
                  </p>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Marketing opt-in */}
                <label className="flex items-start gap-2 text-xs text-left cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="mt-[2px] h-4 w-4 rounded border"
                    checked={marketingOptIn}
                    onChange={(e) => setMarketingOptIn(e.target.checked)}
                  />
                  <span>
                    I agree to receive offers, product news and updates from
                    Kompi. You can unsubscribe anytime.
                  </span>
                </label>

                <Button
                  type="submit"
                  disabled={disabled}
                  className="w-full h-11 text-base rounded-full"
                >
                  {loading === "email" ? "Creating your Kompi…" : "Create account"}
                </Button>
              </form>

              <div className="relative flex items-center justify-center py-2 text-[11px] text-muted-foreground">
                <span className="px-2 bg-white relative z-10">or</span>
                <div className="absolute inset-x-0 h-px bg-muted" />
              </div>

              <Button
                variant="outline"
                className="w-full h-11 text-base flex items-center justify-center gap-2"
                onClick={() => {
                  setLoading("google");
                  signIn("google", { callbackUrl });
                }}
                disabled={disabled}
              >
                <GoogleIcon className="h-5 w-5" />
                {loading === "google" ? "Connecting…" : "Continue with Google"}
              </Button>

              <p className="text-[10px] leading-relaxed text-muted-foreground text-left pt-1">
                By clicking <span className="font-semibold">Create account</span>, you agree
                to Kompi’s{" "}
                <a className="underline" href="#">
                  Terms
                </a>{" "}
                and{" "}
                <a className="underline" href="#">
                  Privacy Policy
                </a>
                .
              </p>
            </CardContent>
          </Card>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link className="font-medium underline text-foreground" href="/signin">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: image */}
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

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading sign-up…
        </div>
      }
    >
      <SignupInner />
    </Suspense>
  );
}

type GoogleIconProps = {
  className?: string;
};

function GoogleIcon({ className = "" }: GoogleIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M21.35 11.1H12v2.98h5.27c-.23 1.38-1.6 4.06-5.27 4.06-3.18 0-5.78-2.62-5.78-5.84S8.82 6.46 12 6.46c1.81 0 3.02.77 3.71 1.43l2.53-2.45C16.86 4.1 15.02 3 12.17 3 6.99 3 2.8 7.15 2.8 12.31S6.99 21.6 12.17 21.6c6.25 0 8.69-4.36 8.69-8.16 0-.55-.06-1.09-.17-1.64z"
      />
      <path
        fill="#EA4335"
        d="M3.65 7.35l2.45 1.8c1.13-2.22 3.45-3.72 6.07-3.72 1.81 0 3.02.77 3.71 1.43l2.53-2.45C16.86 4.1 15.02 3 12.17 3 8.87 3 6.04 4.86 4.65 7.35z"
      />
      <path
        fill="#34A853"
        d="M12.17 21.6c2.91 0 5.35-.96 7.12-2.62l-2.61-2.2c-1.01.71-2.3 1.2-4.51 1.2-2.75 0-5.09-1.86-5.91-4.36H3.6v2.73c1.38 2.73 4.26 5.25 8.57 5.25z"
      />
      <path
        fill="#FBBC05"
        d="M3.6 12.31c0-.65.11-1.27.29-1.85H3.6V7.73H3.65C5 5 7.89 3 12.17 3c2.84 0 4.68 1.1 5.9 2.13l-2.53 2.45c-.69-.66-1.9-1.43-3.71-1.43-2.62 0-4.94 1.5-6.07 3.72l-2.45-1.8c-.42.83-.67 1.77-.67 2.77 0 .64.11 1.26.29 1.84z"
      />
    </svg>
  );
}
