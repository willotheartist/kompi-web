"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type KRowCard = {
  id: string;
  label: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  tone: "pink" | "yellow" | "mint" | "blue";
};

const CARDS: KRowCard[] = [
  {
    id: "krow-perk-cards",
    label: "K-Cards",
    title: "Tap-to-share cards that feel premium.",
    body: "Hand out NFC cards that land on smart Kompi links, so every tap rolls into the same clean analytics.",
    imageSrc: "/kompione.png",
    imageAlt: "Person holding a Kompi K-Card",
    tone: "pink",
  },
  {
    id: "krow-flex-campaigns",
    label: "Campaign rows",
    title: "Flexible campaigns you can remix fast.",
    body: "Group links, QR codes and bios into rows for each launch, then reuse the layouts for the next drop.",
    imageSrc: "/kompitwo.png",
    imageAlt: "Kompi interface showing flexible campaign layouts",
    tone: "yellow",
  },
  {
    id: "krow-group-events",
    label: "Pop-ups & events",
    title: "QR flows that don’t break on day two.",
    body: "Print once, update destinations whenever you need — without reprinting posters or chasing old links.",
    imageSrc: "/kompithree.png",
    imageAlt: "Event space with Kompi QR codes",
    tone: "mint",
  },
  {
    id: "krow-client-reports",
    label: "Client reports",
    title: "Deck-ready views for every client.",
    body: "Open one row per client, grab screenshots, export CSV — Kompi keeps everything report-ready.",
    imageSrc: "/kompifour.png",
    imageAlt: "Laptop showing analytics style dashboards",
    tone: "blue",
  },
];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: easing,
      staggerChildren: 0.22,
      delayChildren: 0.25,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easing },
  },
};

const cardsContainer = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easing,
      staggerChildren: 0.24,
      delayChildren: 0.15,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.05, ease: easing },
  },
};

export default function KRow() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-krow-card]");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24;
    const delta =
      direction === "next" ? cardWidth + gap : -(cardWidth + gap);

    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Kompi use case rows"
      className="w-full bg-gradient-to-b from-[#FFF5FF] via-[#F5F7FF] to-[#E3F2FF] py-16"
    >
      <motion.div
        className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div
          className="max-w-3xl space-y-3"
          variants={headerItem}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-600">
            K-rows
          </p>
          <h2 className="text-[28px] font-semibold leading-tight text-neutral-900 sm:text-[32px] md:text-[36px]">
            Spin up{" "}
            <span className="wf-serif-accent italic text-[#F9314A]">
              rows of campaigns
            </span>{" "}
            that stay on-brand.
          </h2>
          <p className="text-sm leading-relaxed text-neutral-700">
            Drop K-Cards, QR flows and links into one calm row. Scroll use
            cases, grab ideas and ship your next rollout without starting
            from scratch.
          </p>
        </motion.div>

        {/* Scrollable row */}
        <motion.div
          className="space-y-4"
          variants={cardsContainer}
        >
          <div className="relative">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* hide scrollbar in WebKit */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {CARDS.map((card) => (
                <motion.article
                  key={card.id}
                  data-krow-card
                  variants={cardItem}
                  className="flex w-[280px] flex-none snap-start flex-col rounded-[32px] p-4 sm:w-[320px] sm:p-5"
                  style={getCardStyle(card.tone)}
                >
                  <CardInner card={card} />
                </motion.article>
              ))}
            </div>

            {/* Arrows */}
            <div className="pointer-events-none absolute inset-y-0 flex items-center justify-between">
              <button
                type="button"
                onClick={() => scrollByCard("prev")}
                aria-label="Scroll to previous cards"
                className="pointer-events-auto ml-[-6px] hidden h-9 w-9 items-center justify-center rounded-full border border-neutral-300/60 bg-white/80 text-sm text-neutral-800 hover:bg-white sm:flex"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollByCard("next")}
                aria-label="Scroll to next cards"
                className="pointer-events-auto mr-[-6px] hidden h-9 w-9 items-center justify-center rounded-full border border-neutral-300/60 bg-white/80 text-sm text-neutral-800 hover:bg-white sm:flex"
              >
                ›
              </button>
            </div>
          </div>

          {/* Static dots */}
          <div className="flex justify-center gap-2">
            {CARDS.map((card, index) => (
              <span
                key={card.id}
                className={
                  "h-1.5 w-6 rounded-full transition " +
                  (index === 0 ? "bg-neutral-900" : "bg-neutral-300")
                }
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function getCardStyle(
  tone: KRowCard["tone"]
): React.CSSProperties {
  // Strong colorful backgrounds per card
  if (tone === "pink") {
    return {
      background: "#F4C6FF",
      color: "#1E2330",
    };
  }
  if (tone === "yellow") {
    return {
      background: "#FFEC00",
      color: "#1E2330",
    };
  }
  if (tone === "mint") {
    return {
      background: "#BBF8E1",
      color: "#1E2330",
    };
  }
  // blue
  return {
    background: "#C7E3FF",
    color: "#1E2330",
  };
}

function CardInner({ card }: { card: KRowCard }) {
  return (
    <>
      {/* Image */}
      <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/40">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          width={640}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1E2330]/70">
          {card.label}
        </p>
        <h3 className="text-sm font-semibold leading-snug text-[#1E2330]">
          {card.title}
        </h3>
        <p className="text-xs leading-relaxed text-[#1E2330]/80">
          {card.body}
        </p>
      </div>

      {/* CTA */}
      <button
        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1E2330] underline-offset-4 hover:underline"
        type="button"
      >
        Learn more
        <span aria-hidden="true">↗</span>
      </button>
    </>
  );
}
