"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function useClickOutside<T extends HTMLElement>(
  open: boolean,
  onClose: () => void
) {
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

export function DashboardTopbar() {
  const { data } = useSession();
  const email = data?.user?.email ?? "";
  const name = data?.user?.name ?? "";
  const display = name || email || "User";
  const initial = (display?.trim()?.[0] ?? "U").toUpperCase();

  const [open, setOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: product title / breadcrumb placeholder */}
      <div
        className="text-sm"
        style={{ color: "var(--color-subtle)" }}
      >
        <span
          className="font-medium"
          style={{ color: "var(--color-text)" }}
        >
          Dashboard
        </span>
      </div>

      {/* Right: avatar/menu */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
          aria-label="Open account menu"
        >
          {initial}
        </button>

        {open && (
          <div
            className="absolute right-0 z-50 mt-2 w-56 rounded-2xl p-1.5"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
            role="menu"
          >
            <div className="px-2.5 py-2">
              <div
                className="text-xs"
                style={{ color: "var(--color-subtle)" }}
              >
                Signed in as
              </div>
              <div
                className="truncate text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {display}
              </div>
            </div>

            <MenuItem
              href="/dashboard/profile"
              label="Profile"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/dashboard/settings"
              label="Settings"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/support"
              label="Support"
              onClick={() => setOpen(false)}
            />

            <div
              className="my-1 h-px"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            <button
              className="w-full rounded-lg px-2.5 py-2 text-sm text-left transition"
              style={{ color: "var(--color-subtle)" }}
              onClick={() => {
                setOpen(false);
                // After sign out, send back to homepage (or change to /signin)
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
      className="block rounded-lg px-2.5 py-2 text-sm transition"
      role="menuitem"
      style={{ color: "var(--color-text)" }}
    >
      {label}
    </Link>
  );
}
