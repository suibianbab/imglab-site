import type { Metadata } from 'next';
import '@/styles/globals.css';
import { GA4Script } from '@/components/analytics/GA4Script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { brandTerms } from '@/lib/brand';

export const metadata: Metadata = {
  title: {
    default: `研图社 | ${brandTerms.siteTagline}`,
    template: '%s | 研图社',
  },
  description:
    `研图社精选 ${brandTerms.primaryModel} 营销图片案例与 prompt 模板，覆盖电商主图、小红书、公众号封面、跨境 Listing 等中文营销场景。`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://imglab.cn'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '研图社',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GA4Script />
      </body>
    </html>
  );
}
