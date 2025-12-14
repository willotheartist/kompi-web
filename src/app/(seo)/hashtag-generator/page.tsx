// src/app/(seo)/hashtag-generator/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Hash,
  Layers,
  BarChart3,
  Wand2,
  Instagram,
  Youtube,
  MessageCircle,
  CheckCircle2,
  ArrowUpRight,
  Target,
  BadgeCheck,
  ClipboardCopy,
  TrendingUp,
  Shield,
  Zap,
  Quote,
  Share2,
  Rocket,
  Link2,
  HelpCircle,
  LibraryBig,
  Scale,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import HashtagGenerator from "@/components/tools/HashtagGenerator";

const DOMAIN = "https://kompi.app";
const SLUG = "hashtag-generator";
const CANONICAL_URL = `${DOMAIN}/${SLUG}`;
const OG_IMAGE = `${DOMAIN}/og/${SLUG}.png`;
const SEO_VIDEO_SRC = `/seo/${SLUG}.mp4`;
const SEO_VIDEO_ABS = `${DOMAIN}${SEO_VIDEO_SRC}`;

const BRAND_NAME = "Kompi";
const PRIMARY_KEYWORD = "hashtag generator";

const LSI_KEYWORDS: string[] = [
  "hashtag generator",
  "free hashtag generator",
  "instagram hashtag generator",
  "tiktok hashtag generator",
  "youtube hashtag generator",
  "best hashtags for instagram",
  "trending hashtags",
  "hashtag ideas",
  "hashtag research tool",
  "hashtag strategy",
  "viral hashtags",
  "niche hashtags",
  "small business hashtags",
  "creator hashtags",
  "branded hashtags",
  "social media marketing hashtags",
  "hashtag sets",
  "hashtag copy and paste",
];

export const metadata: Metadata = {
  title: "Hashtag Generator (Free) – Instagram, TikTok & YouTube Hashtags | Kompi",
  description:
    "Generate high-performing hashtags in seconds. Kompi’s free hashtag generator helps you find trending + niche hashtags for Instagram, TikTok, and YouTube—plus practical tips to grow reach.",
  keywords: LSI_KEYWORDS,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: "Free Hashtag Generator – Instagram, TikTok & YouTube | Kompi",
    description:
      "Find trending and niche hashtags fast. Use Kompi’s free hashtag generator to boost discoverability and engagement across Instagram, TikTok, and YouTube.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Kompi Hashtag Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hashtag Generator (Free) | Kompi",
    description:
      "Instantly generate optimized hashtags for Instagram, TikTok, and YouTube. Copy, paste, and grow with Kompi.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

type FAQItem = { q: string; a: string };
const FAQS: FAQItem[] = [
  { q: "Is Kompi’s hashtag generator free?", a: "Yes—Kompi’s hashtag generator is free to use. Generate hashtags, copy them, and apply them to your posts right away." },
  { q: "Does this hashtag generator work for Instagram?", a: "Yes. Use it to create a balanced mix of broad, niche, and branded hashtags for Instagram posts and Reels." },
  { q: "Can I generate TikTok hashtags too?", a: "Absolutely. TikTok benefits from topical tags and intent-based hashtags—Kompi helps you build fast, relevant sets you can reuse." },
  { q: "What about YouTube hashtags?", a: "Yes. YouTube hashtags can support discovery and categorization. Kompi helps you generate keyword-aligned tags you can add to your title or description." },
  { q: "How many hashtags should I use?", a: "It depends on the platform and your niche. A reliable approach is using a small, high-intent set (plus a few niche tags) rather than stuffing dozens of broad hashtags." },
  { q: "Do hashtags still matter in 2025?", a: "Yes—hashtags can still help discovery, categorize your content, and connect you to niche audiences, especially when paired with strong content and consistent posting." },
  { q: "Should I use trending hashtags even if they’re not relevant?", a: "No. Irrelevant trending hashtags can reduce engagement quality. Prioritize relevance and intent; use trends only when they truly match your content." },
  { q: "Can Kompi help me track results from social posts?", a: "Yes. Pair hashtags with Kompi’s link tools and analytics—use trackable links and UTMs so you can measure clicks and conversions from social content." },
  { q: "Do I need an account to generate hashtags?", a: "For basic usage, you can generate hashtags quickly. If you want to manage campaigns, links, or QR assets in one place, creating a workspace helps." },
  { q: "What’s the best way to reuse hashtag sets?", a: "Create a few saved sets by topic (e.g., product, niche, location, and branded). Rotate them and refine based on post performance over time." },
];

type HowToStepItem = { name: string; text: string };
const HOW_TO_STEPS: HowToStepItem[] = [
  { name: "Choose your topic", text: "Start with a clear keyword that describes your post (e.g., ‘coffee shop’, ‘fitness coach’, or ‘street photography’)." },
  { name: "Generate hashtag ideas", text: "Use Kompi’s hashtag generator to produce a mix of broad, niche, and intent-based hashtags." },
  { name: "Create a balanced set", text: "Pick a small set that includes niche tags (for ranking) and a few broader tags (for reach), plus a branded tag if relevant." },
  { name: "Measure and improve", text: "Add trackable links with UTM parameters and refine your hashtag sets based on real outcomes (clicks, follows, and conversions)." },
];

type ComparisonRow = { feature: string; kompi: string; typical: string };
const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Fast hashtag generation", kompi: "Instant sets with practical structure", typical: "Often random lists with little guidance" },
  { feature: "Platform-friendly approach", kompi: "Works for Instagram, TikTok, YouTube workflows", typical: "Generic output without platform context" },
  { feature: "Growth stack integration", kompi: "Links + UTMs + QR codes + brand assets", typical: "Hashtags only" },
  { feature: "Internal conversion tools", kompi: "Built-in ecosystem for conversion paths", typical: "No built-in conversion tools" },
  { feature: "Campaign mindset", kompi: "Encourages testing, measuring, iterating", typical: "One-off use with minimal optimization" },
];

type HashtagPack = {
  title: string;
  description: string;
  examples: string[];
  tips: string[];
  icon: LucideIcon;
  tint: { bg: string; ring: string; iconBg: string; icon: string };
};

const HASHTAG_PACKS: HashtagPack[] = [
  {
    title: "Creator Pack",
    description: "A clean blend of discovery + niche relevance—good for creators who want consistent reach without overstuffing tags.",
    examples: ["#creatorlife", "#contentcreator", "#behindthescenes", "#dailycontent", "#creatortips", "#newpost", "#reelsideas", "#tiktokcreator", "#youtubecreator"],
    tips: ["Use 1–2 broad creator tags, then lean into niche + intent tags.", "Add a branded hashtag for your series (e.g., #YourNameCreates)."],
    icon: Sparkles,
    tint: { bg: "#E0F2FE", ring: "#BFDBFE", iconBg: "#0284C7", icon: "#ffffff" },
  },
  {
    title: "Small Business Pack",
    description: "Designed for local and online businesses aiming for customers—pair with trackable links to measure results.",
    examples: ["#smallbusiness", "#shoplocal", "#supportsmallbusiness", "#smallbizowner", "#localbusiness", "#newarrivals", "#limiteddrop", "#productlaunch", "#customerlove"],
    tips: ["Combine business + product + location hashtags when relevant.", "Use Kompi links and UTMs to track which content drives traffic."],
    icon: Target,
    tint: { bg: "#DCFCE7", ring: "#86EFAC", iconBg: "#16A34A", icon: "#ffffff" },
  },
  {
    title: "Restaurant Pack",
    description: "Great for cafes and restaurants—boost discovery for menus, specials, and events (also pair with QR menus).",
    examples: ["#foodie", "#instafood", "#restaurant", "#localfood", "#foodphotography", "#dailyspecial", "#brunch", "#coffeetime", "#dessertlover"],
    tips: ["Add 1–2 location tags and 1 menu/special tag for better intent.", "Link your menu using a Kompi QR menu or QR code campaign."],
    icon: MessageCircle,
    tint: { bg: "#FEF3C7", ring: "#FDE68A", iconBg: "#D97706", icon: "#ffffff" },
  },
  {
    title: "Ecommerce Pack",
    description: "Built for product discovery + conversion intent—ideal when you post launches, drops, and offer-driven content.",
    examples: ["#onlineshopping", "#newdrop", "#productfinds", "#giftideas", "#dealalert", "#shopnow", "#limitedstock", "#unboxing", "#review"],
    tips: ["Use a few intent hashtags like #shopnow, but keep them relevant.", "Use UTMs so you can measure which hashtags + posts convert."],
    icon: TrendingUp,
    tint: { bg: "#EDE9FE", ring: "#C4B5FD", iconBg: "#7C3AED", icon: "#ffffff" },
  },
];

/* -------------------------------------------------------------------------- */
/*  UI PRIMITIVES                                                             */
/* -------------------------------------------------------------------------- */

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

function ColorBand({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${className} border-t border-black/10`}>
      <Container>{children}</Container>
    </section>
  );
}

function IconBubble({
  icon: Icon,
  bg = "#ffffff",
  color = "#111827",
}: {
  icon: LucideIcon;
  bg?: string;
  color?: string;
}) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: bg }}>
      <Icon className="h-7 w-7" style={{ color }} aria-hidden="true" />
    </div>
  );
}

function Figure({
  src,
  alt,
  aspect = "aspect-[16/10]",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-black/10 bg-white ${className}`}>
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-3xl border border-black/10 bg-white shadow-sm ${className}`}>{children}</section>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-10 sm:px-10 sm:py-12">{children}</div>;
}

function Pill({
  icon: Icon,
  children,
  className = "",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 text-sm font-medium ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </div>
  );
}

function BandHeader({
  icon,
  title,
  description,
  theme = "light",
  eyebrow,
}: {
  icon: LucideIcon;
  title: React.ReactNode;
  description: React.ReactNode;
  theme?: "light" | "dark";
  eyebrow?: string;
}) {
  const Icon = icon;
  const isDark = theme === "dark";
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center">
        <div className={`rounded-3xl p-4 ${isDark ? "bg-white/10 ring-1 ring-white/20" : "bg-white ring-1 ring-black/10"}`}>
          <Icon className={`h-7 w-7 ${isDark ? "text-white" : "text-neutral-900"}`} />
        </div>
      </div>

      {eyebrow ? (
        <div className={`text-xs md:text-sm font-semibold uppercase tracking-[0.34em] ${isDark ? "text-white/70" : "text-neutral-600"}`}>
          {eyebrow}
        </div>
      ) : null}

      <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-neutral-950"}`}>
        {title}
      </h2>

      <div className={`mx-auto max-w-3xl text-base md:text-lg leading-relaxed ${isDark ? "text-white/80" : "text-neutral-700"}`}>
        {description}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HERO BAND                                                                 */
/* -------------------------------------------------------------------------- */

function HashtagHeroBand() {
  return (
    <ColorBand className="bg-lime-300 min-h-[100svh] pt-24 pb-14 md:pt-28 md:pb-20">
      <div className="grid gap-10 md:grid-cols-12 items-center">
        <div className="md:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 ring-1 ring-black/10">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white text-xs font-semibold">
              K
            </span>
            <span>Kompi Tools · Free hashtag generator</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950">
            A{" "}
            <span className="underline decoration-black/20 underline-offset-8">
              hashtag generator
            </span>{" "}
            built for creators.
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-neutral-900/80 max-w-xl">
            Generate relevant hashtag ideas in seconds — then build a clean set that matches intent (not spam). Pair your posts with{" "}
            <Link href="/links" className="underline underline-offset-4 decoration-black/20 hover:decoration-black/60">
              Kompi Links
            </Link>{" "}
            +{" "}
            <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-black/20 hover:decoration-black/60">
              UTMs
            </Link>{" "}
            to measure what converts.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#hashtag-tool"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/20 hover:bg-black"
            >
              <Wand2 className="h-4 w-4" />
              Generate hashtags
            </a>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-neutral-950 ring-1 ring-black/10 hover:bg-white/80"
            >
              <BadgeCheck className="h-4 w-4" />
              Save sets in my workspace
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3">
            <Pill icon={Instagram} className="bg-white/90 ring-black/10 text-neutral-950">
              Instagram-ready
            </Pill>
            <Pill icon={MessageCircle} className="bg-white/90 ring-black/10 text-neutral-950">
              TikTok intent
            </Pill>
            <Pill icon={Youtube} className="bg-white/90 ring-black/10 text-neutral-950">
              YouTube aligned
            </Pill>
            <Pill icon={BarChart3} className="bg-white/90 ring-black/10 text-neutral-950">
              Trackable workflow
            </Pill>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="grid gap-6">
            <Figure
              src="/solutions/solutions25.png"
              alt="Placeholder preview of Kompi hashtag generator UI"
              aspect="aspect-[16/11]"
              priority
              className="shadow-xl"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Figure src="/solutions/solutions21.png" alt="Placeholder hashtag set preview" aspect="aspect-[16/11]" />
              <Figure src="/solutions/solutions23.png" alt="Placeholder social workflow preview" aspect="aspect-[16/11]" />
            </div>
          </div>
        </div>
      </div>
    </ColorBand>
  );
}

/* -------------------------------------------------------------------------- */
/*  TOOL BAND                                                                 */
/* -------------------------------------------------------------------------- */

function HashtagToolBand() {
  return (
    <ColorBand className="bg-[#1D4ED8] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={Sparkles}
          theme="dark"
          eyebrow="TOOL"
          title="Generate hashtag sets instantly"
          description={
            <>
              Use the generator below, copy your best set, then post with intent. Track outcomes with{" "}
              <Link href="/links" className="underline underline-offset-4 decoration-white/30 hover:decoration-white/80">
                Links
              </Link>{" "}
              +{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-white/30 hover:decoration-white/80">
                UTMs
              </Link>
              .
            </>
          }
        />

        <div id="hashtag-tool" className="scroll-mt-28">
          <Card className="shadow-2xl">
            <CardBody>
              <div className="rounded-3xl border border-black/10 bg-white p-4 md:p-6">
                <HashtagGenerator />
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-black/10 space-y-3">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Tip</p>
                  </div>
                  <p className="text-xl font-bold text-[#0B0F1A]">Keep it relevant</p>
                  <p className="text-base text-neutral-700">Match hashtags to what’s on-screen and what you say in the caption.</p>
                </div>

                <div className="rounded-3xl bg-[#DCFCE7] p-7 ring-2 ring-[#111827] space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-3 py-1 text-[11px] font-semibold text-white">
                    <Zap className="h-3.5 w-3.5" />
                    Recommended
                  </div>
                  <p className="text-xl font-bold text-[#0B0F1A]">Build a rotation</p>
                  <p className="text-base text-neutral-800">Save 3–6 sets by topic and rotate them across your posts.</p>
                </div>

                <div className="rounded-3xl bg-[#E0F2FE] p-7 ring-1 ring-black/10 space-y-3">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <BarChart3 className="h-5 w-5" />
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#1D4ED8]">Measure</p>
                  </div>
                  <p className="text-xl font-bold text-[#0B0F1A]">Track outcomes</p>
                  <p className="text-base text-neutral-700">
                    Use{" "}
                    <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      trackable links
                    </Link>{" "}
                    and{" "}
                    <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      UTMs
                    </Link>{" "}
                    so you’re not guessing.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </ColorBand>
  );
}

/* -------------------------------------------------------------------------- */
/*  SHARE BAND                                                                 */
/* -------------------------------------------------------------------------- */

function HashtagShareBand() {
  return (
    <ColorBand className="bg-[#7F1D1D] py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 items-center">
        <div className="md:col-span-6 space-y-6">
          <BandHeader
            icon={Share2}
            theme="dark"
            eyebrow="SHARE"
            title={
              <>
                Share your hashtags
                <br />
                anywhere you post
              </>
            }
            description="Use your sets across captions, comments, bios — and connect offline promos with branded QR codes."
          />

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
            <Link
              href="/qr-code/with-logo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-950 hover:bg-white/90"
            >
              <Rocket className="h-4 w-4" />
              Create branded QR
            </Link>

            <Link
              href="/links"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-7 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Link2 className="h-4 w-4" />
              Add a link CTA
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            <Pill icon={ArrowUpRight} className="bg-white/10 ring-white/20 text-white">
              Route attention to a destination
            </Pill>
            <Pill icon={Shield} className="bg-white/10 ring-white/20 text-white">
              Keep it trusted + relevant
            </Pill>
          </div>
        </div>

        <div className="md:col-span-6">
          <Figure
            src="/solutions/solutions22.png"
            alt="Placeholder share section visual"
            aspect="aspect-[16/11]"
            className="shadow-xl"
          />
        </div>
      </div>
    </ColorBand>
  );
}

/* -------------------------------------------------------------------------- */
/*  ANALYZE BAND                                                               */
/* -------------------------------------------------------------------------- */

function HashtagAnalyzeBand() {
  return (
    <ColorBand className="bg-[#ECFCCB] py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 items-center">
        <div className="md:col-span-6 order-2 md:order-1">
          <Figure
            src="/solutions/solutions26.png"
            alt="Placeholder analytics visual"
            aspect="aspect-[16/11]"
            className="shadow-xl"
          />
        </div>

        <div className="md:col-span-6 order-1 md:order-2 space-y-6">
          <BandHeader
            icon={TrendingUp}
            eyebrow="ANALYZE"
            title="Analyze what actually works"
            description="Hashtags help discovery. Kompi helps you measure. Use links + UTMs (and QR for offline) to learn what converts."
          />

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <Link
              href="/tools/utm-builder"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              <BarChart3 className="h-4 w-4" />
              Build UTMs
            </Link>
            <Link
              href="/links"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-950 ring-1 ring-black/10 hover:bg-white/80"
            >
              <ArrowUpRight className="h-4 w-4" />
              Go to Links
            </Link>
          </div>
        </div>
      </div>
    </ColorBand>
  );
}

/* -------------------------------------------------------------------------- */
/*  FEATURES BAND (now colorful, not white)                                    */
/* -------------------------------------------------------------------------- */

function HashtagFeaturesBand() {
  return (
    <ColorBand className="bg-[#FDE68A] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={Layers}
          eyebrow="FEATURES"
          title="Everything you expect from a modern hashtag generator"
          description="Simple to start, useful when you want a real workflow. No random list spam."
        />

        <div className="grid gap-6 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <FeatureTile icon={Sparkles} title="Instant ideas" body="Generate sets fast, then refine into a small list you’d actually use." />
              <FeatureTile icon={Hash} title="Balanced sets" body="Mix broad + niche + branded hashtags to match intent and audience." />
              <FeatureTile icon={Layers} title="Reusable packs" body="Save templates by topic and rotate them across series content." />
              <FeatureTile icon={BarChart3} title="Growth-ready" body="Pair hashtags with links + UTMs so you can learn what performs over time." />
            </div>
          </div>

          <div className="md:col-span-5 grid gap-6">
            <Figure src="/solutions/solutions24.png" alt="Placeholder feature visual" aspect="aspect-[16/11]" className="shadow-xl" />
            <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-7">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-neutral-950 p-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-neutral-950">A clean, repeatable system</div>
                  <div className="text-neutral-700">
                    Generate → pick the best → save sets → rotate → measure → improve weekly.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColorBand>
  );
}

function FeatureTile(props: { icon: LucideIcon; title: string; body: string }) {
  const Icon = props.icon;
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-7 space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-neutral-950 p-3">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="text-xl font-bold text-neutral-950">{props.title}</div>
      </div>
      <div className="text-neutral-700">{props.body}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  VIDEO BAND                                                                 */
/* -------------------------------------------------------------------------- */

function HashtagVideoBand() {
  return (
    <ColorBand className="bg-[#A78BFA] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={Youtube}
          theme="dark"
          eyebrow="VIDEO"
          title="Watch the workflow"
          description={
            <>
              Generate → balance → post → measure → iterate. For offline promos, add{" "}
              <Link href="/qr-code/with-logo" className="underline underline-offset-4 decoration-white/30 hover:decoration-white/80">
                branded QR codes
              </Link>
              .
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-12 items-start">
          <div className="md:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl">
              <video className="aspect-video w-full object-cover" src={SEO_VIDEO_SRC} controls preload="metadata" />
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <MiniPlatformCard icon={Instagram} title="Instagram" body="Use a tight set. Add niche + location when it fits." />
            <MiniPlatformCard icon={MessageCircle} title="TikTok" body="Intent wins. Match what’s happening on-screen." />
            <MiniPlatformCard icon={Youtube} title="YouTube" body="Use a few keyword-aligned tags to reinforce topic." />
          </div>
        </div>
      </div>
    </ColorBand>
  );
}

function MiniPlatformCard(props: { icon: LucideIcon; title: string; body: string }) {
  const Icon = props.icon;
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 md:p-7">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-3">
          <Icon className="h-5 w-5 text-neutral-950" />
        </div>
        <div className="space-y-1">
          <div className="text-lg font-semibold text-white">{props.title}</div>
          <div className="text-white/80">{props.body}</div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  GUIDE + PACKS BAND                                                         */
/* -------------------------------------------------------------------------- */

function HashtagGuideBand() {
  return (
    <ColorBand className="bg-[#E0F2FE] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={LibraryBig}
          eyebrow="GUIDE"
          title="Use hashtags without looking spammy"
          description={
            <>
              Think of hashtags like shelves. Put your post on the right shelf (intent + niche), and the right people can find it.
              Connect discovery to outcomes using{" "}
              <Link href="/links" className="underline underline-offset-4 decoration-black/20 hover:decoration-black/60">
                Links
              </Link>{" "}
              +{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-black/20 hover:decoration-black/60">
                UTMs
              </Link>
              .
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-12 items-start">
          <div className="md:col-span-7 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <GuideCard icon={Layers} title="Broad + niche + branded" body="A small mix beats a giant list every time." />
              <GuideCard icon={BadgeCheck} title="Relevance beats trends" body="Trends only when they genuinely match your content." />
              <GuideCard icon={BarChart3} title="Measure outcomes" body="Track clicks and conversions so you can iterate." />
              <GuideCard icon={Users} title="Build repeatability" body="Save packs by topic so you’re not reinventing every post." />
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
              <div className="flex flex-wrap gap-3">
                <Link href="#hashtag-tool" className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black">
                  <Wand2 className="h-4 w-4" />
                  Generate a set
                </Link>
                <Link href="/links" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 ring-1 ring-black/10 hover:bg-white/80">
                  <ArrowUpRight className="h-4 w-4" />
                  Add a destination link
                </Link>
                <Link href="/tools/utm-builder" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 ring-1 ring-black/10 hover:bg-white/80">
                  <BarChart3 className="h-4 w-4" />
                  Track with UTMs
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 grid gap-6">
            <Figure src="/solutions/solutions24.png" alt="Placeholder guide visual" aspect="aspect-[16/11]" className="shadow-xl" />
            <Figure src="/solutions/solutions26.png" alt="Placeholder strategy visual" aspect="aspect-[16/11]" className="shadow-xl" />
          </div>
        </div>

        <div className="pt-6">
          <Card className="shadow-xl">
            <CardBody>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white">
                  <ClipboardCopy className="h-4 w-4" />
                  Copy-friendly packs
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
                  Ready-to-use hashtag packs
                </h3>
                <p className="mx-auto max-w-2xl text-neutral-700">
                  Use these as templates. Swap in your niche, city, product category, or series name to make them more targeted.
                </p>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {HASHTAG_PACKS.map((pack) => (
                  <PackCard key={pack.title} pack={pack} />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </ColorBand>
  );
}

function GuideCard(props: { icon: LucideIcon; title: string; body: string }) {
  const Icon = props.icon;
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-7 space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-neutral-950 p-3">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="text-lg font-bold text-neutral-950">{props.title}</div>
      </div>
      <div className="text-neutral-700">{props.body}</div>
    </div>
  );
}

function PackCard({ pack }: { pack: HashtagPack }) {
  const Icon = pack.icon;
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-7 space-y-5">
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: pack.tint.bg, boxShadow: `inset 0 0 0 1px ${pack.tint.ring}` }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: pack.tint.iconBg }}>
            <Icon className="h-4 w-4" style={{ color: pack.tint.icon }} />
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-xl font-bold text-[#0B0F1A]">{pack.title}</h4>
          <p className="text-base text-neutral-600">{pack.description}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#F7F7F3] border border-black/10 p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-sm font-semibold text-neutral-800">Example hashtags</p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600">
            <ClipboardCopy className="h-4 w-4" />
            Copy & paste ready
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {pack.examples.map((t) => (
            <span key={t} className="inline-flex rounded-full bg-white border border-black/10 px-3 py-1 text-sm text-neutral-800">
              {t}
            </span>
          ))}
        </div>
      </div>

      <ul className="space-y-2 text-neutral-700">
        {pack.tips.map((tip) => (
          <li key={tip} className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 mt-1 text-neutral-900" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#hashtag-tool"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white hover:bg-black"
        >
          <Wand2 className="h-4 w-4" />
          Generate similar
        </a>
        <Link
          href="/links"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-neutral-950 ring-1 ring-black/10 hover:bg-white/80"
        >
          <ArrowUpRight className="h-4 w-4" />
          Add a link CTA
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  COMPARISON BAND                                                            */
/* -------------------------------------------------------------------------- */

function HashtagComparisonBand() {
  return (
    <ColorBand className="bg-[#111827] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={Scale}
          theme="dark"
          eyebrow="COMPARISON"
          title="Kompi vs typical hashtag generators"
          description="Many tools spit out long lists. Kompi focuses on practical sets you can actually use — plus a workflow for measurable results."
        />

        <Card className="bg-white shadow-2xl">
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-4 pr-4 font-bold text-neutral-900">Feature</th>
                    <th className="py-4 px-4 font-bold text-neutral-900">Kompi</th>
                    <th className="py-4 px-4 font-bold text-neutral-900">Typical tools</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="border-b border-black/5">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-neutral-900" />
                          <span>{row.feature}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{row.kompi}</td>
                      <td className="py-4 px-4">{row.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-center text-base md:text-lg text-neutral-600">
              Use Kompi if you want discovery that plugs into a real stack: links, UTMs, QR, and campaigns — not just a list.
            </p>
          </CardBody>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <DarkTile icon={Target} title="Better relevance" body="Focus on intent and niche relevance instead of random trending lists." />
          <DarkTile icon={BarChart3} title="Better workflow" body="Pair hashtags with links and UTMs to measure impact." />
          <DarkTile icon={Rocket} title="Better conversion paths" body="Add QR for offline campaigns using branded QR codes." />
        </div>
      </div>
    </ColorBand>
  );
}

function DarkTile(props: { icon: LucideIcon; title: string; body: string }) {
  const Icon = props.icon;
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-6 md:p-7 space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white p-3">
          <Icon className="h-5 w-5 text-neutral-950" />
        </div>
        <div className="text-xl font-bold text-white">{props.title}</div>
      </div>
      <div className="text-white/80">{props.body}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS BAND                                                          */
/* -------------------------------------------------------------------------- */

function HashtagTestimonialsBand() {
  const items = [
    { title: "“We stopped posting random tag blocks.”", body: "“Now we rotate 3–4 sets by topic. Cleaner posts, better engagement.”" },
    { title: "“Finally: hashtags + tracking.”", body: "“We pair every post with a UTM link so we can see which content actually converts.”" },
    { title: "“Fast enough to use every day.”", body: "“Generate, tweak, paste, done. The tool doesn’t get in the way.”" },
  ];

  return (
    <ColorBand className="bg-[#F97316] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={Quote}
          eyebrow="PROOF"
          title="More “post, learn, repeat”. Less “guess and hope”."
          description="Simple hashtag sets that stay connected to your links and campaigns."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-3xl bg-white border border-black/10 p-7 shadow-xl">
              <div className="flex items-center gap-2 text-neutral-600">
                <Quote className="h-4 w-4" />
                <span className="text-sm font-semibold">Creator</span>
              </div>
              <p className="mt-3 text-lg font-bold text-neutral-950">{it.title}</p>
              <p className="mt-3 text-base text-neutral-700">{it.body}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-center">
          <div className="md:col-span-5">
            <Figure src="/solutions/solutions19.png" alt="Placeholder testimonials visual" aspect="aspect-[16/11]" className="shadow-xl" />
          </div>
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-black/10 bg-white p-7 md:p-10">
              <div className="text-sm font-semibold text-neutral-600">Quick reminder</div>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
                Don’t stop at discovery.
              </div>
              <p className="mt-3 text-neutral-700">
                Add a destination and measure it — otherwise you’ll never know which hashtags or posts truly work.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/links" className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white hover:bg-black">
                  <ArrowUpRight className="h-4 w-4" />
                  Build a link hub
                </Link>
                <Link href="/tools/utm-builder" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-neutral-950 ring-1 ring-black/10 hover:bg-white/80">
                  <BarChart3 className="h-4 w-4" />
                  Add UTMs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColorBand>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ BAND                                                                   */
/* -------------------------------------------------------------------------- */

function HashtagFaqBand() {
  return (
    <ColorBand className="bg-[#6D28D9] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={HelpCircle}
          theme="dark"
          eyebrow="FAQ"
          title="Hashtag generator FAQs"
          description="Quick answers about using Kompi, choosing hashtags, and tracking outcomes."
        />

        <div className="grid gap-4">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group rounded-3xl border border-white/20 bg-white/10 p-6 md:p-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="text-base md:text-lg font-semibold text-white">{faq.q}</span>
                <span className="text-sm text-white/70 group-open:hidden">+</span>
                <span className="text-sm text-white/70 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-white/80">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-950 hover:bg-white/90"
          >
            <ArrowUpRight className="h-4 w-4" />
            Build a trackable link hub
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            <BarChart3 className="h-4 w-4" />
            Create UTMs
          </Link>
        </div>
      </div>
    </ColorBand>
  );
}

/* -------------------------------------------------------------------------- */
/*  TRUST BAND                                                                 */
/* -------------------------------------------------------------------------- */

function HashtagTrustBand() {
  return (
    <ColorBand className="bg-[#0F766E] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={Shield}
          theme="dark"
          eyebrow="TRUST"
          title="Clean workflow. Responsible strategy."
          description="Hashtags are powerful — keep them relevant, measurable, and aligned with your brand."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <TrustTile icon={Zap} title="No clutter" body="Generate sets quickly and get back to posting." />
          <TrustTile icon={BadgeCheck} title="Relevance first" body="Avoid irrelevant trends that hurt engagement quality." />
          <TrustTile icon={BarChart3} title="Measure outcomes" body="Use links + UTMs so your improvements are real." />
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <Figure src="/solutions/solutions20.png" alt="Placeholder trust visual" aspect="aspect-[16/11]" className="shadow-xl" />
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-7 md:p-10">
              <div className="text-sm font-semibold text-white/70">A simple rule</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                Relevance beats reach.
              </div>
              <p className="mt-3 text-white/80">
                A smaller set that matches intent will outperform a giant block of generic tags.
              </p>
              <div className="mt-6">
                <a
                  href="#hashtag-tool"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-white/90"
                >
                  <Wand2 className="h-4 w-4" />
                  Generate a better set
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColorBand>
  );
}

function TrustTile(props: { icon: LucideIcon; title: string; body: string }) {
  const Icon = props.icon;
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 md:p-7 space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white p-3">
          <Icon className="h-5 w-5 text-neutral-950" />
        </div>
        <div className="text-xl font-bold text-white">{props.title}</div>
      </div>
      <div className="text-white/80">{props.body}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  RELATED LINKS BAND                                                         */
/* -------------------------------------------------------------------------- */

function HashtagRelatedLinksBand() {
  const links = [
    { href: "/links", label: "Kompi Links" },
    { href: "/tools/utm-builder", label: "UTM Builder" },
    { href: "/qr-code-generator", label: "QR Code Generator" },
    { href: "/qr-code/with-logo", label: "QR Code With Logo" },
    { href: "/qr-menus", label: "QR Menus" },
    { href: "/k-cards", label: "K-Cards" },
    { href: "/kr-codes", label: "KR Codes" },
  ];

  return (
    <ColorBand className="bg-[#F5F5F4] py-16 md:py-24">
      <div className="space-y-10">
        <BandHeader
          icon={ArrowUpRight}
          eyebrow="EXPLORE"
          title="Related Kompi tools & pages"
          description="Build your full funnel with Kompi—discoverability, destinations, and tracking in one place."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-flex items-center justify-between rounded-3xl bg-white border border-black/10 px-6 py-5 text-base md:text-lg font-semibold text-neutral-900 shadow-sm hover:shadow-md transition"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                {item.label}
              </span>
              <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-center">
          <div className="md:col-span-5">
            <Figure src="/solutions/solutions21.png" alt="Placeholder related links visual" aspect="aspect-[16/11]" className="shadow-xl" />
          </div>
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-black/10 bg-white p-7 md:p-10">
              <div className="text-sm font-semibold text-neutral-600">One last tip</div>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
                Hashtags help you get discovered. Your links help you convert.
              </div>
              <p className="mt-3 text-neutral-700">
                If you want consistent growth, build a system: content + hashtags + measurable CTA.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/links"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold hover:bg-black"
                >
                  Build a trackable link hub
                </Link>
                <a
                  href="#hashtag-tool"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 ring-1 ring-black/10 hover:bg-white/80"
                >
                  Generate hashtags again
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColorBand>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function HashtagGeneratorPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate hashtags for Instagram, TikTok, and YouTube",
    description:
      "A practical workflow to generate, choose, and refine hashtags using Kompi—optimized for reach, relevance, and measurable outcomes.",
    step: HOW_TO_STEPS.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${BRAND_NAME} Hashtag Generator`,
    url: CANONICAL_URL,
    applicationCategory: "MarketingApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free" },
    description:
      "Generate hashtag ideas for Instagram, TikTok, and YouTube. Create balanced hashtag sets and improve discoverability with Kompi.",
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Hashtag Generator Tutorial – How to Create Better Hashtag Sets",
    description:
      "A quick walkthrough showing how to generate hashtags and build balanced sets for Instagram, TikTok, and YouTube using Kompi.",
    thumbnailUrl: [OG_IMAGE],
    uploadDate: "2025-01-01",
    contentUrl: SEO_VIDEO_ABS,
    embedUrl: SEO_VIDEO_ABS,
  };

  const jsonLd = [webAppJsonLd, faqJsonLd, howToJsonLd, videoJsonLd];

  return (
    <>
      <Script id="hashtag-generator-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />

        <main className="pt-0">
          <HashtagHeroBand />
          <HashtagToolBand />
          <HashtagShareBand />
          <HashtagAnalyzeBand />

          {/* The rest is now ALSO colorful bands (no “give up” midpoint) */}
          <HashtagFeaturesBand />
          <HashtagVideoBand />
          <HashtagGuideBand />
          <HashtagComparisonBand />
          <HashtagTestimonialsBand />
          <HashtagFaqBand />
          <HashtagTrustBand />
          <HashtagRelatedLinksBand />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
