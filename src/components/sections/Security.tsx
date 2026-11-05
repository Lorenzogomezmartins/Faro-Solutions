import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { securityPractices } from "@/content/company";

export function Security() {
  return (
    <Section id="seguridad" labelledBy="seguridad-title" className="border-t border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              id="seguridad-title"
              eyebrow="Seguridad y calidad"
              title="La seguridad se diseña desde el primer día"
              description="Aplicamos buenas prácticas en cada etapa, en proporción al alcance de cada sistema."
            />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {securityPractices.map((practice) => (
                <li key={practice.title} className="flex items-center gap-3 border-b border-line pb-4 text-silver/90">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-pearl">
                    <Icon name={practice.icon} className="size-[18px]" />
                  </span>
                  {practice.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
