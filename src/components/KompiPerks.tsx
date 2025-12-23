"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type PerkCard = {
  id: string;
  label: string;
  title: string;
  accent?: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

const PERKS: PerkCard[] = [
  {
    id: "live-campaigns",
    label: "Campaign-ready",
    title: "Live links that stay in sync",
    accent: "everywhere.",
    body: "Update destinations once and keep every QR code, bio and short link in sync.",
    imageSrc: "/kompione.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "qr-magic",
    label: "K-Cards & QR",
    title: "Physical touchpoints that",
    accent: "actually convert.",
    body: "Pair K-Cards and QR posters with smart links so every tap and scan is tracked.",
    imageSrc: "/kompitwo.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "creator-mode",
    label: "Creator mode",
    title: "Bio pages that feel",
    accent: "designed.",
    body: "Ship modern, on-brand link-in-bio pages that look like your brand, not a template.",
    imageSrc: "/kompithree.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "client-reports",
    label: "Client-ready",
    title: "Reports you can drop",
    accent: "into decks.",
    body: "Show clients where clicks come from, per campaign and per workspace.",
    imageSrc: "/kompifour.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "team-workspaces",
    label: "Teams & studios",
    title: "Workspaces built",
    accent: "for rollouts.",
    body: "Give each client or brand its own space with shared links and analytics.",
    imageSrc: "/kompifive.png",
    imageAlt: "Kompi promo artwork",
  },
];

// luxe _easing

// ~40s loop feels slow & calm. Adjust if you want even slower/faster.
const SCROLL_DURATION = 40;

export default function KompiPerks() {
  const shouldReduceMotion = useReducedMotion();

  // duplicate the list so we can loop it seamlessly
  const loopPerks = useMemo(() => [...PERKS, ...PERKS], []);

  return (
    <section
      className="w-full bg-(--color-bg) py-16"
      aria-label="Kompi features and perks"
    >
      {/* Header */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--color-subtle)">
          Kompi perks
        </p>

        <h2
          className="mt-3 font-semibold text-(--color-text)
                     text-[30px] leading-[1.05]
                     sm:text-[40px]
                     md:text-[48px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          Simple tools.{" "}
          <span className="wf-serif-accent italic text-(--color-accent)">
            Real-world
          </span>{" "}
          impact.
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-[15px] leading-[1.7] text-(--color-subtle)">
          Kompi keeps QR codes, pages and links under one roof — so every scan,
          tap and click feels like part of a single, intentional experience.
        </p>
      </div>

      {/* Auto-scrolling strip */}
      <div className="mt-10 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-(--color-bg) to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-(--color-bg) to-transparent" />

        {shouldReduceMotion ? (
          // Fallback: simple horizontal scroll if user prefers reduced motion
          <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8 no-scrollbar">
            {PERKS.map((perk) => (
              <PerkItem key={perk.id} perk={perk} />
            ))}
          </div>
        ) : (
          <motion.div
            className="mx-auto flex max-w-none gap-4 px-4 sm:px-6 lg:px-8"
            // Infinite marquee-style scroll
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: SCROLL_DURATION,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {loopPerks.map((perk, idx) => (
              <PerkItem key={`${perk.id}-${idx}`} perk={perk} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function PerkItem({ perk }: { perk: PerkCard }) {
  return (
    <article
      className="group flex min-w-[260px] max-w-sm flex-col rounded-3xl border border-black/5 bg-(--color-surface)
                 px-4 py-4 sm:px-5 sm:py-5 shadow-[0_1px_0_rgba(15,15,15,0.06)]
                 transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--color-subtle)">
          {perk.label}
        </p>
      </div>

      <div className="mt-3">
        <h3 className="text-[17px] font-semibold leading-snug text-(--color-text)">
          {perk.title}{" "}
          {perk.accent && (
            <span className="wf-serif-accent italic text-(--color-accent)">
              {perk.accent}
            </span>
          )}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-(--color-subtle)">
          {perk.body}
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-black/5">
        <div className="relative h-36 w-full">
          <Image
            src={perk.imageSrc}
            alt={perk.imageAlt}
            fill
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="260px"
          />
        </div>
      </div>
    </article>
  );
}
