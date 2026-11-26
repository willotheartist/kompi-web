"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpDown, BarChart3, CalendarDays, Check, ChevronDown, Clock3, Download, Grid2X2, List, Loader2, MoreHorizontal, Pencil, Plus, QrCode, RefreshCw, Search, Trash2, X } from "lucide-react";
import { buildKRContent } from "@/lib/kr-content";
import { normalizeKRStyle } from "@/lib/kr-design";
import { KR_DRAFT_KEY, KR_SORT_OPTIONS, KR_TYPE_NAMES, draftMatchesKRCode, krCodeName, krDestinationLabel, readKRLocalDraft, selectKRCodes, type KRLibrarySort, type KRLocalDraft, type LibraryKRCode } from "@/lib/kr-library";
import { QRArtwork } from "./QRStudio";
import styles from "./qr-studio.module.css";
import library from "./qr-library.module.css";

const dateLabel=(value:string)=>new Date(value).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"});
const dateInput=(date:Date)=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
function editedLabel(value:string) {
  const date=new Date(value), today=new Date();
  if(date.toDateString()===today.toDateString())return "Today";
  today.setDate(today.getDate()-1);
  return date.toDateString()===today.toDateString()?"Yesterday":dateLabel(value);
}

function CodeActions({code,busy,onDelete}:{code:LibraryKRCode;busy:boolean;onDelete:()=>void}) {
  const [open,setOpen]=useState(false);
  const root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null);
  const name=krCodeName(code);
  useEffect(()=>{
    if(!open)return;
    const dismiss=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};
    document.addEventListener("pointerdown",dismiss);
    return ()=>document.removeEventListener("pointerdown",dismiss);
  },[open]);
  return <div className={library.actions} ref={root} onKeyDown={event=>{
    if(event.key==="Escape"){setOpen(false);trigger.current?.focus();}
    if(open && ["ArrowDown","ArrowUp","Home","End"].includes(event.key)){
      event.preventDefault();const items=Array.from(root.current?.querySelectorAll<HTMLElement>('[role="menuitem"]')||[]);
      const current=items.indexOf(document.activeElement as HTMLElement);
      items[event.key==="Home"?0:event.key==="End"?items.length-1:(current+(event.key==="ArrowDown"?1:-1)+items.length)%items.length]?.focus();
    }
  }}>
    <Link href={`/kr-codes?krcodeId=${code.id}`} aria-label={`Edit ${name}`} title="Edit design"><Pencil size={17}/><span className={library.actionLabel}>Edit</span></Link>
    <a href={`/api/kr-codes/${code.id}/png`} download aria-label={`Download ${name} PNG`} title="Download PNG · 4096 px"><Download size={18}/><span className={library.actionLabel}>PNG</span></a>
    <button ref={trigger} aria-label={`More options for ${name}`} aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(value=>!value)} disabled={busy}><MoreHorizontal size={20}/></button>
    {open&&<div role="menu" aria-label={`Actions for ${name}`} className={library.menu}>
      <Link role="menuitem" href={`/kr-codes/${code.id}`}><BarChart3 size={16}/> Details & analytics</Link>
      <a role="menuitem" href={`/api/kr-codes/${code.id}/png?size=8192`} download onClick={()=>setOpen(false)}><Download size={16}/> Large PNG <span>8192 px</span></a>
      <a role="menuitem" href={`/api/kr-codes/${code.id}/svg`} download onClick={()=>setOpen(false)}><QrCode size={16}/> Vector SVG</a>
      <button role="menuitem" className={library.deleteAction} onClick={()=>{setOpen(false);onDelete();}}><Trash2 size={16}/> Delete code</button>
    </div>}
  </div>;
}

export default function QRLibrary() {
  const [codes,setCodes]=useState<LibraryKRCode[]>([]),[state,setState]=useState("loading"),[error,setError]=useState("");
  const [query,setQuery]=useState(""),[kind,setKind]=useState("all"),[type,setType]=useState("all"),[sort,setSort]=useState<KRLibrarySort>("newest");
  const [view,setView]=useState("list"),[datesOpen,setDatesOpen]=useState(false),[dateFrom,setDateFrom]=useState(""),[dateTo,setDateTo]=useState("");
  const [refreshing,setRefreshing]=useState(false),[deleting,setDeleting]=useState<string|null>(null),[notice,setNotice]=useState("");
  const [draft,setDraft]=useState<KRLocalDraft|null>(null),[recovering,setRecovering]=useState(false);
  const reducedMotion=useReducedMotion(),request=useRef(0),recoveryLock=useRef(false);
  const load=useCallback(async()=>{
    const sequence=++request.current;setRefreshing(true);setError("");
    try {
      const res=await fetch("/api/kr-codes",{cache:"no-store"});
      if(sequence!==request.current)return;
      if(res.status===401||res.redirected){setState("guest");return;}
      if(!res.ok)throw new Error("Your codes couldn’t be loaded. Please try again.");
      const data=await res.json();if(sequence!==request.current)return;
      setCodes(data.codes||[]);setState("ready");
    } catch(err){if(sequence===request.current){setError(err instanceof Error?err.message:"Could not load your codes.");setState(current=>current==="loading"?"error":current);}}
    finally{if(sequence===request.current)setRefreshing(false);}
  },[]);
  useEffect(()=>{
    void load();
    try {setDraft(readKRLocalDraft(sessionStorage.getItem(KR_DRAFT_KEY)));const choice=localStorage.getItem("kompi-qr-library-view");if(choice==="grid"||choice==="list")setView(choice);}catch{}
    const refresh=()=>{if(document.visibilityState==="visible")void load();};
    window.addEventListener("focus",refresh);
    return ()=>{request.current++;window.removeEventListener("focus",refresh);};
  },[load]);
  const changeView=(next:string)=>{setView(next);try{localStorage.setItem("kompi-qr-library-view",next);}catch{}};
  const filtered=useMemo(()=>selectKRCodes(codes,{query,kind,type,sort,dateFrom,dateTo}),[codes,query,kind,type,sort,dateFrom,dateTo]);
  const dynamic=codes.filter(code=>code.shortCodeId).length;
  const activeFilters=Boolean(query||kind!=="all"||type!=="all"||dateFrom||dateTo);
  const pendingDraft=draft&&!codes.some(code=>draftMatchesKRCode(draft,code))?draft:null;
  const draftValue=pendingDraft?buildKRContent(pendingDraft.type,pendingDraft.content).value:"";
  const draftName=pendingDraft?krCodeName({title:pendingDraft.title,type:pendingDraft.type,destination:draftValue}):"";
  function clearFilters(){setQuery("");setKind("all");setType("all");setDateFrom("");setDateTo("");}
  function datePreset(days:number|null){if(days===null){setDateFrom("");setDateTo("");return;}const today=new Date(),from=new Date();from.setDate(today.getDate()-days+1);setDateFrom(dateInput(from));setDateTo(dateInput(today));}
  async function recoverDraft(){
    if(!pendingDraft||recoveryLock.current)return;
    recoveryLock.current=true;setRecovering(true);setError("");
    const requestId=pendingDraft.requestId||crypto.randomUUID();
    try {
      try{sessionStorage.setItem(KR_DRAFT_KEY,JSON.stringify({...pendingDraft,requestId}));}catch{}
      // Keep the exact direct destination: an already printed file cannot become a dynamic code.
      const res=await fetch("/api/kr-codes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:pendingDraft.title||undefined,type:pendingDraft.type,destination:draftValue,style:pendingDraft.design,createShortLink:false,clientRequestId:requestId})});
      if(!res.ok){const text=await res.text();let message=text;try{message=JSON.parse(text).error||text;}catch{}throw new Error(message||"Could not save this design. It is still available in this browser.");}
      const code=await res.json();setCodes(current=>[{...code,totalClicks:0},...current.filter(item=>item.id!==code.id)]);
      try{sessionStorage.removeItem(KR_DRAFT_KEY);}catch{}
      setDraft(null);clearFilters();setSort("newest");setNotice(`${draftName} is now in your library. Its original destination is unchanged.`);
    } catch(err){setError(err instanceof Error?err.message:"Could not save this design.");}
    finally{setRecovering(false);recoveryLock.current=false;}
  }
  async function remove(code:LibraryKRCode){
    if(!window.confirm(`Delete “${krCodeName(code)}”? This removes its saved design and disables its dynamic destination. Printed dynamic codes will stop opening. Direct/static downloads keep their original content.`))return;
    setDeleting(code.id);setError("");
    try{const res=await fetch(`/api/kr-codes/${code.id}`,{method:"DELETE"});if(!res.ok)throw new Error("The code wasn’t deleted. Please try again.");setCodes(all=>all.filter(item=>item.id!==code.id));setNotice("Code deleted.");}
    catch(err){setError(err instanceof Error?err.message:"Could not delete this code.");}finally{setDeleting(null);}
  }
  const transition={duration:reducedMotion?0:.22,ease:"easeOut" as const};
  return <section className={`${styles.studio} ${library.library}`}>
    <header className={library.header}>
      <div><div className={library.eyebrow}><QrCode size={16}/> YOUR LIBRARY</div><h1>Your QR codes.</h1><p>Every design, destination and connection. In one place.</p></div>
      <Link href="/kr-codes" className={styles.primaryButton}><Plus size={17}/> Create code</Link>
    </header>
    {notice&&<div role="status" className={library.notice}><Check size={17}/><span>{notice}</span><button aria-label="Dismiss notification" onClick={()=>setNotice("")}><X size={17}/></button></div>}
    {error&&<div className={styles.error} role="alert">{error}</div>}
    {pendingDraft&&<motion.div className={library.recovery} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={transition}>
      <div className={library.draftArt}><QRArtwork value={draftValue} design={pendingDraft.design}/></div>
      <div className={library.recoveryText}><span><Clock3 size={14}/> {pendingDraft.exportedAt?"Recent download":"Unfinished design"} · in this browser</span><h2>{draftName}</h2><p>This design isn’t saved in your library yet. Keep it here without changing its QR destination.</p></div>
      <div className={library.recoveryActions}><Link href="/kr-codes" className={styles.secondaryButton}>Continue editing</Link>{state==="ready"?<button className={styles.primaryButton} onClick={recoverDraft} disabled={recovering}>{recovering?<Loader2 className={styles.spinner} size={16}/>:<Plus size={16}/>} {recovering?"Saving…":"Save to library"}</button>:state==="guest"?<Link href="/signin?callbackUrl=%2Fkr-codes%2Fyour" className={styles.primaryButton}>Sign in to save</Link>:null}</div>
    </motion.div>}
    {state==="loading"?<div className={library.skeletons} role="status" aria-label="Loading your QR codes">{Array.from({length:5},(_,i)=><div key={i}><i/><span/><span/></div>)}</div>:state==="guest"?<div className={library.empty}><div className={library.emptyIcon}><QrCode size={30}/></div><h2>Keep your codes together.</h2><p>Sign in to save your designs, find previous downloads and follow your scans.</p><Link className={styles.primaryButton} href="/signin?callbackUrl=%2Fkr-codes%2Fyour">Sign in</Link></div>:state==="error"?<div className={library.empty}><button className={styles.secondaryButton} onClick={load}>Try again</button></div>:<>
      <div className={library.overview}><div><QrCode size={18}/><strong>{codes.length.toLocaleString()}</strong><span>saved codes</span></div><div><BarChart3 size={18}/><strong>{codes.reduce((sum,code)=>sum+(code.totalClicks||0),0).toLocaleString()}</strong><span>tracked scans</span></div><div><span className={library.statusDot}/><strong>{dynamic.toLocaleString()}</strong><span>dynamic codes</span></div><button onClick={load} disabled={refreshing} aria-label="Refresh your codes" title="Refresh library"><RefreshCw size={17} className={refreshing?styles.spinner:undefined}/><span>Refresh</span></button></div>
      <div className={library.controls}>
        <div className={library.toolbar}>
          <label className={library.search}><Search size={18}/><input aria-label="Search your codes" placeholder="Search names or destinations…" value={query} onChange={event=>setQuery(event.target.value)}/>{query&&<button aria-label="Clear search" onClick={()=>setQuery("")}><X size={16}/></button>}</label>
          <div className={library.filterTabs} aria-label="Code tracking filter">{[{value:"all",label:"All codes",count:codes.length},{value:"dynamic",label:"Dynamic",count:dynamic},{value:"direct",label:"Direct",count:codes.length-dynamic}].map(item=><button key={item.value} aria-pressed={kind===item.value} onClick={()=>setKind(item.value)}>{item.label}<span>{item.count}</span></button>)}</div>
        </div>
        <div className={library.filterRow}>
          <label className={library.select}><ArrowUpDown size={16}/><span className={library.srOnly}>Sort codes</span><select aria-label="Sort codes" value={sort} onChange={event=>setSort(event.target.value as KRLibrarySort)}>{KR_SORT_OPTIONS.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown size={15}/></label>
          <button className={library.filterButton} aria-expanded={datesOpen} aria-controls="qr-date-filters" data-active={Boolean(dateFrom||dateTo)} onClick={()=>setDatesOpen(value=>!value)}><CalendarDays size={16}/>{dateFrom||dateTo?"Date range applied":"Date created"}<ChevronDown size={15}/></button>
          <label className={library.select}><span className={library.srOnly}>Content type</span><select aria-label="Content type" value={type} onChange={event=>setType(event.target.value)}><option value="all">All types</option>{Object.entries(KR_TYPE_NAMES).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select><ChevronDown size={15}/></label>
          {activeFilters&&<button className={library.clearButton} onClick={clearFilters}><X size={14}/> Clear filters</button>}
          <div className={library.viewSwitch} aria-label="Library layout"><button aria-label="List view" aria-pressed={view==="list"} onClick={()=>changeView("list")}><List size={18}/></button><button aria-label="Grid view" aria-pressed={view==="grid"} onClick={()=>changeView("grid")}><Grid2X2 size={17}/></button></div>
        </div>
        <AnimatePresence initial={false}>{datesOpen&&<motion.div id="qr-date-filters" className={library.dateFilters} initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={transition}><div><span>Created between</span><input type="date" aria-label="Created from" value={dateFrom} max={dateTo||undefined} onChange={event=>setDateFrom(event.target.value)}/><span>and</span><input type="date" aria-label="Created to" value={dateTo} min={dateFrom||undefined} onChange={event=>setDateTo(event.target.value)}/><div className={library.datePresets}><button onClick={()=>datePreset(7)}>Last 7 days</button><button onClick={()=>datePreset(30)}>Last 30 days</button><button onClick={()=>datePreset(null)}>All time</button></div></div></motion.div>}</AnimatePresence>
      </div>
      <div className={library.resultBar}><span aria-live="polite">{filtered.length.toLocaleString()} {filtered.length===1?"code":"codes"}{activeFilters?` of ${codes.length}`:""}</span><span>{KR_SORT_OPTIONS.find(option=>option.value===sort)?.label}</span></div>
      {!filtered.length?<div className={library.empty}><div className={library.emptyIcon}><Search size={28}/></div><h2>{codes.length?"No codes found.":"Your next connection starts here."}</h2><p>{codes.length?"Try a different search, date range or content type.":"Create your first code. Saving or downloading it while signed in adds it to this library."}</p>{codes.length?<button className={styles.secondaryButton} onClick={clearFilters}>Clear filters</button>:<Link href="/kr-codes" className={styles.primaryButton}><Plus size={17}/> Create your first code</Link>}</div>:<div className={library.collection} data-view={view}>
        {view==="list"&&<div className={library.columnHeadings}><span>Code</span><button className={library.created} onClick={()=>setSort(sort==="newest"?"oldest":"newest")}>Created {sort==="oldest"?<ArrowUp size={14}/>:<ArrowDown size={14}/>}</button><button className={library.updated} onClick={()=>setSort(sort==="updated"?"updated-oldest":"updated")}>Last edited {sort==="updated-oldest"?<ArrowUp size={14}/>:<ArrowDown size={14}/>}</button><button className={library.activity} onClick={()=>setSort("scans")}>Scans <ArrowDown size={14}/></button><span className={library.srOnly}>Actions</span></div>}
        <motion.div className={library.codes} layout={!reducedMotion} transition={transition}>
          <AnimatePresence initial={false}>{filtered.map(code=>{
            const name=krCodeName(code),design=normalizeKRStyle(code.style);
            return <motion.article key={code.id} layout={reducedMotion?false:"position"} initial={{opacity:0,y:7}} animate={{opacity:deleting===code.id ? .45 : 1,y:0}} exit={{opacity:0,y:-5}} transition={transition} className={library.code}>
              <Link className={library.art} data-transparent={design.bg==="transparent"} href={`/kr-codes?krcodeId=${code.id}`} aria-label={`Open ${name}`}><QRArtwork value={code.destination} design={design}/></Link>
              <div className={library.details}><div className={library.nameRow}><h2><Link href={`/kr-codes?krcodeId=${code.id}`}>{name}</Link></h2><span className={library.badge} data-dynamic={Boolean(code.shortCodeId)}>{code.shortCodeId?"Dynamic":"Direct"}</span></div><p title={krDestinationLabel(code)}>{krDestinationLabel(code)}</p><span className={library.contentType}>{KR_TYPE_NAMES[code.type||"url"]||"QR code"}</span><div className={library.mobileMeta}>{dateLabel(code.createdAt)}<span>·</span>{code.shortCodeId?`${code.totalClicks||0} scans`:"Direct code"}</div></div>
              <div className={library.created}><span className={library.cellLabel}>Created</span><time dateTime={code.createdAt}>{dateLabel(code.createdAt)}</time></div>
              <div className={library.updated}><time dateTime={code.updatedAt||code.createdAt} title={new Date(code.updatedAt||code.createdAt).toLocaleString()}>{editedLabel(code.updatedAt||code.createdAt)}</time></div>
              <div className={library.activity}><span className={library.cellLabel}>Scans</span>{code.shortCodeId?<Link href={`/kr-codes/${code.id}`} aria-label={`View ${name} analytics`}><BarChart3 size={14}/>{(code.totalClicks||0).toLocaleString()}</Link>:<span title="Direct codes do not track scans">—</span>}</div>
              <CodeActions code={code} busy={deleting===code.id} onDelete={()=>void remove(code)}/>
            </motion.article>;
          })}</AnimatePresence>
        </motion.div>
      </div>}
    </>}
  </section>;
}
