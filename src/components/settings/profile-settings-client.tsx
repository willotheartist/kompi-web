/* eslint-disable react/no-unescaped-entities */

"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
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
  const { update: refreshSession } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        // If you later persist image URLs, you can surface them here:
        if (data.image) {
          setAvatarPreview(data.image);
        }
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

      // 🔁 Refresh NextAuth session so Topbar shows the new name immediately
      await refreshSession?.();
    } catch (err) {
      setError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFileName(file.name);

    // Revoke old preview URL if it existed
    setAvatarPreview((prev) => {
      if (prev && prev.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return URL.createObjectURL(file);
    });

    // TODO: later – send file to an upload API and persist URL on User.image
    console.log("Selected avatar file:", file.name);
  }

  return (
    <form
      onSubmit={handleSave}
      className="wf-settings-profile flex flex-1 flex-col gap-6"
      style={{ color: "var(--color-text)" }}
    >
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
        <p
          className="text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Manage your personal account details. This is tied to your Kompi
          login, not a specific workspace.
        </p>
      </header>

      {/* Alerts */}
      {error && (
        <div
          className="rounded-xl px-3 py-2 text-xs"
          style={{
            backgroundColor: "var(--color-accent-soft)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          {error}
        </div>
      )}

      {saved && !error && (
        <div
          className="rounded-xl px-3 py-2 text-xs"
          style={{
            backgroundColor: "var(--color-accent-soft)",
            border: "1px solid var(--color-accent)",
            color: "var(--color-text)",
          }}
        >
          Profile updated.
        </div>
      )}

      {/* Avatar */}
      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-base">Profile image</CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
            This avatar is shown in the dashboard and navigation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full text-lg font-medium"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          >
            {avatarPreview ? (
              // Simple img for blob URL/remote URL preview
              <img
                src={avatarPreview}
                alt={name || email || "Profile image"}
                className="h-full w-full object-cover"
              />
            ) : (
              (name?.trim()?.[0]?.toUpperCase() ||
                email?.trim()?.[0]?.toUpperCase() ||
                "U")
            )}
          </div>

          <div className="space-y-2 text-sm">
            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            {/* Custom upload button: accent pill + dark plus chip */}
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-bg)",
                borderRadius: "999px",
                border: "1px solid var(--color-border)",
              }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "var(--color-bg)",
                  // Set your dark green via token on body/theme so this picks it up
                  color: "var(--color-text)",
                }}
              >
                +
              </span>
              <span>
                {avatarFileName ? "Change profile image" : "Upload profile image"}
              </span>
            </Button>

            {avatarFileName && (
              <p
                className="text-[11px]"
                style={{ color: "var(--color-subtle)" }}
              >
                Selected: {avatarFileName}
              </p>
            )}

            <p
              className="text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              Avatar uploads will be wired to the backend in a later step. For now
              this image only lives in your current browser session.
            </p>
            <Button variant="outline" size="sm" type="button" disabled>
              Remove photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Basic info */}
      <Card
        className="rounded-2xl"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-base">Basic information</CardTitle>
          <CardDescription
            style={{ color: "var(--color-subtle)" }}
          >
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
              <p
                className="text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Email is managed via your sign-in method. Changes will be
                supported in a later update.
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
              <p
                className="text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Used only for important account notifications. We never share
                this with third parties.
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
                  <SelectItem value="Europe/London">
                    Europe / London
                  </SelectItem>
                  <SelectItem value="Europe/Berlin">
                    Europe / Berlin
                  </SelectItem>
                  <SelectItem value="America/New_York">
                    America / New York
                  </SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    America / Los Angeles
                  </SelectItem>
                  <SelectItem value="Asia/Singapore">
                    Asia / Singapore
                  </SelectItem>
                </SelectContent>
              </Select>
              <p
                className="text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                We'll use this for analytics and reporting later.
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
