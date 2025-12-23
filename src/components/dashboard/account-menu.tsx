// src/components/dashboard/account-menu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountMenu() {
  const { data } = useSession();

  const email = data?.user?.email ?? "";
  const name = data?.user?.name ?? "";
  const image =
    (data?.user as { image?: string | null } | undefined)?.image ?? null;

  const display = name || email || "User";
  const initial = (display?.trim()?.[0] ?? "U").toUpperCase();

  // (keep as-is; later you can wire real plan)
  const planLabel = "Free";

  const [open, setOpen] = useState(false);
  const menuRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-sm font-medium"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "var(--color-text)",
        }}
        aria-label="Open account menu"
      >
        <span className="max-w-40 truncate">{display}</span>

        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
          style={{
            backgroundColor: "var(--color-accent-soft)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          {planLabel}
        </span>

        <div className="flex items-center gap-1">
          <div
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-sm font-semibold"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-accent)",
              color: "var(--color-text)",
            }}
            aria-label="Account avatar"
          >
            {image ? (
              // plain img avoids next/image remote domain config
              <img
                src={image}
                alt={display}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              initial
            )}
          </div>

          <ChevronDown
            className="h-4 w-4"
            style={{ color: "var(--color-subtle)" }}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="wf-dashboard-account-menu absolute right-0 z-50 mt-2 w-80 rounded-2xl p-1.5"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
            role="menu"
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <div
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "var(--color-bg)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={display}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  initial
                )}
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="text-xs" style={{ color: "var(--color-subtle)" }}>
                  Signed in as
                </span>
                <span className="truncate text-sm font-medium">{display}</span>
              </div>
            </div>

            <div className="my-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />

            {/* Single-workspace mode: Workspace section intentionally removed */}

            <MenuItem
              href="/dashboard/settings/profile"
              label="Account"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/dashboard/settings"
              label="Settings"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/pricing"
              label="Upgrade"
              onClick={() => setOpen(false)}
            />

            <div className="my-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />

            <MenuItem
              href="/dashboard/support"
              label="Ask a question"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/dashboard/support"
              label="Help topics"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/dashboard/support"
              label="Share feedback"
              onClick={() => setOpen(false)}
            />

            <div className="my-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />

            <button
              className={cn(
                "wf-dashboard-account-menu-signout w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium transition"
              )}
              style={{ color: "var(--color-subtle)" }}
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
      className={cn("wf-dashboard-account-menu-item block rounded-lg px-2.5 py-2 text-sm transition")}
      role="menuitem"
      style={{ color: "var(--color-text)" }}
    >
      <span>{label}</span>
    </Link>
  );
}

function useOutsideClose<T extends HTMLElement>(open: boolean, onClose: () => void) {
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
