import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'solid' | 'ghost';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'outline',
  children,
  ...props
}) => {
  const base =
    'inline-block font-label text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-none';

  const variants = {
    outline: 'border border-outline-variant/50 text-outline',
    solid: 'bg-primary text-on-primary',
    ghost: 'bg-surface-container-high text-on-surface-variant',
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
