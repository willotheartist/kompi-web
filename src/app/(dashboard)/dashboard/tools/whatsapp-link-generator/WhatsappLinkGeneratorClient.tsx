// src/app/dashboard/tools/whatsapp-link-generator/WhatsappLinkGeneratorClient.tsx
"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ContactLinkGenerator from "@/components/tools/ContactLinkGenerator";

export function DashboardWhatsappLinkGeneratorClient() {
  return (
    <DashboardLayout>
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              WhatsApp &amp; contact links
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Generate WhatsApp, phone and SMS links for your workspace, then
              turn them into Kompi QR codes with full tracking and branding.
            </p>
          </div>

          {/* dashboard behaviour */}
          <ContactLinkGenerator context="dashboard" />
        </div>
      </div>
    </DashboardLayout>
  );
}
