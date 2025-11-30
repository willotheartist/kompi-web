// src/components/qr-menus/create-krcode-button.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QrCode, Loader2 } from "lucide-react";

type CreateKrcodeButtonProps = {
  menuId: string;
};

export function CreateKrcodeButton({ menuId }: CreateKrcodeButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch(`/api/qr-menus/${menuId}/create-krcode`, {
        method: "POST",
      });

      if (!res.ok) {
        let message = "Failed to create Kompi Code";
        try {
          const data = await res.json();
          if (data?.error) message = data.error;
        } catch {
          // ignore JSON parse errors
        }
        throw new Error(message);
      }

      const json = await res.json();
      const krCode = json?.krCode;

      if (!krCode?.id) {
        throw new Error("Invalid response from server (missing Kompi Code id)");
      }

      toast.success("Kompi Code ready – you can now style it.");
      // 🔗 Go to KR Codes designer with this code pre-selected
      router.push(`/kr-codes?edit=${encodeURIComponent(krCode.id)}`);
    } catch (err) {
      console.error("CreateKrcodeButton error", err);
      const message =
        err instanceof Error ? err.message : "Could not create Kompi Code";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px]"
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Creating…
        </>
      ) : (
        <>
          <QrCode className="h-3.5 w-3.5" />
          Edit QR code
        </>
      )}
    </Button>
  );
}
