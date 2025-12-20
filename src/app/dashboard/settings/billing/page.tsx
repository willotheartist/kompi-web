// src/app/dashboard/settings/billing/page.tsx
import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { UpgradeButton } from "@/components/billing/upgrade-button";
import { ManageBillingButton } from "@/components/billing/manage-billing-button";
import { DowngradeButton } from "@/components/billing/downgrade-button";
import { getPlanLimits } from "@/lib/plan-limits";

export const dynamic = "force-dynamic";

/**
 * Next.js 16 generated PageProps expects searchParams to be Promise-like in its
 * type checks. This keeps you compatible with the build-time generated types.
 */
type BillingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickFirst(v: string | string[] | undefined): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0];
  return undefined;
}

export default async function DashboardBillingSettingsPage({
  searchParams,
}: BillingPageProps) {
  const sp = (await searchParams) ?? {};

  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);

  const plan = (workspace as { plan?: string | null } | null)?.plan ?? "FREE";
  const isCreator = plan === "CREATOR";

  const freeLimits = getPlanLimits("FREE");
  const creatorLimits = getPlanLimits("CREATOR");

  const plans = [
    {
      id: "FREE" as const,
      name: "Free",
      price: "£0 / mo",
      blurb: "Perfect while you're testing Kompi.",
      features: [
        `Up to ${freeLimits.links} short links`,
        "1 workspace",
        "Basic analytics",
        "Standard support",
      ],
    },
    {
      id: "CREATOR" as const,
      name: "Creator",
      price: "£9.99 / mo",
      blurb: "More headroom for links, KR codes and K-cards.",
      features: [
        `Up to ${creatorLimits.links} short links`,
        `Up to ${creatorLimits.krCodes} KR / QR codes`,
        `${creatorLimits.kCards} Kompi K-cards`,
        "Better limits for growing creators",
      ],
    },
  ];

  // Current plan first (so Creator sits on top if you're on Creator)
  const orderedPlans = isCreator ? [plans[1], plans[0]] : [plans[0], plans[1]];

  const statusParam = pickFirst(sp.status);
  const status = statusParam ? statusParam.toLowerCase() : undefined;

  let statusTitle: string | null = null;
  let statusBody: string | null = null;

  if (status === "success") {
    statusTitle = "Plan updated";
    statusBody =
      "Your plan was updated via Stripe. It can take a few seconds for changes to appear everywhere.";
  } else if (status === "cancelled") {
    statusTitle = "Checkout cancelled";
    statusBody =
      "Your Kompi plan hasn’t changed. You can restart checkout any time from this page.";
  }

  return (
    <section
      className="wf-settings-billing flex flex-1 flex-col gap-6"
      style={{ color: "var(--color-text)" }}
    >
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-[22px] font-semibold tracking-tight md:text-[24px]">
          Billing &amp; Plans
        </h1>
        <p className="text-sm max-w-xl" style={{ color: "var(--color-subtle)" }}>
          Review your current plan, upgrade Kompi, or manage your billing details
          via Stripe.
        </p>
      </header>

      {/* Status strip */}
      {statusTitle && statusBody && (
        <div className="rounded-2xl border border-(--color-border) bg-(--color-bg) px-4 py-3 text-sm">
          <p className="font-medium">{statusTitle}</p>
          <p className="mt-0.5" style={{ color: "var(--color-subtle)" }}>
            {statusBody}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {orderedPlans.map((p) => {
          const isCurrent = p.id === plan;
          const isCreatorCard = p.id === "CREATOR";

          let helperCopy: string | null = null;
          const actions: ReactNode[] = [];

          if (isCreatorCard) {
            if (isCurrent) {
              actions.push(<ManageBillingButton key="manage" />);
              actions.push(<DowngradeButton key="downgrade" />);
              helperCopy =
                "Manage or cancel your Creator subscription via Stripe. Cancelling moves this workspace back to the Free plan.";
            } else {
              actions.push(<UpgradeButton key="upgrade" />);
              helperCopy =
                "Start a Creator subscription via Stripe checkout. You can cancel any time.";
            }
          } else {
            if (isCurrent) {
              actions.push(<UpgradeButton key="upgrade" />);
              helperCopy =
                "Stay on Free while you explore Kompi, or upgrade when you’re ready for more headroom.";
            } else {
              helperCopy =
                "You’re on the Creator plan. Use the Creator card above to manage or downgrade.";
            }
          }

          const background = isCreatorCard ? "#050915" : "#e3e3e3";
          const baseTextColor = isCreatorCard ? "#F9FAFB" : "#111827";
          const secondaryTextColor = isCreatorCard ? "#D1D5DB" : "#4B5563";

          const titleStyle: CSSProperties = {
            color: isCreatorCard ? "#C6D2FF" : baseTextColor,
            fontWeight: 400,
            fontStyle: "normal",
          };

          return (
            <Card
              key={p.id}
              className="rounded-[28px] border px-0 py-0"
              style={{
                backgroundColor: background,
                borderColor: isCreatorCard ? "#050915" : "#d1d5db",
                color: baseTextColor,
              }}
            >
              <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
                {/* Left: image only for Creator */}
                {isCreatorCard ? (
                  <div className="w-full md:w-[260px] md:shrink-0">
                    <div className="overflow-hidden rounded-3xl">
                      <Image
                        src="/kompi-analytics.png"
                        alt="Kompi Creator plan visual"
                        width={520}
                        height={520}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ) : null}

                {/* Right: text + actions */}
                <div className="flex flex-1 flex-col">
                  <CardHeader className="flex flex-row items-start justify-between gap-4 p-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <CardTitle
                          className="wf-serif-accent text-[24px] md:text-[28px]"
                          style={titleStyle}
                        >
                          {p.name}
                        </CardTitle>

                        {isCurrent && (
                          <span
                            className="rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
                            style={{
                              fontFamily:
                                'var(--font-inter-tight), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                              textTransform: "none",
                              backgroundColor: "rgba(234, 247, 122, 0.14)",
                              color: "#EAF77A",
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <CardDescription
                        className="text-sm"
                        style={{ color: secondaryTextColor }}
                      >
                        {p.blurb}
                      </CardDescription>
                    </div>

                    <p
                      className="text-[22px] md:text-[24px]"
                      style={{
                        fontFamily:
                          'var(--font-instrument-serif), "Instrument Serif", "Times New Roman", serif',
                        fontWeight: 400,
                        fontStyle: "normal",
                        color: isCreatorCard ? "#F9FAFB" : baseTextColor,
                      }}
                    >
                      {p.price}
                    </p>
                  </CardHeader>

                  <CardContent className="mt-4 space-y-6 p-0">
                    <ul
                      className="space-y-1.5 text-sm"
                      style={{ color: secondaryTextColor }}
                    >
                      {p.features.map((f) => (
                        <li key={f}>• {f}</li>
                      ))}
                    </ul>

                    <div
                      className="h-px w-full"
                      style={{
                        backgroundColor: isCreatorCard
                          ? "rgba(148,163,184,0.4)"
                          : "rgba(148,163,184,0.7)",
                      }}
                    />

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      {helperCopy && (
                        <p
                          className="text-xs max-w-md"
                          style={{ color: secondaryTextColor }}
                        >
                          {helperCopy}
                        </p>
                      )}

                      <div className="flex items-center gap-2 self-end">
                        <Button
                          variant="outline"
                          asChild
                          className="h-9 rounded-full px-4 text-xs font-medium"
                          style={{
                            borderColor: isCreatorCard
                              ? "rgba(148,163,184,0.7)"
                              : "rgba(148,163,184,0.9)",
                            backgroundColor: isCreatorCard
                              ? "#151b33"
                              : "rgba(255,255,255,0.85)",
                            color: isCreatorCard ? "#E5E7EB" : "#111827",
                          }}
                        >
                          <Link href="/pricing">View pricing</Link>
                        </Button>

                        {actions.map((action, idx) => (
                          <span key={idx}>{action}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
