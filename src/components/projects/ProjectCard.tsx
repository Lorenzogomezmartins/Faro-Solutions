import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

/** hero: proyecto principal · large: destacado · compact: resto del portfolio. */
export type ProjectCardVariant = "hero" | "large" | "compact";

const coverZoom =
  "[&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-out-expo group-hover:[&_img]:scale-[1.03]";

function Meta({ project }: { project: Project }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs tracking-[0.18em] text-mist uppercase">
      {project.concept && <ConceptBadge />}
      <span>{project.category}</span>
      {project.year && (
        <>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </>
      )}
    </p>
  );
}

/** Identifica los proyectos demo (diseños propios, no trabajos entregados a clientes). */
export function ConceptBadge() {
  return (
    <span
      title="Proyecto demo de Faro Solutions"
      className="rounded-full border border-silver/35 px-2 py-0.5 tracking-[0.12em] text-silver"
    >
      Demo
    </span>
  );
}

function Title({ project, className }: { project: Project; className: string }) {
  return (
    <h3 className={cn("font-semibold", className)}>
      {/* El enlace cubre toda la tarjeta para facilitar el clic. */}
      <Link href={`/proyectos/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
        {project.name}
      </Link>
    </h3>
  );
}

function Technologies({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
      {project.technologies.map((tech) => (
        <li key={tech} className="rounded-full bg-graphite/70 px-3 py-1 text-xs text-silver/85">
          {tech}
        </li>
      ))}
    </ul>
  );
}

function More() {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-pearl">
      Ver proyecto
      <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
}

const shell =
  "group relative overflow-hidden rounded-2xl border border-line bg-ink/60 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-silver/30 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-pearl/60";

export function ProjectCard({ project, variant = "large" }: { project: Project; variant?: ProjectCardVariant }) {
  if (variant === "hero") {
    return (
      <article className={cn(shell, "grid h-full lg:grid-cols-12")}>
        <ProjectCover
          project={project}
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={cn("aspect-[16/10] border-b border-line lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[28rem] lg:border-r lg:border-b-0", coverZoom)}
        />
        <div className="flex flex-col p-7 sm:p-9 lg:col-span-5">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-silver/30 px-3 py-1 text-xs text-pearl">
            <Icon name="spark" className="size-3.5" />
            Proyecto destacado
          </span>
          <Meta project={project} />
          <Title project={project} className="mt-3 text-2xl sm:text-3xl" />
          <p className="mt-3 leading-relaxed text-silver/75">{project.summary}</p>
          <ul className="mt-5 space-y-1.5 text-sm text-silver/85">
            {project.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex gap-2">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-pearl" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Technologies project={project} />
          </div>
          <div className="mt-auto pt-7">
            <More />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={cn(shell, "flex h-full flex-col")}>
        <ProjectCover
          project={project}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
          className={cn("aspect-[16/9] border-b border-line", coverZoom)}
        />
        <div className="flex flex-1 flex-col p-6">
          <Meta project={project} />
          <Title project={project} className="mt-2 text-lg" />
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-silver/70">{project.summary}</p>
          <div className="mt-auto pt-3">
            <More />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn(shell, "flex h-full flex-col")}>
      <ProjectCover
        project={project}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={cn("aspect-[16/10] border-b border-line", coverZoom)}
      />
      <div className="flex flex-1 flex-col p-7">
        <Meta project={project} />
        <Title project={project} className="mt-3 text-2xl" />
        <p className="mt-3 leading-relaxed text-silver/75">{project.summary}</p>
        <div className="mt-5">
          <Technologies project={project} />
        </div>
        <div className="mt-auto pt-6">
          <More />
        </div>
      </div>
    </article>
  );
}
