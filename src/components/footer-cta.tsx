"use client";

import Link from "next/link";
import "./footer-cta.css";

const columns = [
  {
    title: "Solutions",
    items: [
      { label: "Creators & influencers", href: "/solutions" },
      { label: "Restaurants & menus", href: "/solutions" },
      { label: "Agencies & teams", href: "/solutions" },
      { label: "Offline campaigns", href: "/solutions" },
      { label: "Personal branding", href: "/solutions" },
    ],
  },
  {
    title: "Product",
    items: [
      { label: "URL Shortener", href: "/features/url-shortener" },
      { label: "QR Code Generator", href: "/qr-code-generator" },
      { label: "Mini Landing Pages", href: "/p/demo" },
      { label: "Kompi Pages", href: "/k-cards" },
      { label: "QR Menus", href: "/qr-menus" },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Analytics", href: "/analytics" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Workspaces", href: "/dashboard/settings" },
      { label: "Integrations", href: "/dashboard/settings/integrations" },
      { label: "Subscribers", href: "/dashboard/subscribers" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "Sign in", href: "/signin" },
      { label: "Create account", href: "/signup" },
      { label: "Forgot password", href: "/forgot-password" },
      { label: "Support", href: "/dashboard/support" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Password Generator", href: "/tools/password-generator" },
      { label: "Image to PDF", href: "/tools/image-to-pdf" },
      { label: "PDF Converter", href: "/tools/pdf-converter" },
      { label: "Instagram Caption Generator", href: "/tools/instagram-caption-generator" },
      { label: "UTM Builder", href: "/tools/utm-builder" },
    ],
  },
];

export function FooterCTA() {
  const year = new Date().getFullYear();

  return (
    <footer className="kompi-footer">
      <div className="kompi-footer__shell">
        <div className="kompi-footer__panel">
          <div className="kompi-footer__top">
            {/* Brand / description block */}
            <section className="kompi-footer__brand">
              <div className="kompi-footer__logo-mark">Kompi.</div>

              <p className="kompi-footer__brand-body">
                Kompi is a growth platform for creators and teams — from short
                links and QR codes to mini landing pages and analytics.
              </p>

              <div
                className="kompi-footer__social-row"
                aria-label="Kompi social"
              >
                <Link
                  href="https://x.com"
                  aria-label="Kompi on X"
                  className="kompi-footer__social-btn"
                >
                  <span className="kompi-footer__social-icon">X</span>
                </Link>
                <Link
                  href="https://instagram.com"
                  aria-label="Kompi on Instagram"
                  className="kompi-footer__social-btn"
                >
                  <span className="kompi-footer__social-icon">IG</span>
                </Link>
                <Link
                  href="https://linkedin.com"
                  aria-label="Kompi on LinkedIn"
                  className="kompi-footer__social-btn"
                >
                  <span className="kompi-footer__social-icon">in</span>
                </Link>
              </div>
            </section>

            {/* Navigation columns */}
            <nav
              className="kompi-footer__nav"
              aria-label="Kompi footer navigation"
            >
              {columns.map((col) => (
                <div key={col.title} className="kompi-footer__column">
                  <h3 className="kompi-footer__column-title">{col.title}</h3>
                  <ul className="kompi-footer__list">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="kompi-footer__link">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="kompi-footer__bottom">
            <p className="kompi-footer__copyright">
              © {year} Kompi by Wall &amp; Fifth Ltd.
            </p>

            <div className="kompi-footer__bottom-links">
              <Link href="/legal/terms" className="kompi-footer__bottom-link">
                Terms &amp; Conditions
              </Link>
              <Link href="/legal/privacy" className="kompi-footer__bottom-link">
                Privacy Policy
              </Link>
              <Link href="/legal/cookies" className="kompi-footer__bottom-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
