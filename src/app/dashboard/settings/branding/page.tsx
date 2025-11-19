import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Pattern: Settings/BrandingSEO
export default function DashboardBrandingSettingsPage() {
  return (
    <section
      className="wf-settings-branding flex flex-1 flex-col gap-6"
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
            Branding &amp; SEO
          </span>
        </h1>
        <p
          className="text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Control how your public Kompi pages look and how they appear in
          search.
        </p>
      </header>

      {/* Brand assets */}
      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-base">Brand assets</CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
            These settings affect link-in-bio pages and future Kompi surfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="logo">
              Logo
            </label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              className="max-w-xs text-xs"
            />
            <p
              className="text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              Upload your brand mark. We'll use this on public-facing Kompi
              pages.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="accent">
              Accent color
            </label>
            <div className="flex items-center gap-3">
              <Input
                id="accent"
                type="text"
                placeholder="#3A61FF"
                className="max-w-[140px] font-mono text-xs"
              />
              <div
                className="h-8 w-8 rounded-md border"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-accent-soft)",
                }}
              />
            </div>
            <p
              className="text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              Used for buttons, highlights, and accents on public pages.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO defaults */}
      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-base">SEO defaults</CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
            Basic SEO preferences for your public Kompi bio and future pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="indexing">
              Search engine indexing
            </label>
            <div className="flex items-center gap-2">
              <input
                id="indexing"
                type="checkbox"
                className="h-4 w-4"
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-subtle)" }}
              >
                Allow search engines to index public Kompi pages like your
                bio.
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label
              className="text-sm font-medium"
              htmlFor="default-description"
            >
              Default description
            </label>
            <Textarea
              id="default-description"
              placeholder="Short default description for your Kompi pages..."
              rows={3}
            />
            <p
              className="text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              We'll use this description when a page doesn't have a custom
              one.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
