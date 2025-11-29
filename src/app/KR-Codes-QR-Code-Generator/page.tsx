import Link from "next/link";
import { FooterCTA } from "@/components/footer-cta";
import InfoScreenTwo from "@/components/infoscreens/two";
import "./kr-codes.css";

export default function KRCodesQRGeneratorPage() {
  return (
    <main className="wf-page">
      {/* Hero – reuse InfoScreenTwo */}
      <InfoScreenTwo />

      {/* LogosBar – Trusted by */}
      <section className="wf-section logosBar">
        <div className="wf-container">
          <div className="logos-card">
            <p className="logos-eyebrow">TRUSTED BY TEAMS ON W&F</p>
            <div className="logos-row">
              <span className="logos-item">STUDIO LUMEN</span>
              <span className="logos-item">NORTHLINE</span>
              <span className="logos-item">FIFTH ROOM</span>
              <span className="logos-item">ATLAS &amp; CO</span>
              <span className="logos-item">RIVER STREET</span>
            </div>
          </div>
        </div>
      </section>

      {/* HowItWorks – 3-step flow */}
      <section className="wf-section howItWorks">
        <div className="wf-container">
          <div className="section-heading">
            <h2 className="section-title">
              A simple flow that
              <span className="wf-serif-accent"> respects </span>
              your time.
            </h2>
            <p className="section-subtitle">
              Kompi keeps links, KR Codes, and K-Cards connected — so updates
              take seconds, not a design sprint.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-meta">
                <span className="step-index">01</span>
                <span className="step-pill">Links</span>
              </div>
              <h3 className="step-title">Create a Kompi link once</h3>
              <p className="step-body">
                Shorten or route any URL inside Kompi — product pages, menus,
                sign-up flows, or campaign destinations.
              </p>
              <p className="step-footnote">
                Link analytics are ready the moment you hit publish.
              </p>
            </div>

            <div className="step-card">
              <div className="step-meta">
                <span className="step-index">02</span>
                <span className="step-pill">KR Codes</span>
              </div>
              <h3 className="step-title">Generate on-brand KR Codes</h3>
              <p className="step-body">
                Turn any Kompi link into a KR Code with one click. Adjust size,
                margin, and style to match your brand system.
              </p>
              <p className="step-footnote">
                The KR Code stays stable; only the destination changes.
              </p>
            </div>

            <div className="step-card">
              <div className="step-meta">
                <span className="step-index">03</span>
                <span className="step-pill">K-Cards</span>
              </div>
              <h3 className="step-title">Drop into K-Cards & assets</h3>
              <p className="step-body">
                Attach KR Codes to digital K-Cards, print pieces, or screens.
                Kompi keeps the connection live behind the scenes.
              </p>
              <p className="step-footnote">
                When you update the link, every KR Code and K-Card follows.
              </p>
            </div>
          </div>

          <div className="steps-cta-row">
            <Link href="/dashboard/links/new" className="wf-button-primary">
              Create your first Kompi link
            </Link>
            <Link href="/analytics" className="wf-link-inline">
              Explore scan analytics
            </Link>
          </div>
        </div>
      </section>

      {/* ValueGrid – Three Pillars */}
      <section className="wf-section valueGrid">
        <div className="wf-container">
          <div className="section-heading">
            <h2 className="section-title">
              One system,
              <span className="wf-serif-accent"> three </span>
              channels.
            </h2>
            <p className="section-subtitle">
              Kompi keeps your links, KR Codes, and K-Cards aligned — so teams
              don&apos;t fight version control in Figma and print files.
            </p>
          </div>

          <div className="value-grid">
            <article className="value-card">
              <h3 className="value-title">Links that route intelligently</h3>
              <p className="value-body">
                Use Kompi links as the single source of truth for every
                campaign, menu, or product drop. Switch destinations without
                touching the QR.
              </p>
              <p className="value-tagline">
                Build once; route based on device, time, or workspace rules.
              </p>
            </article>

            <article className="value-card">
              <h3 className="value-title">KR Codes that stay on-brand</h3>
              <p className="value-body">
                Generate crisp, reliable KR Codes that respect your grid, color,
                and layout choices — ready for print or screens.
              </p>
              <p className="value-tagline">
                On-brand QR without hunting down a designer every time.
              </p>
            </article>

            <article className="value-card">
              <h3 className="value-title">K-Cards that travel with you</h3>
              <p className="value-body">
                Attach multiple links and KR Codes to a single K-Card — perfect
                for people, venues, or campaigns that live across channels.
              </p>
              <p className="value-tagline">
                Update the K-Card; your links and KR Codes update with it.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* TestimonialsCarousel – Social proof */}
      <section className="wf-section testimonialsCarousel">
        <div className="wf-container">
          <div className="testimonials-shell">
            <div className="testimonials-header">
              <h2 className="section-title">
                Teams that
                <span className="wf-serif-accent"> live </span>
                in Kompi every day.
              </h2>
              <p className="section-subtitle">
                From studios to restaurants and venues, Kompi KR Codes keep
                teams shipping without re-printing their entire brand.
              </p>
            </div>

            <div className="testimonials-row">
              <article className="testimonial-card">
                <p className="testimonial-quote">
                  “We swapped every menu QR to Kompi KR Codes in one afternoon —
                  and haven&apos;t had to reprint a single card since.”
                </p>
                <p className="testimonial-meta">
                  Operations lead · multi-site restaurant group
                </p>
              </article>

              <article className="testimonial-card">
                <p className="testimonial-quote">
                  “Marketing updates the links, venues keep using the same
                  printed posters. Kompi quietly handles the hard part.”
                </p>
                <p className="testimonial-meta">
                  Brand manager · live events &amp; venues
                </p>
              </article>

              <article className="testimonial-card">
                <p className="testimonial-quote">
                  “K-Cards plus KR Codes let us ship campaigns in days instead
                  of weeks. Designers aren&apos;t gatekeepers any more.”
                </p>
                <p className="testimonial-meta">
                  Creative director · digital studio
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA_Footer – shared component footer */}
      <FooterCTA />
    </main>
  );
}
