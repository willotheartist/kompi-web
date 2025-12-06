// src/components/dashboard/contact-links-widget.tsx
"use client";

import { Card } from "@/components/ui/card";
import ContactLinkGenerator from "@/components/tools/ContactLinkGenerator";

export default function ContactLinksWidget() {
  return (
    <Card className="h-full rounded-3xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#111827] sm:text-base">
            WhatsApp &amp; contact links
          </h2>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-[13px]">
            Generate WhatsApp, phone and SMS links and turn them into Kompi QRs.
          </p>
        </div>
      </div>

      {/* Tool content – compact variant */}
      <ContactLinkGenerator variant="compact" />
    </Card>
  );
}
