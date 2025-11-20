"use client";

import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Pattern: FeatureMatrixA – Kompi capabilities cards
 *
 * Background: handled via CSS (e.g. .wf-section-one { background: var(--color-bg-strong); })
 * You can map that token to #14140f in your theme/CSS.
 */

export default function SectionOne() {
  return (
    <Section className="wf-section-one">
      <Container>
        {/* Top heading block */}
        <motion.div
          className="wf-section-one-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Heading as="h2" align="center" className="wf-section-one-heading">
            It&apos;s not magic.
            <br />
            It&apos;s <span className="wf-serif-accent">Kompi.</span>
          </Heading>
          <p className="wf-section-one-subtitle">
            See how Kompi keeps QR codes, K-Cards, short links and your audience
            in one calm platform — so every campaign feels connected.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          className="wf-section-one-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 0.61, 0.36, 1],
            staggerChildren: 0.12,
          }}
        >
          <FeatureCard
            eyebrow="QR codes"
            title="QR codes that feel on-brand."
            body="Generate QR codes that match your brand, not a generic builder. Point them at Kompi links you can swap anytime."
            linkLabel="More about QR codes"
          />

          <FeatureCard
            eyebrow="K-Cards"
            title="K-Cards that tap into live flows."
            body="Give clients and teams NFC cards that always route through Kompi, so you can update destinations without reprinting."
            linkLabel="More about K-Cards"
          />

          <FeatureCard
            eyebrow="Track links"
            title="Every short link in one workspace."
            body="Keep campaign, channel and client links together. No more hunting across spreadsheets and screenshot folders."
            linkLabel="More about tracking"
          />

          <FeatureCard
            eyebrow="Audience"
            title="Your audience, one story."
            body="See clicks, scans and taps across QR, K-Cards and bios in one place. Understand the journey, not just the last click."
            linkLabel="More about audience"
          />
        </motion.div>
      </Container>
    </Section>
  );
}

/* Card component */

function FeatureCard({
  eyebrow,
  title,
  body,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  linkLabel: string;
}) {
  return (
    <motion.article
      className="wf-section-one-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="wf-section-one-card-inner">
        <p className="wf-eyebrow wf-section-one-card-eyebrow">{eyebrow}</p>

        <div className="wf-section-one-card-body">
          <h3 className="wf-section-one-card-title">{title}</h3>
          <p className="wf-section-one-card-copy">{body}</p>
        </div>

        {/* Placeholder SVG illustration – swap with real artwork later */}
        <div className="wf-section-one-card-illustration" aria-hidden="true">
          <svg
            viewBox="0 0 120 72"
            className="wf-section-one-card-svg"
            role="presentation"
          >
            <rect
              x="4"
              y="8"
              width="80"
              height="40"
              rx="10"
              className="wf-section-one-card-svg-block"
            />
            <circle
              cx="92"
              cy="20"
              r="10"
              className="wf-section-one-card-svg-accent"
            />
            <path
              d="M12 56 H108"
              className="wf-section-one-card-svg-line"
            />
          </svg>
        </div>

        <div className="wf-section-one-card-link">
          <Link href="/features" className="wf-text-link">
            {linkLabel} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* Layout primitives (consistent with W&F) */

function Section({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const cls = ["wf-section", className].filter(Boolean).join(" ");
  return (
    <section className={cls} style={style}>
      {children}
    </section>
  );
}

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const cls = ["wf-container", className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}

function Heading({
  as: Tag = "h1",
  children,
  align = "left",
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignClass = align === "center" ? "wf-heading-center" : "";
  const cls = ["wf-heading", alignClass, className].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
