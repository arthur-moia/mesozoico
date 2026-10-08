(function () {
  'use strict';
  const geometry = window.MESOZOICO_3D;
  function crop(image, src, sw, sh, rect, clip) {
    const [x,y,w,h] = rect;
    image.src = new URL(src, document.baseURI).href;
    Object.assign(image.style, {
      position:'absolute', width:`${sw/w*100}%`, height:`${sh/h*100}%`,
      left:`${-x/w*100}%`, top:`${-y/h*100}%`, bottom:'auto', right:'auto',
      maxWidth:'none', objectFit:'fill', transform:'none',
      clipPath: clip || 'none'
    });
  }
  function paint(image, id, state='living', tight=false) {
    const g = geometry[id], bone = state === 'bones';
    const rect = tight ? [g.tight[0],g.tight[1],g.tw,g.th] : bone ? g.skRect : g.lvRect;
    const clip = bone ? `inset(0 0 ${(g.sh-g.split)/g.sh*100}% 0)` : `inset(${g.split/g.sh*100}% 0 0 0)`;
    crop(image,g.src,g.sw,g.sh,rect,clip);
  }
  function human(image) { crop(image,'assets/images/humano.webp',1024,1536,[277,24,477,1427]); }
  function layout(id,length,W,H) {
    const g=geometry[id];
    // Length follows the illustrated body axis, not the width of transparent canvas.
    const span=length*(g.projectedRatio || 1), tall=span*g.th/g.tw;
    const refW=1.7*477/1427, gap=Math.max(.35,span*.045);
    const unit=Math.min(320,Math.max(1,W-48)/(span+gap+refW),Math.max(1,H*.76)/Math.max(tall,1.7));
    const group=(span+gap+refW)*unit, left=(W-group)/2;
    return {unit,left,animalWidth:span*unit,animalHeight:tall*unit,humanLeft:left+(span+gap)*unit,humanWidth:refW*unit,humanHeight:1.7*unit};
  }
  window.MESOZOICO_ASSETS={paint,human,layout};

  document.querySelectorAll('.jurassic-pair-stage').forEach(stage=>{
    stage.style.aspectRatio=`${geometry.diplodocus.w} / ${geometry.diplodocus.h}`;
    stage.querySelectorAll('img').forEach(img=>paint(img,'diplodocus',img.classList.contains('jurassic-pair-bones')?'bones':'living'));
  });
  const chart=document.querySelector('.jurassic-comparison-chart');
  if (!chart) return;
  const animal=chart.querySelector('.jurassic-comparison-animal');
  const person=chart.querySelector('.jurassic-comparison-human');
  paint(animal.querySelector('img'),'diplodocus','living',true);
  human(person.querySelector('img'));
  function fit() {
    const p=layout('diplodocus',24,chart.clientWidth,chart.clientHeight);
    Object.assign(animal.style,{left:`${p.left}px`,width:`${p.animalWidth}px`,height:`${p.animalHeight}px`});
    Object.assign(person.style,{left:`${p.humanLeft}px`,width:`${p.humanWidth}px`,height:`${p.humanHeight}px`});
    const line=chart.querySelector('.jurassic-length--diplodocus');
    Object.assign(line.style,{left:`${p.left}px`,width:`${p.animalWidth}px`});
    const label=chart.querySelector('.jurassic-length--human');
    Object.assign(label.style,{left:`${p.humanLeft+p.humanWidth/2}px`});
  }
  fit();
  window.addEventListener('resize',fit);
})();
