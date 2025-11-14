"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

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
      {/* Left: product title or breadcrumb placeholder */}
      <div className="text-sm text-zinc-400">
        <span className="font-medium text-zinc-200">Dashboard</span>
      </div>

      {/* Right: avatar/menu */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="h-9 w-9 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-sm font-semibold text-white hover:bg-zinc-700/70 transition"
          aria-label="Open account menu"
        >
          {initial}
        </button>

        {open && (
          <div
            className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0A0E23]/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.65)] p-1.5 z-50"
            role="menu"
          >
            <div className="px-2.5 py-2">
              <div className="text-xs text-zinc-400">Signed in as</div>
              <div className="text-sm font-medium text-zinc-100 truncate">{display}</div>
            </div>

            <MenuItem href="/dashboard/profile" label="Profile" onClick={() => setOpen(false)} />
            <MenuItem href="/dashboard/settings" label="Settings" onClick={() => setOpen(false)} />
            <MenuItem href="/support" label="Support" onClick={() => setOpen(false)} />

            <div className="my-1 h-px bg-white/10" />

            <button
              className="w-full text-left rounded-lg px-2.5 py-2 text-sm text-red-300 hover:bg-white/5 hover:text-red-200 transition"
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
      className="block rounded-lg px-2.5 py-2 text-sm text-zinc-200 hover:bg-white/5 hover:text-white transition"
      role="menuitem"
    >
      {label}
    </Link>
  );
}
