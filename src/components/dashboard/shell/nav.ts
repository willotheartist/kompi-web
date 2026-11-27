import {
  BarChart3,
  CircleHelp,
  CreditCard,
  House,
  IdCard,
  Inbox,
  Link2,
  QrCode,
  Receipt,
  Settings,
  ShoppingBag,
  Wallet,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  short?: string;
  icon: LucideIcon;
  /** Extra path prefixes that should light this item up. */
  match?: string[];
  exact?: boolean;
  keywords?: string;
};

export type NavGroup = { label?: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [{ href: "/dashboard", label: "Overview", short: "Home", icon: House, exact: true, keywords: "home dashboard start" }],
  },
  {
    label: "Create",
    items: [
      { href: "/dashboard/cards", label: "Kompi Cards", short: "Cards", icon: IdCard, match: ["/k-cards", "/dashboard/k-cards"], keywords: "profile bio card" },
      { href: "/kr-codes/your", label: "QR Codes", short: "QR", icon: QrCode, match: ["/kr-codes"], keywords: "qr kr code scan" },
      { href: "/links", label: "Short Links", short: "Links", icon: Link2, match: ["/dashboard/links"], keywords: "url shorten redirect" },
    ],
  },
  {
    label: "Earn",
    items: [
      { href: "/dashboard/earn/products", label: "Products", short: "Store", icon: ShoppingBag, keywords: "store shop sell digital download booking tip lead magnet" },
      { href: "/dashboard/earn/orders", label: "Orders", icon: Receipt, keywords: "sales purchases bookings customers" },
      { href: "/dashboard/earn/payouts", label: "Payouts", icon: Wallet, keywords: "stripe bank money earnings connect" },
    ],
  },
  {
    label: "Insights",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3, keywords: "stats visits clicks scans" },
      { href: "/messages", label: "Messages", icon: Inbox, match: ["/dashboard/messages"], keywords: "inbox contact" },
    ],
  },
];

export const FOOTER_NAV: NavItem[] = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings, keywords: "preferences account" },
  { href: "/support", label: "Help & support", icon: CircleHelp, match: ["/dashboard/support"], keywords: "help faq contact" },
];

export const SETTINGS_NAV: NavItem[] = [
  { href: "/dashboard/settings/profile", label: "Your profile", icon: UserRound, keywords: "name photo avatar" },
  { href: "/dashboard/settings/billing", label: "Plans & billing", icon: CreditCard, keywords: "upgrade subscription invoice pro" },
  { href: "/dashboard/settings/advanced", label: "Account & privacy", icon: ShieldCheck, keywords: "export delete sessions sign out" },
];

export const ALL_NAV: NavItem[] = [...NAV_GROUPS.flatMap((g) => g.items), ...FOOTER_NAV];

export function isActive(item: NavItem, path: string) {
  if (item.exact) return path === item.href;
  if (path === item.href || path.startsWith(`${item.href}/`)) return true;
  return (item.match ?? []).some((m) => path === m || path.startsWith(`${m}/`));
}

/** Human title + optional parent crumb for the top bar. */
export function titleFor(path: string): { title: string; parent?: { label: string; href: string } } {
  const settings = SETTINGS_NAV.find((i) => isActive(i, path));
  if (settings) return { title: settings.label, parent: { label: "Settings", href: "/dashboard/settings" } };
  if (path === "/kr-codes") return { title: "Create a QR code", parent: { label: "QR Codes", href: "/kr-codes/your" } };
  if (/^\/kr-codes\/[^/]+/.test(path) && path !== "/kr-codes/your") return { title: "Code details", parent: { label: "QR Codes", href: "/kr-codes/your" } };
  if (path === "/links/new") return { title: "New short link", parent: { label: "Short Links", href: "/links" } };
  if (/^\/links\/[^/]+\/edit/.test(path)) return { title: "Edit link", parent: { label: "Short Links", href: "/links" } };
  if (/^\/links\/[^/]+/.test(path)) return { title: "Link details", parent: { label: "Short Links", href: "/links" } };
  if (path.startsWith("/k-cards")) return { title: "Card editor", parent: { label: "Kompi Cards", href: "/dashboard/cards" } };
  const item = ALL_NAV.find((i) => isActive(i, path));
  return { title: item?.label ?? "Your workspace" };
}
