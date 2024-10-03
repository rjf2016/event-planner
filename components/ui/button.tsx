import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide select-none',
  {
    variants: {
      variant: {
        default:
          'bg-white text-slate-500 border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 ',
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/85 border-primary-contrast border-b-4 active:border-b-0',
        primaryOutline:
          'bg-background border-primary border-2 border-b-4 text-primary hover:bg-slate-100 active:border-b-2',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary-contrast border-b-4 active:border-b-0',
        secondaryOutline:
          'bg-background text-secondary border-2 border-b-4 border-secondary hover:bg-slate-100 active:border-b-2',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/85 border-destructive-contrast border-b-4 active:border-b-0',
        destructiveOutline: 'bg-background text-destructive hover:bg-slate-100',
        super:
          'bg-gradient-to-br from-purple-500 to-super text-super-foreground hover:to-super/85 border-super-contrast border-b-4 active:border-b-0',
        superOutline: 'bg-background text-super hover:bg-slate-100',
        ghost:
          'bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
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
