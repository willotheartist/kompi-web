"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { data, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="h-8 w-24 rounded-full bg-neutral-100 animate-pulse" />
    );
  }

  if (!data?.user) {
    return (
      <Button size="sm" variant="outline" onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }

  const email = data.user.email ?? "User";
  const name = data.user.name ?? email;
  const initial = name.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div className="relative flex items-center gap-2">
      <div className="hidden sm:flex flex-col items-end leading-tight">
        <span className="text-[10px] text-neutral-500">Logged in as</span>
        <span className="text-xs font-medium text-neutral-900 truncate max-w-[160px]">
          {email}
        </span>
      </div>

      {/* Avatar / trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="h-8 w-8 rounded-full bg-neutral-900 text-neutral-50 flex items-center justify-center text-xs font-medium focus:outline-none focus:ring-2 focus:ring-neutral-400"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-44 rounded-md border bg-white shadow-lg text-xs text-neutral-900">
          <div className="px-3 py-2 border-b">
            <p className="font-medium truncate">{name}</p>
            <p className="text-[10px] text-neutral-500 truncate">{email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/settings/profile"
              className="block w-full px-3 py-1.5 text-left hover:bg-neutral-50"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block w-full px-3 py-1.5 text-left hover:bg-neutral-50"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
            <Link
              href="/support"
              className="block w-full px-3 py-1.5 text-left hover:bg-neutral-50"
              onClick={() => setOpen(false)}
            >
              Support
            </Link>
            <button
              type="button"
              className="block w-full px-3 py-1.5 text-left hover:bg-neutral-50 text-red-600"
              onClick={() => {
                setOpen(false);
                signOut();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
