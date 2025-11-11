"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const year = new Date().getFullYear();

export function FooterCTA() {
  const router = useRouter();
  const [handle, setHandle] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = handle.trim().replace(/^\/+/, "");
    if (!slug) return;
    router.push(`/signin?claim=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="mt-24 bg-[#060921] text-white">
      {/* HERO-STYLE CTA BAND */}
      <div className="bg-gradient-to-br from-[#060921] via-[#10184a] to-[#241b8c]">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 flex flex-col lg:flex-row items-start lg:items-center gap-10">
          <div className="flex-1 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-5">
              Jumpstart your Kompi page in one click.
            </h2>
            <p className="text-sm md:text-base text-slate-200 max-w-xl mb-8">
              Claim your handle, launch a branded link hub, generate Kompi Codes™,
              and track every click from one clean, powerful dashboard.
            </p>
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl"
            >
              <div className="flex-1 flex items-center bg-white rounded-full px-5 py-3 shadow-2xl shadow-black/40">
                <span className="text-sm md:text-base text-slate-500 mr-1 whitespace-nowrap">
                  kompi.app/
                </span>
                <input
                  className="flex-1 bg-transparent border-none outline-none text-sm md:text-base text-slate-900 placeholder-slate-400"
                  placeholder="your-handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="rounded-full bg-[#43C7FF] hover:bg-[#30b2eb] text-slate-900 text-sm md:text-base font-semibold px-7 py-3 shadow-2xl shadow-black/40"
              >
                Claim your Kompi
              </Button>
            </form>
            <p className="mt-3 text-xs md:text-sm text-slate-300">
              Free to start. Upgrade only when you&apos;re ready.
            </p>
          </div>

          <div className="hidden lg:flex flex-1 justify-end">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-3xl bg-gradient-to-br from-[#43C7FF] via-[#241b8c] to-[#060921] opacity-90 blur-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.8)]" />
          </div>
        </div>
      </div>

      {/* LARGE FOOTER CARD */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 pb-14 relative z-10">
        <div className="bg-white text-slate-900 rounded-3xl shadow-[0_30px_120px_rgba(3,7,18,0.50)] px-8 py-10 flex flex-col gap-10">
          <div className="grid gap-8 md:grid-cols-4 text-sm md:text-base">
            <div>
              <h3 className="font-semibold mb-4 text-slate-900">
                Product
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li><Link href="/pricing" className="hover:text-slate-900">Pricing</Link></li>
                <li><a href="/#features" className="hover:text-slate-900">Features</a></li>
                <li><a href="/#solutions" className="hover:text-slate-900">Use cases</a></li>
                <li><a href="#" className="hover:text-slate-900">Kompi Codes™</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-slate-900">
                Creators & Brands
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-slate-900">For creators</a></li>
                <li><a href="#" className="hover:text-slate-900">For studios</a></li>
                <li><a href="#" className="hover:text-slate-900">For ecommerce</a></li>
                <li><a href="#" className="hover:text-slate-900">For agencies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-slate-900">
                Resources
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Docs</a></li>
                <li><a href="#" className="hover:text-slate-900">Guides</a></li>
                <li><a href="#" className="hover:text-slate-900">Changelog</a></li>
                <li><a href="#" className="hover:text-slate-900">API (soon)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-slate-900">
                Company
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-slate-900">About</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-500">
            <p>© {year} Kompi Links. All rights reserved.</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800">
                More than a link shortener.
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800">
                Built for creators & studios.
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-800">
                Kompi Codes™ • Smart Links • Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
