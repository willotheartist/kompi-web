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

export default function DashboardBrandingSettingsPage() {
  return (
    <div className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Branding & SEO</h1>
        <p className="text-sm text-slate-400">
          Control how your public Kompi pages look and how they appear in search.
        </p>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Brand assets</CardTitle>
          <CardDescription>
            These settings affect link-in-bio pages and future Kompi surfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="logo">
              Logo
            </label>
            <Input id="logo" type="file" accept="image/*" className="max-w-xs text-xs" />
            <p className="text-xs text-slate-400">
              Upload your brand mark. We&apos;ll use this on public-facing Kompi pages.
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
              <div className="h-8 w-8 rounded-md border border-white/20 bg-gradient-to-br from-slate-900/20 to-slate-900/60" />
            </div>
            <p className="text-xs text-slate-400">
              Used for buttons, highlights, and gradients on public pages.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">SEO defaults</CardTitle>
          <CardDescription>
            Basic SEO preferences for your public Kompi bio and future pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="indexing">
              Search engine indexing
            </label>
            <div className="flex items-center gap-2">
              <input id="indexing" type="checkbox" className="h-4 w-4" />
              <span className="text-sm text-slate-400">
                Allow search engines to index public Kompi pages like your bio.
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="default-description">
              Default description
            </label>
            <Textarea
              id="default-description"
              placeholder="Short default description for your Kompi pages..."
              rows={3}
            />
            <p className="text-xs text-slate-400">
              We&apos;ll use this description when a page doesn&apos;t have a custom one.
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
    </div>
  );
}
