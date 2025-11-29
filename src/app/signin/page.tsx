"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SignInInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const error = searchParams.get("error");
  const [loading, setLoading] = useState<"google" | null>(null);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left: auth content, centered */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm text-center">
          {/* Logo – bigger, image only */}
          <div className="mb-10 flex justify-center">
            <Image
              src="/Kompi..svg"
              alt="Kompi"
              width={96}
              height={96}
              className="h-24 w-24"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Sign in
            </h1>
            <p className="text-sm text-muted-foreground">
              Access your links, analytics and workspaces.
            </p>
          </div>

          <Card className="mt-6 border bg-white/80 backdrop-blur rounded-2xl shadow-sm">
            <CardContent className="p-5 space-y-3">
              {error && (
                <p className="text-xs text-red-500 text-left">
                  {error === "OAuthAccountNotLinked"
                    ? "This email is already linked with a different sign-in method."
                    : "Sign-in failed. Please try again."}
                </p>
              )}

              {/* Google sign in with icon */}
              <Button
                className="w-full h-11 text-base flex items-center justify-center gap-2"
                onClick={() => {
                  setLoading("google");
                  signIn("google", { callbackUrl });
                }}
                disabled={loading !== null}
              >
                <GoogleIcon className="h-5 w-5" />
                {loading === "google" ? "Signing in…" : "Continue with Google"}
              </Button>

              {/* Forgot links – blue + bigger */}
              <div className="flex items-center justify-between text-sm pt-3">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot username?
                </a>
              </div>

              <p className="text-[10px] leading-relaxed text-muted-foreground text-left">
                By continuing, you agree to Kompi’s{" "}
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

          <p className="mt-4 text-sm text-muted-foreground">
            New to Kompi?{" "}
            <Link
              className="font-medium underline text-foreground"
              href="/signup"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right: kompiphoto fills 50% of the screen */}
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading sign-in…
        </div>
      }
    >
      <SignInInner />
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
