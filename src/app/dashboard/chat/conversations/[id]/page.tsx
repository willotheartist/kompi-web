import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe2,
  User2,
  BadgeInfo,
  MessageSquare,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export const dynamic = "force-dynamic";

function relFull(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

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
    <div className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${map[status]}`}>
      {status}
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-2 break-all text-[13px] text-[#111]">{value}</div>
    </div>
  );
}

export default async function DashboardChatConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);

  if (!workspace) notFound();

  const widget = await prisma.chatWidget.findFirst({
    where: { workspaceId: workspace.id },
    select: { id: true, name: true, siteName: true },
    orderBy: { createdAt: "asc" },
  });

  if (!widget) notFound();

  const conversation = await prisma.chatConversation.findFirst({
    where: {
      id,
      widgetId: widget.id,
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
      leads: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!conversation) notFound();

  const name = conversation.visitorName || "Anonymous visitor";
  const tone = avatarTone(name);
  const userMessages = conversation.messages.filter((m) => m.role === "USER").length;
  const assistantMessages = conversation.messages.filter((m) => m.role === "ASSISTANT").length;

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Conversation detail"
      pageDescription="Review the full thread, visitor identity, and lead quality in one place."
    >
      <div className="space-y-[14px]">
        <KCard>
          <KCardInner>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Link
                  href="/dashboard/chat/conversations"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e4e4e7] bg-white text-[#111] transition hover:bg-[#f8f8fb]"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>

                <div
                  className="grid h-12 w-12 place-items-center rounded-full text-[13px] font-semibold"
                  style={tone}
                >
                  {initials(name)}
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8a94]">
                    Visitor thread
                  </div>
                  <div className="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#111]">
                    {name}
                  </div>
                  <div className="mt-1 text-[12px] text-[#6f6f78]">
                    Started {relFull(conversation.startedAt)} · Updated {relFull(conversation.updatedAt)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={conversation.status} />
                {conversation.leadCaptured ? (
                  <span className="rounded-full bg-[#EEF8F1] px-3 py-1 text-[11px] font-semibold text-[#2D8A52]">
                    Lead captured
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                  Total messages
                </div>
                <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
                  {conversation.messages.length}
                </div>
              </div>

              <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                  Visitor messages
                </div>
                <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
                  {userMessages}
                </div>
              </div>

              <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                  Assistant replies
                </div>
                <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
                  {assistantMessages}
                </div>
              </div>

              <div className="rounded-[18px] border border-[#e4e4e7] bg-[#fafafb] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8a94]">
                  Lead entries
                </div>
                <div className="mt-2 text-[22px] font-bold tracking-[-0.04em] text-[#111]">
                  {conversation.leads.length}
                </div>
              </div>
            </div>
          </KCardInner>
        </KCard>

        <div className="grid gap-[14px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <KCard>
            <KCardInner>
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                    Full conversation
                  </div>
                  <div className="text-[11px] text-[#76767e]">
                    Ordered from first message to latest reply.
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {conversation.messages.map((message) => {
                  const isUser = message.role === "USER";
                  const isAssistant = message.role === "ASSISTANT";
                  const isSystem = message.role === "SYSTEM";

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-[20px] px-4 py-3 text-[13px] leading-6 shadow-[0_4px_14px_rgba(0,0,0,0.03)] ${
                          isUser
                            ? "rounded-tr-[8px] bg-[#C4C8FF] text-[#111]"
                            : isAssistant
                              ? "rounded-tl-[8px] border border-[#e4e4e7] bg-white text-[#111]"
                              : isSystem
                                ? "border border-[#E8E1B8] bg-[#FFFBEA] text-[#6D5A12]"
                                : "border border-[#e4e4e7] bg-[#fafafb] text-[#555]"
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-55">
                            {message.role}
                          </div>
                          <div className="text-[10px] opacity-45">
                            {relFull(message.createdAt)}
                          </div>
                        </div>

                        <div>{message.content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </KCardInner>
          </KCard>

          <div className="grid gap-[14px] self-start">
            <KCard>
              <KCardInner>
                <div className="mb-4 flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1FF] text-[#5568A4]">
                    <User2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                      Visitor details
                    </div>
                    <div className="text-[11px] text-[#76767e]">
                      Captured identity and session context.
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <InfoBlock icon={User2} label="Name" value={name} />
                  <InfoBlock
                    icon={Mail}
                    label="Email"
                    value={conversation.visitorEmail || "Not captured"}
                  />
                  <InfoBlock
                    icon={Phone}
                    label="Phone"
                    value={conversation.visitorPhone || "Not captured"}
                  />
                  <InfoBlock
                    icon={Globe2}
                    label="Domain"
                    value={conversation.domain || "Unknown"}
                  />
                </div>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div className="mb-4 flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF8F1] text-[#2D8A52]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                      Lead summary
                    </div>
                    <div className="text-[11px] text-[#76767e]">
                      Commercial signal and follow-up quality.
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <InfoBlock
                    icon={BadgeInfo}
                    label="Lead captured"
                    value={conversation.leadCaptured ? "Yes" : "No"}
                  />
                  <InfoBlock
                    icon={MessageSquare}
                    label="Lead entries"
                    value={String(conversation.leads.length)}
                  />
                  <InfoBlock
                    icon={Clock3}
                    label="Started"
                    value={relFull(conversation.startedAt)}
                  />
                  <InfoBlock
                    icon={BadgeInfo}
                    label="Widget"
                    value={widget.siteName ? `${widget.name} · ${widget.siteName}` : widget.name}
                  />
                </div>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div className="mb-4 text-[14px] font-bold tracking-[-0.02em] text-[#111]">
                  Review notes
                </div>

                <div className="grid gap-3">
                  {[
                    conversation.leadCaptured
                      ? "This thread already contains captured contact data."
                      : "No contact data captured yet in this thread.",
                    conversation.messages.length > 4
                      ? "This was a longer conversation and may reveal good source gaps."
                      : "This was a short interaction — good for quick triage.",
                    "Use repeated user questions here to improve FAQ and text sources.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[16px] border border-[#e4e4e7] bg-[#fafafb] px-4 py-3 text-[13px] leading-6 text-[#111]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </KCardInner>
            </KCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
