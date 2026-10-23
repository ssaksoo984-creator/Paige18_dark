(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const data = window.P18 || { works: [], people: [] };
  const TYPE_LABEL = { film: "Film", series: "Series", theatre: "Theatre" };

  /* ---------- placeholder / media helper ---------- */
  function media(opts) {
    const { label = "IMG", tone = [210, 10], src = "", video = false, cls = "" } = opts;
    const style = `--h:${tone[0]};--s:${tone[1]}%;--px:${20 + ((tone[0] * 7) % 60)}%;--py:${15 + ((tone[0] * 3) % 40)}%`;
    let inner = "";
    if (src) inner = video
      ? `<video src="${src}" muted loop playsinline preload="none"></video>`
      : `<img src="${src}" alt="" loading="lazy" decoding="async" onerror="this.parentNode.classList.remove('has-media');this.remove()">`;
    return `<div class="ph ${cls} ${src ? "has-media" : ""}" data-label="${label}" style="${style}">${inner}</div>`;
  }

  /* ---------- header ---------- */
  const header = $(".header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $(".burger");
  if (burger) {
    const label = $("em", burger);
    const setMenu = open => {
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (label) label.textContent = open ? "Close" : "Menu";
    };
    burger.addEventListener("click", () => setMenu(!document.body.classList.contains("nav-open")));
    $$(".nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- hero video sound toggle ---------- */
  const heroVideo = $(".hero video");
  const soundBtn = $(".hero__sound");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundBtn.classList.toggle("is-muted");
      if (heroVideo) heroVideo.muted = soundBtn.classList.contains("is-muted");
    });
  }

  /* ---------- works grid ---------- */
  const grid = $("#works-grid");
  if (grid) {
    grid.innerHTML = data.works.map((w, i) => `
      <a class="work reveal" href="work.html?id=${w.id}" data-type="${w.type}">
        <div class="work__poster">
          ${media({ label: "POSTER", tone: w.tone, src: w.poster })}
          <div class="work__title-poster">
            <span class="mono"><span>P18 — ${String(i + 1).padStart(2, "0")}</span><span>${w.year}</span></span>
            <h3>${w.title}</h3>
          </div>
          <div class="work__preview">
            ${media({ label: "VIDEO PREVIEW", tone: [w.tone[0], w.tone[1] + 8], src: w.preview, video: true })}
            <span class="rec">PREVIEW</span>
          </div>
          <div class="work__info">
            <p>${w.logline}</p>
            <span class="mono">View project →</span>
          </div>
        </div>
        <div class="work__meta"><span>${w.title}</span><span>${TYPE_LABEL[w.type]} /${String(i + 1).padStart(2, "0")}</span></div>
      </a>`).join("");

    // hover: play real preview videos if provided
    $$(".work", grid).forEach(card => {
      const v = $(".work__preview video", card);
      if (!v) return;
      card.addEventListener("mouseenter", () => v.play().catch(() => {}));
      card.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
    });

    // counts
    const counts = { all: data.works.length };
    data.works.forEach(w => { counts[w.type] = (counts[w.type] || 0) + 1; });
    $$(".tab").forEach(t => { const s = $("sup", t); if (s) s.textContent = String(counts[t.dataset.filter] || 0).padStart(2, "0"); });

    $$(".tab").forEach(tab => tab.addEventListener("click", () => {
      $$(".tab").forEach(t => t.classList.toggle("is-active", t === tab));
      const f = tab.dataset.filter;
      const cards = $$(".work", grid);
      cards.forEach(card => card.classList.add("is-filtering"));
      setTimeout(() => {
        cards.forEach(card => card.classList.toggle("is-hidden", f !== "all" && card.dataset.type !== f));
        requestAnimationFrame(() => requestAnimationFrame(() => {
          cards.filter(c => !c.classList.contains("is-hidden")).forEach((c, n) => {
            c.style.setProperty("--n", n);
            c.classList.remove("is-filtering");
          });
        }));
      }, 380);
    }));
  }

  /* ---------- hero media ---------- */
  const heroMedia = $(".hero__media");
  const M = data.media || {};
  if (heroMedia && (M.heroVideo || M.hero)) {
    heroMedia.classList.add("has-media");
    heroMedia.insertAdjacentHTML("afterbegin", M.heroVideo
      ? `<video src="${M.heroVideo}" poster="${M.hero || ""}" autoplay muted loop playsinline></video>`
      : `<img src="${M.hero}" alt="" onerror="this.parentNode.classList.remove('has-media');this.remove()">`);
  }

  /* ---------- featured productions slider ---------- */
  const feat = $("#featured");
  if (feat) {
    const items = data.works.filter(w => w.featured);
    $(".feat__slides", feat).innerHTML = items.map((w, i) => `
      <article class="feat__slide${i ? "" : " is-active"}">
        <div class="feat__bg">${media({ label: "KEY ART", tone: w.tone, src: w.poster })}</div>
        <div class="feat__poster">${media({ label: "POSTER", tone: w.tone, src: w.poster })}</div>
        <div class="feat__copy">
          <span class="mono feat__kicker"><i class="sq red-bg"></i> ${TYPE_LABEL[w.type]} — ${w.year} — ${w.status}</span>
          <h3 class="feat__title">${w.title}</h3>
          <p class="feat__log">${w.logline}</p>
          <div class="hero__cta" style="margin-top:22px">
            <a href="work.html?id=${w.id}" class="btn btn--red">Explore <span class="arrow">→</span></a>
            <a href="work.html?id=${w.id}" class="btn">Watch Trailer</a>
          </div>
        </div>
      </article>`).join("");
    $(".feat__nav", feat).innerHTML = items.map((w, i) => `
      <button class="feat__tab${i ? "" : " is-active"}" data-i="${i}">
        <span class="mono">${String(i + 1).padStart(2, "0")} / ${TYPE_LABEL[w.type]}</span>
        <b>${w.title}</b>
        <span class="feat__bar"><i></i></span>
      </button>`).join("");

    const slides = $$(".feat__slide", feat);
    const tabs = $$(".feat__tab", feat);
    const DUR = 6500;
    let cur = 0, timer;
    const go = n => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === cur));
      tabs.forEach((t, k) => {
        t.classList.remove("is-active");
        if (k === cur) { void t.offsetWidth; t.classList.add("is-active"); }
      });
      $(".feat__count b", feat).textContent = String(cur + 1).padStart(2, "0");
      clearTimeout(timer);
      timer = setTimeout(() => go(cur + 1), DUR);
    };
    feat.style.setProperty("--dur", DUR + "ms");
    $(".feat__count span", feat).textContent = String(slides.length).padStart(2, "0");
    tabs.forEach(t => t.addEventListener("click", () => go(+t.dataset.i)));
    $(".feat__prev", feat).addEventListener("click", () => go(cur - 1));
    $(".feat__next", feat).addEventListener("click", () => go(cur + 1));
    go(0);
  }

  /* ---------- news ---------- */
  const news = $("#news-grid");
  if (news && data.news) {
    const fmt = d => new Date(d + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "2-digit" });
    news.innerHTML = data.news.map(n => {
      const w = data.works.find(x => x.id === n.work) || {};
      return `<a class="news-card reveal" href="work.html?id=${n.work}">
        <div class="news-card__img">${media({ label: "IMG", tone: w.tone || [210, 8], src: w.poster })}</div>
        <div class="news-card__meta mono"><span class="red">${n.tag}</span><span>${fmt(n.date)}</span></div>
        <h3>${n.title}</h3>
        <span class="mono news-card__more">Read more →</span>
      </a>`;
    }).join("");
  }

  /* ---------- people ---------- */
  const peopleGrid = $("#people-grid");
  if (peopleGrid) {
    peopleGrid.innerHTML = data.people.map((p, i) => `
      <article class="person reveal">
        <div class="person__img">${media({ label: "PORTRAIT", tone: [210 + i * 8, 6], src: p.photo })}<span class="person__idx">0${i + 1}</span></div>
        <h3>${p.name}</h3>
        <span class="mono role">${p.role}</span>
        <p>${p.note}</p>
      </article>`).join("");
  }

  /* ---------- laurel svg ---------- */
  function laurelSVG() {
    let leaves = "";
    const C = 75, CY = 55, R = 46;
    for (const side of [1, -1]) {           // 1 = left branch, -1 = mirrored right branch
      for (let i = 0; i < 9; i++) {
        const deg = 105 + i * 16;             // from bottom (90°) up toward the top
        const a = deg * Math.PI / 180;
        const x = (C + side * R * Math.cos(a)).toFixed(1);
        const y = (CY + R * Math.sin(a)).toFixed(1);
        const rot = side * (deg - 180 + 24);
        const s = 1 - i * 0.04;
        leaves += `<ellipse cx="${x}" cy="${y}" rx="${(3.2 * s).toFixed(2)}" ry="${(8.5 * s).toFixed(2)}" transform="rotate(${rot} ${x} ${y})" fill="currentColor"/>`;
      }
    }
    leaves += `<path d="M58 100 Q75 93 92 100" stroke="currentColor" stroke-width="1" fill="none"/>`;
    return `<svg viewBox="0 0 150 110" aria-hidden="true">${leaves}</svg>`;
  }
  $$(".laurel").forEach(l => l.insertAdjacentHTML("afterbegin", laurelSVG()));

  /* ---------- fill [data-ph] placeholders declared in HTML ---------- */
  $$("[data-ph]").forEach(el => {
    const tone = (el.dataset.tone || "210,10").split(",").map(Number);
    const key = el.dataset.key || "";
    const byWork = (data.works.find(w => w.id === key) || {}).poster;
    const src = el.dataset.src || (data.media || {})[key] || byWork || "";
    el.outerHTML = media({ label: el.dataset.ph, tone, src, video: el.hasAttribute("data-video"), cls: el.className });
  });

  /* ---------- stats count-up ---------- */
  const countUp = el => {
    const end = parseFloat(el.dataset.count);
    const dur = 1600; const t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      $$("[data-count]", e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  $$("[data-count]").forEach(el => { el.textContent = "0"; });
  $$(".reveal").forEach(el => io.observe(el));

  /* ---------- contact inquiry switch ---------- */
  const inquiries = $$(".inquiry");
  const subject = $("#f-type");
  const setInquiry = key => {
    inquiries.forEach(b => b.classList.toggle("is-active", b.dataset.type === key));
    if (subject) subject.value = key;
    $$(".form__extra").forEach(x => x.classList.toggle("is-on", x.dataset.for === key));
  };
  inquiries.forEach(b => b.addEventListener("click", () => setInquiry(b.dataset.type)));
  if (subject) subject.addEventListener("change", () => setInquiry(subject.value));
  if (inquiries.length) setInquiry("coproduction");

  const form = $("#contact-form");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    $(".form__note", form).textContent = "Thank you — your message has been received. We'll be in touch. (demo: connect a form backend)";
    form.reset(); setInquiry(subject ? "coproduction" : "");
  });
  const nl = $("#newsletter");
  if (nl) nl.addEventListener("submit", e => {
    e.preventDefault();
    const i = $("input", nl); i.value = ""; i.placeholder = "Subscribed — thank you.";
  });

  /* ---------- work detail page ---------- */
  const detail = $("#work-detail");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id");
    const idx = Math.max(0, data.works.findIndex(w => w.id === id));
    const w = data.works[idx];
    const next = data.works[(idx + 1) % data.works.length];
    document.title = `${w.title} — PAIGE 18 Production`;
    $("#d-hero").innerHTML = media({ label: "KEY ART / TRAILER", tone: w.tone, src: w.poster, cls: "ph--center" });
    $("#d-type").textContent = `${TYPE_LABEL[w.type]} — ${w.year}`;
    $("#d-title").textContent = w.title;
    $("#d-lead").textContent = w.logline;
    $("#d-specs").innerHTML = [
      ["Format", TYPE_LABEL[w.type]], ["Year", w.year], ["Runtime", w.runtime],
      ["Director", w.director], ["Status", w.status], ["Produced by", "PAIGE 18 Production"]
    ].map(([k, v]) => `<div><span class="mono">${k}</span><span>${v}</span></div>`).join("");
    $("#d-stills").innerHTML = ["STILL 01", "STILL 02", "STILL 03"].map((l, i) => media({ label: l, tone: [w.tone[0] + i * 6, w.tone[1]], src: w.poster, cls: "still-" + i })).join("");
    const n = $("#d-next"); n.href = `work.html?id=${next.id}`; $("b", n).textContent = next.title;
  }

  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
