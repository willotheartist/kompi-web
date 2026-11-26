import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Inbox,
  UserRound,
  Mail,
  Phone,
  Globe2,
  ArrowUpRight,
  MessagesSquare,
  CircleAlert,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

function initials(name: string, fallback = "A") {
  const clean = name.trim();
  if (!clean) return fallback;
  return (
    clean
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("") || fallback
  );
}

function relTime(date: Date | string | null | undefined) {
  if (!date) return "";
  const value = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - value.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function relFull(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function avatarTone(seed: string) {
  const tones = [
    { background: "#C4C8FF", color: "#2D2D66" },
    { background: "#F5E9DE", color: "#8A5A2B" },
    { background: "#E8EEF9", color: "#4B67A8" },
    { background: "#EEE7FA", color: "#7655B7" },
    { background: "#E8F4EC", color: "#3D7B55" },
    { background: "#F8E7EB", color: "#A45467" },
  ];

  let total = 0;
  for (let i = 0; i < seed.length; i += 1) total += seed.charCodeAt(i);
  return tones[total % tones.length];
}

function KCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-[#e4e4e7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

function KCardInner({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function StatusPill({ status }: { status: "OPEN" | "CLOSED" | "LEAD" }) {
  const map = {
    OPEN: "bg-[#EEF1FF] text-[#47568E]",
    CLOSED: "bg-[#F3F4F6] text-[#6B7280]",
    LEAD: "bg-[#EEF8F1] text-[#2D8A52]",
  } as const;

  return (
    <div className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${map[status]}`}>
      {status}
    </div>
  );
}

function MetaChip({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e4e4e7] bg-white px-2.5 py-1 text-[11px] text-[#6f6f78]">
      <Icon className="h-3.5 w-3.5 text-[#8a8a94]" />
      <span className="truncate">{text}</span>
    </div>
  );
}

function TopMetric({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | number;
  tone?: "default" | "green" | "lavender";
}) {
  const toneMap = {
    default: "bg-[#fafafb] border-[#e4e4e7]",
    green: "bg-[#F4FBF6] border-[#DCEFE3]",
    lavender: "bg-[#F5F6FF] border-[#E1E5FF]",
  } as const;

  return (
    <div className={`rounded-[18px] border p-4 ${toneMap[tone]}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
        {label}
      </div>
      <div className="mt-2 text-[26px] font-bold tracking-[-0.05em] text-[#111]">
        {value}
      </div>
    </div>
  );
}

export default async function DashboardChatConversationsPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);

  const widget = workspace
    ? await prisma.chatWidget.findFirst({
        where: { workspaceId: workspace.id },
        select: { id: true, name: true, siteName: true, status: true },
        orderBy: { createdAt: "asc" },
      })
    : null;

  const conversations = widget
    ? await prisma.chatConversation.findMany({
        where: { widgetId: widget.id },
        orderBy: { updatedAt: "desc" },
        take: 100,
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          _count: {
            select: {
              messages: true,
              leads: true,
            },
          },
        },
      })
    : [];

  const leadCount = conversations.filter((c) => c.leadCaptured).length;
  const openCount = conversations.filter((c) => c.status === "OPEN").length;
  const closedCount = conversations.filter((c) => c.status === "CLOSED").length;
  const identifiedCount = conversations.filter(
    (c) => Boolean(c.visitorEmail || c.visitorPhone)
  ).length;

  const latestConversation = conversations[0] ?? null;

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Conversations"
      pageDescription="Review visitor threads, spot lead signals, and drill into the conversations that matter."
    >
      <div className="space-y-[14px]">
        <KCard>
          <KCardInner className="p-4 md:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e7] bg-[#fafafb] px-3 py-1.5 text-[11px] font-semibold text-[#6f6f78]">
                    <Inbox className="h-3.5 w-3.5 text-[#7D88C9]" />
                    Inbox overview
                  </div>

                  {widget ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e7] bg-white px-3 py-1.5 text-[11px] text-[#6f6f78]">
                      <span className="font-semibold text-[#111]">{widget.name}</span>
                      <span className="text-[#b0b0b7]">·</span>
                      <span>{widget.siteName || "No site name set"}</span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 max-w-[760px] text-[13px] leading-6 text-[#6f6f78]">
                  This is your live conversation inbox. Prioritise identified visitors and lead-tagged threads first, then use recurring questions to tighten the widget’s knowledge and fallback quality.
                </div>
              </div>

              <div className="xl:max-w-[360px]">
                <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] px-4 py-3">
                  <div className="flex items-start gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold text-[#111]">
                        Best next move
                      </div>
                      <div className="mt-1 text-[12px] leading-5 text-[#6f6f78]">
                        {leadCount > 0
                          ? `You already have ${leadCount} lead${leadCount === 1 ? "" : "s"} captured. Start there.`
                          : "No lead captured yet. Get the widget installed, tighten the source set, and push for first contact capture."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <TopMetric label="Total conversations" value={conversations.length} tone="lavender" />
              <TopMetric label="Lead captured" value={leadCount} tone="green" />
              <TopMetric label="Identified visitors" value={identifiedCount} />
              <TopMetric label="Open threads" value={openCount} />
            </div>

            {latestConversation ? (
              <div className="mt-4 rounded-[20px] border border-[#e4e4e7] bg-white px-4 py-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                      Latest activity
                    </div>
                    <div className="mt-1 text-[14px] font-semibold text-[#111]">
                      {latestConversation.visitorName || "Anonymous visitor"}
                    </div>
                    <div className="mt-1 truncate text-[12px] text-[#6f6f78]">
                      {latestConversation.messages[0]?.content || "No message content yet."}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <StatusPill status={latestConversation.status} />
                    <div className="rounded-full bg-[#fafafb] px-3 py-1 text-[11px] font-semibold text-[#6f6f78]">
                      {latestConversation._count.messages} msgs
                    </div>
                    <div className="rounded-full bg-[#fafafb] px-3 py-1 text-[11px] text-[#6f6f78]">
                      {relTime(latestConversation.updatedAt)}
                    </div>
                    <Link
                      href={`/dashboard/chat/conversations/${latestConversation.id}`}
                      className="inline-flex items-center gap-1 rounded-full bg-[#C4C8FF] px-3 py-1.5 text-[11px] font-semibold text-[#111]"
                    >
                      Open thread
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </KCardInner>
        </KCard>

        <KCard>
          <KCardInner>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                  All conversations
                </div>
                <div className="text-[11px] text-[#76767e]">
                  Latest activity, captured details, and message volume at a glance.
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#8a8a94]">
                <span>{openCount} open</span>
                <span>·</span>
                <span>{leadCount} leads</span>
                <span>·</span>
                <span>{closedCount} closed</span>
              </div>
            </div>

            {conversations.length === 0 ? (
              <div className="rounded-[20px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-10 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#EEF1FF] text-[#8D9DFF]">
                  <MessagesSquare className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-medium text-[#111]">No conversations yet</div>
                <div className="mt-1 text-[12px] leading-5 text-[#72727c]">
                  Once the widget is installed and live, new visitor threads will appear here.
                </div>

                <div className="mx-auto mt-5 grid max-w-[760px] gap-3 md:grid-cols-3">
                  <div className="rounded-[16px] border border-[#e4e4e7] bg-white px-4 py-3 text-left">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#111]">
                      <CircleAlert className="h-4 w-4 text-[#7D88C9]" />
                      Install the widget
                    </div>
                    <div className="mt-1 text-[12px] leading-5 text-[#6f6f78]">
                      Put the launcher on a real site so traffic can actually reach this inbox.
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-[#e4e4e7] bg-white px-4 py-3 text-left">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#111]">
                      <CircleAlert className="h-4 w-4 text-[#7D88C9]" />
                      Add better sources
                    </div>
                    <div className="mt-1 text-[12px] leading-5 text-[#6f6f78]">
                      Pricing, offers, FAQs, and key business context make replies feel premium.
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-[#e4e4e7] bg-white px-4 py-3 text-left">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#111]">
                      <CircleAlert className="h-4 w-4 text-[#7D88C9]" />
                      Set allowed domains
                    </div>
                    <div className="mt-1 text-[12px] leading-5 text-[#6f6f78]">
                      Domain control makes the widget feel deliberate, safe, and client-ready.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                {conversations.map((conversation) => {
                  const name = conversation.visitorName || "Anonymous visitor";
                  const tone = avatarTone(name);
                  const lastMessage = conversation.messages[0]?.content || "No messages yet.";
                  const detailLine =
                    conversation.visitorEmail ||
                    conversation.visitorPhone ||
                    conversation.domain ||
                    "No captured contact info";

                  return (
                    <Link
                      key={conversation.id}
                      href={`/dashboard/chat/conversations/${conversation.id}`}
                      className="group rounded-[20px] border border-[#ededf0] bg-[#fafafb] p-4 transition hover:border-[#dfe2ea] hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex items-start gap-3">
                          <div
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[12px] font-semibold"
                            style={tone}
                          >
                            {initials(name)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="text-[14px] font-semibold text-[#111]">{name}</div>
                              {conversation.leadCaptured ? (
                                <span className="rounded-full bg-[#EEF8F1] px-2 py-0.5 text-[10px] font-semibold text-[#2D8A52]">
                                  Lead captured
                                </span>
                              ) : null}
                              <StatusPill status={conversation.status} />
                            </div>

                            <div className="mt-1 text-[12px] text-[#76767e]">{detailLine}</div>

                            <div className="mt-3 max-w-[860px] truncate text-[13px] text-[#5f5f69]">
                              {lastMessage}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {conversation.visitorEmail ? (
                                <MetaChip icon={Mail} text={conversation.visitorEmail} />
                              ) : null}

                              {conversation.visitorPhone ? (
                                <MetaChip icon={Phone} text={conversation.visitorPhone} />
                              ) : null}

                              {conversation.domain ? (
                                <MetaChip icon={Globe2} text={conversation.domain} />
                              ) : null}

                              {!conversation.visitorEmail &&
                              !conversation.visitorPhone &&
                              !conversation.domain ? (
                                <MetaChip icon={UserRound} text="Anonymous visitor" />
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-[11px] text-[#9a9aa2]">
                            {relTime(conversation.updatedAt)}
                          </div>
                          <div className="mt-2 rounded-full bg-[#C4C8FF] px-2.5 py-1 text-[10px] font-bold text-[#111]">
                            {conversation._count.messages} msgs
                          </div>
                          <div className="mt-2 text-[11px] text-[#76767e]">
                            Started {relFull(conversation.startedAt)}
                          </div>
                          <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#40528D]">
                            Open thread
                            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </KCardInner>
        </KCard>
      </div>
    </DashboardLayout>
  );
}
