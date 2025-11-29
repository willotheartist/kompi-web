"use client";

import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Brand-ish palette inspired by the hero
const COLORS = {
  tealBg: "#005E68",
  tealBgSoft: "#0A6E79",
  mint: "#CFFDE8",
  mintSoft: "#E4FFF3",
  text: "#EAF7FF",
  subtle: "rgba(234, 247, 255, 0.78)",
  outline: "rgba(234, 247, 255, 0.28)",
};

export function DashboardInviteTeammates() {
  const router = useRouter();

  const handleCopy = async () => {
    try {
      const inviteUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/signin`
          : "";
      if (!inviteUrl) throw new Error("No invite URL");

      await navigator.clipboard.writeText(inviteUrl);
      toast.success("Invite link copied.");
    } catch {
      toast.error("Could not copy invite link.");
    }
  };

  return (
    <GlassCard
      className="flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[30px] border-0 px-5 py-5 md:px-7 md:py-6"
      style={{
        background: `linear-gradient(135deg, ${COLORS.tealBg} 0%, ${COLORS.tealBgSoft} 100%)`,
        color: COLORS.text,
      }}
    >
      {/* Top: eyebrow + heading + copy */}
      <div className="space-y-3">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: COLORS.subtle }}
        >
          Invite &amp; collaborate
        </p>

        <h3
          className="text-xl font-semibold leading-tight md:text-2xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          <span className="block">Your workspace,</span>
          <span className="block">
            your{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-accent, var(--font-primary, system-ui, -apple-system, BlinkMacSystemFont, sans-serif))",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              crew.
            </span>
          </span>
        </h3>

        <p
          className="text-xs md:text-sm leading-relaxed max-w-sm"
          style={{ color: COLORS.subtle }}
        >
          Bring in teammates, collaborators or clients so every link, KR Code
          and campaign lives in one shared Kompi workspace.
        </p>
      </div>

      {/* Bottom: CTAs */}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {/* Primary CTA */}
        <Button
          type="button"
          onClick={() => router.push("/dashboard/settings")}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold md:text-sm"
          style={{
            backgroundColor: COLORS.mint,
            color: COLORS.tealBg,
            borderRadius: 9999,
          }}
        >
          <Users className="h-4 w-4" />
          Invite teammates
        </Button>

        {/* Secondary CTA */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold md:text-sm"
          style={{
            color: COLORS.text,
            backgroundColor: "transparent",
            borderRadius: 9999,
            border: `1px solid ${COLORS.outline}`,
          }}
        >
          Copy invite link
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </GlassCard>
  );
}
