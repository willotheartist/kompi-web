import type { Metadata } from "next";
import { FooterCTA } from "@/components/footer-cta";
import { ToolsDirectory } from "@/components/marketing/tools-directory";
import "@/components/marketing/launch.css";
export const metadata: Metadata = { title: "Free online tools", description: "Explore Kompi’s generators, text tools, PDF converters, calculators and sharing tools.", alternates: { canonical: "https://kompi.app/tools" } };
export default function Tools() {
  return <><main className="kompi-marketing tools-hub"><div className="kompi-container"><div className="tools-hub-intro"><p className="kompi-eyebrow">THE KOMPI TOOLKIT</p><h1>Small tools.<br/><em>Useful every day.</em></h1><p>Write, format, calculate and share. Find the tool you need, with the full Kompi collection in one place.</p></div><ToolsDirectory/></div></main><FooterCTA/></>;
}
