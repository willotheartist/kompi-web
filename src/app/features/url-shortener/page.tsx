"use client";

import "./url-shortener.css";

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
    <main className="wf-url-shortener wf-bg-page wf-text-main min-h-screen">
      {/* Pattern: HeroA – Calm product hero */}
      <section className="wf-section wf-section-hero border-b border-[color:var(--color-border)]">
        <div className="wf-container wf-heroA-layout">
          {/* LEFT: TEXT */}
          <div className="space-y-6">
            <p className="wf-eyebrow">Kompi URL Shortener</p>
            <h1 className="wf-hero-title">
              Design-grade{" "}
              <span className={instrumentSerif.className + " italic"}>
                short links
              </span>{" "}
              for modern brands.
            </h1>
            <p className="wf-body-lg max-w-xl text-subtle">
              Turn every URL, Kompi Code™ and K-Card into a tiny branded
              experience. Kompi keeps your links intentional in layouts,
              organized by workspace, and client-ready in a single dashboard.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild className="wf-btn-primary">
                <Link href="/signin">Start shortening with Kompi</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="wf-btn-secondary"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-subtle">
              <span>No credit card.</span>
              <span className="wf-dot" />
              <span>For creators, studios & brands.</span>
              <span className="wf-dot" />
              <span>Works with Kompi Codes™, K-Cards & Link-in-bio.</span>
            </div>
          </div>

          {/* RIGHT: VISUAL CARD */}
          <div className="wf-hero-preview-wrapper">
            <Card className="wf-card wf-card-lg wf-hero-preview">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="wf-meta">Kompi link preview</p>
                  <p className="text-sm font-semibold">
                    Cleaner links. Sharper reporting.
                  </p>
                </div>
                <div className="wf-pill-outline text-xs">
                  +2.3× average CTR lift
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="wf-meta">Original URL</p>
                  <div className="wf-input-muted truncate">
                    https://brand.com/collections/spring-25/drop?utm_source=instagram_story_long&utm_medium=paid
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="wf-meta">Kompi short link</p>
                  <div className="flex items-center gap-2 wf-input-main">
                    <span className="text-sm font-semibold">
                      kompi.app/spring-drop
                    </span>
                    <span className="ml-auto text-xs text-subtle">
                      Copy ↗
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="wf-stat-chip">
                  <div className="wf-meta">30-day clicks</div>
                  <div className="text-sm font-semibold">12.4k</div>
                </div>
                <div className="wf-stat-chip">
                  <div className="wf-meta">Top source</div>
                  <div className="text-sm font-semibold">Instagram</div>
                </div>
                <div className="wf-stat-chip">
                  <div className="wf-meta">CTR uplift</div>
                  <div className="text-sm font-semibold text-[color:var(--color-text)]">
                    +38%
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[color:var(--color-border)] flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">
                    Plans from £12.99 / month
                  </span>
                  <span className="wf-meta">
                    Short links, Kompi Codes™, K-Cards, bios & analytics.
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild className="wf-btn-secondary-on-surface">
                    <Link href="/pricing">See pricing</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="wf-btn-ghost-on-surface"
                  >
                    <Link href="/signin">Start free</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pattern: LogosBar – Trusted by strip */}
      <section className="wf-section-tight border-b border-[color:var(--color-border)]">
        <div className="wf-container">
          <div className="wf-card wf-card-soft flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <p className="wf-eyebrow">
                Trusted by teams on{" "}
                <span className={instrumentSerif.className + " italic"}>
                  Kompi
                </span>
              </p>
              <p className="wf-body-sm text-subtle max-w-xl">
                One system for short links, Kompi Codes™, K-Cards and
                Link-in-bio across brands, clients and campaigns.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-[0.75rem] md:text-xs tracking-[0.18em] uppercase text-subtle">
              <span className="wf-logo-pill">Creators</span>
              <span className="wf-logo-pill">Studios</span>
              <span className="wf-logo-pill">In-house teams</span>
              <span className="wf-logo-pill">Subscription partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern: HowItWorks – Numbered flow */}
      <section className="wf-section border-b border-[color:var(--color-border)]">
        <div className="wf-container space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="wf-section-title">
              The Kompi way to{" "}
              <span className={instrumentSerif.className + " italic"}>
                shorten
              </span>{" "}
              links.
            </h2>
            <p className="wf-body-md text-subtle">
              From the first URL to full Kompi Codes™ and K-Cards, everything
              sits in one calm workspace.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="wf-step-card">
              <div className="wf-step-badge">1</div>
              <h3 className="wf-step-title">Paste anything</h3>
              <p className="wf-body-sm text-subtle">
                URLs from socials, ads, newsletters, podcasts or QR — Kompi
                cleans and centralizes them.
              </p>
            </div>
            <div className="wf-step-card">
              <div className="wf-step-badge">2</div>
              <h3 className="wf-step-title">Make it on-brand</h3>
              <p className="wf-body-sm text-subtle">
                Choose workspace, set a slug, apply UTM presets &amp; naming
                rules that your whole team can follow.
              </p>
            </div>
            <div className="wf-step-card">
              <div className="wf-step-badge">3</div>
              <h3 className="wf-step-title">Launch everywhere</h3>
              <p className="wf-body-sm text-subtle">
                Use Kompi links in bios, overlays, Kompi Codes™, K-Cards, SMS
                and collabs — always from one source of truth.
              </p>
            </div>
            <div className="wf-step-card">
              <div className="wf-step-badge">4</div>
              <h3 className="wf-step-title">See what works</h3>
              <p className="wf-body-sm text-subtle">
                Real-time analytics show clicks, sources, devices and campaigns
                in a single, readable dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern: ValueGrid – Three pillars */}
      <section className="wf-section border-b border-[color:var(--color-border)]">
        <div className="wf-container space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="wf-section-title">
              One system for links,{" "}
              <span className={instrumentSerif.className + " italic"}>
                codes
              </span>{" "}
              and cards.
            </h2>
            <p className="wf-body-md text-subtle">
              Shorten URLs, spin up Kompi Codes™ and ship K-Cards without
              duct-taping tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="wf-card wf-value-card">
              <h3 className="wf-card-title">Links that look intentional.</h3>
              <p className="wf-body-sm text-subtle mb-3">
                Kompi links feel native to premium brands and clean product
                layouts.
              </p>
              <ul className="wf-body-sm text-subtle space-y-1.5">
                <li>• Custom slugs per drop, launch or creator.</li>
                <li>• Opinionated patterns your team can follow.</li>
                <li>• Perfect for screenshots, decks &amp; case studies.</li>
              </ul>
            </Card>

            <Card className="wf-card wf-value-card">
              <h3 className="wf-card-title">
                Analytics without the headache.
              </h3>
              <p className="wf-body-sm text-subtle mb-3">
                Every Kompi link is a mini-report that anyone can read.
              </p>
              <ul className="wf-body-sm text-subtle space-y-1.5">
                <li>• Clicks, referrers, devices &amp; locations.</li>
                <li>• UTM performance by campaign &amp; channel.</li>
                <li>• Exports &amp; workspace views on Studio.</li>
              </ul>
            </Card>

            <Card className="wf-card wf-value-card">
              <h3 className="wf-card-title">
                Built for subscriptions &amp; studios.
              </h3>
              <p className="wf-body-sm text-subtle mb-3">
                One Kompi subscription, unlimited campaigns and brands.
              </p>
              <ul className="wf-body-sm text-subtle space-y-1.5">
                <li>• Workspaces per brand or client.</li>
                <li>• Roles, approvals &amp; shared templates.</li>
                <li>• Links, Kompi Codes™, K-Cards &amp; bios in one stack.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pattern: Testimonials – simple band (no carousel) */}
      <section className="wf-section-tight border-b border-[color:var(--color-border)]">
        <div className="wf-container">
          <div className="wf-card wf-card-soft wf-testimonials-shell">
            <div className="space-y-2">
              <h2 className="wf-section-title-sm">
                Teams that{" "}
                <span className={instrumentSerif.className + " italic"}>
                  live
                </span>{" "}
                in clean links.
              </h2>
              <p className="wf-body-sm text-subtle max-w-2xl">
                Kompi fits into existing workflows for creators, studios and
                in-house teams — without adding another noisy dashboard.
              </p>
            </div>
            <div className="flex gap-4 overflow-x-auto pt-4 -mx-2 px-2">
              <figure className="wf-card wf-testimonial-card">
                <blockquote className="wf-body-sm text-subtle">
                  “We use Kompi links and Kompi Codes™ across every launch. The
                  naming rules keep our whole team aligned.”
                </blockquote>
                <figcaption className="wf-meta mt-3">
                  Studio lead, content agency
                </figcaption>
              </figure>
              <figure className="wf-card wf-testimonial-card">
                <blockquote className="wf-body-sm text-subtle">
                  “K-Cards and short links mean our clients see the work the way
                  we designed it — tidy, on-brand and easy to share.”
                </blockquote>
                <figcaption className="wf-meta mt-3">
                  Founder, subscription design studio
                </figcaption>
              </figure>
              <figure className="wf-card wf-testimonial-card">
                <blockquote className="wf-body-sm text-subtle">
                  “Kompi is the only link tool that feels designed for layouts,
                  not just for spreadsheets.”
                </blockquote>
                <figcaption className="wf-meta mt-3">
                  Marketing manager, in-house brand
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern: StatsRow – System numbers */}
      <section className="wf-section border-b border-[color:var(--color-border)]">
        <div className="wf-container space-y-8 md:grid md:grid-cols-[1.7fr,1.3fr] md:items-center md:gap-10">
          <div className="space-y-4">
            <p className="wf-eyebrow">The Kompi platform</p>
            <h3 className="wf-section-title">
              Short links, Kompi Codes™, K-Cards and Link-in-bio — one{" "}
              <span className={instrumentSerif.className + " italic"}>
                playful
              </span>{" "}
              system.
            </h3>
            <p className="wf-body-md text-subtle max-w-xl">
              Stop duct-taping tools. Kompi gives you a design-forward home for
              every click, code and card.
            </p>
            <ul className="wf-body-sm text-subtle space-y-1.5">
              <li>• Clean workspaces for brands, clients and campaigns.</li>
              <li>• Shared rules for slugs, UTMs and naming.</li>
              <li>• Reporting that looks good in any deck.</li>
            </ul>
            <Button asChild className="wf-btn-primary mt-4">
              <Link href="/pricing">Explore Kompi plans</Link>
            </Button>
          </div>

          <div className="mt-8 md:mt-0">
            <Card className="wf-card wf-stats-card">
              <div className="flex justify-between items-center gap-3 mb-4">
                <span className="wf-meta">Studio overview</span>
                <span className="wf-pill-soft text-xs">Live performance</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="wf-stat-tile">
                  <span className="wf-dot-lime" />
                  <div className="text-xs text-subtle">Short links</div>
                  <div className="text-lg font-semibold">1,248</div>
                </div>
                <div className="wf-stat-tile">
                  <span className="wf-dot-lime" />
                  <div className="text-xs text-subtle">Kompi Codes™</div>
                  <div className="text-lg font-semibold">312</div>
                </div>
                <div className="wf-stat-tile">
                  <span className="wf-dot-lime" />
                  <div className="text-xs text-subtle">K-Cards &amp; bios</div>
                  <div className="text-lg font-semibold">24</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="wf-meta mb-1">Top links this week</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between gap-3">
                    <span className="truncate">kompi.app/drop</span>
                    <span className="text-subtle">+18%</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="truncate">kompi.app/launch-film</span>
                    <span className="text-subtle">+9%</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="truncate">kompi.app/studio-reel</span>
                    <span className="text-subtle">steady</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ + inline CTA */}
      <section className="wf-section border-b border-[color:var(--color-border)]">
        <div className="wf-container grid gap-10 md:grid-cols-[1.7fr,1.3fr] items-start">
          <div>
            <h3 className="wf-section-title">
              Frequently asked{" "}
              <span className={instrumentSerif.className + " italic"}>
                questions
              </span>
            </h3>
            <p className="wf-body-md text-subtle mb-6 max-w-md">
              The quickest way to understand Kompi is to create a link. Here are
              a few answers while you&apos;re thinking about it.
            </p>
            <div className="space-y-3">
              {faqs.map((item) => (
                <div key={item.q} className="wf-card wf-faq-card">
                  <div className="wf-body-md font-semibold">{item.q}</div>
                  <div className="wf-body-sm text-subtle">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="wf-card wf-cta-side space-y-5">
            <div className="space-y-2">
              <p className="wf-eyebrow">See if Kompi fits your stack</p>
              <h4 className="wf-side-title">
                Start with one{" "}
                <span className={instrumentSerif.className + " italic"}>
                  link
                </span>
                . Stay for the system.
              </h4>
              <p className="wf-body-sm text-subtle">
                Create a Kompi link in under a minute. If it doesn&apos;t feel
                cleaner and sharper than your current setup, cancel anytime.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button asChild className="wf-btn-primary">
                <Link href="/signin">Get started for free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="wf-btn-secondary"
              >
                <Link href="/pricing">Compare plans</Link>
              </Button>
            </div>
            <div className="space-y-2">
              <div className="wf-body-xs text-subtle">
                No sales calls. No clutter. Just Kompi Links.
              </div>
              <div className="flex flex-wrap gap-4 wf-body-xs text-subtle">
                <Link href="/pricing" className="wf-quiet-link">
                  Pricing
                </Link>
                <Link
                  href="/features/url-shortener"
                  className="wf-quiet-link"
                >
                  URL Shortener
                </Link>
                <Link href="/#solutions" className="wf-quiet-link">
                  Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern: CTA_Footer – final nudge (component handled elsewhere) */}
      <FooterCTA />
    </main>
  );
}
