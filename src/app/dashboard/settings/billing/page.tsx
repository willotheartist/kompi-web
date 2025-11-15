import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardBillingSettingsPage() {
  const currentPlan = {
    name: "Free",
    price: "£0 / month",
    description: "Perfect while you&apos;re testing Kompi.",
    features: [
      "Unlimited short links",
      "1 workspace",
      "Basic analytics",
      "Standard support",
    ],
  };

  return (
    <div className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Billing & plan</h1>
        <p className="text-sm text-slate-400">
          Review your current plan. Billing integration will be added here later.
        </p>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Current plan</CardTitle>
          <CardDescription>
            Plan details are static for now. Stripe / Lemon Squeezy will plug in here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{currentPlan.name}</p>
              <p className="text-xs text-slate-400">
                {currentPlan.description}
              </p>
            </div>
            <p className="text-base font-semibold">{currentPlan.price}</p>
          </div>

          <ul className="space-y-1 text-sm text-slate-400">
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

          <p className="text-xs text-slate-400">
            Detailed invoices, tax information, and payment methods will live here once
            billing is connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
