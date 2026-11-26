import type { Metadata } from "next";
import Link from "next/link";
import { FooterCTA } from "@/components/footer-cta";
export const metadata:Metadata={title:"Sharing tools",alternates:{canonical:"https://kompi.app/tools"}};
export default function Tools(){return <><main className="kompi-marketing"><div className="kompi-legal"><h1>Make something shareable.</h1><p>Start with the tool you need. Keep your Cards, saved QR designs and short links together in one workspace.</p><ul><li><Link href="/kr-codes">Design and download a QR code</Link></li><li><Link href="/features/kompi-cards">Create a Kompi Card</Link></li><li><Link href="/features/url-shortener">Shorten a link</Link></li></ul></div></main><FooterCTA/></>;}
