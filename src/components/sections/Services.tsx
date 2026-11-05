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
          title="Mucho más que páginas web"
          description="Desarrollamos soluciones tecnológicas para resolver problemas reales de negocios y organizaciones."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={index * 0.07} className="h-full">
              <SpotlightCard className="flex h-full flex-col rounded-3xl p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-silver/15 bg-gradient-to-b from-graphite to-ink text-pearl shadow-[inset_0_1px_0_rgb(248_250_252/0.08)] transition-transform duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:rotate-[-4deg]">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <span className="font-display text-xs tracking-[0.2em] text-mist">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-silver/75">{service.description}</p>
                <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-silver/85">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Icon name="check" className="size-4 shrink-0 text-pearl/80" />
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
