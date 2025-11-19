"use client";

import Image from "next/image";

type PerkCard = {
  id: string;
  topLabel: string;
  stat: string; // kept in data in case you want later, but not rendered
  statCaption: string;
  eyebrow: string;
  title: string;
  copy: string;
  meta: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
};

const CARDS: PerkCard[] = [
  {
    id: "studio-rollout",
    topLabel: "Studio · Campaign rollout",
    stat: "800",
    statCaption: "links under control",
    eyebrow: "Studio · Campaign rollout",
    title: "How a creative studio rolled all their links into Kompi.",
    copy: "One workspace for links, QR flows and bio pages, so every client launch reuses the same pattern.",
    meta: "Campaigns lead · Multi-brand studio",
    tags: ["Travel", "Retail", "North America"],
    imageSrc: "/kompione.png",
    imageAlt: "Creative studio team gathered around a table",
  },
  {
    id: "growth-always-on",
    topLabel: "Growth · Always-on",
    stat: "90%",
    statCaption: "expense automation lift",
    eyebrow: "Growth · Always-on",
    title: "How a growth team swaps URLs without breaking posts.",
    copy: "Short links behind every promo, updated once in Kompi instead of across ten tools.",
    meta: "Growth manager · DTC brand",
    tags: ["SaaS", "DTC", "Switzerland"],
    imageSrc: "/kompitwo.png",
    imageAlt: "People running, representing fast growth",
  },
  {
    id: "creator-program",
    topLabel: "Creators · Partner program",
    stat: "60",
    statCaption: "creators in one view",
    eyebrow: "Creators · Partner program",
    title: "How a talent team keeps creator links on-brand.",
    copy: "Shared templates for bios, QR posters and K-Cards so every creator feels premium out of the box.",
    meta: "Creator manager · Talent collective",
    tags: ["Talent", "Partner program", "Global"],
    imageSrc: "/kompithree.png",
    imageAlt: "Bouquet of flowers in the sky",
  },
];

export default function KBenefits() {
  return (
    <section
      className="perk-band"
      aria-label="Businesses getting the job done with Kompi"
    >
      <div className="perk-shell">
        <header className="perk-header">
          <h2 className="perk-heading">Businesses getting the job done</h2>
        </header>

        <div className="perk-grid">
          {CARDS.map((card, index) => (
            <article
              key={card.id}
              className={`perk-card ${index === 1 ? "perk-card--wide" : ""}`}
            >
              {/* IMAGE ONLY – no pills on top */}
              <div className="perk-media">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={960}
                  height={640}
                  className="perk-image"
                />
              </div>

              {/* TEXT BLOCK */}
              <div className="perk-body">
                <div className="perk-tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="perk-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="perk-eyebrow">{card.eyebrow}</p>
                <h3 className="perk-title">{card.title}</h3>
                <p className="perk-copy">{card.copy}</p>
                <p className="perk-meta">{card.meta}</p>

                <button className="perk-cta" type="button">
                  Read more
                  <span className="perk-cta-icon">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="perk-footer">
          <button className="perk-footer-cta" type="button">
            Browse all stories
            <span className="perk-footer-icon">↗</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .perk-band {
          width: 100%;
          padding: 80px 0 96px;
          background: var(--color-bg);
          font-family: "Inter Tight", system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: var(--color-text);
        }

        .perk-shell {
          max-width: 1240px;
          margin: 0 auto;
          padding: 40px 32px 36px;
          border-radius: 40px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: var(--wf-shadow-sm);
        }

        .perk-header {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .perk-heading {
          margin: 0;
          font-weight: 700;
          letter-spacing: -0.03em;
          font-size: clamp(1.9rem, 2.1vw + 1rem, 2.4rem);
          line-height: 1.2;
        }

        .perk-grid {
          display: grid;
          gap: 24px;
        }

        @media (min-width: 960px) {
          .perk-grid {
            grid-template-columns: 1.05fr 1.3fr 1.05fr;
          }
        }

        .perk-card {
          background: var(--color-bg);
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          box-shadow: var(--wf-shadow-sm);
        }

        .perk-card--wide {
          box-shadow: var(--wf-shadow-md);
        }

        .perk-media {
          width: 100%;
          height: 230px;
          overflow: hidden;
        }

        .perk-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .perk-body {
          padding: 18px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .perk-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 6px;
        }

        .perk-tag-chip {
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          font-size: 0.72rem;
        }

        .perk-eyebrow {
          margin: 0;
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-subtle);
        }

        .perk-title {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 650;
        }

        .perk-copy {
          margin: 4px 0 0;
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--color-subtle);
        }

        .perk-meta {
          margin: 8px 0 0;
          font-size: 0.8rem;
          color: var(--color-subtle);
        }

        .perk-cta {
          margin-top: 14px;
          align-self: flex-start;
          border-radius: 999px;
          border: 1px solid var(--color-border);
          padding: 8px 16px;
          font-size: 0.86rem;
          font-weight: 500;
          background: var(--color-surface);
          color: var(--color-text);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 0.16s ease-out, box-shadow 0.16s ease-out,
            background-color 0.16s ease-out;
        }

        .perk-cta-icon {
          font-size: 0.8rem;
        }

        .perk-cta:hover {
          transform: translateY(-1px);
          box-shadow: var(--wf-shadow-md);
          background: var(--color-bg);
        }

        .perk-footer {
          margin-top: 28px;
          display: flex;
          justify-content: flex-end;
        }

        .perk-footer-cta {
          border-radius: 999px;
          border: 1px solid var(--color-border);
          padding: 10px 20px;
          font-size: 0.86rem;
          font-weight: 500;
          background: var(--color-bg);
          color: var(--color-text);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 0.16s ease-out, box-shadow 0.16s ease-out,
            background-color 0.16s ease-out;
        }

        .perk-footer-icon {
          font-size: 0.8rem;
        }

        .perk-footer-cta:hover {
          transform: translateY(-1px);
          box-shadow: var(--wf-shadow-md);
          background: var(--color-surface);
        }

        @media (max-width: 960px) {
          .perk-band {
            padding: 64px 0 80px;
          }

          .perk-shell {
            padding-inline: 20px;
            border-radius: 32px;
          }

          .perk-media {
            height: 210px;
          }

          .perk-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .perk-shell {
            padding-inline: 18px;
          }

          .perk-footer {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
