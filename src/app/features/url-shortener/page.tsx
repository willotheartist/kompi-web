"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FooterCTA } from "@/components/footer-cta";
import { instrumentSerif } from "@/lib/fonts";

const faqs = [
  {
    q: "What is Kompi's URL Shortener?",
    a: "Kompi turns long, messy URLs into clean, on-brand links that plug into workspaces, Link-in-bio pages, Kompi Codes™ and analytics — all in one place.",
  },
  {
    q: "Is Kompi free to start?",
    a: "Yes. Start on Free with core shortening and upgrade anytime for unlimited links, advanced analytics, custom domains, Kompi Codes™ and team features.",
  },
  {
    q: "Can I track performance?",
    a: "Every Kompi link tracks clicks, referrers, locations, devices and UTM performance so you can see what actually works.",
  },
  {
    q: "Can I brand my short links?",
    a: "On Creator and Studio, customize slugs, remove Kompi branding and connect your own domains for a fully branded experience.",
  },
  {
    q: "Is Kompi good for agencies & studios?",
    a: "Studio is built for multi-brand teams: dedicated workspaces, roles, approvals and client-ready analytics.",
  },
];

export default function UrlShortenerPage() {
  return (
    <main className="min-h-screen bg-[#fff8ff] text-neutral-900 -mt-24 md:-mt-28">
      {/* HERO: strict two-column layout */}
      <section className="px-6 pt-32 pb-24 bg-gradient-to-br from-[#fff8ff] via-[#ffeefe] to-[#f5f3ff]">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">
          {/* LEFT: TEXT */}
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase mb-4">
              Kompi URL Shortener
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-semibold leading-tight tracking-tight mb-5">
              Design-grade short links{" "}
              <span className={`${instrumentSerif.className} italic`}>
                for modern brands.
              </span>
            </h1>
            <p className="text-base md:text-lg text-neutral-600 mb-7 max-w-xl">
              Turn every URL into a tiny branded experience. Kompi keeps your
              links intentional in layouts, organized by workspace, and client-ready
              in a single, simple dashboard.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Button
                asChild
                className="rounded-full px-7 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm md:text-base font-semibold shadow-[0_20px_70px_rgba(15,23,42,0.35)]"
              >
                <Link href="/signin">Start shortening with Kompi</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 py-3 border-neutral-300 text-sm md:text-base text-neutral-900 bg-white hover:bg-neutral-50"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center text-xs md:text-sm text-neutral-500">
              <span>No credit card.</span>
              <span className="h-1 w-1 rounded-full bg-neutral-400" />
              <span>For creators, studios & brands.</span>
              <span className="h-1 w-1 rounded-full bg-neutral-400" />
              <span>Works with Kompi Codes™ & Link-in-bio.</span>
            </div>
          </div>

          {/* RIGHT: VISUAL CARD */}
          <div className="relative">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-6 -right-4 w-40 h-40 bg-gradient-to-br from-[#FFB347] via-[#FF5F6D] to-[#9B5CFF] rounded-[40px] blur-3xl opacity-80" />
            <div className="pointer-events-none absolute -bottom-10 -left-6 w-32 h-32 bg-gradient-to-tr from-[#43C7FF] via-[#9B5CFF] to-[#FFB347] rounded-[40px] blur-3xl opacity-55" />

            <Card className="relative z-10 w-full rounded-[32px] p-6 bg-gradient-to-br from-[#111827] via-[#151B3A] to-[#4B32FF] text-white border-0 shadow-[0_32px_110px_rgba(15,23,42,0.55)] flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">
                    Kompi link preview
                  </p>
                  <p className="text-sm font-semibold">
                    Cleaner links. Sharper reporting.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px]">
                  +2.3x avg CTR lift
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-slate-300 mb-1">
                    Original URL
                  </p>
                  <div className="rounded-2xl bg-white/6 px-3 py-2 text-[10px] text-slate-200 truncate">
                    https://brand.com/collections/spring-25/drop?utm_source=instagram_story_long&utm_medium=paid
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-300 mb-1">
                    Kompi short link
                  </p>
                  <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2">
                    <span className="text-sm font-semibold text-neutral-900">
                      kompi.app/spring-drop
                    </span>
                    <span className="ml-auto text-[10px] text-[#4B32FF] font-medium">
                      Copy ↗
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl bg-white/6 px-3 py-2">
                  <div className="text-[9px] text-slate-300">
                    30-day clicks
                  </div>
                  <div className="text-sm font-semibold">12.4k</div>
                </div>
                <div className="rounded-2xl bg-white/6 px-3 py-2">
                  <div className="text-[9px] text-slate-300">
                    Top source
                  </div>
                  <div className="text-sm font-semibold">Instagram</div>
                </div>
                <div className="rounded-2xl bg-white/6 px-3 py-2">
                  <div className="text-[9px] text-slate-300">
                    CTR uplift
                  </div>
                  <div className="text-sm font-semibold text-emerald-400">
                    +38%
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/12 flex flex-col gap-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold">
                    Plans from £12.99 / month
                  </span>
                  <span className="text-[9px] text-slate-300">
                    Short links, Kompi Codes™, bios & analytics.
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="h-8 px-4 rounded-full bg-white text-neutral-900 text-[10px] font-semibold hover:bg-slate-100"
                  >
                    <Link href="/pricing">See pricing</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-8 px-4 rounded-full border-white/30 text-[10px] text-white bg-transparent hover:bg-white/5"
                  >
                    <Link href="/signin">Start free</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-gradient-to-r from-[#FFF4E6] via-[#FFE6F2] to-[#F2ECFF] px-8 py-9 shadow-[0_18px_60px_rgba(15,23,42,0.09)]">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            The Kompi way to shorten links.
          </h2>
          <div className="grid gap-6 md:grid-cols-4 text-sm md:text-base">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-semibold">Paste anything</h3>
              <p className="text-neutral-700">
                URLs from socials, ads, newsletters, podcasts or QR — Kompi
                cleans and centralizes them.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-semibold">Make it on-brand</h3>
              <p className="text-neutral-700">
                Choose workspace, set a slug, apply UTM presets & naming rules.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-semibold">Launch everywhere</h3>
              <p className="text-neutral-700">
                Use Kompi links in bios, overlays, Kompi Codes™, SMS and
                collabs with one source of truth.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="font-semibold">See what works</h3>
              <p className="text-neutral-700">
                Real-time analytics show clicks, sources, devices and campaigns
                in one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <Card className="rounded-[30px] p-7 border-0 bg-gradient-to-br from-[#111827] via-[#151B3A] to-[#4B32FF] text-white shadow-[0_26px_90px_rgba(15,23,42,0.35)]">
            <h3 className="text-xl font-semibold mb-3">
              Links that look intentional.
            </h3>
            <p className="text-sm md:text-base text-slate-100 mb-4">
              Kompi links feel native to premium brands and clean product
              layouts.
            </p>
            <ul className="text-sm space-y-2 text-slate-100/90">
              <li>• Custom slugs per drop, launch or creator.</li>
              <li>• Opinionated patterns your team can follow.</li>
              <li>• Perfect for screenshots, decks & case studies.</li>
            </ul>
          </Card>

          <Card className="rounded-[30px] p-7 border-0 bg-gradient-to-br from-[#FFF4E6] via-[#FFE6F2] to-[#F2ECFF] text-neutral-900 shadow-[0_20px_70px_rgba(15,23,42,0.14)]">
            <h3 className="text-xl font-semibold mb-3">
              Analytics without the headache.
            </h3>
            <p className="text-sm md:text-base text-neutral-800 mb-4">
              Every Kompi link is a mini-report that anyone can read.
            </p>
            <ul className="text-sm text-neutral-800 space-y-2">
              <li>• Clicks, referrers, devices & locations.</li>
              <li>• UTM performance by campaign & channel.</li>
              <li>• Exports & workspace views on Studio.</li>
            </ul>
          </Card>

          <Card className="rounded-[30px] p-7 border-0 bg-gradient-to-br from-[#FFB8E5] via-[#FFD280] to-[#9B5CFF] text-neutral-900 shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
            <h3 className="text-xl font-semibold mb-3">
              Built for subscriptions & studios.
            </h3>
            <p className="text-sm md:text-base text-neutral-900 mb-4">
              One Kompi subscription, unlimited campaigns and brands.
            </p>
            <ul className="text-sm text-neutral-900 space-y-2">
              <li>• Workspaces per brand or client.</li>
              <li>• Roles, approvals & shared templates.</li>
              <li>• Links, Kompi Codes™ & bios in one stack.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* PLATFORM STRIP */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[#111827] text-white px-7 py-9 grid gap-10 md:grid-cols-[1.7fr,1.3fr] items-center shadow-[0_28px_90px_rgba(15,23,42,0.6)]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#9ca3af] mb-2">
              The Kompi platform
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              Short links, Kompi Codes™ and Link-in-bio — one playful system.
            </h3>
            <p className="text-sm md:text-base text-[#e5e7eb] mb-4 max-w-xl">
              Stop duct-taping tools. Kompi gives you a design-forward home for
              every click, code and page.
            </p>
            <ul className="text-sm text-[#d1d5db] space-y-2 mb-6">
              <li>• Clean workspaces for brands, clients and campaigns.</li>
              <li>• Shared rules for slugs, UTMs and naming.</li>
              <li>• Reporting that looks good in any deck.</li>
            </ul>
            <Button
              asChild
              className="rounded-full bg-white text-neutral-900 hover:bg-[#e5e7eb] text-sm font-semibold px-7 py-3"
            >
              <Link href="/pricing">Explore Kompi plans</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-4 w-32 h-32 bg-[#43c7ff]/25 rounded-[32px] blur-2xl" />
            <Card className="relative z-10 rounded-[26px] p-5 bg-[#020817] border border-[#111827] text-[11px] md:text-xs text-[#e5e7eb] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#9ca3af]">
                  Studio overview
                </span>
                <span className="px-3 py-1 rounded-full bg-[#111827] text-[#43c7ff] text-[9px]">
                  Live performance
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#0f172a] px-3 py-3">
                  <div className="text-[9px] text-[#9ca3af]">Short links</div>
                  <div className="text-sm font-semibold">1,248</div>
                </div>
                <div className="rounded-2xl bg-[#0f172a] px-3 py-3">
                  <div className="text-[9px] text-[#9ca3af]">
                    Kompi Codes™
                  </div>
                  <div className="text-sm font-semibold">312</div>
                </div>
                <div className="rounded-2xl bg-[#0f172a] px-3 py-3">
                  <div className="text-[9px] text-[#9ca3af]">Bio pages</div>
                  <div className="text-sm font-semibold">24</div>
                </div>
              </div>
              <div>
                <div className="text-[9px] text-[#9ca3af] mb-1">
                  Top links this week
                </div>
                <div className="space-y-1.5 text-[9px]">
                  <div className="flex justify-between gap-3">
                    <span className="truncate">kompi.app/drop</span>
                    <span className="text-emerald-400">+18%</span>
                  </div>
                  <div className="flex justify_between gap-3">
                    <span className="truncate">kompi.app/launch-film</span>
                    <span className="text-emerald-400">+9%</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="truncate">kompi.app/studio-reel</span>
                    <span className="text-yellow-300">steady</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ + FINAL CTA */}
      <section className="px-6 pb-16 bg-[#fff8ff]">
        <div className="max-w-6xl mx_auto grid gap-10 md:grid-cols-[1.7fr,1.3fr] items-start">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              Frequently asked questions
            </h3>
            <p className="text-sm md:text-base text-neutral-500 mb-5 max-w-md">
              The quickest way to understand Kompi is to create a link. Here are
              a few answers while you&apos;re thinking about it.
            </p>
            <div className="space-y-3">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl bg-white border border-neutral-100 px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
                >
                  <div className="text-sm md:text-base font-semibold text-neutral-900 mb-1.5">
                    {item.q}
                  </div>
                  <div className="text-sm md:text-base text-neutral-600">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] bg-white px-6 py-7 shadow-[0_22px_70px_rgba(15,23,42,0.12)] flex flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
                See if Kompi fits your stack
              </p>
              <h4 className="text-2xl font-semibold mb-2">
                Start with one link.
                <br />
                Stay for the system.
              </h4>
              <p className="text-sm md:text-base text-neutral-600">
                Create a Kompi link in under a minute. If it doesn&apos;t feel
                cleaner and sharper than your current setup, cancel anytime.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                asChild
                className="rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm md:text-base font-semibold px-7 py-3"
              >
                <Link href="/signin">Get started for free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-neutral-300 text-sm md:text-base px-6 py-3 bg-white hover:bg-neutral-50"
              >
                <Link href="/pricing">Compare plans</Link>
              </Button>
            </div>
            <div className="text-xs md:text-sm text-neutral-500">
              No sales calls. No clutter. Just Kompi Links.
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />

      <footer className="px-6 py-10 bg-[#020817] text-[#9ca3af]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-semibold">
              K
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                Kompi Links
              </span>
              <span className="text-xs text-[#9ca3af]">
                Links, bios, Kompi Codes™ & analytics.
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-[10px] md:text-xs">
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/features/url-shortener" className="hover:text-white">
              URL Shortener
            </Link>
            <Link href="/#solutions" className="hover:text-white">
              Solutions
            </Link>
            <span className="text-[#6b7280]">
              © {new Date().getFullYear()} Kompi.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
