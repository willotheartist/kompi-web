// src/components/dashboard/dashboard-topbar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function useClickOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!open) return;

    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  return ref;
}

type SessionUserWithImage = {
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

export function DashboardTopbar() {
  const { data } = useSession();

  const user = data?.user as SessionUserWithImage | undefined;

  const email = user?.email ?? "";
  const name = user?.name ?? "";
  const imageUrl = user?.image ?? "";
  const display = name || email || "User";

  const initial = useMemo(() => {
    const c = (display?.trim()?.[0] ?? "U").toUpperCase();
    return c;
  }, [display]);

  const [open, setOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm text-(--color-subtle)">
        <span className="font-medium text-(--color-text)">Dashboard</span>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-(--color-border) bg-(--color-surface) text-sm font-semibold text-(--color-text) transition"
          aria-label="Open account menu"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={display}
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority={false}
            />
          ) : (
            <span>{initial}</span>
          )}
        </button>

        {open && (
          <div
            className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-(--color-border) bg-(--color-surface) p-1.5"
            role="menu"
          >
            <div className="px-2.5 py-2">
              <div className="text-xs text-(--color-subtle)">Signed in as</div>
              <div className="truncate text-sm font-medium text-(--color-text)">{display}</div>
            </div>

            <MenuItem href="/dashboard/settings/profile" label="Profile" onClick={() => setOpen(false)} />
            <MenuItem href="/dashboard/settings" label="Settings" onClick={() => setOpen(false)} />
            <MenuItem href="/support" label="Support" onClick={() => setOpen(false)} />

            <div className="my-1 h-px bg-(--color-border)" />

            <button
              className="w-full rounded-lg px-2.5 py-2 text-left text-sm text-(--color-subtle) transition hover:bg-(--color-bg)"
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-2.5 py-2 text-sm text-(--color-text) transition hover:bg-(--color-bg)"
      role="menuitem"
    >
      {label}
    </Link>
  );
}
