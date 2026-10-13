/* Executar da raiz. Usa os arquivos reais em um servidor virtual do Playwright,
   independente de permissões de loopback; PREVIEW_URL permite conferir a publicação. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),out=path.join(root,'auditoria','eoraptor','depois');fs.mkdirSync(out,{recursive:true});
const remote=process.env.PREVIEW_URL,base=remote||'http://mesozoico.local/';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--no-proxy-server']});const results=[];
 for(const [width,height] of [[1440,900],[390,844],[360,740]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:width<800,isMobile:width<800,recordVideo:{dir:out,size:{width,height}}});
  if(!remote)await context.route(base+'**',async r=>{const u=new URL(r.request().url());const file=path.resolve(root,'site','.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));assert(file.startsWith(path.join(root,'site')+path.sep));await r.fulfill({path:file});});
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'?eoraptor=review#eoraptor');await p.waitForTimeout(1600);
  assert.equal(await p.locator('#niche').getAttribute('data-view'),'skel');
  await p.locator('#figBox').scrollIntoViewIfNeeded();
  await p.screenshot({path:path.join(out,`${width}-esqueleto.png`)});
  await p.evaluate(()=>{window.eoFrames=[];window.eoStop=false;const sample=()=>{const box=document.querySelector('#figBox'),a=document.querySelector('.fig-skel'),b=document.querySelector('.fig-life');window.eoFrames.push({time:performance.now(),bg:getComputedStyle(box).backgroundColor,skel:a.getBoundingClientRect().toJSON(),life:b.getBoundingClientRect().toJSON(),clipA:document.querySelector('#eoraptorSkelLayer').style.clipPath,clipB:document.querySelector('#eoraptorLifeLayer').style.clipPath});if(!window.eoStop)requestAnimationFrame(sample)};sample()});
  await p.waitForTimeout(2200);
  for(let i=0;i<16;i++){await p.screenshot({path:path.join(out,`${width}-auto-${i}.png`)});await p.waitForTimeout(65);}
  await p.waitForTimeout(400);assert.equal(await p.locator('#niche').getAttribute('data-view'),'life');
  await p.screenshot({path:path.join(out,`${width}-reconstrucao.png`)});
  const skel=p.locator('.fig-switch [data-view="skel"]'),life=p.locator('.fig-switch [data-view="life"]');
  await skel.click();await p.waitForTimeout(350);await life.click();await p.waitForTimeout(180);await skel.click();await p.waitForTimeout(1700);
  assert.equal(await p.locator('#eoraptorSkelLayer').evaluate(n=>n.style.clipPath),'inset(0px 0px 0px 0%)');
  for(let k=0;k<2;k++){
   if(width<800)await life.tap();else await life.click();
   for(let i=0;i<12;i++){await p.screenshot({path:path.join(out,`${width}-manual-${k}-${i}.png`)});await p.waitForTimeout(70);}
   await p.waitForTimeout(200);await skel.click();await p.waitForTimeout(1600);
  }
  await p.locator('.cap-v[data-for="skel"] [data-src]').click();await p.locator('#sources.open').waitFor();assert((await p.locator('#sources').innerText()).includes('PVSJ 512'));await p.locator('#closeSources').click();
  await p.locator('#next').click();await p.waitForTimeout(1700);await p.locator('#prev').click();await p.waitForTimeout(1700);assert.equal(await p.locator('#niche').getAttribute('data-view'),'skel');
  const frames=await p.evaluate(()=>{window.eoStop=true;return window.eoFrames});
  assert(frames.every(f=>f.bg==='rgba(0, 0, 0, 0)'));assert.equal(await p.locator('#niche').evaluate(n=>getComputedStyle(n).backgroundColor),'rgb(211, 208, 199)');assert(frames.every(f=>f.clipA!=='none'&&f.clipB!=='none'));
  assert(frames.every(f=>Math.abs(f.skel.width-frames[0].skel.width)<.1&&Math.abs(f.life.width-frames[0].life.width)<.1));
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(errors.length,0);
  await p.locator('#s-eoraptor .scroll').evaluate(n=>n.scrollTop=n.scrollHeight);await p.screenshot({path:path.join(out,`${width}-controles.png`)});
  await p.emulateMedia({reducedMotion:'reduce'});await p.reload();await p.waitForTimeout(500);assert.equal(await p.locator('#niche').getAttribute('data-view'),'life');await skel.click();assert.equal(await p.locator('#eoraptorLifeLayer').evaluate(n=>n.style.clipPath),'inset(0px 100% 0px 0px)');await life.click();
  await p.screenshot({path:path.join(out,`${width}-reduzido.png`)});
  const video=p.video();await context.close();await video.saveAs(path.join(out,`${width}-passagem.webm`));
  results.push({width,height,errors,automatic:true,manualRepeated:true,reverseDuringTransition:true,touch:width<800,remember:true,reducedMotion:true,frames});
 }
 await browser.close();fs.writeFileSync(path.join(out,'verificacao.json'),JSON.stringify(results,null,2));console.log('Eoraptor: três tamanhos, automática, manual repetida, reversão, toque, memória e movimento reduzido conferidos.');
})().catch(e=>{console.error(e);process.exit(1)});
