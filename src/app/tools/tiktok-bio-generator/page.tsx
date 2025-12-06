import type { Metadata } from "next";
import Link from "next/link";
import { TikTokBioGenerator } from "@/components/tools/TikTokBioGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free TikTok Bio Generator | Hooks, Vibes & CTAs for Your Profile | Kompi Tools",
  description:
    "Generate TikTok bios with clear hooks, strong vibes, and simple CTAs. Free, no login. Designed for creators, small brands, and anyone in their TikTok era.",
};

const faqs = [
  {
    question: "Is the Kompi TikTok bio generator free?",
    answer:
      "Yes. The TikTok bio generator is free to use as much as you like. No login, no email, and no download required.",
  },
  {
    question: "What kind of TikTok bios can I generate?",
    answer:
      "You can generate chill, high-energy, educational, aesthetic, storytime-style, or CTA-focused bios tailored to your niche and audience.",
  },
  {
    question: "How do I customize the bios?",
    answer:
      "Add your niche, who you’re talking to, and optional keywords or themes. Kompi will build multi-line bios around those details.",
  },
  {
    question: "Will these bios work on other platforms too?",
    answer:
      "Yes. Many people reuse them on Instagram, YouTube Shorts, and other short-form platforms. You can always tweak wording to fit each app.",
  },
  {
    question: "Does Kompi store my bios or text?",
    answer:
      "No. Bios are generated in your browser. Kompi does not store the text you type or the suggestions you copy.",
  },
  {
    question: "Can I add this TikTok bio generator to my Kompi dashboard?",
    answer:
      "Yes. Create a free Kompi account and pin this tool to your dashboard so it’s always one click away while you plan content.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi TikTok Bio Generator",
  url: "https://kompi.app/tools/tiktok-bio-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate TikTok bios with clear hooks, strong vibes, and simple CTAs for your profile.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicTikTokBioGeneratorPage() {
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
            <span>Kompi Tools · TikTok bio generator</span>
          </div>

          <div className="space-y-7 text-[#F9FAFB]">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Give your TikTok{" "}
              <span className="bg-gradient-to-r from-[#00F6C6] via-[#22D3EE] to-[#FF66C4] bg-clip-text text-transparent">
                main character bio energy
              </span>{" "}
              in a few clicks.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#CBD5F5] sm:text-lg">
              Choose a vibe, pick your hook style, describe your corner of
              TikTok, and Kompi will generate bios that actually sound like a
              person — not auto-generated noise.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tiktok-bio-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#F9FAFB] px-7 py-3 text-sm font-medium text-[#020617] shadow-md shadow-black/40 transition hover:bg-white"
              >
                Generate TikTok bios
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
              <span>• Works on desktop, tablet & mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="tiktok-bio-generator-tool"
        className="-mt-10 bg-[#050816] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#22D3EE] bg-gradient-to-b from-[#020617] to-[#050816] p-[1px]">
          <div className="rounded-[1.9rem] bg-[#F7F7F3] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <TikTokBioGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#020617] sm:text-sm">
              BIOS FOR WHATEVER ERA YOU&apos;RE IN
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One TikTok bio generator, three common use cases.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              New account, soft rebrand, or “okay fine, I&apos;m posting here
              now”? Use Kompi to spin up bios that match your current season,
              not who you were two years ago.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FFFFFF] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  PERSONAL & CREATOR ERA
                </p>
                <h3 className="text-xl font-semibold text-[#020617] sm:text-2xl">
                  For your main account
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Explain what you&apos;re about in three lines max — with room
                  for inside jokes and vibes.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Blend niche, personality, and CTAs</li>
                  <li>• Try chill, high-energy, or storytime vibes</li>
                  <li>• Keep it short enough to read in a glance</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#020617] bg-white px-4 py-2.5 text-xs font-medium text-[#020617] hover:bg-[#F3F4F6]">
                Draft my creator bio
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
                  For products, services & offers
                </h3>
                <p className="text-sm text-[#E5E7EB] sm:text-base">
                  Make it obvious what you sell and who it&apos;s for without
                  sounding like corporate ad copy.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#E5E7EB]">
                  <li>• Call out your audience clearly</li>
                  <li>• Test multiple hook styles</li>
                  <li>• Swap bios between campaigns in seconds</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#00F6C6] px-4 py-2.5 text-xs font-semibold text-[#020617] hover:bg-[#5DFCE0]">
                Write my offer-first bio
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E5E7FF] p-7 ring-1 ring-[#C4B5FD]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#4C1D95]">
                  CLIENT & GHOSTPOSTING
                </p>
                <h3 className="text-xl font-semibold text-[#020617] sm:text-2xl">
                  For client profiles
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Running TikToks for clients? Use Kompi to spin up on-brand
                  bios for each account in a few minutes.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Match client tone without guesswork</li>
                  <li>• Keep a few options per positioning</li>
                  <li>• Reuse setups across similar niches</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#4C1D95] bg-[#4C1D95] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3B0D71]">
                Create client-ready bios
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
              Your FYP doesn&apos;t have to guess what you&apos;re here for.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base">
              Use Kompi to get a handful of bios that make your niche, vibe, and
              offers obvious — then go back to filming instead of overthinking
              your profile.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tiktok-bio-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#020617] px-6 py-2.5 text-xs font-semibold text-[#F9FAFB] hover:bg-black"
              >
                Generate TikTok bios
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
            Bios that plug straight into the rest of your Kompi workflow.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E0F2FE] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#020617] sm:text-sm">
                FOR CREATORS & SOLO FOUNDERS
              </p>
              <h3 className="text-2xl font-semibold text-[#020617] sm:text-3xl">
                Keep your TikTok bio, link page, and QR codes synced.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use Kompi to write your bio, then pair it with a Kompi link
                page and scannable QR codes so every clip has a clear next step.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#6B7280]">
                  Bio, link-in-bio, QR menus, and analytics — all under the same
                  roof.
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#FDE68A] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 rounded-[2rem] bg-[#FEFCE8] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#4B5563]">
                  Use it live in positioning workshops and offer-mapping sessions.
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E293B] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#020617] sm:text-3xl">
                Make “what goes in the bio?” a five-minute decision.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Generate multiple bio options while you&apos;re on a call,
                align on tone and focus, and walk away with copy you can update
                as offers evolve.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#020617] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#22D3EE] sm:text-sm">
                FOR ANYONE TESTING TIKTOK SERIOUSLY
              </p>
              <h3 className="text-2xl font-semibold text-[#F9FAFB] sm:text-3xl">
                One tiny tool to make your profile feel “ready enough” to start.
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E7EB] sm:text-base">
                You don&apos;t need the perfect bio before you post. You just
                need something clear, intentional, and easy to tweak later. Kompi
                gives you that starting point.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#020617] ring-1 ring-[#22D3EE]/40 sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#E5E7EB]">
                  Built to support experiments, pivots, and new eras — not lock
                  you in.
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
              LESS BIO STRESS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less “idk what to put here”, more “okay, that actually fits”.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#020617] p-5 ring-1 ring-[#1E293B]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#F9FAFB]">
                “Made starting a TikTok page way less scary”
              </p>
              <p className="mt-2 text-xs text-[#CBD5F5]">
                “I stopped waiting for the perfect idea and picked a bio that
                felt 80% right. That was enough to finally post.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#020617] p-5 ring-1 ring-[#1E293B]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#F9FAFB]">
                “Great for client accounts”
              </p>
              <p className="mt-2 text-xs text-[#CBD5F5]">
                “We run multiple client profiles and this helps us spin up
                positioning that fits each one without staring at a blank field.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#020617] p-5 ring-1 ring-[#1E293B]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#F9FAFB]">
                “Doesn&apos;t feel like generic AI fluff”
              </p>
              <p className="mt-2 text-xs text-[#CBD5F5]">
                “The bios feel specific, not just ‘hustle’ and random emojis.”
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
              Questions about the Kompi TikTok bio generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they make this part of
              their profile setup whenever they launch or refresh an account.
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
