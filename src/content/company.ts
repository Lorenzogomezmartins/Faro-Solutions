import type { IconName } from "@/components/ui/Icon";

/** Textos institucionales: Nosotros, proceso de trabajo y diferenciales. */

export const about = {
  title: "Tecnología pensada para simplificar, conectar y hacer crecer",
  paragraphs: [
    "En Faro Solutions creemos que la tecnología tiene que ser una herramienta concreta: algo que simplifique el trabajo diario, conecte procesos y ayude a cada negocio a crecer.",
    "Desarrollamos soluciones digitales a medida combinando diseño, tecnología y una mirada práctica sobre cada problema. No partimos de una plantilla: partimos de entender qué necesitás resolver.",
    "Nuestro enfoque es simple: comprender el proyecto, proponer la solución adecuada y construir herramientas que puedan evolucionar junto con tu negocio.",
  ],
};

export const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "compass", title: "Soluciones personalizadas", text: "Cada desarrollo parte de tu necesidad, no de una plantilla." },
  { icon: "code", title: "Calidad de desarrollo", text: "Buenas prácticas, pruebas y seguridad en cada etapa." },
  { icon: "message", title: "Comunicación cercana", text: "Hablás directo con quienes construyen tu proyecto." },
  { icon: "spark", title: "Innovación", text: "Tecnologías actuales, elegidas con criterio." },
  { icon: "shield", title: "Compromiso", text: "Cumplimos lo acordado y lo comunicamos con claridad." },
  { icon: "database", title: "Código mantenible", text: "Ordenado y documentado, listo para crecer." },
  { icon: "handshake", title: "Acompañamiento", text: "Seguimos presentes después de la entrega." },
];

export type ProcessStep = {
  icon: IconName;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { icon: "message", title: "Contacto", description: "Conocemos la idea y las necesidades del proyecto." },
  { icon: "search", title: "Análisis", description: "Evaluamos los objetivos y definimos la solución adecuada." },
  { icon: "blueprint", title: "Planificación", description: "Organizamos funcionalidades, diseño y etapas de desarrollo." },
  { icon: "code", title: "Desarrollo", description: "Construimos la solución con las tecnologías adecuadas." },
  { icon: "rocket", title: "Implementación", description: "Realizamos pruebas, ajustes y la puesta en producción." },
  { icon: "handshake", title: "Acompañamiento", description: "Brindamos soporte y posibilidades de evolución." },
];

export const differentials: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "compass",
    title: "Tecnología adaptada a cada necesidad",
    text: "Elegimos herramientas según tu problema, tu presupuesto y tu escala.",
  },
  {
    icon: "trend",
    title: "Desarrollo pensado para crecer",
    text: "Arquitecturas que soportan nuevas funcionalidades sin empezar de cero.",
  },
  {
    icon: "message",
    title: "Comunicación directa",
    text: "Avances visibles y decisiones explicadas durante todo el proyecto.",
  },
  {
    icon: "shield",
    title: "Escalable, mantenible y seguro",
    text: "Validación de datos, control de accesos y buenas prácticas desde el diseño.",
  },
  {
    icon: "plug",
    title: "Integración con lo que ya usás",
    text: "Conectamos tu sistema con planillas, pagos, correo y otras plataformas.",
  },
  {
    icon: "handshake",
    title: "Acompañamiento post implementación",
    text: "Soporte, mejoras y evolución una vez que la solución está en uso.",
  },
];

export const brandQuote = "Cada negocio tiene desafíos diferentes. Las soluciones también deberían serlo.";

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
