import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConceptBadge } from "@/components/projects/ProjectCard";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { getProjectBySlug, getProjects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
    robots: project.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: project.name,
      description: project.summary,
      url: `/proyectos/${project.slug}`,
      ...(project.cover && { images: [{ url: project.cover.src, alt: project.cover.alt }] }),
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="border-t border-line pt-8">
      <h2 className="font-display text-xs font-medium tracking-[0.24em] text-mist uppercase">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getProjects();
  const index = all.findIndex((item) => item.slug === project.slug);
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;

  const meta = [
    { label: "Categoría", value: project.category },
    project.client ? { label: "Cliente", value: project.client } : null,
    project.industry ? { label: "Rubro", value: project.industry } : null,
    project.year ? { label: "Año", value: String(project.year) } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <article className="pt-18">
      <Container className="pt-12 sm:pt-16">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-sm text-silver/70 transition-colors hover:text-pearl"
        >
          <Icon name="arrowLeft" className="size-4" />
          Volver a proyectos
        </Link>

        <Reveal className="mt-10 max-w-4xl">
          {project.draft && (
            <p className="mb-6 flex w-fit rounded-full border border-silver/30 px-3 py-1 text-xs text-silver">
              Borrador de ejemplo · solo visible en desarrollo
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            {project.concept && (
              <span className="text-xs uppercase">
                <ConceptBadge />
              </span>
            )}
            <p className="eyebrow">{project.category}</p>
          </div>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver/80">{project.summary}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProjectCover
            project={project}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="aspect-[16/9] rounded-3xl border border-line"
          />
        </Reveal>

        <div className="mt-16 grid gap-14 pb-24 lg:grid-cols-12 lg:pb-32">
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-28">
              <dl className="divide-y divide-line rounded-2xl border border-line">
                {meta.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4 px-5 py-4 text-sm">
                    <dt className="text-mist">{item.label}</dt>
                    <dd className="text-right text-pearl">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <h2 className="font-display text-xs font-medium tracking-[0.24em] text-mist uppercase">{project.concept ? "Stack propuesto" : "Tecnologías"}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-3 py-1.5 text-sm text-silver/90">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              {(project.links?.live || project.links?.repository) && (
                <div className="flex flex-col gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between rounded-xl border border-line px-5 py-3.5 text-sm text-pearl transition-colors hover:border-silver/50"
                    >
                      Ver sitio en línea
                      <Icon name="arrowUpRight" className="size-4" />
                    </a>
                  )}
                  {project.links.repository && (
                    <a
                      href={project.links.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between rounded-xl border border-line px-5 py-3.5 text-sm text-pearl transition-colors hover:border-silver/50"
                    >
                      Ver repositorio
                      <Icon name="arrowUpRight" className="size-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>

          <div className="space-y-14 lg:col-span-7 lg:col-start-6">
            <Block title="Descripción">
              <p className="text-lg leading-relaxed text-silver/85">{project.description}</p>
            </Block>
            <Block title="El problema">
              <p className="leading-relaxed text-silver/85">{project.problem}</p>
            </Block>
            <Block title="La solución">
              <p className="leading-relaxed text-silver/85">{project.solution}</p>
            </Block>
            <Block title="Funcionalidades principales">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-xl border border-line bg-ink/50 p-4 text-silver/90">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-pearl" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Block>
            {project.gallery && project.gallery.length > 0 && (
              <Block title="Galería">
                <div className="space-y-4">
                  {[
                    // Capturas web a dos columnas; capturas verticales (apps móviles) en más columnas.
                    { images: project.gallery.filter((image) => image.width >= image.height), className: "grid gap-4 sm:grid-cols-2" },
                    { images: project.gallery.filter((image) => image.width < image.height), className: "grid grid-cols-2 gap-4 sm:grid-cols-4" },
                  ]
                    .filter((group) => group.images.length > 0)
                    .map((group) => (
                <div key={group.className} className={group.className}>
                  {group.images.map((image) => (
                    <div key={image.src} className="overflow-hidden rounded-2xl border border-line">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 30vw, 50vw"
                        className="h-auto w-full"
                      />
                    </div>
                  ))}
                </div>
                    ))}
                </div>
              </Block>
            )}
          </div>
        </div>
      </Container>

      <section className="border-t border-line bg-ink/40">
        <Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">¿Tenés un desafío parecido?</h2>
            <p className="mt-3 text-silver/75">Contanos tu idea y te ayudamos a encontrar la solución que necesitás.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contacto" size="lg" icon="arrowRight">
              Solicitar presupuesto
            </ButtonLink>
            {next && (
              <ButtonLink href={`/proyectos/${next.slug}`} size="lg" variant="secondary">
                Siguiente proyecto
              </ButtonLink>
            )}
          </div>
        </Container>
      </section>
    </article>
  );
}
