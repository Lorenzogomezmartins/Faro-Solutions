"use client";

import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Tarjeta con un halo de luz que sigue al cursor (solo punteros finos). */
export function SpotlightCard({ className, children, ...props }: ComponentProps<"div">) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "group/card relative overflow-hidden rounded-2xl border border-line bg-ink/60 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-silver/30",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:[background:radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgb(248_250_252/0.07),transparent_60%)] hover:before:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
