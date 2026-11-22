import assert from 'node:assert/strict';
import {test} from 'node:test';
import {DEFAULT_KR_STYLE} from '../src/lib/kr-design';
import {draftMatchesKRCode, krCodeName, readKRLocalDraft, selectKRCodes, type LibraryKRCode} from '../src/lib/kr-library';
const base={title:null,destination:'https://example.com',targetUrl:'https://example.com',shortCodeId:null,type:'url',style:DEFAULT_KR_STYLE,totalClicks:0};
const codes:LibraryKRCode[]=[
  {...base,id:'early',title:'Code 2',createdAt:'2025-11-22T12:00:00Z',updatedAt:'2026-11-22T13:00:00Z'},
  {...base,id:'recent',title:'Code 10',createdAt:'2026-11-22T12:00:00Z',updatedAt:'2026-11-22T12:00:00Z',shortCodeId:'link',totalClicks:11},
  {...base,id:'middle',title:'Brand',createdAt:'2026-03-07T10:00:00Z',updatedAt:'2026-03-07T10:00:00Z',shortCodeId:'link2',totalClicks:3},
];
const defaults={query:'',kind:'all',type:'all',sort:'newest' as const,dateFrom:'',dateTo:''};
test('library sorts by actual dates, edits, scan counts and natural names without changing source order',()=>{
  for(const [sort,expected] of Object.entries({newest:['recent','middle','early'],oldest:['early','middle','recent'],updated:['early','recent','middle'],'updated-oldest':['middle','recent','early'],scans:['recent','middle','early'],name:['middle','early','recent']})){
    assert.deepEqual(selectKRCodes(codes,{...defaults,sort:sort as typeof defaults.sort}).map(code=>code.id),expected);
  }
  assert.deepEqual(codes.map(code=>code.id),['early','recent','middle']);
});
test('library combines search, tracking, type and inclusive local date boundaries',()=>{
  assert.deepEqual(selectKRCodes(codes,{...defaults,query:'CODE',kind:'dynamic',type:'url',dateFrom:'2026-11-22',dateTo:'2026-11-22'}).map(code=>code.id),['recent']);
  assert.equal(selectKRCodes(codes,{...defaults,kind:'direct'}).length,1);
  assert.equal(selectKRCodes(codes,{...defaults,type:'wifi'}).length,0);
  const edge={...codes[0],createdAt:new Date(2026,10,22,23,59,59,999).toISOString()};
  assert.equal(selectKRCodes([edge],{...defaults,dateFrom:'2026-11-22',dateTo:'2026-11-22'}).length,1);
  assert.equal(selectKRCodes([edge],{...defaults,dateFrom:'2026-11-23'}).length,0);
});
test('an exported website draft can be recovered exactly without changing its encoded URL',()=>{
  const raw={title:'Her Hour',type:'url',content:{destination:'https://her-hour.com/'},design:{...DEFAULT_KR_STYLE,bg:'transparent',fg:'#2A1F1C',eyeColor:'#2A1F1C'},exportedAt:'2026-11-22T13:25:00Z'};
  const draft=readKRLocalDraft(JSON.stringify(raw));assert.ok(draft);
  assert.equal(draft.design.bg,'transparent');assert.equal(draft.design.fg,'#2A1F1C');
  const restored={...codes[0],title:'Her Hour',destination:'https://her-hour.com/',targetUrl:'https://her-hour.com/',style:raw.design};
  assert.equal(draftMatchesKRCode(draft,restored),true);
  assert.equal(draftMatchesKRCode(draft,{...restored,style:{...raw.design,fg:'#000000'}}),false);
  assert.equal(krCodeName({...base,title:null,destination:'https://her-hour.com/',targetUrl:undefined}),'her-hour.com');
});
test('recovery never retains passwords, message content or invalid local data',()=>{
  for(const raw of ['{broken',JSON.stringify({type:'wifi',content:{ssid:'Private',password:'secret'}}),JSON.stringify({type:'text',content:{text:'Private note'}}),JSON.stringify({type:'url',content:{destination:'javascript:alert(1)'}})])assert.equal(readKRLocalDraft(raw),null);
});
