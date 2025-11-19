import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockDomains = [
  { domain: "kmp.li", status: "Verified", isDefault: true },
  { domain: "go.yourbrand.com", status: "Pending", isDefault: false },
];

// Pattern: Settings/Domains
export default function DashboardDomainSettingsPage() {
  return (
    <section
      className="wf-settings-domains flex flex-1 flex-col gap-6"
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
            Domains
          </span>
        </h1>
        <p
          className="text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Connect branded domains and choose which domain new links should use
          by default.
        </p>
      </header>

      {/* Connected domains */}
      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-base">Connected domains</CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
            These domains can be used when creating short links. Only one
            domain can be default.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockDomains.length === 0 && (
            <p
              className="text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              No domains connected yet. Add your first domain below.
            </p>
          )}

          {mockDomains.length > 0 && (
            <div
              className="divide-y rounded-xl"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg)",
              }}
            >
              {mockDomains.map((d) => (
                <div
                  key={d.domain}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                >
                  <div>
                    <div className="font-medium">{d.domain}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
                        style={{
                          border: "1px solid var(--color-border)",
                          backgroundColor: "var(--color-accent-soft)",
                          color: "var(--color-accent)",
                        }}
                      >
                        {d.status}
                      </span>
                      {d.isDefault && (
                        <span
                          className="text-[10px] uppercase tracking-wide"
                          style={{ color: "var(--color-subtle)" }}
                        >
                          · Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!d.isDefault && (
                      <Button variant="outline" size="sm" type="button">
                        Set default
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" type="button">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add domain */}
      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-base">Add a new domain</CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
            Connect a custom domain like{" "}
            <span className="font-mono text-[11px]">go.yourbrand.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="domain">
              Domain
            </label>
            <Input
              id="domain"
              placeholder="go.yourbrand.com"
              autoComplete="off"
            />
            <p
              className="text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              You'll need access to this domain's DNS to finish setup.
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Add domain</Button>
          </div>

          <div
            className="rounded-md border border-dashed p-3 text-xs"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-bg)",
              color: "var(--color-subtle)",
            }}
          >
            <p className="mb-1 font-medium" style={{ color: "var(--color-text)" }}>
              DNS instructions
            </p>
            <p>
              After adding your domain, you'll see the DNS records you need to
              set (CNAME or A records). Once DNS updates, we'll automatically
              mark your domain as verified.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
