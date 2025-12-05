import type { Metadata } from "next";
import CommunitiesCustomersClient from "./CommunitiesCustomersClient";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Kompi for Communities & Memberships",
  description:
    "Share events, resources and announcements from one living hub. Kompi connects your links, QR codes and sign-up flows for communities and memberships.",
};

export default function CommunitiesCustomersPage() {
  return (
    <> 
      <CommunitiesCustomersClient />
      <FooterCTA />
    </>
  );
} 