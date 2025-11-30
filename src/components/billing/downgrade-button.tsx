// src/components/billing/downgrade-button.tsx
"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function DowngradeButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe/portal", {
          method: "POST",
        });

        if (!res.ok) {
          console.error("Failed to start Stripe portal session");
          return;
        }

        const data = (await res.json()) as { url?: string };
        if (data.url) {
          window.location.href = data.url;
        }
      } catch (err) {
        console.error("Stripe portal error", err);
      }
    });
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="h-9 rounded-full px-4 text-xs font-medium"
      // lime outline on dark navy; readable text
      style={{
        borderRadius: 999,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(234, 247, 122, 0.6)",
        backgroundColor: "transparent",
        color: "#EAF77A",
      }}
      variant="outline"
    >
      {pending ? "Opening…" : "Downgrade to Free"}
    </Button>
  );
}
