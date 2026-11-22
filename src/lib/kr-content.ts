export const KR_TYPES = ["url","file","social","app","sms","email","phone","text","wifi","location"] as const;
export type KRType = typeof KR_TYPES[number];
export type KRContent = Record<string,string>;
export const isWebType = (type: string) => ["url","file","social","app","location"].includes(type);
const wifiEscape = (s: string) => s.replace(/([\\;,:" ])/g, "\\$1");

export function buildKRContent(type: KRType, fields: KRContent): {value:string;error?:string} {
  const get=(key:string)=>(fields[key] || "").trim();
  if (["url","file","social","app"].includes(type)) {
    if (!get("destination")) return {value:"",error:"Add a destination to create your code."};
    try {
      const raw=get("destination");
      const u=new URL(/^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`);
      if (!["http:","https:"].includes(u.protocol) || !u.hostname.includes(".")) throw new Error();
      for (const key of ["source","medium","campaign","term","content"]) if (get(`utm_${key}`)) u.searchParams.set(`utm_${key}`,get(`utm_${key}`));
      return {value:u.toString()};
    } catch { return {value:"",error:"Enter a valid website URL, such as yoursite.com."}; }
  }
  if (type === "location") return get("location") ? {value:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(get("location"))}`} : {value:"",error:"Add an address or coordinates."};
  if (type === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) return {value:"",error:"Enter a valid email address."};
    const parts=[ ["subject",get("subject")],["body",fields.body || ""] ].filter(([,v])=>v).map(([k,v])=>`${k}=${encodeURIComponent(v)}`).join("&");
    return {value:`mailto:${get("email")}${parts ? `?${parts}` : ""}`};
  }
  if (type === "sms" || type === "phone") {
    const phone=get("phone").replace(/[\s().-]/g,"");
    if (!/^\+?\d{5,15}$/.test(phone)) return {value:"",error:"Enter a phone number, including the country code."};
    return {value:type === "phone" ? `tel:${phone}` : `sms:${phone}${fields.body ? `?body=${encodeURIComponent(fields.body)}` : ""}`};
  }
  if (type === "wifi") {
    if (!get("ssid")) return {value:"",error:"Enter your Wi-Fi network name."};
    const security=fields.security || "WPA";
    if (security !== "nopass" && !fields.password) return {value:"",error:"Add your Wi-Fi password or select an open network."};
    return {value:`WIFI:T:${security};S:${wifiEscape(fields.ssid)};${security === "nopass" ? "" : `P:${wifiEscape(fields.password)};`}${fields.hidden === "true" ? "H:true;" : ""};`};
  }
  return get("text") ? {value:fields.text} : {value:"",error:"Add the text your code should contain."};
}

export function readKRContent(type: KRType, value: string): KRContent {
  if (["url","file","social","app"].includes(type)) return {destination:value};
  if (type === "location") { try {return {location:new URL(value).searchParams.get("query") || value};} catch {return {location:value};} }
  if (type === "text") return {text:value};
  if (type === "phone") return {phone:value.replace(/^tel:/,"")};
  if (type === "sms" || type === "email") {
    const [address,query]=value.split("?"); const params=new URLSearchParams(query || "");
    return {[type === "email" ? "email" : "phone"]:address.replace(/^(mailto|sms):/,""),subject:params.get("subject") || "",body:params.get("body") || ""};
  }
  const fields:KRContent={};
  const map:Record<string,string>={T:"security",S:"ssid",P:"password",H:"hidden"};
  const pattern=/(?:WIFI:|;)([TSPH]):((?:\\.|[^;])*)/g;
  for (const match of value.matchAll(pattern)) fields[map[match[1]]]=match[2].replace(/\\(.)/g,"$1");
  return fields;
}
