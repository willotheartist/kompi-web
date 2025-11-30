"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/billing/create-checkout-session", {
        method: "POST",
      });

      if (!res.ok) {
        let message = "Could not start checkout";
        try {
          const data = await res.json();
          if (data?.error && typeof data.error === "string") {
            message = data.error;
          }
        } catch {
          // ignore JSON parse errors
        }
        toast.error(message);
        return;
      }

      const data: { url?: string } = await res.json();

      if (!data.url) {
        toast.error("Stripe checkout URL is missing");
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("UpgradeButton error:", err);
      toast.error("Something went wrong starting checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="button" onClick={handleClick} disabled={loading}>
      {loading ? "Redirecting…" : "Upgrade to Creator"}
    </Button>
  );
}
