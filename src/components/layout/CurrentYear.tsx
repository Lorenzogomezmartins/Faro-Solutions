"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Año actual. Las páginas son estáticas: el servidor imprime el año del build
 * y el navegador lo corrige al cargar, así nunca queda desactualizado.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => fallback);
  return <>{year}</>;
}
