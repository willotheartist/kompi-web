"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, IdCard, QrCode, Link2, BarChart3, Settings, Inbox, CircleHelp, Plus } from "lucide-react";
import { AccountMenu } from "./account-menu";
import { PUBLIC_SITE_URL } from "@/lib/urls";
import { cn } from "@/lib/utils";
const nav = [
 { href: "/dashboard", label: "Overview", icon: Home },
 { href: "/dashboard/cards", label: "Kompi Cards", short: "Cards", icon: IdCard },
 { href: "/kr-codes/your", label: "QR Codes", icon: QrCode },
 { href: "/links", label: "Short Links", short: "Links", icon: Link2 },
 { href: "/analytics", label: "Analytics", icon: BarChart3 },
];
export function DashboardLayout({ children, pageTitle, pageEyebrow, pageDescription }: { children: ReactNode; pageTitle?: string; pageEyebrow?: string; pageDescription?: string }) {
 const path = usePathname(); const { status } = useSession(); const guest = status !== "authenticated";
 const active = (href: string) => href === "/dashboard" ? path === href : href === "/dashboard/cards" ? path.startsWith(href) || path.startsWith("/k-cards") : href === "/kr-codes/your" ? path.startsWith("/kr-codes") : path.startsWith(href);
 const title = pageTitle || nav.find(n => active(n.href))?.label || (path.includes("settings") ? "Settings" : path.includes("messages") ? "Messages" : "Your workspace");
 return <div className="min-h-screen bg-[#fafafa] text-neutral-950"><aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-neutral-200 bg-white px-4 py-6 lg:flex"><Link href={guest ? PUBLIC_SITE_URL : "/dashboard"} className="px-3 text-3xl font-medium tracking-tight">Kompi.</Link><p className="mb-5 mt-2 px-3 text-sm text-neutral-500">A little more connected.</p><Link href="/kr-codes" className="mb-6 flex min-h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 text-sm font-medium text-white"><Plus size={17}/>Create a QR code</Link><nav aria-label="Workspace" className="space-y-1">{nav.map(({ href, label, icon: Icon }) => <Link key={href} href={href} aria-current={active(href) ? "page" : undefined} className={cn("flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm transition-colors", active(href) ? "bg-[var(--color-accent-pink-soft)] font-medium" : "text-neutral-600 hover:bg-neutral-100")}><Icon size={19}/>{label}</Link>)}<Link href="/messages" className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm text-neutral-600 hover:bg-neutral-100"><Inbox size={19}/>Messages</Link></nav><div className="mt-auto space-y-1 border-t border-neutral-200 pt-4"><Link href="/dashboard/settings" className="flex min-h-11 items-center gap-3 px-3 text-sm"><Settings size={18}/>Settings</Link><Link href="/dashboard/support" className="flex min-h-11 items-center gap-3 px-3 text-sm"><CircleHelp size={18}/>Help & support</Link><a href={PUBLIC_SITE_URL} className="block px-3 pt-4 text-sm text-neutral-500">Visit kompi.app</a></div></aside>
 <div className="lg:pl-60"><header className="sticky top-0 z-30 border-b border-neutral-200 bg-white"><div className="mx-auto flex min-h-17 max-w-[1600px] items-center justify-between gap-4 px-5 py-3 sm:px-8"><div className="min-w-0">{pageEyebrow && <p className="text-sm text-neutral-500">{pageEyebrow}</p>}<div className="flex items-center gap-3"><Link href={guest ? PUBLIC_SITE_URL : "/dashboard"} className="text-xl font-medium tracking-tight lg:hidden">K.</Link><p className="truncate text-base font-medium">{title}</p></div>{pageDescription && <p className="mt-1 text-sm text-neutral-500">{pageDescription}</p>}</div>{guest ? <Link className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white" href={`/signin?callbackUrl=${encodeURIComponent(path)}`}>Sign in</Link> : <AccountMenu />}</div></header><main className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-6 sm:px-8 lg:pb-10">{children}</main></div>
 {!guest && <nav aria-label="Mobile workspace" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-neutral-200 bg-white px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">{[...nav.slice(0,4), { href: "/dashboard/settings", label: "Settings", short: "Settings", icon: Settings }].map(({ href, label, short, icon: Icon }) => <Link key={href} href={href} aria-current={active(href) ? "page" : undefined} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-xs", active(href) ? "bg-[var(--color-accent-pink-soft)] font-medium" : "text-neutral-600")}><Icon size={20}/>{short || label}</Link>)}</nav>}</div>;
}
export default DashboardLayout;
