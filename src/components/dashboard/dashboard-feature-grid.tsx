// src/components/dashboard/dashboard-feature-grid.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type FeatureCardConfig = {
  bg: string; // hex
  heading: string; // can include \n
  body: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

type FeatureCardProps = FeatureCardConfig & {
  onClick: () => void;
};

function FeatureCard({
  bg,
  heading,
  body,
  imageSrc,
  imageAlt,
  onClick,
}: FeatureCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-[28px] p-8 text-center transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: bg }}
    >
      <div className="flex h-full flex-col items-center">
        {/* Headline (centered, non-italic, not semibold) */}
        <h3
          className="whitespace-pre-line leading-[0.95] tracking-[-0.03em]"
          style={{
            fontFamily:
              "var(--font-accent, var(--font-primary, system-ui, -apple-system, BlinkMacSystemFont, sans-serif))",
            fontSize: "2.4rem",
            color: "#0B0B0B",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          {heading}
        </h3>

        {/* Image only (no white box, no visible wrapper) */}
        <div className="mt-10 w-full">
          <div className="relative mx-auto h-[140px] w-[78%]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 60vw, 260px"
            />
          </div>
        </div>

        {/* Bottom copy (centered) */}
        <p className="mt-6 max-w-[320px] text-[0.86rem] leading-tight text-black/85">
          {body}
        </p>
      </div>
    </button>
  );
}

export function DashboardFeatureGrid() {
  const router = useRouter();

  const cards: FeatureCardConfig[] = [
    {
      bg: "#DDFB73",
      heading: "Make your links\nfeel intentional",
      body:
        "Paste a URL and Kompi turns it into something clean, quick, and easy to trust. Name it your way, reuse it anywhere.",
      href: "/links/new",
      imageSrc: "/links-dashboard-card.png",
      imageAlt: "Kompi links",
    },
    {
      bg: "#EAD7E7",
      heading: "Know what landed.",
      body:
        "See what’s getting clicks, where people came from, and what they used — so you can double down on what works.",
      href: "/analytics",
      imageSrc: "/kompi-analytics.png",
      imageAlt: "Kompi analytics",
    },
    {
      bg: "#B7CADB",
      heading: "Look like you,\neverywhere",
      body:
        "Connect your own domain so every share looks legit, consistent, and professional — without the technical fuss.",
      href: "/dashboard/settings/domains",
      imageSrc: "/kompi-branding.png",
      imageAlt: "Kompi branding",
    },
    {
      bg: "#D7CEC3",
      heading: "Meet people where\nthey are",
      body:
        "Menus, posters, packaging, stickers — turn anything into a doorway. Add a QR and send people exactly where you want.",
      href: "/kr-codes",
      imageSrc: "/kr-dashboard-card.png",
      imageAlt: "Kompi codes",
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold sm:text-lg">
          Tools to Grow Your Audience
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <FeatureCard
            key={c.href}
            {...c}
            onClick={() => router.push(c.href)}
          />
        ))}
      </div>
    </section>
  );
}
