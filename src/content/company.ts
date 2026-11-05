import type { IconName } from "@/components/ui/Icon";

/** Textos institucionales: sección Nosotros, proceso de trabajo y seguridad. */

export const about = {
  title: "Un equipo de desarrollo que se involucra en tu problema",
  intro:
    "Construimos software con criterio profesional: entendemos el problema antes de escribir código y diseñamos soluciones que se puedan mantener en el tiempo, con trato directo y responsabilidad en cada entrega.",
};

export const principles: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "compass",
    title: "Primero el problema",
    text: "Entendemos tu negocio antes de proponer tecnología.",
  },
  {
    icon: "users",
    title: "Comunicación directa",
    text: "Hablás con quienes desarrollan tu proyecto.",
  },
  {
    icon: "shield",
    title: "Compromiso a largo plazo",
    text: "Código mantenible y acompañamiento después de la entrega.",
  },
];

export type ProcessStep = {
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { title: "Primer contacto", description: "Nos contás tu necesidad y entendemos el contexto." },
  { title: "Análisis", description: "Relevamos requerimientos y evaluamos alternativas." },
  { title: "Propuesta", description: "Alcance, presupuesto y tiempos estimados, por escrito." },
  { title: "Desarrollo", description: "Construimos por etapas, con avances que podés revisar." },
  { title: "Pruebas", description: "Verificamos funcionamiento, calidad y seguridad." },
  { title: "Entrega y soporte", description: "Implementamos la solución y la acompañamos según lo acordado." },
];

export const securityPractices: { icon: IconName; title: string }[] = [
  { icon: "shield", title: "Protección de datos" },
  { icon: "key", title: "Autenticación y control de acceso" },
  { icon: "users", title: "Gestión de usuarios, roles y permisos" },
  { icon: "filter", title: "Validación y sanitización de datos" },
  { icon: "test", title: "Pruebas y control de calidad" },
  { icon: "database", title: "Arquitectura mantenible y escalable" },
];

/** Opciones del campo "Tipo de proyecto" del formulario de contacto. */
export const projectTypes = [
  "Desarrollo web",
  "Tienda online / e-commerce",
  "Software empresarial / gestión",
  "Logística y distribución",
  "Aplicación web o móvil",
  "APIs e integraciones",
  "Automatización de procesos",
  "Consultoría o modernización",
  "Otro / todavía no lo sé",
] as const;
