import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/content/company";

/** Proceso de trabajo en una línea de tiempo horizontal compacta. */
export function Process() {
  return (
    <Section id="proceso" labelledBy="proceso-title" className="border-t border-line bg-ink/30">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="proceso-title"
            eyebrow="Cómo trabajamos"
            title="Un proceso claro, de la primera charla a la producción"
          />
          <Reveal className="shrink-0">
            <ButtonLink href="/#contacto" icon="arrowRight">
              Solicitar presupuesto
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="relative mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Riel horizontal (escritorio) */}
          <span aria-hidden className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-gradient-to-r from-pearl/60 via-silver/25 to-silver/10 lg:block" />
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.06} className="relative">
              <span className="relative flex size-11 items-center justify-center rounded-full border border-silver/30 bg-obsidian font-display text-sm text-pearl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-silver/75">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
