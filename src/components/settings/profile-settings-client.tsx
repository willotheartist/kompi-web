"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Check, Loader2, Lock } from "lucide-react";
import { Bone } from "@/components/dashboard/skeletons";

type Profile = { name: string; email: string; image: string | null };

export function ProfileSettingsClient() {
  const { update } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState<Profile | null>(null);
  const [busy, setBusy] = useState<"save" | "upload" | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings/profile")
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw Error(d.error);
        const p = { ...d, name: d.name || "" };
        setProfile(p);
        setSaved(p);
      })
      .catch(() => setMessage({ ok: false, text: "Unable to load your profile. Refresh to try again." }));
  }, []);

  useEffect(() => {
    if (!message?.ok) return;
    const t = setTimeout(() => setMessage(null), 2600);
    return () => clearTimeout(t);
  }, [message]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setBusy("save");
    setMessage(null);
    try {
      const r = await fetch("/api/settings/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: profile.name }) });
      const d = await r.json();
      if (!r.ok) throw Error(d.error);
      await update();
      setSaved(profile);
      setMessage({ ok: true, text: "Profile saved." });
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : "Unable to save." });
    } finally {
      setBusy(null);
    }
  }

  async function upload(f?: File) {
    if (!f) return;
    setBusy("upload");
    setMessage(null);
    try {
      const form = new FormData();
      form.append("file", f);
      const r = await fetch("/api/settings/profile/avatar", { method: "POST", body: form });
      const d = await r.json();
      if (!r.ok) throw Error(d.error);
      setProfile((p) => (p ? { ...p, image: d.image } : p));
      setSaved((p) => (p ? { ...p, image: d.image } : p));
      await update();
      setMessage({ ok: true, text: "Profile photo saved." });
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : "Unable to upload." });
    } finally {
      setBusy(null);
      if (file.current) file.current.value = "";
    }
  }

  const dirty = profile && saved && profile.name !== saved.name;

  return (
    <section className="max-w-2xl">
      {!profile ? (
        <div className="space-y-5 rounded-[16px] border border-[#E3E5E7] bg-white p-6" aria-busy>
          <div className="flex items-center gap-5">
            <Bone className="size-20 rounded-full" />
            <div className="space-y-2">
              <Bone className="h-4 w-40" />
              <Bone className="h-3 w-56" />
            </div>
          </div>
          <Bone className="h-12 w-full rounded-[10px]" />
          <Bone className="h-12 w-full rounded-[10px]" />
        </div>
      ) : (
        <motion.form initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} onSubmit={save} className="rounded-[16px] border border-[#E3E5E7] bg-white">
          <div className="flex items-center gap-5 border-b border-[#EDEEF0] p-6">
            <button type="button" onClick={() => file.current?.click()} disabled={busy !== null} className="group relative size-20 shrink-0 overflow-hidden rounded-full border border-[#E3E5E7]" aria-label="Change profile photo">
              {profile.image ? (
                <img src={profile.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="grid h-full w-full place-items-center bg-[#FBE4FA] text-[30px] font-medium">{profile.name[0]?.toUpperCase() || "K"}</span>
              )}
              <span className="absolute inset-0 grid place-items-center bg-[#151619]/45 text-white opacity-0 transition-opacity group-hover:opacity-100">
                {busy === "upload" ? <Loader2 size={20} className="animate-spin" /> : <Camera size={20} />}
              </span>
            </button>
            <div>
              <p className="text-[16px] font-medium tracking-[-0.02em]">{profile.name || "Your name"}</p>
              <p className="mt-0.5 text-[13px] text-[#80858C]">PNG, JPG, WebP or GIF, up to 3 MB.</p>
              <button type="button" onClick={() => file.current?.click()} disabled={busy !== null} className="mt-2 text-[14px] font-medium hover:underline hover:underline-offset-4">
                {busy === "upload" ? "Uploading…" : "Change photo"}
              </button>
              <input ref={file} className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={busy !== null} onChange={(e) => upload(e.target.files?.[0])} />
            </div>
          </div>
          <div className="space-y-5 p-6">
            <label className="block text-[14px] font-medium">
              Name
              <input
                required
                maxLength={100}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-2 block min-h-12 w-full rounded-[10px] border border-[#D9DCE0] px-4 text-[16px] font-normal outline-none transition-colors focus:border-[#56595F]"
              />
            </label>
            <label className="block text-[14px] font-medium">
              Sign-in email
              <span className="mt-2 flex min-h-12 items-center gap-2 rounded-[10px] border border-[#E3E5E7] bg-[#FAFAFB] px-4 text-[16px] font-normal text-[#696C72]">
                <Lock size={15} className="text-[#A2A6AC]" />
                <input readOnly value={profile.email} className="flex-1 bg-transparent outline-none" />
              </span>
              <span className="mt-2 block text-[13px] font-normal text-[#80858C]">Contact support if you need to change your sign-in email. Public Card details are edited in each Card.</span>
            </label>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[#EDEEF0] px-6 py-4">
            <AnimatePresence mode="wait">
              {message ? (
                <motion.p key={message.text} role="status" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`flex items-center gap-1.5 text-[14px] ${message.ok ? "text-[#357452]" : "text-[#9B3E35]"}`}>
                  {message.ok && <Check size={15} />} {message.text}
                </motion.p>
              ) : (
                <span className="text-[13px] text-[#A2A6AC]">{dirty ? "Unsaved changes" : ""}</span>
              )}
            </AnimatePresence>
            <button disabled={busy !== null || !dirty} className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#151619] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#2B2D31] disabled:opacity-40">
              {busy === "save" && <Loader2 size={15} className="animate-spin" />}
              {busy === "save" ? "Saving…" : "Save profile"}
            </button>
          </div>
        </motion.form>
      )}
      {!profile && message && <p role="alert" className="mt-3 text-[14px] text-[#9B3E35]">{message.text}</p>}
    </section>
  );
}
