import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-label uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed select-none rounded-none';

    const variants = {
      primary:
        'bg-primary text-on-primary hover:bg-primary-container active:bg-primary-fixed border border-primary',
      secondary:
        'bg-transparent text-primary border border-outline-variant/40 hover:border-primary active:bg-surface-container-low',
      tertiary:
        'bg-transparent text-primary editorial-underline hover:opacity-80 active:opacity-60 p-0',
      ghost:
        'bg-transparent text-primary hover:bg-surface-container-low active:bg-surface-container',
    };

    const sizes = {
      sm: 'text-[10px] tracking-[0.15em] px-4 py-2.5',
      md: 'text-xs tracking-[0.2em] px-8 py-4',
      lg: 'text-xs tracking-[0.25em] px-10 py-5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== 'tertiary' && sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
