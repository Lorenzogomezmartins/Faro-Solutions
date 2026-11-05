# Faro Solutions — Sitio web institucional

Sitio institucional de **Faro Solutions**, desarrollado con Next.js. Es una sola página con las secciones Inicio, Proyectos, Servicios, Nosotros, Proceso, Seguridad y Contacto, más una página de detalle por proyecto (`/proyectos/<slug>`) y un formulario de contacto que envía correos reales.

---

## Tecnologías

| Tecnología | Por qué |
|---|---|
| **Next.js 16 (App Router)** | Genera páginas estáticas (rápidas y fáciles de indexar), da URLs amigables por proyecto y trae backend propio para el formulario sin otro servidor. |
| **React 19 + TypeScript** | Componentes reutilizables y tipado estricto para los datos (proyectos, servicios, textos). |
| **Tailwind CSS 4** | Los tokens de marca (paleta y tipografías) están definidos una sola vez en `globals.css`, lo que mantiene la coherencia visual. |
| **Motion** (ex Framer Motion) | Animaciones de entrada, transiciones y microinteracciones. Respeta `prefers-reduced-motion`. |
| **Zod** | Un único esquema valida el formulario en el navegador y en el servidor. |
| **Resend** (API REST) | Envío de correos. Plan gratuito suficiente para un sitio institucional y la clave queda solo en el servidor. Se usa vía `fetch`, sin SDK extra. |
| `next/font` | Sora e Inter se sirven desde el propio dominio, sin pedidos a Google en tiempo de ejecución. |

Sin librerías de íconos, UI kits ni analytics: los íconos son SVG propios (`src/components/ui/Icon.tsx`).

---

## Estructura del proyecto

```
├── public/
│   ├── brand/                 # Brand board original + íconos generados
│   └── images/
│       └── projects/<slug>/   # Portada y capturas de cada proyecto
├── scripts/
│   └── generate-brand-assets.mjs   # Genera favicon / íconos desde el isotipo vectorial
├── src/
│   ├── app/                   # Rutas (App Router)
│   │   ├── page.tsx           # Inicio (compone las secciones)
│   │   ├── layout.tsx         # Header, footer, fuentes, metadatos SEO, JSON-LD
│   │   ├── proyectos/[slug]/  # Página de detalle de cada proyecto
│   │   ├── api/contact/       # Endpoint del formulario (POST)
│   │   ├── opengraph-image.tsx, sitemap.ts, robots.ts, manifest.ts
│   │   └── icon.svg, favicon.ico, apple-icon.png
│   ├── components/
│   │   ├── brand/Logo.tsx     # Isotipo y logotipo en SVG (fuente única del logo)
│   │   ├── layout/            # Header (menú mobile), Footer, botón WhatsApp
│   │   ├── sections/          # Una sección de la home por archivo
│   │   ├── projects/          # Tarjeta y portada de proyectos
│   │   ├── contact/           # Formulario de contacto
│   │   └── ui/                # Botones, íconos, animaciones, contenedores
│   ├── content/               # ✏️ TEXTOS Y DATOS EDITABLES
│   │   ├── site.ts            # Nombre, URL, correo, WhatsApp, redes, navegación
│   │   ├── services.ts        # Servicios y franja de capacidades
│   │   ├── projects.ts        # Portfolio
│   │   └── company.ts         # Nosotros, principios, proceso, seguridad, tipos de proyecto
│   ├── lib/
│   │   ├── contact/           # Esquema de validación + límite de envíos
│   │   └── email/             # Envío por Resend (solo servidor)
│   └── assets/fonts/          # Sora (solo para generar la imagen Open Graph)
├── next.config.ts             # Cabeceras de seguridad (CSP, HSTS, etc.)
└── .env.example               # Variables de entorno necesarias
```

Para cambiar textos, servicios o proyectos **solo hay que editar `src/content/`**. No hace falta tocar componentes.

---

## Ejecutar localmente

Requisitos: **Node.js 20.9 o superior**.

```bash
npm install
cp .env.example .env.local   # y completar los valores
npm run dev                  # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # build de producción
npm start          # sirve el build de producción
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run brand:assets   # regenera favicon e íconos desde el isotipo
```

---

## Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sí (producción) | URL pública sin barra final, ej. `https://www.farosolutions.com`. Se usa en SEO, sitemap y Open Graph. |
| `RESEND_API_KEY` | Sí | Clave privada de Resend. **Nunca** con prefijo `NEXT_PUBLIC_`. |
| `CONTACT_TO_EMAIL` | Sí | Casilla institucional que recibe las consultas. Admite varias separadas por coma. |
| `CONTACT_FROM_EMAIL` | Sí | Remitente verificado, ej. `Faro Solutions <web@tu-dominio.com>`. |

`.env.local` está en `.gitignore`. Nunca subas credenciales al repositorio.

---

## Configurar el envío de correos (Resend)

1. Crear una cuenta en [resend.com](https://resend.com).
2. **Domains → Add domain**: agregar el dominio institucional y cargar en el DNS los registros que indica Resend (SPF/DKIM). Esperar a que figure como *Verified*.
3. **API Keys → Create API key** con permiso *Sending access*. Copiarla en `RESEND_API_KEY`.
4. Completar `CONTACT_TO_EMAIL` (dónde llegan las consultas) y `CONTACT_FROM_EMAIL` (una dirección del dominio verificado).
5. Para probar sin dominio verificado se puede usar `CONTACT_FROM_EMAIL="Faro Solutions <onboarding@resend.dev>"`. En ese modo Resend solo entrega a la casilla dueña de la cuenta.

Al responder un correo recibido, la respuesta va directo al cliente (`reply_to`). El correo incluye todos los campos del formulario (nombre, empresa, correo, teléfono, tipo de proyecto y mensaje) y la fecha y hora de recepción.

**Probar la configuración:** con las variables cargadas en `.env.local`, `npm run email:test` envía un correo de prueba a `CONTACT_TO_EMAIL`.

Si faltan variables, el formulario no muestra una confirmación falsa: informa que no está disponible y ofrece el correo de contacto. Los errores de Resend se registran en los logs del servidor (en Vercel: **Logs** del proyecto).

**Protecciones del formulario** (`src/app/api/contact/route.ts`):
- Validación con Zod en el navegador **y** en el servidor (largos máximos, formato de correo y teléfono, caracteres de control).
- Escape de HTML de todo el contenido del usuario en el correo (prevención de XSS).
- Antispam: campo trampa (*honeypot*) y tiempo mínimo de llenado. Los bots reciben un "ok" falso.
- Límite de 5 envíos cada 10 minutos por IP.
- Solo acepta pedidos del mismo origen, en JSON y de hasta 16 KB.
- Los errores internos quedan en los logs del servidor. Al usuario se le muestra solo un mensaje genérico.

> El límite por IP vive en memoria: en hosting serverless se aplica por instancia. Si en algún momento llega spam en volumen, se puede reemplazar por Upstash Redis o activar un captcha como Cloudflare Turnstile.

---

## Agregar un proyecto

1. Copiar las capturas a `public/images/projects/<slug>/`, ej. `cover.webp` (recomendado 1600×1000, WebP).
2. Agregar un objeto en `src/content/projects.ts`:

```ts
{
  slug: "sistema-de-turnos",            // URL: /proyectos/sistema-de-turnos
  name: "Sistema de turnos online",
  summary: "Una oración para la tarjeta.",
  description: "Descripción general…",
  problem: "Qué problema tenía el cliente…",
  solution: "Cómo lo resolvimos…",
  category: "Aplicación web",
  client: null,                          // nombre solo si el cliente lo autorizó
  industry: "Salud",
  year: 2026,
  technologies: ["Next.js", "PostgreSQL"],
  features: ["Reserva online", "Recordatorios por correo", "Panel administrativo"],
  cover: { src: "/images/projects/sistema-de-turnos/cover.webp", alt: "Panel del sistema de turnos", width: 1600, height: 1000 },
  gallery: [ /* imágenes opcionales con el mismo formato */ ],
  links: { live: "https://…" },          // opcional
  featured: true,                        // opcional: aparece primero
},
```

3. Listo: se generan la tarjeta, la página de detalle, la entrada del sitemap y los metadatos SEO.

**Jerarquía visual:** el orden del array define el orden en pantalla. El primer proyecto con `featured: true` se muestra como proyecto principal (tarjeta a todo el ancho), los demás `featured` en tarjetas grandes y el resto en formato compacto. Hoy el principal es **ZonaSur Cars**, seguido por FMJ, Logix, Chido, Il Faro Cucina, Canchas+ y Gestiona.

**Proyectos demo:** `concept: true` marca un diseño propio que no fue un trabajo entregado a un cliente (Logix, Canchas+, Gestiona, Marea y Dentalia). Se muestran con la etiqueta "Demo" y la sección de tecnologías se titula "Stack propuesto". Si alguno se convierte en un proyecto real, se reemplazan sus datos y capturas y se quita `concept: true`.

Las portadas (`cover.webp`, 1600×1000) se armaron sobre el fondo de marca: los proyectos reales con capturas de sus repositorios y sitios, y los conceptos con pantallas diseñadas para cada caso. Un proyecto también puede usar `draft: true` para verse solo en `npm run dev` y nunca en producción.

---

## Datos pendientes de completar (`TODO`)

| Dato | Dónde |
|---|---|
| Número de WhatsApp (activa el botón flotante y el acceso en Contacto) | `src/content/site.ts` → `contact.whatsapp` |
| Ubicación (opcional) | `src/content/site.ts` → `contact.location` |
| LinkedIn y GitHub (Instagram ya está cargado) | `src/content/site.ts` → `social` |
| Dominio | variable `NEXT_PUBLIC_SITE_URL` |

Los datos en `null` simplemente no se muestran. No hay datos inventados publicados.

---

## Identidad visual

- El isotipo y el logotipo están recreados en SVG a partir del brand board (`public/brand/brand-board.webp`) en `src/components/brand/Logo.tsx`. Si el equipo de diseño entrega los archivos vectoriales originales, reemplazar las rutas de `MARK_PATHS` (y las del script `scripts/generate-brand-assets.mjs`), y después correr `npm run brand:assets`.
- Paleta (en `src/app/globals.css`): Obsidian `#0B0D10`, Graphite `#1F2328`, Steel `#4B5563`, Silver `#C0C6D4`, Pearl `#F8FAFC`.
- Tipografías: **Sora** (títulos y logo) e **Inter** (textos y UI).

---

## Publicar en producción

### Opción recomendada: Vercel

1. Subir el proyecto a un repositorio de GitHub (privado).
2. En [vercel.com](https://vercel.com): **Add New → Project** e importar el repositorio. Next.js se detecta solo.
3. En **Settings → Environment Variables** cargar las 4 variables de la tabla anterior.
4. **Deploy**. Cada `git push` a la rama principal publica una nueva versión.
5. En **Settings → Domains** agregar el dominio propio y configurar el DNS que indica Vercel. El HTTPS es automático.

### Alternativas

Cualquier hosting con Node.js 20.9+ (Netlify, Railway, Render, un VPS):

```bash
npm ci
npm run build
npm start          # puerto 3000 por defecto (PORT=8080 npm start para cambiarlo)
```

En un VPS conviene usar un proxy (Nginx o Caddy) con HTTPS delante. El sitio ya envía cabeceras HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy y Permissions-Policy (`next.config.ts`).

### Checklist antes de publicar

- [ ] `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.
- [ ] Variables de Resend cargadas y dominio verificado. Enviar una consulta de prueba.
- [ ] Datos `TODO` completados (WhatsApp, redes).
- [ ] Revisar la vista previa de enlaces con <https://www.opengraph.xyz>.
- [ ] Dar de alta el sitio y el sitemap (`/sitemap.xml`) en Google Search Console.

---

## Mantenimiento

- `npm outdated` y `npm audit` periódicamente. Actualizar Next.js en cada versión de parche, que suele incluir correcciones de seguridad.
- Al momento de crear el proyecto, `npm audit` informa un aviso *moderado* en `minimatch`, una dependencia interna de ESLint. Solo se usa en desarrollo y no llega al sitio publicado. Se resuelve cuando `eslint-config-next` actualice sus dependencias. No usar `npm audit fix --force`, porque baja de versión el linter.
