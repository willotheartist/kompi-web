"use client";

import React from "react";

type CardVariant = "image-full" | "solid" | "image-overlay" | "mixed";

type KPromoCard = {
  id: string;
  variant: CardVariant;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  accent?: string;
  bg?: "accent" | "accent-soft" | "surface";
};

const CARDS: KPromoCard[] = [
  {
    id: "image-full-1",
    variant: "image-full",
    imageSrc: "/kompione.png",
    imageAlt: "Kompi promo visual",
  },
  {
    id: "solid-1",
    variant: "solid",
    bg: "accent",
    title: "Make the real world",
    accent: "clickable.",
  },
  {
    id: "image-overlay-1",
    variant: "image-overlay",
    imageSrc: "/kompitwo.png",
    imageAlt: "Kompi promo visual",
    title: "Design",
    accent: "smarter",
  },
  {
    id: "mixed-1",
    variant: "mixed",
    bg: "surface",
    title: "Make the real world",
    accent: "clickable.",
    imageSrc: "/kompithree.png",
    imageAlt: "Kompi promo visual",
  },
  {
    id: "image-full-2",
    variant: "image-full",
    imageSrc: "/kompifour.png",
    imageAlt: "Kompi promo visual",
  },
];

const bgToken = (bg?: KPromoCard["bg"]) => {
  if (bg === "accent") return "var(--color-accent)";
  if (bg === "accent-soft") return "var(--color-accent-soft)";
  if (bg === "surface") return "var(--color-surface)";
  return "var(--color-surface)";
};

export default function KPromo() {
  return (
    <section className="kpromo" aria-label="Make the world more clickable">
      {/* Heading stays in constrained container */}
      <div className="kpromo-inner">
        <header className="kpromo-heading">
          <p className="kpromo-heading-line">Make the world</p>
          <p className="kpromo-heading-line">
            more{" "}
            <span className="kpromo-heading-accent">clickable.</span>
          </p>
        </header>
      </div>

      {/* Full-width carousel strip */}
      <div className="kpromo-carousel-outer">
        <div className="kpromo-carousel-mask">
          <div className="kpromo-track">
            {[...CARDS, ...CARDS].map((card, index) => (
              <article
                key={card.id + "-" + index}
                className={`kpromo-card kpromo-card-${card.variant}`}
                style={{
                  background:
                    card.variant === "image-full" && !card.bg
                      ? "var(--color-surface)"
                      : bgToken(card.bg),
                }}
              >
                {card.variant === "image-full" && card.imageSrc && (
                  <div className="kpromo-media">
                    <img
                      src={card.imageSrc}
                      alt={card.imageAlt || ""}
                      className="kpromo-media-img"
                    />
                  </div>
                )}

                {card.variant === "solid" && (
                  <div className="kpromo-card-body">
                    <p className="kpromo-card-title">
                      {card.title}{" "}
                      {card.accent && (
                        <span className="kpromo-card-accent">
                          {card.accent}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {card.variant === "image-overlay" && card.imageSrc && (
                  <>
                    <div className="kpromo-media">
                      <img
                        src={card.imageSrc}
                        alt={card.imageAlt || ""}
                        className="kpromo-media-img"
                      />
                    </div>
                    <div className="kpromo-overlay-text">
                      <span className="kpromo-card-title">
                        {card.title}
                      </span>{" "}
                      {card.accent && (
                        <span className="kpromo-card-accent">
                          {card.accent}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {card.variant === "mixed" && (
                  <div className="kpromo-mixed-inner">
                    <div className="kpromo-card-body kpromo-mixed-text">
                      <p className="kpromo-card-title">
                        {card.title}{" "}
                        {card.accent && (
                          <span className="kpromo-card-accent">
                            {card.accent}
                          </span>
                        )}
                      </p>
                    </div>
                    {card.imageSrc && (
                      <div className="kpromo-mixed-media">
                        <img
                          src={card.imageSrc}
                          alt={card.imageAlt || ""}
                          className="kpromo-media-img"
                        />
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .kpromo {
          width: 100%;
          padding: 80px 0 96px;
          background: var(--color-bg);
          font-family: "Inter Tight", system-ui, -apple-system, sans-serif;
          color: var(--color-text);
        }

        /* Headline container (same position as before) */
        .kpromo-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .kpromo-heading {
          margin-bottom: 40px;
        }

        .kpromo-heading-line {
          margin: 0;
          font-weight: 700;
          font-size: 56px;
          line-height: 1.02;
        }

        .kpromo-heading-accent {
          font-family: "Instrument Serif", "Times New Roman", serif;
          font-style: italic;
          color: var(--color-accent);
          font-weight: 400;
        }

        /* FULL-WIDTH CAROUSEL */

        .kpromo-carousel-outer {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding-top: 8px;
        }

        .kpromo-carousel-mask {
          overflow: hidden;
          width: 100%;
        }

        .kpromo-track {
          display: flex;
          gap: 32px;
          padding: 0 48px 8px;
          width: max-content;
          animation: kpromo-scroll 70s linear infinite;
        }

        /* All cards same size */
        .kpromo-card {
          flex: 0 0 auto;
          width: 340px;
          height: 420px;
          border-radius: 40px;
          position: relative;
          overflow: hidden;
          background: var(--color-surface);
        }

        .kpromo-media {
          width: 100%;
          height: 100%;
        }

        .kpromo-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .kpromo-card-body {
          padding: 28px 28px 24px;
        }

        .kpromo-card-title {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
        }

        .kpromo-card-accent {
          font-family: "Instrument Serif", "Times New Roman", serif;
          font-style: italic;
          font-size: 22px;
          font-weight: 400;
          color: var(--color-accent);
        }

        .kpromo-overlay-text {
          position: absolute;
          top: 20px;
          left: 24px;
        }

        .kpromo-mixed-inner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 24px 24px 24px;
          box-sizing: border-box;
          gap: 16px;
        }

        .kpromo-mixed-text {
          padding: 0;
        }

        .kpromo-mixed-media {
          flex: 1;
          border-radius: 28px;
          overflow: hidden;
        }

        @keyframes kpromo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Responsive tweaks */
        @media (max-width: 900px) {
          .kpromo {
            padding: 64px 0 72px;
          }

          .kpromo-inner {
            padding: 0 20px;
          }

          .kpromo-heading-line {
            font-size: 40px;
          }

          .kpromo-track {
            gap: 24px;
            padding: 0 32px 8px;
          }

          .kpromo-card {
            width: 260px;
            height: 360px;
            border-radius: 32px;
          }

          .kpromo-card-title,
          .kpromo-card-accent {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}
