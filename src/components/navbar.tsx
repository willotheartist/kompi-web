"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { appUrl } from "@/lib/urls";
import "./marketing/launch.css";
export function Navbar() {
 const [open, setOpen] = useState(false);
 const items = [["Kompi Cards", "/features/kompi-cards"], ["QR codes", "/qr-code-generator"], ["Short links", "/features/url-shortener"], ["Pricing", "/pricing"]];
 return <header className="kompi-nav"><div className="kompi-nav-inner"><Link className="kompi-wordmark" href="/" aria-label="Kompi home">Kompi</Link><nav className="kompi-nav-desktop" aria-label="Main navigation">{items.map(([label,url]) => <Link key={url} href={url}>{label}</Link>)}</nav><div className="kompi-nav-actions"><a className="kompi-signin" href={appUrl("/signin")}>Log in</a><a className="kompi-button compact" href={appUrl("/signup")}>Get started <ArrowUpRight size={16}/></a><button className="kompi-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="kompi-mobile-nav" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button></div></div>{open && <nav id="kompi-mobile-nav" className="kompi-mobile-nav" aria-label="Mobile navigation">{items.map(([label,url]) => <Link onClick={() => setOpen(false)} key={url} href={url}>{label}<ArrowUpRight size={18}/></Link>)}<a href={appUrl("/signin")}>Log in<ArrowUpRight size={18}/></a></nav>}</header>;
}
