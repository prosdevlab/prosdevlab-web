import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600/90 text-white dark:bg-blue-500/80 dark:text-white shadow hover:bg-blue-700",
        secondary:
          "border-transparent bg-amber-500/90 text-amber-950 dark:bg-amber-500/80 dark:text-amber-950 shadow-sm",
        destructive:
          "border-transparent bg-red-600/90 text-white dark:bg-red-500/80 dark:text-white shadow-sm",
        outline: "border-border text-foreground bg-background hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
