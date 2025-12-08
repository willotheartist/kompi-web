// src/app/krcode2/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { KRCode2 } from "@/components/kr-codes/KRCode2";
import KRCodeTypes from "@/components/kr-codes/krcodetypes";
import KRCodeFAQ from "@/components/kr-codes/krcodefaq";
import WhyKompi from "@/components/kr-codes/why-kompi";




export const metadata: Metadata = {
  title: "Kompi Codes v2 Layout Playground | Kompi",
  description:
    "Experimental Kompi Codes v2 QR builder layout. Used for design and UX iterations before wiring into the main product.",
};

export default function KRCode2PlaygroundPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16">
        <KRCode2 />
      </main>
      <KRCodeTypes />
      <WhyKompi />
      <KRCodeFAQ />
      <FooterCTA />
      
    </div>
    
  );
}
