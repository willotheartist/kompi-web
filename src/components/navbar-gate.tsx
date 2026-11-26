"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
const paths = ["/", "/pricing", "/qr-code-generator", "/free-qr-code-generator", "/features", "/qr-code", "/blog", "/tools", "/customers", "/solutions", "/legal", "/support", "/demo", "/growth", "/kompi-suite", "/barcode-generator", "/whatsapp-link-generator", "/creator-tools", "/qr-gen-online", "/creator-studio", "/hashtag-generator", "/free-qr-code", "/case-converter-online", "/landing-page-creator"];
export function NavbarGate() { const path = usePathname() || "/"; return paths.some(p => path === p || (p !== "/" && path.startsWith(`${p}/`))) ? <Navbar/> : null; }
