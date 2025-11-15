"use client";

import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "./kompi-marketing.css";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="wf-page">
      <Navbar />

      <motion.main
        className="wf-main"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* HeroA – Calm Product Hero */}
        <Section className="wf-section-hero">
          <Container>
            <motion.div
              className="wf-hero-layout"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <p className="wf-eyebrow">
                Kompi Links · For studios, agencies &amp; modern creators
              </p>

              <Heading as="h1" className="wf-hero-heading">
                Run your links, bios &amp; campaigns
                <span className="wf-hero-heading-line">
                  from one{" "}
                  <span className="wf-serif-accent">opinionated</span> platform.
                </span>
              </Heading>

              <p className="wf-hero-body">
                Short links, smart bio pages, QR codes and live analytics — in a
                UI that doesn&apos;t feel like 2013. Built so you can sell,
                report and grow without duct-taping five tools.
              </p>

              <motion.div
                className="wf-hero-ctas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.24, ease: "easeOut" }}
              >
                <Button asChild className="wf-btn-primary">
                  <Link href="/signin">Start free in 30 seconds</Link>
                </Button>
                <Button asChild variant="outline" className="wf-btn-secondary">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </motion.div>

              <motion.p
                className="wf-hero-meta"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.22, ease: "easeOut" }}
              >
                No credit card. Unlimited links on launch promo.
              </motion.p>
            </motion.div>
          </Container>
        </Section>

        {/* LogosBar – Trusted By */}
        <Section className="wf-section-tight">
          <Container>
            <motion.div
              className="wf-logos-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="wf-logos-label">
                TRUSTED BY TEAMS ON{" "}
                <span className="wf-serif-accent">K-Cards</span>
              </p>
              <div className="wf-logos-row">
                <span>STUDIO WILLO</span>
                <span>LOOP LAB</span>
                <span>BRIGHT PIXEL</span>
                <span>NORTHSIDE AUDIO</span>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* ValueGrid – Core benefits + pricing teaser */}
        <Section>
          <Container>
            <div className="wf-stack-vertical">
              <div className="wf-intro-block">
                <Heading as="h2" className="wf-section-heading">
                  Links that feel{" "}
                  <span className="wf-serif-accent">designed</span>, not bolted
                  on.
                </Heading>
                <p className="wf-section-intro">
                  Kompi keeps short links, bio pages, QR codes and analytics in
                  one calm workspace, so campaigns stay clear for you, your
                  clients and your reports.
                </p>
              </div>

              <motion.div
                id="features"
                className="grid gap-4 md:grid-cols-3"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              >
                <div className="wf-card">
                  <h3 className="wf-card-title">Smarter short links</h3>
                  <p className="wf-card-body">
                    Branded, trackable links that load fast and plug straight
                    into your reports.
                  </p>
                </div>

                <div className="wf-card">
                  <h3 className="wf-card-title">Beautiful bio pages</h3>
                  <p className="wf-card-body">
                    Opinionated link-in-bio layouts styled for real brands, not
                    generic templates.
                  </p>
                </div>

                <div className="wf-card">
                  <h3 className="wf-card-title">Live analytics</h3>
                  <p className="wf-card-body">
                    See clicks, referrers, devices and campaigns in one place —
                    per link and per workspace.
                  </p>
                </div>
              </motion.div>

              <motion.div
                id="pricing"
                className="wf-pricing-row"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <div className="wf-pricing-copy">
                  <p className="wf-eyebrow">Built to pay for itself</p>
                  <p className="wf-small">
                    Transparent, simple pricing — see full plans on the pricing
                    page.
                  </p>
                </div>
                <Button asChild className="wf-btn-primary wf-btn-compact">
                  <Link href="/pricing">Explore plans</Link>
                </Button>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* HowItWorks – Kompi in your stack */}
        <Section className="wf-band-accent-soft">
          <Container>
            <motion.div
              className="grid gap-10 md:grid-cols-2 md:items-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="wf-howitworks-copy">
                <p className="wf-eyebrow">Kompi in your stack</p>
                <Heading as="h2" className="wf-section-heading">
                  A single link layer for everything you{" "}
                  <span className="wf-serif-accent">ship</span>.
                </Heading>
                <p className="wf-section-intro">
                  Launch a campaign, post a video, drop a product — Kompi keeps
                  every touchpoint behind one clean URL, with analytics that
                  follow the story instead of each platform.
                </p>
                <ul className="wf-bullet-list">
                  <li>Use one link across Instagram, TikTok, X, email and QR.</li>
                  <li>Swap destinations without breaking old posts.</li>
                  <li>
                    Keep your team, clients and reports all in one workspace.
                  </li>
                </ul>
              </div>

              <div className="wf-howitworks-card-wrap">
                <div className="wf-floating-card">
                  <div className="wf-floating-card-meta">
                    <span className="wf-pill-url">kompi.app/willo</span>
                    <span className="wf-small">Workspace · Studio</span>
                  </div>
                  <div className="wf-floating-card-rows">
                    <FakeRow label="IG bio" dest="Latest campaign page" />
                    <FakeRow
                      label="YouTube description"
                      dest="Episode-specific link"
                    />
                    <FakeRow
                      label="Podcast QR code"
                      dest="Sponsor landing"
                    />
                    <FakeRow
                      label="Paid ads"
                      dest="Experiment A/B URLs"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* ValueGrid – Personas / Who Kompi is for */}
        <Section>
          <Container>
            <motion.div
              className="wf-stack-vertical"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <div className="wf-intro-block">
                <p className="wf-eyebrow">Who Kompi is for</p>
                <Heading as="h2" className="wf-section-heading">
                  From solo link-in-bio to full studio{" "}
                  <span className="wf-serif-accent">rollouts</span>.
                </Heading>
                <p className="wf-section-intro">
                  Start as one creator, add clients, collaborators and team
                  members as you grow. Same login, shared analytics, separate
                  workspaces.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <PersonaCard
                  title="Creators"
                  bullet1="Turn one link into a home for your drops, streams and offers."
                  bullet2="Track which channel actually moves the needle."
                  badge="From the Free plan"
                />
                <PersonaCard
                  title="Studios & agencies"
                  bullet1="Give each client a workspace with links, bios and QR codes."
                  bullet2="Roll up analytics without logging into five ad accounts."
                  badge="Popular with K-Cards"
                />
                <PersonaCard
                  title="Teams & brands"
                  bullet1="Connect custom domains and keep everything on-brand."
                  bullet2="Permissioned access for marketing, growth and partners."
                  badge="Team plan"
                />
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* ValueGrid – Analytics focus */}
        <Section className="wf-band-surface">
          <Container>
            <motion.div
              className="wf-analytics-shell"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="wf-analytics-header">
                <p className="wf-eyebrow">Analytics without the headache</p>
                <Heading
                  as="h2"
                  align="center"
                  className="wf-section-heading wf-section-heading-center"
                >
                  Know what&apos;s{" "}
                  <span className="wf-serif-accent">working</span> — without
                  opening ten dashboards.
                </Heading>
                <p className="wf-section-intro wf-text-center">
                  Kompi gives you the click, device, location and UTM breakdown
                  you actually need. Export to CSV when the data team wants to
                  go deeper, ignore the rest.
                </p>
              </div>

              <div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
                <AnalyticsPill
                  label="Per-link insights"
                  body="See performance by link, campaign or workspace in seconds."
                />
                <AnalyticsPill
                  label="Real-time feel"
                  body="New clicks and QR scans show up in your dashboard almost instantly."
                />
                <AnalyticsPill
                  label="Client-ready"
                  body="Screenshots you’re not embarrassed to paste into decks and reports."
                />
              </div>

              <Button asChild className="wf-btn-primary wf-btn-compact">
                <Link href="/signin">Open your first dashboard</Link>
              </Button>
            </motion.div>
          </Container>
        </Section>

        {/* Testimonials – Simple band */}
        <Section className="wf-section-tight">
          <Container>
            <motion.div
              className="wf-testimonials-shell"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <div className="wf-testimonials-header">
                <Heading as="h2" className="wf-section-heading">
                  Teams that{" "}
                  <span className="wf-serif-accent">live</span> in clean links.
                </Heading>
                <p className="wf-section-intro">
                  Kompi sits quietly underneath campaigns for studios, agencies
                  and in-house teams that care about how things feel.
                </p>
              </div>

              <div className="wf-testimonials-grid">
                <div className="wf-testimonial-card">
                  <p className="wf-testimonial-quote">
                    “Kompi replaced three tools in a week. Clients finally
                    understand where clicks are coming from.”
                  </p>
                  <p className="wf-testimonial-meta">
                    Studio lead · Campaigns agency
                  </p>
                </div>
                <div className="wf-testimonial-card">
                  <p className="wf-testimonial-quote">
                    “QRs, short links and K-Cards all point to the same place.
                    Our team hasn&apos;t touched a spreadsheet in months.”
                  </p>
                  <p className="wf-testimonial-meta">
                    Growth manager · DTC brand
                  </p>
                </div>
                <div className="wf-testimonial-card">
                  <p className="wf-testimonial-quote">
                    “We ship new promos weekly and never worry about broken bios
                    or outdated links.”
                  </p>
                  <p className="wf-testimonial-meta">
                    Creator manager · Talent studio
                  </p>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>
      </motion.main>

      {/* CTA_Footer – handled by shared component */}
      <FooterCTA />
    </div>
  );
}

/* Layout primitives */

function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const cls = ["wf-section", className].filter(Boolean).join(" ");
  return <section className={cls}>{children}</section>;
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
  as: Tag = "h2",
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

/* Helper components for sections */

function FakeRow({ label, dest }: { label: string; dest: string }) {
  return (
    <div className="wf-fakerow">
      <span className="wf-fakerow-label">{label}</span>
      <span className="wf-fakerow-dest">{dest}</span>
    </div>
  );
}

function PersonaCard({
  title,
  bullet1,
  bullet2,
  badge,
}: {
  title: string;
  bullet1: string;
  bullet2: string;
  badge: string;
}) {
  return (
    <div className="wf-persona-card">
      <div className="wf-persona-copy">
        <h3 className="wf-persona-title">{title}</h3>
        <p className="wf-persona-body">{bullet1}</p>
        <p className="wf-persona-body">{bullet2}</p>
      </div>
      <span className="wf-persona-badge">{badge}</span>
    </div>
  );
}

function AnalyticsPill({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="wf-analytics-pill">
      <h3 className="wf-analytics-title">{label}</h3>
      <p className="wf-analytics-body">{body}</p>
    </div>
  );
}
