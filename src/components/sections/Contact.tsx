import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig, whatsappUrl } from "@/content/site";

type Channel = { icon: IconName; label: string; value: string; href: string; external?: boolean };

export function Contact() {
  const { email, location } = siteConfig.contact;
  const { instagram } = siteConfig.social;
  const whatsapp = whatsappUrl();

  const channels = [
    whatsapp && { icon: "whatsapp", label: "WhatsApp", value: "Escribinos directamente", href: whatsapp, external: true },
    email && { icon: "mail", label: "Correo", value: email, href: `mailto:${email}` },
    instagram && { icon: "instagram", label: "Instagram", value: "@_farosolutions", href: instagram, external: true },
  ].filter(Boolean) as Channel[];

  // Botón principal para iniciar la conversación: WhatsApp si está configurado, si no correo.
  const conversation = whatsapp
    ? { href: whatsapp, label: "Iniciar conversación por WhatsApp", icon: "whatsapp" as const }
    : email
      ? {
          href: `mailto:${email}?subject=${encodeURIComponent("Consulta desde el sitio web")}`,
          label: "Iniciar conversación por correo",
          icon: "mail" as const,
        }
      : null;

  return (
    <Section id="contacto" labelledBy="contacto-title" className="overflow-hidden border-t border-line">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_20%_30%,black,transparent)]" />
      <div aria-hidden className="absolute -bottom-40 -left-40 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(192_198_212/0.08),transparent_65%)]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contacto-title"
              eyebrow="Contacto"
              title="¿Tenés una idea o necesitás una solución tecnológica?"
              compact
              description="Contanos qué necesitás. Analizamos tu proyecto y te ayudamos a encontrar la mejor manera de llevarlo adelante."
            />

            {conversation && (
              <Reveal delay={0.1} className="mt-8">
                <ButtonLink
                  href={conversation.href}
                  size="lg"
                  icon="arrowUpRight"
                  {...(conversation.icon === "whatsapp" && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {conversation.label}
                </ButtonLink>
              </Reveal>
            )}

            {channels.length > 0 && (
              <Reveal delay={0.15}>
                <ul className="mt-8 space-y-3">
                  {channels.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        {...(channel.external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="group flex items-center gap-4 rounded-2xl border border-line bg-ink/40 p-4 transition-[border-color,background-color] duration-300 hover:border-silver/40 hover:bg-graphite/50"
                      >
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line text-pearl transition-transform duration-300 group-hover:scale-105">
                          <Icon name={channel.icon} className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs tracking-[0.18em] text-mist uppercase">{channel.label}</span>
                          <span className="mt-0.5 block font-display text-base [overflow-wrap:anywhere] text-pearl sm:text-lg">
                            {channel.value}
                          </span>
                        </span>
                        <Icon
                          name="arrowUpRight"
                          className="ml-auto size-4 shrink-0 text-mist transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-pearl"
                        />
                      </a>
                    </li>
                  ))}
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
