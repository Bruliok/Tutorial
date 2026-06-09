(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const $  = (s, sc) => (sc || document).querySelector(s);
  const $$ = (s, sc) => Array.from((sc || document).querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---- Sync editable content from manifest (enrich; HTML already has fallback) ---- */
  function applyContent() {
    if (!data) return;
    // year
    $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
    // simple text bindings (path like "hero.kicker")
    const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), data);
    $$("[data-edit]").forEach(el => { const v = get(el.dataset.edit); if (v != null) el.textContent = v; });
    $$("[data-edit-html]").forEach(el => { const v = get(el.dataset.editHtml); if (v != null) el.innerHTML = v; });
    $$("[data-edit-href]").forEach(el => {
      const v = get(el.dataset.editHref); if (v != null) { el.textContent = v; el.setAttribute("href", "mailto:" + v); }
    });
    // localStorage overrides (written by admin panel)
    try {
      const saved = JSON.parse(localStorage.getItem("nivex_content") || "null");
      if (saved) {
        Object.keys(saved).forEach(path => {
          const val = saved[path];
          $$(`[data-edit="${path}"]`).forEach(el => el.textContent = val);
          $$(`[data-edit-html="${path}"]`).forEach(el => el.innerHTML = val);
        });
      }
    } catch (_) {}
  }

  /* ---- Splash ---- */
  function initSplash() {
    const splash = $("#splash");
    if (!splash) return;
    const hide = () => { splash.style.opacity = "0"; splash.style.visibility = "hidden"; };
    setTimeout(hide, 2200);          // JS safety net (CSS also animates)
  }

  /* ---- Nav ---- */
  function initNav() {
    const nav = $("#nav"), toggle = $("#navToggle"), mobile = $("#navMobile");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    if (toggle && mobile) {
      toggle.addEventListener("click", () => {
        const open = mobile.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      });
      mobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        mobile.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
      }));
    }
    // smooth anchor (native, with offset)
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: "smooth" });
    });
  }

  /* ---- Reveal on scroll (threshold low + safety net) ---- */
  function initReveals() {
    const items = $$(".reveal");
    items.forEach((el, i) => { if (!el.style.getPropertyValue("--i")) el.style.setProperty("--i", (i % 6)); });
    if (!("IntersectionObserver" in window)) { items.forEach(el => el.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });
    items.forEach(el => io.observe(el));
    // safety: reveal everything after 6s no matter what
    setTimeout(() => items.forEach(el => el.classList.add("is-visible")), 6000);
  }

  /* ---- Split text (preserve childNodes) ---- */
  function splitLines(el) {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.innerHTML = "";
    const words = text.split(/\s+/);
    const line = document.createElement("span"); line.className = "split-line";
    const inner = document.createElement("span");
    inner.setAttribute("aria-hidden", "true");
    inner.textContent = words.join(" ");
    line.appendChild(inner); el.appendChild(line);
    return line;
  }
  function initSplit() {
    $$("[data-split]").forEach(el => {
      el.classList.remove("reveal");
      const line = splitLines(el);
      if (!("IntersectionObserver" in window)) { line.classList.add("in"); return; }
      const io = new IntersectionObserver((ent) => {
        ent.forEach(e => { if (e.isIntersecting) { line.classList.add("in"); io.disconnect(); } });
      }, { threshold: 0.05, rootMargin: "0px 0px -10% 0px" });
      io.observe(el);
      setTimeout(() => line.classList.add("in"), 6000);
    });
  }

  /* ---- Count-up ---- */
  function initCount() {
    const nums = $$("[data-count-to]");
    if (!nums.length) return;
    const run = (el) => {
      const to = parseFloat(el.dataset.countTo);
      const dur = 1400; const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased).toString();
        if (p < 1) requestAnimationFrame(step); else el.textContent = to.toString();
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    const io = new IntersectionObserver((ent) => {
      ent.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.05, rootMargin: "0px 0px -10% 0px" });
    nums.forEach(n => io.observe(n));
  }

  /* ---- Card glow follows cursor ---- */
  function initCardGlow() {
    if (!fineHover) return;
    $$(".glass-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      });
    });
  }

  /* ---- Tilt (gate by hover capability only) ---- */
  function initTilt() {
    if (!fineHover) return;
    $$(".tilt").forEach(card => {
      const onMove = e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
      };
      card.addEventListener("mouseover", e => { if (!card.contains(e.relatedTarget)) card.addEventListener("mousemove", onMove); });
      card.addEventListener("mouseout", e => { if (!card.contains(e.relatedTarget)) { card.removeEventListener("mousemove", onMove); card.style.transform = ""; } });
    });
  }

  /* ---- Magnetic buttons ---- */
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(el => {
      const onMove = e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x}px, ${y}px)`;
      };
      el.addEventListener("mouseover", e => { if (!el.contains(e.relatedTarget)) el.addEventListener("mousemove", onMove); });
      el.addEventListener("mouseout", e => { if (!el.contains(e.relatedTarget)) { el.removeEventListener("mousemove", onMove); el.style.transform = ""; } });
    });
  }

  /* ---- Custom cursor ---- */
  function initCursor() {
    if (!fineHover) return;
    const cur = $("#cursor");
    if (!cur) return;
    let firstMove = false;
    window.addEventListener("mousemove", e => {
      cur.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%,-50%)`;
      if (!firstMove) { firstMove = true; cur.classList.add("is-ready"); }
    });
    const hoverables = "a, button, .glass-card, .area-chip, input, textarea";
    document.addEventListener("mouseover", e => { if (e.target.closest(hoverables)) cur.classList.add("is-hover"); });
    document.addEventListener("mouseout", e => { if (e.target.closest(hoverables)) cur.classList.remove("is-hover"); });
  }

  /* ---- Hero parallax (GSAP, subtle) ---- */
  function initHeroParallax() {
    const card = $(".hero-card");
    if (!card || !window.gsap || !window.ScrollTrigger) return;
    gsap.to(card, {
      yPercent: -8, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ---- Form (simulated submit) ---- */
  function initForm() {
    const form = $("#contactForm"), note = $("#formNote");
    if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const btn = form.querySelector("[data-submit]");
      note.classList.remove("error");
      btn.disabled = true; form.classList.add("is-sending");
      setTimeout(() => {
        form.classList.remove("is-sending"); form.classList.add("is-sent");
        const name = (form.querySelector('[name="name"]').value || "").split(" ")[0];
        note.textContent = `¡Gracias${name ? ", " + name : ""}! Hemos recibido tu mensaje y te responderemos pronto.`;
        // Also open mail client as a real fallback so the message isn't lost
        const email = data.email || "contacto@nivex.cl";
        const subj = encodeURIComponent("Consulta web · " + (form.querySelector('[name="name"]').value || ""));
        const body = encodeURIComponent(
          `Nombre: ${form.querySelector('[name="name"]').value}\n` +
          `Correo: ${form.querySelector('[name="email"]').value}\n` +
          `Teléfono: ${form.querySelector('[name="phone"]').value}\n\n` +
          `${form.querySelector('[name="message"]').value}`
        );
        setTimeout(() => { window.location.href = `mailto:${email}?subject=${subj}&body=${body}`; }, 700);
        btn.disabled = false;
      }, 900);
    });
  }

  function boot() {
    safe(applyContent, "applyContent");
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSplit, "initSplit");
    safe(initReveals, "initReveals");
    safe(initCount, "initCount");
    safe(initCardGlow, "initCardGlow");
    safe(initTilt, "initTilt");
    safe(initMagnetic, "initMagnetic");
    safe(initCursor, "initCursor");
    safe(initForm, "initForm");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initHeroParallax, "initHeroParallax");
    }
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
