import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  User,
  Globe2,
  Palette,
  CreditCard,
  PlugZap,
  ShieldAlert,
} from "lucide-react";

// Pattern: Settings/OverviewGrid
const sections = [
  {
    href: "/dashboard/settings/profile",
    title: "Profile",
    description: "Manage your personal info, avatar, and contact details.",
    icon: User,
  },
  {
    href: "/dashboard/settings/domains",
    title: "Domains",
    description: "Connect and manage branded domains for your Kompi links.",
    icon: Globe2,
  },
  {
    href: "/dashboard/settings/branding",
    title: "Branding & SEO",
    description:
      "Control how your public pages look and how they appear in search.",
    icon: Palette,
  },
  {
    href: "/dashboard/settings/billing",
    title: "Billing & Plan",
    description: "Review your plan. Billing will plug in here later.",
    icon: CreditCard,
  },
  {
    href: "/dashboard/settings/integrations",
    title: "Integrations",
    description: "Preview upcoming analytics and automation integrations.",
    icon: PlugZap,
  },
  {
    href: "/dashboard/settings/advanced",
    title: "Advanced",
    description: "Danger zone: workspace deletion and advanced options.",
    icon: ShieldAlert,
  },
];

export default function DashboardSettingsPage() {
  return (
    <section
      className="wf-settings-page flex flex-1 flex-col gap-6"
      style={{ color: "var(--color-text)" }}
    >
      {/* Pattern: Settings/Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">
          <span
            style={{
              fontFamily:
                "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
              fontStyle: "italic",
            }}
          >
            Settings
          </span>
        </h1>
        <p
          className="text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Configure your Kompi workspace, branding, and account.
        </p>
      </header>

      {/* Pattern: Settings/OverviewGrid */}
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card
              className="group h-full cursor-pointer rounded-2xl transition-all"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <CardHeader className="flex flex-row items-start gap-3">
                <div
                  className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "var(--color-accent-soft)",
                    color: "var(--color-accent)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold">
                    {title}
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    {description}
                  </CardDescription>
                </div>
                <span
                  className="ml-auto text-[10px] font-medium uppercase tracking-wide"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Open
                </span>
              </CardHeader>
              <CardContent>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Open {title.toLowerCase()} settings
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
