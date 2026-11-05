import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/projects/PortfolioGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { getProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portfolio de Faro Solutions: sistemas de gestión, plataformas web, aplicaciones móviles y sitios web desarrollados a medida.",
  alternates: { canonical: "/proyectos" },
  openGraph: { url: "/proyectos", title: "Proyectos | Faro Solutions" },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="pt-18">
      <section aria-labelledby="portfolio-title" className="relative overflow-hidden">
        <div aria-hidden className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_80%_at_80%_0%,black,transparent)]" />
        <Container className="pt-14 pb-10 sm:pt-20">
          <p className="eyebrow">Portfolio</p>
          <h1 id="portfolio-title" className="mt-5 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">
            Todo lo que construimos
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver/75">
            Sistemas de gestión, plataformas, aplicaciones móviles y sitios web. Elegí un proyecto para ver sus pantallas,
            funcionalidades y tecnologías.
          </p>
        </Container>
      </section>

      <Container className="pb-24">
        <PortfolioGrid projects={projects} />
      </Container>

      <section className="border-t border-line bg-ink/40">
        <Container className="flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">¿Tenés un proyecto en mente?</h2>
            <p className="mt-2 text-silver/75">Contanos qué necesitás y te ayudamos a llevarlo adelante.</p>
          </div>
          <ButtonLink href="/#contacto" size="lg" icon="arrowRight" className="shrink-0">
            Hablemos de tu proyecto
          </ButtonLink>
        </Container>
      </section>
    </div>
  );
}
