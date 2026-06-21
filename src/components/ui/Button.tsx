import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-600 shadow-md',
  secondary: 'bg-paper text-ink border border-ink/10 hover:border-brand',
  ghost: 'text-brand hover:bg-brand-50',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({ variant = 'primary', size = 'md', className = '', children }: ButtonProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
