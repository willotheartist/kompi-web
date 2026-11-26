"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { appUrl } from "@/lib/urls";
import { TOOL_DEFINITIONS } from "@/lib/tools-config";
import "./marketing/launch.css";
import "./marketing/navigation.css";

const products = [
  ["Kompi Cards", "/features/kompi-cards", "One page for your links and contact details."],
  ["QR codes", "/qr-code-generator", "Create a code that belongs to your brand."],
  ["Short links", "/features/url-shortener", "Memorable links. Editable destinations."],
];
const resources = [
  ["Journal & guides", "/blog"], ["All tools", "/tools"],
  ["Kompi Suite", "/kompi-suite"], ["Creator tools", "/creator-tools"],
  ["Creator Studio", "/creator-studio"], ["Help & support", "/support"],
];
const customers = [
  ["Creators", "/customers/creators"], ["Small businesses", "/customers/small-business"],
  ["Agencies", "/customers/agencies"], ["Brands", "/customers/brands"],
  ["Communities", "/customers/communities"], ["Events", "/customers/events"],
];

export function Navbar() {
  const pathname = usePathname();
  const cinematic = pathname === "/";
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(null); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  const close = () => setOpen(null);
  const toggle = (name: string, button: HTMLButtonElement) => {
    trigger.current = button;
    setOpen(current => current === name ? null : name);
  };

  return (
    <header ref={header} className={`kompi-nav restored-nav ${cinematic ? "restored-nav--cinematic" : ""} ${scrolled || open ? "restored-nav--solid" : ""}`}>
      <div className="kompi-nav-inner">
        <Link className="kompi-wordmark" href="/" aria-label="Kompi home" onClick={close}>Kompi<span>.</span></Link>
        <nav className="restored-nav-desktop" aria-label="Main navigation">
          {["Products", "Tools", "Explore"].map(label => (
            <button key={label} type="button" aria-expanded={open === label} aria-controls={`nav-${label.toLowerCase()}`} onClick={e => toggle(label, e.currentTarget)}>
              {label}<ChevronDown size={14} className={open === label ? "rotated" : ""}/>
            </button>
          ))}
          <Link href="/pricing" onClick={close}>Pricing</Link>
        </nav>
        <div className="kompi-nav-actions">
          <a className="kompi-signin" href={appUrl("/signin")}>Sign in</a>
          <a className="restored-nav-cta" href={appUrl("/signup")}>Try Kompi</a>
          <button className="restored-nav-mobile-toggle" aria-label={open === "mobile" ? "Close menu" : "Open menu"} aria-expanded={open === "mobile"} aria-controls="nav-mobile" onClick={e => toggle("mobile", e.currentTarget)}>{open === "mobile" ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </div>
      {open === "Products" && <nav id="nav-products" className="restored-nav-panel" aria-label="Products">
        <div className="restored-product-links">{products.map(([label, href, description]) => <Link href={href} key={href} onClick={close}><strong>{label}</strong><span>{description}</span></Link>)}</div>
        <div className="restored-nav-secondary"><span>More from Kompi</span><Link href="/free-qr-code-generator" onClick={close}>Free QR generator</Link><Link href="/qr-menus" onClick={close}>QR menus</Link><Link href="/chat" onClick={close}>Kompi Chat</Link><Link href="/kompi-suite" onClick={close}>Kompi Suite</Link></div>
      </nav>}
      {open === "Tools" && <nav id="nav-tools" className="restored-nav-panel" aria-label="Tools">
        <div className="restored-nav-panel-heading"><div><strong>Your everyday toolkit.</strong><p>All your existing tools, in one place.</p></div><Link href="/tools" onClick={close}>Browse all tools</Link></div>
        <div className="restored-tool-links">{TOOL_DEFINITIONS.filter(tool => tool.status === "available").map(tool => <Link href={tool.publicPath} key={tool.id} onClick={close}>{tool.name}</Link>)}</div>
      </nav>}
      {open === "Explore" && <nav id="nav-explore" className="restored-nav-panel restored-explore-panel" aria-label="Explore Kompi">
        <div><p className="restored-nav-label">Resources</p>{resources.map(([label, href]) => <Link href={href} key={href} onClick={close}>{label}</Link>)}</div>
        <div><p className="restored-nav-label">Made for you</p>{customers.map(([label, href]) => <Link href={href} key={href} onClick={close}>{label}</Link>)}</div>
        <div><p className="restored-nav-label">QR code guides</p>{[["Dynamic QR codes", "/qr-code/dynamic"], ["Static QR codes", "/qr-code/static"], ["QR codes with a logo", "/qr-code/with-logo"], ["Restaurant QR codes", "/qr-code/for-restaurant"], ["Email QR codes", "/qr-code/email"]].map(([label, href]) => <Link href={href} key={href} onClick={close}>{label}</Link>)}</div>
      </nav>}
      {open === "mobile" && <nav id="nav-mobile" className="restored-mobile-panel" aria-label="Mobile navigation">
        {products.map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}</Link>)}
        <Link href="/pricing" onClick={close}>Pricing</Link>
        <details><summary>Tools<ChevronDown size={16}/></summary>{TOOL_DEFINITIONS.filter(tool => tool.status === "available").map(tool => <Link key={tool.id} href={tool.publicPath} onClick={close}>{tool.name}</Link>)}<Link href="/tools" onClick={close}>Browse all tools</Link></details>
        <details><summary>Explore<ChevronDown size={16}/></summary>{[...resources, ...customers, ["QR menus", "/qr-menus"], ["Kompi Chat", "/chat"]].map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}</Link>)}</details>
        <a href={appUrl("/signin")}>Sign in</a>
      </nav>}
    </header>
  );
}
