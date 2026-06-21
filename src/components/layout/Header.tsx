import Link from 'next/link';
import { CTAButton } from '@/components/cta/CTAButton';

const navItems = [
  { href: '/cases/', label: '案例库' },
  { href: '/templates/', label: '模板库' },
  { href: '/tutorials/', label: '教程' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ink/5">
      <div className="container-page flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 text-ink hover:text-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg" alt="研图社" className="w-7 h-7" />
          <span className="font-bold text-lg">研图社</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <CTAButton position="nav" size="sm">免费试用</CTAButton>
      </div>
    </header>
  );
}
