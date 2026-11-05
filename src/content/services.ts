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
    id: "software-a-medida",
    icon: "dashboard",
    title: "Software a medida y sistemas de gestión",
    description: "Sistemas diseñados para la forma en que trabaja tu organización.",
    includes: ["CRM y ERP", "Logística y distribución", "Bases de datos"],
  },
  {
    id: "sitios-web",
    icon: "browser",
    title: "Sitios web y e-commerce",
    description: "Webs y tiendas online rápidas, seguras y preparadas para buscadores.",
    includes: ["Webs institucionales", "Landing pages", "Tiendas online", "Hosting y dominios"],
  },
  {
    id: "aplicaciones-integraciones",
    icon: "layers",
    title: "Aplicaciones, APIs y automatización",
    description: "Apps web y móviles, integraciones entre plataformas y procesos automatizados.",
    includes: ["Apps web y móviles", "APIs e integraciones", "Automatización"],
  },
  {
    id: "consultoria-mantenimiento",
    icon: "compass",
    title: "Consultoría, modernización y soporte",
    description: "Arquitectura, modernización de sistemas existentes y evolución continua.",
    includes: ["Arquitectura", "Modernización", "Mantenimiento"],
  },
];
