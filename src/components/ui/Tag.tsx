interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'brand';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const cls = variant === 'brand'
    ? 'bg-brand-50 text-brand-700'
    : 'bg-paper text-muted';
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded-md ${cls}`}>
      {children}
    </span>
  );
}
