"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock, Loader2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, buttonStyles } from "@/components/dashboard/ui";
import { CURRENCIES, formatMoney } from "@/lib/store";

type Props = {
  started: boolean;
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
  currency: string;
  plan: string;
  feePercent: number;
  earnedCents: number;
  sales: number;
};

const COUNTRIES: [string, string][] = [
  ["GB", "United Kingdom"], ["US", "United States"], ["IE", "Ireland"], ["FR", "France"], ["ES", "Spain"], ["DE", "Germany"], ["IT", "Italy"], ["NL", "Netherlands"], ["PT", "Portugal"], ["BE", "Belgium"], ["SE", "Sweden"], ["DK", "Denmark"], ["NO", "Norway"], ["FI", "Finland"], ["PL", "Poland"], ["AT", "Austria"], ["CH", "Switzerland"], ["CA", "Canada"], ["AU", "Australia"], ["NZ", "New Zealand"], ["AE", "United Arab Emirates"], ["SG", "Singapore"], ["JP", "Japan"],
];

export function PayoutsClient({ started, chargesEnabled, detailsSubmitted, currency: initialCurrency, feePercent, earnedCents, sales }: Props) {
  const [busy, setBusy] = useState<"connect" | "dashboard" | null>(null);
  const [country, setCountry] = useState("GB");
  const [currency, setCurrency] = useState(initialCurrency);

  async function go(kind: "connect" | "dashboard") {
    setBusy(kind);
    try {
      const res = await fetch(kind === "connect" ? "/api/store/connect" : "/api/store/connect/dashboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(kind === "connect" && !started ? { country } : {}) });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Something went wrong");
      window.location.href = json.url;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
      setBusy(null);
    }
  }

  async function saveCurrency(next: string) {
    setCurrency(next);
    const res = await fetch("/api/store/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ storeCurrency: next }) });
    if (res.ok) toast.success(`Prices are now in ${next.toUpperCase()}`);
    else toast.error("Couldn't change currency");
  }

  const state = chargesEnabled ? "live" : started && detailsSubmitted ? "review" : started ? "unfinished" : "none";

  return (
    <div>
      <PageHeader eyebrow="Earn" icon={Wallet} title="Payouts" description="Kompi uses Stripe to take payments and send money to your bank." />

      <section className="mb-5 rounded-[16px] border border-[#E3E5E7] bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <span className={`grid size-12 shrink-0 place-items-center rounded-[12px] ${state === "live" ? "bg-[#E9F8EF] text-[#12924A]" : state === "review" ? "bg-[#FFF3E2] text-[#C46A07]" : "bg-[#F3F4F5] text-[#151619]"}`}>
            {state === "live" ? <BadgeCheck size={22} /> : state === "review" ? <Clock size={22} /> : <Wallet size={22} />}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[18px] font-medium tracking-[-0.02em] text-[#151619]">
              {state === "live" ? "Payouts are on" : state === "review" ? "Stripe is reviewing your details" : state === "unfinished" ? "Finish your Stripe setup" : "Set up payouts"}
            </h2>
            <p className="mt-1 text-[14.5px] leading-relaxed text-[#696C72]">
              {state === "live"
                ? "You can sell paid products. Stripe pays out to your bank on a rolling schedule."
                : state === "review"
                  ? "This usually takes a few minutes. You can keep building products in the meantime."
                  : state === "unfinished"
                    ? "Stripe needs a few more details before you can take payments."
                    : "It takes about 5 minutes. You'll need your bank details and an ID. Free products and lead magnets work without it."}
            </p>
            {state === "none" && (
              <label className="mt-4 block max-w-xs">
                <span className="mb-1.5 block text-[13.5px] font-medium text-[#3C4045]">Where are you based?</span>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="h-11 w-full rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[15px] outline-none focus:border-[#151619]">
                  {COUNTRIES.map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            {state === "live" || state === "review" ? (
              <button type="button" className={buttonStyles.secondary} onClick={() => go("dashboard")} disabled={busy !== null}>
                {busy === "dashboard" ? <Loader2 size={16} className="animate-spin" /> : null} Stripe dashboard <ArrowUpRight size={15} />
              </button>
            ) : (
              <button type="button" className={buttonStyles.primary} onClick={() => go("connect")} disabled={busy !== null}>
                {busy === "connect" ? <Loader2 size={16} className="animate-spin" /> : null}
                {state === "unfinished" ? "Continue on Stripe" : "Connect with Stripe"}
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <section className="rounded-[16px] border border-[#E3E5E7] bg-white p-5 sm:p-6">
          <p className="text-[13px] text-[#80858C]">Earned on Kompi</p>
          <p className="mt-1 text-[30px] font-medium tracking-[-0.04em] text-[#151619]">{formatMoney(earnedCents, currency)}</p>
          <p className="text-[13px] text-[#A3A7AD]">
            {sales} paid order{sales === 1 ? "" : "s"} · after Kompi fees, before Stripe fees
          </p>
        </section>
        <section className="rounded-[16px] border border-[#E3E5E7] bg-white p-5 sm:p-6">
          <p className="text-[13px] text-[#80858C]">Kompi fee</p>
          <p className="mt-1 text-[30px] font-medium tracking-[-0.04em] text-[#151619]">{feePercent}%</p>
          <p className="text-[13px] text-[#A3A7AD]">
            {feePercent ? (
              <>
                0% on paid plans.{" "}
                <Link href="/dashboard/settings/billing" className="font-medium text-[#151619] underline underline-offset-2">
                  Upgrade
                </Link>
              </>
            ) : (
              "Your plan keeps 100% of every sale."
            )}
          </p>
        </section>
      </div>

      <section className="rounded-[16px] border border-[#E3E5E7] bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[15px] font-medium text-[#151619]">Store currency</p>
            <p className="text-[13.5px] text-[#696C72]">New products, and products with no sales yet, are priced in this currency.</p>
          </div>
          <select value={currency} onChange={(e) => saveCurrency(e.target.value)} className="h-11 rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[15px] outline-none focus:border-[#151619]">
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </section>
    </div>
  );
}
