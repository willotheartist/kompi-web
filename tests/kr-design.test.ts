import assert from 'node:assert/strict';
import { test } from 'node:test';
import sharp from 'sharp';
import jsQR from 'jsqr';
import { DEFAULT_KR_STYLE, KR_PRESETS, KRStyleSchema, presetStyle, normalizeHexColor, normalizeKRStyle, designChecks } from '../src/lib/kr-design';
import { getKRExportDetails, renderKRSvg } from '../src/lib/kr-render';
import { DEFAULT_KR_EXPORT_WIDTH, resolveKRExportWidth, withKRPrintDensity } from '../src/lib/kr-export';
import { prepareKRLogo } from '../src/lib/kr-logo-image';
import { buildKRContent, readKRContent } from '../src/lib/kr-content';
import { KRLogoUploadSchema, mergeKRLogos, readDeviceLogos, recentDeviceLogos } from '../src/lib/kr-logos';

async function decode(svg: string) {
  const {data,info} = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  return jsQR(new Uint8ClampedArray(data),info.width,info.height)?.data;
}
const payloads = ['https://kompi.app/r/AbC123','https://example.com/a-longer-destination?utm_source=business-card&utm_campaign=launch','WIFI:T:WPA;S:Studio;P:correct-horse;H:true;;'];
test('high-resolution exports ignore old preview sizes and keep vector geometry',async()=>{
  const legacy=normalizeKRStyle({...DEFAULT_KR_STYLE,size:512,bg:'transparent',frameVariant:'label-bottom'});
  assert.equal(DEFAULT_KR_EXPORT_WIDTH,4096);
  for(const width of [undefined,null,'','512','999999','NaN']) assert.equal(resolveKRExportWidth(width),4096);
  for(const width of [1024,2048,4096,8192]) {
    assert.equal(resolveKRExportWidth(String(width)),width);
    const svg=renderKRSvg(payloads[0],legacy,resolveKRExportWidth(width));
    const details=getKRExportDetails(payloads[0],legacy,width);
    assert.ok(svg.includes(`width="${width}" height="${details.height}"`));
    assert.ok(svg.includes('<path '));assert.ok(!svg.includes('<image '));
  }
  const svg=renderKRSvg(payloads[0],legacy,resolveKRExportWidth());
  const original=await sharp(Buffer.from(svg)).png().toBuffer();
  const result=withKRPrintDensity(original);
  const metadata=await sharp(result).metadata();
  assert.equal(metadata.width,4096);assert.ok(metadata.height!>4096);
  assert.equal(metadata.density,300);assert.equal(metadata.hasAlpha,true);
  // Metadata editing must not resample the artwork or flatten transparency.
  const [before,after]=await Promise.all([sharp(original).raw().toBuffer(),sharp(result).raw().toBuffer()]);
  assert.deepEqual(after,before);assert.equal(after[3],0);
  const flattened=await sharp(result).resize({width:512}).flatten({background:'#FFFFFF'}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(jsQR(new Uint8ClampedArray(flattened.data),flattened.info.width,flattened.info.height)?.data,payloads[0]);
  const withExistingDensity=await sharp(original).withMetadata({density:96}).png().toBuffer();
  assert.equal((await sharp(withKRPrintDensity(withExistingDensity)).metadata()).density,300);
  assert.throws(()=>withKRPrintDensity(new Uint8Array([1,2,3])));
});
test('logos keep print detail through processing, save validation and browser reuse',async()=>{
  for(const [source,expected] of [[384,384],[1536,1536],[2400,2048]]) {
    const input=await sharp({create:{width:source,height:source/2,channels:4,background:'#135647'}}).png().toBuffer();
    const prepared=await prepareKRLogo(input);
    const metadata=await sharp(prepared.bytes).metadata();
    assert.equal(metadata.width,expected);assert.equal(metadata.height,expected/2);
    const style=normalizeKRStyle(JSON.parse(JSON.stringify(KRStyleSchema.parse({logoUrl:prepared.dataUrl,logoEnabled:true,size:8192}))));
    assert.equal(style.logoUrl,prepared.dataUrl);assert.equal(style.size,8192);
    const logo={id:'hires',name:'High resolution.png',dataUrl:prepared.dataUrl,source:'device' as const};
    assert.deepEqual(readDeviceLogos(JSON.stringify(recentDeviceLogos([logo]))),[logo]);
  }
  // Full-size uploads must fit the recent library instead of being silently omitted.
  const large={id:'large',name:'Large.png',dataUrl:`data:image/png;base64,${'A'.repeat(2_700_000)}`,source:'device' as const};
  assert.equal(KRLogoUploadSchema.safeParse(large).success,true);
  assert.equal(KRStyleSchema.safeParse({logoUrl:large.dataUrl}).success,true);
  assert.equal(readDeviceLogos(JSON.stringify(recentDeviceLogos([large])))[0].dataUrl,large.dataUrl);
  await assert.rejects(()=>prepareKRLogo(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>')));
});
test('custom hex colours survive save validation, reload and export',()=>{
  for (const input of ['2A1F1C','#2A1F1C','2a1f1c','  #2a1f1c  ']) assert.equal(normalizeHexColor(input),'#2A1F1C');
  assert.equal(normalizeHexColor('#abc'),'#AABBCC');
  for (const input of ['', '12', '12345', 'GGGGGG', '##2A1F1C']) assert.equal(normalizeHexColor(input),null);
  const saved=KRStyleSchema.parse({fg:'2a1f1c',eyeColor:'  #135647  ',bg:'fff',frameColor:'293341'});
  const restored=normalizeKRStyle(JSON.parse(JSON.stringify(saved)));
  assert.equal(restored.fg,'#2A1F1C');assert.equal(restored.eyeColor,'#135647');
  assert.equal(restored.bg,'#FFFFFF');assert.equal(restored.frameColor,'#293341');
  const svg=renderKRSvg(payloads[0],restored);
  assert.ok(svg.includes('fill="#2A1F1C"'));assert.ok(svg.includes('fill="#135647"'));
  assert.equal(KRStyleSchema.safeParse({eyeColor:'wrong'}).success,false);
});
test('transparent backgrounds preserve alpha with every frame and a logo',async()=>{
  const logo=await sharp({create:{width:64,height:64,channels:4,background:'#135647'}}).png().toBuffer();
  for (const frameVariant of ['none','outline','label-bottom','label-top','ticket'] as const) {
    for (const logoUrl of [null,`data:image/png;base64,${logo.toString('base64')}`]) {
      const style={...DEFAULT_KR_STYLE,bg:'transparent',frameVariant,logoUrl,logoEnabled:Boolean(logoUrl)};
      const restored=normalizeKRStyle(JSON.parse(JSON.stringify(KRStyleSchema.parse(style))));
      assert.equal(restored.bg,'transparent');
      const svg=renderKRSvg(payloads[0],restored,512);
      const {data,info}=await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      // The inner quiet zone must be transparent even inside a solid frame.
      const y=frameVariant==='label-top'?Math.round(info.height*.23):Math.round(info.height*.1);
      assert.equal(data[(y*info.width+Math.round(info.width*.1))*4+3],0,`${frameVariant}: clear quiet zone`);
      if(logoUrl){
        // No opaque white logo backing is allowed in a transparent export.
        for(let i=0;i<data.length;i+=4) assert.ok(!(data[i]===255&&data[i+1]===255&&data[i+2]===255&&data[i+3]===255&&Math.floor(i/4/info.width)<info.height*.75&&Math.floor(i/4/info.width)>info.height*.25),`${frameVariant}: white patch behind logo`);
      }
      const white=await sharp(Buffer.from(svg)).flatten({background:'#FFFFFF'}).png().toBuffer();
      const {data:pixels,info:flat}=await sharp(white).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      assert.equal(jsQR(new Uint8ClampedArray(pixels),flat.width,flat.height)?.data,payloads[0],`${frameVariant}: scan on light background`);
    }
  }
});
test('reusable logos survive browser storage and reject active content',()=>{
  const a={id:'one',name:'Brand.png',dataUrl:'data:image/png;base64,YQ==',source:'device' as const};
  const b={...a,id:'two',name:'Second.png',dataUrl:'data:image/png;base64,Yg=='};
  assert.deepEqual(readDeviceLogos(JSON.stringify([a,b])),[a,b]);
  assert.equal(mergeKRLogos([a],[{...a,id:'duplicate'},b]).length,2);
  assert.equal(recentDeviceLogos(Array.from({length:20},(_,i)=>({...a,id:String(i),dataUrl:`data:image/png;base64,${i}`}))).length,12);
  for(const dataUrl of ['javascript:alert(1)','data:image/svg+xml;base64,PHN2Zz4=','https://example.com/logo.png'])assert.equal(KRLogoUploadSchema.safeParse({...a,dataUrl}).success,false);
  assert.deepEqual(readDeviceLogos('broken'),[]);
  assert.deepEqual(readDeviceLogos(JSON.stringify([{...a,dataUrl:'javascript:alert(1)'}])),[]);
});
for (const preset of KR_PRESETS) for (const width of [256,512]) {
  test(`${preset.name} at ${width}px decodes real content`,async()=>{
    for (const payload of payloads) assert.equal(await decode(renderKRSvg(payload,presetStyle(preset),width)),payload);
  });
}
test('logos retain decodeability at maximum supported size',async()=>{
  const png=await sharp({create:{width:80,height:80,channels:4,background:'#883852'}}).png().toBuffer();
  for (const preset of KR_PRESETS) {
    const design={...presetStyle(preset),logoEnabled:true,logoUrl:`data:image/png;base64,${png.toString('base64')}`,logoSize:.22};
    for (const payload of payloads) assert.equal(await decode(renderKRSvg(payload,design,512)),payload,preset.name);
  }
});
test('save schema retains every design field',()=>{
  const style={...presetStyle(KR_PRESETS[8]),logoEnabled:true,logoSize:.2,frameLabel:'VIEW MENU',eyeColor:'#135647'};
  assert.deepEqual(KRStyleSchema.parse(style),Object.fromEntries(Object.entries(style).filter(([key])=>key in KRStyleSchema.shape)));
  assert.equal(normalizeKRStyle(style).frameVariant,'ticket');
});
test('SVG escapes labels and rejects active image URLs',()=>{
  assert.equal(KRStyleSchema.safeParse({logoUrl:'javascript:alert(1)'}).success,false);
  assert.equal(KRStyleSchema.safeParse({logoUrl:'data:image/svg+xml;base64,PHN2Zz4='}).success,false);
  const svg=renderKRSvg('hello',{...DEFAULT_KR_STYLE,frameVariant:'label-bottom',frameLabel:'<script>"&'});
  assert.ok(!svg.includes('<script>'));assert.ok(svg.includes('&lt;script&gt;'));
});
test('quiet zone stays at least four modules for legacy records',()=>{
  assert.equal(renderKRSvg('hello',{...DEFAULT_KR_STYLE,margin:0}),renderKRSvg('hello',{...DEFAULT_KR_STYLE,margin:4}));
});
test('content validation, Wi-Fi escaping and edit roundtrip',()=>{
  assert.equal(buildKRContent('url',{destination:'example.com'}).value,'https://example.com/');
  assert.ok(buildKRContent('url',{destination:'javascript:alert(1)'}).error);
  const fields={ssid:'Studio;"\\,',password:'a:b;\\c',security:'WPA',hidden:'true'};
  const value=buildKRContent('wifi',fields).value;
  assert.deepEqual(readKRContent('wifi',value),fields);
  const email=buildKRContent('email',{email:'hello@example.com',subject:'A & B',body:'hello\nworld'}).value;
  assert.equal(readKRContent('email',email).subject,'A & B');
  assert.equal(buildKRContent('sms',{phone:'+44 7700 900000',body:'hello & hi'}).value,'sms:+447700900000?body=hello%20%26%20hi');
});
test('scan feedback checks corner contrast and reversed colours',()=>{
  assert.equal(designChecks(DEFAULT_KR_STYLE).warnings.length,0);
  assert.ok(designChecks({...DEFAULT_KR_STYLE,eyeColor:'#EEEEEE'}).warnings.length);
  assert.ok(designChecks({...DEFAULT_KR_STYLE,fg:'#FFFFFF',bg:'#000000'}).warnings.length);
});
test('independent eye combinations decode across pattern styles',async()=>{
  const failures:string[]=[];
  for (const dotsType of ['square','dots','rounded','extra-rounded','classy','classy-rounded'] as const)
    for (const cornersSquareType of ['square','extra-rounded','dot'] as const)
      for (const cornersDotType of ['square','rounded','dot'] as const) {
        const style={...DEFAULT_KR_STYLE,dotsType,cornersSquareType,cornersDotType};
        for (const payload of payloads) for (const width of [256,512]) {
          if (await decode(renderKRSvg(payload,style,width)) !== payload) failures.push(`${dotsType}/${cornersSquareType}/${cornersDotType}/${width}/${payload}`);
        }
      }
  assert.deepEqual(failures,[]);
});
