import type { Metadata } from "next";
import Link from "next/link";
import { TikTokCaptionGenerator } from "@/components/tools/TikTokCaptionGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free TikTok Caption Generator | Hooks, CTAs & Hashtags | Kompi Tools",
  description:
    "Generate TikTok captions with hooks, CTAs, and simple hashtag blocks tailored to your niche. Free, no login. Built for creators, brands, and anyone taking TikTok seriously.",
};

const faqs = [
  {
    question: "Is the Kompi TikTok caption generator free?",
    answer:
      "Yes. It’s completely free to use and runs in your browser. No signup or email required.",
  },
  {
    question: "What types of TikTok captions can I generate?",
    answer:
      "You can generate captions for tips, tutorials, day-in-the-life content, before/after videos, and mini-rants with different vibes and lengths.",
  },
  {
    question: "Can I control the tone and length?",
    answer:
      "Yes. Pick a vibe like Chill, High energy, Educational, Aesthetic, Storytime, or Promo, and choose between short, medium, or long captions.",
  },
  {
    question: "Does it add hashtags for me?",
    answer:
      "Yes. Turn on the hashtag block toggle and Kompi will generate simple, on-topic hashtags based on your topic and keywords.",
  },
  {
    question: "Can I use this with offers and launches?",
    answer:
      "Yes. Add what you’re promoting and choose the Promo vibe to get softer, offer-aware caption ideas you can plug into campaigns.",
  },
  {
    question: "Can I add this TikTok caption generator to my Kompi dashboard?",
    answer:
      "Yes. Create a free Kompi account and pin this tool so it’s always one click away while you plan videos, links, and QR codes.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi TikTok Caption Generator",
  url: "https://kompi.app/tools/tiktok-caption-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate TikTok captions with hooks, CTAs, and on-topic hashtags for your videos.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicTikTokCaptionGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-7rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#00F6C6] via-[#22D3EE] to-[#FF66C4] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#020617] px-4 py-1.5 text-xs font-medium text-[#E5E7EB] ring-1 ring-[#22D3EE]/40">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#00F6C6] text-[10px] font-semibold text-[#020617]">
              K
            </span>
            <span>Kompi Tools · TikTok caption generator</span>
          </div>

          <div className="space-y-7 text-[#F9FAFB]">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn{" "}
              <span className="bg-gradient-to-r from-[#00F6C6] via-[#22D3EE] to-[#FF66C4] bg-clip-text text-transparent">
                “caption later”
              </span>{" "}
              drafts into posts your FYP actually understands.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#CBD5F5] sm:text-lg">
              Choose a vibe, video type, and topic. Kompi generates hooks, body
              copy, CTAs, and simple hashtag blocks so you spend less time
              staring at the caption field and more time filming.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tiktok-caption-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#F9FAFB] px-7 py-3 text-sm font-medium text-[#020617] shadow-md shadow-black/40 transition hover:bg-white"
              >
                Generate TikTok captions
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#F9FAFB]/70 bg-transparent px-7 py-3 text-sm font-medium text-[#F9FAFB] shadow-sm hover:bg-[#0B1120]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#9CA3AF] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#020617] px-3 py-1 ring-1 ring-[#22D3EE]/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                Runs 100% in your browser
              </div>
              <span>• No login or email required</span>
              <span>• Works for tips, tutorials, storytime & more</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="tiktok-caption-generator-tool"
        className="-mt-10 bg-[#050816] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#22D3EE] bg-gradient-to-b from-[#020617] to-[#050816] p-[1px]">
          <div className="rounded-[1.9rem] bg-[#F7F7F3] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <TikTokCaptionGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#020617] sm:text-sm">
              CAPTIONS FOR EVERY KIND OF VIDEO
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One TikTok caption generator, three common posting modes.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Whether you&apos;re filming quick tips, cozy routines, or low-key
              launch content — Kompi gives you a few strong starting points
              instead of a blinking cursor.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FFFFFF] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  DAILY POSTING
                </p>
                <h3 className="text-xl font-semibold text-[#020617] sm:text-2xl">
                  For everyday clips
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Turn simple clips into posts that explain the story behind
                  them without writing essays.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Keep captions casual but clear</li>
                  <li>• Mix Chill and Storytime vibes</li>
                  <li>• Save your favorite structures</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#020617] bg-white px-4 py-2.5 text-xs font-medium text-[#020617] hover:bg-[#F3F4F6]">
                Draft a daily caption
              </button>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#020617] p-7 ring-2 ring-[#00F6C6]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#00F6C6] px-3 py-1 text-[11px] font-semibold text-[#020617]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#F9FAFB] sm:text-2xl">
                  For tutorials & tip series
                </h3>
                <p className="text-sm text-[#E5E7EB] sm:text-base">
                  Strong hooks and CTAs for educational content that needs more
                  context than the video alone can give.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#E5E7EB]">
                  <li>• Choose Educational or High energy</li>
                  <li>• Add details or keywords once</li>
                  <li>• Batch captions for your next series</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#00F6C6] px-4 py-2.5 text-xs font-semibold text-[#020617] hover:bg-[#5DFCE0]">
                Plan my tutorial captions
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E0F2FE] p-7 ring-1 ring-[#93C5FD]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1D4ED8]">
                  LAUNCHES & SOFT PROMOS
                </p>
                <h3 className="text-xl font-semibold text-[#020617] sm:text-2xl">
                  For drops & offers
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Make it obvious what you&apos;re offering without sounding
                  like a billboard.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Add your product or offer once</li>
                  <li>• Use the Promo vibe for softer sales</li>
                  <li>• Swap captions between angles in seconds</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1D4ED8] bg-[#1D4ED8] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1E40AF]">
                Write launch captions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRIGHT STRIP */}
      <section className="bg-[#020617] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-gradient-to-r from-[#00F6C6] via-[#22D3EE] to-[#FF66C4] px-8 py-10 text-center text-[#020617] sm:px-12">
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Your camera roll is full of good clips. The captions shouldn&apos;t be the bottleneck.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base">
              Use Kompi to generate a tiny stack of captions for each video,
              pick one that feels right, tweak a few words, and move on to the
              next idea.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tiktok-caption-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#020617] px-6 py-2.5 text-xs font-semibold text-[#F9FAFB] hover:bg-black"
              >
                Generate TikTok captions
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#020617] bg-transparent px-6 py-2.5 text-xs font-medium text-[#020617] hover:bg-[#020617]/10"
              >
                Create free Kompi account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PANELS */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Captions that plug into the rest of your Kompi stack.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E0F2FE] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#020617] sm:text-sm">
                FOR CREATORS & SOLO FOUNDERS
              </p>
              <h3 className="text-2xl font-semibold text-[#020617] sm:text-3xl">
                Keep your hooks, bios, and links moving in the same direction.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use Kompi to pair clear captions with your TikTok bio, Kompi
                link page, and QR codes so every video leads somewhere specific.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#6B7280]">
                  Bio, captions, link-in-bio, and QR — all updating together
                  inside Kompi.
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#FEF3C7] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 rounded-[2rem] bg-[#FFFBEB] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#4B5563]">
                  Use it live in launch planning calls and content sprints.
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1F2937] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#020617] sm:text-3xl">
                Make “what&apos;s the caption?” a structured, five-minute step.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Generate multiple angles on a call, align on which hooks you
                like, and turn those into reusable caption patterns across
                campaigns and clients.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#020617] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#22D3EE] sm:text-sm">
                FOR ANYONE TRYING TO POST MORE
              </p>
              <h3 className="text-2xl font-semibold text-[#F9FAFB] sm:text-3xl">
                Tiny tools that make consistency feel less painful.
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E7EB] sm:text-base">
                You don&apos;t need a hundred viral hooks. You just need a few
                clear ways to talk about what you do. Kompi keeps them within
                reach so you can post more often without burning out.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#020617] ring-1 ring-[#22D3EE]/40 sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#E5E7EB]">
                  Built to support your posting habit, not replace your voice.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL ROW */}
      <section className="bg-[#050816] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center text-[#F9FAFB]">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#64748B] sm:text-sm">
              LESS CAPTION STRESS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less “what do I say here?”, more “okay, this works”.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#020617] p-5 ring-1 ring-[#1E293B]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#F9FAFB]">
                “Batching TikToks finally feels doable”
              </p>
              <p className="mt-2 text-xs text-[#CBD5F5]">
                “I plan a week of videos in one sitting now. The generator gives
                me starting points so I&apos;m not inventing everything from
                scratch.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#020617] p-5 ring-1 ring-[#1E293B]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#F9FAFB]">
                “Captions feel like me, not AI voice”
              </p>
              <p className="mt-2 text-xs text-[#CBD5F5]">
                “They&apos;re close enough that I just tweak a few words and
                hit post.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#020617] p-5 ring-1 ring-[#1E293B]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#F9FAFB]">
                “Huge time-saver for client work”
              </p>
              <p className="mt-2 text-xs text-[#CBD5F5]">
                “We generate 5–6 options on a call, clients pick their favorites,
                and we refine from there. Way smoother than starting from zero.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F7F3] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi TikTok caption generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they make this part of
              their content planning routine.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 text-sm"
              >
                <h3 className="mb-1 text-sm font-medium text-[#020617] sm:text-base">
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
