// src/app/growth/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function GrowthPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-xs font-semibold">
              K
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Kompi
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-medium md:flex">
            <Link
              href="/features/url-shortener"
              className="transition-colors text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
            >
              Product
            </Link>
            <Link
              href="/pricing"
              className="transition-colors text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
            >
              Pricing
            </Link>
            <Link
              href="/growth"
              className="transition-colors text-[color:var(--color-text)]"
              aria-current="page"
            >
              Growth
            </Link>
            <Link
              href="/support"
              className="transition-colors text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
            >
              Support
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="hidden text-xs font-medium text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)] md:inline"
            >
              Sign in
            </Link>
            <Button className="h-8 rounded-full px-4 text-xs font-semibold">
              Get started
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 pb-16 pt-10 md:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
          {/* Copy column */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-accent-soft)] bg-[color:var(--color-accent-soft)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
              Growth overview
            </div>

            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                <span
                  className="block italic leading-tight"
                  style={{ fontFamily: '"Instrument Serif", ui-serif' }}
                >
                  Get down to growth
                </span>
                <span className="mt-2 block">
                  with the power of one Kompi workspace.
                </span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] sm:text-[0.95rem]">
                Turn every short link and KR Code into a live growth signal.
                Plan campaigns, launch faster and understand what’s working —
                without juggling three different dashboards.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button className="h-10 rounded-full px-5 text-sm font-semibold">
                Start free
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-10 rounded-full px-5 text-xs"
              >
                <Link href="/signin">Book a walkthrough</Link>
              </Button>
              <p className="text-xs text-[color:var(--color-subtle)]">
                No card required · 14-day exploration
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-[11px] text-[color:var(--color-subtle)]">
              <div>
                <p className="text-sm font-semibold text-[color:var(--color-text)]">
                  25k+
                </p>
                <p>campaign links tracked</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--color-text)]">
                  40%
                </p>
                <p>faster launch cycles</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--color-text)]">
                  3x
                </p>
                <p>more on-brand QR journeys</p>
              </div>
            </div>
          </div>

          {/* Phone + stat tiles */}
          <div className="flex justify-center lg:justify-end">
            <div className="grid w-full max-w-md gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:items-center">
              {/* Left stack */}
              <div className="space-y-4">
                <Card className="border-[color:var(--color-border)] bg-[color:var(--color-accent-soft)]">
                  <CardContent className="space-y-3 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
                      Growth snapshot
                    </p>
                    <p className="text-lg font-semibold">
                      +38% higher CTR in the last 30 days.
                    </p>
                    <p className="text-[11px] text-[color:var(--color-subtle)]">
                      From refreshed KR Codes, short links and brand-safe
                      domains.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
                  <CardContent className="space-y-3 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                      Top journeys this week
                    </p>
                    <ul className="space-y-1.5 text-[11px]">
                      <li className="flex items-center justify-between">
                        <span>Airport campaign</span>
                        <span className="font-semibold">+63%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Event lanyards</span>
                        <span className="font-semibold">+41%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Out-of-home posters</span>
                        <span className="font-semibold">+29%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Phone card */}
              <Card className="border-[color:var(--color-border)] bg-[color:var(--color-accent-soft)]">
                <CardContent className="flex h-full flex-col justify-between gap-4 p-4">
                  <div className="flex items-center justify-between text-[11px] text-[color:var(--color-subtle)]">
                    <span>Spend dashboard</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-bg)] px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                      Live
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] py-6">
                    <p className="text-xs font-medium text-[color:var(--color-subtle)]">
                      Weekly engagements
                    </p>
                    <p className="text-3xl font-semibold">125,947</p>
                    <p className="text-[11px] text-[color:var(--color-subtle)]">
                      Across short links, KR Codes and Kompi Codes™.
                    </p>
                  </div>
                  <div className="flex justify-between text-[11px] text-[color:var(--color-subtle)]">
                    <span>Smart routing on</span>
                    <span>Alerts · Reports</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lime band narrative */}
      <section className="bg-[color:var(--color-accent-soft)] px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
          <div className="space-y-4 lg:w-3/5">
            <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-[1.9rem]">
              <span
                className="block italic"
                style={{ fontFamily: '"Instrument Serif", ui-serif' }}
              >
                One connected platform
              </span>
              <span className="mt-1 block">
                for travel, spend and event campaigns.
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--color-text)]/80">
              Plug Kompi into your existing stack, then point every QR code,
              short link and campaign asset to one coordinated workspace. Growth
              sees performance. Ops sees control. Finance sees the story behind
              every spend.
            </p>
          </div>
          <div className="grid gap-3 text-sm lg:w-2/5">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3">
              <p className="text-[11px] font-semibold text-[color:var(--color-subtle)]">
                Built for velocity
              </p>
              <p className="mt-1 text-sm">
                Reuse presets, KR Codes and domains so you can launch in
                minutes, not weeks.
              </p>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3">
              <p className="text-[11px] font-semibold text-[color:var(--color-subtle)]">
                Built for control
              </p>
              <p className="mt-1 text-sm">
                Lock naming, routes and permissions so every team moves fast
                without breaking brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards grid */}
      <section className="px-4 py-14 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-[1.9rem]">
                Growth that feels{" "}
                <span
                  className="italic"
                  style={{ fontFamily: '"Instrument Serif", ui-serif' }}
                >
                  designed
                </span>
                , not bolted on.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[color:var(--color-subtle)]">
                Replace one-off QR generators and patchwork spreadsheets with a
                platform that keeps your growth stories, assets and analytics
                together.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-full px-4 text-xs"
            >
              <Link href="/dashboard">See the dashboard</Link>
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Big lime story card */}
            <Card className="lg:row-span-2 border-[color:var(--color-border)] bg-[color:var(--color-accent-soft)]">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                    24/7 growth support
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    A control tower for every live journey.
                  </h3>
                  <p className="mt-2 text-sm text-[color:var(--color-text)]/80">
                    Assign campaigns to trips, events or partners. Swap
                    destinations on live KR Codes and links without reprinting
                    or losing attribution.
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-[color:var(--color-text)]/85">
                  <li>• Update routes instantly from one workspace.</li>
                  <li>• Auto-tag UTMs so reporting stays consistent.</li>
                  <li>• Route by geo, device, language or campaign.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[color:var(--color-border)]">
              <CardContent className="space-y-3 p-5">
                <p className="text-[11px] font-semibold text-[color:var(--color-subtle)]">
                  Global inventory
                </p>
                <h3 className="text-base font-semibold">
                  One library for every QR and short link.
                </h3>
                <p className="text-sm text-[color:var(--color-subtle)]">
                  Search, filter and reuse KR Codes across teams. Keep creative,
                  destinations and performance in one connected view.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[color:var(--color-border)]">
              <CardContent className="space-y-3 p-5">
                <p className="text-[11px] font-semibold text-[color:var(--color-subtle)]">
                  Negotiated performance
                </p>
                <h3 className="text-base font-semibold">
                  Understand ROI at partner, channel or market level.
                </h3>
                <p className="text-sm text-[color:var(--color-subtle)]">
                  Tie every scan and click back to spend so growth, finance and
                  ops speak the same language.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[color:var(--color-border)]">
              <CardContent className="space-y-3 p-5">
                <p className="text-[11px] font-semibold text-[color:var(--color-subtle)]">
                  Concierge
                </p>
                <h3 className="text-base font-semibold">
                  Need a growth partner, not just a tool?
                </h3>
                <p className="text-sm text-[color:var(--color-subtle)]">
                  Our team can help design your first playbooks: naming,
                  routing rules and how to roll out Kompi across teams and
                  markets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[color:var(--color-border)]">
              <CardContent className="space-y-3 p-5">
                <p className="text-[11px] font-semibold text-[color:var(--color-subtle)]">
                  Cards & passes
                </p>
                <h3 className="text-base font-semibold">
                  Give every campaign a smart companion card.
                </h3>
                <p className="text-sm text-[color:var(--color-subtle)]">
                  Pair Kompi with NFC cards, badges or passes to keep journeys
                  consistent from scan to signup and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-14 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-subtle)]">
              Questions?
            </p>
            <h2 className="text-2xl font-semibold sm:text-[1.9rem]">
              Everything you need to ship confident growth.
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is Kompi Growth right for small teams?",
                a: "Yes. Many teams start with a single workspace across paid, lifecycle and brand. You can add more workspaces, members and guardrails as you scale.",
              },
              {
                q: "Do I need engineering to get started?",
                a: "No. You can create links, KR Codes and routing rules directly in Kompi. Optional webhooks and APIs are available for deeper integrations.",
              },
              {
                q: "Can I bring my own domains and QR designs?",
                a: "Absolutely. Point branded domains at Kompi and upload on-brand QR treatments, while routing and analytics stay in one place.",
              },
              {
                q: "How does pricing work as we grow?",
                a: "Start on a self-serve plan, then move to usage-based pricing when you’re running higher-volume campaigns or need workspace-level controls.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                  <span>{item.q}</span>
                  <span className="text-xs text-[color:var(--color-subtle)] group-open:hidden">
                    +
                  </span>
                  <span className="hidden text-xs text-[color:var(--color-subtle)] group-open:inline">
                    –
                  </span>
                </summary>
                <p className="mt-2 text-sm text-[color:var(--color-subtle)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA strip */}
      <section className="bg-[color:var(--color-text)] px-4 py-10 text-[color:var(--color-bg)] md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card className="bg-[color:var(--color-text)] border-[color:var(--color-bg)]">
            <CardContent className="space-y-3 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)]/70">
                Get started
              </p>
              <h3 className="text-base font-semibold">
                Create your first growth workspace.
              </h3>
              <p className="text-sm text-[color:var(--color-bg)]/75">
                Invite your team, connect a domain and launch your first set of
                KR Codes and short links.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[color:var(--color-text)] border-[color:var(--color-bg)]">
            <CardContent className="space-y-3 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)]/70">
                Discover Kompi
              </p>
              <h3 className="text-base font-semibold">
                See Kompi Growth in a live environment.
              </h3>
              <p className="text-sm text-[color:var(--color-bg)]/75">
                Follow real-world journeys across travel, events and evergreen
                campaigns.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[color:var(--color-text)] border-[color:var(--color-bg)]">
            <CardContent className="flex h-full flex-col justify-between gap-4 p-5">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)]/70">
                  See it in action
                </p>
                <h3 className="text-base font-semibold">
                  Share a campaign, we’ll map it in Kompi.
                </h3>
                <p className="text-sm text-[color:var(--color-bg)]/75">
                  Send our team a recent campaign and we’ll show you how it
                  looks with Kompi Growth.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-9 rounded-full border-[color:var(--color-bg)] bg-[color:var(--color-text)] px-4 text-xs text-[color:var(--color-bg)]"
              >
                <Link href="/signin">Talk to sales</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[color:var(--color-accent)] pt-10 text-[color:var(--color-text)]">
        <div className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:px-8">
          <div className="flex flex-col gap-8 border-b border-[color:var(--color-text)]/15 pb-8 md:flex-row md:justify-between">
            <div className="space-y-3 max-w-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Powering real-world growth
              </p>
              <h2 className="text-2xl font-semibold sm:text-[1.9rem]">
                Ready to see Kompi on your next campaign?
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Button className="h-10 rounded-full px-5 text-sm font-semibold">
                Get started
              </Button>
              <Link
                href="/pricing"
                className="text-xs font-medium underline-offset-4 hover:underline"
              >
                View pricing
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-8 text-xs md:grid-cols-4">
            <div className="space-y-3">
              <p className="font-semibold">Product</p>
              <ul className="space-y-1 text-[color:var(--color-text)]/80">
                <li>
                  <Link href="/features/url-shortener">Short links</Link>
                </li>
                <li>
                  <Link href="/KR-Codes-QR-Code-Generator">KR Codes</Link>
                </li>
                <li>
                  <Link href="/analytics">Analytics</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Company</p>
              <ul className="space-y-1 text-[color:var(--color-text)]/80">
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Resources</p>
              <ul className="space-y-1 text-[color:var(--color-text)]/80">
                <li>
                  <Link href="/growth">Growth guide</Link>
                </li>
                <li>
                  <Link href="/dashboard">Product tour</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Legal</p>
              <ul className="space-y-1 text-[color:var(--color-text)]/80">
                <li>
                  <Link href="#">Privacy</Link>
                </li>
                <li>
                  <Link href="#">Terms</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--color-text)]/15 pt-4 text-[11px] text-[color:var(--color-text)]/80 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} Kompi. All rights reserved.</p>
            <p>Built for teams who want their growth stack to feel designed.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
