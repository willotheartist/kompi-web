import type { Metadata } from "next";
import Link from "next/link";
import { HashtagGenerator } from "@/components/tools/HashtagGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Hashtag Generator | Instagram, TikTok & YouTube Tags | Kompi Tools",
  description:
    "Generate balanced hashtag sets for Instagram, TikTok, and YouTube. Mix niche, reach, and branded tags in a few clicks. Free, no login.",
  alternates: {
    canonical: "https://kompi.app/tools/hashtag-generator",
  },
};

const faqs = [
  {
    question: "Is the Kompi hashtag generator free?",
    answer:
      "Yes. The hashtag generator is free to use as many times as you’d like. No account, no email, and no download required.",
  },
  {
    question: "Which platforms does this hashtag generator work for?",
    answer:
      "You can generate hashtag sets for Instagram, TikTok, YouTube, or generic content. Each platform uses slightly different base tags.",
  },
  {
    question: "Can I control how many hashtags I get?",
    answer:
      "Yes. You can pick roughly how many tags you want in each set (around 12, 18, or 24).",
  },
  {
    question: "Does this guarantee reach or virality?",
    answer:
      "No hashtag tool can guarantee results. Kompi focuses on giving you clean, sensible tag sets so you can show up consistently without spamming.",
  },
  {
    question: "Can I add my brand or handle?",
    answer:
      "Yes. Add your brand or handle and Kompi will generate light branded tags you can keep using across posts.",
  },
  {
    question: "Can I add this hashtag generator to my Kompi dashboard?",
    answer:
      "Yes. With a free Kompi account you can pin the hashtag generator as a tool inside your dashboard so it’s always one click away.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Hashtag Generator",
  url: "https://kompi.app/tools/hashtag-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate balanced hashtag sets for Instagram, TikTok, and YouTube in a few clicks.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicHashtagGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#E8F739] to-[#9BDFD1] opacity-70" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-[#F7F7F3]">
              #
            </span>
            <span>Kompi Tools · Hashtag generator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Build{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                clean hashtag sets
              </span>{" "}
              without scrolling endless lists.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Pick a platform, goal, and content type, then describe your post.
              Kompi generates niche, balanced, and reach-focused hashtag sets in
              one place — no spreadsheets or random generators needed.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#hashtag-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Generate hashtag sets
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Runs 100% in your browser
              </div>
              <span>• No login or email required</span>
              <span>• Works for Instagram, TikTok & YouTube</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="hashtag-generator-tool"
        className="-mt-10 bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/20">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <HashtagGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              TAGS THAT MATCH HOW YOU POST
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One hashtag generator, three common posting modes.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Whether you&apos;re posting daily, batching content for launches,
              or managing client accounts, Kompi gives you sensible starting
              points instead of guesswork.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  DAILY POSTING
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For your everyday posts
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Create a few go-to sets you can reuse across photo posts,
                  carousels, and quick updates.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Keep tags consistent without overthinking</li>
                  <li>• Mix niche and general tags</li>
                  <li>• Save your favorite combos in Kompi</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Build a daily set
              </button>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For Reels, Shorts & TikToks
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Generate sets tuned for short-form posts with a mix of reach
                  and relevance.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Pick the platform and goal</li>
                  <li>• Add a topic once, reuse the sets</li>
                  <li>• Quickly swap between reach and niche modes</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Make tags for my Reels
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  CLIENT & CAMPAIGN WORK
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For brands & launches
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Build a few sets per client or campaign and keep them handy
                  while you schedule content.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Add brand handles for consistent tags</li>
                  <li>• Create dedicated sets per offer</li>
                  <li>• Use niche-focused groups for loyal audiences</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#034557]">
                Plan campaign hashtags
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRIGHT STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#E8F739] px-8 py-10 text-center shadow-md sm:px-12">
            <h2 className="text-xl font-semibold text-[#1E2330] sm:text-2xl md:text-3xl">
              Your content system is allowed to be simple.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              Use Kompi to build a few reusable hashtag sets per format. Then
              spend your energy on ideas, not tag spreadsheets.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#hashtag-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg-black"
              >
                Generate hashtag sets
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-6 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]"
              >
                Create free Kompi account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PANELS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Hashtags that plug into the rest of your Kompi workflow.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E3F2FF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR CREATORS & SOLO FOUNDERS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Keep your bios, links, and tags aligned.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use Kompi to pair clean hashtag sets with your Instagram bios,
                link-in-bio pages, QR menus, and branded short links — so every
                post points in the same direction.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#6B7280]">
                  Bios, hashtags, link pages, and QR codes — all living inside
                  one Kompi workspace.
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#FEF3C7] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#FFFBEB] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#4B5563]">
                  Use it live during content planning, launch mapping, and
                  client strategy calls.
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1F2937] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Make tags part of a repeatable content system.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Generate a few trusted sets per client, then reuse them across
                posts instead of reinventing tags for every upload. Edit as you
                learn what actually performs.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#006B81] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E3F2FF] sm:text-sm">
                FOR ANYONE WHO&apos;S TIRED OF GUESSING
              </p>
              <h3 className="text-2xl font-semibold text-[#E3F2FF] sm:text-3xl">
                Less random lists, more “this actually fits my niche”.
              </h3>
              <p className="text-sm leading-relaxed text-[#E3F2FF] sm:text-base">
                You&apos;re closer than you think. A few consistent, intentional
                hashtag sets beat constantly chasing whatever looks “viral”
                today.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#0B1220] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#E5E7EB]">
                  Kompi is built to support calm, repeatable content habits —
                  not just spikes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL ROW */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              LESS TAG SPAM, MORE INTENTION
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less “copy paste random tags”, more “this feels like my corner of the internet”.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Stopped using giant copy-paste lists”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “Now I have 3–4 sets I swap between instead of 30 random tags
                under every post.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for client accounts”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We build hashtag presets per client and reuse them in our
                scheduler. Way calmer.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Feels like it understands the niche”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “The sets actually sound like my corner of the internet instead
                of generic ‘#hustle’ tags.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi hashtag generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they plug this into
              their content system.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E3F2FF] bg-[#F7F7F3] p-5 text-sm"
              >
                <h3 className="mb-1 text-sm font-medium text-[#1E2330] sm:text-base">
                  {item.question}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global footer CTA */}
      <FooterCTA />

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
