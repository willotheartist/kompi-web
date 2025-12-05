import type { Metadata } from "next";
import CreatorsCustomersClient from "./CreatorsCustomersClient";
import { FooterCTA } from "@/components/footer-cta";


export const metadata: Metadata = {
  title: "Kompi for Creators & Personal Brands",
  description:
    "Turn every link, QR code and K-Card into a branded touchpoint. Kompi helps creators share links, Kompi Codes™ and K-Cards from one simple workspace.",
};

export default function CreatorsCustomersPage() {
  return (
    <> 
      <CreatorsCustomersClient />
      <FooterCTA />
    </>
  );
}
 