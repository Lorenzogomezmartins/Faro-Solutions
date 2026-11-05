import Image from "next/image";
import { LogoMark } from "@/components/brand/Logo";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** "contain" muestra la portada completa (formatos con proporción distinta a 16:10). */
  fit?: "cover" | "contain";
};

/** Captura del proyecto o, si todavía no hay imagen, una portada neutra de marca. */
export function ProjectCover({ project, className, priority, sizes = "(min-width: 1024px) 50vw, 100vw", fit = "cover" }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-graphite/40", className)}>
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div aria-hidden className="grid-lines absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
          <LogoMark withBeam className="relative w-1/3 max-w-40 translate-x-[12%] opacity-40" />
          <span className="absolute bottom-4 left-4 font-display text-[0.65rem] tracking-[0.24em] text-mist uppercase">
            Imagen del proyecto
          </span>
        </div>
      )}
    </div>
  );
}
