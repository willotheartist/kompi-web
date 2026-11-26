"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Check, ImagePlus, Loader2, X } from "lucide-react";
import { KR_LOGO_STORAGE_KEY, MAX_KR_LOGO_DATA_URL, MAX_KR_LOGO_EDGE, mergeKRLogos, readDeviceLogos, recentDeviceLogos, type ReusableKRLogo } from "@/lib/kr-logos";
import styles from "./qr-studio.module.css";

type Props = {auth:"checking"|"guest"|"member"|"error";logoUrl:string|null;onChange:(logoUrl:string|null)=>void};
async function readResponse(res:Response) {
  const data = await res.json().catch(()=>({error:"Please try again."}));
  if (!res.ok) throw new Error(data.error || "Please try again.");
  return data;
}

export default function QRLogoPicker({auth,logoUrl,onChange}:Props) {
  const [logos,setLogos] = useState<ReusableKRLogo[]>([]);
  const [loading,setLoading] = useState(false);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const [status,setStatus] = useState("");
  const [retry,setRetry] = useState(0);
  const [pending,setPending] = useState<ReusableKRLogo|null>(null);
  const [selectedId,setSelectedId] = useState("");
  const [search,setSearch] = useState("");
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Account changes switch the external source between API and browser storage.
    setLogos([]);setError("");setLoading(auth==="member");
    if (auth==="member") {
      fetch("/api/kr-codes/logos",{signal:controller.signal}).then(readResponse).then(data=>setLogos(data.logos)).catch(err=>{if(!controller.signal.aborted)setError(err.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    } else if (auth==="guest") {
      try {setLogos(readDeviceLogos(localStorage.getItem(KR_LOGO_STORAGE_KEY)));} catch {setError("Your browser could not open its recent logos.");}
    }
    return ()=>controller.abort();
  },[auth,retry]);

  // Preserve a logo from an existing guest draft when upgrading to this library.
  useEffect(()=>{
    if (auth!=="guest" || !logoUrl?.startsWith("data:image/")) return;
    try {
      const existing=readDeviceLogos(localStorage.getItem(KR_LOGO_STORAGE_KEY));
      if(existing.some(logo=>logo.dataUrl===logoUrl))return;
      const next=recentDeviceLogos([{id:crypto.randomUUID(),name:"Recent logo",dataUrl:logoUrl,source:"device"},...existing]);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Reflect a migrated guest logo after writing browser storage.
      localStorage.setItem(KR_LOGO_STORAGE_KEY,JSON.stringify(next));setLogos(next);
    } catch {setError("Logo added to this design, but this browser could not keep it for reuse.");}
  },[auth,logoUrl]);

  async function keepLogo(logo:ReusableKRLogo) {
    if (auth==="member") {
      const data=await readResponse(await fetch("/api/kr-codes/logos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:logo.name,dataUrl:logo.dataUrl})}));
      const saved:ReusableKRLogo=data.logo;
      setLogos(current=>mergeKRLogos([saved],current));setSelectedId(saved.id);onChange(saved.dataUrl);
      setStatus("Saved to your logo library.");
    } else if (auth==="guest") {
      const next=recentDeviceLogos([logo,...readDeviceLogos(localStorage.getItem(KR_LOGO_STORAGE_KEY))]);
      localStorage.setItem(KR_LOGO_STORAGE_KEY,JSON.stringify(next));setLogos(next);setSelectedId(logo.id);
      setStatus("Saved on this browser for next time.");
    } else throw new Error("Sign-in could not be checked. Refresh to save this logo for reuse.");
    setPending(null);
  }
  async function uploadLogo(e:ChangeEvent<HTMLInputElement>) {
    const file=e.target.files?.[0];e.target.value="";if(!file)return;
    setError("");setStatus("");setPending(null);
    if(!["image/png","image/jpeg","image/webp"].includes(file.type)||file.size>5*1024*1024){setError("Choose a PNG, JPG or WebP smaller than 5 MB.");return;}
    setBusy(true);const url=URL.createObjectURL(file);
    try {
      const image=new window.Image();await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error("This image could not be opened."));image.src=url;});
      const scale=Math.min(1,MAX_KR_LOGO_EDGE/Math.max(image.naturalWidth,image.naturalHeight));const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
      const context=canvas.getContext("2d");if(!context)throw new Error("This browser could not prepare your logo.");
      context.imageSmoothingQuality="high";context.drawImage(image,0,0,canvas.width,canvas.height);const dataUrl=canvas.toDataURL("image/png");
      if(dataUrl.length>MAX_KR_LOGO_DATA_URL)throw new Error("Try a simpler or smaller logo.");
      const logo:ReusableKRLogo={id:crypto.randomUUID(),name:file.name.slice(0,120),dataUrl,source:"device"};
      onChange(dataUrl);setPending(logo);
      try {await keepLogo(logo);} catch(err){setError(`Logo added to this design. ${err instanceof Error?err.message:"Could not save it for reuse."}`);}
    } catch(err){setError(err instanceof Error?err.message:"Could not add this logo.");}
    finally {URL.revokeObjectURL(url);setBusy(false);}
  }
  async function chooseLogo(logo:ReusableKRLogo) {
    setBusy(true);setError("");setStatus("");setPending(null);
    try {
      const selected:ReusableKRLogo=logo.dataUrl.startsWith("data:image/")?logo:(await readResponse(await fetch(`/api/kr-codes/logos/${encodeURIComponent(logo.id)}`))).logo;
      onChange(selected.dataUrl);setSelectedId(logo.id);
      if(selected.source==="code") {setPending(selected);await keepLogo(selected);}
      else setStatus("Logo applied. High error correction is on.");
    } catch(err){setError(err instanceof Error?err.message:"Could not use this logo.");}
    finally {setBusy(false);}
  }
  const visible=logos.filter(logo=>logo.name.toLowerCase().includes(search.toLowerCase()));
  return <section className={styles.controlSection}>
    <div className={styles.row}><h3>Your logo</h3><span className={styles.subtle}>Optional</span></div>
    <input ref={uploadRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadLogo} className={styles.hidden}/>
    {logoUrl && <div className={styles.uploadedLogo}><img src={logoUrl} alt="Selected logo"/><div><strong>Logo added</strong><span>High error correction enabled</span></div><button className={styles.iconButton} aria-label="Remove logo from this design" onClick={()=>{onChange(null);setSelectedId("");setStatus("Removed from this design. Your library is unchanged.");}} disabled={busy}><X size={18}/></button></div>}
    <button className={logoUrl?styles.logoUploadButton:styles.uploadArea} disabled={busy||auth==="checking"} onClick={()=>uploadRef.current?.click()}>{busy?<Loader2 size={20} className={styles.spinner}/>:<ImagePlus size={20}/>}<strong>{busy?"Preparing logo…":logoUrl?"Upload another logo":"Upload your logo"}</strong>{!logoUrl&&<span>PNG, JPG or WebP · up to 5 MB</span>}</button>
    <div className={styles.logoLibrary}>
      <div className={styles.row}><h4>Saved logos</h4><span className={styles.subtle}>{logos.length?`${logos.length} available`:""}</span></div>
      <p className={styles.logoLibraryHint}>{auth==="member"?"Your uploads and logos from saved codes. Choose one to reuse it.":"Recent uploads stay on this browser. Sign in to keep new uploads in your account."}</p>
      {logos.length>6&&<input className={styles.logoSearch} aria-label="Search saved logos" placeholder="Search logos" value={search} onChange={e=>setSearch(e.target.value)}/>}
      {loading?<p className={styles.logoStatus}>Loading your logos…</p>:visible.length?<div className={styles.logoGrid}>{visible.map(logo=><button key={logo.id} className={styles.logoTile} aria-label={`Use ${logo.name}`} aria-pressed={selectedId===logo.id||logo.dataUrl===logoUrl} onClick={()=>chooseLogo(logo)} disabled={busy}><span className={styles.logoThumb}><img src={logo.dataUrl} alt="" loading="lazy"/>{(selectedId===logo.id||logo.dataUrl===logoUrl)&&<Check size={15}/>}</span><span className={styles.logoName}>{logo.name}</span></button>)}</div>:<p className={styles.logoEmpty}>{search?"No logos match your search.":"Upload once. Pick it here next time."}</p>}
      {status&&<p className={styles.logoStatus} role="status">{status}</p>}
      {error&&<div className={styles.logoError} role="alert"><p>{error}</p><button type="button" disabled={busy} onClick={async()=>{if(!pending){setRetry(n=>n+1);return;}setBusy(true);setError("");try{await keepLogo(pending);}catch(err){setError(err instanceof Error?err.message:"Could not save this logo.");}finally{setBusy(false);}}}>{pending?"Retry saving logo":"Retry loading logos"}</button></div>}
    </div>
  </section>;
}
