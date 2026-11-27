import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarPlus, Check, Clock, Download, ExternalLink, MapPin, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatBookingTime, formatMoney, readBookingRules } from "@/lib/store";
import { reconcileOrder } from "@/lib/store-server";
import { productLookFromCard } from "@/lib/store-look";
import { AutoRefresh } from "@/components/store/auto-refresh";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your order", robots: { index: false, follow: false } };

type Props = { params: Promise<{ token: string }> };

function gcalUrl(title: string, start: Date, end: Date, details: string, location?: string) {
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${f(start)}/${f(end)}`, details, ...(location ? { location } : {}) });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export default async function OrderPage({ params }: Props) {
  const { token } = await params;
  const found = await prisma.order.findUnique({ where: { accessToken: token }, include: { product: true, workspace: true } });
  if (!found) notFound();
  const order = await reconcileOrder(found);
  const { product } = order;
  const card = await prisma.kCard.findFirst({ where: { workspaceId: order.workspaceId, isPublic: true }, orderBy: { createdAt: "asc" }, select: { slug: true, data: true } });
  const data = (card?.data ?? {}) as { title?: string; avatarDataUrl?: string | null; theme?: unknown };
  const look = productLookFromCard(data.theme);
  const seller = data.title || "the seller";
  const done = order.status === "PAID" || order.status === "FREE";
  const rules = product.type === "BOOKING" ? readBookingRules(product.booking) : null;
  const end = order.bookingEnd ?? (order.bookingStart ? new Date(order.bookingStart.getTime() + (product.durationMin ?? 30) * 60_000) : null);
  const btn = "flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[14px] px-5 text-[15.5px] font-semibold transition-transform active:scale-[0.99]";

  return (
    <main className={`min-h-dvh ${look.bodyFont}`} style={look.background}>
      {order.status === "PENDING" && <AutoRefresh />}
      <div className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-5 py-10" style={{ fontFamily: "var(--font-primary), system-ui, sans-serif" }}>
        {card?.slug && (
          <a href={`/${card.slug}`} className="mb-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white/90 pl-1.5 pr-4 text-[14px] font-medium text-[#151619]">
            {data.avatarDataUrl ? <img src={data.avatarDataUrl} alt="" className="size-8 rounded-full object-cover" /> : <span className="ml-2" />}
            {seller}
          </a>
        )}

        <div className="rounded-[24px] border border-black/5 bg-white p-6 text-[#151619] sm:p-8">
          {done ? (
            <>
              <span className="mb-5 grid size-12 place-items-center rounded-full bg-[#E9F8EF] text-[#12924A]">
                <Check size={24} strokeWidth={2.4} />
              </span>
              <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em]">
                {product.type === "BOOKING" ? "You're booked in" : product.type === "TIP" ? "Thank you!" : "You're all set"}
              </h1>
              <p className="mt-1.5 text-[15.5px] text-[#696C72]">
                {product.title} from {seller}
                {order.amountCents > 0 ? ` · ${formatMoney(order.amountCents, order.currency)}` : ""}
              </p>

              {product.type === "BOOKING" && order.bookingStart && rules && (
                <div className="mt-6 space-y-2.5 rounded-[16px] border border-[#EDEEF0] p-4 text-[15px]">
                  <p className="flex items-start gap-2.5">
                    <Clock size={18} className="mt-0.5 shrink-0 text-[#80858C]" />
                    {formatBookingTime(order.bookingStart, rules.timezone, product.durationMin)}
                  </p>
                  {rules.location && (
                    <p className="flex items-start gap-2.5 break-words">
                      <MapPin size={18} className="mt-0.5 shrink-0 text-[#80858C]" />
                      {rules.location}
                    </p>
                  )}
                </div>
              )}

              {product.thankYouNote && <p className="mt-5 whitespace-pre-line text-[15.5px] leading-relaxed text-[#3C4045]">{product.thankYouNote}</p>}

              <div className="mt-6 grid gap-2.5">
                {(product.type === "DOWNLOAD" || (product.type === "LEAD_MAGNET" && product.fileUrl)) && product.fileUrl && (
                  <a href={`/api/store/download/${order.accessToken}`} className={btn} style={look.button}>
                    <Download size={18} /> Download{product.fileName ? ` ${product.fileName}` : ""}
                  </a>
                )}
                {(product.type === "PAID_LINK" || (product.type === "LEAD_MAGNET" && !product.fileUrl)) && product.accessUrl && (
                  <a href={`/api/store/download/${order.accessToken}`} className={btn} style={look.button} target="_blank" rel="noreferrer">
                    <ExternalLink size={18} /> Open your access
                  </a>
                )}
                {product.type === "BOOKING" && order.bookingStart && end && (
                  <>
                    <a href={gcalUrl(`${product.title} with ${seller}`, order.bookingStart, end, "Booked on Kompi", rules?.location)} target="_blank" rel="noreferrer" className={btn} style={look.button}>
                      <CalendarPlus size={18} /> Add to Google Calendar
                    </a>
                    <a href={`/api/store/ics/${order.accessToken}`} className={`${btn} border border-[#E3E5E7] bg-white text-[#151619]`}>
                      Add to Apple / Outlook calendar
                    </a>
                  </>
                )}
              </div>
              {order.buyerEmail && <p className="mt-5 text-center text-[13px] text-[#80858C]">We’ve emailed this to {order.buyerEmail}. Keep the email: its link is your access.</p>}
            </>
          ) : order.status === "PENDING" ? (
            <>
              <span className="mb-5 block size-10 animate-spin rounded-full border-[3px] border-[#EDEEF0] border-t-[#151619]" />
              <h1 className="text-[26px] font-semibold tracking-[-0.03em]">Confirming your payment…</h1>
              <p className="mt-1.5 text-[15.5px] text-[#696C72]">This usually takes a few seconds. You’ll also get an email once it’s done.</p>
            </>
          ) : order.status === "REFUNDED" ? (
            <>
              <span className="mb-5 grid size-12 place-items-center rounded-full bg-[#F3F4F5] text-[#5A5E65]">
                <RotateCcw size={22} />
              </span>
              <h1 className="text-[26px] font-semibold tracking-[-0.03em]">This order was refunded</h1>
              <p className="mt-1.5 text-[15.5px] text-[#696C72]">Access has ended. Contact {seller} if you think this is a mistake.</p>
            </>
          ) : (
            <>
              <h1 className="text-[26px] font-semibold tracking-[-0.03em]">This checkout expired</h1>
              <p className="mt-1.5 text-[15.5px] text-[#696C72]">You weren’t charged. You can start again any time.</p>
              {card?.slug && (
                <a href={`/${card.slug}/p/${product.slug}`} className={`${btn} mt-6`} style={look.button}>
                  Back to {product.title}
                </a>
              )}
            </>
          )}
        </div>
        <a href="https://kompi.app" className="mx-auto mt-auto pt-10 text-[12.5px] font-medium opacity-70" style={{ color: look.textColor }}>
          Powered by Kompi
        </a>
      </div>
    </main>
  );
}
