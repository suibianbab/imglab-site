'use client';

import { ReactNode } from 'react';
import { trackCTA, type CTAPosition } from '@/lib/analytics';
import { brandTerms } from '@/lib/brand';

// 默认跳站内过渡页 /start/（解释 imglab.cn 与 API 供应商关系后再引导注册）
// 需要直跳外部（如教程页末尾已铺垫过）传 href="register" 覆盖
const DEFAULT_HREF = '/start/';

interface CTAButtonProps {
  position: CTAPosition;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** 默认跳 /start/ 过渡页；传 'register' 直跳注册页；传完整 URL 自定义 */
  href?: 'register' | string;
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
  href,
  children,
}: CTAButtonProps) {
  const isExternal = href === 'register' || (typeof href === 'string' && href.startsWith('http'));
  const targetHref = href === 'register' ? brandTerms.apiProviderRegisterUrl : (href ?? DEFAULT_HREF);
  return (
    <a
      href={targetHref}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-cta-position={position}
      onClick={() => trackCTA(position, targetHref)}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </a>
  );
}
