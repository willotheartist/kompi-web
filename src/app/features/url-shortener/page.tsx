"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SolutionsToolsStrip } from "@/components/solutions/SolutionsToolsStrip";
import { KompiAudienceStrip } from "@/components/solutions/KompiAudienceStrip";
import SellCards from "@/components/solutions/sellcards";
import { instrumentSerif } from "@/lib/fonts";
import { KCardPromoHero } from "@/components/solutions/KCardPromoHero1";
import { KCardPromoHero2 } from "@/components/solutions/KCardPromoHero2";
import { KCardPromoHero3 } from "@/components/solutions/KCardPromoHero3";
import Faqs from "@/components/faqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FooterCTA } from "@/components/footer-cta";
import {
  Link2,
  QrCode,
  LayoutTemplate,
  BarChart3,
  Sparkles,
  ArrowRight,
  Quote,
  Globe2,
  Users,
  Store,
  Smartphone,
} from "lucide-react";

type ShortenState = {
  originalUrl: string;
  title: string;
  shortUrl: string;
  isLoading: boolean;
  error: string | null;
};

function UrlShortenerTool({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [state, setState] = useState<ShortenState>({
    originalUrl: "",
    title: "",
    shortUrl: "",
    isLoading: false,
    error: null,
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedUrl = state.originalUrl.trim();

    if (!trimmedUrl) {
      setState((s) => ({
        ...s,
        error: "Please paste a valid URL to shorten.",
      }));
      return;
    }

    // If not authenticated, send them to signup instead of creating the link
    if (!isAuthenticated) {
      router.push(
        `/signup?from=url-shortener&url=${encodeURIComponent(trimmedUrl)}`
      );
      return;
    }

    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: trimmedUrl,
          title: state.title.trim() || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      let shortUrl = data.shortUrl || "";
      if (!shortUrl && data.code) {
        if (typeof window !== "undefined") {
          const origin = window.location.origin;
          shortUrl = origin + "/r/" + data.code;
        } else {
          shortUrl = "/r/" + data.code;
        }
      }

      if (!shortUrl) {
        throw new Error("Short URL not returned from API");
      }

      setState((s) => ({
        ...s,
        shortUrl,
        isLoading: false,
        error: null,
      }));
    } catch (err) {
      console.error(err);
      setState((s) => ({
        ...s,
        isLoading: false,
        error:
          "Something went wrong while shortening this link. Please try again.",
      }));
    }
  };

  const handleCopy = async () => {
    if (!state.shortUrl) return;
    try {
      await navigator.clipboard.writeText(state.shortUrl);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const showResult = Boolean(state.shortUrl);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Top row: icon + headline */}
        <div className="mb-6 flex items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
            <Link2 className="h-5 w-5" />
          </div>
          <p className="text-lg font-medium text-[var(--color-text)] sm:text-xl">
            Paste your long link here
          </p>
        </div>

        {/* Single URL field with underline style */}
        <Input
          type="url"
          placeholder="https://www.example.com/long-URL"
          value={state.originalUrl}
          onChange={(e) =>
            setState((s) => ({ ...s, originalUrl: e.target.value }))
          }
          className="h-14 w-full rounded-none border-0 border-b border-[var(--color-border-subtle)] bg-transparent px-0 text-sm sm:text-base"
        />

        {state.error && (
          <p className="text-xs text-red-500 text-left">{state.error}</p>
        )}

        <div className="mt-6 flex justify-center">
          <Button
            type="submit"
            disabled={state.isLoading}
            className="h-12 rounded-full px-8 text-sm font-semibold sm:h-14 sm:px-10 sm:text-base"
          >
            {state.isLoading ? "Shortening..." : "Get your Kompi short link Free"}
          </Button>
        </div>
      </form>

      {showResult && (
        <div className="space-y-2 text-left text-xs">
          <p className="text-[11px] font-medium text-[var(--color-text)]">
            Your short Kompi link
          </p>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={state.shortUrl}
              className="h-9 flex-1 truncate text-xs"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="h-9 whitespace-nowrap rounded-full px-3 text-[11px]"
            >
              Copy
            </Button>
          </div>

          <div className="space-y-2 pt-1">
            {isAuthenticated ? (
              <>
                <p className="font-medium text-[var(--color-text)]">
                  This link now lives in your Kompi workspace.
                </p>
                <p className="text-[11px] text-[var(--color-subtle)]">
                  Open your dashboard to see clicks, referrers and drop this
                  link into K-Cards or QR menus.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="h-8 rounded-full px-3 text-[11px]"
                >
                  <Link href="/dashboard">
                    Open dashboard
                    <ArrowRight className="ml-1.5 h-3 w-3" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <p className="font-medium text-[var(--color-text)]">
                  Keep this link & unlock analytics with a free account.
                </p>
                <p className="text-[11px] text-[var(--color-subtle)]">
                  Create a Kompi account to save this link, see clicks and plug
                  it into your K-Card and QR menus.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    asChild
                    className="h-8 rounded-full px-3 text-[11px]"
                  >
                    <Link href="/signup">Create free account</Link>
                  </Button>
                  <Link
                    href="/signin"
                    className="text-[11px] text-[var(--color-subtle)] underline-offset-2 hover:underline"
                  >
                    Already have one? Sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UrlShortenerPage() {
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session);

  return (
    <div className="w-full bg-[var(--color-bg)] pt-20 sm:pt-24 overflow-x-hidden">
      <main className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
        {/* HERO — matches marketing mock */}
        <section className="space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.6rem]">
              Short links that plug into{" "}
              <span
                className={`${instrumentSerif.className} italic`}
              >
                everything
              </span>{" "}
              you do.
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-[var(--color-subtle)] sm:text-base">
              Turn long URLs into clean Kompi links you can drop into bios, QR
              menus and campaigns. Keep using it free.
            </p>
          </div>

          {/* Big hero card */}
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[40px] bg-white shadow-[0_22px_70px_rgba(0,0,0,0.10)]">
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <UrlShortenerTool isAuthenticated={isAuthenticated} />
            </div>

            {/* Lavender benefits band */}
            <div className="border-t border-black/5 bg-[#d7d1ff] px-6 py-6 text-xs text-[var(--color-text)] sm:px-10 sm:py-8">
              <p className="mb-4 text-center text-sm font-medium sm:text-base">
                Sign up to Kompi for Free and get
              </p>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8090ff]" />
                  <span>10 short links / mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8090ff]" />
                  <span>Unlimited Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8090ff]" />
                  <span>5 QR codes / mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8090ff]" />
                  <span>Unlimited link clicks &amp; scans</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FULL-BLEED MARKETING STRIPS */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8 space-y-16">
          <KompiAudienceStrip />
          <KCardPromoHero />
          <KCardPromoHero2 />
          <KCardPromoHero3 />
        </div>

        {/* PLATFORM SECTION */}
        <section className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-subtle)]">
              The Kompi Connections Platform
            </p>
            <h2 className="text-xl font-semibold text-[var(--color-text)] sm:text-2xl">
              All the pieces you need to connect clicks, scans and customers.
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[var(--color-subtle)]">
              Start with a single short link. Grow into QR menus, K-Cards and
              workspaces that keep your online presence under one roof.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-bg-subtle)]">
                <Link2 className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text)]">
                URL Shortener
              </p>
              <p className="text-xs text-[var(--color-subtle)]">
                Create clean, memorable Kompi links that feel on-brand for your
                studio, café or creator business.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-bg-subtle)]">
                <QrCode className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text)]">
                QR Codes
              </p>
              <p className="text-xs text-[var(--color-subtle)]">
                Link your short URLs to Kompi QR menus and stickers for tables,
                flyers and product packaging.
              </p>
              <Link
                href="/qr-code-generator"
                className="text-[11px] font-medium text-[var(--color-text)] underline-offset-2 hover:underline"
              >
                Try the QR generator
              </Link>
            </div>
            <div className="space-y-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-bg-subtle)]">
                <LayoutTemplate className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text)]">
                K-Cards &amp; link hubs
              </p>
              <p className="text-xs text-[var(--color-subtle)]">
                Turn all your short links into a single K-Card with pro themes,
                contact forms and subscriber tools.
              </p>
              <Link
                href="/k-cards"
                className="text-[11px] font-medium text-[var(--color-text)] underline-offset-2 hover:underline"
              >
                Design your K-Card
              </Link>
            </div>
          </div>
        </section>

        <SellCards />

        {/* STATS BAND */}
        <section className="rounded-3xl bg-[var(--color-bg-subtle)] px-5 py-8 sm:px-7 sm:py-9">
          <div className="grid gap-6 text-center text-xs text-[var(--color-subtle)] sm:grid-cols-4">
            <div className="space-y-2">
              <BarChart3 className="mx-auto h-5 w-5 text-[var(--color-text)]" />
              <p className="text-base font-semibold text-[var(--color-text)]">
                Fast setup
              </p>
              <p>Create your first Kompi link in under a minute.</p>
            </div>
            <div className="space-y-2">
              <Globe2 className="mx-auto h-5 w-5 text-[var(--color-text)]" />
              <p className="text-base font-semibold text-[var(--color-text)]">
                All-in-one
              </p>
              <p>Short links, QR menus and K-Cards in one workspace.</p>
            </div>
            <div className="space-y-2">
              <Users className="mx-auto h-5 w-5 text-[var(--color-text)]" />
              <p className="text-base font-semibold text-[var(--color-text)]">
                Creator-friendly
              </p>
              <p>Built for solo creators, small teams and local spots.</p>
            </div>
            <div className="space-y-2">
              <Sparkles className="mx-auto h-5 w-5 text-[var(--color-text)]" />
              <p className="text-base font-semibold text-[var(--color-text)]">
                Start free
              </p>
              <p>Upgrade only when you need more power and seats.</p>
            </div>
          </div>
        </section>

        {/* SIMPLE TESTIMONIAL */}
        <section className="space-y-5">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-subtle)]">
            What creators and teams love about Kompi
          </p>
          <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-subtle)]">
                <Quote className="h-5 w-5 text-[var(--color-subtle)]" />
              </div>
              <div className="space-y-3 text-sm text-[var(--color-subtle)]">
                <p className="text-[13px] text-[var(--color-text)]">
                  &quot;We wanted something simple enough for our staff to use,
                  but flexible enough to handle QR menus and campaign links.
                  Kompi did both without feeling like another enterprise tool.&quot;
                </p>
                <p className="text-[11px] font-medium text-[var(--color-text)]">
                  — A café &amp; creative studio, using Kompi for menus and link
                  hubs
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SolutionsToolsStrip />
        </section>
        <Faqs />

        {/* USE CASES */}
        <section className="space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">
              See where short links fit in.
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[var(--color-subtle)]">
              From creators to cafés, Kompi links give you one simple way to send
              people to the right place, every time.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-bg-subtle)]">
                <Smartphone className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
                Creators
              </p>
              <p className="text-sm font-medium text-[var(--color-text)]">
                Keep your bios clean
              </p>
              <p className="text-xs text-[var(--color-subtle)]">
                Use Kompi links in TikTok, Instagram and YouTube to send people
                straight to drops, collabs or your K-Card.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-bg-subtle)]">
                <Store className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
                Cafés &amp; local spots
              </p>
              <p className="text-sm font-medium text-[var(--color-text)]">
                QR menus that feel on-brand
              </p>
              <p className="text-xs text-[var(--color-subtle)]">
                Pair short links with QR menus on tables, flyers and loyalty
                cards &mdash; no extra tech team needed.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-bg-subtle)]">
                <Users className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
                Studios &amp; teams
              </p>
              <p className="text-sm font-medium text-[var(--color-text)]">
                One home for campaigns
              </p>
              <p className="text-xs text-[var(--color-subtle)]">
                Keep campaign links, QR assets and K-Cards in one Kompi
                workspace, so the whole team is looking at the same numbers.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Start with one short link. Grow into the full Kompi stack.
              </p>
              <p className="max-w-xl text-xs text-[var(--color-subtle)]">
                Create your first Kompi link for free, then add K-Cards, QR menus
                and workspaces when you&apos;re ready. No pressure, no clutter.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                asChild
                className="h-9 rounded-full px-4 text-xs font-semibold"
              >
                <Link href="/signup">Create your free Kompi account</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-9 rounded-full px-4 text-xs"
              >
                <Link href="/pricing">View plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>



      
  
      <FooterCTA />
    </div>
  );
}
