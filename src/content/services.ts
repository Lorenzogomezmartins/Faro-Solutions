import type { IconName } from "@/components/ui/Icon";

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  includes: string[];
};

/** Áreas de servicio. El orden del array define el orden en pantalla. */
export const services: Service[] = [
  {
    id: "desarrollo-web",
    icon: "browser",
    title: "Desarrollo web",
    description: "Sitios rápidos, claros y preparados para vender y posicionarse en buscadores.",
    includes: ["Landing pages", "Sitios institucionales", "E-commerce", "Catálogos digitales"],
  },
  {
    id: "software-a-medida",
    icon: "dashboard",
    title: "Software a medida",
    description: "Sistemas que ordenan la operación y se adaptan a la forma en que trabaja tu negocio.",
    includes: ["Sistemas administrativos", "Paneles de gestión", "CRM y ERP", "Automatización de procesos"],
  },
  {
    id: "aplicaciones-tecnologia",
    icon: "layers",
    title: "Aplicaciones y tecnología",
    description: "Apps para tus clientes o tu equipo, conectadas con las herramientas que ya usás.",
    includes: ["Aplicaciones móviles", "Aplicaciones web", "APIs e integraciones"],
  },
  {
    id: "consultoria-mantenimiento",
    icon: "wrench",
    title: "Consultoría y mantenimiento",
    description: "Mejoramos lo que ya tenés y lo mantenemos funcionando y actualizado.",
    includes: ["Optimización", "Modernización de sistemas", "Soporte", "Mantenimiento"],
  },
];
