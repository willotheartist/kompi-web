/* eslint-disable react/no-unescaped-entities */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Pattern: Settings/DangerZone
export default function DashboardAdvancedSettingsPage() {
  return (
    <section
      className="wf-settings-advanced flex flex-1 flex-col gap-6"
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
            Advanced
          </span>
        </h1>
        <p
          className="text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Workspace-level advanced options. Be careful — some actions are
          destructive.
        </p>
      </header>

      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="text-base"
            style={{
              fontFamily:
                "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
              fontStyle: "italic",
            }}
          >
            Danger zone
          </CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
            Deleting a workspace is permanent. This will remove links,
            analytics, and associated bio pages. There's no undo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p
            className="text-xs"
            style={{ color: "var(--color-subtle)" }}
          >
            For now, workspace deletion may still be handled manually. If
            you're not sure, contact support first and we'll help you decide.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="confirm">
              Type{" "}
              <span className="font-mono">delete my workspace</span> to
              confirm
            </label>
            <Input
              id="confirm"
              placeholder="delete my workspace"
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              disabled
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-subtle)",
              }}
            >
              Delete workspace
            </Button>
          </div>

          <p
            className="text-xs"
            style={{ color: "var(--color-subtle)" }}
          >
            Delete will be wired to the backend in a later iteration. For now,
            reach out via Support if you need a workspace deleted.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
