import type { Metadata } from "next";
import EventsCustomersClient from "./EventsCustomersClient";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Kompi for Events & Venues",
  description:
    "QR schedules, menus and sponsor links in one place. Kompi helps events and venues keep guests oriented and engaged with live-updated links and Kompi Codes™.",
};

export default function EventsCustomersPage() {
  return (
    <> 
      <EventsCustomersClient />
      <FooterCTA />
    </>
  );
}