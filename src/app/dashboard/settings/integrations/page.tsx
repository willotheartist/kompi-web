/* eslint-disable react/no-unescaped-entities */

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
    description:
      "Track conversions from Kompi links into your Meta ad campaigns.",
  },
  {
    name: "Webhooks",
    category: "Automation",
    status: "Coming soon",
    description:
      "Trigger external tools when links are created or clicked.",
  },
];

// Pattern: Settings/IntegrationsGrid
export default function DashboardIntegrationsSettingsPage() {
  return (
    <section
      className="wf-settings-integrations flex flex-1 flex-col gap-6"
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
            Integrations
          </span>
        </h1>
        <p
          className="text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Connect analytics and automation tools. For now, this is a preview of
          what's coming.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((integration) => (
          <Card
            key={integration.name}
            className="flex flex-col rounded-2xl"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <CardHeader>
              <CardTitle className="text-base">
                {integration.name}
              </CardTitle>
              <CardDescription
                style={{ color: "var(--color-subtle)" }}
              >
                {integration.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex items-center justify-between gap-2 text-xs">
              <span style={{ color: "var(--color-subtle)" }}>
                {integration.category}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-subtle)",
                }}
              >
                {integration.status}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p
        className="text-xs"
        style={{ color: "var(--color-subtle)" }}
      >
        If there's an integration you'd like to see prioritised, drop a note on
        the Support page.
      </p>
    </section>
  );
}
