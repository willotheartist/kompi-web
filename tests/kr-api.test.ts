/* eslint-disable @typescript-eslint/no-explicit-any -- VM fixtures intentionally implement only the Prisma methods exercised by each route. */
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import * as planLimits from '../src/lib/plan-limits';
import * as apiErrors from '../src/lib/api-errors';
import {DEFAULT_KR_STYLE,KRStyleSchema} from '../src/lib/kr-design';
const require=createRequire(import.meta.url);
const source=ts.transpileModule(readFileSync(new URL('../src/app/api/kr-codes/route.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function harness({failCreate=false,unauthorized=false,plan="CREATOR",initialCount=0}={}) {
  let codes:any[]=[],links:any[]=[];
  class KnownError extends Error {code='P2002';}
  const prisma:any={
    $executeRaw:async()=>0,
    kRCode:{
      findFirst:async({where}:any)=>codes.find(row=>Object.entries(where).every(([key,value])=>row[key]===value))||null,
      findMany:async()=>codes,
      count:async()=>codes.length+initialCount,
      create:async({data}:any)=>{
        if(failCreate)throw new Error('Simulated write failure');
        if(codes.some(code=>code.id===data.id))throw new KnownError('Duplicate');
        const row={...data,id:data.id||'generated',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};codes.push(row);return row;
      },
    },
    link:{findFirst:async()=>null,findUnique:async({where}:any)=>links.find(row=>row.id===where.id)||null,create:async({data}:any)=>{const row={...data,id:`link-${links.length+1}`};links.push(row);return row;}},
    clickEvent:{groupBy:async()=>[]},
  };
  prisma.$transaction=async(fn:any)=>{const oldCodes=[...codes],oldLinks=[...links];try{return await fn(prisma);}catch(error){codes=oldCodes;links=oldLinks;throw error;}};
  const exports:any={};
  const mocks:Record<string,any>={
    '@/lib/plan-limits':planLimits, '@/lib/api-errors':apiErrors, '@/lib/prisma':{prisma},'@/lib/kr-design':{DEFAULT_KR_STYLE,KRStyleSchema},
    '@/lib/auth':{requireUser:async()=>{if(unauthorized)throw {digest:'NEXT_REDIRECT;replace;/signin;307;'};return {id:'owner'};},getActiveWorkspace:async()=>({id:'workspace',plan})},
    '@/lib/url-safety':{checkUrlSafety:async()=>({ok:true})},'@/lib/abuse':{checkLinkCreationAllowed:async()=>null},
    '@prisma/client':{Prisma:{PrismaClientKnownRequestError:KnownError}},
  };
  vm.runInNewContext(source,{exports,require:(name:string)=>name in mocks?mocks[name]:require(name),process:{env:{NEXT_PUBLIC_APP_URL:'https://kompi.app'}},console:{error:()=>{}},URL,Response,Request,Date,Math});
  return {post:(body:any)=>exports.POST(new Request('https://kompi.app/api/kr-codes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})),rows:()=>({codes,links})};
}
const payload={destination:'https://her-hour.com/',type:'url',title:'Her Hour',createShortLink:true,clientRequestId:'ef7a0123-f773-4732-8027-04589d721142',style:{...DEFAULT_KR_STYLE,fg:'#2A1F1C',bg:'transparent'}};
test('save-and-download creation returns its persisted tracked URL and retries reuse one code',async()=>{
  const app=harness();const first=await app.post(payload);assert.equal(first.status,201);
  const saved=await first.json();assert.match(saved.destination,/^https:\/\/kompi.app\/r\//);assert.equal(saved.targetUrl,payload.destination);assert.equal(saved.style.bg,'transparent');
  const retry=await app.post(payload);assert.equal(retry.status,200);assert.equal((await retry.json()).id,saved.id);
  assert.equal(app.rows().codes.length,1);assert.equal(app.rows().links.length,1);
});
test('recovering an old direct export preserves its existing QR payload',async()=>{
  const app=harness();const response=await app.post({...payload,createShortLink:false});assert.equal(response.status,201);
  const saved=await response.json();assert.equal(saved.destination,payload.destination);assert.equal(saved.shortCodeId,null);assert.equal(app.rows().links.length,0);
});
test('a failed save rolls back the new tracking link and never reports success',async()=>{
  const app=harness({failCreate:true});assert.equal((await app.post(payload)).status,400);
  assert.deepEqual(app.rows(),{codes:[],links:[]});
});
test('saving still requires authentication and a valid idempotency key',async()=>{
  assert.equal((await harness({unauthorized:true}).post(payload)).status,401);
  assert.equal((await harness().post({...payload,clientRequestId:'bad-id'})).status,400);
});

test('Free limits reject a sixth QR without creating a backing link',async()=>{
 const app=harness({plan:'FREE',initialCount:5}); assert.equal((await app.post(payload)).status,402); assert.deepEqual(app.rows(),{codes:[],links:[]});
});
test('paid tiers enforce their own saved-code allowances',async()=>{
 for(const [plan,initialCount] of [['STARTER',25],['CREATOR',100],['BUSINESS',1000]] as const) assert.equal((await harness({plan,initialCount}).post(payload)).status,402);
});
test('a retry still returns the saved code at the plan limit',async()=>{
 const app=harness({plan:'FREE',initialCount:4}); const first=await app.post(payload); assert.equal(first.status,201); const retry=await app.post(payload);assert.equal(retry.status,200);assert.equal(app.rows().codes.length,1);
});
