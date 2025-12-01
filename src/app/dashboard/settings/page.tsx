import Link from "next/link";
import { Card } from "@/components/ui/card";
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
    description: "Review your plan & subscriptions.",
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
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">
          Settings
        </h1>
        <p
          className="max-w-xl text-sm"
          style={{ color: "var(--color-subtle)" }}
        >
          Configure your Kompi workspace, branding, and account.
        </p>
      </header>

      {/* Overview grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href} className="block">
            <Card
              className="group h-full cursor-pointer rounded-3xl border-0 px-8 py-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
              style={{
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "#063a35",
                      color: "#d9ff2f",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{title}</p>
                    <p
                      className="max-w-sm text-xs leading-snug"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      {description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-start">
                  <span
                    className="text-sm transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--color-subtle)" }}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
