import type { Metadata } from "next";
import AgenciesCustomersClient from "./AgenciesCustomersClient";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Kompi for Studios & Agencies",
  description:
    "Client-ready workspaces for links, Kompi Codes™ and reporting. Kompi helps studios and agencies manage branded campaigns across accounts.",
};

export default function AgenciesCustomersPage() {
  return (
    <> 
      <AgenciesCustomersClient />
      <FooterCTA />
    </>
  );
} 