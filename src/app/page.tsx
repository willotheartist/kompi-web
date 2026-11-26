import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Onest } from "next/font/google";
import QRCode from "react-qr-code";
import { Check, ChevronDown, CreditCard, QrCode, Link2, MousePointer2, SlidersHorizontal, Download, BarChart3, Globe2, Plus, Mail, Instagram } from "lucide-react";
import { FooterCTA } from "@/components/footer-cta";
import { HomeMotion } from "@/components/marketing/home-motion";
import { appUrl } from "@/lib/urls";
import { PLANS, PLAN_LIMITS } from "@/lib/plan-limits";
import "@/components/marketing/home.css";
import "@/components/marketing/home-effects.css";

const homeFont = Onest({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
export const metadata: Metadata = {
  title: { absolute: "Kompi — Cards, QR Codes & Short Links" },
  description: "Your world, beautifully connected. Create a Kompi Card, design a QR code and shorten your links, all in one place.",
  alternates: { canonical: "https://kompi.app" },
};
const faqs = [
  ["What can I make with Kompi?", "Create a Kompi Card for your links and contact details, design and save QR codes, and turn long URLs into short links. Manage everything from your dashboard."],
  ["Can I start for free?", "Yes. Free includes one Kompi Card, five saved QR codes and twenty short links. You can also generate a direct QR code without an account. No card details needed."],
  ["Can I change a QR destination after printing?", "Yes, if you create a saved dynamic QR code. Update its destination in your dashboard and keep using the same printed code. A direct QR code stores its content in the image, so changing that content requires a new code."],
  ["What can I see in my analytics?", "See visits through your short links and dynamic QR destinations, plus views of your public Kompi Cards. A destination visit may come from a scan or a shared link; it is not a unique-person count."],
  ["Where can I find more Kompi tools?", "Open Tools in the menu for the complete collection, and Explore for guides, customer pages, Creator Studio and Kompi Suite."],
  ["Can I cancel my subscription?", "You can manage or cancel your subscription through the billing portal in Settings. Your current paid plan remains available until the end of its billing period."],
];

function CardDemo() {
  return <div className="nh-card-demo"><Image src="/faces/face79.png" alt="Illustrative profile portrait" width={64} height={64}/><strong>Alex Morgan</strong><p>Good ideas. Better connections.</p><div>My latest work<Globe2 size={14}/></div><div>Let’s make something<Mail size={14}/></div><div>Life, lately<Instagram size={14}/></div><small>kompi.app/k/alex</small></div>;
}
function QrDemo() {
  return <div className="nh-qr-demo"><div className="nh-qr-window"><QRCode value="https://kompi.app" size={152} bgColor="#f9d6f2" fgColor="#242432"/><span className="nh-scan-line" aria-hidden="true"/></div><p>A little scan.<br/>A new connection.</p></div>;
}
function LinkDemo() {
  return <div className="nh-link-demo"><span><Link2 size={17}/> Your next big thing</span><div><span>kompi.app/r/your-world</span><Check size={16}/></div><p><span>Destination</span>yourbrand.com/next-big-thing</p><div className="nh-link-signal"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><small>Illustrative link preview</small></div>;
}

export default function Home() {
  return <div className={`nh ${homeFont.className}`}>
    <HomeMotion/>
    <main>
      <section className="nh-hero" id="hero">
        <Image className="nh-landscape" src="/home/kompi-connections.png" alt="Two pink sculptural links connected on a dark volcanic coastline" fill priority sizes="100vw" quality={90}/>
        <div className="nh-hero-shade"/>
        <div className="nh-hero-copy">
          <h1 aria-label="A little link. A bigger world."><span className="nh-title-line" aria-hidden="true"><span>A little link.</span></span><span className="nh-title-line" aria-hidden="true"><span>A bigger world.</span></span></h1>
          <p>Your Cards, QR codes and short links.<br className="nh-desktop-break"/> Everything you share, beautifully connected.</p>
          <a className="nh-button" href={appUrl("/signup")}>Start for free</a>
          <span className="nh-hero-note">No card details needed.</span>
        </div>
        <a href="#products" className="nh-scroll">Scroll to discover<ChevronDown size={19}/></a>
      </section>

      <section className="nh-intro nh-wrap" data-home-reveal>
        <p className="nh-kicker">MADE FOR YOUR NEXT CONNECTION</p>
        <h2 className="nh-scroll-ink" data-home-ink><span>Your world deserves</span><br/><span>a better way to be shared.</span></h2>
        <div className="nh-intro-grid">
          <div><CreditCard size={23} strokeWidth={1.4}/><h3>Everything you.</h3><p>Your work, your links, your details.<br/>One Kompi Card brings it all together.</p></div>
          <div><QrCode size={23} strokeWidth={1.4}/><h3>One simple scan.</h3><p>From something you can hold<br/>to somewhere worth exploring.</p></div>
          <div><Link2 size={23} strokeWidth={1.4}/><h3>A shorter way there.</h3><p>Give a long URL a memorable home.<br/>Keep every destination in reach.</p></div>
        </div>
      </section>

      <section id="products" className="nh-section nh-wrap">
        <div className="nh-section-heading" data-home-reveal><p className="nh-kicker">THREE WAYS TO CONNECT</p><h2>Small details.<br/><span>Bigger possibilities.</span></h2></div>
        <div className="nh-product-grid">
          <article className="nh-product" data-home-reveal data-home-animate data-home-tilt><div className="nh-product-art nh-art-card"><div className="nh-art-orbit" aria-hidden="true"/><div className="nh-object-motion"><CardDemo/></div></div><div className="nh-product-copy"><h3>Your own corner of the internet.</h3><p>A beautiful home for your links, your work and the details that make you, you.</p><Link href="/features/kompi-cards">Explore Kompi Cards</Link></div></article>
          <article className="nh-product" data-home-reveal data-home-animate data-home-tilt><div className="nh-product-art nh-art-qr"><div className="nh-art-orbit" aria-hidden="true"/><div className="nh-object-motion"><QrDemo/></div></div><div className="nh-product-copy"><h3>Make the real world clickable.</h3><p>On a business card, a package or your next big idea. Turn a moment into a connection.</p><Link href="/qr-code-generator">Explore QR codes</Link></div></article>
          <article className="nh-product" data-home-reveal data-home-animate data-home-tilt><div className="nh-product-art nh-art-link"><div className="nh-art-orbit" aria-hidden="true"/><div className="nh-object-motion"><LinkDemo/></div></div><div className="nh-product-copy"><h3>Less link. More possibility.</h3><p>Make your links easy to share, simple to update and a little more you.</p><Link href="/features/url-shortener">Explore short links</Link></div></article>
        </div>
        <p className="nh-example-note">Product previews are illustrative. Make yours in Kompi.</p>
      </section>

      <section className="nh-section nh-wrap" id="features">
        <div className="nh-section-heading nh-centered" data-home-reveal><p className="nh-kicker">BUILT TO STAY CONNECTED</p><h2>Share once.<br/><span>Keep making it yours.</span></h2></div>
        <div className="nh-feature-row" data-home-reveal>
          <div className="nh-feature-visual nh-editor-visual" data-home-animate data-home-tilt><div className="nh-editor-top"><span>My Kompi Card</span><span>Preview</span></div><div className="nh-editor-body"><div className="nh-editor-controls"><p>Make it yours</p><span>Background</span><div className="nh-swatches"><i/><i/><i/><i/></div><span>Your links</span><div className="nh-editor-field">My latest work<Globe2 size={15}/></div><div className="nh-editor-field">Say hello<Mail size={15}/></div><div className="nh-editor-add"><Plus size={15}/> Add a link</div></div><CardDemo/></div></div>
          <div className="nh-feature-copy"><SlidersHorizontal size={25} strokeWidth={1.3}/><h3>Your style.<br/>Down to the last detail.</h3><p>Pick a look, add your links and make room for what matters. Your Kompi Card gives everything you share a place to belong.</p><Link className="nh-button nh-button-outline" href="/features/kompi-cards">Find your look</Link></div>
        </div>
        <div className="nh-feature-row nh-feature-reverse" data-home-reveal>
          <div className="nh-feature-visual nh-destination-visual" data-home-animate data-home-tilt><div className="nh-destination-orbits" aria-hidden="true"><span/><span/></div><div className="nh-destination-panel"><div><QrCode size={23}/><span>One code. A new destination.</span></div><label>Destination</label><p className="nh-changing-url"><span>yourbrand.com/something-new</span></p><span className="nh-saved"><Check size={15}/> Same QR code. Updated link.</span></div><div className="nh-floating-qr"><QRCode value="https://kompi.app" size={90} fgColor="#111623" bgColor="#f2d5eb"/></div></div>
          <div className="nh-feature-copy"><QrCode size={25} strokeWidth={1.3}/><h3>Plans change.<br/>Your printed code doesn’t.</h3><p>Update the destination of a saved dynamic QR code whenever you need to. The code on your print stays the same. The possibilities keep moving.</p><Link className="nh-button nh-button-outline" href="/qr-code/dynamic">Meet dynamic QR codes</Link></div>
        </div>
      </section>

      <section className="nh-section nh-wrap" data-home-reveal>
        <div className="nh-world" data-home-parallax><Image src="/home/kompi-connections.png" alt="Pink interconnected sculptures reflected in a coastal tide pool" fill sizes="100vw"/><div><p className="nh-kicker">ONLINE. OFFLINE. EVERYWHERE.</p><h2>From your bio<br/>to the real world.</h2><p>On your profile. In a message. On the back of a card.<br/>Wherever you show up, make the connection yours.</p><a className="nh-button" href={appUrl("/signup")}>Create your Kompi</a></div></div>
        <div className="nh-benefit-grid">{[
          [CreditCard, "A home for your links", "Bring your projects, profiles and contact details together."],
          [QrCode, "QR codes with personality", "Choose your colours, shapes and logo in the QR studio."],
          [Link2, "Links you can update", "Change a destination without changing the link you shared."],
          [Download, "Ready to print", "Download crisp QR artwork for screens and physical projects."],
          [BarChart3, "See what connects", "Check your Card views and destination visits in one dashboard."],
          [MousePointer2, "Always within reach", "Create and manage your content in a desktop or mobile browser."],
        ].map(([Icon, title, copy]) => { const FeatureIcon = Icon as typeof CreditCard; return <div key={String(title)} data-home-reveal><FeatureIcon size={22} strokeWidth={1.4}/><h3>{String(title)}</h3><p>{String(copy)}</p></div>; })}</div>
      </section>

      <section id="pricing" className="nh-section nh-wrap">
        <div className="nh-section-heading nh-centered" data-home-reveal><p className="nh-kicker">ROOM TO GROW</p><h2>Start with a little.<br/><span>Make it something bigger.</span></h2><p>Start free. Choose more room when you need it.</p></div>
        <div className="nh-pricing">{PLANS.filter(plan => plan.id !== "FREE").map(plan => <article key={plan.id} data-home-reveal data-home-tilt className={plan.id === "CREATOR" ? "nh-plan nh-plan-featured" : "nh-plan"}><div className="nh-plan-name"><h3>{plan.name}</h3>{plan.id === "CREATOR" && <span>MORE ROOM</span>}</div><p className="nh-price">£{plan.price.toFixed(2)}<span>/ month</span></p><p className="nh-plan-description">{plan.description}</p><a href={appUrl(`/signup?plan=${plan.id}`)} className={`nh-button ${plan.id === "CREATOR" ? "" : "nh-button-outline"}`}>Get {plan.name}</a><ul>{[`${PLAN_LIMITS[plan.id].kCards} Kompi Cards`, `${PLAN_LIMITS[plan.id].krCodes.toLocaleString("en-GB")} saved QR codes`, `${PLAN_LIMITS[plan.id].links.toLocaleString("en-GB")} short links`, "Card views and link visit analytics", "Editable dynamic destinations"].map(item => <li key={item}><Check size={15}/>{item}</li>)}</ul></article>)}</div>
        <div className="nh-free-plan" data-home-reveal><span><strong>Just getting started?</strong> Free includes 1 Card, 5 saved QR codes and 20 short links.</span><Link href="/pricing">Compare all plans</Link></div>
      </section>

      <section id="faq" className="nh-section nh-wrap nh-faq-section" data-home-reveal>
        <div className="nh-section-heading"><p className="nh-kicker">GOOD TO KNOW</p><h2>A few questions.<br/><span>Clear answers.</span></h2><p>Need a hand? <Link href="/support">We’re here to help.</Link></p></div>
        <div className="nh-faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19}/></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="nh-section nh-wrap nh-explore" data-home-reveal><div><p className="nh-kicker">THERE’S MORE TO EXPLORE</p><h2>A little help<br/><span>goes a long way.</span></h2></div><div><Link href="/tools"><span>Everyday tools</span><p>Generators, converters and useful little shortcuts.</p></Link><Link href="/customers"><span>Made for your world</span><p>Find ideas for your business, your brand or your next event.</p></Link><Link href="/blog"><span>The Kompi journal</span><p>Guides to sharing better, online and off.</p></Link></div></section>
      <section className="nh-final" data-home-reveal data-home-parallax><Image src="/home/kompi-connections.png" alt="" fill sizes="100vw"/><div><h2>Your next connection<br/>starts here.</h2><p>Make something worth sharing.</p><a href={appUrl("/signup")} className="nh-button">Start for free</a></div></section>
    </main>
    <FooterCTA theme="dark" hideCta/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "Kompi", url: "https://kompi.app", description: "Kompi Cards, QR codes and short links in one workspace." }) }}/>
  </div>;
}
