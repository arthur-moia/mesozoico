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

  document.querySelectorAll("[data-specimen]").forEach((button) => {
    button.addEventListener("click", () => {
      const stage = document.querySelector(".specimen-stage");
      if (!stage) return;
      stage.dataset.show = button.dataset.specimen;
      document.querySelectorAll("[data-specimen]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });
  document.querySelector("[data-human-toggle]")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const stage = document.querySelector(".specimen-stage");
    const enabled = !stage?.classList.contains("show-human");
    stage?.classList.toggle("show-human", enabled);
    button.classList.toggle("is-selected", enabled);
    button.setAttribute("aria-pressed", String(enabled));
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
    [".opening-copy"],
    [".panel-copy"],
    [".pangea-frame", ".copy-map"],
    [".copy-bottom"],
    [".panel-copy"],
    [".panel-copy"],
    [".panel-copy", ".dino-outline"],
    [".site-photo", ".site-copy"],
    [".eoraptor-top", ".eoraptor-title", ".eoraptor-layout"],
    [".copy-center"]
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

    // A cena que chega ganha um atraso próprio: a forma abre primeiro, o texto assenta depois.
    function enterCopy(index, at, { x = 0, y = 0, from = 0.3 } = {}) {
      const items = ENTER_ITEMS[index].flatMap((selector) => Array.from(panels[index].querySelectorAll(selector)));
      items.forEach((el, k) => {
        const start = from + k * 0.07;
        const fade = !el.classList.contains("dino-outline"); // o contorno já tem opacidade própria
        const fromVars = { x, y };
        const toVars = { x: 0, y: 0, ease: "power1.out" };
        if (fade) { fromVars.opacity = 0; toVars.opacity = 1; }
        fromTo(el, fromVars, toVars, at + start, 1 - start);
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
      enterCopy(c.i + 1, c.i, { y: 44 });
    }
    // Placa lateral: a próxima cena entra pela direita sobre a anterior, que recua com paralaxe.
    function slab(c) {
      fromTo(c.Q, { xPercent: 100 }, { xPercent: 0 }, c.i);
      fromTo(c.P, { xPercent: 0 }, { xPercent: -16 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.6 }, c.i);
      edgePulse(makeEdge(c.Q, "v", "left", c.limit), c.i, 0.5);
      enterCopy(c.i + 1, c.i, { x: 70 });
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
      enterCopy(c.i + 1, c.i, { y: 36 });
    }
    // Revelação de baixo para cima: a imagem fica parada e a cena nova sobe como uma camada.
    function riseUp(c) {
      fromTo(c.Q, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: FULL }, c.i);
      fromTo(c.P, { yPercent: 0 }, { yPercent: -14 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.5 }, c.i);
      const top = makeEdge(c.Q, "h", "top", false);
      fromTo(top, { top: "100%" }, { top: "0%" }, c.i);
      edgePulse(top, c.i, 0.45);
      enterCopy(c.i + 1, c.i, { y: 40 });
    }
    // Saída lateral: a cena atual desliza para a esquerda e deixa a próxima, por baixo, assentar.
    function slideAway(c) {
      fromTo(c.P, { xPercent: 0 }, { xPercent: -100 }, c.i);
      fromTo(c.Q, { xPercent: 14 }, { xPercent: 0 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.3 }, c.i);
      fromTo(c.nv, { opacity: 0.5 }, { opacity: 0 }, c.i);
      edgePulse(makeEdge(c.P, "v", "right", false), c.i, 0.5);
      enterCopy(c.i + 1, c.i, { x: 60 });
    }
    // Descida ao escuro: a floresta afunda e a cena do registro fóssil é revelada da esquerda para a direita.
    function wipeRight(c) {
      fromTo(c.Q, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: FULL }, c.i);
      fromTo(c.P, { xPercent: 0 }, { xPercent: 8 }, c.i);
      fromTo(c.pv, { opacity: 0 }, { opacity: 0.85 }, c.i);
      const edge = makeEdge(c.Q, "v", "right", false);
      fromTo(edge, { right: "100%" }, { right: "0%" }, c.i);
      edgePulse(edge, c.i, 0.5);
      enterCopy(c.i + 1, c.i, { x: -48 });
      const outline = panels[c.i + 1].querySelector(".dino-outline");
      if (outline) fromTo(outline, { x: -70 }, { x: 0, ease: "power1.out" }, c.i + 0.2, 0.8);
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
      enterCopy(c.i + 1, c.i, { y: 30 });
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
      { run: (c) => lift({ ...c, limit: true }), cover: false }   // Eoraptor → limite Triássico–Jurássico
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
