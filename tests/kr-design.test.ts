import assert from 'node:assert/strict';
import { test } from 'node:test';
import sharp from 'sharp';
import jsQR from 'jsqr';
import { DEFAULT_KR_STYLE, KR_PRESETS, KRStyleSchema, presetStyle, normalizeKRStyle, designChecks } from '../src/lib/kr-design';
import { renderKRSvg } from '../src/lib/kr-render';
import { buildKRContent, readKRContent } from '../src/lib/kr-content';

async function decode(svg: string) {
  const {data,info} = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  return jsQR(new Uint8ClampedArray(data),info.width,info.height)?.data;
}
const payloads = ['https://kompi.app/r/AbC123','https://example.com/a-longer-destination?utm_source=business-card&utm_campaign=launch','WIFI:T:WPA;S:Studio;P:correct-horse;H:true;;'];
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
