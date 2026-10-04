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
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activeIndex = -1;
  let enhanced = false;
  let storyTrigger = null;
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
    if (!video) return;
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
    if (!video) return;
    video.muted = true;
    video.play().then(() => setPlaybackFallback(false)).catch(() => setPlaybackFallback(true));
  });

  /* ------------------------------------------------------------------ */
  /* Linha do tempo: rótulo, marcador e faixa saem da mesma fonte        */
  /* (os atributos data-age* de cada painel).                            */
  /* ------------------------------------------------------------------ */
  const AGE_PRESENT = 0;      // posição (%) do "agora"
  const AGE_START = 48;       // posição (%) de 251,9 Ma
  const AGE_END = 100;        // posição (%) de 201,4 Ma
  const MA_TOP = 251.9;
  const MA_BOTTOM = 201.4;
  const SLOT_DEFAULT_TEXT = slotLabel ? slotLabel.textContent.trim() : "233–230";

  function railPosition(age) {
    const clamped = Math.min(MA_TOP, Math.max(MA_BOTTOM, age));
    return AGE_START + ((MA_TOP - clamped) / (MA_TOP - MA_BOTTOM)) * (AGE_END - AGE_START);
  }
  const SLOT_DEFAULT_POS = railPosition((233 + 230) / 2);

  function readAge(panel) {
    const raw = panel.dataset.age || "now";
    const from = parseFloat(panel.dataset.ageFrom);
    const to = parseFloat(panel.dataset.ageTo);
    const hasBand = Number.isFinite(from) && Number.isFinite(to);
    let pos;
    if (raw === "now") pos = AGE_PRESENT;
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
      item.setAttribute("aria-hidden", String(!current));
    });
    const info = ages[activeIndex];
    setText(currentAge, info.label);
    setText(slotLabel, info.slotText);
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

  // Cada item: como a cena seguinte entra. "cover" = a próxima fica por cima da anterior.
  const ENTER_ITEMS = [
    [".opening-copy .eyebrow", ".opening-copy h1", ".opening-lede", ".start-journey"],
    [".panel-copy .eyebrow", ".panel-copy h2", ".panel-copy > p:not(.eyebrow)", ".science-note"],
    [".pangea-frame", ".copy-map .eyebrow", ".copy-map h2", ".copy-map > p:not(.eyebrow)"],
    [".copy-bottom .eyebrow", ".copy-bottom h2", ".copy-bottom > p:not(.eyebrow)", ".copy-bottom .image-caption"],
    [".panel-copy .eyebrow", ".panel-copy h2", ".panel-copy > p:not(.eyebrow)", ".panel-copy .image-caption"],
    [".panel-copy .eyebrow", ".panel-copy h2", ".panel-copy > p:not(.eyebrow)", ".panel-copy .image-caption"],
    [".panel-copy .eyebrow", ".panel-copy h2", ".panel-copy > p:not(.eyebrow)", ".science-note", ".dino-fossil-visual"],
    [".site-photo", ".site-copy .eyebrow", ".site-copy h2", ".site-copy > p:not(.eyebrow)", ".evidence-pair"],
    [".eoraptor-skeleton-copy h2", ".eoraptor-skeleton-copy p", ".skeleton-stage"],
    [".eoraptor-detail-title", ".eoraptor-intro", ".eoraptor-facts > div", ".science-note--dark", ".eoraptor-location", ".eoraptor-age-card"],
    [".eoraptor-scale-copy .eoraptor-kicker", ".eoraptor-scale-copy h2", ".eoraptor-scale-copy > p:last-child", ".scale-stage", ".scale-note"],
    [".copy-center .eyebrow", ".copy-center h2", ".copy-center > p:not(.eyebrow)", ".end-stop", ".restart-journey", ".credits-trigger--end"]
  ];

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
    const fromTo = (target, from, to, at, duration = 1) => master.fromTo(target, from, Object.assign({ duration }, to), at);
    const FULL = "inset(0% 0% 0% 0%)";

    // A reconstrução permanece na tela e encolhe até a escala final, sem a
    // placa lateral que fazia o animal parecer deslizar junto com a página.
    const reconstructionIndex = panels.findIndex(panel => panel.classList.contains("panel--eoraptor-reconstruction"));
    const reconstructionPanel = panels[reconstructionIndex];
    const scalePanel = panels[reconstructionIndex + 1];
    const reconstructionStage = reconstructionPanel?.querySelector(".specimen-stage--wipe");
    const reconstructionImage = reconstructionStage?.querySelector(".specimen--reconstruction");
    const scaleStage = scalePanel?.querySelector(".scale-stage");
    const scaleImage = scaleStage?.querySelector(".scale-dinosaur");
    const transfer = { p: 0 };
    const transferGeometry = { ready: false };
    const specimenBounds = { w: 1448, h: 1086, left: 192, right: 1380, top: 24, bottom: 1080 };

    function applySpecimenTransfer() {
      if (!transferGeometry.ready || !reconstructionImage) return;
      const p = transfer.p;
      reconstructionImage.style.transformOrigin = "0 0";
      reconstructionImage.style.transform = `translate(${transferGeometry.dx * p}px, ${transferGeometry.dy * p}px) scale(${1 + (transferGeometry.ratio - 1) * p})`;
    }

    function measureSpecimenTransfer() {
      if (!reconstructionImage || !reconstructionStage || !scaleStage || !scaleImage) return false;
      const oldReconstructionTransform = reconstructionPanel.style.transform;
      const oldScaleTransform = scalePanel.style.transform;
      const oldImageTransform = reconstructionImage.style.transform;
      reconstructionPanel.style.transform = "none";
      scalePanel.style.transform = "none";
      reconstructionImage.style.transform = "none";

      const sourcePanelBox = reconstructionPanel.getBoundingClientRect();
      const sourceStageBox = reconstructionStage.getBoundingClientRect();
      const targetStageBox = scaleStage.getBoundingClientRect();
      let targetBox = scaleImage.getBoundingClientRect();
      if (!sourceStageBox.width || !sourceStageBox.height || !targetBox.width || !targetBox.height) {
        reconstructionPanel.style.transform = oldReconstructionTransform;
        scalePanel.style.transform = oldScaleTransform;
        reconstructionImage.style.transform = oldImageTransform;
        return false;
      }

      const b = specimenBounds;
      const unit = Math.min((sourceStageBox.width - 16) / (b.right - b.left), (sourceStageBox.height - 16) / (b.bottom - b.top));
      const visibleWidth = (b.right - b.left) * unit;
      const visibleHeight = (b.bottom - b.top) * unit;
      const right = (sourceStageBox.width + visibleWidth) / 2;
      const bottom = (sourceStageBox.height + visibleHeight) / 2;
      const frame = {
        x: right - b.right * unit,
        y: bottom - b.bottom * unit,
        w: b.w * unit,
        h: b.h * unit
      };
      Object.assign(reconstructionImage.style, {
        position: "absolute",
        left: `${frame.x}px`,
        top: `${frame.y}px`,
        width: `${frame.w}px`,
        height: `${frame.h}px`,
        objectFit: "fill"
      });

      // Centre the final-scale Eoraptor over its current position. The human
      // reference remains to the right, so the transition reads as a shrink,
      // not as a horizontal scroll of the specimen.
      const alphaCenter = (b.left + b.right) / (2 * b.w);
      const sourceCenter = sourceStageBox.left - sourcePanelBox.left + frame.x + frame.w * alphaCenter;
      const targetCenterOffset = targetBox.width * alphaCenter;
      const targetLeft = sourceCenter - (targetStageBox.left - sourcePanelBox.left) - targetCenterOffset;
      scaleStage.style.setProperty("--dino-left", `${targetLeft}px`);
      targetBox = scaleImage.getBoundingClientRect();

      const targetTop = targetBox.top - scalePanel.getBoundingClientRect().top;
      transferGeometry.dx = targetBox.left - (sourceStageBox.left + frame.x);
      transferGeometry.dy = targetTop - (sourceStageBox.top - sourcePanelBox.top + frame.y);
      transferGeometry.ratio = targetBox.width / frame.w;
      transferGeometry.ready = Number.isFinite(transferGeometry.dx + transferGeometry.dy + transferGeometry.ratio) && transferGeometry.ratio > 0;

      reconstructionPanel.style.transform = oldReconstructionTransform;
      scalePanel.style.transform = oldScaleTransform;
      applySpecimenTransfer();
      return transferGeometry.ready;
    }

    // A abertura recebe a frase em camadas, enquanto o vídeo já está em andamento.
    const openingItems = ENTER_ITEMS[0].flatMap((selector) => Array.from(panels[0].querySelectorAll(selector)));
    gsap.fromTo(openingItems, { y: 18, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.86, stagger: 0.22, ease: "power3.out", delay: 0.3, clearProps: "transform"
    });

    // A cena se revela primeiro; cada bloco de texto assenta em seguida, com deslocamento curto.
    function enterCopy(index, at, { x = 0, y = 22, from = 0.28, stagger = 0.14, duration = 0.46 } = {}) {
      const items = ENTER_ITEMS[index].flatMap((selector) => Array.from(panels[index].querySelectorAll(selector)));
      items.forEach((el, k) => {
        const start = from + k * stagger;
        const fromVars = { x, y };
        fromVars.opacity = 0;
        fromTo(el, fromVars, { x: 0, y: 0, opacity: 1, ease: "power3.out" }, at + start, duration);
      });
    }

    function edgePulse(edge, at, peak) {
      fromTo(edge, { opacity: 0 }, { opacity: peak }, at, 0.16);
      fromTo(edge, { opacity: peak }, { opacity: 0 }, at + 0.84, 0.16);
    }

    // Cortina: a cena atual sobe e sai; a próxima aparece por baixo, um pouco mais devagar.
    function lift(c) {
      fromTo(c.P, { yPercent: 0 }, { yPercent: -100 }, c.i);
      fromTo(c.Q, { yPercent: 14 }, { yPercent: 0 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.32 }, c.i);
      fromTo(c.nv, { opacity: 0.5 }, { opacity: 0 }, c.i);
      edgePulse(makeEdge(c.P, "h", "bottom", c.limit), c.i, c.limit ? 0.95 : 0.5);
      enterCopy(c.i + 1, c.i);
    }
    // Placa lateral: a próxima cena entra pela direita sobre a anterior, que recua com paralaxe.
    function slab(c) {
      fromTo(c.Q, { xPercent: 100 }, { xPercent: 0 }, c.i);
      fromTo(c.P, { xPercent: 0 }, { xPercent: -16 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.6 }, c.i);
      edgePulse(makeEdge(c.Q, "v", "left", c.limit), c.i, 0.5);
      enterCopy(c.i + 1, c.i, { y: 18 });
    }
    // Janela horizontal: a cena abre a partir do centro, para os lados.
    function openSides(c) {
      fromTo(c.Q, { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: FULL }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.55 }, c.i);
      const left = makeEdge(c.Q, "v", "left", false);
      const right = makeEdge(c.Q, "v", "right", false);
      fromTo(left, { left: "50%" }, { left: "0%" }, c.i);
      fromTo(right, { right: "50%" }, { right: "0%" }, c.i);
      edgePulse(left, c.i, 0.45);
      edgePulse(right, c.i, 0.45);
      enterCopy(c.i + 1, c.i);
    }
    // Revelação de baixo para cima: a imagem fica parada e a cena nova sobe como uma camada.
    function riseUp(c) {
      fromTo(c.Q, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: FULL }, c.i);
      fromTo(c.P, { yPercent: 0 }, { yPercent: -14 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.5 }, c.i);
      const top = makeEdge(c.Q, "h", "top", false);
      fromTo(top, { top: "100%" }, { top: "0%" }, c.i);
      edgePulse(top, c.i, 0.45);
      enterCopy(c.i + 1, c.i);
    }
    // Saída lateral: a cena atual desliza para a esquerda e deixa a próxima, por baixo, assentar.
    function slideAway(c) {
      fromTo(c.P, { xPercent: 0 }, { xPercent: -100 }, c.i);
      fromTo(c.Q, { xPercent: 14 }, { xPercent: 0 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.3 }, c.i);
      fromTo(c.nv, { opacity: 0.5 }, { opacity: 0 }, c.i);
      edgePulse(makeEdge(c.P, "v", "right", false), c.i, 0.5);
      enterCopy(c.i + 1, c.i, { x: 16, y: 0 });
    }
    // Descida ao escuro: a floresta afunda e a cena do registro fóssil é revelada da esquerda para a direita.
    function wipeRight(c) {
      fromTo(c.Q, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: FULL }, c.i);
      fromTo(c.P, { xPercent: 0 }, { xPercent: 8 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.85 }, c.i);
      const outgoingCopy = c.P.querySelector(".panel-copy");
      if (outgoingCopy) fromTo(outgoingCopy, { x: 0, opacity: 1 }, { x: -36, opacity: 0, ease: "power1.in" }, c.i, 0.46);
      const edge = makeEdge(c.Q, "v", "right", false);
      fromTo(edge, { right: "100%" }, { right: "0%" }, c.i);
      edgePulse(edge, c.i, 0.5);
      enterCopy(c.i + 1, c.i, { x: -16, y: 0, from: 0.22, stagger: 0.14, duration: 0.46 });
    }
    // Janela vertical: uma fresta no horizonte se abre para cima e para baixo.
    function openVertical(c) {
      fromTo(c.Q, { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: FULL }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.5 }, c.i);
      const top = makeEdge(c.Q, "h", "top", false);
      const bottom = makeEdge(c.Q, "h", "bottom", false);
      fromTo(top, { top: "50%" }, { top: "0%" }, c.i);
      fromTo(bottom, { bottom: "50%" }, { bottom: "0%" }, c.i);
      edgePulse(top, c.i, 0.45);
      edgePulse(bottom, c.i, 0.45);
      enterCopy(c.i + 1, c.i);
    }

    // A reconstrução surge como uma linha que atravessa somente a imagem do espécime.
    function specimenWipe(c) {
      const oldImage = c.P.querySelector(".skeleton-stage img");
      const stage = c.Q.querySelector(".specimen-stage--wipe");
      const reconstruction = stage?.querySelector(".specimen--reconstruction");
      const wipeLine = stage?.querySelector(".specimen-wipe-line");
      const oldCopy = c.P.querySelector(".eoraptor-skeleton-copy");
      if (oldImage) fromTo(oldImage, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 100%)", ease: "power1.inOut" }, c.i + 0.06, 0.84);
      if (reconstruction) fromTo(reconstruction, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: FULL, ease: "power1.inOut" }, c.i + 0.06, 0.84);
      if (wipeLine) {
        fromTo(wipeLine, { left: "0%", opacity: 0 }, { left: "100%", opacity: 1, ease: "none" }, c.i + 0.06, 0.78);
        fromTo(wipeLine, { opacity: 1 }, { opacity: 0 }, c.i + 0.84, 0.16);
      }
      if (oldCopy) fromTo(oldCopy, { opacity: 1, y: 0 }, { opacity: 0, y: -14, ease: "power1.in" }, c.i, 0.48);
      enterCopy(c.i + 1, c.i, { y: 20, from: 0.2, stagger: 0.11, duration: 0.42 });
    }

    function specimenToScale(c) {
      if (!transferGeometry.ready && !measureSpecimenTransfer()) {
        slab(c);
        return;
      }

      const outgoing = [
        c.P.querySelector(".eoraptor-detail-title"),
        c.P.querySelector(".eoraptor-intro"),
        ...Array.from(c.P.querySelectorAll(".eoraptor-facts > div")),
        c.P.querySelector(".science-note--dark"),
        c.P.querySelector(".eoraptor-context-column"),
        c.P.querySelector(".specimen-disclaimer")
      ].filter(Boolean);
      outgoing.forEach((el, k) => fromTo(el, { opacity: 1, y: 0 }, { opacity: 0, y: -12, ease: "power1.in" }, c.i + k * 0.035, 0.13));

      fromTo(transfer, { p: 0 }, { p: 1, ease: "power2.inOut", onUpdate: applySpecimenTransfer }, c.i + 0.22, 0.48);

      const incoming = [
        c.Q.querySelector(".eoraptor-scale-copy .eoraptor-kicker"),
        c.Q.querySelector(".eoraptor-scale-copy h2"),
        c.Q.querySelector(".eoraptor-scale-copy > p:last-child")
      ].filter(Boolean);
      incoming.forEach((el, k) => fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: "power3.out", immediateRender: true }, c.i + 0.58 + k * 0.1, 0.2));

      const comparison = c.Q.querySelectorAll(".scale-person, .scale-ground");
      fromTo(comparison, { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + 0.76, 0.16);
      fromTo(c.Q.querySelector(".dino-length-measure"), { opacity: 0 }, { opacity: 1, immediateRender: true }, c.i + 0.84, 0.12);
      fromTo(c.Q.querySelector(".scale-note"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "power2.out", immediateRender: true }, c.i + 0.9, 0.1);
    }

    // Uma assinatura de movimento por passagem. "cover": a próxima cena fica por cima.
    const TRANSITIONS = [
      { run: (c) => lift({ ...c, limit: true }), cover: false },  // abertura → limite Permiano–Triássico
      { run: slab, cover: true },                                // limite → mapa de Pangeia
      { run: openSides, cover: true },                           // mapa → paisagem seca
      { run: riseUp, cover: true },                              // paisagem seca → água
      { run: slideAway, cover: false },                          // água → floresta
      { run: wipeRight, cover: true },                           // floresta → dinossauros
      { run: openVertical, cover: true },                        // dinossauros → Ischigualasto
      { run: slab, cover: true },                                // Ischigualasto → Eoraptor
      { run: specimenWipe, cover: false },                       // esqueleto → reconstrução: corte restrito ao espécime
      { run: specimenToScale, cover: false },                    // reconstrução → encolhe no mesmo lugar até a escala humana
      { run: (c) => lift({ ...c, limit: true }), cover: false }   // escala → limite Triássico–Jurássico
    ];

    for (let i = 0; i < N - 1; i += 1) {
      const c = { i, P: panels[i], Q: panels[i + 1], pv: veils[i], nv: veils[i + 1] };
      TRANSITIONS[i].run(c);
      // Linha do tempo: o marcador, o preenchimento e a faixa viajam junto com a cena.
      const a = railState(ages[i]);
      const b = railState(ages[i + 1]);
      fromTo(railLive, a, Object.assign({}, b, { onUpdate: () => applyRail() }), i);
    }
    master.set({}, {}, N - 1); // garante a duração total N - 1

    applyRail();

    const vh = () => window.innerHeight;
    let busy = false;
    let anchorIndex = 0; // última cena em que a rolagem assentou
    let unlockAt = 0;
    let scrollTween = null;
    let settleTimer = null;

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
      if (scaleImage) scaleImage.style.visibility = position > reconstructionIndex && position < reconstructionIndex + 1 ? "hidden" : "";
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
      onUpdate: (self) => syncState(self.progress * (N - 1)),
      onRefresh: (self) => {
        measureSpecimenTransfer();
        syncState(self.progress * (N - 1));
        if (!busy) alignToActive(self);
      }
    });

    goToPanel = function (index) {
      const target = Math.max(0, Math.min(N - 1, index));
      const distance = Math.abs(target - storyTrigger.progress * (N - 1));
      if (distance < 0.001) { anchorIndex = target; return; }
      scrollTween?.kill();
      busy = true;
      const proxy = { y: window.scrollY };
      const duration = Math.min(3, 1.25 + 0.22 * (Math.ceil(distance) - 1));
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
          unlockAt = performance.now() + 140;
          busy = false;
        }
      });
    };

    // Com o diálogo aberto, a rolagem de fundo fica travada; o diálogo só rola se o conteúdo for maior que ele.
    function dialogCanScroll() {
      return !!dialog && dialog.scrollHeight > dialog.clientHeight + 1;
    }
    function guardDialog(event) {
      if (!dialog?.open) return false;
      const inside = event.target instanceof Element && event.target.closest(".credits-dialog");
      if (!(inside && dialogCanScroll())) event.preventDefault();
      return true;
    }

    function step(direction) {
      if (busy || performance.now() < unlockAt) return;
      goToPanel(nearest() + direction);
    }

    // Roda e trackpad: um gesto avança uma cena. A inércia do gesto é descartada.
    let lastWheel = 0;
    let lastMagnitude = 0;
    let armed = true;
    window.addEventListener("wheel", (event) => {
      if (event.ctrlKey) return;
      if (guardDialog(event)) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 170) armed = true;
      lastWheel = now;
      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      else if (event.deltaMode === 2) delta *= vh();
      const magnitude = Math.abs(delta);
      const surge = magnitude >= 60 && magnitude > lastMagnitude * 1.9;
      lastMagnitude = magnitude;
      if (busy || now < unlockAt) { armed = false; return; }
      if (magnitude < 4) return;
      if (!armed && !surge) return;
      armed = false;
      step(delta > 0 ? 1 : -1);
    }, { passive: false });

    // Teclado
    window.addEventListener("keydown", (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (dialog?.open) {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key) && !dialogCanScroll()) event.preventDefault();
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
      event.preventDefault();
      if (jump !== null) { if (!busy) goToPanel(jump); return; }
      step(direction);
    });

    // Toque: um deslize vertical avança ou volta uma cena.
    let touchStart = null;
    let touchDone = false;
    window.addEventListener("touchstart", (event) => {
      if (dialog?.open || event.touches.length !== 1) { touchStart = null; return; }
      touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      touchDone = false;
    }, { passive: true });
    window.addEventListener("touchmove", (event) => {
      if (!touchStart || event.touches.length !== 1) return;
      if (guardDialog(event)) return;
      event.preventDefault();
      if (touchDone) return;
      const dy = touchStart.y - event.touches[0].clientY;
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
        if (busy || dialog?.open) return;
        const position = storyTrigger.progress * (N - 1);
        const target = Math.round(position);
        if (Math.abs(position - target) * vh() > 1.5) goToPanel(target);
        else anchorIndex = target;
      }, 220);
    }, { passive: true });

    dialog?.addEventListener("close", () => {
      if (!busy) window.scrollTo(0, yFor(anchorIndex));
    });

    syncState(0);
    scaleImage?.addEventListener("load", () => {
      measureSpecimenTransfer();
      ScrollTrigger.refresh();
    }, { once: true });
    ScrollTrigger.refresh();
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
      panels.forEach((panel) => {
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
