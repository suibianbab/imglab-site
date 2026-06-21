'use client';

import { ReactNode } from 'react';
import { trackCTA, type CTAPosition } from '@/lib/analytics';

const CTA_URL = process.env.NEXT_PUBLIC_CTA_URL ?? 'https://keys2api.com/register?ref=imglab';

interface CTAButtonProps {
  position: CTAPosition;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
}

const variantClasses = {
  primary: 'bg-brand text-white hover:bg-brand-600 shadow-md',
  secondary: 'bg-paper text-ink border border-ink/10 hover:border-brand',
  ghost: 'text-brand hover:bg-brand-50',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function CTAButton({
  position,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: CTAButtonProps) {
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-position={position}
      onClick={() => trackCTA(position, CTA_URL)}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </a>
  );
}
