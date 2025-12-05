import type { Metadata } from "next";
import BrandsCustomersClient from "./BrandsCustomersClient";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Kompi for Brands & Marketing Teams",
  description:
    "Route, track and brand every campaign touchpoint. Kompi gives marketing teams smart links, Kompi Codes™ and workspaces with clean analytics.",
};

export default function BrandsCustomersPage() {
  return (
    <> 
      <BrandsCustomersClient />
      <FooterCTA />
    </>
  );
} 