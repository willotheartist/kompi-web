"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";

type PlanLimitModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  used?: number;
  limit?: number;
  featureLabel?: string;
};

export function PlanLimitModal({
  open,
  onOpenChange,
  used,
  limit = 20,
  featureLabel = "links",
}: PlanLimitModalProps) {
  const router = useRouter();
  const usedSafe = used ?? limit;
  const pct = Math.min(100, Math.round((usedSafe / limit) * 100));

  const handleUpgrade = () => {
    onOpenChange(false);
    // You already have a billing page under dashboard/settings/billing
    router.push("/dashboard/settings/billing");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-[color:var(--color-text)]">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[color:var(--color-accent-soft)]">
              <Link2 className="h-4 w-4 text-[color:var(--color-text)]" />
            </span>
            You’ve reached the Free plan limit
          </DialogTitle>
          <DialogDescription className="text-sm text-[color:var(--color-subtle)]">
            You’ve created {usedSafe} / {limit} {featureLabel} in this workspace.
            Upgrade Kompi to keep creating new {featureLabel} and unlock more analytics.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="rounded-2xl bg-[color:var(--color-bg)] px-4 py-3 text-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[color:var(--color-subtle)]">Usage</span>
              <span className="font-medium text-[color:var(--color-text)]">
                {usedSafe} / {limit}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-surface)]">
              <div
                className="h-full rounded-full bg-[color:var(--color-accent)]"
                style={{ width: pct + "%" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-full px-4 text-sm"
              onClick={() => onOpenChange(false)}
            >
              Maybe later
            </Button>
            <Button
              type="button"
              className="h-9 rounded-full bg-[color:var(--color-accent)] px-5 text-sm font-semibold text-[color:var(--color-text)] shadow-sm hover:shadow-md"
              onClick={handleUpgrade}
            >
              Upgrade Kompi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
