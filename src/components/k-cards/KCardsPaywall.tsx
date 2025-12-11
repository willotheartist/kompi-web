"use client";

import { UpgradeButton } from "@/components/billing/upgrade-button";

export function KCardsPaywall() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Unlock Kompi K-Cards
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        K-Cards are available on the Creator plan. Upgrade to design a fully
        branded digital card, share it everywhere, and track what actually
        gets clicked.
      </p>

      <div className="mt-2">
        <UpgradeButton />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        You can still manage your links, QR menus and other tools on the Free
        plan.
      </p>
    </div>
  );
}
