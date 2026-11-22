"use client";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, CheckCheck, ChevronDown, Download, FileText, Globe2, Grid2X2, ImagePlus, Info, LayoutTemplate, Loader2, Mail, MapPin, MessageCircle, Palette, Phone, Plus, QrCode, RotateCcw, ScanLine, Settings2, ShieldCheck, Smartphone, Type, UserRound, Wifi, X } from "lucide-react";
import { DEFAULT_KR_STYLE, KR_PRESETS, designChecks, normalizeKRStyle, presetStyle, type KRStyle } from "@/lib/kr-design";
import { renderKRSvg } from "@/lib/kr-render";
import { buildKRContent, isWebType, KR_TYPES, readKRContent, type KRContent, type KRType } from "@/lib/kr-content";
import styles from "./qr-studio.module.css";

type Code = { id:string; title:string|null; destination:string; targetUrl?:string; shortCodeId?:string|null; type:string|null; style:unknown };
const types = [
  {id:"url",label:"Website",icon:Globe2}, {id:"file",label:"PDF / file",icon:FileText},
  {id:"social",label:"Social",icon:UserRound}, {id:"app",label:"App",icon:Smartphone},
  {id:"wifi",label:"Wi-Fi",icon:Wifi}, {id:"email",label:"Email",icon:Mail},
  {id:"sms",label:"SMS",icon:MessageCircle}, {id:"phone",label:"Phone",icon:Phone},
  {id:"location",label:"Location",icon:MapPin}, {id:"text",label:"Text",icon:Type},
] as const;
const dotStyles = [{id:"square",name:"Square"},{id:"rounded",name:"Soft"},{id:"dots",name:"Dots"},{id:"extra-rounded",name:"Fluid"},{id:"classy",name:"Cut"},{id:"classy-rounded",name:"Leaf"}] as const;
const frames = [{id:"none",name:"No frame"},{id:"outline",name:"Outline"},{id:"label-bottom",name:"Label"},{id:"label-top",name:"Banner"},{id:"ticket",name:"Ticket"}] as const;
type Tab = "templates"|"customize"|"content"|"export";
const tabs = [{id:"templates",name:"Templates",icon:LayoutTemplate},{id:"customize",name:"Customize",icon:Settings2},{id:"content",name:"Content",icon:Globe2},{id:"export",name:"Export",icon:Download}] as const;

export function QRArtwork({value,design,className=""}: {value:string;design:KRStyle;className?:string}) {
  const svg=useMemo(()=>{try {return renderKRSvg(value || "https://kompi.app",design,480);} catch {return "";}},[value,design]);
  return svg ? <div className={`${styles.artwork} ${className}`} dangerouslySetInnerHTML={{__html:svg}} /> : <div className={styles.renderError}>This content is too long for a QR code. Shorten it to continue.</div>;
}
function Field({label,children,hint}: {label:string;children:ReactNode;hint?:string}) {
  return <label className={styles.field}><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}
function ColorField({label,value,onChange}: {label:string;value:string;onChange:(value:string)=>void}) {
  const [text,setText]=useState(value);
  useEffect(()=>setText(value),[value]);
  return <div className={styles.field}><span>{label}</span><div className={styles.colorInput}>
    <input type="color" aria-label={`${label} picker`} value={value === "transparent" ? "#FFFFFF" : value} onChange={e=>onChange(e.target.value.toUpperCase())}/>
    <input aria-label={`${label} hex`} value={text} maxLength={7} onChange={e=>{setText(e.target.value);if (/^#[a-f0-9]{6}$/i.test(e.target.value)) onChange(e.target.value.toUpperCase());}} onBlur={()=>setText(value)}/>
  </div></div>;
}
function ShapeSample({kind}: {kind:string}) {
  return <span className={styles.shapeSample} data-shape={kind} aria-hidden="true">{Array.from({length:9},(_,i)=><i key={i}/>)}</span>;
}
async function responseMessage(res: Response) {
  const text=await res.text();
  try {const json=JSON.parse(text);return json.error || json.message || "Please try again.";} catch {return text.slice(0,350) || "Please try again.";}
}
async function downloadDesign(value:string,design:KRStyle,format:"svg"|"png",name:string) {
  const svgBlob=new Blob([renderKRSvg(value,design,design.size)],{type:"image/svg+xml;charset=utf-8"});
  let blob=svgBlob;
  if (format === "png") {
    const image=new window.Image(); const source=URL.createObjectURL(svgBlob);
    try {
      await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error("Could not render your image."));image.src=source;});
      const canvas=document.createElement("canvas");canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
      const context=canvas.getContext("2d");if (!context) throw new Error("Image export is unavailable in this browser.");
      context.drawImage(image,0,0);
      blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b ? resolve(b) : reject(new Error("Could not export PNG.")),"image/png"));
    } finally {URL.revokeObjectURL(source);}
  }
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${name.replace(/[^a-z0-9_-]+/gi,"-").slice(0,80) || "kompi-code"}.${format}`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export default function QRStudio() {
  const params=useSearchParams(); const codeId=params.get("krcodeId");
  const [design,setDesign]=useState<KRStyle>(DEFAULT_KR_STYLE);
  const [content,setContent]=useState<KRContent>({destination:""});
  const [type,setType]=useState<KRType>("url"); const [title,setTitle]=useState("");
  const [tab,setTab]=useState<Tab>("templates"); const [category,setCategory]=useState("All");
  const [preset,setPreset]=useState("signature"); const [scene,setScene]=useState("code");
  const [format,setFormat]=useState<"png"|"svg">("png"); const [showUtms,setShowUtms]=useState(false);
  const [showTypes,setShowTypes]=useState(false); const [auth,setAuth]=useState<"checking"|"guest"|"member"|"error">("checking");
  const [saving,setSaving]=useState(false); const [exporting,setExporting]=useState(false);
  const [error,setError]=useState(""); const [notice,setNotice]=useState("");
  const [saved,setSaved]=useState<Code|null>(null); const [savedSnapshot,setSavedSnapshot]=useState("");
  const [loadingCode,setLoadingCode]=useState(Boolean(codeId));
  const [history,setHistory]=useState<KRStyle[]>([]); const [restored,setRestored]=useState(false);
  const [draftStatus,setDraftStatus]=useState(""); const [logoLoading,setLogoLoading]=useState(false);
  const uploadRef=useRef<HTMLInputElement>(null);
  const built=useMemo(()=>buildKRContent(type,content),[type,content]);
  const snapshot=JSON.stringify({title,type,content,design});
  const dirty=savedSnapshot !== snapshot;
  const qrValue=saved?.shortCodeId ? saved.destination : built.value;
  const checks=designChecks(design);
  const tooLong=new TextEncoder().encode(built.value).length > 1800;
  const currentType=types.find(t=>t.id===type)!;

  useEffect(()=>{
    const controller=new AbortController();
    fetch("/api/kr-codes",{signal:controller.signal}).then(res=>setAuth(res.status===401 || res.redirected ? "guest" : res.ok ? "member" : "error")).catch(()=>{if (!controller.signal.aborted) setAuth("error");});
    return ()=>controller.abort();
  },[]);
  useEffect(()=>{
    if (codeId) {setRestored(true);return;}
    try {
      const raw=sessionStorage.getItem("kompi-qr-draft-v2");
      if (raw) {
        const draft=JSON.parse(raw);
        if (draft.design) {setDesign({...normalizeKRStyle(draft.design),logoUrl:null,logoEnabled:false});setPreset("");}
        if (KR_TYPES.includes(draft.type)) setType(draft.type);
        if (draft.content && typeof draft.content === "object") setContent(Object.fromEntries(Object.entries(draft.content).filter(([,v])=>typeof v === "string")) as KRContent);
        if (typeof draft.title === "string") setTitle(draft.title.slice(0,120));
        setDraftStatus("Draft restored");
      }
    } catch { /* Private browsing can disable session storage. */ }
    setRestored(true);
  },[codeId]);
  useEffect(()=>{
    if (!restored || codeId || saved) return;
    const timer=setTimeout(()=>{
      try {
        // Do not persist network credentials, message bodies or uploaded logos in browser storage.
        sessionStorage.setItem("kompi-qr-draft-v2",JSON.stringify({title,type,content:isWebType(type) ? content : {},design:{...design,logoUrl:null,logoEnabled:false}}));
        setDraftStatus(type === "wifi" ? "Wi-Fi details stay in this form" : "Design saved in this tab");
      } catch {setDraftStatus("Draft stays in this session");}
    },600);
    return ()=>clearTimeout(timer);
  },[snapshot,restored,codeId,saved,type,content,title,design]);
  useEffect(()=>{
    if (!codeId) return;
    let cancelled=false;setLoadingCode(true);
    fetch(`/api/kr-codes/${encodeURIComponent(codeId)}`).then(async res=>{
      if (!res.ok) throw new Error(await responseMessage(res));
      const code:Code=await res.json();if (cancelled) return;
      const nextType=KR_TYPES.includes(code.type as KRType) ? code.type as KRType : "url";
      const nextContent=readKRContent(nextType,code.targetUrl || code.destination);const nextDesign=normalizeKRStyle(code.style);
      setSaved(code);setType(nextType);setContent(nextContent);setTitle(code.title || "");setDesign(nextDesign);setPreset("");
      setSavedSnapshot(JSON.stringify({title:code.title || "",type:nextType,content:nextContent,design:nextDesign}));
    }).catch(err=>{if (!cancelled) setError(err.message);}).finally(()=>{if (!cancelled) setLoadingCode(false);});
    return ()=>{cancelled=true;};
  },[codeId]);

  function update(patch:Partial<KRStyle>) {setHistory(h=>[...h.slice(-19),design]);setDesign({...design,...patch});setPreset("");setNotice("");}
  function setField(key:string,value:string) {setContent(c=>({...c,[key]:value}));setError("");setNotice("");}
  function choosePreset(p:typeof KR_PRESETS[number]) {setHistory(h=>[...h.slice(-19),design]);setDesign(presetStyle(p,design));setPreset(p.id);setNotice("");}
  function changeType(next:KRType) {setType(next);setShowTypes(false);setTab("content");setError("");}
  async function saveCode() {
    setError("");setNotice("");
    if (!built.value || built.error || tooLong) {setError(tooLong ? "Shorten this content before saving." : built.error || "Add a destination first.");setTab("content");return;}
    if (auth === "guest") {window.location.href=`/signin?callbackUrl=${encodeURIComponent(`/kr-codes${codeId ? `?krcodeId=${codeId}` : ""}`)}`;return;}
    setSaving(true);
    try {
      const res=await fetch(saved ? `/api/kr-codes/${saved.id}` : "/api/kr-codes",{method:saved ? "PATCH" : "POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:title.trim() || undefined,destination:built.value,type,style:design,createShortLink:isWebType(type)})});
      if (res.status===401 || res.redirected) {setAuth("guest");throw new Error("Sign in to save this code to your workspace.");}
      if (!res.ok) throw new Error(await responseMessage(res));
      const code:Code=await res.json();setSaved(code);setSavedSnapshot(snapshot);setTab("export");setNotice(saved ? "Changes saved. Your code is ready to download." : "Your Kompi Code is ready. Choose a format to download.");
      try {sessionStorage.removeItem("kompi-qr-draft-v2");} catch {}
    } catch(err) {setError(err instanceof Error ? err.message : "Could not save your code. Please try again.");}
    finally {setSaving(false);}
  }
  async function uploadLogo(e:ChangeEvent<HTMLInputElement>) {
    const file=e.target.files?.[0];e.target.value="";if (!file) return;setError("");
    if (!["image/png","image/jpeg","image/webp"].includes(file.type) || file.size > 5*1024*1024) {setError("Choose a PNG, JPG or WebP smaller than 5 MB.");return;}
    setLogoLoading(true);const url=URL.createObjectURL(file);
    try {
      const image=new window.Image();await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error("This image could not be opened."));image.src=url;});
      const scale=Math.min(1,384/Math.max(image.width,image.height));const canvas=document.createElement("canvas");canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale);
      canvas.getContext("2d")!.drawImage(image,0,0,canvas.width,canvas.height);const data=canvas.toDataURL("image/png");
      if (data.length > 700000) throw new Error("Try a simpler or smaller logo.");
      update({logoUrl:data,logoEnabled:true,ecLevel:"H"});setNotice("Logo added. High error correction is applied automatically.");
    } catch(err) {setError(err instanceof Error ? err.message : "Could not add this logo.");} finally {URL.revokeObjectURL(url);setLogoLoading(false);}
  }
  async function exportCode() {
    if (!built.value || tooLong) {setError(built.error || "Shorten your content before exporting.");setTab("content");return;}
    setExporting(true);setError("");
    try {await downloadDesign(qrValue,design,format,title || "kompi-code");setNotice("Download prepared. Test your code with a phone before printing.");}
    catch(err) {setError(err instanceof Error ? err.message : "Download failed. Please try again.");}
    finally {setExporting(false);}
  }
  const input=(key:string,placeholder:string,inputType="text")=><input type={inputType} value={content[key] || ""} placeholder={placeholder} onChange={e=>setField(key,e.target.value)} maxLength={key==="text" ? 1800 : 1500}/>;
  const actionLabel=saving ? "Saving…" : auth === "guest" ? "Sign in to save" : saved ? "Save changes" : "Create code";

  return <div className={styles.studio}>
    <header className={styles.pageHeader}>
      <div><h1>{saved ? "Fine-tune your code." : "A small code. A big impression."}</h1><p>Create something worth scanning. Make it unmistakably yours.</p></div>
      <Link className={styles.secondaryButton} href="/kr-codes/your"><Grid2X2 size={17}/> Your codes</Link>
    </header>
    {loadingCode && <p className={styles.message} role="status"><Loader2 size={18} className={styles.spinner}/> Loading your code…</p>}
    {error && <div className={styles.error} role="alert"><Info size={18}/><span>{error}</span><button onClick={()=>setError("")} aria-label="Dismiss error"><X size={17}/></button></div>}
    {notice && <div className={styles.message} role="status"><CheckCheck size={18}/><span>{notice}</span><button onClick={()=>setNotice("")} aria-label="Dismiss message"><X size={17}/></button></div>}
    <div className={styles.workspace} aria-busy={loadingCode}>
      <section className={styles.editor}>
        <div className={styles.destinationBlock}>
          <div className={styles.row}><label htmlFor="quick-destination">{["url","file","social","app"].includes(type) ? "Where should it go?" : "What should it do?"}</label><div className={styles.typePicker}>
            <button className={styles.typeButton} onClick={()=>setShowTypes(!showTypes)} aria-expanded={showTypes} disabled={Boolean(saved)}><currentType.icon size={15}/>{currentType.label}<ChevronDown size={14}/></button>
            {showTypes && <div className={styles.typeMenu}>{types.map(t=><button key={t.id} onClick={()=>changeType(t.id)} aria-pressed={type===t.id}><t.icon size={17}/>{t.label}{type===t.id && <Check size={14}/>}</button>)}</div>}
          </div></div>
          {["url","file","social","app"].includes(type) ? <div className={styles.urlInput}><Globe2 size={18}/><input id="quick-destination" placeholder={type === "file" ? "Paste a link to your PDF or file" : "yoursite.com"} value={content.destination || ""} onChange={e=>setField("destination",e.target.value)} autoComplete="url" maxLength={1500}/>{built.value && !built.error && <Check size={17} className={styles.green}/>}</div> : <button id="quick-destination" className={styles.contentSummary} onClick={()=>setTab("content")}>{built.value ? type === "wifi" ? content.ssid : "Content added" : `Add your ${currentType.label.toLowerCase()} details`}<Settings2 size={16}/></button>}
          <p>{isWebType(type) ? "Save to Kompi to edit the destination and track scans." : "A direct code. Its content is fixed once printed."}</p>
        </div>
        <div className={styles.tabs} role="tablist" aria-label="QR editor">{tabs.map(t=><button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={tab===t.id} aria-controls="qr-editor-panel" tabIndex={tab===t.id ? 0 : -1} onKeyDown={e=>{if (["ArrowRight","ArrowLeft","Home","End"].includes(e.key)) {e.preventDefault();const index=tabs.findIndex(x=>x.id===tab);const next=e.key==="Home" ? 0 : e.key==="End" ? 3 : (index+(e.key==="ArrowRight" ? 1 : 3))%4;setTab(tabs[next].id);document.getElementById(`tab-${tabs[next].id}`)?.focus();}}} onClick={()=>setTab(t.id)}><t.icon size={16}/>{t.name}</button>)}</div>
        <div id="qr-editor-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className={styles.panel}>
          {tab === "templates" && <>
            <div className={styles.sectionHeading}><div><h2>Start with a good look.</h2><p>Pick a design, then make it your own.</p></div><span className={styles.count}>12 designs</span></div>
            <div className={styles.filters} aria-label="Template categories">{["All","Minimal","Branded","Print"].map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
            <div className={styles.presetGrid}>{KR_PRESETS.filter(p=>category==="All" || p.category===category).map(p=><button key={p.id} className={styles.preset} aria-pressed={preset===p.id} aria-label={`Use ${p.name} template`} onClick={()=>choosePreset(p)}><div className={styles.presetArtwork} style={{background:p.bg}}><QRArtwork value="https://kompi.app" design={presetStyle(p)}/>{preset===p.id && <span className={styles.selectedMark}><Check size={12}/></span>}</div><span className={styles.presetName}>{p.name}<span>{p.category}</span></span></button>)}</div>
            <button className={styles.fullTextButton} onClick={()=>setTab("customize")}><Palette size={17}/> Want to tweak it? Customize every detail.</button>
          </>}
          {tab === "customize" && <>
            <div className={styles.sectionHeading}><div><h2>The details make it yours.</h2><p>Every change appears in your preview.</p></div><button className={styles.iconButton} title="Undo design change" aria-label="Undo design change" disabled={!history.length} onClick={()=>{setDesign(history[history.length-1]);setHistory(h=>h.slice(0,-1));setPreset("");}}><RotateCcw size={17}/></button></div>
            <section className={styles.controlSection}><h3>Colours</h3><div className={styles.twoColumns}><ColorField label="Code" value={design.fg} onChange={fg=>update({fg,eyeColor:fg})}/><ColorField label="Background" value={design.bg} onChange={bg=>update({bg})}/></div><div className={styles.paletteRow}>{["#292329","#742845","#2545AD","#354B36","#793A2B","#15565B"].map(c=><button key={c} aria-label={`Use ${c} ink`} aria-pressed={design.fg===c} style={{background:c}} onClick={()=>update({fg:c,eyeColor:c,frameColor:c})}>{design.fg===c && <Check size={13}/>}</button>)}<span>Quick palette</span></div></section>
            <section className={styles.controlSection}><h3>Code pattern</h3><div className={styles.shapeGrid}>{dotStyles.map(s=><button key={s.id} aria-pressed={design.dotsType===s.id} onClick={()=>update({dotsType:s.id})}><ShapeSample kind={s.id}/><span>{s.name}</span></button>)}</div></section>
            <section className={styles.controlSection}><h3>Corner details</h3><div className={styles.twoColumns}><Field label="Outer shape"><div className={styles.segmented}>{[{id:"square",name:"Square"},{id:"extra-rounded",name:"Soft"},{id:"dot",name:"Round"}].map(s=><button key={s.id} aria-label={`${s.name} outer corners`} aria-pressed={design.cornersSquareType===s.id} onClick={()=>update({cornersSquareType:s.id as KRStyle["cornersSquareType"]})}><span className={styles.eyeSample} data-shape={s.id}/></button>)}</div></Field><Field label="Inner shape"><div className={styles.segmented}>{["square","rounded","dot"].map(s=><button key={s} aria-label={`${s} inner corners`} aria-pressed={design.cornersDotType===s} onClick={()=>update({cornersDotType:s as KRStyle["cornersDotType"]})}><span className={styles.innerSample} data-shape={s}/></button>)}</div></Field></div><ColorField label="Corner colour" value={design.eyeColor} onChange={eyeColor=>update({eyeColor})}/></section>
            <section className={styles.controlSection}><div className={styles.row}><h3>Your logo</h3><span className={styles.subtle}>Optional</span></div><input ref={uploadRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadLogo} className={styles.hidden}/>{design.logoUrl ? <div className={styles.uploadedLogo}><img src={design.logoUrl} alt="Uploaded logo"/><div><strong>Logo added</strong><span>High error correction enabled</span></div><button className={styles.iconButton} aria-label="Remove logo" onClick={()=>update({logoUrl:null,logoEnabled:false})}><X size={18}/></button></div> : <button className={styles.uploadArea} disabled={logoLoading} onClick={()=>uploadRef.current?.click()}>{logoLoading ? <Loader2 size={22} className={styles.spinner}/> : <ImagePlus size={22}/>}<strong>{logoLoading ? "Preparing logo…" : "Upload your logo"}</strong><span>PNG, JPG or WebP · up to 5 MB</span></button>}{design.logoUrl && <Field label="Logo size"><input type="range" min="12" max="22" value={design.logoSize*100} onChange={e=>update({logoSize:Number(e.target.value)/100})}/></Field>}</section>
            <section className={styles.controlSection}><h3>Give it a frame</h3><div className={styles.frameGrid}>{frames.map(f=><button key={f.id} aria-pressed={design.frameVariant===f.id} onClick={()=>update({frameVariant:f.id})}><span className={styles.frameSample} data-frame={f.id}><QrCode size={24}/>{f.id!=="none" && f.id!=="outline" && <i/>}</span><span>{f.name}</span></button>)}</div>{design.frameVariant!=="none" && <div className={styles.twoColumns}>{design.frameVariant!=="outline" && <Field label="Call to action"><input value={design.frameLabel} maxLength={40} onChange={e=>update({frameLabel:e.target.value})}/></Field>}<ColorField label="Frame colour" value={design.frameColor} onChange={frameColor=>update({frameColor})}/></div>}</section>
            <details className={styles.advanced}><summary>Advanced settings <ChevronDown size={16}/></summary><Field label="Error correction" hint={design.logoEnabled ? "High is used automatically when a logo is added." : "More redundancy helps with print and wear."}><select value={design.logoEnabled ? "H" : design.ecLevel} disabled={design.logoEnabled} onChange={e=>update({ecLevel:e.target.value as KRStyle["ecLevel"]})}><option value="M">Balanced</option><option value="Q">High</option><option value="H">Maximum</option><option value="L">Light</option></select></Field><Field label={`Quiet zone · ${Math.max(4,design.margin)} modules`} hint="A clear four-module margin is always preserved."><input type="range" min="4" max="10" value={Math.max(4,design.margin)} onChange={e=>update({margin:Number(e.target.value)})}/></Field></details>
            <button className={styles.fullTextButton} onClick={()=>{setHistory(h=>[...h.slice(-19),design]);setDesign(DEFAULT_KR_STYLE);setPreset("signature");}}><RotateCcw size={16}/> Reset design</button>
          </>}
          {tab === "content" && <>
            <div className={styles.sectionHeading}><div><h2>Make the connection.</h2><p>Choose what happens when someone scans.</p></div></div>
            <Field label="Code name" hint="Just for you. It won’t appear inside the QR code."><input value={title} maxLength={120} placeholder="e.g. Studio business card" onChange={e=>setTitle(e.target.value)}/></Field>
            <div className={styles.typeGrid}>{types.map(t=><button key={t.id} disabled={Boolean(saved) && type!==t.id} aria-pressed={type===t.id} onClick={()=>changeType(t.id)}><t.icon size={19}/>{t.label}</button>)}</div>
            {["url","file","social","app"].includes(type) && <Field label={type === "file" ? "Public file URL" : "Destination URL"} hint={type === "file" ? "Paste a publicly accessible link to your hosted PDF or file." : "You can paste a domain without https://."}>{input("destination",type==="file" ? "https://yoursite.com/menu.pdf" : "https://yoursite.com")}</Field>}
            {type === "location" && <Field label="Address or coordinates">{input("location","e.g. 10 Downing Street, London")}</Field>}
            {(type === "sms" || type === "phone") && <Field label="Phone number">{input("phone","+44 7700 900000","tel")}</Field>}
            {type === "email" && <><Field label="Email address">{input("email","hello@yoursite.com","email")}</Field><Field label="Subject">{input("subject","Let’s talk")}</Field></>}
            {(type === "sms" || type === "email") && <Field label="Message (optional)"><textarea value={content.body || ""} onChange={e=>setField("body",e.target.value)} maxLength={1200} rows={3} placeholder="Start the conversation…"/></Field>}
            {type === "text" && <Field label="Your text"><textarea value={content.text || ""} onChange={e=>setField("text",e.target.value)} maxLength={1800} rows={5} placeholder="What would you like to share?"/></Field>}
            {type === "wifi" && <><Field label="Network name (SSID)">{input("ssid","Your Wi-Fi name")}</Field><Field label="Security"><select value={content.security || "WPA"} onChange={e=>setField("security",e.target.value)}><option value="WPA">WPA / WPA2 / WPA3</option><option value="WEP">WEP</option><option value="nopass">Open network</option></select></Field>{content.security!=="nopass" && <Field label="Password">{input("password","Network password","password")}</Field>}<label className={styles.checkbox}><input type="checkbox" checked={content.hidden==="true"} onChange={e=>setField("hidden",String(e.target.checked))}/> Hidden network</label></>}
            {isWebType(type) && type!=="location" && <div className={styles.utm}><button aria-expanded={showUtms} onClick={()=>setShowUtms(!showUtms)}><span>Campaign tracking <small>Optional</small></span>{showUtms ? <X size={16}/> : <Plus size={16}/>}</button>{showUtms && <div className={styles.twoColumns}>{["source","medium","campaign","term","content"].map(key=><Field key={key} label={key[0].toUpperCase()+key.slice(1)}>{input(`utm_${key}`,key==="source" ? "business-card" : key==="medium" ? "qr" : "Optional")}</Field>)}</div>}</div>}
            <div className={styles.infoBox}><Info size={18}/><p>{isWebType(type) ? "Saving creates a dynamic Kompi link. You can change its destination later without reprinting." : "This code contains your details directly. Scans aren’t tracked. If you change its content later, download and reprint it."}</p></div>
          </>}
          {tab === "export" && <>
            <div className={styles.sectionHeading}><div><h2>Ready to go out into the world.</h2><p>From screens to stickers. Keep it crisp.</p></div></div>
            <div className={styles.exportTypes}>{[{id:"png",name:"PNG",desc:"Web, social & everyday use"},{id:"svg",name:"SVG",desc:"Vector quality for any print size"}].map(f=><button key={f.id} aria-pressed={format===f.id} onClick={()=>setFormat(f.id as "png"|"svg")}><FileText size={25}/><strong>{f.name}</strong><span>{f.desc}</span>{format===f.id && <Check size={17}/>}</button>)}</div>
            <Field label="Export width" hint={format === "svg" ? "SVG stays sharp at any size." : "Frames with a label are taller than the selected width."}><select value={design.size} onChange={e=>update({size:Number(e.target.value)})}>{[512,1024,2048,4096].map(size=><option value={size} key={size}>{size} px{size===1024 ? " · recommended" : ""}</option>)}</select></Field>
            <div className={styles.infoBox}><Info size={18}/><p>{saved?.shortCodeId ? "Your download uses the saved Kompi link, so scans are tracked and the destination stays editable." : "This download contains your destination directly. Save a web code to Kompi first if you want scan analytics and an editable destination."}</p></div>
            {saved && dirty && <div className={styles.warning}>You have unsaved changes. Save first to keep your workspace and download in sync.</div>}
            <button className={styles.primaryButton} onClick={exportCode} disabled={exporting || !built.value || tooLong || (Boolean(saved) && dirty)}>{exporting ? <Loader2 size={18} className={styles.spinner}/> : <Download size={18}/>} Download {format.toUpperCase()}</button>
            <div className={styles.printChecklist}><h3>A quick check before you print</h3><p><Check size={16}/> Scan with your phone and check the destination.</p><p><Check size={16}/> Keep the clear space around your code.</p><p><Check size={16}/> Test at the actual printed size and distance.</p></div>
            {saved && <Link className={styles.fullTextButton} href={`/kr-codes/${saved.id}`}><ScanLine size={17}/> View code details and analytics</Link>}
          </>}
        </div>
        <footer className={styles.editorFooter}><span><CheckCheck size={15}/>{saved ? dirty ? "Unsaved changes" : "Saved to your workspace" : draftStatus || "Your design starts here"}</span><button className={styles.primaryButton} onClick={saveCode} disabled={saving || loadingCode || auth==="checking" || (Boolean(saved) && !dirty)}>{saving && <Loader2 size={16} className={styles.spinner}/>} {actionLabel}</button></footer>
      </section>
      <aside className={styles.previewColumn}>
        <div className={styles.previewCanvas}>
          <div className={styles.previewTop}><span><ScanLine size={17}/> Live preview</span><button className={styles.iconButton} onClick={()=>setTab("export")} aria-label="Export options"><Download size={18}/></button></div>
          <div className={styles.scenes} aria-label="Preview placement">{[{id:"code",label:"Code"},{id:"card",label:"Business card"},{id:"table",label:"Table sign"}].map(s=><button key={s.id} aria-pressed={scene===s.id} onClick={()=>setScene(s.id)}>{s.label}</button>)}</div>
          <div className={styles.stage} data-scene={scene}>
            {scene === "code" && <div className={styles.qrPaper}><QRArtwork value={qrValue} design={design}/></div>}
            {scene === "card" && <div className={styles.businessCard}><div><span className={styles.mockWordmark}>Your brand<span>®</span></span><span className={styles.mockSmall}>GOOD THINGS<br/>START HERE.</span><p>Let’s stay connected.</p></div><QRArtwork value={qrValue} design={design}/></div>}
            {scene === "table" && <div className={styles.tableSign}><span className={styles.mockWordmark}>Your brand<span>®</span></span><h3>A little<br/>something more.</h3><QRArtwork value={qrValue} design={design}/><p>Scan to explore.</p></div>}
          </div>
          <div className={styles.canvasCaption}><span>{preset ? KR_PRESETS.find(p=>p.id===preset)?.name : "Your custom design"}</span><span>{!built.value ? "Sample code" : scene==="code" ? "Updates live" : "Placement preview"}</span></div>
        </div>
        <div className={styles.scanPanel}><div className={styles.row}><span className={styles.scanTitle}><ShieldCheck size={19}/>{checks.warnings.length ? "A few things to check" : "Looking good for scanning"}</span><span className={styles.contrast}>{checks.contrast.toFixed(1)}:1</span></div>{checks.warnings.length ? checks.warnings.map(w=><p key={w} className={styles.warning}>{w}</p>) : <div className={styles.checkPills}><span><Check size={14}/> Strong contrast</span><span><Check size={14}/> Clear margin</span></div>}<p className={styles.scanNote}>Design checks are a guide. Always test with a phone before printing.</p></div>
        <div className={styles.previewDestination}><span>{saved?.shortCodeId ? "Dynamic Kompi code" : "Destination"}</span><strong>{type === "wifi" ? content.ssid || "Add your network details" : built.value || "Add your content to get started"}</strong>{saved?.shortCodeId && <small>Linked through {saved.destination}</small>}</div>
        <div className={styles.previewTip}><QrCode size={21}/><p><strong>Small code. Endless possibilities.</strong><span>Packaging, menus, storefronts, business cards. One scan starts the connection.</span></p></div>
      </aside>
    </div>
  </div>;
}
