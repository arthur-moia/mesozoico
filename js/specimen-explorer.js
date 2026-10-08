(function () {
  'use strict';

  const species = [
  {
    "id": "herrerasaurus",
    "group": "triassic",
    "name": "Herrerasaurus",
    "species": "ischigualastensis",
    "length": 4.5,
    "period": "Triássico Superior",
    "age": "Carniano",
    "place": "Formação Ischigualasto · Argentina",
    "locomotion": "Bípede",
    "diet": "Carnívoro",
    "fact": "Um predador de crânio alongado e mãos capazes de agarrar. Herrerasaurus ajuda a mostrar a diversidade dos primeiros dinossauros. Sua posição entre as linhagens iniciais de saurísquios continua discutida.",
    "caveat": "4,5 m é a medida ilustrativa adotada dentro da faixa de 3–6 m. Não representa um tamanho fixo nem define a idade do indivíduo. Pele e coloração são inferidas.",
    "source": "https://d3qi0qp55mx5f5.cloudfront.net/paulsereno/i/docs/92-SCI-Herrerasaurus.pdf?mtime=1591821406"
  },
  {
    "id": "eodromaeus",
    "group": "triassic",
    "name": "Eodromaeus",
    "species": "murphi",
    "length": 1.77,
    "period": "Triássico Superior",
    "age": "Carniano",
    "place": "Formação Ischigualasto · Argentina",
    "locomotion": "Bípede",
    "diet": "Carnívoro, inferido da anatomia",
    "fact": "Um pequeno terópode dos primeiros capítulos da história dos dinossauros. O corpo esguio, a cauda longa e os membros posteriores ajudam a distinguir Eodromaeus de outros animais de Ischigualasto.",
    "caveat": "A reconstrução esquelética do estudo de 2011 mede aproximadamente 1,77 m. O valor combina evidências dos espécimes descritos; não é uma medida universal de adulto.",
    "source": "https://d3qi0qp55mx5f5.cloudfront.net/paulsereno/i/docs/11-SCI-Eodromaeus-SOM.pdf?mtime=1591808107"
  },
  {
    "id": "panphagia",
    "group": "triassic",
    "name": "Panphagia",
    "species": "protos",
    "length": 1.3,
    "period": "Triássico Superior",
    "age": "Carniano",
    "place": "Formação Ischigualasto · Argentina",
    "locomotion": "Bípede, reconstruído",
    "diet": "Onivoria proposta a partir dos dentes",
    "fact": "Um pequeno representante inicial da linhagem dos sauropodomorfos. Panphagia é conhecido por um esqueleto parcial de um indivíduo imaturo, com proporções gerais próximas às de Eoraptor.",
    "caveat": "≈ 1,3 m corresponde ao indivíduo descrito, não ao tamanho adulto. A imagem completa os ossos ausentes por inferência; tecidos externos e cor são hipotéticos.",
    "source": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0004397"
  },
  {
    "id": "allosaurus",
    "group": "jurassic",
    "name": "Allosaurus",
    "species": "fragilis",
    "length": 8.5,
    "period": "Jurássico Superior",
    "age": "Jurássico tardio",
    "place": "Formação Morrison · EUA",
    "locomotion": "Bípede",
    "diet": "Carnívoro",
    "fact": "Um dos grandes predadores da Formação Morrison. Dentes serrilhados, braços com garras e um crânio com elevações acima dos olhos compõem sua anatomia característica.",
    "caveat": "≈ 8,5 m é a referência adotada a partir do Dinosaur National Monument. Indivíduos variam de tamanho. A imagem não comprova cores nem comportamento de caça.",
    "source": "https://www.nps.gov/dino/learn/nature/allosaurus-fragilis.htm"
  },
  {
    "id": "stegosaurus",
    "group": "jurassic",
    "name": "Stegosaurus",
    "species": "stenops",
    "length": 5.6,
    "period": "Jurássico Superior",
    "age": "≈ 150 milhões de anos",
    "place": "Formação Morrison · Wyoming, EUA",
    "locomotion": "Quadrúpede",
    "diet": "Herbívoro",
    "fact": "Placas alternadas e quatro espinhos na cauda formam uma silhueta reconhecível. O exemplar Sophie, quase completo, permite estudar em detalhe as proporções de Stegosaurus stenops.",
    "caveat": "Escala baseada em Sophie: cerca de 5,6 m, ainda sem atingir a maturidade. Não representa o máximo do gênero. Cor e cobertura externa das placas são interpretativas.",
    "source": "https://www.nhm.ac.uk/press-office/press-releases/world_s-most-complete-stegosaurus-goes-on-show.html"
  },
  {
    "id": "brachiosaurus",
    "group": "jurassic",
    "name": "Brachiosaurus",
    "species": "altithorax",
    "length": 22,
    "period": "Jurássico Superior",
    "age": "Jurássico tardio",
    "place": "Formação Morrison · EUA",
    "locomotion": "Quadrúpede",
    "diet": "Herbívoro",
    "fact": "Membros anteriores longos elevam os ombros acima do quadril. O Brachiosaurus norte-americano tinha proporções diferentes das do Giraffatitan africano, frequentemente usado em imagens populares.",
    "caveat": "≈ 22 m é uma estimativa ilustrativa. O material de B. altithorax é incompleto; pescoço, crânio e outras partes da reconstrução incluem inferências.",
    "source": "https://www.miketaylor.org.uk/dino/pubs/taylor2009/"
  }
];

  const dialog = document.querySelector('.specimen-dialog');
  const explorer = dialog?.querySelector('.specimen-explorer');
  if (!dialog || !explorer) return;
  const q = (selector) => explorer.querySelector(selector);
  const parts = {
    chapter: q('[data-specimen-chapter]'), phase: q('[data-specimen-phase]'), name: q('[data-specimen-name]'),
    epithet: q('[data-specimen-epithet]'),
    subtitle: q('[data-specimen-subtitle]'), backdrop: q('[data-specimen-backdrop]'),
    about: q('[data-specimen-about]'), bones: q('.specimen-explorer__bones'),
    living: q('.specimen-explorer__living'), factLead: q('[data-specimen-fact-lead]'),
    factRest: q('[data-specimen-fact-rest]'),
    period: q('[data-specimen-period]'), place: q('[data-specimen-place]'), length: q('[data-specimen-length]'),
    caveat: q('[data-specimen-caveat]'), source: q('[data-specimen-source]'),
    scale: q('.specimen-explorer__scale'), scaleAnimal: q('.specimen-explorer__scale-animal'),
    scaleLabel: q('[data-specimen-scale-label]'), animalMeasure: q('[data-specimen-animal-measure]'),
    referenceMeasure: q('[data-specimen-reference-measure]'), previous: q('[data-specimen-prev]'),
    next: q('[data-specimen-next]'), progress: Array.from(explorer.querySelectorAll('.specimen-explorer__progress span'))
  };
  const phases = ['skeleton', 'reconstruction', 'information', 'scale'];
  const phaseLabels = ['Esqueleto', 'Reconstrução', 'Informações', 'Escala'];
  const geo = window.MESOZOICO_3D || {};
  let current = null;
  let stage = 0;
  let locked = false;
  let returnFocus = null;
  let revealP = 0;
  let wipeFrame = 0;
  let entranceAnimations = [];

  function clearEntrance() {
    entranceAnimations.forEach((animation) => animation.cancel());
    entranceAnimations = [];
  }

  function enter(element, frames, duration, delay = 0) {
    const animation = element.animate(frames, {
      duration, delay, easing: 'cubic-bezier(.2,.72,.24,1)', fill: 'both'
    });
    entranceAnimations.push(animation);
    animation.finished.then(() => animation.cancel()).catch(() => {});
  }

  function playEntrance() {
    clearEntrance();
    if (!dialog.open || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    enter(dialog, [{ opacity: 0 }, { opacity: 1 }], 380);
    enter(q('.specimen-explorer__heading'),
      [{ opacity: 0, transform: 'translateX(-28px)' }, { opacity: 1, transform: 'translateX(0)' }], 570, 100);
    enter(q('.specimen-explorer__visual'),
      [{ opacity: 0, transform: 'translateX(28px) scale(.97)' }, { opacity: 1, transform: 'translateX(0) scale(1)' }], 760, 180);
    enter(q('.specimen-explorer__controls'),
      [{ opacity: 0 }, { opacity: 1 }], 380, 370);
  }

  function playInformationEntrance() {
    clearEntrance();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const details = [parts.factLead, parts.factRest, ...q('.specimen-explorer__context').children, parts.source].filter((element) => !element.hidden);
    details.forEach((element, index) => enter(element,
      [{ opacity: 0, transform: 'translateY(9px)' }, { opacity: 1, transform: 'translateY(0)' }],
      340, index * 65));
  }

  const assets = window.MESOZOICO_ASSETS;
  const researchedPairs = new Set(species.map(item => item.id));
  function canvasAspect(item) { const g = geo[item.id]; return g.w / g.h; }
  function tightAspect(item) { const g = geo[item.id]; return g.tw / g.th; }

  // As duas imagens compartilham a mesma tela; a linha percorre só a extensão visível do animal.
  function revealGeometry() {
    const g = geo[current.id];
    const pair = q('.specimen-explorer__pair');
    const W = pair.clientWidth, H = pair.clientHeight;
    return {
      W, H,
      x0: Math.min(g.sk[0], g.lv[0]) * W - 6, x1: Math.max(g.sk[2], g.lv[2]) * W + 6,
      y0: Math.min(g.sk[1], g.lv[1]) * H, y1: Math.max(g.sk[3], g.lv[3]) * H
    };
  }
  function setReveal(p) {
    revealP = p;
    if (!current) return;
    const frame = q('.specimen-explorer__living-frame');
    const bones = q('.specimen-explorer__bones-frame');
    const line = q('.specimen-explorer__wipe-line');
    if (p <= 0) { frame.style.clipPath = 'inset(0 100% 0 0)'; bones.style.clipPath = 'none'; line.style.opacity = '0'; return; }
    if (p >= 1) { frame.style.clipPath = 'none'; bones.style.clipPath = 'inset(0 0 0 100%)'; line.style.opacity = '0'; return; }
    const g = revealGeometry();
    const x = g.x0 + p * (g.x1 - g.x0);
    frame.style.clipPath = `inset(0 ${(g.W - x).toFixed(1)}px 0 0)`;
    bones.style.clipPath = `inset(0 0 0 ${x.toFixed(1)}px)`;
    line.style.left = `${(x - 1).toFixed(1)}px`;
    line.style.top = `${g.y0.toFixed(1)}px`;
    line.style.height = `${(g.y1 - g.y0).toFixed(1)}px`;
    line.style.opacity = String(Math.min(1, p / .06, (1 - p) / .06).toFixed(3));
  }
  function animateReveal(from, to, duration, done) {
    cancelAnimationFrame(wipeFrame);
    if (!duration) { setReveal(to); done(); return; }
    const start = performance.now();
    const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setReveal(from + (to - from) * ease(t));
      if (t < 1) wipeFrame = requestAnimationFrame(step); else done();
    };
    wipeFrame = requestAnimationFrame(step);
  }

  // O animal mantém o mesmo tamanho e a mesma posição do esqueleto à tela de informações.
  function fitPair() {
    if (!current || !dialog.open) return;
    const aspect = canvasAspect(current);
    const mobile = innerWidth <= 700;
    const tablet = innerWidth <= 1050 && !mobile;
    const width = Math.min(innerWidth * (mobile ? .94 : tablet ? .86 : .48),
      innerHeight * (mobile ? .33 : tablet ? .42 : .64) * aspect, 1120);
    const pair = q('.specimen-explorer__pair');
    pair.style.setProperty('--pair-width', `${width}px`);
    pair.style.setProperty('--pair-height', `${width / aspect}px`);
    setReveal(revealP);
  }

  function makeChoice(item) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'specimen-choice';
    if (researchedPairs.has(item.id)) button.classList.add('specimen-choice--sheet');
    button.setAttribute('aria-label', `Explorar ${item.name} ${item.species}`);

    const thumb = document.createElement('span');
    thumb.className = 'specimen-choice__thumb';
    thumb.setAttribute('aria-hidden', 'true');
    const preview = document.createElement('img');
    preview.alt = '';
    thumb.appendChild(preview);
    const ratio = tightAspect(item);
    thumb.style.width = `${Math.min(56,42*ratio)}px`;
    thumb.style.height = `${Math.min(42,56/ratio)}px`;
    assets.paint(preview,item.id,'living',true);
    const label = document.createElement('span');
    label.className = 'specimen-choice__name';
    label.textContent = item.name;
    const small = document.createElement('small');
    small.textContent = 'Explorar ↗';
    label.appendChild(small);
    button.append(thumb, label);
    button.addEventListener('click', () => open(item, button));
    return button;
  }
  document.querySelectorAll('[data-specimen-group]').forEach((group) => {
    species.filter((item) => item.group === group.dataset.specimenGroup).forEach((item) => group.appendChild(makeChoice(item)));
  });

  function updateScale() {
    if (!current || !dialog.open) return;
    const p=assets.layout(current.id,current.length,parts.scale.clientWidth,parts.scale.clientHeight);
    const set=(name,value)=>parts.scale.style.setProperty(name,`${value}px`);
    parts.scale.dataset.reference='human';
    set('--animal-left',p.left); set('--animal-scale-width',p.animalWidth); set('--animal-scale-height',p.animalHeight);
    set('--reference-left',p.humanLeft); set('--reference-width',p.humanWidth); set('--reference-height',p.humanHeight);
    const length=String(current.length).replace('.',',');
    parts.animalMeasure.textContent=`≈ ${length} m · comprimento corporal`;
    parts.referenceMeasure.textContent='1,70 m · altura';
    parts.scaleLabel.textContent='Mesma escala. Comprimento medido ao longo do corpo; postura e reconstrução tornam a comparação aproximada.';
    parts.scale.setAttribute('aria-label',`${current.name}: cerca de ${length} metros de comprimento, ao lado de uma pessoa de 1,70 metro de altura.`);
  }

  function updateStage(nextStage, animate) {
    clearEntrance();
    const oldStage = stage;
    stage = Math.max(0, Math.min(3, nextStage));
    explorer.dataset.specimenStage = phases[stage];
    parts.phase.textContent = `0${stage + 1} / ${phaseLabels[stage]}`;
    parts.subtitle.textContent = stage === 0 ? 'O esqueleto é uma representação anatômica, não a posição em que os ossos foram encontrados.'
      : stage === 1 ? 'A linha revela a reconstrução: a passagem da evidência para a aparência provável.'
      : stage === 2 ? 'O que o fóssil permite dizer — e onde começa a interpretação.'
      : 'O comprimento do animal aparece ao lado de uma referência atual.';
    parts.previous.disabled = stage === 0 || locked;
    parts.next.textContent = stage === 3 ? 'Fechar exploração ×' : stage === 0 ? 'Ver reconstrução →' : stage === 1 ? 'Ver informações →' : 'Comparar tamanho →';
    parts.progress.forEach((dot, index) => dot.classList.toggle('is-current', index === stage));
    if (stage === 3) updateScale();
    if (animate && stage === 2) playInformationEntrance();
    if (animate && ((oldStage === 0 && stage === 1) || (oldStage === 1 && stage === 0))) {
      locked = true;
      parts.previous.disabled = true;
      parts.next.disabled = true;
      const forward = stage === 1;
      const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1900;
      animateReveal(forward ? 0 : 1, forward ? 1 : 0, duration, () => {
        locked = false;
        parts.previous.disabled = stage === 0;
        parts.next.disabled = false;
      });
    } else {
      locked = false;
      parts.next.disabled = false;
    }
  }

  function open(item, sourceButton) {
    if (dialog.open) return;
    current = item;
    explorer.dataset.specimenId = item.id;
    explorer.dataset.pairSheet = researchedPairs.has(item.id) ? 'true' : 'false';
    returnFocus = sourceButton;
    parts.chapter.textContent = item.group === 'triassic' ? 'Triássico · Ischigualasto' : 'Jurássico · Formação Morrison';
    parts.name.textContent = item.name;
    parts.epithet.textContent = item.species;
    parts.backdrop.textContent = item.name.toUpperCase();
    parts.about.textContent = item.name;
    const firstSentence = item.fact.match(/^.*?[.!?](?=\s|$)/)?.[0] || item.fact;
    parts.factLead.textContent = firstSentence;
    parts.factRest.textContent = item.fact.slice(firstSentence.length).trim();
    parts.factRest.hidden = !parts.factRest.textContent;
    parts.period.textContent = item.period;
    parts.place.textContent = item.place;
    parts.length.textContent = `≈ ${String(item.length).replace('.', ',')} m`;
    parts.caveat.textContent = item.caveat;
    q('.specimen-explorer__science').open = false;
    parts.source.href = item.source;
    assets.paint(parts.bones,item.id,'bones');
    assets.paint(parts.living,item.id,'living');
    assets.paint(parts.scaleAnimal.querySelector('img'),item.id,'living',true);
    assets.human(q('.specimen-explorer__human img'));
    q('[data-specimen-age]').textContent=item.age;
    q('[data-specimen-locomotion]').textContent=item.locomotion;
    q('[data-specimen-diet]').textContent=item.diet;
    parts.bones.alt = `Representação esquelética interpretativa de ${item.name} ${item.species}`;
    parts.living.alt = `Reconstrução artística de ${item.name} ${item.species}`;
    q('.specimen-explorer__visual').setAttribute('aria-label', `Esqueleto e reconstrução artística de ${item.name}`);
    explorer.dataset.specimenStage = 'skeleton';
    cancelAnimationFrame(wipeFrame);
    revealP = 0;
    updateStage(0, false);
    dialog.showModal();
    fitPair();
    setReveal(0);
    updateScale();
    q('[data-specimen-close]').focus();
    requestAnimationFrame(playEntrance);
  }

  function close() { if (dialog.open) dialog.close(); }
  q('[data-specimen-close]').addEventListener('click', close);
  parts.previous.addEventListener('click', () => { if (!locked) updateStage(stage - 1, stage === 1); });
  parts.next.addEventListener('click', () => { if (locked) return; if (stage === 3) close(); else updateStage(stage + 1, stage === 0); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => { clearEntrance(); cancelAnimationFrame(wipeFrame); locked = false; returnFocus?.focus({ preventScroll: true }); });
  window.addEventListener('resize', () => { fitPair(); updateScale(); });
})();
