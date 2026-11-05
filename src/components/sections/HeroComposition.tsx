"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Desplaza una capa según la posición del mouse (más profundidad = más movimiento). */
function useDepth(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  return {
    x: useTransform(x, (v) => v * depth),
    y: useTransform(y, (v) => v * depth),
  };
}

const glass =
  "rounded-2xl border border-silver/15 bg-gradient-to-b from-graphite/90 to-ink/95 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] backdrop-blur-md";

const codeLines: { indent: number; parts: [string, string][] }[] = [
  { indent: 0, parts: [["text-silver/50", "const "], ["text-pearl", "solucion"], ["text-silver/50", " = "], ["text-silver", "await "], ["text-pearl", "faro"], ["text-silver/50", ".build({"]] },
  { indent: 1, parts: [["text-silver/70", "idea"], ["text-silver/50", ": "], ["text-[#d6dbe6]", '"tu proyecto"'], ["text-silver/50", ","]] },
  { indent: 1, parts: [["text-silver/70", "plataformas"], ["text-silver/50", ": ["], ["text-[#d6dbe6]", '"web", "mobile"'], ["text-silver/50", "],"]] },
  { indent: 1, parts: [["text-silver/70", "integraciones"], ["text-silver/50", ": "], ["text-pearl", "true"], ["text-silver/50", ","]] },
  { indent: 0, parts: [["text-silver/50", "});"]] },
  { indent: 0, parts: [["text-silver/50", "solucion."], ["text-pearl", "deploy"], ["text-silver/50", "();"]] },
];

const bars = [42, 64, 52, 78, 60, 88, 72];

export function HeroComposition() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const back = useDepth(sx, sy, -10);
  const mid = useDepth(sx, sy, 14);
  const front = useDepth(sx, sy, 24);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    const onMove = (event: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set((event.clientX - (rect.left + rect.width / 2)) / rect.width);
      my.set((event.clientY - (rect.top + rect.height / 2)) / rect.height);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const enter = (delay: number, from: { x?: number; y?: number } = { y: 30 }) => ({
    initial: { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 1.1, delay, ease },
  });

  return (
    <div ref={ref} aria-hidden className="relative aspect-[10/9] w-full select-none">
      {/* Faro y haz de luz al fondo */}
      <motion.div style={back} className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="absolute top-[4%] left-[30%] w-[46%]"
        >
          <LogoMark withBeam className="w-full opacity-[0.16]" />
        </motion.div>
        <div className="absolute top-[8%] left-[18%] size-[70%] rounded-full border border-silver/10" />
        <div className="absolute top-[20%] left-[30%] size-[46%] rounded-full border border-dashed border-silver/10" />
      </motion.div>

      {/* Flujos de datos entre las piezas */}
      <svg viewBox="0 0 500 450" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="hero-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#C0C6D4" stopOpacity="0" />
            <stop offset="0.5" stopColor="#C0C6D4" stopOpacity="0.45" />
            <stop offset="1" stopColor="#C0C6D4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M150 330 C 210 300, 250 240, 300 200",
          "M300 200 C 350 170, 380 210, 410 260",
        ].map((d, index) => (
          <g key={d}>
            <path d={d} stroke="url(#hero-flow)" strokeWidth="1.2" strokeDasharray="3 6" />
            {!reduce && (
              <circle r="3" fill="#F8FAFC">
                <animateMotion dur={`${3.2 + index}s`} repeatCount="indefinite" path={d} begin={`${index * 0.8}s`} />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* Panel de gestión */}
      <motion.div style={mid} className="absolute top-[6%] left-[2%] w-[66%]">
        <motion.div {...enter(0.35)} className={cn(glass, "p-4")}>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-silver/30" />
            <span className="size-2 rounded-full bg-silver/30" />
            <span className="size-2 rounded-full bg-silver/30" />
            <span className="ml-3 h-2 w-24 rounded-full bg-silver/10" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["Ventas", "+18%"],
              ["Pedidos", "1.284"],
              ["Clientes", "312"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-silver/10 bg-white/[0.03] px-3 py-2">
                <p className="text-[0.6rem] tracking-wider text-mist uppercase">{label}</p>
                <p className="mt-0.5 font-display text-sm font-semibold text-pearl">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-24 items-end gap-2 rounded-xl border border-silver/10 bg-white/[0.02] p-3">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-silver/30 to-pearl/90"
                style={{ height: `${height}%` }}
                initial={{ scaleY: 0 }}
                animate={reduce ? { scaleY: 1 } : { scaleY: [0, 1, 0.82, 1] }}
                transition={{
                  duration: reduce ? 0 : 2.4,
                  delay: 0.9 + index * 0.08,
                  ease,
                  repeat: reduce ? 0 : Infinity,
                  repeatDelay: 4,
                  repeatType: "mirror",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Editor de código */}
      <motion.div style={front} className="absolute bottom-[4%] left-0 w-[58%]">
        <motion.div {...enter(0.6, { x: -30 })} className={cn(glass, "p-4 font-mono text-[0.62rem] leading-[1.7] sm:text-[0.7rem]")}>
          <div className="mb-2 flex items-center justify-between text-mist">
            <span>solucion.ts</span>
            <span className="text-[0.55rem] tracking-widest uppercase">TypeScript</span>
          </div>
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.1 + index * 0.18 }}
              className="whitespace-nowrap"
              style={{ paddingLeft: `${line.indent * 1.2}em` }}
            >
              <span className="mr-3 text-silver/25">{index + 1}</span>
              {line.parts.map(([cls, text], i) => (
                <span key={i} className={cls}>
                  {text}
                </span>
              ))}
              {index === codeLines.length - 1 && (
                <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-[blink_1.1s_steps(1)_infinite] bg-pearl" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* App móvil */}
      <motion.div style={front} className="absolute top-[24%] right-[1%] w-[30%]">
        <motion.div {...enter(0.8, { x: 30 })} className={cn(glass, "rounded-[1.6rem] p-2.5")}>
          <div className="rounded-[1.2rem] border border-silver/10 bg-obsidian/80 p-3">
            <div className="mx-auto h-1 w-10 rounded-full bg-silver/20" />
            <p className="mt-3 text-[0.55rem] tracking-wider text-mist uppercase">Hoy</p>
            <p className="font-display text-sm font-semibold text-pearl">Reservas</p>
            <div className="mt-2 space-y-1.5">
              {["18:00", "19:30", "21:00"].map((hour, index) => (
                <div key={hour} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2 py-1.5">
                  <span className="text-[0.6rem] text-silver/80">{hour}</span>
                  <span className={cn("size-1.5 rounded-full", index === 2 ? "bg-silver/30" : "bg-pearl")} />
                </div>
              ))}
            </div>
            <div className="mt-2 h-6 rounded-lg bg-pearl/90" />
          </div>
        </motion.div>
        {/* Notificación */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 2, ease }}
          className={cn(glass, "absolute -bottom-10 -left-[55%] flex items-center gap-2 rounded-xl px-3 py-2 whitespace-nowrap")}
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-pearl text-[0.6rem] text-obsidian">✓</span>
          <span className="text-[0.65rem] text-silver">Pedido confirmado</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
