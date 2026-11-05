/**
 * Configuración general del sitio.
 * ⚠️ Los campos marcados con TODO deben completarse con datos reales.
 * Mientras valgan `null`, la interfaz los oculta automáticamente
 * (no se muestra ningún dato inventado).
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  name: "Faro Solutions",
  url: siteUrl,
  locale: "es_AR",
  tagline: "Desarrollamos tecnología a medida para resolver necesidades reales.",
  description:
    "Faro Solutions es un equipo de desarrollo de software. Creamos software a medida, sitios web, sistemas de gestión, aplicaciones, integraciones y automatizaciones para empresas, PyMEs, emprendimientos y profesionales.",
  keywords: [
    "desarrollo de software a medida",
    "desarrollo web",
    "sistemas de gestión",
    "aplicaciones web",
    "automatización de procesos",
    "integración de APIs",
    "e-commerce",
    "software para PyMEs",
    "Argentina",
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
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Cómo trabajamos", href: "/#proceso" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export function whatsappUrl(message: string = siteConfig.contact.whatsappMessage) {
  const number = siteConfig.contact.whatsapp;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
