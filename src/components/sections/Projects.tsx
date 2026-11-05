import { LogoMark } from "@/components/brand/Logo";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { getProjects } from "@/content/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const projects = getProjects();

  // Jerarquía: el primer destacado es el principal; luego destacados y compactos.
  const featured = projects.filter((project) => project.featured);
  const [main, ...highlighted] = featured.length > 0 ? featured : projects.slice(0, 1);
  const others = projects.filter((project) => project !== main && !highlighted.includes(project));

  return (
    <Section id="proyectos" labelledBy="proyectos-title" className="border-t border-line bg-ink/30">
      <Container>
        <SectionHeading
          id="proyectos-title"
          eyebrow="Proyectos"
          title="Lo que construimos"
          description="Plataformas, sistemas y aplicaciones construidos de punta a punta. Los marcados como «Concepto» son diseños propios que muestran cómo resolvemos casos típicos."
        />

        {main ? (
          <div className="mt-12 space-y-5">
            <Reveal>
              <ProjectCard project={main} variant="hero" />
            </Reveal>

            {highlighted.length > 0 && (
              <ul className="grid gap-5 md:grid-cols-2">
                {highlighted.map((project, index) => (
                  <Reveal
                    as="li"
                    key={project.slug}
                    delay={(index % 2) * 0.08}
                    className={cn(
                      "h-full",
                      highlighted.length % 2 === 1 && index === highlighted.length - 1 && "md:col-span-2",
                    )}
                  >
                    <ProjectCard project={project} variant="large" />
                  </Reveal>
                ))}
              </ul>
            )}

            {others.length > 0 && (
              <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {others.map((project, index) => (
                  <Reveal as="li" key={project.slug} delay={(index % 3) * 0.08} className="h-full">
                    <ProjectCard project={project} variant="compact" />
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <Reveal className="mt-12">
            <div className="surface relative flex flex-col items-center overflow-hidden px-6 py-14 text-center">
              <div aria-hidden className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
              <LogoMark withBeam className="relative h-14 w-auto translate-x-[14%] opacity-70" />
              <h3 className="relative mt-6 text-2xl font-semibold">Estamos documentando nuestros casos</h3>
              <ButtonLink href="/#contacto" icon="arrowRight" className="relative mt-6">
                Contanos tu proyecto
              </ButtonLink>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
