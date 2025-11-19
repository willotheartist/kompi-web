"use client";

import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Pattern: CTA_InviteFriends
export function DashboardInviteTeammates() {
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      toast.success("Invite link copied.");
    } catch {
      toast.error("Could not copy invite link.");
    }
  };

  return (
    <GlassCard className="flex h-full flex-col justify-between gap-3">
      <div className="space-y-2">
        <p
          className="text-xs uppercase tracking-[0.16em]"
          style={{ color: "var(--color-subtle)" }}
        >
          Invite &amp; collaborate
        </p>
        <h3 className="text-base font-semibold">
          Bring your{" "}
          <span
            style={{
              fontFamily:
                "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
              fontStyle: "italic",
            }}
          >
            team
          </span>{" "}
          into Kompi
        </h3>
        <p
          className="text-sm"
          style={{ color: "var(--color-subtle)" }}
        >
          Share Kompi with teammates, collaborators or clients. Keep
          every campaign, link and KR Code under one workspace.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={() => router.push("/dashboard/settings")}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
          style={{
            backgroundColor: "var(--color-text)",
            color: "var(--color-bg)",
            borderRadius: "999px",
          }}
        >
          <Users className="h-4 w-4" />
          Invite teammates
        </Button>

        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-medium inline-flex items-center gap-1"
          style={{ color: "var(--color-subtle)" }}
        >
          Copy invite link
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </GlassCard>
  );
}
