import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig, whatsappUrl } from "@/content/site";

export function Contact() {
  const { email, location } = siteConfig.contact;
  const { instagram } = siteConfig.social;
  const whatsapp = whatsappUrl();

  return (
    <Section id="contacto" labelledBy="contacto-title" className="overflow-hidden border-t border-line">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_20%_30%,black,transparent)]" />
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contacto-title"
              eyebrow="Contacto"
              title="Contanos tu proyecto"
              description="Solicitá un presupuesto o hacenos una consulta. Aunque no sepas qué tecnología necesitás, contanos el problema."
            />

            {(email || whatsapp || location || instagram) && (
              <Reveal delay={0.15}>
                <ul className="mt-10 space-y-3">
                  {email && (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        className="group flex items-center gap-4 rounded-2xl border border-silver/25 bg-graphite/40 p-5 transition-colors hover:border-silver/60 hover:bg-graphite/70"
                      >
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line text-pearl">
                          <Icon name="mail" className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs tracking-[0.18em] text-mist uppercase">Escribinos</span>
                          <span className="mt-0.5 block font-display text-lg break-all text-pearl">{email}</span>
                        </span>
                        <Icon name="arrowUpRight" className="ml-auto size-4 shrink-0 text-mist transition-colors group-hover:text-pearl" />
                      </a>
                    </li>
                  )}
                  {instagram && (
                    <li>
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-silver/50 hover:bg-graphite/40"
                      >
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line text-pearl">
                          <Icon name="instagram" className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs tracking-[0.18em] text-mist uppercase">Instagram</span>
                          <span className="mt-0.5 block font-display text-lg text-pearl">@_farosolutions</span>
                        </span>
                        <Icon name="arrowUpRight" className="ml-auto size-4 shrink-0 text-mist transition-colors group-hover:text-pearl" />
                      </a>
                    </li>
                  )}
                  {whatsapp && (
                    <li>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-xl border border-line p-4 transition-colors hover:border-silver/40"
                      >
                        <Icon name="whatsapp" className="size-5 text-pearl" />
                        <span>
                          <span className="block text-xs text-mist">WhatsApp</span>
                          <span className="text-pearl">Escribinos directamente</span>
                        </span>
                        <Icon name="arrowUpRight" className="ml-auto size-4 text-mist transition-colors group-hover:text-pearl" />
                      </a>
                    </li>
                  )}
                  {location && (
                    <li className="flex items-center gap-4 p-4 text-silver/80">
                      <Icon name="pin" className="size-5 text-pearl" />
                      {location}
                    </li>
                  )}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-ink/80 p-6 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] backdrop-blur sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
