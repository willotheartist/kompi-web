"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, IdCard, Inbox, Loader2, Pencil, Plus } from "lucide-react";
import { DeleteCardButton } from "@/components/k-cards/delete-card-button";
import { useCreate } from "../shell/create-actions";
import { EASE, EmptyState, Meter, PageHeader, Rise, Stagger, buttonStyles } from "../ui";
import { CopyButton, StatusDot } from "../overview/overview-client";

type CardItem = {
  id: string;
  title: string;
  subtitle: string;
  avatar: string | null;
  slug: string | null;
  published: boolean;
  publicUrl: string | null;
  updatedAt: string;
  views: number;
  messages: number;
};

const CANVASES = [
  { bg: "#FBE4FA", ink: "#7A2D78" },
  { bg: "#E7F0EA", ink: "#2F5D45" },
  { bg: "#E6ECFA", ink: "#2D3F7A" },
  { bg: "#F6EEDF", ink: "#7A5427" },
];

function edited(iso: string) {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 864e5);
  if (days < 1) return "Edited today";
  if (days === 1) return "Edited yesterday";
  if (days < 7) return `Edited ${days} days ago`;
  return `Edited ${d.toLocaleDateString(undefined, { day: "numeric", month: "short" })}`;
}

export function CardsClient({ cards, workspaceId, limit, planName }: { cards: CardItem[]; workspaceId?: string; limit: number; planName: string }) {
  const { create, busy } = useCreate();
  const full = cards.length >= limit;
  const newButton = (
    <button onClick={() => void create("card", workspaceId)} disabled={busy !== null || full} className={buttonStyles.primary} title={full ? "Your plan’s Card limit is reached" : undefined}>
      {busy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} {busy ? "Creating…" : "New Card"}
    </button>
  );

  return (
    <div>
      <PageHeader
        eyebrow="Kompi Cards"
        icon={IdCard}
        title="A Card that feels like you."
        description="Your links, socials and contact details at one memorable address."
        actions={
          <>
            <div className="hidden min-w-[180px] sm:block">
              <div className="mb-1.5 flex justify-between text-[12px] text-[#80858C]">
                <span>{planName} plan</span>
                <span className="tabular-nums">
                  {cards.length} / {limit} Cards
                </span>
              </div>
              <Meter used={cards.length} max={limit} />
            </div>
            {full ? (
              <Link href="/dashboard/settings/billing" className={buttonStyles.secondary}>
                Upgrade for more
              </Link>
            ) : null}
            {newButton}
          </>
        }
      />

      {!cards.length ? (
        <EmptyState icon={IdCard} title="Your first connection starts here." action={newButton}>
          Put your links, social profiles and contact details in one shareable Card. Visitors can message you straight from it.
        </EmptyState>
      ) : (
        <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, i) => (
            <Rise key={card.id} as="article">
              <CardTile card={card} canvas={CANVASES[i % CANVASES.length]} />
            </Rise>
          ))}
          {!full && (
            <Rise>
              <button
                onClick={() => void create("card", workspaceId)}
                disabled={busy !== null}
                className="group flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-3 rounded-[16px] border border-dashed border-[#D6D9DE] bg-transparent text-[#80858C] transition-colors hover:border-[#151619] hover:bg-white hover:text-[#151619]"
              >
                <span className="grid size-12 place-items-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-90">
                  {busy ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                </span>
                <span className="text-[15px] font-medium">New Card</span>
                <span className="text-[13px]">
                  {limit - cards.length} of {limit} left on {planName}
                </span>
              </button>
            </Rise>
          )}
        </Stagger>
      )}
    </div>
  );
}

function CardTile({ card, canvas }: { card: CardItem; canvas: (typeof CANVASES)[number] }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#E3E5E7] bg-white transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#CDD1D7]">
      <Link href={`/k-cards?cardId=${card.id}`} className="relative block h-[196px] overflow-hidden" style={{ background: canvas.bg }} aria-label={`Edit ${card.title}`}>
        {/* Miniature of the public Card */}
        <motion.div
          className="absolute left-1/2 top-6 w-[176px] -translate-x-1/2 rounded-[18px] border border-black/5 bg-white px-4 pb-6 pt-5 text-center transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 group-hover:rotate-[-2deg]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <span className="mx-auto grid size-12 place-items-center overflow-hidden rounded-full text-[18px] font-medium" style={{ background: canvas.bg, color: canvas.ink }}>
            {card.avatar ? <img src={card.avatar} alt="" className="h-full w-full object-cover" /> : card.title.slice(0, 1).toUpperCase()}
          </span>
          <p className="mt-2.5 truncate text-[13px] font-medium text-[#151619]">{card.title}</p>
          <p className="mt-0.5 truncate text-[11px] text-[#80858C]">{card.subtitle || "Make it yours."}</p>
          <div className="mt-3 space-y-1.5">
            <span className="block h-5 rounded-full" style={{ background: canvas.bg }} />
            <span className="block h-5 rounded-full bg-[#F1F2F4]" />
            <span className="block h-5 rounded-full bg-[#F1F2F4]" />
          </div>
        </motion.div>
        <span className="absolute right-3 top-3">
          <StatusDot on={card.published} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[17px] font-medium tracking-[-0.025em]">{card.title}</h2>
            <p className="mt-0.5 truncate text-[13px] text-[#80858C]">{card.slug ? `kompi.app/${card.slug}` : "Choose your public address"}</p>
          </div>
          {card.publicUrl && <CopyButton value={card.publicUrl} label="Copy Card address" />}
        </div>

        <div className="mt-4 flex items-center gap-4 text-[13px] text-[#5A5E65]">
          <span className="flex items-center gap-1.5" title="Views in the last 30 days">
            <Eye size={15} className="text-[#A2A6AC]" />
            <span className="font-medium tabular-nums text-[#151619]">{card.views.toLocaleString()}</span> views
          </span>
          <Link href="/messages" className="flex items-center gap-1.5 hover:text-[#151619]" title="Messages received">
            <Inbox size={15} className="text-[#A2A6AC]" />
            <span className="font-medium tabular-nums text-[#151619]">{card.messages.toLocaleString()}</span> messages
          </Link>
          <span className="ml-auto hidden text-[12px] text-[#A2A6AC] sm:inline">{edited(card.updatedAt)}</span>
        </div>

        <div className="mt-5 flex items-center gap-1.5 border-t border-[#EDEEF0] pt-4">
          <Link href={`/k-cards?cardId=${card.id}`} className={`${buttonStyles.primary} min-h-10 flex-1`}>
            <Pencil size={15} /> Edit Card
          </Link>
          {card.publicUrl && (
            <a href={card.publicUrl} target="_blank" rel="noreferrer" className={`${buttonStyles.secondary} min-h-10 px-3`} title="Open public Card">
              <ArrowUpRight size={16} /> View
            </a>
          )}
          <DeleteCardButton cardId={card.id} title={card.title} />
        </div>
      </div>
    </div>
  );
}
