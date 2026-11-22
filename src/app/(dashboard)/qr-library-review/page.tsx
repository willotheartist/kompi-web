import QRLibrary from "@/components/kr-codes/QRLibrary";
export const dynamic="force-dynamic";
export default async function Page({searchParams}:{searchParams:Promise<{width?:string}>}) {
const value=Number((await searchParams).width),width=[390,760,1200].includes(value)?value:1200;
return <><nav style={{display:"flex",gap:16,fontSize:14,marginBottom:24}}><span>Synthetic review</span><a href="?width=1200">Desktop</a><a href="?width=760">Tablet</a><a href="?width=390">Mobile</a></nav><div style={{width,maxWidth:"100%",margin:"0 auto"}}><QRLibrary/></div></>;
}