export type PlanId = "FREE" | "STARTER" | "CREATOR" | "BUSINESS";
export type PlanLimits = { links: number; krCodes: number; kCards: number };
export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  FREE: { links: 20, krCodes: 5, kCards: 1 },
  STARTER: { links: 250, krCodes: 25, kCards: 3 },
  CREATOR: { links: 1000, krCodes: 100, kCards: 10 },
  BUSINESS: { links: 10000, krCodes: 1000, kCards: 50 },
};
export const STARTER_MONTHLY_GBP = Number(process.env.NEXT_PUBLIC_STARTER_PRICE_MONTHLY || "9.99");
export const PRO_MONTHLY_GBP = Number(process.env.NEXT_PUBLIC_PRO_PRICE_MONTHLY || "19.99");
export const BUSINESS_MONTHLY_GBP = Number(process.env.NEXT_PUBLIC_BUSINESS_PRICE_MONTHLY || "39.99");
export const PLANS = [
  { id: "FREE" as const, name: "Free", price: 0, description: "Your first connections, all in one place." },
  { id: "STARTER" as const, name: "Starter", price: STARTER_MONTHLY_GBP, description: "A polished home for your personal brand." },
  { id: "CREATOR" as const, name: "Pro", price: PRO_MONTHLY_GBP, description: "More room for your brand and your next idea." },
  { id: "BUSINESS" as const, name: "Business", price: BUSINESS_MONTHLY_GBP, description: "Higher limits for a growing business." },
];
export function getPlanId(plan?: string | null): PlanId { return plan === "BUSINESS" || plan === "CREATOR" || plan === "STARTER" ? plan : "FREE"; }
export function getPlanLimits(plan?: string | null): PlanLimits { return PLAN_LIMITS[getPlanId(plan)]; }
export function planName(plan?: string | null) { return PLANS.find(p => p.id === getPlanId(plan))!.name; }
export function limitMessage(feature: keyof PlanLimits, plan?: string | null) {
  const names = { links: "short links", krCodes: "saved QR codes", kCards: "Kompi Cards" };
  return `Your ${planName(plan)} plan includes ${getPlanLimits(plan)[feature]} ${names[feature]} per workspace.${plan === "BUSINESS" ? " Contact support if you need more." : " Choose a higher plan for more."}`;
}
