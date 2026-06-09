NIVEX — Notas sobre edición multiusuario y backend
===================================================

EL PANEL ACTUAL (admin/) FUNCIONA SIN SERVIDOR:
- Permite editar los textos principales y guardarlos como "vista previa" en el
  navegador (localStorage), y descargar un manifest.js actualizado para subir al
  hosting. Es ideal para 1 persona que administra el contenido ocasionalmente.

LIMITACIÓN IMPORTANTE:
- Un sitio 100% estático (HTML/CSS/JS) NO tiene base de datos ni sesiones reales.
  Por eso el "login" del panel sirve para evitar ediciones accidentales, pero NO
  es seguridad fuerte: las credenciales viajan en el navegador.

PARA TENER MULTIUSUARIO REAL (varias personas editando en vivo, sin descargar
archivos), hay tres caminos según presupuesto/conocimiento:

1) CMS HEADLESS GRATIS sobre el mismo hosting estático
   - Decap CMS (antes Netlify CMS) o Sveltia CMS: editor visual, login con
     usuarios, guarda los cambios directamente en el repositorio del sitio.
   - Requiere alojar el sitio en GitHub + Netlify/Cloudflare Pages (gratis).

2) BACKEND LIGERO en Hostinger (si tu plan incluye PHP + MySQL, que es lo común)
   - Crear un pequeño panel en PHP que guarde el contenido en MySQL y exponga
     un endpoint /api/content.json que el sitio lee al cargar.
   - Usuarios y contraseñas reales (hash) en la base de datos.
   - Es la opción más natural con tu hosting ya comprado. Puedo programarlo.

3) SERVICIO EXTERNO (Supabase / Firebase)
   - Autenticación y base de datos gestionadas; el sitio sigue siendo estático
     y consume los datos por API. Plan gratuito suficiente para empezar.

RECOMENDACIÓN: como ya tienes hosting y dominio, la opción (2) en PHP+MySQL es la
más directa para multiusuario real. Avísame y lo implemento sobre esta misma web.
