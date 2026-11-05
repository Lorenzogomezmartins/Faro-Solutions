import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { getProjects } from "@/content/projects";

/**
 * Portfolio en grilla editorial: el proyecto principal en gran formato,
 * destacados en mosaico y un acceso al portfolio completo.
 */
export function Projects() {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);
  const [main, second, third, ...rest] = featured;
  const tiles = rest.slice(0, 3);
  const wide = rest[3];
  const remaining = projects.filter((project) => !featured.slice(0, 7).includes(project));

  if (!main) return null;

  return (
    <Section id="proyectos" labelledBy="proyectos-title" className="border-y border-line bg-ink/30">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="proyectos-title"
            eyebrow="Proyectos"
            title="Proyectos que muestran lo que podemos construir"
            description="Sistemas, plataformas y aplicaciones desarrollados de punta a punta."
          />
          <Reveal className="shrink-0">
            <ButtonLink href="/proyectos" variant="secondary" icon="arrowRight">
              Ver todos los proyectos
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal as="li" className="h-full lg:col-span-2 lg:row-span-2">
            <ProjectCard project={main} variant="feature" priority />
          </Reveal>
          {[second, third].filter(Boolean).map((project, index) => (
            <Reveal as="li" key={project.slug} delay={0.08 + index * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
          {tiles.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={index * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
          {wide && (
            <Reveal as="li" className="h-full lg:col-span-2">
              <ProjectCard project={wide} variant="wide" />
            </Reveal>
          )}
          <Reveal as="li" delay={0.08} className="h-full">
            <Link
              href="/proyectos"
              className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-graphite/70 to-ink p-7 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-silver/30"
            >
              <div aria-hidden className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_80%_20%,black,transparent_70%)]" />
              <div className="relative">
                <p className="text-xs tracking-[0.18em] text-mist uppercase">Portfolio completo</p>
                <p className="mt-3 font-display text-2xl font-semibold text-pearl">
                  {projects.length} proyectos
                </p>
                {remaining.length > 0 && (
                  <p className="mt-2 text-sm leading-relaxed text-silver/70">
                    También: {remaining.map((project) => project.name.split(" — ")[0]).join(", ")}.
                  </p>
                )}
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-pearl">
                Ver todos
                <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
