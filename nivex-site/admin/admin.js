(function () {
  "use strict";

  /* =========================================================================
     NIVEX — Panel de contenido (cliente, sin servidor)
     -------------------------------------------------------------------------
     Credenciales de DEMO. Para producción real, cambia USERS aquí mismo,
     o mejor aún, conecta un backend (ver README-backend.txt).
     OJO: al ser un sitio estático, estas credenciales viven en el navegador
     y NO son seguras frente a alguien técnico. Sirven para evitar ediciones
     accidentales, no como seguridad fuerte.
     ========================================================================= */
  const USERS = {
    "admin": "nivex2026"
    // agrega más: "maria": "claveSegura", "jose": "otraClave"
  };

  const $ = (s) => document.querySelector(s);
  const data = window.__BRAND__ || {};
  const STORAGE = "nivex_content";
  const SESSION = "nivex_session";

  const gate = $("#gate"), editor = $("#editor");

  function get(path) { return path.split(".").reduce((o, k) => (o ? o[k] : undefined), data); }

  function loadValues() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE) || "{}"); } catch (_) {}
    document.querySelectorAll("[data-path]").forEach(el => {
      const p = el.dataset.path;
      el.value = (saved[p] != null) ? saved[p] : (get(p) != null ? get(p) : "");
    });
    $("#who").textContent = sessionStorage.getItem(SESSION) || "";
  }

  function showEditor() {
    gate.classList.add("hidden");
    editor.classList.remove("hidden");
    loadValues();
  }

  /* ---- Login ---- */
  function tryLogin() {
    const u = $("#user").value.trim();
    const p = $("#pass").value;
    const note = $("#loginNote");
    if (USERS[u] && USERS[u] === p) {
      sessionStorage.setItem(SESSION, u);
      note.textContent = "";
      showEditor();
    } else {
      note.textContent = "Usuario o contraseña incorrectos.";
      note.className = "note err";
    }
  }

  /* ---- Save preview (localStorage) ---- */
  function save() {
    const out = {};
    document.querySelectorAll("[data-path]").forEach(el => { out[el.dataset.path] = el.value; });
    localStorage.setItem(STORAGE, JSON.stringify(out));
    const n = $("#savedNote"); n.classList.remove("hidden");
    setTimeout(() => n.classList.add("hidden"), 3500);
  }

  /* ---- Build a fresh manifest.js for publishing ---- */
  function buildManifest() {
    // clone base data, apply edits
    const merged = JSON.parse(JSON.stringify(data));
    document.querySelectorAll("[data-path]").forEach(el => {
      const keys = el.dataset.path.split(".");
      let o = merged;
      for (let i = 0; i < keys.length - 1; i++) { o = o[keys[i]] = o[keys[i]] || {}; }
      o[keys[keys.length - 1]] = el.value;
    });
    const body =
      "(function () {\n  \"use strict\";\n\n" +
      "  /* NIVEX SpA — generado por el panel de administración */\n" +
      "  window.__BRAND__ = " + JSON.stringify(merged, null, 2) + ";\n})();\n";
    return body;
  }

  function download() {
    const blob = new Blob([buildManifest()], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "manifest.js";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  function reset() {
    if (!confirm("¿Restablecer a los textos originales y borrar la vista previa guardada?")) return;
    localStorage.removeItem(STORAGE);
    loadValues();
  }

  function logout() {
    sessionStorage.removeItem(SESSION);
    editor.classList.add("hidden");
    gate.classList.remove("hidden");
    $("#pass").value = "";
  }

  function init() {
    $("#loginBtn").addEventListener("click", tryLogin);
    $("#pass").addEventListener("keydown", e => { if (e.key === "Enter") tryLogin(); });
    $("#saveBtn").addEventListener("click", save);
    $("#downloadBtn").addEventListener("click", download);
    $("#resetBtn").addEventListener("click", reset);
    $("#logoutBtn").addEventListener("click", logout);
    // keep session within tab
    if (sessionStorage.getItem(SESSION) && USERS[sessionStorage.getItem(SESSION)]) showEditor();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
