"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)] disabled:pointer-events-none disabled:opacity-60 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--color-accent)] text-[color:var(--color-text)] shadow-sm hover:brightness-105",
        outline:
          "border border-[color:var(--color-border)] bg-transparent text-[color:var(--color-text)] hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-soft)]",
        subtle:
          "bg-[color:var(--color-surface)] text-[color:var(--color-text)] shadow-sm hover:bg-[color:var(--color-bg)]",
        ghost:
          "bg-transparent text-[color:var(--color-text)] shadow-none hover:bg-[color:var(--color-surface)]",
        destructive:
          "border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-text)] hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-soft)]",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-6 text-sm",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
