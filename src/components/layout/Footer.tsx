import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { services } from "@/content/services";
import { navigation, siteConfig, whatsappUrl } from "@/content/site";
import { CurrentYear } from "./CurrentYear";

const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  github: "GitHub",
};

export function Footer() {
  const buildYear = new Date().getFullYear();
  const { email } = siteConfig.contact;
  const whatsapp = whatsappUrl();
  const socials = (Object.entries(siteConfig.social) as [keyof typeof siteConfig.social, string | null][]).filter(
    (entry): entry is [keyof typeof siteConfig.social, string] => Boolean(entry[1]),
  );

  return (
    <footer className="relative border-t border-line bg-obsidian">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Faro Solutions — inicio" className="inline-block h-10">
              <Logo className="h-10" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-silver/70">
              Desarrollo de software y soluciones tecnológicas a medida para empresas, PyMEs, emprendimientos y
              profesionales.
            </p>
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-3" aria-label="Redes sociales">
                {socials.map(([network, url]) => (
                  <li key={network}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabels[network]}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-line text-silver transition-colors hover:border-silver/50 hover:text-pearl"
                    >
                      <Icon name={network as IconName} className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Secciones" className="lg:col-span-2">
            <h2 className="font-display text-xs font-medium tracking-[0.24em] text-mist uppercase">Sitio</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-silver/80 transition-colors hover:text-pearl">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-xs font-medium tracking-[0.24em] text-mist uppercase">Servicios</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href="/#servicios" className="text-silver/80 transition-colors hover:text-pearl">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-xs font-medium tracking-[0.24em] text-mist uppercase">Contacto</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="[overflow-wrap:anywhere] text-silver/80 transition-colors hover:text-pearl">
                    {email}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-silver/80 transition-colors hover:text-pearl">
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <Link href="/#contacto" className="text-silver/80 transition-colors hover:text-pearl">
                  Formulario de contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© <CurrentYear fallback={buildYear} /> Faro Solutions. Todos los derechos reservados.</p>
          <p>Desarrollado por el equipo de Faro Solutions.</p>
        </div>
      </Container>
    </footer>
  );
}
