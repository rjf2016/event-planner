import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 ',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/85 border-primary-contrast',
        primaryOutline:
          'bg-background border-primary text-primary hover:bg-slate-100',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary-contrast',
        secondaryOutline:
          'bg-background text-secondary border-secondary hover:bg-slate-100',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/85 border-destructive-contrast',
        destructiveOutline: 'bg-background text-destructive hover:bg-slate-100',
        super:
          'bg-gradient-to-br from-purple-500 to-super text-super-foreground hover:to-super/85 border-super-contrast',
        superOutline: 'bg-background text-super hover:bg-slate-100',
        ghost:
          'bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        rounded: 'rounded-full',
        link: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    const Comp = asChild ? Slot : 'button';
    if (variant === 'link') {
      size = 'link';
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
