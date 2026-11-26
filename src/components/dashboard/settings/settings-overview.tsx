"use client";

import Link from "next/link";
import { ArrowUpRight, CircleHelp, CreditCard, Keyboard, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { Rise, Stagger } from "../ui";

const ITEMS: { href: string; title: string; copy: string; icon: LucideIcon; tint: string; external?: boolean }[] = [
  { href: "/dashboard/settings/profile", title: "Your profile", copy: "Your name and profile photo.", icon: UserRound, tint: "#FBE4FA" },
  { href: "/dashboard/settings/billing", title: "Plans & billing", copy: "Limits, payments and renewals.", icon: CreditCard, tint: "#E6ECFA" },
  { href: "/dashboard/settings/advanced", title: "Account & privacy", copy: "Export your data, sign out everywhere or request deletion.", icon: ShieldCheck, tint: "#E7F0EA" },
  { href: "/support", title: "Help & support", copy: "Guides and answers for Cards, QR codes and links.", icon: CircleHelp, tint: "#F6EEDF" },
];

export function SettingsOverview() {
  return (
    <>
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {ITEMS.map(({ href, title, copy, icon: Icon, tint }) => (
          <Rise key={href}>
            <Link href={href} className="group flex h-full flex-col rounded-[16px] border border-[#E3E5E7] bg-white p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#CDD1D7]">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-[12px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" style={{ background: tint }}>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <ArrowUpRight size={18} className="text-[#C2C5CA] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#151619]" />
              </div>
              <h2 className="mt-6 text-[18px] font-medium tracking-[-0.025em]">{title}</h2>
              <p className="mt-1.5 text-[14px] leading-6 text-[#696C72]">{copy}</p>
            </Link>
          </Rise>
        ))}
      </Stagger>
      <div className="mt-6 rounded-[16px] border border-[#E3E5E7] bg-white p-6">
        <h2 className="flex items-center gap-2 text-[16px] font-medium tracking-[-0.02em]">
          <Keyboard size={17} className="text-[#80858C]" /> Keyboard shortcuts
        </h2>
        <dl className="mt-4 grid gap-x-8 gap-y-3 text-[14px] sm:grid-cols-2">
          {[
            ["Search or jump anywhere", "⌘ K"],
            ["Collapse the sidebar", "⌘ \\"],
            ["Next / previous message", "J  K"],
            ["Close menus and dialogs", "Esc"],
          ].map(([label, keys]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-[#F1F2F4] pb-3 last:border-0 sm:[&:nth-last-child(2)]:border-0">
              <dt className="text-[#5A5E65]">{label}</dt>
              <dd>
                <kbd className="rounded-[6px] border border-[#E3E5E7] bg-[#FAFAFB] px-2 py-0.5 font-sans text-[12px] font-medium text-[#3C4045]">{keys}</kbd>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
