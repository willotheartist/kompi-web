import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ---------------------------------------
   FIXED COLOR PALETTE
--------------------------------------- */
const COLORS = [
  "#D9F45B", // lime
  "#004F4A", // teal dark
  "#B9F4FF", // soft cyan
  "#D2C6FF", // lilac
  "#FF9BBE", // pink
];

/* ---------------------------------------
   TILE DEFINITIONS (headline + subtitle)
--------------------------------------- */
type Tile = {
  title: string;
  headline: string;
  subtitle: string;
  href?: string;
  comingSoon?: boolean;
  imageSrc?: string;   // 👈 per-card image
  imageAlt?: string;   // 👈 optional custom alt
};

const AVAILABLE: Tile[] = [
  {
    title: "Links",
    headline: `Drive traffic effortlessly with <i>Kompi links</i>`,
    subtitle:
      "Turn any URL into a fast, trackable short link that works everywhere.",
    href: "/links",
    imageSrc: "/growth/links.png",
  },
  {
    title: "K-Cards",
    headline: `Share your business instantly with <i>K-Cards</i>`,
    subtitle:
      "A smart digital business card you can update anytime — no app required.",
    href: "/k-cards",
    imageSrc: "/growth/k-cards.png",
  },
  {
    title: "QR Menus",
    headline: `Create mobile-ready menus in <i>minutes</i>`,
    subtitle:
      "Upload your items, customise your design, and share with a single QR.",
    href: "/dashboard/qr-menus",
    imageSrc: "/growth/qr-menus.png",
  },
  {
    title: "Kompi Codes™",
    headline: `Identity-powered QR codes that <i>track everything</i>`,
    subtitle: "Turn scans into insights with dynamic, brandable Kompi Codes.",
    href: "/kr-codes",
    imageSrc: "/growth/kompi-codes.png",
  },
  {
    title: "Analytics",
    headline: `Monitor your audience in <i>real time</i>`,
    subtitle: "See clicks, scans, visitors and engagement — all without cookies.",
    href: "/analytics",
    imageSrc: "/growth/analytics.png",
  },
  {
    title: "Subscribers",
    headline: `Grow a loyal audience across <i>every channel</i>`,
    subtitle:
      "Capture emails and build your contact list directly from your links.",
    href: "/dashboard/subscribers",
    imageSrc: "/growth/subscribers.png",
  },
  {
    title: "Contact Forms",
    headline: `Collect messages from <i>anywhere</i>`,
    subtitle: "Create simple, embeddable forms that send submissions instantly.",
    href: "/dashboard/contact-forms",
    imageSrc: "/growth/contact-forms.png",
  },
  {
    title: "Discount Codes",
    headline: `Boost conversions with <i>promo codes</i>`,
    subtitle:
      "Create limited-time offers and track performance in one dashboard.",
    href: "/dashboard/discount-codes",
    imageSrc: "/growth/discount-codes.png",
  },
  {
    title: "Menu Builder",
    headline: `Design beautiful menus for <i>any business</i>`,
    subtitle:
      "Build interactive menus with custom categories, prices and styles.",
    href: "/menu",
    imageSrc: "/growth/menu-builder.png",
  },
];

const COMING_SOON: Tile[] = [
  {
    title: "Social Planner",
    headline: `Plan and schedule posts from <i>one place</i>`,
    subtitle: "Draft, queue and publish content across multiple platforms.",
    comingSoon: true,
    imageSrc: "/growth/social-planner.png",
  },
  {
    title: "AI Post Ideas",
    headline: `Never run out of <i>content</i> again`,
    subtitle:
      "Generate fresh post ideas tailored to your brand and audience.",
    comingSoon: true,
    imageSrc: "/growth/ai-post-ideas.png",
  },
  {
    title: "Instagram Auto-Reply",
    headline: `Automate your DMs with <i>smart replies</i>`,
    subtitle:
      "Respond instantly to keywords, links, promotions and more.",
    comingSoon: true,
    imageSrc: "/growth/instagram-auto-reply.png",
  },
];

/* ---------------------------------------
   COLOR UTILS — AUTO TEXT CONTRAST
--------------------------------------- */
function luminance(hex: string) {
  const rgb = hex
    .replace("#", "")
    .match(/.{1,2}/g)!
    .map((c) => parseInt(c, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));

  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function getTextColors(bg: string) {
  const isDark = luminance(bg) < 0.5;
  return {
    text: isDark ? "white" : "black",
    subtle: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)",
    buttonBg: isDark ? "white" : "black",
    buttonText: isDark ? "black" : "white",
  };
}

/* ---------------------------------------
   PAGE
--------------------------------------- */
export default function GrowthPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: "Inter Tight, sans-serif" }}
        >
          Growth Hub
        </h1>
        <p className="text-[color:var(--color-subtle)]">
          Explore Kompi tools that help you grow, engage, and monetise your
          audience.
        </p>
      </header>

      {/* AVAILABLE */}
      <TileSection title="Available Tools" tiles={AVAILABLE} />

      {/* COMING */}
      <TileSection title="Coming Soon" tiles={COMING_SOON} />
    </div>
  );
}

/* ---------------------------------------
   SECTIONS
--------------------------------------- */
function TileSection({ title, tiles }: { title: string; tiles: Tile[] }) {
  return (
    <section className="space-y-3">
      <h2
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-subtle)" }}
      >
        {title}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile, i) => (
          <GrowthTile
            key={tile.title}
            tile={tile}
            color={COLORS[i % COLORS.length]}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------
   TILE COMPONENT
--------------------------------------- */
function GrowthTile({ tile, color }: { tile: Tile; color: string }) {
  const colors = getTextColors(color);

  const wrapperClassName = cn(
    "group block rounded-3xl p-8 transition-transform text-center",
    tile.href && "hover:scale-[1.01] active:scale-[0.99]"
  );

  const wrapperStyle = { backgroundColor: color };

  const imageSrc = tile.imageSrc ?? "/kompi-business.png"; // 👈 fallback
  const imageAlt = tile.imageAlt ?? tile.title;

  const content = (
    <>
      {/* BIG CENTERED IMAGE */}
      <div className="mb-4 flex justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={150}
          height={150}
          className="rounded-xl object-cover"
        />
      </div>

      {/* HEADLINE */}
      <h3
        className="text-xl leading-tight"
        style={{
          fontFamily: "Inter Tight, sans-serif",
          color: colors.text,
        }}
        dangerouslySetInnerHTML={{
          __html: tile.headline.replace(
            /<i>(.*?)<\/i>/g,
            "<span style=\"font-family:'Instrument Serif',serif; font-style:normal;\">$1</span>"
          ),
        }}
      />

      {/* SUBTITLE */}
      <p
        className="mt-2 text-sm"
        style={{
          fontFamily: "Inter Tight, sans-serif",
          color: colors.subtle,
        }}
      >
        {tile.subtitle}
      </p>

      {/* CTA */}
      <span
        className="mt-6 inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-medium"
        style={{
          backgroundColor: colors.buttonBg,
          color: colors.buttonText,
          fontFamily: "Inter Tight, sans-serif",
        }}
      >
        {tile.comingSoon ? "Coming soon" : "Open"}
      </span>
    </>
  );

  if (tile.href) {
    return (
      <Link href={tile.href} className={wrapperClassName} style={wrapperStyle}>
        {content}
      </Link>
    );
  }

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      {content}
    </div>
  );
}
