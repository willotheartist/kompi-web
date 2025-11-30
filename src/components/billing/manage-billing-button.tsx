"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ManageBillingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/billing/create-portal-session", {
        method: "POST",
      });

      if (!res.ok) {
        let message = "Could not open billing portal";
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
        toast.error("Billing portal URL is missing");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("ManageBillingButton error:", err);
      toast.error("Something went wrong opening billing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="button" onClick={handleClick} disabled={loading}>
      {loading ? "Opening…" : "Manage billing"}
    </Button>
  );
}
