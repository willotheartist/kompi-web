// src/app/tools/instagram-bio-generator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { InstagramBioGenerator } from "@/components/tools/InstagramBioGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Instagram Bio Generator | Aesthetic, Playful & Professional Bios | Kompi Tools",
  description:
    "Generate aesthetic, playful, or professional Instagram bios tailored to your niche in a few clicks. Free, no login. Perfect for creators, small brands, and personal accounts.",
  alternates: {
    canonical: "https://kompi.app/tools/instagram-bio-generator",
  },
};

const faqs = [
  {
    question: "Is the Kompi Instagram bio generator free?",
    answer:
      "Yes. The Kompi Instagram bio generator is completely free to use, with no login, signup, or email required.",
  },
  {
    question: "Can I tailor bios to my niche?",
    answer:
      "Yes. Add your niche and optional keywords and Kompi will generate bios around what you do — whether you're a fitness coach, designer, café owner, or creator.",
  },
  {
    question: "What kind of tones can I generate?",
    answer:
      "You can switch between Professional, Friendly, Playful, Aesthetic, CTA-focused, and Short & punchy tones with a single click.",
  },
  {
    question: "How do I use the bios?",
    answer:
      "Tap any suggestion to copy it, then paste directly into your Instagram profile. You can edit the wording further if you like.",
  },
  {
    question: "Does Kompi store my bios or text?",
    answer:
      "No. Suggestions are generated in your browser. Kompi does not store the text you enter or the bios you generate.",
  },
  {
    question: "Can I add this tool to my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can pin this bio generator as a tool inside your dashboard so it's always one click away.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Instagram Bio Generator",
  url: "https://kompi.app/tools/instagram-bio-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate aesthetic, playful, or professional Instagram bios tailored to your niche in a few clicks.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicInstagramBioGeneratorPage() {
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
            <span>Kompi Tools · Instagram bio generator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Write{" "}
              <span className="bg-gradient-to-r from-[#FF66C4] to-[#FF8AE2] bg-clip-text text-transparent">
                an Instagram bio that actually feels like you
              </span>{" "}
              — in a few clicks.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Choose your tone, add your niche, sprinkle in a few keywords, and
              Kompi will generate a stack of aesthetic, playful, or
              professional bios you&apos;ll actually want to use.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#instagram-bio-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
              >
                Generate Instagram bios
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
              <span>• Works on desktop, tablet & mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="instagram-bio-generator-tool"
        className="-mt-10 bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#FF66C4] bg-[#FFFFFF] p-[1px]">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <InstagramBioGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              BIOS FOR WHATEVER YOU&apos;RE BUILDING
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One bio generator, three common use cases.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              New account? Rebrand? Side project? Use Kompi to spin up bios that
              make sense for where you&apos;re at — not just random emoji soup.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  PERSONAL & CREATOR
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For your main account
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Show your personality without sounding cringe. Perfect for
                  creators, freelancers, and solo founders.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Mix your niche, vibe, and interests</li>
                  <li>• Keep it short and scannable</li>
                  <li>• Save the ones you like as drafts</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Draft my personal bio
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
                  For new brands & projects
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Test multiple directions for a brand before you commit. Pair
                  your bio with a Kompi link page and QR codes in seconds.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Explore clean, studio-like intros</li>
                  <li>• Try CTA-focused or short & punchy options</li>
                  <li>• Keep everything consistent across platforms</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg_black">
                Brainstorm brand bios
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FDECF8] p-7 ring-1 ring-[#F9A8D4]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9D174D]">
                  CLIENT & COLLAB WORK
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For client profiles
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Running socials for clients? Use Kompi to create on-brand bios
                  that feel aligned with their positioning.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Capture each client&apos;s tone in minutes</li>
                  <li>• Keep a few variations per campaign</li>
                  <li>• Reuse setups for future projects</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#9D174D] bg-[#9D174D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#7F1239]">
                Create client-ready bios
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
              Stop rewriting your Instagram bio every time you launch something.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base">
              Kompi gives you a small stack of bios that all feel on-brand — so
              you can pick one, tweak a word or two, and get back to making
              things.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify_center gap-3">
              <a
                href="#instagram-bio-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black"
              >
                Generate Instagram bios
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
            Bios that match the rest of your Kompi setup.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E5ECFF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR CREATORS & SOLO FOUNDERS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Keep your bio, links, and QR codes telling the same story.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use Kompi to write a clear bio, then pair it with a Kompi link
                page and scannable QR codes so your audience always knows where
                to go next.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#6B7280]">
                  Bio + link-in-bio + QR workflow, all inside Kompi.
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#FFE4F1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#4B5563]">
                  Use it live during naming and positioning workshops.
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Make profile setup part of your process, not an afterthought.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Use the generator on calls to quickly test different
                positioning, align on tone, and send clients multiple bio
                options they can choose from.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#111827] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F9A8D4] sm:text-sm">
                FOR ANYONE STARTING SOMETHING NEW
              </p>
              <h3 className="text-2xl font-semibold text-[#F9FAFB] sm:text-3xl">
                A tiny tool that makes hitting “edit profile” way less awkward.
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E7EB] sm:text-base">
                Your first bio doesn&apos;t have to be perfect — it just needs to be
                clear enough to get you moving. Kompi gives you a starting point
                that feels intentional instead of random.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#020617] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#E5E7EB]">
                  Kompi tools designed for tiny, confidence-boosting wins.
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
              CALMER PROFILE SETUP
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less blank-profile anxiety, more “okay, this actually feels right”.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Finally stopped rewriting my bio weekly”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “Having 6–8 options in front of me made it so much easier to
                pick one and move on.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for client profiles”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We use this whenever we launch a new account. It saves
                everyone&apos;s brainpower for content instead of bios.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Doesn&apos;t feel like spammy AI”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “The bios feel simple and on-brand, not like a robot trying to
                impress me.”
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
              Questions about the Kompi Instagram bio generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they make this part of
              their setup whenever they launch a new account or project.
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
