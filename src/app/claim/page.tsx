// src/app/claim/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { ClaimHandleInline } from "@/components/claim/claim-handle-inline";

export const metadata: Metadata = {
  title: "Claim your handle | Kompi",
  description: "Claim your Kompi handle and set up your profile in a few clicks.",
  robots: { index: true, follow: true },
};

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function pickParam(v: string | string[] | undefined, fallback: string): string {
  if (!v) return fallback;
  return Array.isArray(v) ? v[0] ?? fallback : v;
}

export default function ClaimPage({ searchParams }: Props) {
  const handle = pickParam(searchParams?.handle, "");
  const callbackUrl = pickParam(searchParams?.callbackUrl, "/dashboard");

  const signinHref =
    `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}` +
    (handle ? `&handle=${encodeURIComponent(handle)}` : "");

  const signupHref =
    `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` +
    (handle ? `&handle=${encodeURIComponent(handle)}` : "");

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Top helper strip */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-neutral-700">
                <span className="font-semibold text-neutral-900">Claim</span>{" "}
                your handle to start your Kompi.
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Link
                  href={signinHref}
                  className="text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                >
                  Already have an account?
                </Link>

                <Link
                  href={signupHref}
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Claim UI */}
        <ClaimHandleInline fullHeight className="min-h-[calc(100vh-72px)]" />

        {/* Small note */}
        <section className="border-t border-neutral-200 bg-white py-10">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
            <p className="text-xs text-neutral-500">
              Tip: you can pass a handle and destination like{" "}
              <span className="font-mono text-neutral-700">
                /claim?handle=yourname&amp;callbackUrl=/dashboard
              </span>
              .
            </p>
          </div>
        </section>
      </main>

      <FooterCTA />
    </>
  );
}
