import { Check, CreditCard, Sparkles } from "lucide-react";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS, getPlanLimits, planName } from "@/lib/plan-limits";
import { stripePrice } from "@/lib/stripe";
import { UpgradeButton } from "@/components/billing/upgrade-button";
import { ManageBillingButton } from "@/components/billing/manage-billing-button";
import { DowngradeButton } from "@/components/billing/downgrade-button";
import { CheckoutStatus } from "@/components/billing/checkout-status";
import { Meter, Rise, Stagger } from "@/components/dashboard/ui";

export const dynamic = "force-dynamic";

export default async function Billing({ searchParams }: { searchParams: Promise<{ session_id?: string; status?: string }> }) {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);
  if (!workspace) return null;
  const params = await searchParams;
  const [cards, qr, links] = await Promise.all([
    prisma.kCard.count({ where: { workspaceId: workspace.id } }),
    prisma.kRCode.count({ where: { workspaceId: workspace.id } }),
    prisma.link.count({ where: { workspaceId: workspace.id, qrCodes: { none: {} } } }),
  ]);
  const limits = getPlanLimits(workspace.plan);
  const current = workspace.plan ?? "FREE";
  const usage = [
    { label: "Kompi Cards", used: cards, max: limits.kCards },
    { label: "Saved QR codes", used: qr, max: limits.krCodes },
    { label: "Short links", used: links, max: limits.links },
  ];

  return (
    <section className="space-y-8">
      <CheckoutStatus sessionId={params.session_id} />
      {params.status === "cancelled" && <p className="rounded-[12px] border border-[#E3E5E7] bg-white p-4 text-sm">Checkout cancelled. Your plan has not changed.</p>}

      <div className="rounded-[16px] border border-[#E3E5E7] bg-white">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EDEEF0] p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-[13px] bg-[#FBE4FA]">
              <CreditCard size={21} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[13px] text-[#80858C]">Current plan</p>
              <h2 className="text-[22px] font-medium tracking-[-0.035em]">{planName(workspace.plan)}</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {workspace.stripeCustomerId && <ManageBillingButton />}
            {workspace.stripeSubscriptionId && !workspace.cancelAtPeriodEnd && <DowngradeButton />}
          </div>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-3">
          {usage.map((u) => (
            <div key={u.label}>
              <div className="mb-2 flex items-baseline justify-between gap-2 text-[14px]">
                <span className="text-[#5A5E65]">{u.label}</span>
                <span className="tabular-nums">
                  <span className="font-medium">{u.used.toLocaleString()}</span>
                  <span className="text-[#A2A6AC]"> / {u.max.toLocaleString()}</span>
                </span>
              </div>
              <Meter used={u.used} max={u.max} />
            </div>
          ))}
        </div>
        {(workspace.billingPeriodEnd || workspace.billingReviewRequired || workspace.billingStatus === "past_due") && (
          <div className="space-y-1 border-t border-[#EDEEF0] px-6 py-4 text-[14px]">
            {workspace.billingPeriodEnd && (
              <p className="text-[#5A5E65]">
                {workspace.cancelAtPeriodEnd ? "Paid access ends" : "Current period ends"} {workspace.billingPeriodEnd.toLocaleDateString("en-GB", { dateStyle: "long", timeZone: "UTC" })}
              </p>
            )}
            {workspace.billingReviewRequired && <p className="text-[#9B3E35]">Your billing account needs review. Contact support before starting another subscription.</p>}
            {workspace.billingStatus === "past_due" && <p className="text-[#9B3E35]">Payment needs attention. Update your payment method to restore your paid limits.</p>}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-4 text-[18px] font-medium tracking-[-0.025em]">Choose a plan</h2>
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p) => {
            const l = getPlanLimits(p.id);
            const isCurrent = current === p.id;
            const featured = p.id === "CREATOR";
            return (
              <Rise key={p.id} as="article" className={`relative flex flex-col rounded-[16px] border bg-white p-6 ${featured ? "border-[#151619]" : "border-[#E3E5E7]"}`}>
                {featured && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#151619] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-white">
                    <Sparkles size={12} /> Most popular
                  </span>
                )}
                <h3 className="text-[18px] font-medium tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-3 text-[38px] font-medium leading-none tracking-[-0.05em]">
                  £{p.price}
                  <span className="text-[14px] font-normal tracking-normal text-[#80858C]"> / month</span>
                </p>
                <p className="mt-3 min-h-12 text-[14px] leading-6 text-[#696C72]">{p.description}</p>
                <ul className="my-6 flex-1 space-y-2.5 text-[14px]">
                  {[
                    `${l.kCards} Kompi ${l.kCards === 1 ? "Card" : "Cards"}`,
                    `${l.krCodes.toLocaleString()} saved QR codes`,
                    `${l.links.toLocaleString()} short links`,
                    "Card views, link visits and QR visits",
                    p.id === "FREE" ? "Kompi credit on public Cards" : "Remove Kompi credit from Cards",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#2F7D55]" />
                      {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <p className="flex min-h-11 items-center justify-center rounded-[10px] border border-[#E3E5E7] bg-[#FAFAFB] text-[14px] font-medium">Your current plan</p>
                ) : p.id === "FREE" ? (
                  <p className="text-[13px] text-[#80858C]">Free after your paid subscription ends.</p>
                ) : workspace.stripeSubscriptionId ? (
                  <ManageBillingButton />
                ) : (
                  <UpgradeButton plan={p.id} disabled={!process.env.STRIPE_SECRET_KEY || !stripePrice(p.id)} />
                )}
              </Rise>
            );
          })}
        </Stagger>
      </div>

      <p className="max-w-3xl text-[13px] leading-6 text-[#80858C]">
        Limits apply to saved items in one workspace. QR destination links do not use your short-link allowance. There are no team seats or custom domains in these plans. Cancelling stops the next renewal. Existing published items remain available; creating new items requires room within your plan.
      </p>
    </section>
  );
}
