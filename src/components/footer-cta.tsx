import Link from "next/link";
import { appUrl } from "@/lib/urls";
import "./marketing/launch.css";
import "./marketing/site-footer.css";

const columns = [
  { title: "Product", links: [["Kompi Cards", "/features/kompi-cards"], ["QR code generator", "/qr-code-generator"], ["Short links", "/features/url-shortener"], ["Free QR generator", "/free-qr-code-generator"], ["QR menus", "/qr-menus"], ["Kompi Chat", "/chat"], ["Kompi Suite", "/kompi-suite"]] },
  { title: "Made for", links: [["All use cases", "/customers"], ["Creators", "/customers/creators"], ["Small businesses", "/customers/small-business"], ["Brands", "/customers/brands"], ["Agencies", "/customers/agencies"], ["Communities", "/customers/communities"], ["Events", "/customers/events"]] },
  { title: "Tools & resources", links: [["Browse all tools", "/tools"], ["Journal & guides", "/blog"], ["Creator Studio", "/creator-studio"], ["UTM builder", "/tools/utm-builder"], ["Password generator", "/tools/password-generator"], ["Image to PDF", "/tools/image-to-pdf"], ["PDF converter", "/tools/pdf-converter"]] },
  { title: "Kompi", links: [["Pricing", "/pricing"], ["Help & support", "/support"], ["Dashboard", appUrl("/dashboard")], ["Sign in", appUrl("/signin")], ["Create an account", appUrl("/signup")], ["Forgot password", appUrl("/forgot-password")]] },
];

export function FooterCTA({ theme = "light", hideCta = false }: { theme?: "light" | "dark"; hideCta?: boolean }) {
  return <div className={`site-footer-shell ${theme === "dark" ? "site-footer-shell--dark" : "kompi-marketing"}`}>
    {!hideCta && <section className="kompi-cta"><h2>Your next connection<br/>starts <em>right here.</em></h2><a className="kompi-button" href={appUrl("/signup")}>Create your Kompi</a></section>}
    <footer className="site-footer">
      <div className="site-footer-brand"><Link href="/" className="site-footer-wordmark">Kompi<span>.</span></Link><p>Your Cards, QR codes and short links.<br/>All together. All yours.</p></div>
      <nav className="site-footer-columns" aria-label="Footer navigation">{columns.map(column => <div key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>)}</nav>
      <div className="site-footer-bottom"><span>© {new Date().getFullYear()} Kompi · WALL AND 5TH LTD</span><div><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/acceptable-use">Acceptable use</Link></div></div>
      <p className="site-footer-company">Company no. 16573579 · 20 Wenlock Road, London, England, N1 7GU</p>
    </footer>
  </div>;
}
