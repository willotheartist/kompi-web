import type { Metadata } from "next";
import PasswordGenerator from "@/components/tools/PasswordGenerator";

export const metadata: Metadata = {
  title: "Free Online Password Generator | Create Strong Passwords | Kompi Tools",
  description:
    "Create strong, random passwords in seconds with Kompi's free password generator. Choose length, symbols, numbers and more to keep your online accounts safer.",
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
    <main className="min-h-screen bg-background">
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 text-sm text-muted-foreground">
            <span className="rounded-full border px-2.5 py-1">
              Kompi Tools · Password generator
            </span>
          </div>

          {/* Tool */}
          <PasswordGenerator variant="public" />

          {/* How it works / benefits */}
          <section className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              How Kompi&apos;s password generator works
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This free online password generator makes it easy to create strong,
              unique passwords for all of your accounts. Slide to choose how many
              characters you want, pick which character types to include, and Kompi
              instantly builds a new password for you.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-4 text-sm">
                <h3 className="font-medium mb-1">1. Choose your length</h3>
                <p className="text-muted-foreground">
                  Use the slider to pick how many characters you want. Longer passwords
                  are harder to guess or brute-force.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-sm">
                <h3 className="font-medium mb-1">2. Pick your characters</h3>
                <p className="text-muted-foreground">
                  Mix uppercase letters, lowercase letters, numbers, and symbols. The
                  more variety, the stronger your password can be.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-sm">
                <h3 className="font-medium mb-1">3. Copy and use it</h3>
                <p className="text-muted-foreground">
                  Tap &ldquo;Copy&ldquo; and paste your new password into the site or
                  app you&apos;re signing up to. That&apos;s it.
                </p>
              </div>
            </div>
          </section>

          {/* Why strong passwords matter */}
          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Why strong passwords matter
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Weak or reused passwords make it easier for attackers to get into your
              accounts. A strong password is long, hard to guess, and unique to each
              site. Kompi&apos;s password generator helps you create these strong
              passwords without having to memorise random strings yourself.
            </p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Use a different password for every important account.</li>
              <li>Aim for at least 12–16 characters, or more for sensitive accounts.</li>
              <li>Avoid personal information such as names, birthdays, or simple words.</li>
              <li>Turn on two-factor authentication (2FA) wherever possible.</li>
            </ul>
          </section>

          {/* Kompi context */}
          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Built by Kompi, made for everyday security
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kompi helps creators and teams share smarter links, QR codes, and digital
              experiences. This password generator is part of our growing set of free
              tools designed to make staying safe online a little easier, without adding
              more complexity to your day.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you already use Kompi, you can add this tool to your dashboard so it&apos;s
              always close by when you&apos;re creating new links, cards, or QR codes.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-12 border-t pt-10">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Password generator FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.question} className="space-y-1">
                  <h3 className="text-sm font-medium">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
