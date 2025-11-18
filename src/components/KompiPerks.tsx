"use client";

import React from "react";
import { motion } from "framer-motion";

type PerkCard = {
  id: string;
  label: string;
  title: string;
  accent?: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  tone?: "accent" | "accent-soft" | "neutral";
};

const PERKS: PerkCard[] = [
  {
    id: "live-campaigns",
    label: "Campaign-ready",
    title: "Live links that stay in sync",
    accent: "everywhere.",
    body: "Update destinations once and keep QR codes, bios and short links pointing to the right place — without chasing old posts.",
    imageSrc: "/kompione.png",
    imageAlt: "Kompi promo artwork",
    tone: "neutral",
  },
  {
    id: "qr-magic",
    label: "K-Cards & QR",
    title: "Physical touchpoints that",
    accent: "actually convert.",
    body: "Pair K-Cards and QR posters with smart links, so every tap and scan rolls into the same clean analytics.",
    imageSrc: "/kompitwo.png",
    imageAlt: "Kompi promo artwork",
    tone: "accent-soft",
  },
  {
    id: "creator-mode",
    label: "Creator mode",
    title: "Bio pages that feel",
    accent: "designed.",
    body: "Ship on-brand link-in-bio pages with layouts made for real brands, not generic templates from 2013.",
    imageSrc: "/kompithree.png",
    imageAlt: "Kompi promo artwork",
    tone: "neutral",
  },
  {
    id: "client-reports",
    label: "Client-ready",
    title: "Reports you can drop",
    accent: "into decks.",
    body: "Show clients where clicks come from, per campaign and per workspace, in a UI that doesn’t need explaining.",
    imageSrc: "/kompifour.png",
    imageAlt: "Kompi promo artwork",
    tone: "accent-soft",
  },
  {
    id: "team-workspaces",
    label: "Teams & studios",
    title: "Workspaces built",
    accent: "for rollouts.",
    body: "Give each client or brand their own space with shared links, bio pages and analytics your whole team can trust.",
    imageSrc: "/kompifive.png",
    imageAlt: "Kompi promo artwork",
    tone: "neutral",
  },
];

const toneBg = (tone?: PerkCard["tone"]) => {
  if (tone === "accent") return "var(--color-accent)";
  if (tone === "accent-soft") return "var(--color-accent-soft)";
  return "var(--color-surface)";
};

export default function KompiPerks() {
  return (
    <section
      className="kperks"
      aria-label="Kompi features and perks"
    >
      {/* Heading / intro */}
      <div className="kperks-inner">
        <motion.div
          className="kperks-head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        >
          <p className="kperks-eyebrow">Kompi perks</p>
          <h2 className="kperks-heading">
            Make every{" "}
            <span className="kperks-serif">touchpoint</span> feel intentional.
          </h2>
          <p className="kperks-intro">
            From first tap to final report, Kompi keeps links, QR codes and bio
            pages under one roof — so your campaigns feel designed, not duct
            taped.
          </p>
        </motion.div>
      </div>

      {/* Full-width horizontal strip */}
      <motion.div
        className="kperks-band"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.36, ease: "easeOut" }}
      >
        <div className="kperks-scroller">
          <div className="kperks-track">
            {[...PERKS, ...PERKS].map((perk, index) => (
              <article
                key={perk.id + "-" + index}
                className="kperks-card"
                style={{ background: toneBg(perk.tone) }}
              >
                <div className="kperks-image-wrap">
                  <img
                    src={perk.imageSrc}
                    alt={perk.imageAlt}
                    className="kperks-image"
                  />
                </div>
                <div className="kperks-card-body">
                  <p className="kperks-label">{perk.label}</p>
                  <h3 className="kperks-card-title">
                    {perk.title}{" "}
                    {perk.accent && (
                      <span className="kperks-card-accent">
                        {perk.accent}
                      </span>
                    )}
                  </h3>
                  <p className="kperks-card-copy">{perk.body}</p>
                  <button className="kperks-cta" type="button">
                    Learn more
                    <span className="kperks-cta-icon">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .kperks {
          width: 100%;
          padding: 88px 0 104px;
          background: var(--color-bg);
          font-family: "Inter Tight", system-ui, -apple-system, sans-serif;
          color: var(--color-text);
        }

        .kperks-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .kperks-head {
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .kperks-eyebrow {
          margin: 0 0 4px;
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-subtle);
        }

        .kperks-heading {
          margin: 0;
          font-size: 32px;
          line-height: 1.15;
          font-weight: 700;
        }

        .kperks-serif {
          font-family: "Instrument Serif", "Times New Roman", serif;
          font-style: italic;
          color: var(--color-accent);
          font-weight: 400;
        }

        .kperks-intro {
          margin: 4px 0 0;
          font-size: 15px;
          line-height: 1.7;
          color: var(--color-subtle);
          max-width: 520px;
        }

        /* Full-width band for scroller */
        .kperks-band {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: 32px;
        }

        .kperks-scroller {
          overflow-x: auto;
          padding: 18px 0 10px;
          scrollbar-width: none;
        }

        .kperks-scroller::-webkit-scrollbar {
          display: none;
        }

        .kperks-track {
          display: flex;
          gap: 32px;
          padding: 0 48px 20px;
          width: max-content;
          scroll-snap-type: x mandatory;
        }

        .kperks-card {
          scroll-snap-align: start;
          width: 360px;
          border-radius: 32px;
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .kperks-image-wrap {
          width: 100%;
          height: 210px;
          overflow: hidden;
        }

        .kperks-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .kperks-card-body {
          padding: 22px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kperks-label {
          margin: 0 0 2px;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-subtle);
        }

        .kperks-card-title {
          margin: 0;
          font-size: 18px;
          line-height: 1.35;
          font-weight: 650;
        }

        .kperks-card-accent {
          font-family: "Instrument Serif", "Times New Roman", serif;
          font-style: italic;
          font-weight: 400;
          color: var(--color-accent-soft);
        }

        .kperks-card-copy {
          margin: 4px 0 0;
          font-size: 14px;
          line-height: 1.7;
          color: var(--color-subtle);
        }

        .kperks-cta {
          margin-top: 14px;
          align-self: flex-start;
          border-radius: 999px;
          border: 1px solid var(--color-border);
          padding: 8px 16px;
          font-size: 13px;
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

        .kperks-cta-icon {
          font-size: 12px;
        }

        .kperks-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          background: var(--color-accent-soft);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .kperks {
            padding: 72px 0 88px;
          }

          .kperks-inner {
            padding: 0 20px;
          }

          .kperks-head {
            margin-bottom: 24px;
          }

          .kperks-heading {
            font-size: 26px;
          }

          .kperks-band {
            margin-top: 24px;
          }

          .kperks-track {
            padding: 0 24px 18px;
            gap: 24px;
          }

          .kperks-card {
            width: 280px;
          }

          .kperks-image-wrap {
            height: 190px;
          }
        }
      `}</style>
    </section>
  );
}
