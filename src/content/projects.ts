/**
 * PORTFOLIO — fuente única de verdad de los proyectos.
 *
 * Para agregar un proyecto:
 *   1. Copiá las capturas a /public/images/projects/<slug>/ (ej. cover.webp, 1600×1000).
 *   2. Agregá un objeto al array `projects` siguiendo el tipo `Project`.
 *   3. Listo: la tarjeta del inicio, la página /proyectos/<slug>,
 *      el sitemap y los metadatos SEO se generan automáticamente.
 *
 * Jerarquía visual: el orden del array define el orden en pantalla.
 * El primer proyecto con `featured: true` se muestra como proyecto principal
 * (tarjeta a todo el ancho), el resto de los destacados en tarjetas grandes
 * y los demás en formato compacto.
 *
 * Los proyectos con `concept: true` son diseños propios (no trabajos para clientes)
 * y se muestran con la etiqueta "Concepto".
 */

export type ProjectImage = {
  /** Ruta dentro de /public, ej. "/images/projects/mi-proyecto/cover.webp". */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  /** Identificador para la URL: minúsculas y guiones (ej. "sistema-de-turnos"). */
  slug: string;
  name: string;
  /** Una oración para la tarjeta. */
  summary: string;
  /** Descripción general para la página de detalle. */
  description: string;
  /** Qué problema resolvía el proyecto. */
  problem: string;
  /** Cómo lo resolvimos. */
  solution: string;
  /** Categoría visible (ej. "Sistema de gestión", "Sitio web", "App móvil"). */
  category: string;
  /** Nombre del cliente si está autorizado a publicarse; si no, null. */
  client: string | null;
  /** Rubro o tipo de cliente. */
  industry?: string;
  year?: number;
  technologies: string[];
  features: string[];
  cover: ProjectImage | null;
  gallery?: ProjectImage[];
  links?: { live?: string; repository?: string };
  /** Proyectos de mayor complejidad: se muestran con más jerarquía. */
  featured?: boolean;
  /**
   * Proyecto conceptual: diseño propio que muestra cómo resolveríamos un caso típico.
   * Se identifica con la etiqueta "Concepto" y no se presenta como trabajo para un cliente.
   */
  concept?: boolean;
  /** Borrador: solo visible en desarrollo (npm run dev). Nunca se publica en producción. */
  draft?: boolean;
};

const img = (slug: string, file: string, alt: string, width: number, height: number): ProjectImage => ({
  src: `/images/projects/${slug}/${file}`,
  alt,
  width,
  height,
});

const cover = (slug: string, alt: string) => img(slug, "cover.webp", alt, 1600, 1000);

export const projects: Project[] = [
  {
    slug: "zonasur-cars",
    name: "ZonaSur Cars",
    summary: "Sistema web para una concesionaria: catálogo de autos y motos, reservas y panel de administración.",
    description:
      "Sistema web para la compra de autos y motos, con un backend propio y un panel para administrar usuarios, vehículos y reservas.",
    problem: "Una concesionaria necesita exhibir su stock en línea y gestionar reservas y usuarios desde un mismo lugar.",
    solution:
      "Un catálogo web conectado a una API con autenticación, carga de imágenes y un panel de administración con gestión de usuarios, vehículos y reservas.",
    category: "Sistema web",
    client: null,
    industry: "Automotor",
    year: 2025,
    technologies: ["Node.js", "Express", "MongoDB", "JavaScript", "HTML", "CSS"],
    features: [
      "Catálogo de autos y motos con filtros",
      "Reservas de vehículos",
      "Panel de administración de usuarios, vehículos y reservas",
      "Autenticación con JWT y contraseñas cifradas",
    ],
    cover: cover("zonasur-cars", "Catálogo y panel de administración de ZonaSur Cars"),
    gallery: [
      img("zonasur-cars", "bienvenida.webp", "Pantalla de bienvenida", 1440, 900),
      img("zonasur-cars", "catalogo.webp", "Catálogo de vehículos", 1440, 785),
      img("zonasur-cars", "panel.webp", "Panel de administrador", 1440, 843),
      img("zonasur-cars", "login-admin.webp", "Acceso de administradores", 1440, 900),
      img("zonasur-cars", "registro.webp", "Registro de usuarios", 1440, 900),
    ],
    featured: true,
  },
  {
    slug: "fmj-federacion-de-judo",
    name: "Federación Metropolitana de Judo",
    summary:
      "Sitio institucional y sistema de gestión para una federación deportiva: torneos, inscripciones, ranking, clubes y resultados.",
    description:
      "Plataforma web que reúne el sitio público de la federación y un panel de administración para gestionar torneos, clubes, profesores, patrocinadores, galería y competidores.",
    problem:
      "La federación necesitaba centralizar en un solo lugar su calendario, torneos, inscripciones, rankings y resultados, información que provenía de distintas fuentes.",
    solution:
      "Desarrollamos un sitio público y un panel administrativo sobre una API propia. El sistema sincroniza torneos con Google Calendar, importa datos desde Google Sheets y obtiene los resultados de las competencias por FTP de forma automática.",
    category: "Plataforma web + panel de gestión",
    client: "Federación Metropolitana de Judo",
    industry: "Deporte",
    year: 2026,
    technologies: ["Node.js", "Express", "MongoDB", "JavaScript", "Google APIs", "Cloudinary", "JWT"],
    features: [
      "Inscripción a torneos con exportación a CSV",
      "Ranking y sistema de puntos de competidores",
      "Sincronización automática de resultados por FTP",
      "Calendario sincronizado con Google Calendar",
      "Gestión de clubes, profesores y patrocinadores",
      "Panel de administración con acceso autenticado",
    ],
    cover: cover("fmj-federacion-de-judo", "Sitio de la Federación Metropolitana de Judo"),
    gallery: [
      img("fmj-federacion-de-judo", "inicio.webp", "Página de inicio del sitio de la federación", 1440, 760),
      img("fmj-federacion-de-judo", "calendario.webp", "Calendario oficial", 1440, 900),
      img("fmj-federacion-de-judo", "ranking.webp", "Ranking oficial", 1440, 900),
      img("fmj-federacion-de-judo", "torneos.webp", "Torneos, cursos y eventos", 1440, 900),
      img("fmj-federacion-de-judo", "cursos.webp", "Cursos y capacitaciones", 1440, 900),
      img("fmj-federacion-de-judo", "objetivos.webp", "Objetivos de la federación", 1440, 900),
      img("fmj-federacion-de-judo", "sistema.webp", "Sistema de gestión de torneos", 1440, 900),
      img("fmj-federacion-de-judo", "acceso-admin.webp", "Acceso al panel de administración", 1440, 900),
    ],
    featured: true,
  },
  // ── Proyectos conceptuales: diseños propios, etiquetados como "Concepto" ──
  {
    slug: "logistica-gestion-de-flota",
    name: "Logix — Gestión logística y de flota",
    summary:
      "Plataforma para planificar rutas, seguir envíos en tiempo real y coordinar flota y choferes, con app móvil para el reparto.",
    description:
      "Concepto de sistema logístico compuesto por un panel web de operaciones y una aplicación móvil para choferes, pensado para empresas de distribución y última milla.",
    problem:
      "Las empresas de distribución suelen coordinar envíos, choferes y vehículos con planillas y mensajes, sin visibilidad del estado real de cada entrega.",
    solution:
      "Un panel de operaciones con seguimiento de rutas y flota, y una app para choferes que registra cada entrega con horario y firma, alimentando reportes de cumplimiento.",
    category: "Sistema de gestión · Logística",
    client: null,
    industry: "Logística y distribución",
    technologies: ["Next.js", "React Native", "Node.js", "PostgreSQL", "API de mapas"],
    features: [
      "Planificación de rutas por zona y ventana horaria",
      "Seguimiento de envíos y vehículos en tiempo real",
      "App para choferes con confirmación de entrega",
      "Gestión de flota, mantenimiento y depósitos",
      "Alertas de demoras e incidencias",
      "Reportes de cumplimiento de entregas",
    ],
    cover: cover("logistica-gestion-de-flota", "Panel de operaciones y app de choferes de Logix"),
    gallery: [
      img("logistica-gestion-de-flota", "panel.webp", "Panel de operaciones", 1440, 900),
      img("logistica-gestion-de-flota", "app-chofer.webp", "App del chofer", 540, 1169),
    ],
    featured: true,
    concept: true,
  },
  {
    slug: "chido-gestion-de-restaurante",
    name: "Chido — Gestión de restaurante",
    summary:
      "App móvil para la gestión integral de un restaurante, con flujos para clientes y para cada rol del personal.",
    description:
      "Aplicación móvil que digitaliza la operación de un restaurante, desde el ingreso del cliente hasta la cuenta, con pantallas específicas para dueño, supervisor, metre, mozo, cocina y barra.",
    problem:
      "La atención en un restaurante involucra muchos roles que necesitan coordinarse en tiempo real: ingreso de clientes, asignación de mesas, pedidos, preparación y cobro.",
    solution:
      "Una única app con perfiles por rol, datos sincronizados en tiempo real, códigos QR para mesas y propinas, y notificaciones push para cada evento del servicio.",
    category: "Aplicación móvil",
    client: null,
    industry: "Gastronomía",
    year: 2026,
    technologies: ["React Native", "Expo", "TypeScript", "Supabase", "NativeWind"],
    features: [
      "8 perfiles de usuario con flujos propios",
      "Ingreso y asignación de mesas mediante QR",
      "Pedidos con seguimiento en cocina y barra",
      "Chat entre cliente y mozo",
      "Notificaciones push",
      "Encuestas, estadísticas y juegos con descuentos",
    ],
    cover: cover("chido-gestion-de-restaurante", "Pantallas de la app Chido"),
    gallery: [
      img("chido-gestion-de-restaurante", "home.webp", "Pantalla de inicio de sesión", 540, 1150),
      img("chido-gestion-de-restaurante", "dueno.webp", "Panel del dueño", 540, 1150),
      img("chido-gestion-de-restaurante", "pedidos.webp", "Gestión de pedidos del mozo", 540, 1150),
      img("chido-gestion-de-restaurante", "mesas.webp", "Gestión de mesas", 540, 1150),
    ],
    featured: true,
  },
  {
    slug: "il-faro-cucina",
    name: "Il Faro Cucina",
    summary: "App móvil de gestión de restaurante con pedidos, mesas, cuenta, propinas y reportes en tiempo real.",
    description:
      "Aplicación móvil para la gestión integral de un restaurante, orientada tanto a clientes como a empleados: mesas, pedidos, productos, usuarios, roles, cuenta, propinas, encuestas y notificaciones en tiempo real.",
    problem:
      "Coordinar a clientes, salón, cocina y barra requiere que cada persona vea en el momento el estado de mesas, pedidos y cuentas.",
    solution:
      "Una app con roles diferenciados, base de datos en tiempo real, lectura de códigos QR, notificaciones push y envío automático de correos, con estadísticas para la toma de decisiones.",
    category: "Aplicación móvil",
    client: null,
    industry: "Gastronomía",
    year: 2026,
    technologies: ["React Native", "Expo", "TypeScript", "Supabase", "NativeWind", "Cloudinary"],
    features: [
      "Roles: dueño, supervisor, maître, mozo, bartender, cocinero y cliente",
      "Flujo completo de pedidos",
      "Chat en tiempo real entre cliente y mozo",
      "Códigos QR y notificaciones push",
      "Cuenta, propinas y encuestas de satisfacción",
      "Estadísticas y gráficos",
    ],
    cover: cover("il-faro-cucina", "Pantallas de la app Il Faro Cucina"),
    gallery: [
      img("il-faro-cucina", "dueno.webp", "Panel del dueño", 540, 1171),
      img("il-faro-cucina", "cliente.webp", "Vista del cliente", 540, 1171),
      img("il-faro-cucina", "chat.webp", "Chat con el mozo", 540, 1171),
      img("il-faro-cucina", "estadisticas.webp", "Estadísticas de encuestas", 540, 1171),
    ],
    featured: true,
  },
  {
    slug: "reservas-canchas-de-futbol",
    name: "Canchas+ — Gestión de complejo de fútbol",
    summary:
      "Sistema de reservas y administración para complejos de fútbol: agenda por cancha, señas online, torneos y caja.",
    description:
      "Concepto de plataforma para complejos deportivos con un panel de administración y una app donde los jugadores reservan y pagan la seña de su turno.",
    problem:
      "Muchos complejos gestionan reservas por teléfono o mensajes, con turnos superpuestos, señas difíciles de controlar y horarios libres que no se ocupan.",
    solution:
      "Una agenda visual por cancha y horario, reservas online con pago de seña, turnos fijos y torneos, y recordatorios automáticos para reducir ausencias.",
    category: "Sistema de gestión · Reservas",
    client: null,
    industry: "Deporte y recreación",
    technologies: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Pagos online"],
    features: [
      "Agenda por cancha y horario",
      "Reservas online con pago de seña",
      "Turnos fijos, escuelitas y torneos",
      "Caja, pagos y saldos pendientes",
      "Recordatorios automáticos",
      "Reportes de ocupación",
    ],
    cover: cover("reservas-canchas-de-futbol", "Agenda y app de reservas de Canchas+"),
    gallery: [
      img("reservas-canchas-de-futbol", "agenda.webp", "Agenda de canchas", 1440, 900),
      img("reservas-canchas-de-futbol", "app-reservas.webp", "App de reservas para jugadores", 540, 1169),
    ],
    featured: true,
    concept: true,
  },
  {
    slug: "gestion-comercial-erp",
    name: "Gestiona — Gestión comercial para PyMEs",
    summary: "Sistema de gestión con ventas, facturación, stock, compras, clientes y caja en un solo lugar.",
    description:
      "Concepto de sistema de gestión comercial (ERP) para comercios y PyMEs que necesitan ordenar la operación diaria y tener información para decidir.",
    problem:
      "Muchas PyMEs registran ventas, stock y cobros en herramientas separadas, lo que genera errores, faltantes de mercadería y poca visibilidad del negocio.",
    solution:
      "Un sistema único con ventas y facturación, control de stock con alertas de reposición, cuentas corrientes y un tablero con los indicadores principales.",
    category: "Sistema de gestión · ERP",
    client: null,
    industry: "Comercio y PyMEs",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    features: [
      "Ventas y facturación",
      "Stock con alertas de reposición",
      "Compras y proveedores",
      "Clientes y cuentas corrientes",
      "Caja diaria",
      "Tablero de indicadores y reportes",
    ],
    cover: cover("gestion-comercial-erp", "Tablero de Gestiona"),
    gallery: [img("gestion-comercial-erp", "resumen.webp", "Resumen del negocio", 1440, 900)],
    featured: true,
    concept: true,
  },
  {
    slug: "sala-de-juegos",
    name: "Arcade 444 — Sala de juegos",
    summary: "Plataforma web de minijuegos con registro de usuarios, chat en tiempo real y estadísticas por jugador.",
    description:
      "Aplicación web donde los usuarios se registran, inician sesión y juegan distintos minijuegos, con una sala de chat global y estadísticas por jugador.",
    problem: "Ofrecer una experiencia de entretenimiento online con cuentas de usuario, interacción en tiempo real y seguimiento de resultados.",
    solution: "Una aplicación Angular con autenticación y datos en tiempo real sobre Supabase, publicada en Vercel.",
    category: "Aplicación web",
    client: null,
    industry: "Entretenimiento",
    year: 2026,
    technologies: ["Angular", "TypeScript", "Supabase", "Bootstrap"],
    features: [
      "Registro e inicio de sesión",
      "Ahorcado, Mayor o Menor, Preguntados y Snake",
      "Chat global en tiempo real",
      "Estadísticas por jugador",
    ],
    cover: cover("sala-de-juegos", "Pantalla de inicio de Arcade 444"),
    gallery: [
      img("sala-de-juegos", "inicio.webp", "Pantalla de inicio", 1440, 900),
      img("sala-de-juegos", "login.webp", "Inicio de sesión", 1440, 900),
      img("sala-de-juegos", "registro.webp", "Registro de usuarios", 1440, 900),
    ],
    links: { live: "https://y-gold-sigma-23.vercel.app" },
  },
  {
    slug: "landing-fotografo",
    name: "Marea — Landing para fotógrafo",
    summary: "Landing page para un fotógrafo de bodas, retratos y marcas, con portfolio y consulta de fechas.",
    description:
      "Concepto de landing page con estética cinematográfica para profesionales de la fotografía que necesitan mostrar su trabajo y recibir consultas.",
    problem:
      "Un fotógrafo necesita que su trabajo se vea a la altura y que los interesados puedan consultar disponibilidad sin fricción.",
    solution: "Una landing rápida, con imágenes protagonistas, portfolio por categoría y un formulario de consulta de fechas.",
    category: "Landing page",
    client: null,
    industry: "Fotografía",
    technologies: ["Next.js", "Tailwind CSS"],
    features: ["Portfolio por categorías", "Consulta de fechas", "Imágenes optimizadas", "SEO y carga rápida"],
    cover: cover("landing-fotografo", "Landing page de Marea Fotografía"),
    gallery: [img("landing-fotografo", "inicio.webp", "Inicio de la landing", 1440, 900)],
    concept: true,
  },
  {
    slug: "landing-consultorio-odontologico",
    name: "Dentalia — Landing para consultorio",
    summary: "Landing page para un consultorio odontológico con turnos online, tratamientos y contacto por WhatsApp.",
    description:
      "Concepto de landing page para consultorios y centros de salud que quieren recibir turnos online y comunicar sus tratamientos con claridad.",
    problem: "Los pacientes buscan información clara y una forma simple de pedir turno, sin depender del teléfono.",
    solution: "Una landing clara y confiable con reserva de turnos, información de tratamientos y acceso directo a WhatsApp.",
    category: "Landing page",
    client: null,
    industry: "Salud",
    technologies: ["Next.js", "Tailwind CSS"],
    features: ["Reserva de turnos online", "Tratamientos y obras sociales", "Contacto por WhatsApp", "SEO local"],
    cover: cover("landing-consultorio-odontologico", "Landing page de Dentalia"),
    gallery: [img("landing-consultorio-odontologico", "inicio.webp", "Inicio de la landing", 1440, 900)],
    concept: true,
  },
];

const isProduction = process.env.NODE_ENV === "production";

/** Proyectos visibles (en el orden del array), excluyendo borradores en producción. */
export function getProjects(): Project[] {
  return projects.filter((project) => !(project.draft && isProduction));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}
