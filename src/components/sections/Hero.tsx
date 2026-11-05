"use client";

import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease },
});

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-18">
      {/* Fondo: retícula de construcción desvanecida + luz ambiental */}
      <div
        aria-hidden
        className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 size-[56rem] rounded-full bg-[radial-gradient(circle,rgb(192_198_212/0.09),transparent_65%)]"
      />

      <div className="mx-auto grid min-h-[min(calc(100svh-4.5rem),46rem)] max-w-7xl items-center gap-6 px-5 pt-10 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-0 lg:px-10 lg:py-20">
        <div className="relative z-10 lg:col-span-7">
          <motion.p {...fadeUp(0.1)} className="eyebrow">
            Desarrollo de software a medida
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.2)}
            className="mt-7 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.1rem]"
          >
            Tecnología a medida para resolver <span className="text-metal">necesidades reales.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.35)} className="mt-7 max-w-xl text-base leading-relaxed text-silver/80 sm:text-lg">
            Sitios web, sistemas de gestión, aplicaciones e integraciones. Te acompañamos desde el problema hasta la
            solución en producción.
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/#contacto" size="lg" icon="arrowRight">
              Contanos tu proyecto
            </ButtonLink>
            <ButtonLink href="/#proyectos" size="lg" variant="secondary">
              Ver proyectos
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
          className="pointer-events-none relative order-first mx-auto aspect-[11/8.2] w-[70%] max-w-md sm:w-[55%] lg:order-none lg:col-span-5 lg:w-[135%] lg:max-w-none lg:translate-x-[-6%]"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
