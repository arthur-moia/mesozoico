const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'auditoria', process.env.AUDIT_RUN || '2026-10-13'); fs.mkdirSync(out, { recursive: true });
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:8781/';
(async () => {
 const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || (process.platform==='win32'?'msedge':undefined), headless: true });
 const results = [];
 for (const [width,height] of [[1440,900],[390,844],[360,740]]) {
  const context = await browser.newContext({ viewport:{width,height}, reducedMotion:'reduce', isMobile:width<800, hasTouch:width<800 });
  const page = await context.newPage(); const errors=[], failed=[];
  page.on('pageerror', e=>errors.push(e.message)); page.on('requestfailed', r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  await page.goto(base,{waitUntil:'networkidle'}); await page.waitForTimeout(400);
  const ids = await page.locator('.scene').evaluateAll(ns=>ns.map(n=>n.dataset.id));
  for (const id of ids) {
   await page.goto(base+'?audit='+id+'#'+id,{waitUntil:'networkidle'}); await page.waitForTimeout(300);
   const snap = async state => {
    await page.screenshot({path:path.join(out,`${width}-${id}-${state}.png`)});
    return page.evaluate(() => {
     const sc=document.querySelector('.scene.is-active .scroll'), nav=document.querySelector('.hud-bottom');
     const rect=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,b:r.bottom}};
     return {scene:document.body.dataset.scene, scroll:sc&&{height:sc.clientHeight,total:sc.scrollHeight,left:sc.scrollWidth,width:sc.clientWidth,top:sc.scrollTop},nav:rect(nav), images:[...document.querySelectorAll('.scene.is-active img')].map(n=>({src:n.getAttribute('src'),loaded:n.complete&&n.naturalWidth>0,size:[n.naturalWidth,n.naturalHeight],box:rect(n)})), controls:[...document.querySelectorAll('.scene.is-active button,.scene.is-active summary')].filter(n=>n.getClientRects().length&&getComputedStyle(n).visibility!=='hidden').map(n=>({id:n.id,text:n.textContent.trim().slice(0,65),box:rect(n)}))};
    });
   };
   const record={width,height,id,states:{initial:await snap('inicial')}};
   const selectors = {'triassico':['#triLens'],'eoraptor':['.fig-switch [data-view="skel"]','.fig-switch [data-view="life"]','#eoLens'],'ischigualasto':['#faunaLens'],'fim-triassico':['#fimLens'],'jurassico-rastros':['.track-toggle','#s-jurassico-rastros .jur-lens'],'jurassico-gigantes':['#s-jurassico-gigantes .jur-lens'],'jurassico-sophie':['[data-choice="skeleton"]','[data-choice="reconstruction"]','#sophie-evidencias summary'],'jurassico-mundo':['[data-mark="tronco"]','#mundoReset','[data-mark="osso"]','#mundoMarks','#mundoMarks','#s-jurassico-mundo .jur-lens'],'cretaceo-utahraptor':['#utahLifeButton','#utahSkeletonButton','.utah-sources summary']};
   for(const sel of selectors[id]||[]) {
    const loc=page.locator(sel); if(await loc.count()) {try {await loc.first().click({timeout:2500}); await page.waitForTimeout(200); record.states[sel]=await snap(sel.replace(/[^a-z0-9]/gi,'').slice(0,55));}catch(e){record.states[sel]={error:e.message.split('\n')[0]}}}
   }
   await page.locator('.scene.is-active .scroll').evaluate(n=>n.scrollTop=n.scrollHeight); await page.waitForTimeout(100);
   record.states.end=await snap('fim');
   await page.locator('#openSources').click(); await page.waitForTimeout(150); await page.screenshot({path:path.join(out,`${width}-${id}-fontes.png`)}); record.sources=await page.locator('#srcBody').innerText(); await page.locator('#closeSources').click();
   results.push(record);
  }
  results.push({width,errors,failed}); await context.close();
 }
 fs.writeFileSync(path.join(out,'resultados.json'),JSON.stringify(results,null,2));
 await browser.close(); console.log(JSON.stringify({out,scenes:results.length}));
})().catch(e=>{console.error(e);process.exit(1)});
