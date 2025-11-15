import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const integrations = [
  {
    name: "Google Analytics 4",
    category: "Analytics",
    status: "Coming soon",
    description: "Send click and page view data to your GA4 property.",
  },
  {
    name: "Meta Pixel",
    category: "Analytics",
    status: "Coming soon",
    description: "Track conversions from Kompi links into your Meta ad campaigns.",
  },
  {
    name: "Webhooks",
    category: "Automation",
    status: "Coming soon",
    description: "Trigger external tools when links are created or clicked.",
  },
];

export default function DashboardIntegrationsSettingsPage() {
  return (
    <div className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Integrations</h1>
        <p className="text-sm text-slate-400">
          Connect analytics and automation tools. For now, this is a preview of what&apos;s coming.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((integration) => (
          <Card
            key={integration.name}
            className="flex flex-col border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <CardHeader>
              <CardTitle className="text-base">{integration.name}</CardTitle>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex items-center justify-between gap-2 text-xs text-slate-400">
              <span>{integration.category}</span>
              <Button size="sm" variant="outline" disabled>
                {integration.status}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-slate-400">
        If there&apos;s an integration you&apos;d like to see prioritised, drop a note on the Support page.
      </p>
    </div>
  );
}
