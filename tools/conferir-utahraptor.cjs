/* Arquivos reais em prévia virtual do Playwright; PREVIEW_URL confere a publicação.
   O modo "antes" lê o HTML aprovado de 75ab939 para comparar a troca sequencial. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),cp=require('child_process');
const root=path.resolve(__dirname,'..'),phase=process.argv[2]||'depois';
const out=path.join(root,'auditoria','utahraptor-passagem',phase);fs.mkdirSync(out,{recursive:true});
const base=process.env.PREVIEW_URL||'http://mesozoico.local/';
const baseline=phase==='antes'?cp.execFileSync('git',['show','75ab939:site/index.html'],{encoding:'utf8'}):null;
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true,args:['--no-proxy-server']});const results=[];
 for(const [width,height]of[[1440,900],[390,844],[360,740]]){
  const context=await b.newContext({viewport:{width,height},isMobile:width<800,hasTouch:width<800,recordVideo:{dir:out,size:{width,height}}});
  if(!process.env.PREVIEW_URL)await context.route(base+'**',async r=>{
   const u=new URL(r.request().url());const file=path.resolve(root,'site','.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));
   assert(file.startsWith(path.join(root,'site')+path.sep));
   if(baseline&&u.pathname==='/')return r.fulfill({body:baseline,contentType:'text/html'});
   return r.fulfill({path:file});
  });
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'?utah=review#cretaceo-utahraptor');
  await p.locator('#utahStage img').evaluateAll(ns=>Promise.all(ns.map(i=>i.decode())));
  await p.waitForTimeout(600);const skel=p.locator('#utahSkeletonButton'),life=p.locator('#utahLifeButton');
  await p.screenshot({path:path.join(out,`${width}-montagem.png`)});
  // Clique/toque real nas coordenadas visíveis: o scrollIntoView automático do
  // Playwright somava scroll-padding e scroll-margin, rolando mesmo sem necessidade.
  const activate=async locator=>{const r=await locator.boundingBox();assert(r);const x=r.x+r.width/2,y=r.y+r.height/2;const footer=await p.locator('.hud-bottom').boundingBox();assert(y<footer.y);if(width<800)await p.touchscreen.tap(x,y);else await p.mouse.click(x,y);};
  assert.equal(await skel.getAttribute('aria-pressed'),'true');await p.waitForTimeout(3500);assert.equal(await skel.getAttribute('aria-pressed'),'true');
  await p.evaluate(()=>{
   window.utahFrames=[];window.utahSampling=true;
   const sample=()=>{const a=document.querySelector('#utahSkeleton'),b=document.querySelector('#utahLife'),stage=document.querySelector('#utahStage');
    const x=getComputedStyle(a),y=getComputedStyle(b),r=n=>n.getBoundingClientRect().toJSON();
    window.utahFrames.push({time:performance.now(),a:x.display==='none'?0:+x.opacity,b:y.display==='none'?0:+y.opacity,bg:getComputedStyle(stage).backgroundColor,stage:r(stage),skeleton:r(a.querySelector('img')),life:r(b.querySelector('img')),tools:r(document.querySelector('.utah-tools')),title:r(document.querySelector('#t-cretaceo-utahraptor'))});
    if(window.utahSampling)requestAnimationFrame(sample)};sample();
  });
  await activate(life);
  for(let i=0;i<7;i++){await p.screenshot({path:path.join(out,`${width}-passagem-${i}.png`)});await p.waitForTimeout(45);}
  await p.waitForTimeout(550);await p.screenshot({path:path.join(out,`${width}-vida.png`)});
  for(let k=0;k<3;k++){
   await activate(skel);
   await p.waitForTimeout(130);
   await activate(life);
   await p.waitForTimeout(80);await activate(skel);await p.waitForTimeout(650);
   if(phase!=='antes')assert.equal(await skel.getAttribute('aria-pressed'),'true');
   await activate(life);await p.waitForTimeout(650);
  }
  const frames=await p.evaluate(()=>{window.utahSampling=false;return window.utahFrames});
  const minSum=Math.min(...frames.map(f=>f.a+f.b));
  if(phase!=='antes'){
   assert(minSum>.999,'Há quadro sem representação suficiente');
   assert(frames.every(f=>f.bg==='rgb(222, 219, 206)'));
   for(const key of ['stage','skeleton','life','tools','title'])for(const dim of ['x','y','width','height']){
    assert(Math.max(...frames.map(f=>f[key][dim]))-Math.min(...frames.map(f=>f[key][dim]))<.1,`${key} ${dim} mudou`);
   }
  }
  await p.locator('.utah-sources summary').click();await p.locator('.utah-sources').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,`${width}-creditos.png`)});
  assert((await p.locator('.utah-sources').innerText()).includes('CC BY-SA 4.0'));
  await p.keyboard.press('Escape');assert.equal(await p.locator('.utah-sources').getAttribute('open'),null);
  await skel.focus();await p.keyboard.press('Enter');await p.waitForTimeout(650);assert.equal(await skel.getAttribute('aria-pressed'),'true');
  await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.id),'utahLifeButton');await p.keyboard.press('Space');await p.waitForTimeout(650);assert.equal(await life.getAttribute('aria-pressed'),'true');
  await p.locator('#openSources').click();assert((await p.locator('#sources').innerText()).includes('Jaren Wilkey'));await p.keyboard.press('Escape');
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.locator('#prev').click();await p.locator('#s-jurassico-mundo.is-active').waitFor();await p.waitForTimeout(2500);await p.locator('#next').click();await p.locator('#s-cretaceo-utahraptor.is-active').waitFor();await p.waitForTimeout(2500);assert.equal(await life.getAttribute('aria-pressed'),'true');
  await p.emulateMedia({reducedMotion:'reduce'});await p.reload();await p.locator('#s-cretaceo-utahraptor.is-active').waitFor();await p.locator('#utahStage img').evaluateAll(ns=>Promise.all(ns.map(i=>i.decode())));
  await life.click();assert.equal(await life.getAttribute('aria-pressed'),'true');if(phase!=='antes')assert.equal(await p.locator('#utahLife').evaluate(n=>+getComputedStyle(n).opacity),1);
  await skel.click();assert.equal(await skel.getAttribute('aria-pressed'),'true');if(phase!=='antes')assert.equal(await p.locator('#utahSkeleton').evaluate(n=>+getComputedStyle(n).opacity),1);
  await p.locator('#utahStage').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,`${width}-reduzido.png`)});
  assert.equal(errors.length,0);const video=p.video();await context.close();await video.saveAs(path.join(out,`${width}-passagem.webm`));
  results.push({width,height,minSum,errors,noAutomatic:true,manual:true,repeated:true,keyboard:true,touch:width<800,reducedMotion:true,remember:true,frames});
 }
 await b.close();fs.writeFileSync(path.join(out,'verificacao.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(({frames,...r})=>r)));
})().catch(e=>{console.error(e);process.exit(1)});
