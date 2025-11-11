"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { data, status } = useSession();

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

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex flex-col items-end leading-tight">
        <span className="text-[10px] text-neutral-500">Logged in as</span>
        <span className="text-xs font-medium text-neutral-900">
          {email}
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}
