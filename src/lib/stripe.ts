// src/lib/stripe.ts
import Stripe from "stripe";

// Read secret key from env
const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  // Fail fast if it's missing – easier to debug
  throw new Error(
    "STRIPE_SECRET_KEY is not set. Add it to your .env.local file."
  );
}

// Server-side Stripe client
export const stripe = new Stripe(secretKey, {
  // No apiVersion: we'll use the default for this Stripe SDK version
});

// Base app URL for redirects (success / cancel URLs, billing portal, etc.)
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
