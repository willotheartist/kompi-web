"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Link2,
  Mail,
  MessageSquare,
  Phone,
  MessageCircle,
  Wifi,
  CalendarDays,
  IdCard,
  FileText,
} from "lucide-react";

type QRTypeId =
  | "link"
  | "email"
  | "text"
  | "call"
  | "sms"
  | "whatsapp"
  | "wifi"
  | "event"
  | "vcard";

interface QRTypeDefinition {
  id: QRTypeId;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accentColor: string;
}

const QR_TYPES: QRTypeDefinition[] = [
  {
    id: "link",
    label: "Link QR code",
    description:
      "Send people straight to any website, menu, store or landing page.",
    icon: Link2,
    accentColor: "#111111",
  },
  {
    id: "email",
    label: "Email QR code",
    description:
      "Open a pre-filled email draft so people can contact you in one tap.",
    icon: Mail,
    accentColor: "#F97316",
  },
  {
    id: "text",
    label: "Text QR code",
    description:
      "Show a block of text instantly – notes, disclaimers or short instructions.",
    icon: FileText,
    accentColor: "#0EA5E9",
  },
  {
    id: "call",
    label: "Call QR code",
    description:
      "Start a phone call to your number with a single scan on mobile.",
    icon: Phone,
    accentColor: "#10B981",
  },
  {
    id: "sms",
    label: "SMS QR code",
    description:
      "Open the SMS app with your number and a pre-filled message.",
    icon: MessageSquare,
    accentColor: "#6366F1",
  },
  {
    id: "whatsapp",
    label: "WhatsApp QR code",
    description:
      "Start a WhatsApp conversation with your number in one scan.",
    icon: MessageCircle,
    accentColor: "#22C55E",
  },
  {
    id: "wifi",
    label: "Wi-Fi QR code",
    description:
      "Let guests join your Wi-Fi without typing the network name or password.",
    icon: Wifi,
    accentColor: "#E11D48",
  },
  {
    id: "event",
    label: "Event QR code",
    description:
      "Share event details like date, time and location that people can save.",
    icon: CalendarDays,
    accentColor: "#FACC15",
  },
  {
    id: "vcard",
    label: "vCard QR code",
    description:
      "Save your contact details straight into someone’s address book.",
    icon: IdCard,
    accentColor: "#A855F7",
  },
];

interface KRCodeTypesProps {
  onSelectType?: (typeId: QRTypeId) => void;
}

export function KRCodeTypes({ onSelectType }: KRCodeTypesProps) {
  const handleCreate = (typeId: QRTypeId) => {
    if (!onSelectType) return;
    onSelectType(typeId);
  };

  return (
    <section
      className="relative flex min-h-[120vh] items-center bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8"
      aria-label="QR code types"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        {/* Heading / intro */}
        <div className="max-w-3xl mx-auto space-y-3 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
            QR code types
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight text-[#111111] sm:text-4xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Every kind of QR you need, in one place.
          </h2>
          <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
            Pick a type to start and Kompi handles all the formatting behind the
            scenes.
          </p>
        </div>

        {/* Grid of QR types */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {QR_TYPES.map((type) => (
            <motion.div
              key={type.id}
              className={cn(
                "group flex h-full min-h-[230px] flex-col rounded-[32px] border bg-card/80 px-5 py-5 shadow-sm backdrop-blur-sm transition-all duration-200",
                "hover:-translate-y-1.5 hover:bg-card hover:shadow-xl hover:backdrop-blur-lg"
              )}
              style={{
                borderColor: "var(--color-border)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.04)",
              }}
              whileHover={{ translateY: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              {/* Top content */}
              <div className="flex items-start gap-4 pr-4 sm:pr-8">
                {/* Icon */}
                <div className="flex flex-col items-start gap-2">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-3xl transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: type.accentColor }}
                  >
                    <type.icon
                      className="h-7 w-7 text-white"
                      strokeWidth={2.1}
                    />
                  </div>
                </div>

                {/* Title + description */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold leading-tight tracking-tight text-[#111111]">
                    {type.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {type.description}
                  </p>
                </div>
              </div>

              {/* Bottom bar – button anchored */}
              <div className="mt-auto pt-5">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => handleCreate(type.id)}
                  className="h-9 w-full rounded-full text-sm font-medium transition-transform duration-150 group-hover:translate-y-[1px]"
                  style={{
                    backgroundColor: "#111111",
                    color: "#FFFFFF",
                  }}
                >
                  Create
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KRCodeTypes;
