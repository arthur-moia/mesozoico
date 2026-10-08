(function () {
  "use strict";

  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const N = panels.length;
  const root = document.documentElement;
  const story = document.querySelector(".story");
  const video = document.querySelector("#opening-video");
  const playButton = document.querySelector("[data-play-video]");
  const currentAge = document.querySelector("[data-current-age]");
  const timeRail = document.querySelector(".time-rail");
  const slotLabel = document.querySelector("[data-slot-label]");
  const stopMarks = Array.from(document.querySelectorAll(".time-stop[data-stop]"));
  const dialog = document.querySelector(".credits-dialog");
  const specimenDialog = document.querySelector('.specimen-dialog');
  const anyDialogOpen = () => !!(dialog?.open || specimenDialog?.open);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // On narrow screens the scale caveat belongs in the readable copy area,
  // leaving the animal and measurement lines unobstructed.
  const mobileLayout = window.matchMedia("(max-width: 700px), (max-height: 500px) and (max-width: 950px) and (orientation: landscape)");
  const scaleCopy = panels[12]?.querySelector('.eoraptor-scale-copy');
  const scaleNote = panels[12]?.querySelector('.scale-note');
  const scaleNoteHome = document.createComment('scale-note-home');
  if (scaleNote && scaleCopy) {
    scaleNote.parentNode.insertBefore(scaleNoteHome, scaleNote);
    const placeScaleNote = () => {
      if (mobileLayout.matches) scaleCopy.appendChild(scaleNote);
      else scaleNoteHome.parentNode.insertBefore(scaleNote, scaleNoteHome.nextSibling);
    };
    placeScaleNote();
    mobileLayout.addEventListener('change', placeScaleNote);
  }

  let activeIndex = -1;
  let enhanced = false;
  let storyTrigger = null;
  let masterAnimation = null;
  let goToPanel = (index) => {
    panels[Math.max(0, Math.min(N - 1, index))]?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
  };

  /* ------------------------------------------------------------------ */
  /* Abertura em vídeo: começa muda, toca uma vez e fica no último quadro. */
  /* Nada aqui depende da rolagem.                                        */
  /* ------------------------------------------------------------------ */
  let videoStarted = false;
  let videoFinished = false;

  function setPlaybackFallback(visible) {
    if (playButton) playButton.hidden = !visible;
  }

  function attemptAutoplay() {
    if (!video || videoFinished) return;
    video.muted = true;
    video.defaultMuted = true;
    if (reducedMotion.matches) {
      // Movimento reduzido: a abertura só começa quando a pessoa pedir.
      video.removeAttribute("autoplay");
      video.pause();
      try { video.currentTime = 0; } catch (error) { /* o vídeo ainda não carregou */ }
      setPlaybackFallback(true);
      return;
    }
    const result = video.play();
    if (result && typeof result.catch === "function") {
      result.then(() => setPlaybackFallback(false)).catch(() => setPlaybackFallback(true));
    }
  }

  attemptAutoplay();
  if (video) {
    video.addEventListener("playing", () => { videoStarted = true; setPlaybackFallback(false); });
    video.addEventListener("error", () => setPlaybackFallback(true));
    video.addEventListener("ended", () => {
      videoFinished = true;
      setPlaybackFallback(false);
    });
    // Alguns navegadores pausam vídeo mudo quando ele sai de vista. A abertura segue até o fim
    // mesmo que a pessoa já tenha passado para a cena seguinte.
    video.addEventListener("pause", () => {
      if (!videoStarted || videoFinished || video.ended) return;
      if (video.duration && video.currentTime >= video.duration - 0.08) return;
      if (document.visibilityState !== "visible") return;
      video.play().catch(() => setPlaybackFallback(true));
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && videoStarted && !videoFinished && video.paused) {
        video.play().catch(() => setPlaybackFallback(true));
      }
    });
  }
  playButton?.addEventListener("click", () => {
    if (!video || videoFinished) return;
    video.muted = true;
    video.play().then(() => setPlaybackFallback(false)).catch(() => setPlaybackFallback(true));
  });

  /* ------------------------------------------------------------------ */
  /* Linha do tempo: rótulo, marcador e faixa saem da mesma fonte        */
  /* (os atributos data-age* de cada painel).                            */
  /* ------------------------------------------------------------------ */
  const MA_TOP = 251.9;
  const MA_BOTTOM = 143.1;
  const SLOT_DEFAULT_TEXT = slotLabel ? slotLabel.textContent.trim() : "≈ 233";

  function railPosition(age) {
    const clamped = Math.min(MA_TOP, Math.max(MA_BOTTOM, age));
    return ((MA_TOP - clamped) / (MA_TOP - MA_BOTTOM)) * 100;
  }
  const SLOT_DEFAULT_POS = railPosition(233);

  function readAge(panel) {
    const raw = panel.dataset.age || "now";
    const from = parseFloat(panel.dataset.ageFrom);
    const to = parseFloat(panel.dataset.ageTo);
    const hasBand = Number.isFinite(from) && Number.isFinite(to);
    let pos;
    if (raw === "now") pos = 0;
    else if (hasBand) pos = railPosition((from + to) / 2);
    else pos = railPosition(parseFloat(raw));
    const slotText = panel.dataset.slot || SLOT_DEFAULT_TEXT;
    return {
      label: panel.dataset.ageLabel || "",
      stop: panel.dataset.stop || "",
      pos,
      bandTop: hasBand ? railPosition(from) : pos,
      bandHeight: hasBand ? railPosition(to) - railPosition(from) : 0,
      bandOpacity: hasBand ? 0.62 : 0,
      slotText,
      slotPos: panel.dataset.slot ? pos : SLOT_DEFAULT_POS
    };
  }
  const ages = panels.map(readAge);

  function railState(info) {
    return { pos: info.pos, bandTop: info.bandTop, bandHeight: info.bandHeight, bandOpacity: info.bandOpacity, slotPos: info.slotPos };
  }
  const railLive = railState(ages[0]); // estado animado da régua
  function applyRail(state) {
    if (!timeRail) return;
    const s = state || railLive;
    timeRail.style.setProperty("--rail-position", `${s.pos.toFixed(3)}%`);
    timeRail.style.setProperty("--band-top", `${s.bandTop.toFixed(3)}%`);
    timeRail.style.setProperty("--band-height", `${s.bandHeight.toFixed(3)}%`);
    timeRail.style.setProperty("--band-opacity", s.bandOpacity.toFixed(3));
    timeRail.style.setProperty("--slot-top", `${s.slotPos.toFixed(3)}%`);
    timeRail.style.setProperty("--jurassic-top", `${railPosition(201.4).toFixed(3)}%`);
  }

  function setText(el, text) {
    if (!el || el.textContent === text) return;
    el.textContent = text;
    if (window.gsap && !reducedMotion.matches) {
      gsap.fromTo(el, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
    }
  }

  function updateActive(index) {
    const next = Math.max(0, Math.min(N - 1, index));
    if (next === activeIndex) return;
    activeIndex = next;
    panels.forEach((item, itemIndex) => {
      const current = itemIndex === activeIndex;
      item.classList.toggle("is-active", current);
      item.setAttribute("aria-hidden", String(enhanced && !current));
      item.inert = enhanced && !current;
    });
    const info = ages[activeIndex];
    setText(currentAge, info.label);
    setText(slotLabel, info.slotText);
    timeRail?.classList.toggle("is-present", info.stop === "now");
    stopMarks.forEach((mark) => mark.classList.toggle("is-active", mark.dataset.stop === info.stop));
    if (!enhanced) {
      Object.assign(railLive, railState(info));
      applyRail();
    }
  }

  /* ------------------------------------------------------------------ */
  /* Controles que não dependem do modo de animação                      */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => goToPanel(activeIndex + 1));
  });
  document.querySelector("[data-go-start]")?.addEventListener("click", () => goToPanel(0));

  document.querySelector("[data-open-credits]")?.addEventListener("click", () => dialog?.showModal());
  document.querySelector("[data-close-credits]")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  /* ------------------------------------------------------------------ */
  /* Versão sem animações intensas: rolagem normal + linha do tempo      */
  /* ------------------------------------------------------------------ */
  function enableStatic() {
    root.classList.remove("intro-pending");
    clearTimeout(window.mesoIntroGuard);
    story?.classList.add("is-static-motion");
    updateActive(0);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) updateActive(panels.indexOf(mostVisible.target));
      }, { threshold: [0.35, 0.55, 0.75] });
      panels.forEach((panel) => observer.observe(panel));
    }
  }

  /* ------------------------------------------------------------------ */
  /* Expedição em capítulos: uma linha do tempo mestra, ligada à rolagem */
  /* ------------------------------------------------------------------ */

  // Collect the visible blocks in reading order, rather than indexing selectors
  // by a fixed editorial structure. This covers the Triassic and Jurassic chapters.
  const TEXT_STEPS = panels.map((panel, index) => {
    const flow = panel.querySelector(
      '.opening-copy, .site-copy, .panel--triassic-start .panel-copy, .copy-map, .copy-bottom, .copy-mid, .eoraptor-skeleton-copy, .eoraptor-bridge-copy, .eoraptor-detail-layout, .eoraptor-scale-copy, .copy-center, .jurassic-copy'
    );
    if (!flow) throw new Error('Texto ausente na cena ' + (index + 1));
    const selector = ':is(h1,h2,.eyebrow,.eoraptor-kicker,.eoraptor-support,.eoraptor-panel-label,.scene-prose > p,.science-note,.eoraptor-facts > div,.restart-journey,.credits-trigger--end,.image-caption)';
    const steps = Array.from(flow.querySelectorAll(selector)).filter(el =>
      !el.closest('.science-note') || el.classList.contains('science-note')
    ).map(el => [el]);
    if (index === 0) steps.push([panel.querySelector('.start-journey'), panel.querySelector('.video-play')], [panel.querySelector('.opening-foot')]);
    if (index === 1) steps.push([panel.querySelector('.site-photo > span')]);
    if (index === 7) steps.push([panel.querySelector('.dino-fossil-visual figcaption')]);
    if (index === 11) steps.push([panel.querySelector('.specimen-disclaimer')]);
    if (index === 12) steps.push([panel.querySelector('.scale-note')]);
    if (panel.classList.contains('panel--jurassic-diplodocus')) steps.push([panel.querySelector('.jurassic-specimen-facts')], [panel.querySelector('.jurassic-visual-note')]);
    if (panel.classList.contains('panel--jurassic-diplodocus-skeleton')) steps.push([panel.querySelector('.jurassic-pair-note')]);
    if (panel.querySelector('.specimen-choices')) steps.push([panel.querySelector('.specimen-choices')]);
    if (panel.classList.contains('panel--jurassic-comparison')) steps.push([panel.querySelector('.jurassic-lengths')]);
    return steps.map(group => group.filter(Boolean)).filter(group => group.length);
  });
  const VISUALS = [
    [], ['.site-photo'], [], ['.pangea-frame'], [], [], [], [],
    ['.fossil-closeup'], ['.skeleton-stage'], [],
    ['.eoraptor-facts-column', '.eoraptor-context-card'], [], [],
    [], ['.jurassic-rift-map'], ['.jurassic-landscape-image'],
    ['.jurassic-modern-photo'], ['.jurassic-fossil-photo'],
    ['.jurassic-pair-stage'], [], [], ['.jurassic-comparison-figure'], []
  ];
  const SPECIMEN_FROM = 10; // bridge → reconstruction; skeleton is scene 10

  let intro = null;

  function enableStory() {
    gsap.registerPlugin(ScrollTrigger);
    enhanced = true;
    root.classList.add("is-story-enhanced");
    story.style.setProperty("--panel-count", String(N));
    story.classList.add("is-enhanced");
    timeRail?.classList.add("is-synced");
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Camadas auxiliares: véu (profundidade) e linha de borda (limite geológico).
    const veils = panels.map((panel) => {
      const veil = document.createElement("div");
      veil.className = "panel-veil";
      veil.setAttribute("aria-hidden", "true");
      panel.appendChild(veil);
      return veil;
    });
    function makeEdge(panel, axis, side, limit) {
      const edge = document.createElement("i");
      edge.className = `panel-edge panel-edge--${axis} panel-edge--${side}${limit ? " panel-edge--limit" : ""}`;
      edge.setAttribute("aria-hidden", "true");
      panel.appendChild(edge);
      return edge;
    }

    const master = gsap.timeline({ paused: true, defaults: { ease: "none", immediateRender: false } });
    masterAnimation = master;
    const fromTo = (target, from, to, at, duration = 1) => {
      if (at + duration > Math.floor(at + 1e-7) + 1 + 1e-7) {
        throw new Error("Animação ultrapassa o intervalo da cena: " + at + " + " + duration);
      }
      return master.fromTo(target, from, Object.assign({ duration }, to), at);
    };
    const FULL = "inset(0% 0% 0% 0%)";

    // Cada passagem dura 1: saída do texto até .28, movimento em [.28,.64],
    // entrada do texto em [.66,.98]. Nenhum tween atravessa a parada seguinte.
    // Assim os dois textos nunca ficam visíveis ao mesmo tempo.
    const PD = 0.36;
    const PLATE_START = 0.28;

    function groups(index, selectors) {
      return selectors;
    }
    // Saída: de baixo para cima, curta. Na volta (rolagem ao contrário) o mesmo trecho
    // reaparece de cima para baixo, na ordem de leitura.
    function textOut(index, at) {
      const steps = groups(index, TEXT_STEPS[index]).reverse();
      const gap = steps.length > 1 ? Math.min(0.05, 0.14 / (steps.length - 1)) : 0;
      steps.forEach((els, k) => fromTo(els, { opacity: 1, y: 0 }, { opacity: 0, y: -10, ease: "power1.in" }, at + k * gap, 0.14));
    }
    // Entrada em etapas: identificação, título, explicação, informações complementares.
    function textIn(index, at, { from = 0.65, dur = 0.17 } = {}) {
      const steps = groups(index, TEXT_STEPS[index]);
      const gap = steps.length > 1 ? Math.min(0.1, (0.99 - from - dur) / (steps.length - 1)) : 0;
      steps.forEach((els, k) => {
        fromTo(els, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: "power3.out", immediateRender: true }, at + from + k * gap, dur);
      });
    }
    // Imagens da cena que chega: ficam ocultas até o início da própria entrada (antes apareciam inteiras e depois sumiam).
    function visualIn(index, at, { x = 0, y = 0, from = 0.28, duration = 0.36 } = {}) {
      const els = VISUALS[index].flatMap((selector) => Array.from(panels[index].querySelectorAll(selector)));
      els.forEach((el) => {
        fromTo(el, { opacity: 0, x, y }, { opacity: 1, x: 0, y: 0, ease: "power1.out", immediateRender: true }, at + from, duration);
      });
    }
    function enter(c, offsets, text) {
      const image = c.Q.querySelector(".full-bleed");
      if (image && c.i + 1 >= 4 && c.i + 1 <= 6) {
        const drift = c.i + 1 === 5 ? -1.5 : 1.5;
        fromTo(image, { scale: 1.045, xPercent: drift }, { scale: 1, xPercent: 0, ease: "power1.out" }, c.i + PLATE_START, PD);
      }
      visualIn(c.i + 1, c.i, offsets);
      textIn(c.i + 1, c.i, text);
    }

    function edgePulse(edge, at, peak) {
      fromTo(edge, { opacity: 0 }, { opacity: peak }, at + PLATE_START, 0.16 * PD);
      fromTo(edge, { opacity: peak }, { opacity: 0 }, at + PLATE_START + 0.84 * PD, 0.16 * PD);
    }

    // Cortina: a cena atual sobe e sai; a próxima aparece por baixo, um pouco mais devagar.
    function lift(c) {
      const epoch = c.Q.querySelector(".epoch-photo");
      if (epoch) fromTo(epoch, { opacity: .12, scale: 1.06 }, { opacity: 1, scale: 1, ease: "power1.out" }, c.i + PLATE_START, PD);
      fromTo(c.P, { yPercent: 0 }, { yPercent: -100 }, c.i + PLATE_START, PD);
      fromTo(c.Q, { yPercent: 14 }, { immediateRender: true, yPercent: 0 }, c.i + PLATE_START, PD);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.32 }, c.i + PLATE_START, PD);
      fromTo(c.nv, { opacity: 0.5 }, { opacity: 0 }, c.i + PLATE_START, PD);
      edgePulse(makeEdge(c.P, "h", "bottom", c.limit), c.i, c.limit ? 0.95 : 0.5);
      textOut(c.i, c.i);
      enter(c, { y: 44 });
    }
    // Placa lateral: a próxima cena entra pela direita sobre a anterior, que recua com paralaxe.
    function slab(c) {
      fromTo(c.Q, { xPercent: 100 }, { immediateRender: true, xPercent: 0 }, c.i + PLATE_START, PD);
      fromTo(c.P, { xPercent: 0 }, { xPercent: -16 }, c.i + PLATE_START, PD);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.6 }, c.i + PLATE_START, PD);
      edgePulse(makeEdge(c.Q, "v", "left", c.limit), c.i, 0.5);
      textOut(c.i, c.i);
      enter(c, { x: 70 });
    }
    // Janela horizontal: a cena abre a partir do centro, para os lados.
    function openSides(c) {
      fromTo(c.Q, { clipPath: "inset(0% 50% 0% 50%)" }, { immediateRender: true, clipPath: FULL }, c.i + PLATE_START, PD);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.55 }, c.i + PLATE_START, PD);
      const left = makeEdge(c.Q, "v", "left", false);
      const right = makeEdge(c.Q, "v", "right", false);
      fromTo(left, { left: "50%" }, { left: "0%" }, c.i + PLATE_START, PD);
      fromTo(right, { right: "50%" }, { right: "0%" }, c.i + PLATE_START, PD);
      edgePulse(left, c.i, 0.45);
      edgePulse(right, c.i, 0.45);
      textOut(c.i, c.i);
      enter(c, { y: 36 });
    }
    // Revelação de baixo para cima: a imagem fica parada e a cena nova sobe como uma camada.
    function riseUp(c) {
      fromTo(c.Q, { clipPath: "inset(100% 0% 0% 0%)" }, { immediateRender: true, clipPath: FULL }, c.i + PLATE_START, PD);
      fromTo(c.P, { yPercent: 0 }, { yPercent: -14 }, c.i + PLATE_START, PD);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.5 }, c.i + PLATE_START, PD);
      const top = makeEdge(c.Q, "h", "top", false);
      fromTo(top, { top: "100%" }, { top: "0%" }, c.i + PLATE_START, PD);
      edgePulse(top, c.i, 0.45);
      textOut(c.i, c.i);
      enter(c, { y: 40 });
    }
    // Saída lateral: a cena atual desliza para a esquerda e deixa a próxima, por baixo, assentar.
    function slideAway(c) {
      fromTo(c.P, { xPercent: 0 }, { xPercent: -100 }, c.i + PLATE_START, PD);
      fromTo(c.Q, { xPercent: 14 }, { immediateRender: true, xPercent: 0 }, c.i + PLATE_START, PD);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.3 }, c.i + PLATE_START, PD);
      fromTo(c.nv, { opacity: 0.5 }, { opacity: 0 }, c.i + PLATE_START, PD);
      edgePulse(makeEdge(c.P, "v", "right", false), c.i, 0.5);
      textOut(c.i, c.i);
      enter(c, { x: 60 });
    }
    // O ambiente perde luz enquanto a evidência fóssil se revela dentro da própria fotografia.
    // A transição evita outra cortina atravessando todo o painel.
    function fossilReveal(c) {
      fromTo(c.P, { opacity: 1 }, { opacity: 0, ease: "power1.inOut" }, c.i + PLATE_START, PD);
      fromTo(c.Q, { opacity: 0 }, { immediateRender: true, opacity: 1, ease: "power1.inOut" }, c.i + PLATE_START, PD);
      textOut(c.i, c.i);
      const figure = c.Q.querySelector(".dino-fossil-visual");
      const image = figure?.querySelector("img");
      if (figure) fromTo(figure, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power2.out" }, c.i + 0.28, 0.36);
      if (image) fromTo(image, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: FULL, ease: "power1.inOut" }, c.i + 0.28, 0.36);
      textIn(c.i + 1, c.i, { from: 0.66, dur: 0.14 });
    }
    // Janela vertical: uma fresta no horizonte se abre para cima e para baixo.
    function openVertical(c) {
      if (c.i === 7) {
        const detail = c.Q.querySelector(".fossil-closeup img");
        if (detail) fromTo(detail, { scale: 1.16, transformOrigin: "55% 44%" }, { scale: 1, ease: "power1.out" }, c.i + PLATE_START, PD);
      }
      fromTo(c.Q, { clipPath: "inset(50% 0% 50% 0%)" }, { immediateRender: true, clipPath: FULL }, c.i + PLATE_START, PD);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.5 }, c.i + PLATE_START, PD);
      const top = makeEdge(c.Q, "h", "top", false);
      const bottom = makeEdge(c.Q, "h", "bottom", false);
      fromTo(top, { top: "50%" }, { top: "0%" }, c.i + PLATE_START, PD);
      fromTo(bottom, { bottom: "50%" }, { bottom: "0%" }, c.i + PLATE_START, PD);
      edgePulse(top, c.i, 0.45);
      edgePulse(bottom, c.i, 0.45);
      textOut(c.i, c.i);
      enter(c, { y: 30 });
    }

    /* ---------------------------------------------------------------- */
    /* Esqueleto → reconstrução                                          */
    /* As duas imagens ocupam exatamente o mesmo retângulo (medido a     */
    /* partir do espécime da reconstrução). Uma linha percorre só a      */
    /* extensão visível do animal: à esquerda dela já está a             */
    /* reconstrução, à direita ainda está o esqueleto.                   */
    /* ---------------------------------------------------------------- */
    // Alpha bounds measured separately (alpha > 20) from the supplied, unchanged PNGs.
    const BOUNDS = {
      skeleton: { w: 1448, h: 1086, left: 61, right: 1401, top: 26, bottom: 1075 },
      reconstruction: { w: 1448, h: 1086, left: 192, right: 1380, top: 24, bottom: 1080 }
    };
    const wipe = { p: 0 };
    const transfer = { p: 0 };
    const previousSkeletonPanel = panels[SPECIMEN_FROM - 1];
    const previousSkeletonStage = previousSkeletonPanel.querySelector('.skeleton-stage');
    const previousSkeletonImage = previousSkeletonStage.querySelector('img');
    const skeletonPanel = panels[SPECIMEN_FROM];
    const reconPanel = panels[SPECIMEN_FROM + 1];
    const skeletonStage = skeletonPanel.querySelector('.skeleton-stage');
    const skeletonImage = skeletonStage.querySelector('img');
    const reconStage = reconPanel.querySelector('.specimen-stage--wipe');
    const reconImage = reconStage.querySelector('.specimen--reconstruction');
    const scalePanel = panels[SPECIMEN_FROM + 2];
    const scaleImage = scalePanel.querySelector('.scale-dinosaur');
    const wipeLine = reconStage.querySelector('.specimen-wipe-line');
    skeletonStage.appendChild(wipeLine);
    const geo = { ready: false };

    function applyWipe() {
      if (!geo.ready) return;
      const x = geo.left + wipe.p * (geo.right - geo.left);
      const r = geo.recon, s = geo.skeleton;
      reconImage.style.clipPath = `inset(0px ${Math.max(0, r.x + r.w - x)}px 0px 0px)`;
      skeletonImage.style.clipPath = `inset(0px 0px 0px ${Math.max(0, x - s.x)}px)`;
      wipeLine.style.left = `${x}px`;
      wipeLine.style.opacity = Math.max(0, Math.min(1, wipe.p / .04, (1 - wipe.p) / .04));
    }

    function applyTransfer() {
      if (!geo.ready) return;
      const p = transfer.p;
      reconImage.style.transformOrigin = '0 0';
      reconImage.style.transform = `translate(${geo.dx * p}px, ${geo.dy * p}px) scale(${1 + (geo.ratio - 1) * p})`;
    }

    function measureSpecimen() {
      const panelBox = reconPanel.getBoundingClientRect();
      const box = reconStage.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const left = box.left - panelBox.left, top = box.top - panelBox.top;
      const alignedStage = { left: `${left}px`, top: `${top}px`, width: `${box.width}px`, height: `${box.height}px`, bottom: 'auto', minHeight: '0' };
      Object.assign(skeletonStage.style, alignedStage);
      Object.assign(previousSkeletonStage.style, alignedStage);
      // Preserve proportions; align the visible head/right edge and the foot baseline.
      // The provisional skeleton's tail/limbs differ: do not stretch it into false anatomical agreement.
      const r = BOUNDS.reconstruction, s = BOUNDS.skeleton;
      const k = (r.bottom - r.top) / (s.bottom - s.top);
      const unionWidth = Math.max(r.right - r.left, (s.right - s.left) * k);
      const unit = Math.min((box.width - 16) / unionWidth, (box.height - 16) / (r.bottom - r.top));
      const right = (box.width + unionWidth * unit) / 2;
      const bottom = (box.height + (r.bottom - r.top) * unit) / 2;
      function place(img, b, factor) {
        const u = unit * factor;
        const frame = { x: right - b.right * u, y: bottom - b.bottom * u, w: b.w * u, h: b.h * u };
        Object.assign(img.style, { left: `${frame.x}px`, top: `${frame.y}px`, width: `${frame.w}px`, height: `${frame.h}px` });
        return frame;
      }
      geo.recon = place(reconImage, r, 1);
      geo.skeleton = place(skeletonImage, s, k);
      place(previousSkeletonImage, s, k);
      geo.left = right - unionWidth * unit - 2;
      geo.right = right + 2;
      wipeLine.style.top = `${bottom - (r.bottom - r.top) * unit - 2}px`;
      wipeLine.style.height = `${(r.bottom - r.top) * unit + 4}px`;
      const target = scaleImage.getBoundingClientRect();
      const targetPanel = scalePanel.getBoundingClientRect();
      geo.dx = target.left - targetPanel.left - left - geo.recon.x;
      geo.dy = target.top - targetPanel.top - top - geo.recon.y;
      geo.ratio = target.width / geo.recon.w;
      geo.ready = true;
      applyWipe();
      applyTransfer();
    }

    function skeletonToBridge(c) {
      // Both unchanged skeleton PNGs are measured into the same visible rectangle.
      // The new copy arrives over the animal before the following wipe begins.
      fromTo(c.Q, { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + .28, .36);
      textOut(c.i, c.i);
      textIn(c.i + 1, c.i);
    }

    function specimenWipe(c) {
      textOut(c.i, c.i);
      fromTo(wipe, { p: 0 }, { p: 1, onUpdate: applyWipe }, c.i + .28, .36);
      fromTo(c.Q.querySelector('.eoraptor-backdrop'), { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + .50, .22);
      // Os blocos chegam com o texto, depois que a varredura revela o animal.
      visualIn(c.i + 1, c.i, { y: 12, from: .56, duration: .18 });
      textIn(c.i + 1, c.i);
    }

    function specimenToScale(c) {
      // The reconstruction itself moves. Only at the exact settled boundary does the
      // identical scale image take its place; both use the same measured rectangle.
      textOut(c.i, c.i);
      fromTo(c.P.querySelectorAll('.eoraptor-facts-column, .eoraptor-context-card'),
        { opacity: 1, y: 0 }, { opacity: 0, y: -12, ease: 'power1.in' }, c.i + .02, .20);
      fromTo(c.P.querySelector('.eoraptor-backdrop'), { opacity: 1 }, { opacity: 0 }, c.i + .02, .20);
      fromTo(transfer, { p: 0 }, { p: 1, ease: 'power2.inOut', onUpdate: applyTransfer }, c.i + .30, .34);
      fromTo(c.Q.querySelectorAll('.scale-person, .scale-ground'), { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + .66, .12);
      fromTo(c.Q.querySelectorAll('.dino-length-measure, .dino-hip-measure, .human-height-measure'),
        { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + .80, .12);
      textIn(c.i + 1, c.i, { from: .86, dur: .12 });
    }

    const jurassicReveal = { p: 0 };
    const jurassicRecon = story.querySelector('.panel--jurassic-diplodocus .jurassic-pair-stage--wipe');
    const jurassicBones = jurassicRecon.querySelector('.jurassic-pair-bones-frame');
    const jurassicLiving = jurassicRecon.querySelector('.jurassic-pair-living-frame');
    const jurassicLine = jurassicRecon.querySelector('.jurassic-pair-line');
    const jurassicTransfer = { p: 0 };
    const jurassicTarget = story.querySelector('.panel--jurassic-comparison .jurassic-comparison-animal');
    const jurassicGeometry = { ready: false };
    function applyJurassicTransfer() {
      if (!jurassicGeometry.ready) return;
      const p = jurassicTransfer.p;
      const scale = 1 + (jurassicGeometry.ratio - 1) * p;
      jurassicRecon.style.transformOrigin = '0 0';
      jurassicRecon.style.transform = `translate(${jurassicGeometry.dx * p}px, ${jurassicGeometry.dy * p}px) scale(${scale})`;
    }
    function measureJurassicTransfer() {
      const previous = jurassicRecon.style.transform;
      jurassicRecon.style.transform = 'none';
      const stageBox = jurassicRecon.getBoundingClientRect();
      const livingBox = jurassicRecon.getBoundingClientRect();
      const g3d = (window.MESOZOICO_3D || {}).diplodocus;
      // a transferência usa a caixa visível do animal (e não a tela com margens) para casar com o recorte justo da comparação
      const source = g3d ? { left: livingBox.left + g3d.lv[0] * livingBox.width, top: livingBox.top + g3d.lv[1] * livingBox.height, width: (g3d.lv[2] - g3d.lv[0]) * livingBox.width } : livingBox;
      const target = jurassicTarget.getBoundingClientRect();
      if (stageBox.width && source.width && target.width) {
        const ratio = target.width / source.width;
        jurassicGeometry.ratio = ratio;
        jurassicGeometry.dx = target.left - stageBox.left - (source.left - stageBox.left) * ratio;
        jurassicGeometry.dy = target.top - stageBox.top - (source.top - stageBox.top) * ratio;
        jurassicGeometry.ready = true;
      }
      jurassicRecon.style.transform = previous;
      applyJurassicTransfer();
    }
    function applyJurassicReveal() {
      const p = Math.max(0, Math.min(1, jurassicReveal.p));
      const g = (window.MESOZOICO_3D || {}).diplodocus;
      // a linha percorre só a extensão visível do animal, e não a tela inteira
      const x0 = g ? Math.min(g.sk[0], g.lv[0]) - .006 : 0, x1 = g ? Math.max(g.sk[2], g.lv[2]) + .006 : 1;
      const f = x0 + p * (x1 - x0);
      jurassicLiving.style.clipPath = p <= 0 ? 'inset(0 100% 0 0)' : p >= 1 ? 'none' : `inset(0 ${100 * (1 - f)}% 0 0)`;
      jurassicBones.style.clipPath = p <= 0 ? 'none' : p >= 1 ? 'inset(0 0 0 100%)' : `inset(0 0 0 ${100 * f}%)`;
      jurassicLine.style.left = `${100 * f}%`;
      if (g) { jurassicLine.style.top = `${100 * Math.min(g.sk[1], g.lv[1])}%`; jurassicLine.style.height = `${100 * (Math.max(g.sk[3], g.lv[3]) - Math.min(g.sk[1], g.lv[1]))}%`; }
      jurassicLine.style.opacity = p > .025 && p < .975 ? '1' : '0';
    }
    function jurassicSkeletonToBridge(c) {
      fromTo(c.Q, { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + .28, .36);
      textOut(c.i, c.i);
      textIn(c.i + 1, c.i);
    }
    function jurassicSpecimenWipe(c) {
      fromTo(c.Q, { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + .12, .02);
      textOut(c.i, c.i);
      fromTo(jurassicReveal, { p: 0 }, { p: 1, ease:'none', onUpdate: applyJurassicReveal }, c.i + .14, .73);
      fromTo(c.Q.querySelector('.jurassic-specimen-word'), { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + .66, .16);
      textIn(c.i + 1, c.i);
    }
    function jurassicSpecimenToScale(c) {
      textOut(c.i, c.i);
      fromTo(c.P.querySelectorAll('.jurassic-specimen-facts, .jurassic-visual-note'),
        { opacity: 1, y: 0 }, { opacity: 0, y: -12, ease: 'power1.in' }, c.i + .02, .20);
      fromTo(jurassicTransfer, { p: 0 }, { p: 1, ease: 'power2.inOut', onUpdate: applyJurassicTransfer }, c.i + .30, .42);
      textIn(c.i + 1, c.i, { from: .83, dur: .14 });
    }

    // Uma assinatura de movimento por passagem. "cover": a próxima cena fica por cima.
    const TRANSITIONS = [
      { run: lift, cover: false },                                // opening → Ischigualasto today
      { run: c => lift({ ...c, limit: true }), cover: false },   // present → Triassic boundary
      { run: slab, cover: true },                                // recovery → the single map
      { run: openSides, cover: true },                           // map → arid terrain
      { run: riseUp, cover: true },                              // arid terrain → water
      { run: slideAway, cover: false },                          // water → vegetation
      { run: fossilReveal, cover: true },                        // vegetation → dinosaur evidence
      { run: openVertical, cover: true },                        // record → fossil closeup
      { run: slab, cover: true },                                // fossil → skeleton
      { run: skeletonToBridge, cover: true },                    // skeleton → reflection on reconstruction
      { run: specimenWipe, cover: false },                       // visible-area specimen wipe
      { run: specimenToScale, cover: false },                    // same animal moves to human scale
      { run: c => lift({ ...c, limit: true }), cover: false },   // scale → Triassic boundary
      { run: lift, cover: false },                               // Triassic → Jurassic
      { run: slab, cover: true },                                // opening → rifting
      { run: openVertical, cover: true },                        // rifting → Morrison landscape
      { run: openSides, cover: true },                           // ancient landscape → present rock
      { run: fossilReveal, cover: true },                        // rock → fossil wall
      { run: lift, cover: false },                               // evidence → Diplodocus skeleton
      { run: jurassicSkeletonToBridge, cover: true },           // skeleton → interpretation
      { run: jurassicSpecimenWipe, cover: true },               // visible-area Jurassic wipe
      { run: jurassicSpecimenToScale, cover: false },            // same animal moves to the length comparison
      { run: riseUp, cover: true }                               // comparison → Cretaceous boundary
    ];
    if (TRANSITIONS.length !== N - 1) throw new Error('Número de passagens inconsistente');

    for (let i = 0; i < N - 1; i += 1) {
      const c = { i, P: panels[i], Q: panels[i + 1], pv: veils[i], nv: veils[i + 1] };
      TRANSITIONS[i].run(c);
      // Linha do tempo: o marcador, o preenchimento e a faixa viajam junto com a cena.
      const a = railState(ages[i]);
      const b = railState(ages[i + 1]);
      fromTo(railLive, a, Object.assign({}, b, { onUpdate: () => applyRail() }), i);
    }
    // Every child is bounded before linking progress to panel visibility.
    if (Math.abs(master.duration() - (N - 1)) > 1e-7) throw new Error("Duração da expedição inconsistente");

    applyRail();

    const vh = () => window.innerHeight;
    let busy = false;
    let anchorIndex = 0; // última cena em que a rolagem assentou
    let pendingWheelStep = 0;
    let scrollTween = null;
    let settleTimer = null;
    const stage = story.querySelector('.stage');
    const readingHint = document.createElement('span');
    readingHint.className = 'mobile-reading-hint';
    readingHint.setAttribute('aria-hidden', 'true');
    readingHint.innerHTML = 'Deslize para ler <b>↓</b>';
    stage.appendChild(readingHint);

    function updateReadingHint() {
      readingHint.classList.remove('is-visible');
      if (busy || anyDialogOpen() || !matchMedia('(max-width: 1050px), (max-height: 500px)').matches) return;
      const panel = panels[activeIndex];
      if (!panel?.classList.contains('is-active')) return;
      const area = Array.from(panel.querySelectorAll('*')).find((node) => {
        const overflow = getComputedStyle(node).overflowY;
        return (overflow === 'auto' || overflow === 'scroll') && node.scrollHeight > node.clientHeight + 24 && node.scrollTop < 8;
      });
      if (!area) return;
      const box = area.getBoundingClientRect();
      const frame = stage.getBoundingClientRect();
      if (box.height < 90 || box.bottom < 40 || box.top > innerHeight - 40) return;
      readingHint.style.left = `${Math.max(12, box.right - frame.left - 139)}px`;
      readingHint.style.top = `${Math.min(frame.height - 36, box.bottom - frame.top - 32)}px`;
      readingHint.classList.add('is-visible');
    }
    stage.addEventListener('scroll', () => requestAnimationFrame(updateReadingHint), true);
    window.addEventListener('resize', () => requestAnimationFrame(updateReadingHint));

    function syncState(position) {
      const base = Math.min(N - 1, Math.max(0, Math.floor(position + 1e-6)));
      const moving = base < N - 1 && position - base > 0.0005;
      const cover = moving ? TRANSITIONS[base].cover : false;
      panels.forEach((panel, k) => {
        const visible = k === base || (moving && k === base + 1);
        panel.style.visibility = visible ? "visible" : "hidden";
        let z = 0;
        if (visible) {
          if (!moving) z = 2;
          else if (k === base + 1) z = cover ? 4 : 2;
          else z = cover ? 2 : 4;
        }
        panel.style.zIndex = String(z);
      });
      scaleImage.style.visibility = position > 11 && position < 12 ? "hidden" : "";
      updateActive(Math.round(position));
    }

    const yFor = (index, trigger = storyTrigger) => trigger.start + (trigger.end - trigger.start) * (index / (N - 1));
    const nearest = () => Math.round(storyTrigger.progress * (N - 1));
    function alignToActive(trigger) {
      const y = yFor(anchorIndex, trigger);
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
    }

    storyTrigger = ScrollTrigger.create({
      id: "mesozoico-story",
      trigger: story,
      start: "top top",
      end: "bottom bottom",
      animation: master,
      scrub: true,
      onUpdate: (self) => {
        if (intro && self.progress > 0) {
          intro.progress(1).kill(); intro = null;
          self.animation.render(self.animation.time(), false, true);
        }
        syncState(self.progress * (N - 1));
      },
      onRefresh: (self) => {
        measureSpecimen();
        measureJurassicTransfer();
        syncState(self.progress * (N - 1));
        if (!busy) alignToActive(self);
        requestAnimationFrame(updateReadingHint);
      }
    });

    goToPanel = function (index) {
      const target = Math.max(0, Math.min(N - 1, index));
      pendingWheelStep = 0;
      panels[target].querySelectorAll('.eoraptor-skeleton-copy, .eoraptor-bridge-copy, .eoraptor-detail-layout, .eoraptor-facts-column, .eoraptor-scale-copy, .copy-center').forEach((area) => { area.scrollTop = 0; });
      const distance = Math.abs(target - storyTrigger.progress * (N - 1));
      scrollTween?.kill();
      scrollTween = null;
      if (distance < 0.001) { anchorIndex = target; busy = false; updateReadingHint(); return; }
      busy = true;
      readingHint.classList.remove('is-visible');
      const proxy = { y: window.scrollY };
      const origin = nearest();
      const special = Math.min(origin, target);
      const secondsPerScene = distance <= 1.01 && (special === 9 || special === 10 || special === 11) ? 3.2 : 2.3;
      const duration = Math.min(4.4, Math.max(0.45, secondsPerScene * distance));
      scrollTween = gsap.to(proxy, {
        y: yFor(target),
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          window.scrollTo(0, proxy.y);
          ScrollTrigger.update();
        },
        onComplete: () => {
          window.scrollTo(0, yFor(target));
          ScrollTrigger.update();
          scrollTween = null;
          anchorIndex = target;
          busy = false;
          updateReadingHint();
          const queuedStep = pendingWheelStep;
          pendingWheelStep = 0;
          if (queuedStep) goToPanel(target + queuedStep);
        }
      });
    };

    // Com o diálogo aberto, a rolagem de fundo fica travada; o diálogo só rola se o conteúdo for maior que ele.
    function activeDialog() {
      return specimenDialog?.open ? specimenDialog : dialog?.open ? dialog : null;
    }
    function dialogCanScroll(openDialog) {
      return !!openDialog && openDialog.scrollHeight > openDialog.clientHeight + 1;
    }
    function guardDialog(event) {
      const openDialog = activeDialog();
      if (!openDialog) return false;
      const inside = event.target instanceof Element && openDialog.contains(event.target);
      if (!(inside && dialogCanScroll(openDialog))) event.preventDefault();
      return true;
    }

    function step(direction, queueWheel = false) {
      if (busy) {
        if (queueWheel) pendingWheelStep = direction;
        return;
      }
      goToPanel(anchorIndex + direction);
    }

    function canScrollInside(target, direction) {
      for (let node = target instanceof Element ? target : null; node && node !== story; node = node.parentElement) {
        const overflow = getComputedStyle(node).overflowY;
        if (overflow !== 'auto' && overflow !== 'scroll') continue;
        if (node.scrollHeight <= node.clientHeight + 2) continue;
        if (direction > 0 && node.scrollTop < node.scrollHeight - node.clientHeight - 2) return true;
        if (direction < 0 && node.scrollTop > 2) return true;
      }
      return false;
    }

    // Roda e trackpad: um gesto avança uma cena. A inércia do gesto é descartada.
    let lastWheel = 0;
    let lastWheelStep = -Infinity;
    let armed = true;
    window.addEventListener("wheel", (event) => {
      if (event.ctrlKey) return;
      if (guardDialog(event)) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (canScrollInside(event.target, event.deltaY)) {
        armed = false;
        lastWheel = performance.now();
        return;
      }
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 300) armed = true;
      lastWheel = now;
      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      else if (event.deltaMode === 2) delta *= vh();
      const magnitude = Math.abs(delta);
      if (magnitude < 4) return;
      if (!armed || now - lastWheelStep < 650) return;
      armed = false;
      lastWheelStep = now;
      step(delta > 0 ? 1 : -1, true);
    }, { passive: false });

    // Teclado
    window.addEventListener("keydown", (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (anyDialogOpen()) {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key) && !dialogCanScroll(activeDialog())) event.preventDefault();
        else if (event.key === " " && !(event.target instanceof Element && event.target.closest("button, a, summary"))) event.preventDefault();
        return;
      }
      const interactive = event.target instanceof Element && event.target.closest("button, a, summary, input, textarea, select, [contenteditable]");
      let direction = 0;
      let jump = null;
      switch (event.key) {
        case "ArrowDown": case "PageDown": direction = 1; break;
        case "ArrowUp": case "PageUp": direction = -1; break;
        case " ": if (interactive) return; direction = event.shiftKey ? -1 : 1; break;
        case "Home": jump = 0; break;
        case "End": jump = N - 1; break;
        default: return;
      }
      if (direction && canScrollInside(event.target, direction)) return;
      event.preventDefault();
      if (event.repeat) return;
      if (jump !== null) { goToPanel(jump); return; }
      step(direction);
    });

    // Toque: um deslize vertical avança ou volta uma cena.
    let touchStart = null;
    let touchDone = false;
    window.addEventListener("touchstart", (event) => {
      if (anyDialogOpen() || event.touches.length !== 1) { touchStart = null; return; }
      touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY, target: event.target, reading: false };
      touchDone = false;
    }, { passive: true });
    window.addEventListener("touchmove", (event) => {
      if (!touchStart || event.touches.length !== 1) return;
      if (guardDialog(event)) return;
      if (touchStart.reading) return;
      const dy = touchStart.y - event.touches[0].clientY;
      if (canScrollInside(touchStart.target, dy)) { touchStart.reading = true; return; }
      event.preventDefault();
      if (touchDone) return;
      const dx = touchStart.x - event.touches[0].clientX;
      if (Math.abs(dy) > 46 && Math.abs(dy) > Math.abs(dx)) {
        touchDone = true;
        step(dy > 0 ? 1 : -1);
      }
    }, { passive: false });
    window.addEventListener("touchend", () => { touchStart = null; });

    // Arrastar a barra de rolagem ou usar a busca da página: ao parar, a rolagem assenta na cena mais próxima.
    window.addEventListener("scroll", () => {
      if (busy) return;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (busy || anyDialogOpen()) return;
        const position = storyTrigger.progress * (N - 1);
        const target = Math.round(position);
        if (Math.abs(position - target) * vh() > 1.5) goToPanel(target);
        else { anchorIndex = target; updateReadingHint(); }
      }, 220);
    }, { passive: true });

    dialog?.addEventListener("close", () => {
      if (!busy) window.scrollTo(0, yFor(anchorIndex));
      updateReadingHint();
    });
    specimenDialog?.addEventListener('close', () => {
      if (!busy) window.scrollTo(0, yFor(anchorIndex));
      updateReadingHint();
    });

    // Abertura: o vídeo começa sozinho e o texto entra por cima, em etapas.
    const openingSteps = groups(0, TEXT_STEPS[0]);
    intro = gsap.timeline({ delay: 0.48 });
    openingSteps.forEach((els, k) => {
      intro.fromTo(els, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.02, ease: "power3.out", immediateRender: true }, k * 0.42);
    });

    root.classList.remove("intro-pending");
    clearTimeout(window.mesoIntroGuard);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    syncState(0);
    ScrollTrigger.refresh();
    requestAnimationFrame(updateReadingHint);
  }

  function init() {
    const canAnimate = story && panels.length && window.gsap && window.ScrollTrigger && !reducedMotion.matches;
    if (!canAnimate) {
      enableStatic();
      return;
    }
    try {
      enableStory();
    } catch (error) {
      console.error("MESOZOICO: falha ao iniciar as transições; usando movimento leve por cena.", error);
      story?.classList.remove("is-enhanced");
      story?.classList.remove("is-static-motion");
      root.classList.remove("is-story-enhanced");
      timeRail?.classList.remove("is-synced");
      storyTrigger?.kill();
      masterAnimation?.kill();
      intro?.kill();
      gsap.killTweensOf(panels.flatMap(panel => [panel, ...panel.querySelectorAll("*")]));
      panels.forEach((panel) => {
        panel.querySelectorAll("*").forEach((el) => { gsap.set(el, { clearProps: "opacity,transform,clipPath,backgroundColor" }); });
        panel.removeAttribute("style");
        panel.querySelectorAll("*").forEach(el => el.removeAttribute("style"));
        panel.style.removeProperty("visibility");
        panel.style.removeProperty("z-index");
        panel.querySelectorAll(".panel-veil, .panel-edge").forEach((layer) => layer.remove());
      });
      enhanced = false;
      enableStatic();
    }
  }
  init();
  reducedMotion.addEventListener?.("change", () => window.location.reload());
})();

