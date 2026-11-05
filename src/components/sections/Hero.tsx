"use client";

import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroComposition } from "./HeroComposition";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease },
});

const capabilities = ["Software a medida", "Sistemas de gestión", "Apps web y móviles", "Integraciones"];

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-18">
      {/* Fondo: retícula de construcción + luz ambiental */}
      <div
        aria-hidden
        className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_35%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -top-48 right-[-15%] -z-10 size-[60rem] rounded-full bg-[radial-gradient(circle,rgb(192_198_212/0.10),transparent_62%)]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-20 sm:px-8 lg:min-h-[min(calc(100svh-4.5rem),48rem)] lg:grid-cols-12 lg:gap-6 lg:px-10 lg:py-16">
        <div className="relative z-10 lg:col-span-6">
          <motion.p {...fadeUp(0.1)} className="eyebrow">
            Estudio de desarrollo de software
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.2)}
            className="mt-6 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[3.4rem] lg:text-[3.9rem]"
          >
            Transformamos ideas en <span className="text-metal">soluciones tecnológicas.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.35)} className="mt-6 max-w-xl text-base leading-relaxed text-silver/80 sm:text-lg">
            Desarrollamos software, plataformas web y aplicaciones a medida para ayudar a empresas y emprendimientos a
            crecer y optimizar sus procesos.
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/#contacto" size="lg" icon="arrowRight">
              Hablemos de tu proyecto
            </ButtonLink>
            <ButtonLink href="/#proyectos" size="lg" variant="secondary">
              Conocé nuestros proyectos
            </ButtonLink>
          </motion.div>

          <motion.ul
            {...fadeUp(0.65)}
            aria-label="Qué desarrollamos"
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mist"
          >
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rotate-45 bg-silver/50" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none lg:pl-6">
          <HeroComposition />
        </div>
      </div>
    </section>
  );
}
