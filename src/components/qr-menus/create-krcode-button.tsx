// src/components/qr-menus/create-krcode-button.tsx
"use client";

import { useState } from "react";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CreateKrcodeButtonProps = {
  menuId: string;
  disabled?: boolean;
};

export function CreateKrcodeButton({ menuId, disabled }: CreateKrcodeButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!menuId) {
      toast.error("Missing menu id");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/qr-menus/${menuId}/create-krcode`, {
        method: "POST",
      });

      if (!res.ok) {
        let msg = "Failed to create Kompi Code";
        try {
          const txt = await res.text();
          if (txt) msg = txt;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      // We don't care about the payload here – we just need to know it worked.
      // const data = (await res.json()) as { id?: string };

      toast.success("Kompi Code created");

      // ✅ DO NOT push to /kr-codes/[id] anymore.
      // Just send them to the KR Codes dashboard list, where the new code is visible
      // and your existing UX can handle edit/customise/download.
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard/kr-codes";
      }
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to create Kompi Code";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
        backgroundColor: "var(--color-bg)",
      }}
      onClick={handleClick}
      disabled={loading || disabled}
    >
      <QrCode className="h-3.5 w-3.5" />
      {loading ? "Creating…" : "Create Kompi Code"}
    </Button>
  );
}
