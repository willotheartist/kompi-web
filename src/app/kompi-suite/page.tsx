import type { Metadata } from "next";
import Link from "next/link";
import { FooterCTA } from "@/components/footer-cta";
import { ToolsDirectory } from "@/components/marketing/tools-directory";
import "@/components/marketing/launch.css";
export const metadata: Metadata = { title: "Kompi Suite — your connected toolkit", description: "Explore Kompi Cards, QR codes, short links and the complete collection of Kompi tools.", alternates: { canonical: "https://kompi.app/kompi-suite" } };
export default function KompiSuite() {
  return <><main className="kompi-marketing tools-hub"><div className="kompi-container"><div className="tools-hub-intro"><p className="kompi-eyebrow">KOMPI SUITE</p><h1>Your ideas.<br/><em>A connected toolkit.</em></h1><p>Make a home for your links, bring the real world online and keep your everyday tools close. Explore everything Kompi has to offer.</p></div><div className="tools-hub-products"><Link href="/features/kompi-cards">Kompi Cards<span>A personal page for your links and contact details.</span></Link><Link href="/qr-code-generator">QR codes<span>Design, download and manage your QR codes.</span></Link><Link href="/features/url-shortener">Short links<span>Shorten long URLs and update your destinations.</span></Link></div><ToolsDirectory/><p className="kompi-fineprint">Looking for more room for your Cards, QR codes and short links? <Link href="/pricing">Compare Kompi plans.</Link></p></div></main><FooterCTA/></>;
}
