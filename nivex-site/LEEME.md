# NIVEX SpA — Sitio web

Sitio estático (HTML + CSS + JavaScript). No requiere instalación ni programas:
se sube tal cual a tu hosting.

## 1. Ver el sitio en tu computador
Abre `index.html` con doble clic. (Algunas animaciones se ven mejor servidas por
HTTP; en el hosting funcionan al 100%.)

## 2. Subir a Hostinger
1. Entra a hPanel → **Administrador de archivos**.
2. Abre la carpeta `public_html` (bórrale el contenido de ejemplo si lo hay).
3. Sube **todo el contenido de esta carpeta** (no la carpeta, sino lo de adentro):
   `index.html`, `styles.css`, `main.js`, `.htaccess`, `site.webmanifest`,
   y las carpetas `assets/`, `lib/`, `admin/`.
   - Tip: comprime todo en un .zip, súbelo y usa "Extraer" en el administrador.
4. Listo. Tu dominio ya mostrará el sitio.

> El archivo `.htaccess` ya está incluido y evita problemas de caché tras cada
> actualización. Si tu hosting no lo muestra, activa "ver archivos ocultos".

## 3. Editar los textos (panel de contenido)
- Entra a `tudominio.cl/admin/`
- Usuario de demo: **admin** · Contraseña: **nivex2026**
  (cámbialos en `admin/admin.js`, variable `USERS`).
- Edita los textos → **Guardar vista previa** (se ven al instante en tu navegador).
- Para publicarlos en el sitio real: **Descargar manifest.js** y reemplaza el
  archivo `lib/manifest.js` en el hosting.

### Multiusuario real (varias personas editando en vivo)
Al ser un sitio estático no hay base de datos. Para edición multiusuario real,
revisa `admin/README-backend.txt`: la opción más directa con tu hosting es un
pequeño backend PHP + MySQL (se puede programar sobre esta misma web).

## 4. El logo
En `assets/img/` tienes el logo en varios formatos:
- `logo-nivex.svg` — logo completo, texto oscuro (para fondos claros).
- `logo-nivex-light.svg` — logo completo, texto claro (para fondos oscuros).
- `logo-mark.svg` — solo el ícono hexagonal (vectorial, escala infinita).
- `logo-mark-32/48/96/192/512.png` — ícono en PNG (favicon, app, redes).
- `favicon.ico` — ícono del navegador.
Los SVG no pierden calidad a ningún tamaño; usa los PNG cuando una plataforma
exija imagen rasterizada (ej. foto de perfil en redes sociales).

## 5. Cambiar colores o tipografías
Todo el diseño se controla en `styles.css`, sección "1. Tokens" (arriba del
archivo): los colores de marca están en `--accent` (azul), `--ink` (antracita)
y `--gray` (gris claro).

## Paleta de marca
- Negro antracita: `#1A1A1A`
- Azul eléctrico: `#1F6AE1`
- Gris claro: `#E5E5E5`

---
Hecho para NIVEX SpA · Quilpué, Región de Valparaíso, Chile.
