import Link from 'next/link';
import { ReactNode } from 'react';
import type { PromptPage } from '@/lib/types';
import { CTAButton } from '@/components/cta/CTAButton';
import { brandTerms } from '@/lib/brand';
import { promptPages } from '@/lib/prompt-pages';

const platformLabels: Record<PromptPage['platform'], string> = {
  amazon: 'Amazon',
  'tiktok-ads': 'TikTok Ads',
  shopify: 'Shopify',
};

/**
 * SEO 着陆页共享 layout：Hero + 主体（children）+ 交叉链接 + FAQ schema
 */
export function PromptPageShell({
  page,
  children,
}: {
  page: PromptPage;
  children: ReactNode;
}) {
  const others = promptPages.filter((p) => p.slug !== page.slug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-paper">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white border border-brand/20 rounded-full text-sm text-brand font-medium mb-4">
              {platformLabels[page.platform]} · {brandTerms.primaryModel} Prompt 配方
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-ink mb-4 leading-tight">
              {page.h1}
            </h1>
            <p className="text-base md:text-lg text-muted mb-8">{page.heroPain}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton position="prompt-page" size="lg" href="register">
                立刻生成一张试试
              </CTAButton>
              <Link
                href="/cases/?scene=cross-border"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg border border-ink/10 text-ink hover:border-brand"
              >
                浏览全部跨境案例
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 主体 */}
      {children}

      {/* 交叉链接其他平台页 */}
      <section className="bg-paper py-16">
        <div className="container-page max-w-5xl">
          <h2 className="text-2xl font-bold text-ink mb-2">其他平台 Prompt 配方</h2>
          <p className="text-muted mb-8">跨境卖家常用的另外两个平台</p>
          <div className="grid md:grid-cols-2 gap-4">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/prompts/${p.slug}/`}
                className="block bg-white rounded-2xl p-6 border border-ink/5 hover:border-brand hover:shadow-md transition"
              >
                <div className="text-sm text-brand font-medium mb-2">
                  {platformLabels[p.platform]}
                </div>
                <div className="text-lg font-bold text-ink mb-2">{p.h1}</div>
                <div className="text-sm text-muted line-clamp-2">{p.heroPain}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink mb-8">常见问题</h2>
        <div className="space-y-6">
          {page.faqs.map((f) => (
            <div key={f.q} className="bg-paper rounded-xl p-6">
              <h3 className="font-bold text-ink mb-2">{f.q}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQPage schema for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
