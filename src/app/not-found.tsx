import type { Metadata } from "next";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-5 pt-18 text-center">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,black,transparent_65%)]" />
      <div>
        <LogoMark withBeam className="mx-auto h-20 w-auto translate-x-[14%] opacity-80" />
        <p className="eyebrow mt-10 justify-center">Error 404</p>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Esta página no existe</h1>
        <p className="mx-auto mt-4 max-w-md text-silver/75">
          Es posible que el enlace esté desactualizado o que la dirección se haya escrito de forma incorrecta.
        </p>
        <ButtonLink href="/" icon="arrowRight" className="mt-10">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
