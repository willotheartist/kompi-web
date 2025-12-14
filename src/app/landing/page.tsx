import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kompi — All-in-one growth suite for creators, brands, and small businesses",
  description:
    "Kompi combines link-in-bio, K-Cards, KR Codes (QR), short links, analytics, and a growing suite of tools—so you can build, share, and measure everything in one place.",
  alternates: { canonical: "/landing" },
};

const TRUST_TAGS = [
  "Creators",
  "Brands",
  "Small businesses",
  "Agencies",
  "Communities",
  "Events",
  "Restaurants",
  "Venues",
];

const IMPACT_STATS = [
  { k: "One suite", v: "Links + QR + cards + tools" },
  { k: "One workspace", v: "Organize by brand/team" },
  { k: "One analytics layer", v: "Clicks + scans + pages" },
  { k: "Start free", v: "Upgrade when needed" },
];

const FEATURE_CARDS = [
  {
    title: "Link in bio that converts",
    desc: "Turn one profile link into a clean home for everything you share.",
    points: ["Fast setup", "Beautiful layouts", "Built to convert"],
    image: "/growth/links.png",
    alt: "Kompi link in bio preview",
    href: "/claim",
    cta: "Build your link →",
  },
  {
    title: "K-Cards for identity",
    desc: "Modern digital business cards for creators, freelancers, teams, and events.",
    points: ["Instant share", "Professional presence", "Works everywhere"],
    image: "/growth/k-cards.png",
    alt: "Kompi K-Cards preview",
    href: "/k-cards",
    cta: "Explore K-Cards →",
  },
  {
    title: "KR Codes + QR experiences",
    desc: "Branded QR codes for pages, menus, contact cards, offers—and scan tracking.",
    points: ["Custom styles", "Multiple QR types", "Scan insights"],
    image: "/growth/kompi-codes.png",
    alt: "Kompi KR Codes preview",
    href: "/KR-Codes-QR-Code-Generator",
    cta: "Generate KR Codes →",
  },
  {
    title: "Analytics that makes sense",
    desc: "Know what’s working across links, pages, and QR—then improve with confidence.",
    points: ["Clean dashboards", "Trackable links", "Actionable insights"],
    image: "/growth/analytics.png",
    alt: "Kompi analytics preview",
    href: "/analytics",
    cta: "See analytics →",
  },
];

const WHY_KOMPI = [
  {
    title: "It’s not a pile of tools",
    desc: "Kompi connects what you share (links, pages, QR, cards) to what you learn (analytics).",
  },
  {
    title: "Built for real workflows",
    desc: "Creators, brands, SMEs, and events all share the same basics—Kompi adapts without chaos.",
  },
  {
    title: "Clean by default",
    desc: "Simple UI. Clear outputs. Fewer clicks. Less “where is that thing again?”",
  },
];

const ALT_SECTIONS = [
  {
    eyebrow: "For creators & personal brands",
    title: "Build your audience — and your income.",
    desc: "Your link in bio, brand card, QR, and analytics work together so growth isn’t scattered across apps.",
    bullets: [
      "A link in bio that actually converts",
      "K-Cards that feel premium and modern",
      "Track clicks & scans without confusion",
    ],
    image: "/kompiimage1.png",
    alt: "Kompi for creators",
    primaryHref: "/customers/creators",
    primaryCta: "Creator use cases →",
  },
  {
    eyebrow: "For small businesses",
    title: "Simple tools for real-world outcomes.",
    desc: "QR menus, promotions, short links, and lead capture—without a messy stack. Kompi stays clean as you grow.",
    bullets: ["QR menus & QR codes", "Trackable short links + UTMs", "Capture inquiries & leads"],
    image: "/kompi-business.png",
    alt: "Kompi for small businesses",
    primaryHref: "/customers/small-business",
    primaryCta: "Small business use cases →",
  },
  {
    eyebrow: "For brands & agencies",
    title: "Campaign routing, reporting, and clarity.",
    desc: "Run campaigns with trackable links, shareable analytics, and organized workspaces—without duct-taping tools together.",
    bullets: ["Short links + UTMs", "Analytics you can export/share", "Workspaces for clients/teams"],
    image: "/kompi-branding.png",
    alt: "Kompi for brands",
    primaryHref: "/customers/brands",
    primaryCta: "Brand & agency use cases →",
  },
  {
    eyebrow: "For communities & events",
    title: "Make sharing instant at scale.",
    desc: "Schedules, resources, sponsors, menus, and updates—delivered via QR + pages and backed by scan insights.",
    bullets: ["QR for venues & events", "K-Cards for teams", "Proof via scan analytics"],
    image: "/kompiimage19.png",
    alt: "Kompi for events",
    primaryHref: "/customers/events",
    primaryCta: "Events use cases →",
  },
];

const TOOL_GRID = [
  { title: "Kompi Suite", desc: "Your all-in-one workspace.", href: "/kompi-suite" },
  { title: "Short links", desc: "Clean links + tracking.", href: "/features/url-shortener" },
  { title: "KR Codes", desc: "Branded QR generation.", href: "/KR-Codes-QR-Code-Generator" },
  { title: "K-Cards", desc: "Digital business cards.", href: "/k-cards" },
  { title: "QR Menus", desc: "For restaurants & venues.", href: "/qr-menus" },
  { title: "Analytics", desc: "Measure clicks & scans.", href: "/analytics" },
  { title: "UTM builder", desc: "Track campaigns properly.", href: "/tools/utm-builder" },
  { title: "Tools hub", desc: "Browse the growing library.", href: "/tools" },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    desc: "Start building and sharing in minutes.",
    points: ["Core suite access", "Create your setup", "Upgrade anytime"],
    cta: "Start free",
    href: "/signin",
    featured: false,
  },
  {
    name: "Creator / Pro",
    price: "$30",
    desc: "For serious growth and better insights.",
    points: ["More capacity", "Better tracking", "More customization"],
    cta: "View pricing",
    href: "/pricing",
    featured: true,
  },
  {
    name: "Business",
    price: "$399",
    desc: "For teams, brands, and advanced needs.",
    points: ["Workspaces for teams", "Bigger limits", "Operational clarity"],
    cta: "See plans",
    href: "/pricing",
    featured: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Kompi finally made our links, QR, and reporting feel like one system instead of five tools stitched together.",
    name: "A growth lead",
    role: "Brand team",
    image: "/faces/face81.png",
  },
  {
    quote:
      "I just wanted one place to share everything and know what works. Kompi is the first thing that felt clean.",
    name: "A creator",
    role: "Personal brand",
    image: "/faces/face83.png",
  },
];

const FAQS = [
  {
    q: "What is Kompi?",
    a: "Kompi is an all-in-one growth suite: link-in-bio pages, K-Cards, KR Codes (QR), short links, analytics, and a growing set of tools—built to help you share smarter and measure what works.",
  },
  {
    q: "Who is Kompi for?",
    a: "Creators, brands, agencies, SMEs, communities, events, venues, and solo operators. The same suite adapts to different goals.",
  },
  {
    q: "Do links and QR codes include analytics?",
    a: "Yes. Kompi is designed around tracking and clarity—so you can understand performance and improve your setup.",
  },
  {
    q: "Can I start free?",
    a: "Yes. Start free, build your setup, and upgrade only when you need more power.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-[#A5B0FF]/18 blur-3xl" />
          <div className="absolute top-52 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#D5FF3E]/10 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#D5FF3E]" />
                All-in-one growth suite
              </div>

              <h1 className="mt-5 text-[44px] font-extrabold leading-[1.05] tracking-tight md:text-[58px]">
                One place for everything you share.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
                Kompi brings together <span className="font-semibold">link in bio</span>,{" "}
                <span className="font-semibold">K-Cards</span>,{" "}
                <span className="font-semibold">KR Codes (QR)</span>,{" "}
                <span className="font-semibold">short links</span>,{" "}
                <span className="font-semibold">analytics</span>, and a growing tools library—
                so creators, brands, and small businesses can build and measure in one workspace.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#1E2330]"
                  style={{ backgroundColor: "#D5FF3E" }}
                >
                  Start free
                </Link>

                <Link
                  href="/kompi-suite"
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-3 text-sm font-semibold"
                >
                  Explore Kompi Suite
                </Link>

                <Link href="/tools" className="text-sm font-semibold opacity-75 hover:opacity-100">
                  Browse tools →
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {IMPACT_STATS.map((s) => (
                  <div
                    key={s.k}
                    className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-60">{s.k}</div>
                    <div className="mt-2 text-sm font-semibold opacity-85">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual collage (clean cards) */}
            <div className="relative">
              <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 shadow-sm">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
                    <div className="px-4 pt-4 text-xs font-semibold opacity-70">Links + pages</div>
                    <div className="relative aspect-[16/10]">
                      <Image
                        src="/links-dashboard-card.png"
                        alt="Links dashboard card"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
                    <div className="px-4 pt-4 text-xs font-semibold opacity-70">Analytics</div>
                    <div className="relative aspect-[16/10]">
                      <Image
                        src="/kompi-analytics.png"
                        alt="Kompi analytics"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] sm:col-span-2">
                    <div className="px-4 pt-4 text-xs font-semibold opacity-70">K-Cards</div>
                    <div className="relative aspect-[21/9]">
                      <Image
                        src="/kcard-dashboard-card.png"
                        alt="K-Cards dashboard card"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust row */}
              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-60">
                  Built for growth across
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TRUST_TAGS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold opacity-80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Why Kompi (simple, impactful) */}
          <div className="mt-12 rounded-[44px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 md:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              {WHY_KOMPI.map((w) => (
                <div key={w.title} className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6">
                  <div className="text-base font-bold tracking-tight">{w.title}</div>
                  <div className="mt-2 text-sm leading-relaxed opacity-80">{w.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#1E2330]"
                style={{ backgroundColor: "#D5FF3E" }}
              >
                Start free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-6 py-3 text-sm font-semibold"
              >
                View pricing
              </Link>
              <Link href="/kompi-suite" className="text-sm font-semibold opacity-75 hover:opacity-100">
                See how Kompi Suite works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              A suite that covers the whole story.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-75 md:text-base">
              Build → share → track → improve. Kompi keeps the workflow connected instead of scattered.
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-semibold opacity-80 hover:opacity-100 md:inline-flex"
          >
            Browse tools →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {FEATURE_CARDS.map((b) => (
            <div
              key={b.title}
              className="overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{b.desc}</p>

                <ul className="mt-4 grid gap-2 text-sm">
                  {b.points.map((x) => (
                    <li key={x} className="flex items-center gap-2 opacity-85">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#D5FF3E" }} />
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 text-sm font-semibold opacity-80 hover:opacity-100">
                  <Link href={b.href}>{b.cta}</Link>
                </div>
              </div>

              <div className="relative aspect-[16/10] border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
                <Image src={b.image} alt={b.alt} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALTERNATING (Snapy-style) */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
        <div className="grid gap-10">
          {ALT_SECTIONS.map((s, idx) => (
            <div
              key={s.title}
              className="overflow-hidden rounded-[44px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
            >
              <div className="grid gap-8 p-7 md:grid-cols-2 md:items-center md:p-10">
                <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-60">
                    {s.eyebrow}
                  </div>
                  <h3 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">
                    {s.desc}
                  </p>

                  <ul className="mt-5 grid gap-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 opacity-85">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#A5B0FF" }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={s.primaryHref}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#1E2330]"
                      style={{ backgroundColor: "#D5FF3E" }}
                    >
                      {s.primaryCta}
                    </Link>
                    <Link
                      href="/signin"
                      className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-6 py-3 text-sm font-semibold"
                    >
                      Start free
                    </Link>
                  </div>
                </div>

                <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                  <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
                    <div className="relative aspect-[16/11]">
                      <Image src={s.image} alt={s.alt} fill className="object-cover" />
                    </div>
                  </div>

                  <div className="mt-4 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 text-sm opacity-80">
                    <span className="font-semibold">Why it matters:</span> Kompi keeps your sharing and tracking consistent—so
                    you don’t rebuild links, QR, and reporting every time you run a campaign.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Everything Kompi offers (at a glance)
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-75 md:text-base">
              Use only what you need. But it’s powerful knowing it’s all there when you’re ready.
            </p>
          </div>
          <Link href="/tools" className="text-sm font-semibold opacity-75 hover:opacity-100">
            Browse all tools →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOL_GRID.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-base font-bold tracking-tight">{t.title}</div>
                  <div className="mt-1 text-sm opacity-75">{t.desc}</div>
                </div>
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-bold opacity-60 group-hover:opacity-100">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-[44px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <div className="grid gap-8 p-7 md:grid-cols-2 md:items-center md:p-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-60">
                One workspace
              </div>
              <h3 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                Keep everything under one roof.
              </h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">
                Links, QR, K-Cards, pages, tools, and analytics—organized by workspace, ready for real use.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#1E2330]"
                  style={{ backgroundColor: "#D5FF3E" }}
                >
                  Start free
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-6 py-3 text-sm font-semibold"
                >
                  View pricing
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
              <div className="relative aspect-[16/11]">
                <Image src="/workspacekompi.png" alt="Kompi workspace" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KOMPI vs STACK (impact section) */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
        <div className="overflow-hidden rounded-[44px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <div className="p-7 md:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Kompi vs. the messy tool stack
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed opacity-80 md:text-base">
              Most people end up with 4–6 tools: link-in-bio, QR generator, short links, analytics, lead capture, and “random utilities.”
              Kompi pulls that into one suite so you move faster and stay consistent.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6">
                <div className="text-sm font-bold">Typical stack</div>
                <ul className="mt-3 grid gap-2 text-sm opacity-80">
                  {[
                    "Link-in-bio app",
                    "QR code generator",
                    "URL shortener + UTMs",
                    "Analytics dashboard",
                    "Digital business card tool",
                    "Extra tools when needed",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#1E2330" }} />
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-xs opacity-60">
                  Result: disconnected branding, fragmented tracking, repeated setup.
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6">
                <div className="text-sm font-bold">Kompi</div>
                <ul className="mt-3 grid gap-2 text-sm opacity-80">
                  {[
                    "One workspace for everything",
                    "One analytics layer for clicks & scans",
                    "One identity (handle + pages + cards)",
                    "Tools library for what you need next",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#D5FF3E" }} />
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-xs opacity-60">
                  Result: clarity, consistency, and faster shipping.
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#1E2330]"
                style={{ backgroundColor: "#D5FF3E" }}
              >
                Start free
              </Link>
              <Link
                href="/kompi-suite"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-6 py-3 text-sm font-semibold"
              >
                Explore the suite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Plans that scale with you
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-75 md:text-base">
              Start free. Upgrade when you’re ready for more capacity and power.
            </p>
          </div>
          <Link href="/pricing" className="text-sm font-semibold opacity-75 hover:opacity-100">
            Full pricing →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={cx(
                "rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6",
                p.featured && "ring-1 ring-[#D5FF3E]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold">{p.name}</div>
                  <div className="mt-2 text-4xl font-extrabold tracking-tight">{p.price}</div>
                  <div className="mt-2 text-sm opacity-75">{p.desc}</div>
                </div>
                {p.featured && (
                  <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-1 text-xs font-semibold opacity-80">
                    Most popular
                  </span>
                )}
              </div>

              <ul className="mt-5 grid gap-2 text-sm opacity-80">
                {p.points.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#A5B0FF" }} />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href={p.href}
                  className={cx(
                    "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold",
                    p.featured
                      ? "text-[#1E2330]"
                      : "border border-[color:var(--color-border)] bg-[color:var(--color-bg)]"
                  )}
                  style={p.featured ? { backgroundColor: "#D5FF3E" } : undefined}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS (clean, no carousel) */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
        <div className="overflow-hidden rounded-[44px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <div className="p-7 md:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              People want clarity. Kompi delivers it.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-75 md:text-base">
              The “wow” is simple: you stop juggling tools and start operating one system.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6"
                >
                  <div className="text-sm leading-relaxed opacity-85">“{t.quote}”</div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs opacity-70">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#1E2330]"
                style={{ backgroundColor: "#D5FF3E" }}
              >
                Start free
              </Link>
              <Link href="/tools" className="text-sm font-semibold opacity-75 hover:opacity-100">
                Explore tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:py-16">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">FAQ</h2>
        <div className="mt-8 grid gap-4">
          {FAQS.map((f) => (
            <div
              key={f.q}
              className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6"
            >
              <div className="text-base font-bold">{f.q}</div>
              <div className="mt-2 text-sm leading-relaxed opacity-80">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-20">
        <div className="overflow-hidden rounded-[44px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <div className="relative p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#A5B0FF]/16 blur-3xl" />
              <div className="absolute -right-24 -bottom-24 h-[420px] w-[420px] rounded-full bg-[#D5FF3E]/12 blur-3xl" />
            </div>

            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Make Kompi your growth home.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-80 md:text-base">
                Start free, claim your handle, and build a setup that’s consistent, trackable, and ready to scale.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#1E2330]"
                  style={{ backgroundColor: "#D5FF3E" }}
                >
                  Start free
                </Link>
                <Link
                  href="/claim"
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-6 py-3 text-sm font-semibold"
                >
                  Claim your handle
                </Link>
                <Link href="/pricing" className="text-sm font-semibold opacity-75 hover:opacity-100">
                  See pricing →
                </Link>
              </div>

              <div className="mt-4 text-xs opacity-60">
                Clean layout now. Visual polish later. This is the “tell the whole story” version.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
