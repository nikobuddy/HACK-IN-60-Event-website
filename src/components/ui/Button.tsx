import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  asChild?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-500/90 to-violet-500/90 text-hack-void font-semibold shadow-glow hover:shadow-lg hover:from-cyan-400 hover:to-violet-400 active:scale-[0.98]",
  secondary:
    "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-cyan-400/30 active:scale-[0.98]",
  ghost: "text-cyan-300/90 hover:text-cyan-200 hover:bg-white/5",
};

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80",
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
