"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  /** Elemento a renderizar (ej. "li" dentro de listas). */
  as?: "div" | "li" | "article";
};

/**
 * Aparición sutil al entrar en pantalla. Respeta prefers-reduced-motion
 * a través del MotionConfig global (ver MotionProvider).
 */
export function Reveal({ delay = 0, y = 24, as = "div", children, ...props }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
