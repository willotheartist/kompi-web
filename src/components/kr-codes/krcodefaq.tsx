"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Kompi really a free QR code generator?",
    answer:
      "Yes. You can create as many static QR codes as you like with Kompi’s free QR code generator. There are no watermarks and you can download high-resolution PNG files that are ready for print or digital use. Paid plans unlock extras like advanced analytics, branded short links and dynamic QR codes you can edit later.",
  },
  {
    question: "Do Kompi QR codes ever expire?",
    answer:
      "Static QR codes created with the free QR code generator never expire as long as the destination link is live. You can print them on menus, posters, packaging or business cards and keep using them for years. If you need the flexibility to change the link behind a QR code without reprinting, you can upgrade to dynamic QR codes inside Kompi.",
  },
  {
    question: "Can I add my logo and brand colours to a QR code?",
    answer:
      "Absolutely. Kompi lets you generate QR codes with your logo, custom colours and different corner and dot styles. Branded QR codes are easier for people to trust and recognise, especially on menus, flyers or storefront signage. Just upload your logo, choose your brand colour and the generator will keep the code readable while matching your visual identity.",
  },
  {
    question: "Are QR codes from a free generator safe to scan?",
    answer:
      "QR codes themselves are just a visual way to store a link or piece of text. Kompi helps keep things safer by letting you see and edit the destination before you generate the QR code. You can send people to secure HTTPS links, payment pages, booking systems or menu URLs you already trust. We always recommend testing your QR code on a phone before printing it.",
  },
  {
    question: "Can I use Kompi QR codes for commercial projects?",
    answer:
      "Yes. You can use QR codes created with Kompi in client projects, marketing campaigns, product packaging, restaurant menus or any other commercial work. Many small businesses and creators use our free QR code generator to launch campaigns quickly, then move to a paid plan when they need advanced analytics, teams or dynamic QR codes.",
  },
  {
    question: "What file format and quality do I get when I download a QR code?",
    answer:
      "By default, Kompi’s free QR code generator gives you a crisp, high-resolution PNG that works well for screens and small-to-medium print jobs. For larger print runs, posters or signage, you can generate bigger sizes or export vector-friendly formats on paid plans. Either way, your codes are sharp, scannable and ready for design tools like Figma, Canva or Illustrator.",
  },
  {
    question: "Can I track scans from my QR codes?",
    answer:
      "Scan tracking is available when you pair our QR codes with Kompi links or dynamic QR codes. You’ll be able to see how many people scan a code, which campaigns perform best and how traffic moves across your menu or landing pages. For simple, one-off projects, the free QR code generator is often enough. When you’re ready to optimise, Kompi analytics is there.",
  },
];

export function KRCodeFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="relative flex min-h-[130vh] items-center bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8"
      aria-label="Free QR code generator FAQ"
    >
      <motion.div
        layout
        className="mx-auto w-full max-w-4xl space-y-10"
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Header */}
        <div className="space-y-3 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
            FAQ · Free QR code generator
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight text-[#111111] sm:text-4xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Everything you need to know about Kompi QR codes.
          </h2>
        
        </div>

        {/* FAQ list */}
        <div className="divide-y divide-neutral-200/70">
          {FAQ_ITEMS.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.question}
                layout
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="py-5 sm:py-6"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <div className="flex-1 space-y-1">
                    <h3 className="text-base font-medium leading-snug text-[#111111] sm:text-lg">
                      {item.question}
                    </h3>
                  </div>

                  {/* Toggle button */}
                  <motion.div
                    layout
                    className="flex h-10 w-10 items-center justify-center rounded-2xl border text-xs font-semibold"
                    style={{
                      borderColor: isActive ? "#111111" : "#D4D4D4",
                      backgroundColor: isActive ? "#111111" : "#FFFFFF",
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <Plus
                        className="h-4 w-4"
                        style={{
                          color: isActive ? "#F5FF7A" : "#111111",
                          transition: "color 0.25s ease-in-out",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </button>

                {isActive && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 sm:text-[15px]"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default KRCodeFAQ;
