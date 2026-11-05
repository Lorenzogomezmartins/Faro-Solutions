/**
 * Configuración general del sitio.
 * ⚠️ Los campos marcados con TODO deben completarse con datos reales.
 * Mientras valgan `null`, la interfaz los oculta automáticamente
 * (no se muestra ningún dato inventado).
 */

/**
 * URL pública. Prioridad: NEXT_PUBLIC_SITE_URL (dominio propio) → dominio de
 * producción que informa Vercel automáticamente → localhost en desarrollo.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl().replace(/\/$/, "");

export const siteConfig = {
  name: "Faro Solutions",
  url: siteUrl,
  locale: "es_AR",
  tagline: "Transformamos ideas en soluciones tecnológicas.",
  description:
    "Estudio de desarrollo de software en Argentina. Creamos software a medida, sistemas de gestión, aplicaciones web y móviles, sitios web, e-commerce e integraciones para empresas, PyMEs y emprendimientos.",
  keywords: [
    "desarrollo de software a medida",
    "desarrollo de software Argentina",
    "sistemas de gestión",
    "desarrollo de aplicaciones móviles",
    "aplicaciones web",
    "diseño y desarrollo web",
    "e-commerce",
    "APIs e integraciones",
    "automatización de procesos",
    "software para PyMEs",
  ],

  contact: {
    /** Correo institucional visible en el sitio (Contacto y footer). */
    email: "farosolutionsdev@gmail.com" as string | null,
    /** TODO: WhatsApp en formato internacional sin "+" ni espacios (ej. "5491122334455"). */
    whatsapp: null as string | null,
    whatsappMessage: "Hola Faro Solutions, quiero consultarles por un proyecto.",
    /** TODO: ciudad / provincia si desean mostrarla (ej. "Buenos Aires, Argentina"). */
    location: null as string | null,
  },

  /** TODO: completar las URLs de redes. Las que queden en null no se muestran. */
  social: {
    linkedin: null as string | null,
    instagram: "https://www.instagram.com/_farosolutions/" as string | null,
    github: null as string | null,
  },
} as const;

export const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export function whatsappUrl(message: string = siteConfig.contact.whatsappMessage) {
  const number = siteConfig.contact.whatsapp;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
