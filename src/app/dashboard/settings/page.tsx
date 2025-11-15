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
    description: "Control how your public pages look and how they appear in search.",
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
    <div className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Settings
        </h1>
        <p className="text-sm text-slate-400">
          Configure your Kompi workspace, branding, and account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="group h-full cursor-pointer border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-xl">
              <CardHeader className="flex flex-row items-start gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-300 group-hover:bg-cyan-400/10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold text-slate-50">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    {description}
                  </CardDescription>
                </div>
                <span className="ml-auto text-[10px] font-medium uppercase tracking-wide text-slate-500 group-hover:text-cyan-300">
                  Open
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-500 group-hover:text-slate-300">
                  Open {title.toLowerCase()} settings
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
