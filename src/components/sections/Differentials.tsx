import { LogoMark } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { brandQuote, differentials } from "@/content/company";

/** Diferenciales de Faro: mensajes institucionales, no testimonios. */
export function Differentials() {
  return (
    <Section id="diferenciales" labelledBy="diferenciales-title">
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-3xl border border-silver/15 bg-gradient-to-br from-graphite via-ink to-obsidian p-8 sm:p-10">
              <LogoMark withBeam className="pointer-events-none absolute -right-10 -bottom-6 w-64 opacity-[0.07]" />
              <div className="relative">
                <p className="eyebrow">Por qué Faro</p>
                <h2 id="diferenciales-title" className="sr-only">
                  Diferenciales de Faro Solutions
                </h2>
                <Icon name="quote" className="mt-8 size-8 text-silver/40" />
                <p className="mt-4 font-display text-2xl leading-snug font-medium text-pearl sm:text-[1.75rem]">
                  {brandQuote}
                </p>
              </div>
              <p className="relative mt-8 text-sm text-mist">Faro Solutions</p>
            </div>
          </Reveal>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {differentials.map((item, index) => (
              <Reveal as="li" key={item.title} delay={(index % 2) * 0.07} className="h-full">
                <SpotlightCard className="flex h-full gap-4 rounded-3xl p-6">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-line bg-graphite/50 text-pearl transition-transform duration-500 ease-out-expo group-hover/card:scale-105">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-silver/70">{item.text}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
