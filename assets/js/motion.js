/* PAIGE 18 — motion layer (intro, split text, image wipes, parallax, cursor) */
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;

  /* ---------- split words ---------- */
  function split(el) {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    let i = 0;
    const walk = node => {
      Array.from(node.childNodes).forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span");
            w.className = "w";
            w.innerHTML = `<i style="--i:${i++}"></i>`;
            w.firstChild.textContent = part;
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    el.classList.add("split");
    el.classList.remove("reveal");
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      (e.target._wipes || []).forEach(w => w.classList.add("is-in"));
      if (e.target.classList.contains("partbar")) scramble($(".partbar__center", e.target));
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  function prepare() {
    $$(".hero__title, .section-title, .about__word, .subhero__title, .next-work b").forEach(el => {
      split(el);
      if (!el.closest(".hero")) io.observe(el);
    });

    // hero supporting elements fade in after intro
    $$(".hero__row, .hero__cta, .hero__overlay-tag").forEach((el, n) => {
      el.classList.add("fx");
      el.style.setProperty("--d", `${900 + n * 120}ms`);
    });
    const hero = $(".hero");
    if (hero && !$(".scroll-cue", hero)) hero.insertAdjacentHTML("beforeend", '<span class="scroll-cue" aria-hidden="true"></span>');

    // image curtain wipes
    $$(".work__poster, .person__img, .about__img, .stills > .ph, .subhero > .ph, #d-hero").forEach(el => {
      // a fully clipped element never reports as intersecting, so watch its parent
      el.classList.add("wipe");
      const host = el.parentElement;
      (host._wipes = host._wipes || []).push(el);
      io.observe(host);
    });
    $$(".grid-works .work").forEach((el, n) => el.style.setProperty("--n", n % 4));
    $$(".laurel").forEach((el, n) => el.style.setProperty("--n", n));
    $$(".reel__strip .ph").forEach((el, n) => el.style.setProperty("--n", n));
    $$(".laurels, .partbar").forEach(el => io.observe(el));
  }

  /* ---------- partbar scramble ---------- */
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_";
  function scramble(el) {
    if (!el || reduce) return;
    const target = el.textContent;
    let frame = 0;
    const total = 22;
    const tick = () => {
      el.textContent = target.split("").map((c, k) => {
        if (c === " ") return " ";
        return k < (frame / total) * target.length ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }).join("");
      if (frame++ < total) requestAnimationFrame(tick); else el.textContent = target;
    };
    tick();
  }

  /* ---------- intro (index only, once per session) ---------- */
  function intro(done) {
    let seen = false;
    try { seen = sessionStorage.getItem("p18-intro") === "1"; } catch (e) {}
    if (reduce || seen || !$(".hero")) return done();
    try { sessionStorage.setItem("p18-intro", "1"); } catch (e) {}

    body.insertAdjacentHTML("afterbegin", `
      <div class="intro" aria-hidden="true">
        <div class="intro__cross"></div>
        <div class="intro__ring"></div>
        <div class="intro__sweep"></div>
        <div class="intro__num">00</div>
        <div class="intro__word"><span class="mono">PAIGE 18 PRODUCTION</span><span class="mono">VANCOUVER — FILM · THEATRE · SERIES</span></div>
      </div>`);
    const el = $(".intro");
    const num = $(".intro__num", el);
    const t0 = performance.now();
    const dur = 1500;
    const step = t => {
      const p = Math.min((t - t0) / dur, 1);
      num.textContent = String(Math.round(18 * p)).padStart(2, "0");
      if (p < 1) return requestAnimationFrame(step);
      setTimeout(() => {
        el.classList.add("is-done");
        done();
        setTimeout(() => el.remove(), 1200);
      }, 250);
    };
    requestAnimationFrame(step);
  }

  /* ---------- parallax ---------- */
  function parallax() {
    if (reduce) return;
    const words = $$(".about__word");
    const foot = $(".footer__word");
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      words.forEach((w, k) => {
        const r = w.getBoundingClientRect();
        const p = (r.top + r.height / 2 - vh / 2) / vh;      // -1 … 1 around viewport centre
        w.style.transform = `translate3d(${(k ? -1 : 1) * p * 60}px,0,0)`;
      });
      if (foot) {
        const r = foot.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.8)));
        foot.style.transform = `translate3d(0,${(1 - p) * 40}px,0)`;
        foot.style.opacity = 0.25 + p * 0.75;
      }
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- custom cursor ---------- */
  function cursor() {
    if (reduce || !window.matchMedia("(hover: hover)").matches) return;
    const c = document.createElement("div");
    c.className = "cursor";
    body.appendChild(c);
    let x = -100, y = -100, cx = x, cy = y;
    window.addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      c.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", e => {
      const work = e.target.closest(".work, .reel__play");
      const link = !work && e.target.closest("a, button, input, select, textarea");
      c.classList.toggle("is-hover", !!work);
      c.classList.toggle("is-link", !!link);
      c.textContent = work ? (work.classList.contains("reel__play") ? "PLAY" : "VIEW") : "";
    });
  }

  /* ---------- boot ---------- */
  // main.js renders works/people synchronously before this file runs
  prepare();
  parallax();
  cursor();
  intro(() => requestAnimationFrame(() => body.classList.add("loaded")));
})();
