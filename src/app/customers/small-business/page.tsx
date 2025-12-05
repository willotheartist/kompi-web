import type { Metadata } from "next";
import SmallBusinessCustomersClient from "./SmallBusinessCustomersClient";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Kompi for Small Businesses",
  description:
    "QR menus, offers and local marketing in one simple hub. Kompi helps small businesses share links, QR codes and K-Cards with on-brand tracking.",
};

export default function SmallBusinessCustomersPage() {
  return (
    <> 
      <SmallBusinessCustomersClient />
      <FooterCTA />
    </>
  );
} 