// src/app/tools/username-generator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { UsernameGenerator } from "@/components/tools/UsernameGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Username Generator | Create Brandable Usernames & Social Handles | Kompi Tools",
  description:
    "Generate clean, brandable usernames and social media handles with Kompi's free username generator. Perfect for creators, brands, gamertags, TikTok, Instagram, YouTube and more.",
};

const faqs = [
  {
    question: "Is the Kompi username generator free?",
    answer:
      "Yes. The Kompi username generator is free to use as many times as you like. No account, no signup, and no email required.",
  },
  {
    question: "What kind of usernames can I generate?",
    answer:
      "You can generate clean, playful, or edgy usernames and social handles. It works well for creators, brands, personal accounts, gamertags, and side projects.",
  },
  {
    question: "Can I add my own word or name?",
    answer:
      "Yes. Add a base word like your name, brand, or niche, and Kompi will build username ideas around it. Or leave it blank to generate names from scratch.",
  },
  {
    question: "Are the usernames guaranteed to be available?",
    answer:
      "No tool can guarantee availability. Kompi gives you ideas that are more likely to be unique, but you should still check them on the platforms you care about.",
  },
  {
    question: "Can I use this for TikTok, Instagram, and YouTube?",
    answer:
      "Yes. Many people use this username generator to find handles for TikTok, Instagram, YouTube, Twitch, X, and more. Just copy your favorite ideas and test them on each platform.",
  },
  {
    question: "Does Kompi store the usernames I generate?",
    answer:
      "No. Suggestions are generated in your browser. Kompi does not store or log the usernames you generate or the base words you type.",
  },
  {
    question: "Can I control the style and length of usernames?",
    answer:
      "Yes. You can choose a vibe (clean, playful, or edgy), pick a length, and optionally allow dots, underscores, and numbers for more variety.",
  },
  {
    question: "Can I add this username generator to my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can pin the username generator as a tool inside your dashboard so it’s always one click away.",
  },
  {
    question: "How does this fit into the rest of Kompi?",
    answer:
      "Kompi helps creators and small teams share what they make with links, QR codes, and tools. The username generator is one of several small utilities that support your brand and content.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Username Generator",
  url: "https://kompi.app/tools/username-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate clean, brandable usernames and social handles with Kompi's free username generator.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicUsernameGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#006B81] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Username generator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Find{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                the perfect username
              </span>{" "}
              for your next account in a few clicks.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Type a word, pick a vibe, and generate clean, brandable usernames
              for TikTok, Instagram, YouTube, Twitch, and more. No spreadsheets,
              no overthinking—just ideas you actually want to use.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#username-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Generate usernames
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
              <span>• Works on desktop, tablet & mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="username-generator-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <UsernameGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              NAMES FOR WHATEVER YOU&apos;RE BUILDING
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One username generator, three common use cases.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              New account? New project? New channel? Use Kompi to spin up
              handles that feel on-brand, easy to say out loud, and easy to
              remember.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  PERSONAL & CREATOR
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For your main handle
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Find usernames that feel like you, not auto-generated noise.
                  Great for creators, freelancers, and solo founders.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Combine your name + niche</li>
                  <li>• Pick a clean or playful vibe</li>
                  <li>• Keep it short and easy to spell</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Name my main account
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
                  For new brands & projects
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Spin up brandable handles for studios, newsletters, shops, or
                  side projects before you commit to a name.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Explore clean, studio-like names</li>
                  <li>• Generate multiple angles around your idea</li>
                  <li>• Check which ones feel good out loud</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Brainstorm brand usernames
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  GAMING & ALT ACCOUNTS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  For gamertags & alts
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Need a fun or edgier username? Switch to the “edgy” vibe and
                  mix numbers, dots, and underscores.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Great for Twitch & gaming</li>
                  <li>• More playful or chaotic options</li>
                  <li>• Still readable and pronounceable</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#034557]">
                Generate gamertag ideas
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
              Ready to stop staring at the “username” field?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              Use Kompi&apos;s free username generator now, then pin it to your
              Kompi dashboard so it&apos;s always one click away when you&apos;re
              setting up new accounts.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#username-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg-black"
              >
                Generate usernames
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
            Names that match the rest of your online world.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E3F2FF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR CREATORS & SOLO FOUNDERS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Keep your handle, bio, and links pointing in the same direction.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use Kompi to pick a username, then pair it with a Kompi link
                page and QR codes so your audience always knows where to go
                next.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                  Handle + link-in-bio preview
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#9BDFD1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#0F172A]">
                  Great for teams & client projects
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Make new brand launches feel more intentional.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Use the username generator during naming workshops and kickoff
                calls to quickly test handles that match the brand direction.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#006B81] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E3F2FF] sm:text-sm">
                FOR ANYONE STARTING SOMETHING NEW
              </p>
            <h3 className="text-2xl font-semibold text-[#E3F2FF] sm:text-3xl">
                A tiny push that makes starting way less awkward.
              </h3>
            <p className="text-sm leading-relaxed text-[#E3F2FF] sm:text-base">
                A good username isn&apos;t everything, but it helps you feel
                more confident hitting “publish”. Kompi gives you a starting
                point that doesn&apos;t feel random or embarrassing.
            </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#0B1220] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#E5E7EB]">
                  Kompi tools ecosystem
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
              NERVOUS FIELD, CALMER EXPERIENCE
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less blank-field anxiety, more “this could work”.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Helped me finally pick a handle”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “I&apos;d been stuck on a username for weeks. Ten minutes here and
                I had three I actually liked.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for client socials”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We use this in naming and social handle workshops. It speeds
                up the boring part so we can talk about brand direction.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Feels less spammy than other generators”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “I like that it favors readable, brand-y names instead of super
                random strings of letters.”
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
              Questions about the Kompi username generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they make this part of
              their setup whenever they start something new.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
