// src/app/dashboard/tools/whatsapp-link-generator/page.tsx

import { Suspense } from "react";
import { DashboardWhatsappLinkGeneratorClient } from "./WhatsappLinkGeneratorClient";

export default function DashboardWhatsappLinkGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                WhatsApp &amp; contact links
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Loading your WhatsApp &amp; contact tools…
              </p>
            </div>
          </div>
        </div>
      }
    >
      <DashboardWhatsappLinkGeneratorClient />
    </Suspense>
  );
}
