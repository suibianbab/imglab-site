import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-ink/5 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className = '' }: CardImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`w-full object-cover aspect-square ${className}`} />;
}
