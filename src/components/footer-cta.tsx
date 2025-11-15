"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, Globe } from "lucide-react";
import "./footer-cta.css";

export function FooterCTA() {
  return (
    <footer className="wf-footer">
      <div className="wf-footer-inner">
        <div className="wf-footer-shell">
          <div className="wf-footer-shell-inner">
            {/* Top: logo + CTAs */}
            <div className="wf-footer-top">
              {/* Big Kompi logo, no text */}
              <div className="wf-footer-logo-wrap">
                <div className="wf-footer-logo">
                  <Image
                    src="/Kompi..svg"
                    alt="Kompi"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="wf-footer-ctas">
                <Button
                  asChild
                  variant="outline"
                  className="wf-footer-cta-secondary"
                >
                  <Link href="/signin">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="wf-footer-cta-primary"
                >
                  <Link href="/signin">Get started free</Link>
                </Button>
              </div>
            </div>

            {/* Middle: link columns */}
            <div className="wf-footer-columns">
              <FooterColumn title="Product">
                <FooterLink href="/features/url-shortener">Short links</FooterLink>
                <FooterLink href="/features/bio-pages">Bio pages</FooterLink>
                <FooterLink href="/features/qr-codes">Kompi Codes™</FooterLink>
                <FooterLink href="/features/analytics">Analytics</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
              </FooterColumn>

              <FooterColumn title="Use cases">
                <FooterLink href="/use-cases/creators">Creators</FooterLink>
                <FooterLink href="/use-cases/agencies">
                  Studios &amp; agencies
                </FooterLink>
                <FooterLink href="/use-cases/brands">Brands &amp; teams</FooterLink>
                <FooterLink href="/use-cases/podcasts">Podcasts</FooterLink>
                <FooterLink href="/use-cases/offline">Offline campaigns</FooterLink>
              </FooterColumn>

              <FooterColumn title="Company">
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/changelog">Changelog</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </FooterColumn>

              <FooterColumn title="Trust &amp; legal">
                <FooterLink href="/legal/terms">Terms</FooterLink>
                <FooterLink href="/legal/privacy">Privacy</FooterLink>
                <FooterLink href="/legal/cookies">Cookies</FooterLink>
                <FooterLink href="/legal/security">Security</FooterLink>
                <FooterLink href="/legal/dpa">Data processing</FooterLink>
              </FooterColumn>
            </div>

            {/* Bottom: socials & copyright */}
            <div className="wf-footer-bottom">
              <p className="wf-footer-meta">
                © {new Date().getFullYear()} Kompi. All rights reserved.
              </p>

              <div className="wf-footer-social-row">
                <SocialIcon href="https://kompi.app">
                  <Globe className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="https://instagram.com">
                  <Instagram className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="https://twitter.com">
                  <Twitter className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="https://youtube.com">
                  <Youtube className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wf-footer-column">
      <h3 className="wf-footer-column-title">
        <span className="wf-footer-column-title-main">{title}</span>
      </h3>
      <ul className="wf-footer-column-list">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="wf-footer-link"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="wf-footer-social"
      aria-label="Social link"
    >
      {children}
    </Link>
  );
}
