"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProfileResponse = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  // phone?: string | null;
};

export function ProfileSettingsClient() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        setLoading(true);
        const res = await fetch("/api/settings/profile");
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        const data: ProfileResponse = await res.json();
        if (cancelled) return;

        setName(data.name ?? "");
        setEmail(data.email ?? "");
        // setPhone(data.phone ?? "");
      } catch (err) {
        if (!cancelled) {
          setError("Could not load profile. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    try {
      setSaving(true);

      const res = await fetch("/api/settings/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          // phone,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      setSaved(true);
    } catch (err) {
      setError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="flex-1 space-y-6 px-4 py-6 lg:px-8 text-slate-100"
    >
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-slate-400">
          Manage your personal account details. This is tied to your Kompi login, not a specific workspace.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
          {error}
        </div>
      )}

      {saved && !error && (
        <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
          Profile updated.
        </div>
      )}

      {/* Avatar (still placeholder UI for now) */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-slate-50">Profile image</CardTitle>
          <CardDescription className="text-slate-400">
            This avatar is shown in the dashboard and navigation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-lg font-medium text-neutral-50">
            {name?.trim()?.[0]?.toUpperCase() || email?.trim()?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="space-y-2 text-sm text-slate-200">
            <Input type="file" accept="image/*" className="max-w-xs text-xs" disabled />
            <p className="text-xs text-slate-400">
              Avatar uploads will be wired in a later step. For now we use your account image.
            </p>
            <Button variant="outline" size="sm" type="button" disabled>
              Remove photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Basic info */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-slate-50">Basic information</CardTitle>
          <CardDescription className="text-slate-400">
            Update how you appear in Kompi products and communication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading || saving}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@kompi.app"
                value={email}
                disabled
              />
              <p className="text-xs text-slate-400">
                Email is managed via your sign-in method. Changes will be supported in a later update.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="phone">
                Telephone
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+44 7..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading || saving}
              />
              <p className="text-xs text-slate-400">
                Used only for important account notifications. We never share this with third parties.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Time zone</label>
              <Select
                value={timeZone}
                onValueChange={(v) => setTimeZone(v)}
                disabled={loading || saving}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/London">Europe / London</SelectItem>
                  <SelectItem value="Europe/Berlin">Europe / Berlin</SelectItem>
                  <SelectItem value="America/New_York">America / New York</SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    America / Los Angeles
                  </SelectItem>
                  <SelectItem value="Asia/Singapore">Asia / Singapore</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">
                We&apos;ll use this for analytics and reporting later.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              disabled={loading || saving}
              onClick={() => {
                setSaved(false);
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
