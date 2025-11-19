"use client";

import { useRef } from "react";
import Image from "next/image";
import "./krow.css";

type KRowCard = {
  id: string;
  label: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

const CARDS: KRowCard[] = [
  {
    id: "krow-perk-cards",
    label: "K-Cards",
    title: "Tap-to-share cards that feel premium.",
    body: "Hand out NFC cards that land on smart Kompi links, so every tap rolls into the same clean analytics.",
    imageSrc: "/kompione.png",
    imageAlt: "Person holding a Kompi K-Card",
  },
  {
    id: "krow-flex-campaigns",
    label: "Campaign rows",
    title: "Flexible campaigns you can remix fast.",
    body: "Group links, QR codes and bios into rows for each launch, then reuse the layouts for the next drop.",
    imageSrc: "/kompitwo.png",
    imageAlt: "Kompi interface showing flexible campaign layouts",
  },
  {
    id: "krow-group-events",
    label: "Pop-ups & events",
    title: "QR flows that don’t break on day two.",
    body: "Print once, update destinations whenever you need — without reprinting posters or chasing old links.",
    imageSrc: "/kompithree.png",
    imageAlt: "Event space with Kompi QR codes",
  },
  {
    id: "krow-client-reports",
    label: "Client reports",
    title: "Deck-ready views for every client.",
    body: "Open one row per client, grab screenshots, export CSV — Kompi keeps everything report-ready.",
    imageSrc: "/kompifour.png",
    imageAlt: "Laptop showing analytics style dashboards",
  },
];

export default function KRow() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(".krow-card");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24;
    const delta =
      direction === "next" ? cardWidth + gap : -(cardWidth + gap);

    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="krow" aria-label="Kompi use case cards">
      <div className="krow-inner">
        <div className="krow-head">
          <p className="krow-eyebrow">KRow</p>
          <h2 className="krow-heading">
            Spin up{" "}
            <span className="krow-serif">rows of campaigns</span> that stay
            on-brand.
          </h2>
          <p className="krow-intro">
            Drop K-Cards, QR flows and links into one calm row of cards.
            Scroll through use cases, grab inspiration and ship your next
            rollout without starting from scratch.
          </p>
        </div>

        <div className="krow-row">
          <div className="krow-track" ref={trackRef}>
            {CARDS.map((card) => (
              <article key={card.id} className="krow-card">
                <div className="krow-image-wrap">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={640}
                    height={400}
                    className="krow-image"
                  />
                </div>
                <div className="krow-card-body">
                  <p className="krow-label">{card.label}</p>
                  <h3 className="krow-card-title">{card.title}</h3>
                  <p className="krow-card-copy">{card.body}</p>
                  <button className="krow-cta" type="button">
                    Learn more
                    <span className="krow-cta-icon">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="krow-meta">
            <div className="krow-dots" aria-hidden="true">
              {CARDS.map((card, index) => (
                <span
                  key={card.id}
                  className={
                    "krow-dot " +
                    (index === 0 ? "krow-dot--active" : "")
                  }
                />
              ))}
            </div>
            <div className="krow-arrows">
              <button
                type="button"
                className="krow-arrow"
                onClick={() => scrollByCard("prev")}
                aria-label="Scroll to previous cards"
              >
                ‹
              </button>
              <button
                type="button"
                className="krow-arrow"
                onClick={() => scrollByCard("next")}
                aria-label="Scroll to next cards"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
