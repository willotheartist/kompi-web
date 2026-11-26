"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { LayoutGrid, Settings } from "lucide-react";
import { SETTINGS_NAV } from "../shell/nav";
import { PageHeader } from "../ui";
import { cn } from "@/lib/utils";

const TABS = [{ href: "/dashboard/settings", label: "Overview", icon: LayoutGrid }, ...SETTINGS_NAV];

export function SettingsTabs() {
  const path = usePathname() || "";
  return (
    <>
      <PageHeader eyebrow="Settings" icon={Settings} title="Your account, your way." description="Profile, plan and privacy controls for your Kompi workspace." />
      <LayoutGroup id="settings-tabs">
        <nav aria-label="Settings sections" className="-mx-4 mb-8 flex gap-1 overflow-x-auto border-b border-[#E3E5E7] px-4 sm:mx-0 sm:px-0">
          {TABS.map((t) => {
            const active = t.href === "/dashboard/settings" ? path === t.href : path.startsWith(t.href);
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={cn("relative flex h-11 shrink-0 items-center gap-2 px-3 text-[14px] transition-colors", active ? "font-medium text-[#151619]" : "text-[#80858C] hover:text-[#151619]")}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.75} />
                {t.label}
                {active && <motion.span layoutId="settings-underline" className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-[#151619]" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              </Link>
            );
          })}
        </nav>
      </LayoutGroup>
    </>
  );
}

export function SettingsSection({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <motion.div key={path} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
