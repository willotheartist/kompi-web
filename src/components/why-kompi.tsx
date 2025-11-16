"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./why-kompi.css";

const SLIDES = [
  {
    id: 0,
    tone: "dark",
    icon: "/globe.svg",
    title: "Flexibility",
    body: "Change destinations anytime.",
    cta: "Try routing",
    href: "/dashboard/links",
  },
  {
    id: 1,
    tone: "soft",
    icon: "/window.svg",
    title: "Branded KR Codes",
    body: "QR that updates instantly.",
    cta: "Create KR Code",
    href: "/dashboard/kr-codes",
  },
  {
    id: 2,
    tone: "light",
    icon: "/file.svg",
    title: "K-Cards",
    body: "Profiles for everything.",
    cta: "Browse K-Cards",
    href: "/k-cards",
  },
  {
    id: 3,
    tone: "soft",
    icon: "/next.svg",
    title: "Links",
    body: "One workspace for all links.",
    cta: "Open workspace",
    href: "/dashboard",
  },
  {
    id: 4,
    tone: "light",
    icon: "/vercel.svg",
    title: "Analytics",
    body: "See what performs.",
    cta: "Open analytics",
    href: "/analytics",
  },
];

const AUTO_MS = 8000; // Perk slow autoplay

function wrap(i: number, len: number) {
  return (i + len) % len;
}

export function WhyKompi() {
  const [index, setIndex] = useState(0);

  // Smooth autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => wrap(i + 1, SLIDES.length));
    }, AUTO_MS);
    return () => clearInterval(id);
  }, []);

  const next = () => setIndex((i) => wrap(i + 1, SLIDES.length));
  const prev = () => setIndex((i) => wrap(i - 1, SLIDES.length));

  return (
    <section className="wk-section">
      <header className="wk-header">
        <p className="wk-eyebrow">WHY KOMPI</p>
        <h2 className="wk-title">Why Kompi?</h2>
        <p className="wk-sub">A fast carousel of core Kompi features.</p>
      </header>

      <div className="wk-stage">
        <div className="wk-track">
          {SLIDES.map((s, i) => {
            const left = wrap(index - 1, SLIDES.length);
            const right = wrap(index + 1, SLIDES.length);

            let slot = "hidden";
            if (i === index) slot = "center";
            else if (i === left) slot = "left";
            else if (i === right) slot = "right";

            return (
              <div
                key={s.id}
                className={`wk-card wk-${slot} wk-tone-${s.tone}`}
              >
                <div className="wk-media">
                  <Image src={s.icon} alt="" width={72} height={72} />
                </div>

                <div className="wk-content">
                  <h3 className="wk-card-title">{s.title}</h3>
                  <p className="wk-card-body">{s.body}</p>

                  <Link href={s.href} className="wk-cta">
                    {s.cta} <span className="wk-arrow">›</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls BELOW cards = never blocked */}
      <div className="wk-controls">
        <div className="wk-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`wk-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className="wk-arrows">
          <button className="wk-nav" onClick={prev}>‹</button>
          <button className="wk-nav" onClick={next}>›</button>
        </div>
      </div>
    </section>
  );
}
