import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Pattern: Settings/DetailSection
export default function DashboardBillingSettingsPage() {
  const currentPlan = {
    name: "Free",
    price: "£0 / month",
    description: "Perfect while you're testing Kompi.",
    features: [
      "Unlimited short links",
      "1 workspace",
      "Basic analytics",
      "Standard support",
    ],
  };

  return (
    <section
      className="wf-settings-billing flex flex-1 flex-col gap-6"
      style={{ color: "var(--color-text)" }}
    >
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">
          <span
            style={{
              fontFamily:
                "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
              fontStyle: "italic",
            }}
          >
            Billing &amp; plan
          </span>
        </h1>
        <p
          className="text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Review your current plan. Billing integration will be added here
          later.
        </p>
      </header>

      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-base">Current plan</CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
            Plan details are static for now. Stripe / Lemon Squeezy will plug
            in here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{currentPlan.name}</p>
              <p
                className="text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                {currentPlan.description}
              </p>
            </div>
            <p className="text-base font-semibold">{currentPlan.price}</p>
          </div>

          <ul
            className="space-y-1 text-sm"
            style={{ color: "var(--color-subtle)" }}
          >
            {currentPlan.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
            <Button asChild>
              <Link href="/pricing">Upgrade plan</Link>
            </Button>
          </div>

          <p
            className="text-xs"
            style={{ color: "var(--color-subtle)" }}
          >
            Detailed invoices, tax information, and payment methods will live
            here once billing is connected.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
