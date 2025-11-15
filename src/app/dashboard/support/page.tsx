import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardSupportPage() {
  return (
    <div className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Support</h1>
        <p className="text-sm text-slate-400">
          Stuck, found a bug, or have a feature request? Let us know and we&apos;ll help.
        </p>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Quick help</CardTitle>
          <CardDescription>
            These resources will expand as Kompi grows. For now, you can always reach us directly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-400">
          <p>
            • Email support:{" "}
            <a href="mailto:support@kompi.app" className="underline">
              support@kompi.app
            </a>
          </p>
          <p>• More docs, guides, and a changelog will show up here soon.</p>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base">Contact support</CardTitle>
          <CardDescription>
            Share as much detail as you can. This form will be wired to an API endpoint later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="category">
                Category
              </label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="feature">Feature request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="subject">
                Subject
              </label>
              <Input id="subject" placeholder="Short summary" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="message">
              Message
            </label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Tell us what happened, what you expected, and any steps to reproduce..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Send message</Button>
          </div>

          <p className="text-xs text-slate-400">
            We may include basic technical details (browser, workspace, and URL) to help
            debug issues faster once this is wired to our backend.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
