import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
};

export function Section({ id, className, children, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

type HeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, align = "left", className }: HeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>
      <h2 id={id} className="mt-5 text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.85rem]">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-silver/80 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
