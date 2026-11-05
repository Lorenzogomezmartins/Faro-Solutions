import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { services } from "@/content/services";

export function Services() {
  return (
    <Section id="servicios" labelledBy="servicios-title">
      <Container>
        <SectionHeading
          id="servicios-title"
          eyebrow="Servicios"
          title="Soluciones tecnológicas de punta a punta"
          description="Si tu necesidad se resuelve con tecnología, la analizamos con vos y construimos la solución adecuada."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={index * 0.06} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-graphite/60 text-pearl transition-colors duration-500 group-hover/card:border-silver/40">
                  <Icon name={service.icon} className="size-5" />
                </span>
                <h3 className="mt-6 text-lg leading-snug font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver/75">{service.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`Incluye: ${service.title}`}>
                  {service.includes.map((item) => (
                    <li key={item} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-silver/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
