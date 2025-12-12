import type { Metadata } from "next";
import Link from "next/link";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Online Password Generator | Create Strong Passwords | Kompi Tools",
  description:
    "Create strong, random passwords in seconds with Kompi's free password generator. Choose length, symbols, numbers and more to keep your online accounts safer.",
  alternates: {
    canonical: "https://kompi.app/tools/password-generator",
  },
};

const faqs = [
  {
    question: "Is the Kompi password generator free to use?",
    answer:
      "Yes. You can use this password generator as many times as you like for free. No account, no signup, and no email required.",
  },
  {
    question: "Are the passwords stored anywhere?",
    answer:
      "No. The passwords are generated in your browser and are not stored or logged by Kompi. Once you close the page or copy a new password, the old one is gone.",
  },
  {
    question: "How long should my password be?",
    answer:
      "For most accounts, 12–16 characters is a good starting point. For more sensitive accounts, such as banking or email, many people prefer 20+ characters.",
  },
  {
    question: "Which character options should I pick?",
    answer:
      "For a stronger password, keep uppercase, lowercase, numbers, and symbols enabled. If a website does not allow symbols, you can disable them here and still keep a long password.",
  },
  {
    question: "Can I use the same password on more than one site?",
    answer:
      "It is much safer to use a different password for every site. That way, if one site is ever breached, your other accounts are still protected.",
  },
  {
    question: "How does Kompi generate my passwords?",
    answer:
      "Kompi uses randomness from your browser to build a password from the character types you choose. Each time you change the length or options, a new password is created instantly.",
  },
  {
    question: "Do I need a password manager as well?",
    answer:
      "A password generator helps you create strong passwords. A password manager helps you store them. Many people use both: Kompi for simple generation and a dedicated manager for long-term storage.",
  },
  {
    question: "Can I generate passwords on mobile?",
    answer:
      "Yes. This page is designed to work on phones, tablets, and desktop browsers, so you can generate secure passwords wherever you are.",
  },
  {
    question: "Does Kompi offer other security tools?",
    answer:
      "Kompi focuses on safer links, QR codes, and digital experiences. Over time, we are adding more simple tools like this password generator to help you stay secure online.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Password Generator",
  url: "https://kompi.app/tools/password-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Create strong, random passwords in seconds with Kompi's free password generator.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicPasswordGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO – text only, centred, tall & airy */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#006B81] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Password generator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              The first{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                free strong password
              </span>{" "}
              generator that feels like a product, not a form.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Slide, click, copy. Kompi creates long, random, unique passwords
              in seconds — right in your browser. No accounts, no ads, no
              dark-pattern popups. Just safer passwords for everything you log
              into.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#password-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Generate a password
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg.white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Runs 100% in your browser
              </div>
              <span>• No login or email required</span>
              <span>• Works on desktop, tablet & mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION – directly under hero, tight spacing */}
      <section
        id="password-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <PasswordGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              CHOOSE YOUR PASSWORD STYLE
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One tool, three ways to lock things down.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Use Kompi as a quick helper, a security upgrade, or the starting
              point for a more disciplined password habit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  QUICK UPGRADE
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Everyday strong
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  12–16 character passwords for email, socials, and everything
                  you log into daily.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Fast, one-click generation</li>
                  <li>• Great for new signups</li>
                  <li>• Easy to paste anywhere</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Generate an everyday password
              </button>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Extra strong
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  18–24 character passwords with mixed symbols for your most
                  important accounts.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Ideal for banking & work logins</li>
                  <li>• Balanced security & usability</li>
                  <li>• Works perfectly with password managers</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg.black">
                Generate an extra-strong password
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  MAX SECURITY
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Paranoid mode
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  24+ characters, full character set. For admin panels, cloud
                  access, and anything you&apos;d really hate to lose.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Long, high-entropy strings</li>
                  <li>• Built for password managers</li>
                  <li>• Perfect for devs & power users</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items.center justify.center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text.white hover:bg-[#034557]">
                Generate a max-security password
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRIGHT STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#E8F739] px-8 py-10 text-center shadow-md sm:px-12">
            <h2 className="text-xl font-semibold text-[#1E2330] sm:text-2xl md:text-3xl">
              Ready to lock down your next login?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              Use Kompi&apos;s free password generator now, then pin it to your
              Kompi dashboard so it&apos;s always one click away.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#password-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg-black"
              >
                Generate a password
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-6 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]"
              >
                Create free Kompi account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PANELS – BIGGER CARDS + VIDEOS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking.tight sm:text-3xl md:text-4xl">
            Staying secure online, made easy
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E3F2FF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR EVERYDAY LIFE
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Fast, safe passwords for the accounts you use every day.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Email, socials, cloud storage, streaming — Kompi makes it easy
                to upgrade old weak passwords and set better ones for new
                accounts from day one.
              </p>
            </div>
            <div className="flex items.center justify.center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <video
                  src="/videos/passgen/password-generator-with-kompi.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#9BDFD1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items.center justify.center sm:order-1">
              <div className="h-56 w-56 overflow.hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <video
                  src="/videos/passgen/password-gen-kompi.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                One generator, countless safer client accounts.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Agencies, studios, and small teams can use Kompi while setting
                up new tools, campaigns, and logins — then store the credentials
                wherever your team prefers.
              </p>
            </div>
          </div>

          {/* Panel 3 – can swap src when you add a 3rd video */}
          <div className="grid gap-10 rounded-3xl bg-[#006B81] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E3F2FF] sm:text-sm">
                FOR BUILDERS & ADMINS
              </p>
              <h3 className="text-2xl font-semibold text-[#E3F2FF] sm:text-3xl">
                Lock down admin areas and internal tools.
              </h3>
              <p className="text-sm leading-relaxed text-[#E3F2FF] sm:text-base">
                Generate extra-long, high-entropy passwords for dashboards,
                servers, databases, and anything else you don&apos;t want
                exposed. Pair it with your favourite password manager for a
                rock-solid setup.
              </p>
            </div>
            <div className="flex items.center justify.center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#0B1220] shadow-md sm:h-80 sm:w-80">
                <video
                  src="/videos/passgen/password-generator-with-kompi.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE TESTIMONIAL ROW */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              ANYWAY, PEOPLE SEEM TO LIKE IT
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tiny tool, big quality-of-life upgrade.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “My new tab for every signup”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “I keep this open next to my email and use it any time I need a
                new password. It&apos;s faster than my browser&apos;s built-in
                generator.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for client setups”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We use Kompi while onboarding new SaaS tools for clients. Strong
                passwords, then straight into our password manager.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Clean, no-nonsense design”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “Love that it doesn&apos;t try to upsell me on a random app. It
                just does the job really well.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid.cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions? We&apos;ve got you.
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually want to know about the Kompi
              password generator. No marketing speak — just straight answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E3F2FF] bg-[#F7F7F3] p-5 text-sm"
              >
                <h3 className="mb-1 text-sm font-medium text-[#1E2330] sm:text-base">
                  {item.question}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global footer CTA */}
      <FooterCTA />

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
