import Stripe from "stripe";
import { ApiError } from "./api-errors";
export { APP_URL } from "./urls";
let client: Stripe | undefined;
export function getStripe() { if (!process.env.STRIPE_SECRET_KEY) throw new ApiError("Billing is not available in this environment.", 503); return client ||= new Stripe(process.env.STRIPE_SECRET_KEY); }
export function stripePrice(plan: string) { return plan === "STARTER" ? process.env.STRIPE_PRICE_STARTER_MONTHLY : plan === "BUSINESS" ? process.env.STRIPE_PRICE_BUSINESS_MONTHLY : process.env.STRIPE_PRICE_PRO_MONTHLY || process.env.STRIPE_PRICE_CREATOR_MONTHLY; }
