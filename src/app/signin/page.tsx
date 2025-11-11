"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import whatever you use for sign-in (NextAuth, etc.)
// import { signIn } from "next-auth/react";

function SignInInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md space-y-6 rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            Sign in to Kompi
          </h1>
          <p className="text-sm text-muted-foreground">
            Access your links, analytics, and Kompi workspace.
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-500">
            {error === "OAuthAccountNotLinked"
              ? "This email is already linked with a different sign-in method."
              : "Sign-in failed. Please try again."}
          </p>
        )}

        {/* Example sign-in buttons — wire to your auth as needed */}
        <div className="space-y-3">
          {/* <Button
            className="w-full"
            onClick={() => signIn("google", { callbackUrl })}
          >
            Continue with Google
          </Button> */}

          {/* Dev / email login stub */}
          <Button
            className="w-full"
            variant="outline"
            // onClick={() => signIn("credentials", { callbackUrl })}
          >
            Continue
          </Button>
        </div>

        <p className="text-[10px] leading-relaxed text-muted-foreground">
          By continuing, you agree to Kompi’s Terms and Privacy Policy.
        </p>
      </Card>
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
