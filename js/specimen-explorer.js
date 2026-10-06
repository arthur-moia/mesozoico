(function () {
  'use strict';

  const species = [
    {
      id: 'herrerasaurus', group: 'triassic', name: 'Herrerasaurus', species: 'ischigualastensis', length: 4.5,
      period: 'Triássico Superior', place: 'Ischigualasto · Argentina',
      fact: 'Um predador bípede de Ischigualasto, maior que Eoraptor. Seu esqueleto ajuda a mostrar como alguns dos primeiros dinossauros já tinham portes bem diferentes.',
      caveat: 'Comprimento ilustrativo dentro da faixa de 3 a 6 m apresentada pelo Western Australian Museum. Aparência externa reconstruída.',
      source: 'https://visit.museum.wa.gov.au/boolabardip/herrerasaurus-ischigualastensis'
    },
    {
      id: 'eodromaeus', group: 'triassic', name: 'Eodromaeus', species: 'murphi', length: 1.2,
      period: 'Triássico Superior', place: 'Ischigualasto · Argentina',
      fact: 'Um dinossauro pequeno e bípede encontrado em Ischigualasto. Compará-lo ao Eoraptor ajuda a perceber a diversidade já presente entre as primeiras linhagens.',
      caveat: 'O fóssil é amplamente preservado; pele e coloração da imagem são inferidas.',
      source: 'https://paulsereno.uchicago.edu/exhibits_casts/early_dinosaurs/eodromaeus/'
    },
    {
      id: 'panphagia', group: 'triassic', name: 'Panphagia', species: 'protos', length: 1.3,
      period: 'Triássico Superior', place: 'Ischigualasto · Argentina',
      fact: 'Conhecido por um esqueleto parcial de um indivíduo ainda jovem, Panphagia está entre as formas iniciais da linhagem dos sauropodomorfos.',
      caveat: 'A imagem esquelética completa as partes que não foram encontradas. O comprimento de ≈ 1,3 m refere-se ao espécime descrito.',
      source: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0004397'
    },
    {
      id: 'allosaurus', group: 'jurassic', name: 'Allosaurus', species: 'fragilis', length: 9.7,
      period: 'Jurássico Superior', place: 'Formação Morrison · EUA',
      fact: 'Um dos grandes predadores do ecossistema de Morrison. O crânio, os membros e os dentes preservados ajudam a reconstruir sua forma.',
      caveat: 'Comprimento aproximado; tecidos externos e cor são interpretação artística.',
      source: 'https://www.nhm.ac.uk/discover/dino-directory/allosaurus.html'
    },
    {
      id: 'stegosaurus', group: 'jurassic', name: 'Stegosaurus', species: 'stenops', length: 9,
      period: 'Jurássico Superior', place: 'Formação Morrison · EUA',
      fact: 'As placas dorsais e os espinhos da cauda tornam sua silhueta imediata. Fósseis bem preservados permitem estudar a estrutura que sustentava essas peças.',
      caveat: 'Comprimento aproximado do gênero. Cor e aparência externa das placas permanecem interpretativas.',
      source: 'https://www.nhm.ac.uk/discover/dino-directory/Stegosaurus.html'
    },
    {
      id: 'brachiosaurus', group: 'jurassic', name: 'Brachiosaurus', species: 'altithorax', length: 22,
      period: 'Jurássico Superior', place: 'Formação Morrison · EUA',
      fact: 'Um saurópode muito alto, com membros anteriores longos e pescoço elevado. Sua proporção contrasta com o corpo mais horizontal do Diplodocus.',
      caveat: 'Não há esqueleto completo conhecido. A figura esquelética e a aparência em vida incluem partes inferidas.',
      source: 'https://www.nhm.ac.uk/discover/dino-directory/brachiosaurus.html'
    }
  ];

  const dialog = document.querySelector('.specimen-dialog');
  const explorer = dialog?.querySelector('.specimen-explorer');
  if (!dialog || !explorer) return;
  const q = (selector) => explorer.querySelector(selector);
  const parts = {
    chapter: q('[data-specimen-chapter]'), phase: q('[data-specimen-phase]'), name: q('[data-specimen-name]'),
    epithet: q('[data-specimen-epithet]'),
    subtitle: q('[data-specimen-subtitle]'), bones: q('.specimen-explorer__bones'),
    living: q('.specimen-explorer__living'), fact: q('[data-specimen-fact]'),
    period: q('[data-specimen-period]'), place: q('[data-specimen-place]'), length: q('[data-specimen-length]'),
    caveat: q('[data-specimen-caveat]'), source: q('[data-specimen-source]'),
    scale: q('.specimen-explorer__scale'), scaleAnimal: q('.specimen-explorer__scale-animal'),
    scaleLabel: q('[data-specimen-scale-label]'), previous: q('[data-specimen-prev]'),
    next: q('[data-specimen-next]'), progress: Array.from(explorer.querySelectorAll('.specimen-explorer__progress span'))
  };
  const phases = ['skeleton', 'reconstruction', 'information', 'scale'];
  const phaseLabels = ['Esqueleto', 'Reconstrução', 'Informações', 'Escala'];
  const pairDimensions = {
    herrerasaurus: [2172, 724], eodromaeus: [1983, 793], panphagia: [2058, 764],
    allosaurus: [2103, 748], stegosaurus: [2048, 768], brachiosaurus: [2048, 768]
  };
  // The generated cutouts carry transparent padding below the feet.
  const footPadding = { herrerasaurus: .17, eodromaeus: .15, panphagia: .15, allosaurus: .15, stegosaurus: .15, brachiosaurus: .035 };
  let current = null;
  let stage = 0;
  let locked = false;
  let returnFocus = null;
  let wipeAnimations = [];
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
    const details = [parts.fact, ...q('.specimen-explorer__information dl').children, parts.caveat, parts.source];
    details.forEach((element, index) => enter(element,
      [{ opacity: 0, transform: 'translateY(9px)' }, { opacity: 1, transform: 'translateY(0)' }],
      340, index * 65));
  }

  function imageUrl(item) {
    return new URL(`assets/images/${item.id}-par.png`, document.baseURI).href;
  }

  function halfAspect(item) {
    const [width, height] = pairDimensions[item.id];
    return width / (2 * height);
  }

  function fitPair() {
    if (!current || !dialog.open) return;
    const aspect = halfAspect(current);
    const mobile = innerWidth <= 700;
    const tablet = innerWidth <= 1050 && !mobile;
    const width = Math.min(innerWidth * (mobile ? .94 : tablet ? .88 : .80),
      innerHeight * (mobile ? .33 : tablet ? .43 : .60) * aspect, 1120);
    const pair = q('.specimen-explorer__pair');
    pair.style.setProperty('--pair-width', `${width}px`);
    pair.style.setProperty('--pair-height', `${width / aspect}px`);
  }

  function makeChoice(item) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'specimen-choice';
    button.setAttribute('aria-label', `Explorar ${item.name} ${item.species}`);
    button.style.setProperty('--pair', `url("${imageUrl(item)}")`);
    const thumb = document.createElement('span');
    thumb.className = 'specimen-choice__thumb';
    thumb.setAttribute('aria-hidden', 'true');
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
    const bus = current.length >= 15;
    const referenceLength = bus ? 12 : 1.7;
    const aspect = halfAspect(current);
    const unit = Math.min(140,
      (parts.scale.clientWidth - 36) / (current.length + referenceLength),
      parts.scale.clientHeight * .73 * aspect / current.length);
    const animalWidth = current.length * unit;
    const referenceWidth = referenceLength * unit;
    parts.scale.dataset.reference = bus ? 'bus' : 'human';
    parts.scale.style.setProperty('--animal-scale-width', `${animalWidth}px`);
    parts.scale.style.setProperty('--animal-scale-height', `${animalWidth / aspect}px`);
    parts.scale.style.setProperty('--foot-offset', `${animalWidth / aspect * footPadding[current.id]}px`);
    parts.scale.style.setProperty('--reference-width', `${referenceWidth}px`);
    parts.scale.style.setProperty('--reference-height', `${(bus ? 3 : 1.7) * unit}px`);
    const reference = bus ? 'ônibus ilustrativo de 12 m' : 'pessoa de 1,70 m';
    const animal = `${current.name}: ≈ ${String(current.length).replace('.', ',')} m de comprimento`;
    parts.scaleLabel.textContent = `${animal} · ${reference}. Comprimentos aproximados na mesma escala.`;
    parts.scale.setAttribute('aria-label', `${animal}, comparado a ${reference}.`);
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
      const frame = q('.specimen-explorer__living-frame');
      const bones = q('.specimen-explorer__bones-frame');
      const line = q('.specimen-explorer__wipe-line');
      wipeAnimations.forEach((animation) => animation.cancel());
      const forward = stage === 1;
      const from = forward ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)';
      const to = forward ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)';
      const bonesFrom = forward ? 'inset(0 0 0 0%)' : 'inset(0 0 0 100%)';
      const bonesTo = forward ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0%)';
      const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1550;
      if (duration === 0) {
        frame.style.clipPath = to;
        bones.style.clipPath = bonesTo;
        line.style.opacity = '0';
        locked = false;
        parts.previous.disabled = stage === 0;
        parts.next.disabled = false;
      } else {
        frame.style.clipPath = from;
        bones.style.clipPath = bonesFrom;
        line.style.opacity = '0';
        const options = { duration, easing: 'cubic-bezier(.35,.02,.2,1)', fill: 'forwards' };
        wipeAnimations = [
          frame.animate([{ clipPath: from }, { clipPath: to }], options),
          bones.animate([{ clipPath: bonesFrom }, { clipPath: bonesTo }], options),
          line.animate([
            { left: forward ? '0%' : '100%', opacity: 0 },
            { left: forward ? '10%' : '90%', opacity: 1, offset: .1 },
            { left: forward ? '90%' : '10%', opacity: 1, offset: .9 },
            { left: forward ? '100%' : '0%', opacity: 0 }
          ], options)
        ];
        Promise.all(wipeAnimations.map((animation) => animation.finished)).then(() => {
          frame.style.clipPath = to;
          bones.style.clipPath = bonesTo;
          wipeAnimations.forEach((animation) => animation.cancel());
          wipeAnimations = [];
          locked = false;
          parts.previous.disabled = stage === 0;
          parts.next.disabled = false;
        }).catch(() => {});
      }
    } else {
      locked = false;
      parts.next.disabled = false;
    }
  }

  function open(item, sourceButton) {
    if (dialog.open) return;
    current = item;
    explorer.dataset.specimenId = item.id;
    returnFocus = sourceButton;
    parts.chapter.textContent = item.group === 'triassic' ? 'Triássico · Ischigualasto' : 'Jurássico · Formação Morrison';
    parts.name.textContent = item.name;
    parts.epithet.textContent = item.species;
    parts.fact.textContent = item.fact;
    parts.period.textContent = item.period;
    parts.place.textContent = item.place;
    parts.length.textContent = `≈ ${String(item.length).replace('.', ',')} m`;
    parts.caveat.textContent = item.caveat;
    parts.source.href = item.source;
    parts.bones.src = imageUrl(item);
    parts.living.src = imageUrl(item);
    parts.scaleAnimal.querySelector('img').src = imageUrl(item);
    parts.bones.alt = `Representação esquelética interpretativa de ${item.name} ${item.species}`;
    parts.living.alt = `Reconstrução artística de ${item.name} ${item.species}`;
    q('.specimen-explorer__visual').setAttribute('aria-label', `Esqueleto e reconstrução artística de ${item.name}`);
    explorer.dataset.specimenStage = 'skeleton';
    q('.specimen-explorer__living-frame').style.clipPath = 'inset(0 100% 0 0)';
    q('.specimen-explorer__bones-frame').style.clipPath = 'inset(0 0 0 0%)';
    q('.specimen-explorer__wipe-line').style.opacity = '0';
    updateStage(0, false);
    dialog.showModal();
    fitPair();
    updateScale();
    q('[data-specimen-close]').focus();
    requestAnimationFrame(playEntrance);
  }

  function close() { if (dialog.open) dialog.close(); }
  q('[data-specimen-close]').addEventListener('click', close);
  parts.previous.addEventListener('click', () => { if (!locked) updateStage(stage - 1, stage === 1); });
  parts.next.addEventListener('click', () => { if (locked) return; if (stage === 3) close(); else updateStage(stage + 1, stage === 0); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => { clearEntrance(); wipeAnimations.forEach((animation) => animation.cancel()); wipeAnimations = []; locked = false; returnFocus?.focus({ preventScroll: true }); });
  window.addEventListener('resize', () => { fitPair(); updateScale(); });
})();
