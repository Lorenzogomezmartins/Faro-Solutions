import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { about, principles } from "@/content/company";

export function About() {
  return (
    <Section id="nosotros" labelledBy="nosotros-title" className="border-t border-line">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionHeading id="nosotros-title" eyebrow="Nosotros" title={about.title} description={about.intro} />
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:col-span-6 lg:self-end">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={index * 0.07} className="border-t border-silver/20 pt-5">
                <Icon name={principle.icon} className="size-6 text-pearl" />
                <h3 className="mt-4 text-base font-semibold">{principle.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-silver/75">{principle.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
