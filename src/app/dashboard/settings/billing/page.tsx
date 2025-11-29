import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const FREE_LINK_LIMIT = 20;
const CREATOR_LINK_LIMIT = 100;
const CREATOR_QR_LIMIT = 100;
const CREATOR_KCARD_LIMIT = 1;

// Always treat this page as dynamic (user + workspace dependent)
export const dynamic = "force-dynamic";

// Server action to upgrade the active workspace to Creator
async function upgradeToCreator() {
  "use server";

  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);
  if (!workspace) return;

  // Already on Creator – nothing to do
  if ((workspace as { plan?: string | null }).plan === "CREATOR") {
    return;
  }

  await prisma.workspace.update({
    where: { id: workspace.id },
    data: { plan: "CREATOR" },
  });

  // Revalidate key views that depend on plan / limits
  revalidatePath("/dashboard/settings/billing");
  revalidatePath("/links");
  revalidatePath("/dashboard");
}

// Pattern: Settings/DetailSection
export default async function DashboardBillingSettingsPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);

  // Older workspaces might not have a plan yet – treat as FREE
  const plan = (workspace as { plan?: string | null } | null)?.plan ?? "FREE";
  const isCreator = plan === "CREATOR";

  const currentPlan = isCreator
    ? {
        name: "Creator",
        price: "£9.99 / month",
        description: "More headroom for links, KR codes and K-cards.",
        features: [
          `Up to ${CREATOR_LINK_LIMIT} short links`,
          `Up to ${CREATOR_QR_LIMIT} KR / QR codes`,
          `${CREATOR_KCARD_LIMIT} Kompi K-card`,
          "Better limits for growing creators",
        ],
      }
    : {
        name: "Free",
        price: "£0 / month",
        description: "Perfect while you're testing Kompi.",
        features: [
          `Up to ${FREE_LINK_LIMIT} short links`,
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
          <CardDescription style={{ color: "var(--color-subtle)" }}>
            Plan details are basic for now. Stripe / Lemon Squeezy will plug
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

            {isCreator ? (
              <Button disabled>On Creator plan</Button>
            ) : (
              <form action={upgradeToCreator}>
                <Button type="submit">Upgrade to Creator</Button>
              </form>
            )}
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
