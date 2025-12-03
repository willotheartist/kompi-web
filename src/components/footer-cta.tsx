"use client";

import Link from "next/link";
import "./footer-cta.css";

const columns = [
  {
    title: "PRODUCTS",
    items: [
      { label: "URL Shortener", href: "/features/url-shortener" },
      { label: "QR Code Generator", href: "/qr-code-generator" },
      { label: "Mini Landing Page", href: "/p/demo" }, // /p/[slug]
      { label: "Analytics", href: "/analytics" },
      { label: "Pages", href: "/k-cards" },
      { label: "QR Menus", href: "/qr-menus" },
    ],
  },
  {
    title: "SOLUTIONS",
    items: [
      { label: "Creators & influencers", href: "/solutions" },
      { label: "Restaurants & menus", href: "/solutions" },
      { label: "Agencies & teams", href: "/solutions" },
      { label: "Offline campaigns", href: "/solutions" },
      { label: "Personal branding", href: "/solutions" },
    ],
  },
  {
    title: "RESOURCES",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "Sign in", href: "/signin" },
      { label: "Create account", href: "/signup" },
      { label: "Forgot password", href: "/forgot-password" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { label: "Billing & plans", href: "/dashboard/settings/billing" },
      { label: "Advanced settings", href: "/dashboard/settings/advanced" },
      { label: "Profile", href: "/dashboard/settings/profile" },
      { label: "Subscribers", href: "/dashboard/subscribers" },
      { label: "Support", href: "/dashboard/support" },
    ],
  },
  {
    title: "COMPANY",
    items: [
      { label: "Home", href: "/" },
      { label: "Kompi Platform", href: "/solutions" },
      { label: "Growth dashboard", href: "/dashboard/growth" },
      { label: "Contact", href: "/dashboard/support" },
      { label: "Kompi Pages", href: "/k-cards" },
    ],
  },
];

export function FooterCTA() {
  const year = new Date().getFullYear();

  return (
    <footer className="kompi-footer">
      <div className="kompi-footer__inner">
        {/* Hero line */}
        <section className="kompi-footer__hero">
          <p className="kompi-footer__hero-line">
            <span>Run your business</span>
            <br />
            <span className="kompi-footer__hero-kompi">
              from <span className="kompi-footer__hero-kompi-word">Kompi.</span>
            </span>
          </p>
        </section>

        {/* Link columns */}
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

        {/* Bottom bar */}
        <div className="kompi-footer__bottom">
          <div className="kompi-footer__logo">Kompi.</div>
          <p className="kompi-footer__copyright">
            {year} Kompi by Wall &amp; Fifth Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
