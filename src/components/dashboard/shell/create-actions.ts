"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IdCard, Link2, QrCode, type LucideIcon } from "lucide-react";
import { refreshWorkspaceSummary } from "./use-workspace-summary";

export type CreateKind = "card" | "qr" | "link";

export const CREATE_OPTIONS: { kind: CreateKind; label: string; description: string; icon: LucideIcon; href?: string; tint: string; shortcut: string }[] = [
  { kind: "qr", label: "QR code", description: "Design, track and export", icon: QrCode, href: "/kr-codes", tint: "#E7F0EA", shortcut: "Q" },
  { kind: "link", label: "Short link", description: "A cleaner link that tracks visits", icon: Link2, href: "/links/new", tint: "#E6ECFA", shortcut: "L" },
  { kind: "card", label: "Kompi Card", description: "Your links in one address", icon: IdCard, tint: "#FBE4FA", shortcut: "K" },
];

/** Creating a Card is a POST followed by the editor; QR codes and links open their editors directly. */
export function useCreate() {
  const router = useRouter();
  const [busy, setBusy] = useState<CreateKind | null>(null);
  const create = useCallback(
    async (kind: CreateKind, workspaceId?: string) => {
      const option = CREATE_OPTIONS.find((o) => o.kind === kind)!;
      if (option.href) {
        router.push(option.href);
        return;
      }
      setBusy(kind);
      try {
        const res = await fetch("/api/k-cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(workspaceId ? { workspaceId } : {}),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Could not create your Card.");
        void refreshWorkspaceSummary();
        router.push(`/k-cards?cardId=${data.kcard.id}`);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Please try again.");
      } finally {
        setBusy(null);
      }
    },
    [router],
  );
  return { create, busy };
}
