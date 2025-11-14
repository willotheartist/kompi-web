"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, Globe } from "lucide-react";

export function FooterCTA() {
  return (
    <footer className="mt-32 bg-gradient-to-b from-black via-[#020014] to-black text-zinc-200">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:px-6 lg:px-0">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800/70 bg-gradient-to-br from-[#020313] via-[#020015] to-[#02041F] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
          {/* subtle background shapes */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-[3rem] bg-[#3A61FF]" />
            <div className="absolute right-[-4rem] top-6 h-64 w-64 rounded-[3rem] bg-[#0F172A]" />
            <div className="absolute left-1/3 bottom-[-5rem] h-48 w-48 rounded-[3rem] bg-[#111827]" />
          </div>

          <div className="relative z-10 flex flex-col gap-10 px-6 py-12 md:px-10 md:py-16 lg:px-14">
            {/* Top: logo + CTAs */}
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              {/* Big Kompi logo, no text */}
              <div className="flex items-center">
                <div className="relative h-16 w-40 md:h-20 md:w-52">
                  <Image
                    src="/Kompi..svg"
                    alt="Kompi"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-zinc-600 bg-transparent px-7 py-2 text-[11px] font-medium text-zinc-100 hover:bg-zinc-900"
                >
                  <Link href="/signin">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-zinc-50 px-8 py-2 text-[11px] font-semibold text-black hover:bg-white"
                >
                  <Link href="/signin">Get started free</Link>
                </Button>
              </div>
            </div>

            {/* Middle: link columns */}
            <div className="grid gap-10 text-sm md:grid-cols-4">
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
            <div className="flex flex-col gap-4 border-t border-zinc-800/80 pt-6 text-[11px] text-zinc-500 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Kompi. All rights reserved.</p>

              <div className="flex items-center gap-3">
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
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
        {title}
      </h3>
      <ul className="space-y-2 text-[11px] text-zinc-400">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="transition-colors hover:text-zinc-100 hover:underline"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-600 bg-zinc-950/80 text-zinc-50 hover:bg-zinc-900 hover:border-zinc-300 transition-colors"
      aria-label="Social link"
    >
      {children}
    </Link>
  );
}
