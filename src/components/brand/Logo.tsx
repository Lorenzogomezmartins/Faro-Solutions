import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Identidad de Faro Solutions recreada en SVG a partir del brand board
 * oficial (public/brand/brand-board.webp). No modificar proporciones:
 * cualquier cambio de marca debe partir del archivo original.
 */

type Tone = "metal" | "solid";

/** Geometría del isotipo (faro) — compartida por todos los componentes de marca. */
export const MARK_PATHS = {
  cap: "M185 218 L338 118 L470 212 Q330 190 185 218 Z",
  bandTop: "M240 265 Q326 244 412 252 L438 325 C335 332 232 372 160 432 Z",
  bandBottom:
    "M133 482 C228 422 340 384 457 378 L538 605 C470 560 405 514 342 515 C262 517 150 588 58 635 Z",
  beam: "M445 182 L905 62 L905 300 L472 214 Z",
} as const;

function MetalGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="80" y1="120" x2="540" y2="640" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#F8FAFC" />
      <stop offset="0.5" stopColor="#C0C6D4" />
      <stop offset="1" stopColor="#8E96A6" />
    </linearGradient>
  );
}

type MarkProps = {
  className?: string;
  tone?: Tone;
  /** Incluye el haz de luz del faro. */
  withBeam?: boolean;
  title?: string;
};

export function LogoMark({ className, tone = "metal", withBeam = false, title }: MarkProps) {
  const uid = useId().replace(/:/g, "");
  const fillId = `faro-metal-${uid}`;
  const beamId = `faro-beam-${uid}`;
  const fill = tone === "metal" ? `url(#${fillId})` : "currentColor";

  return (
    <svg
      viewBox={withBeam ? "50 55 860 590" : "45 105 505 540"}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {tone === "metal" && <MetalGradient id={fillId} />}
        {withBeam && (
          <linearGradient id={beamId} x1="450" y1="0" x2="905" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={tone === "metal" ? "#F8FAFC" : "currentColor"} stopOpacity="0.85" />
            <stop offset="1" stopColor={tone === "metal" ? "#F8FAFC" : "currentColor"} stopOpacity="0" />
          </linearGradient>
        )}
      </defs>
      {withBeam && <path d={MARK_PATHS.beam} fill={`url(#${beamId})`} />}
      <path d={MARK_PATHS.cap} fill={fill} />
      <path d={MARK_PATHS.bandTop} fill={fill} />
      <path d={MARK_PATHS.bandBottom} fill={fill} />
    </svg>
  );
}

type WordmarkProps = { className?: string; tone?: Tone };

/** Logotipo "FΛRO / SOLUTIONS" (Sora). La A sin travesaño es parte de la marca. */
export function Wordmark({ className, tone = "solid" }: WordmarkProps) {
  const uid = useId().replace(/:/g, "");
  const fillId = `faro-word-${uid}`;
  const fill = tone === "metal" ? `url(#${fillId})` : "currentColor";

  return (
    <svg viewBox="60 40 1150 345" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      {tone === "metal" && (
        <defs>
          <linearGradient id={fillId} x1="60" y1="40" x2="1210" y2="385" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#C0C6D4" />
          </linearGradient>
        </defs>
      )}
      <g fill={fill}>
        {/* F */}
        <path d="M70 48 H240 V72 H96 V126 H226 V150 H96 V222 H70 Z" />
        {/* Λ */}
        <path d="M330 222 L440 48 H464 L574 222 H546 L452 76 L358 222 Z" />
        {/* R */}
        <path d="M790 150 H822 L888 222 H856 Z" />
        <circle cx="1095" cy="135" r="74.5" fill="none" stroke={fill} strokeWidth="25" />
      </g>
      <path
        d="M703 222 V60.5 H820 A44.5 44.5 0 0 1 820 149.5 H703"
        fill="none"
        stroke={fill}
        strokeWidth="25"
      />
      <text
        x="74"
        y="374"
        textLength="1124"
        lengthAdjust="spacing"
        fill={fill}
        style={{ fontFamily: "var(--font-sora), Sora, sans-serif", fontSize: 100, fontWeight: 400 }}
      >
        SOLUTIONS
      </text>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** "horizontal": isotipo | logotipo (barra de navegación, footer). */
  variant?: "horizontal" | "stacked";
};

export function Logo({ className, variant = "horizontal" }: LogoProps) {
  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center gap-3", className)}>
        <LogoMark withBeam className="h-20 w-auto translate-x-[18%]" />
        <Wordmark className="h-10 w-auto text-pearl" />
        <span className="sr-only">Faro Solutions</span>
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center", className)}>
      <LogoMark className="h-full w-auto shrink-0" />
      <span aria-hidden className="mx-[0.55em] h-[78%] w-px shrink-0 bg-silver/45" />
      <Wordmark className="h-[62%] w-auto shrink-0 text-pearl" />
      <span className="sr-only">Faro Solutions</span>
    </span>
  );
}
