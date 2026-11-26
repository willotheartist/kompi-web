import { Download, LogOut, Trash2, type LucideIcon } from "lucide-react";
import { SessionControls } from "@/components/settings/session-controls";
import { Rise, Stagger } from "@/components/dashboard/ui";

function Row({ icon: Icon, title, copy, children, danger }: { icon: LucideIcon; title: string; copy: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <Rise as="article" className="flex flex-col gap-5 border-b border-[#EDEEF0] p-6 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <span className={`grid size-11 shrink-0 place-items-center rounded-[12px] ${danger ? "bg-[#FBEFED] text-[#9B3E35]" : "bg-[#F3F4F5] text-[#3C4045]"}`}>
          <Icon size={19} strokeWidth={1.8} />
        </span>
        <div className="max-w-xl">
          <h2 className="text-[16px] font-medium tracking-[-0.02em]">{title}</h2>
          <p className="mt-1 text-[14px] leading-6 text-[#696C72]">{copy}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </Rise>
  );
}

export default function AccountPrivacy() {
  return (
    <Stagger as="section" className="rounded-[16px] border border-[#E3E5E7] bg-white">
      <Row icon={Download} title="Download your account data" copy="Export your profile, workspaces, Cards, QR codes, links and received Card messages as JSON.">
        <a download href="/api/account/export" className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#151619] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#2B2D31]">
          <Download size={16} /> Download data
        </a>
      </Row>
      <Row icon={LogOut} title="Sign out everywhere" copy="Invalidate existing sign-ins, including this one. You will need to sign in again.">
        <SessionControls />
      </Row>
      <Row
        icon={Trash2}
        danger
        title="Delete your account"
        copy="Request permanent removal of your account and content. We verify the request before deleting anything. Public Cards, QR destinations and short links will stop working after deletion. Billing records required by law may be retained."
      >
        <a href="mailto:hello@wallandfifth.com?subject=Kompi%20account%20deletion%20request" className="inline-flex min-h-11 items-center rounded-[10px] border border-[#E9C9C5] px-4 text-[14px] font-medium text-[#9B3E35] transition-colors hover:bg-[#FBEFED]">
          Request deletion
        </a>
      </Row>
    </Stagger>
  );
}
