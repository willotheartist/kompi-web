"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { motion } from "framer-motion";

type Persona = {
  id: number;
  title: string;
  subtitle: string;
  tagPrimary: string;
  tagSecondary: string;
  image: string;
};

const personas: Persona[] = [
  {
    id: 1,
    title: "Creators",
    subtitle:
      "Share links beautifully and understand your audience instantly.",
    tagPrimary: "INDIVIDUALS",
    tagSecondary: "CREATORS",
    image: "/kompiimage1.png",
  },
  {
    id: 2,
    title: "Small Businesses",
    subtitle: "Build trust with branded links and clear analytics.",
    tagPrimary: "TEAMS",
    tagSecondary: "SMALL BUSINESS",
    image: "/kompiimage2.png",
  },
  {
    id: 3,
    title: "Marketing Teams",
    subtitle: "Track campaigns, UTMs, and performance across every channel.",
    tagPrimary: "GROWTH",
    tagSecondary: "MARKETING",
    image: "/kompiimage3.png",
  },
  {
    id: 4,
    title: "Agencies",
    subtitle: "Manage client links, domains, and reporting in one workspace.",
    tagPrimary: "CLIENT WORK",
    tagSecondary: "AGENCIES",
    image: "/kompiimage4.png",
  },
  {
    id: 5,
    title: "Social Managers",
    subtitle: "Optimize posts with real-time click insights.",
    tagPrimary: "SOCIAL",
    tagSecondary: "MANAGERS",
    image: "/kompiimage7.png",
  },
  {
    id: 6,
    title: "Brands",
    subtitle: "Customize links and bio pages to match your identity.",
    tagPrimary: "BRAND",
    tagSecondary: "BRANDS",
    image: "/kompisix.png",
  },
  {
    id: 7,
    title: "Developers",
    subtitle: "Use reliable redirects and clean APIs for any workflow.",
    tagPrimary: "TECHNICAL",
    tagSecondary: "DEVELOPERS",
    image: "/kompiimage19.png",
  },
  {
    id: 8,
    title: "Ecommerce",
    subtitle: "Measure conversions from ads, socials, and email clicks.",
    tagPrimary: "GROWTH",
    tagSecondary: "ECOMMERCE",
    image: "/kompiimage18.png",
  },
];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function KompiWho6() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // groups of 3 cards – for snapping by “page”
  const pages = useMemo(() => {
    const out: Persona[][] = [];
    for (let i = 0; i < personas.length; i += 3) {
      out.push(personas.slice(i, i + 3));
    }
    return out;
  }, []);

  const scrollByPage = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = container.clientWidth; // one full visible page
    container.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header – centered, with Instrument Serif accent on “Kompi” */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-9000">
            Elevate your links
          </p>

          <div
            role="heading"
            aria-level={2}
            style={{ letterSpacing: "-0.04em" }}
            className="text-center font-semibold text-neutral-900
                       text-[32px] leading-[1.05]
                       sm:text-[44px]
                       md:text-[54px]
                       lg:text-[60px]"
          >
            <span>Who’s </span>
            <span className="wf-serif-accent italic">Kompi</span>
            <span> For</span>
          </div>

          <p className="mt-2 max-w-2xl text-center text-[15px] leading-[1.7] text-neutral-600">
            From solo creators to scaling teams, Kompi keeps links, analytics,
            and workspaces simple — so you can focus on growth.
          </p>

          {/* Arrows, centered under heading */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByPage("left")}
              aria-label="Scroll left"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md ring-1 ring-black/5 transition hover:bg-neutral-900 hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByPage("right")}
              aria-label="Scroll right"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md ring-1 ring-black/5 transition hover:bg-neutral-800"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Slider – native scroll + snap by page, 3 cards visible, scrollbar hidden via CSS */}
      <div className="mt-12 overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="kompi-who-scroll mx-auto flex max-w-7xl gap-6 overflow-x-auto pb-4 sm:pb-6 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: easing }}
        >
          {pages.map((group, pageIndex) => (
            <div
              key={pageIndex}
              className="flex w-full shrink-0 gap-6"
              style={{ scrollSnapAlign: "start" }}
            >
              {group.map((persona, indexInGroup) => {
                const globalIndex = pageIndex * 3 + indexInGroup;
                const isFirst = globalIndex === 0;

                const words = persona.title.split(" ");
                const mid = Math.ceil(words.length / 2);
                const titleLine1 = words.slice(0, mid).join(" ");
                const titleLine2 = words.slice(mid).join(" ");

                return (
                  <motion.article
                    key={persona.id}
                    className="relative w-1/3 shrink-0 overflow-hidden rounded-[40px]"
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      ease: easing,
                      delay: indexInGroup * 0.08,
                    }}
                  >
                    <div
                      className={`flex h-[540px] flex-col ${
                        isFirst ? "bg-[#D8FF43]" : "bg-[#f3efe8]"
                      }`}
                    >
                      {/* TOP: text */}
                      <div className="flex-1 px-7 pt-7 pb-6">
                        <div className="mb-4 flex flex-wrap items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em]">
                          <span className="rounded-full bg-white px-3 py-1 text-neutral-700">
                            {persona.tagPrimary}
                          </span>
                          <span className="rounded-full bg-neutral-900 px-3 py-1 text-white">
                            {persona.tagSecondary}
                          </span>
                        </div>

                        <div className="text-[35px] font-semibold leading-tight text-neutral-900">
                          <span className="block">{titleLine1}</span>
                          {titleLine2 && (
                            <span className="block">{titleLine2}</span>
                          )}
                        </div>

                        <p className="mt-3 max-w-[260px] md:max-w-60 text-[15px] leading-[1.7] text-neutral-800">
                          {persona.subtitle}
                        </p>
                      </div>

                      {/* BOTTOM: rounded image */}
                      <div className="relative h-[280px] w-full overflow-hidden rounded-t-[40px] bg-[#f3efe8]">
                        <Image
                          src={persona.image}
                          alt={persona.title}
                          fill
                          className="h-full w-full object-cover"
                          sizes="360px"
                        />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
