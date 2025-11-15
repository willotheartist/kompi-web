import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardAdvancedSettingsPage() {
  return (
    <div className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Advanced</h1>
        <p className="text-sm text-slate-400">
          Workspace-level advanced options. Be careful — some actions are destructive.
        </p>
      </div>

      <Card className="border-destructive/30 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Deleting a workspace is permanent. This will remove links, analytics, and
            associated bio pages. There&apos;s no undo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-slate-400">
            For now, workspace deletion may still be handled manually. If you&apos;re not
            sure, contact support first and we&apos;ll help you decide.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="confirm">
              Type <span className="font-mono">delete my workspace</span> to confirm
            </label>
            <Input
              id="confirm"
              placeholder="delete my workspace"
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end">
            <Button variant="destructive" disabled>
              Delete workspace
            </Button>
          </div>

          <p className="text-xs text-slate-400">
            Delete will be wired to the backend in a later iteration. For now, reach out
            via Support if you need a workspace deleted.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
