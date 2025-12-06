import type { Metadata } from "next";
import Link from "next/link";
import { InstagramCaptionGenerator } from "@/components/tools/InstagramCaptionGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Instagram Caption Generator | Hooks, CTAs & Hashtags | Kompi Tools",
  description:
    "Generate Instagram captions with strong hooks, CTAs, and hashtag ideas tailored to your niche. Free, no login. Perfect for Reels, posts, stories, and carousels.",
};

const faqs = [
  {
    question: "Is the Kompi Instagram caption generator free?",
    answer:
      "Yes. It’s completely free to use and runs in your browser. No signup or email required.",
  },
  {
    question: "What types of captions can I generate?",
    answer:
      "You can generate captions for feed posts, Reels, stories, and carousels with different tones and lengths.",
  },
  {
    question: "Can I control the tone and length?",
    answer:
      "Yes. Pick a tone like Educational, Friendly, Playful, Aesthetic, Storytelling, or CTA-focused, and choose between short, medium, or long captions.",
  },
  {
    question: "Does it support hashtags?",
    answer:
      "Yes. Turn on hashtag suggestions and Kompi will generate simple, on-topic hashtags based on your topic and keywords.",
  },
  {
    question: "Can I add my own call to action?",
    answer:
      "Yes. Add a custom CTA like “Comment MORNING for the checklist” or leave it blank to let Kompi suggest one.",
  },
  {
    question: "Can I add this caption generator to my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can pin the caption generator so it’s always one click away while you’re planning posts.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Instagram Caption Generator",
  url: "https://kompi.app/tools/instagram-caption-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate Instagram captions with strong hooks, CTAs, and hashtags tailored to your niche.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicInstagramCaptionGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-7rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#FF66C4] via-[#FF8AE2] to-[#FFD6F6] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] ring-1 ring-[#FFE0F5]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FF66C4] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Instagram caption generator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn{" "}
              <span className="bg-gradient-to-r from-[#FF66C4] to-[#FF8AE2] bg-clip-text text-transparent">
                “caption later”
              </span>{" "}
              drafts into posts you actually hit publish on.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Choose your tone, post type, and topic. Kompi generates hooks,
              body copy, CTAs, and simple hashtag ideas so you can stop staring
              at the caption field and start posting.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#instagram-caption-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
              >
                Generate Instagram captions
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#FFE0F5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                Runs 100% in your browser
              </div>
              <span>• No login or email required</span>
              <span>• Works for posts, Reels, stories & carousels</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="instagram-caption-generator-tool"
        className="-mt-10 bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#FF8AE2] bg-[#FFFFFF] p-[1px]">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <InstagramCaptionGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              CAPTIONS FOR EVERY KIND OF POST
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One caption generator, three common posting modes.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Whether you&apos;re batch-planning carousels, posting Reels from
              your camera roll, or just sharing a single photo — Kompi gives you
              a few strong starting points instead of a blinking cursor.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  FEED POSTS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For everyday posts
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Turn simple photos into posts that explain the story behind
                  them without writing essays.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Write short, thoughtful updates</li>
                  <li>• Keep hooks clear and human</li>
                  <li>• Save your favorite structures</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Draft a feed caption
              </button>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FFE6F7] p-7 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For Reels & launch content
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Strong hooks and CTAs for Reels, launches, and educational
                  content that needs more context than the video can give.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Pick Educational, Storytelling, or CTA-focused</li>
                  <li>• Add launch details or discount codes</li>
                  <li>• Batch captions for your next drop</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Plan my next Reel captions
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FDECF8] p-7 ring-1 ring-[#F9A8D4]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9D174D]">
                  STORIES & CAROUSELS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For story rounds & mini-threads
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Use Kompi as a caption skeleton when you&apos;re posting story
                  sequences or carousels that need structure.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Get simple “frame-by-frame” guidance</li>
                  <li>• Keep CTAs consistent across slides</li>
                  <li>• Reuse captions as email or post hooks</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#9D174D] bg-[#9D174D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#7F1239]">
                Write story-style captions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRIGHT STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#FF66C4] px-8 py-10 text-center text-[#FDF2FF] sm:px-12">
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Your drafts folder doesn&apos;t need more “caption later” posts.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base">
              Use Kompi to generate a small stack of captions you can actually
              see yourself posting. Pick one, tweak a word or two, and move on
              to the next idea.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#instagram-caption-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black"
              >
                Generate Instagram captions
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#FDF2FF] bg-transparent px-6 py-2.5 text-xs font-medium text-[#FDF2FF] hover:bg-[#FDF2FF]/10"
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
            Captions that match the rest of your Kompi stack.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E5ECFF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR CREATORS & SOLO FOUNDERS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Keep your hooks, bios, and links pointing in the same direction.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use Kompi to pair clear captions with your Kompi link page and
                QR codes, so every post leads somewhere specific.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#6B7280]">
                  Bio, captions, link-in-bio, and QR — all aligned inside Kompi.
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#FFE4F1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#4B5563]">
                  Use it live during content planning and launch calls.
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Make caption writing part of your system, not a last-minute task.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Generate multiple options while you&apos;re in the room with a
                client, align on tone, and walk away with a mini caption bank
                for the next campaign.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#111827] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F9A8D4] sm:text-sm">
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
              <div className="h-56 w-56 rounded-[2rem] bg-[#020617] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#E5E7EB]">
                  Built to support your posting habit, not replace your voice.
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
              LESS CAPTION STRESS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less “what do I say here?”, more “okay, this works”.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Batching captions finally feels doable”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “I plan a week of posts in one sitting now. The generator gives
                me starting points so I&apos;m not inventing everything from
                scratch.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great balance of hooky and human”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “The captions feel like something I&apos;d actually say, not
                hyper-viral internet voice.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Clients love seeing options”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We generate 4–5 options on a call, pick our favorites, and
                then refine. Makes collaboration much smoother.”
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
              Questions about the Kompi Instagram caption generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before making this part of
              their content planning routine.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F7F7F3] p-5 text-sm"
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
