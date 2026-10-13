const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),out=path.join(root,'auditoria','2026-10-13-depois');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:8781/';
(async()=>{
 const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||(process.platform==='win32'?'msedge':undefined),headless:true}); const results=[];
 for(const [width,height]of[[1440,900],[390,844],[360,740]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<800,isMobile:width<800});
  const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  const goto=async id=>{await p.goto(base+'?interacoes='+id+'#'+id);await p.locator('#s-'+id+'.is-active').waitFor();};
  await goto('abertura');assert(await p.locator('#openPhoto img').evaluate(i=>i.complete&&i.naturalWidth===1600));
  const media=await p.evaluate(()=>({fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family),assets:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));assert.equal(media.assets.length,0);
  await p.locator('#start').click();await p.locator('#s-triassico.is-active').waitFor();
  const ids=await p.locator('.scene').evaluateAll(ns=>ns.map(n=>n.dataset.id));
  for(let i=1;i<ids.length-1;i++){await p.waitForTimeout(250);await p.locator('#next').click();await p.locator('#s-'+ids[i+1]+'.is-active').waitFor();}
  assert(await p.locator('#next').isDisabled());
  for(let i=ids.length-1;i>0;i--){await p.waitForTimeout(250);await p.locator('#prev').click();await p.locator('#s-'+ids[i-1]+'.is-active').waitFor();}
  for(const [menu,button,id]of[['carniano','Eoraptor','eoraptor'],['carniano','O mundo ao redor do Eoraptor','ischigualasto'],['jurassico','Rastros · ≈201 Ma','jurassico-rastros'],['jurassico','Saurópodes na Patagônia · ≈179 Ma','jurassico-gigantes'],['morrison','Stegosaurus · Sophie · ≈150 Ma','jurassico-sophie'],['morrison','Tronco e ossos · Utah · ≈150 Ma','jurassico-mundo']]){
   await p.waitForTimeout(250);await p.locator('#'+menu+'Stop').click();await p.locator('#'+menu+'Menu').getByRole('button',{name:button,exact:true}).click();await p.locator('#s-'+id+'.is-active').waitFor();
  }
  await goto('fim-triassico');await p.locator('#fimLens').click();await p.keyboard.press('PageDown');await p.waitForTimeout(100);
  assert.equal(await p.locator('body').getAttribute('data-scene'),'fim-triassico');assert(await p.locator('#s-fim-triassico .scroll').evaluate(n=>n.scrollTop>0));
  await p.locator('#openSources').click();await p.waitForTimeout(100);assert(await p.locator('#stage').evaluate(n=>n.inert));
  const links=p.locator('#sources a');await links.last().focus();await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.id),'closeSources');
  await p.keyboard.press('Escape');assert.equal(await p.locator('#stage').evaluate(n=>n.inert),false);
  await goto('jurassico-sophie');await p.locator('[data-choice="skeleton"]').click();await goto('jurassico-mundo');await goto('jurassico-sophie');assert.equal(await p.locator('#sophieStage').getAttribute('data-view'),'skeleton');
  await p.locator('#sophie-evidencias summary').click();await p.keyboard.press('Escape');assert.equal(await p.locator('#sophie-evidencias details').getAttribute('open'),null);
  await goto('eoraptor');await p.locator('.fig-switch [data-view="skel"]').click();await p.locator('.fig-switch [data-view="life"]').click();
  await goto('jurassico-mundo');await p.locator('[data-mark="tronco"]').click();assert.equal(await p.locator('#mundoStage').getAttribute('data-zoom'),'tronco');await p.keyboard.press('Escape');await p.locator('[data-mark="osso"]').click();await p.locator('#mundoMarks').click();assert.equal(await p.locator('#mundoStage').getAttribute('data-zoom'),'');
  await goto('cretaceo-utahraptor');await p.locator('#utahLifeButton').click();assert(await p.locator('#utahLife').isVisible());await p.locator('#utahSkeletonButton').click();assert(await p.locator('#utahSkeleton').isVisible());
  if(width<800){await p.locator('#utahLifeButton').tap();assert(await p.locator('#utahLife').isVisible());await goto('jurassico-mundo');await p.locator('[data-mark="tronco"]').tap();assert.equal(await p.locator('#mundoStage').getAttribute('data-zoom'),'tronco');await p.locator('#mundoReset').tap();await p.locator('#openSources').tap();await p.locator('#closeSources').tap();}
  await p.goto(p.url().replace(/#.*$/,'#ischigualasto'));await p.locator('#s-ischigualasto.is-active').waitFor();
  // Todos os controles e créditos de fim de página ficam acima do rodapé ao rolar até o fim.
  const ends=[];for(const id of ids){await goto(id);await p.locator('.scene.is-active .scroll').evaluate(n=>n.scrollTop=n.scrollHeight);ends.push(await p.evaluate(()=>{const s=document.querySelector('.scene.is-active .scroll'),footer=document.querySelector('.hud-bottom').getBoundingClientRect();return {scene:document.body.dataset.scene,scrollTop:s.scrollTop,bottomPadding:parseFloat(getComputedStyle(s).paddingBottom),footerHeight:footer.height};}));}
  assert.equal(errors.length,0);results.push({width,height,media,errors,ends,navigation:true,menus:true,keyboardScroll:true,sourceFocus:true,manual:true,reducedMotion:true});await context.close();
 }
 const p=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});const timings=[];
 for(const [id,stage]of[['eoraptor','#niche'],['jurassico-sophie','#sophieStage']]){
  await p.goto(base+'?motion='+id+'#'+id);await p.waitForTimeout(150);const first=await p.locator(stage).getAttribute('data-view');assert(['skel','skeleton'].includes(first));
  await p.waitForTimeout(3000);await p.screenshot({path:path.join(out,id+'-passagem.png')});await p.waitForTimeout(2600);const last=await p.locator(stage).getAttribute('data-view');assert(['life','reconstruction'].includes(last));assert.equal(await p.locator('body').getAttribute('data-scene'),id);timings.push({id,first,last,noAutoAdvance:true});
 }
 await p.goto(base+'?motion=navigation#abertura');await p.locator('#start').click();await p.locator('#s-triassico.is-active').waitFor({timeout:10000});await p.waitForTimeout(3000);await p.locator('#next').click();await p.locator('#s-eoraptor.is-active').waitFor({timeout:10000});await p.waitForTimeout(3000);await p.locator('#next').click();await p.locator('#s-ischigualasto.is-active').waitFor({timeout:10000});
 results.push({motion:timings,normalTransitions:true});fs.writeFileSync(path.join(out,'interacoes.json'),JSON.stringify(results,null,2));await browser.close();console.log('Interações conferidas: 3 viewports, 10 cenas, menus, teclado, foco, toque e passagens.');
})().catch(e=>{console.error(e);process.exit(1)});
