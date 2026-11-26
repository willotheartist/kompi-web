"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleHelp, CreditCard, LogOut, Settings, Sparkles, UserRound, type LucideIcon } from "lucide-react";
import { useWorkspaceSummary } from "./shell/use-workspace-summary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Avatar({ name, image, size = 32 }: { name: string; image?: string | null; size?: number }) {
  const initial = (name.trim()[0] ?? "K").toUpperCase();
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full border border-[#E3E5E7] bg-[#FBE4FA] font-medium text-[#151619]"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {image ? <img src={image} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" /> : initial}
    </span>
  );
}

export function AccountMenu() {
  const { data } = useSession();
  const summary = useWorkspaceSummary(Boolean(data?.user));
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const email = data?.user?.email ?? "";
  const name = data?.user?.name ?? "";
  const image = (data?.user as { image?: string | null } | undefined)?.image ?? null;
  const display = name || email || "Your account";
  const paid = summary?.plan && summary.plan !== "FREE";

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
        className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-[#F3F4F5] sm:pl-3"
      >
        <span className="hidden max-w-40 truncate text-[14px] font-medium text-[#151619] sm:block">{name.split(" ")[0] || display}</span>
        {summary && (
          <span className="hidden rounded-[6px] border border-[#E3E5E7] px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#3C4045] sm:inline-block">
            {summary.planName}
          </span>
        )}
        <Avatar name={display} image={image} />
        <ChevronDown size={15} className={`text-[#8A9099] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 z-50 mt-2 w-[290px] rounded-[14px] border border-[#E3E5E7] bg-white p-1.5"
          >
            <div className="flex items-center gap-3 rounded-[10px] px-2.5 py-3">
              <Avatar name={display} image={image} size={40} />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-[#151619]">{name || "Your account"}</p>
                <p className="truncate text-[12px] text-[#80858C]">{email}</p>
              </div>
            </div>
            <div className="my-1 h-px bg-[#EDEEF0]" />
            <Item href="/dashboard/settings/profile" icon={UserRound} label="Your profile" onClick={close} />
            <Item href="/dashboard/settings" icon={Settings} label="Settings" onClick={close} />
            <Item href="/dashboard/settings/billing" icon={paid ? CreditCard : Sparkles} label={paid ? "Plans & billing" : "Upgrade your plan"} onClick={close} accent={!paid} />
            <Item href="/support" icon={CircleHelp} label="Help & support" onClick={close} />
            <div className="my-1 h-px bg-[#EDEEF0]" />
            <button
              role="menuitem"
              onClick={() => {
                close();
                void signOut({ callbackUrl: "/" });
              }}
              className="flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-left text-[14px] text-[#696C72] transition-colors hover:bg-[#F3F4F5] hover:text-[#151619]"
            >
              <LogOut size={16} /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Item({ href, icon: Icon, label, onClick, accent }: { href: string; icon: LucideIcon; label: string; onClick: () => void; accent?: boolean }) {
  return (
    <Link
      role="menuitem"
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-[10px] px-2.5 py-2 text-[14px] text-[#151619] transition-colors hover:bg-[#F3F4F5]"
    >
      <Icon size={16} className={accent ? "text-[#B24BB0]" : "text-[#80858C] transition-colors group-hover:text-[#151619]"} />
      {label}
    </Link>
  );
}
