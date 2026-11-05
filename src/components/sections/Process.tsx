"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/content/company";
import { cn } from "@/lib/utils";

/**
 * Proceso de trabajo: la línea se ilumina con el scroll (como el haz del faro)
 * y cada etapa se activa al alcanzarla. Horizontal en escritorio, vertical en mobile.
 */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const total = processSteps.length;
  const [active, setActive] = useState(reduce ? total - 1 : -1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    // Cada etapa se activa cuando la línea llega a su tramo.
    setActive(value < 0.02 ? -1 : Math.min(total - 1, Math.floor(value * (total - 1) + 0.05)));
  });

  return (
    <Section id="proceso" labelledBy="proceso-title" className="border-y border-line bg-ink/30">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="proceso-title"
            eyebrow="Nuestro proceso"
            title="De la idea a la solución en funcionamiento"
            description="Un camino claro en seis etapas, para que sepas en todo momento en qué punto está tu proyecto."
          />
          <div className="shrink-0">
            <ButtonLink href="/#contacto" icon="arrowRight">
              Iniciar un proyecto
            </ButtonLink>
          </div>
        </div>

        <ol ref={ref} className="relative mt-14 grid gap-8 lg:grid-cols-6 lg:gap-5">
          {/* Riel: vertical en mobile, horizontal en escritorio */}
          <span aria-hidden className="absolute top-6 bottom-6 left-6 w-px bg-silver/15 lg:top-6 lg:right-[8%] lg:bottom-auto lg:left-[8%] lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute top-6 bottom-6 left-6 w-px origin-top bg-gradient-to-b from-pearl to-silver/50 shadow-[0_0_14px_rgb(248_250_252/0.6)] lg:hidden"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: reduce ? 1 : progress }}
            className="absolute top-6 right-[8%] left-[8%] hidden h-px origin-left bg-gradient-to-r from-pearl to-silver/50 shadow-[0_0_14px_rgb(248_250_252/0.6)] lg:block"
          />

          {processSteps.map((step, index) => {
            const isActive = index <= active;
            const isCurrent = index === active;
            return (
              <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                <span
                  className={cn(
                    "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border transition-[background-color,border-color,color,box-shadow,transform] duration-500 ease-out-expo",
                    isActive
                      ? "border-pearl bg-pearl text-obsidian shadow-[0_0_0_6px_rgb(248_250_252/0.08),0_0_30px_rgb(248_250_252/0.25)]"
                      : "border-silver/20 bg-obsidian text-mist",
                    isCurrent && "scale-110",
                  )}
                >
                  <Icon name={step.icon} className="size-5" />
                </span>
                <div
                  className={cn(
                    "pt-1 transition-[opacity,transform] duration-500 ease-out-expo lg:mt-6 lg:pt-0",
                    isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-50",
                  )}
                >
                  <p className="font-display text-xs tracking-[0.2em] text-mist">0{index + 1}</p>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-wide uppercase">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver/75 lg:mx-auto lg:max-w-[13rem]">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
