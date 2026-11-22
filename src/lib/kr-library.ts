import { buildKRContent, isWebType, KR_TYPES, type KRContent, type KRType } from "./kr-content";
import { normalizeKRStyle, type KRStyle } from "./kr-design";

export type LibraryKRCode = { id:string; title:string|null; destination:string; targetUrl?:string; shortCodeId:string|null; type:string|null; style:unknown; totalClicks:number; createdAt:string; updatedAt:string };
export type KRLibrarySort = "newest"|"oldest"|"updated"|"updated-oldest"|"scans"|"name";
export const KR_SORT_OPTIONS: {value:KRLibrarySort;label:string}[] = [
  {value:"newest",label:"Newest first"},{value:"oldest",label:"Oldest first"},
  {value:"updated",label:"Recently edited"},{value:"updated-oldest",label:"Least recently edited"},
  {value:"scans",label:"Most scans"},{value:"name",label:"Name A–Z"},
];
export const KR_TYPE_NAMES: Record<string,string> = {url:"Website",file:"PDF / file",social:"Social",app:"App",wifi:"Wi-Fi",email:"Email",sms:"SMS",phone:"Phone",text:"Text",location:"Location"};
export const KR_DRAFT_KEY = "kompi-qr-draft-v2";
export type KRLocalDraft = {title:string;type:KRType;content:KRContent;design:KRStyle;requestId?:string;exportedAt?:string;updatedAt?:string};

export function krCodeName(code: Pick<LibraryKRCode,"title"|"type"|"destination"|"targetUrl">) {
  if (code.title?.trim()) return code.title;
  if (isWebType(code.type || "url")) {
    try { return new URL(code.targetUrl || code.destination).hostname.replace(/^www\./,""); } catch { /* Legacy non-URL content. */ }
  }
  return `${KR_TYPE_NAMES[code.type || "url"] || "QR"} code`;
}
export function krDestinationLabel(code: Pick<LibraryKRCode,"type"|"destination"|"targetUrl">) {
  if(code.type==="wifi")return "Wi-Fi network";
  if(code.type==="text")return "Text content";
  return code.targetUrl || code.destination;
}
const timestamp=(date:string)=>new Date(date).getTime() || 0;
export function selectKRCodes(codes:LibraryKRCode[],options:{query:string;kind:string;type:string;sort:KRLibrarySort;dateFrom:string;dateTo:string}) {
  const query=options.query.trim().toLowerCase();
  const from=options.dateFrom ? new Date(`${options.dateFrom}T00:00:00`).getTime() : -Infinity;
  const to=options.dateTo ? new Date(`${options.dateTo}T23:59:59.999`).getTime() : Infinity;
  return codes.filter(code=>{
    const created=timestamp(code.createdAt);
    return (options.kind==="all" || (options.kind==="dynamic" ? Boolean(code.shortCodeId) : !code.shortCodeId))
      && (options.type==="all" || (code.type || "url")===options.type)
      && created>=from && created<=to
      && (!query || `${krCodeName(code)} ${krDestinationLabel(code)} ${KR_TYPE_NAMES[code.type || "url"] || ""}`.toLowerCase().includes(query));
  }).sort((a,b)=>{
    let order=0;
    switch(options.sort){
      case "oldest":order=timestamp(a.createdAt)-timestamp(b.createdAt);break;
      case "updated":order=timestamp(b.updatedAt||b.createdAt)-timestamp(a.updatedAt||a.createdAt);break;
      case "updated-oldest":order=timestamp(a.updatedAt||a.createdAt)-timestamp(b.updatedAt||b.createdAt);break;
      case "scans":order=(b.totalClicks||0)-(a.totalClicks||0);break;
      case "name":order=krCodeName(a).localeCompare(krCodeName(b),undefined,{numeric:true,sensitivity:"base"});break;
      default:order=timestamp(b.createdAt)-timestamp(a.createdAt);
    }
    return order || timestamp(b.createdAt)-timestamp(a.createdAt) || a.id.localeCompare(b.id);
  });
}
export function krDesignSnapshot(title:string|null,type:string,destination:string,style:unknown) {
  return JSON.stringify({title:title?.trim()||null,type,destination,style:normalizeKRStyle(style)});
}
/** Only website drafts are recoverable; never retain Wi-Fi passwords or message bodies. */
export function readKRLocalDraft(raw:string|null):KRLocalDraft|null {
  try {
    const value=JSON.parse(raw||"null");
    if(!value || !KR_TYPES.includes(value.type) || !isWebType(value.type) || !value.content || typeof value.content!=="object")return null;
    const content=Object.fromEntries(Object.entries(value.content).filter(([,v])=>typeof v==="string" && v.length<=1800)) as KRContent;
    const built=buildKRContent(value.type,content);
    if(!built.value || built.error || built.value.length>1800)return null;
    return {title:typeof value.title==="string"?value.title.slice(0,120):"",type:value.type,content,design:normalizeKRStyle(value.design),
      requestId:typeof value.requestId==="string"&&/^[0-9a-f-]{36}$/i.test(value.requestId)?value.requestId:undefined,
      exportedAt:typeof value.exportedAt==="string"?value.exportedAt:undefined,updatedAt:typeof value.updatedAt==="string"?value.updatedAt:undefined};
  } catch {return null;}
}
export function draftMatchesKRCode(draft:KRLocalDraft,code:LibraryKRCode) {
  return krDesignSnapshot(draft.title,draft.type,buildKRContent(draft.type,draft.content).value,draft.design)===krDesignSnapshot(code.title,code.type||"url",code.targetUrl||code.destination,code.style);
}
