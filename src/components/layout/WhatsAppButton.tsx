import { Icon } from "@/components/ui/Icon";
import { whatsappUrl } from "@/content/site";

/** Acceso directo flotante a WhatsApp. Solo aparece si se configuró el número. */
export function WhatsAppButton() {
  const href = whatsappUrl();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-full border border-silver/25 bg-graphite/90 text-pearl shadow-[0_12px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-silver/60 sm:right-8 sm:bottom-8"
    >
      <Icon name="whatsapp" className="size-6" />
    </a>
  );
}
