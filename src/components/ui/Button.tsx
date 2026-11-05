import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-pearl text-obsidian hover:bg-white hover:shadow-[0_0_0_6px_rgb(248_250_252/0.08),0_12px_40px_-12px_rgb(248_250_252/0.45)]",
  secondary: "border border-silver/25 bg-white/[0.02] text-pearl hover:border-silver/60 hover:bg-white/[0.06]",
  ghost: "text-silver hover:text-pearl",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

type Common = {
  variant?: Variant;
  size?: keyof typeof sizes;
  icon?: IconName;
  children: ReactNode;
  className?: string;
};

function Content({ icon, children }: Pick<Common, "icon" | "children">) {
  return (
    <>
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Content icon={icon}>{children}</Content>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Content icon={icon}>{children}</Content>
    </button>
  );
}
