const fs=require('fs'),vm=require('vm'),assert=require('assert');
const window={addEventListener(){}};
const document={baseURI:'https://example.invalid/',querySelectorAll(){return[];},querySelector(){return null;}};
const context=vm.createContext({window,document,URL});
vm.runInContext(fs.readFileSync('js/pairs-3d.js','utf8'),context);
vm.runInContext(fs.readFileSync('js/pairs-renderer.js','utf8'),context);
const api=window.MESOZOICO_ASSETS,g=window.MESOZOICO_3D;
const lengths={herrerasaurus:4.5,eodromaeus:1.77,panphagia:1.3,allosaurus:8.5,stegosaurus:5.6,brachiosaurus:22,diplodocus:24};
let cases=0;
for(const [id,length] of Object.entries(lengths)) {
  assert(fs.existsSync(g[id].src),id+' source missing');
  assert(Math.abs(g[id].sk[3]-g[id].lv[3])<1e-5,id+' feet not aligned');
  for(const [W,H] of [[1000,460],[1200,550],[1700,680],[2200,900]]) {
    const p=api.layout(id,length,W,H);
    assert(Math.abs(p.humanHeight/p.unit-1.7)<1e-9,'human height');
    assert(Math.abs(p.animalWidth/p.unit-length*g[id].projectedRatio)<1e-9,'animal scale');
    assert(p.left>=0 && p.humanLeft+p.humanWidth<=W+1e-7,'horizontal overflow');
    assert(Math.max(p.animalHeight,p.humanHeight)<=H*.76+1e-7,'vertical overflow');
    cases++;
  }
  for(const state of ['bones','living']) {
    const im={style:{}}; api.paint(im,id,state);
    const rect=state==='bones'?g[id].skRect:g[id].lvRect;
    const renderedRatio=(parseFloat(im.style.width)*rect[2])/(parseFloat(im.style.height)*rect[3]);
    assert(Math.abs(renderedRatio-g[id].sw/g[id].sh)<1e-8,'stretched source');
  }
}
const html=fs.readFileSync('index.html','utf8');
assert(!html.includes('ônibus'),'bus copy remains');
assert(!html.includes('class="jurassic-comparison-bus"'),'bus markup remains');
assert(html.includes('pairs-renderer.js'),'renderer not loaded');
const source=fs.readFileSync('js/specimen-explorer.js','utf8');
assert(source.includes('if (locked) return'),'transition lock missing');
assert(source.includes('? 0 : 1900'),'wipe duration changed');
console.log(`PASS: ${cases} scale layouts; 14 sprite mappings; common foot baseline; human 1.70m; no bus markup; reveal lock preserved.`);
