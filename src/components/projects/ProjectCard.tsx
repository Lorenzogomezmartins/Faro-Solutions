import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

/**
 * feature: proyecto principal (gran formato) · tile: mosaico estándar ·
 * wide: horizontal a dos columnas.
 */
export type ProjectCardVariant = "feature" | "tile" | "wide";

/** Identifica los proyectos demo (diseños propios, no trabajos entregados a clientes). */
export function ConceptBadge({ className }: { className?: string }) {
  return (
    <span
      title="Proyecto demo de Faro Solutions"
      className={cn(
        "inline-flex items-center rounded-full border border-silver/35 bg-obsidian/70 px-2.5 py-0.5 text-[0.68rem] font-medium tracking-[0.14em] text-silver uppercase backdrop-blur",
        className,
      )}
    >
      Demo
    </span>
  );
}

function Technologies({ project, max }: { project: Project; max: number }) {
  const visible = project.technologies.slice(0, max);
  const rest = project.technologies.length - visible.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías principales">
      {visible.map((tech) => (
        <li key={tech} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-silver/85">
          {tech}
        </li>
      ))}
      {rest > 0 && <li className="px-1.5 py-1 text-xs text-mist">+{rest}</li>}
    </ul>
  );
}

const shell =
  "group relative isolate flex h-full overflow-hidden rounded-3xl border border-line bg-ink/70 transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-silver/30 hover:shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-pearl/60";

const zoom =
  "[&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-out-expo group-hover:[&_img]:scale-[1.04]";

export function ProjectCard({
  project,
  variant = "tile",
  priority,
}: {
  project: Project;
  variant?: ProjectCardVariant;
  priority?: boolean;
}) {
  const href = `/proyectos/${project.slug}`;
  const isFeature = variant === "feature";
  const isWide = variant === "wide";

  return (
    <article className={cn(shell, isWide ? "flex-col sm:flex-row" : "flex-col")}>
      <div className={cn("relative overflow-hidden", isWide && "sm:w-[55%] sm:shrink-0", isFeature && "lg:min-h-[22rem] lg:flex-1")}>
        <ProjectCover
          project={project}
          priority={priority}
          fit={isFeature ? "contain" : "cover"}
          sizes={isFeature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={cn(
            zoom,
            isFeature ? "aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto" : isWide ? "aspect-[16/10] sm:h-full sm:aspect-auto" : "aspect-[16/10]",
          )}
        />
        {/* Degradado para integrar la imagen con la tarjeta */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent",
            isWide && "sm:bg-gradient-to-l",
          )}
        />
        {project.concept && <ConceptBadge className="absolute top-4 left-4" />}
        <span
          aria-hidden
          className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full border border-silver/30 bg-obsidian/70 text-pearl opacity-0 backdrop-blur transition-[opacity,transform] duration-500 ease-out-expo group-hover:opacity-100 group-hover:rotate-0 sm:-rotate-45"
        >
          <Icon name="arrowRight" className="size-4" />
        </span>
      </div>

      <div className={cn("flex flex-col", isFeature ? "p-7 sm:p-8" : "flex-1 p-6")}>
        <p className="text-xs tracking-[0.18em] text-mist uppercase">
          {project.category}
          {project.year && <span className="ml-2 text-mist/70">· {project.year}</span>}
        </p>
        <h3 className={cn("mt-2.5 font-semibold", isFeature ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className={cn("mt-2.5 leading-relaxed text-silver/75", isFeature ? "max-w-2xl" : "line-clamp-2 text-[0.95rem]")}>
          {project.summary}
        </p>
        <div className="mt-auto pt-5">
          <Technologies project={project} max={isFeature ? 6 : 3} />
        </div>
      </div>
    </article>
  );
}
