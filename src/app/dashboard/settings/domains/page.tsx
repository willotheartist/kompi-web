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

export default function DashboardDomainSettingsPage() {
  return (
    <div className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Domains</h1>
        <p className="text-sm text-slate-400">
          Connect branded domains and choose which domain new links should use by default.
        </p>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Connected domains</CardTitle>
          <CardDescription>
            These domains can be used when creating short links. Only one domain can be default.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockDomains.length === 0 && (
            <p className="text-xs text-slate-400">
              No domains connected yet. Add your first domain below.
            </p>
          )}

          {mockDomains.length > 0 && (
            <div className="divide-y rounded-md border border-white/10 bg-white/10">
              {mockDomains.map((d) => (
                <div
                  key={d.domain}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                >
                  <div>
                    <div className="font-medium">{d.domain}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 border text-[10px] uppercase tracking-wide ${
                          d.status === "Verified"
                            ? "border-emerald-500/40 text-emerald-700"
                            : "border-amber-500/40 text-amber-700"
                        } bg-white/60`}
                      >
                        {d.status}
                      </span>
                      {d.isDefault && (
                        <span className="text-[10px] uppercase tracking-wide text-neutral-500">
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

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Add a new domain</CardTitle>
          <CardDescription>
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
            <p className="text-xs text-slate-400">
              You&apos;ll need access to this domain&apos;s DNS to finish setup.
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Add domain</Button>
          </div>

          <div className="rounded-md border border-dashed border-neutral-200 bg-white/10 p-3 text-xs text-slate-400">
            <p className="mb-1 font-medium">DNS instructions</p>
            <p>
              After adding your domain, you&apos;ll see the DNS records you need to set
              (CNAME or A records). Once DNS updates, we&apos;ll automatically mark
              your domain as verified.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
