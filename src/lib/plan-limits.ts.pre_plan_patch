// src/lib/plan-limits.ts

export type PlanId = "FREE" | "CREATOR";

export type PlanLimits = {
  links: number;
  krCodes: number;
  kCards: number;
};

export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  FREE: {
    links: 20,
    krCodes: 20,
    kCards: 1,
  },
  CREATOR: {
    links: 100,
    krCodes: 100,
    kCards: 3,
  },
};

/**
 * Accepts any string / null / undefined and normalises it
 * to one of the known plans. Default is FREE.
 */
export function getPlanLimits(plan: string | null | undefined): PlanLimits {
  if (plan === "CREATOR") {
    return PLAN_LIMITS.CREATOR;
  }
  return PLAN_LIMITS.FREE;
}
