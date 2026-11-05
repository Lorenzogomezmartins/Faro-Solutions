import { useId } from "react";
import { MARK_PATHS } from "@/components/brand/Logo";

/**
 * Composición del hero: el isotipo sobre la retícula de construcción
 * del brand board, con el haz de luz barriendo lentamente.
 * Animación 100% CSS (se detiene con prefers-reduced-motion).
 */
export function HeroVisual() {
  const uid = useId().replace(/:/g, "");
  const ids = {
    metal: `hv-metal-${uid}`,
    beam: `hv-beam-${uid}`,
    glow: `hv-glow-${uid}`,
    fade: `hv-fade-${uid}`,
  };

  return (
    <svg
      viewBox="-120 -60 1100 820"
      className="h-full w-full overflow-visible"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={ids.metal} x1="80" y1="120" x2="540" y2="640" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F8FAFC" />
          <stop offset="0.5" stopColor="#C0C6D4" />
          <stop offset="1" stopColor="#7E8798" />
        </linearGradient>
        <linearGradient id={ids.beam} x1="450" y1="0" x2="1500" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F8FAFC" stopOpacity="0.7" />
          <stop offset="0.35" stopColor="#F8FAFC" stopOpacity="0.16" />
          <stop offset="1" stopColor="#F8FAFC" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ids.glow} cx="330" cy="380" r="330" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C0C6D4" stopOpacity="0.14" />
          <stop offset="1" stopColor="#C0C6D4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={ids.fade} cx="320" cy="370" r="420" gradientUnits="userSpaceOnUse">
          <stop offset="0.55" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${ids.fade}-mask`}>
          <rect x="-200" y="-200" width="1400" height="1200" fill={`url(#${ids.fade})`} />
        </mask>
      </defs>

      {/* Retícula de construcción */}
      <g
        mask={`url(#${ids.fade}-mask)`}
        fill="none"
        stroke="#C0C6D4"
        strokeOpacity="0.16"
        strokeWidth="1.2"
        className="construction"
      >
        <circle cx="320" cy="370" r="300" pathLength={1} style={{ animationDelay: "0.2s" }} />
        <circle cx="320" cy="370" r="215" strokeDasharray="4 8" className="construction-fade" />
        {[
          "M-80 118 H740",
          "M-80 640 H740",
          "M58 -40 V760",
          "M545 -40 V760",
          "M-80 370 H740",
          "M320 -40 V760",
          "M58 635 L338 118",
          "M338 118 L545 605",
        ].map((d, index) => (
          <path key={d} d={d} pathLength={1} style={{ animationDelay: `${0.4 + index * 0.08}s` }} />
        ))}
      </g>

      <circle cx="330" cy="380" r="330" fill={`url(#${ids.glow})`} />

      {/* Haz de luz */}
      <g className="origin-[452px_196px] animate-beam [transform-box:view-box]">
        <path d="M452 180 L1600 -170 L1600 470 L470 214 Z" fill={`url(#${ids.beam})`} opacity="0.18" />
        <path d={MARK_PATHS.beam.replace("L905 62 L905 300", "L1400 -40 L1400 340")} fill={`url(#${ids.beam})`} />
      </g>

      {/* Isotipo */}
      <g fill={`url(#${ids.metal})`}>
        <path d={MARK_PATHS.cap} />
        <path d={MARK_PATHS.bandTop} />
        <path d={MARK_PATHS.bandBottom} />
      </g>

    </svg>
  );
}
