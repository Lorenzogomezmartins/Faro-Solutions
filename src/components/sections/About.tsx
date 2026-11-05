import { LogoMark } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { about, values } from "@/content/company";

export function About() {
  return (
    <Section id="nosotros" labelledBy="nosotros-title" className="overflow-hidden">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-6">
            <LogoMark
              className="pointer-events-none absolute -top-10 -left-16 hidden w-72 opacity-[0.04] lg:block"
            />
            <Reveal>
              <p className="eyebrow">Nosotros</p>
              <h2 id="nosotros-title" className="mt-5 text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.6rem]">
                {about.title}
              </h2>
            </Reveal>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-silver/80 sm:text-[1.05rem]">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.08 + index * 0.06}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <ul className="grid gap-3 self-center sm:grid-cols-2 lg:col-span-6">
            {values.map((value, index) => (
              <Reveal
                as="li"
                key={value.title}
                delay={index * 0.05}
                className="group flex gap-4 rounded-2xl border border-line bg-ink/50 p-5 transition-colors duration-500 hover:border-silver/30 hover:bg-ink sm:[&:last-child]:col-span-2"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line text-pearl transition-colors duration-500 group-hover:border-silver/40">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{value.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-silver/70">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
