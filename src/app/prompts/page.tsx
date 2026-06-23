import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPromptPages } from '@/lib/prompt-pages';
import { brandTerms } from '@/lib/brand';

export const metadata: Metadata = {
  title: `${brandTerms.primaryModel} Prompt 配方中心`,
  description: `按平台分类的 ${brandTerms.primaryModel} Prompt 配方合集，覆盖 Amazon Listing、TikTok Ads、Shopify 独立站等跨境卖家高频场景，附原 Prompt 可直接复制。`,
  alternates: { canonical: '/prompts/' },
};

export const dynamic = 'force-static';

const platformEmojis: Record<string, string> = {
  amazon: '🛒',
  'tiktok-ads': '🎬',
  shopify: '🛍️',
};

export default function PromptsHubPage() {
  const pages = getAllPromptPages();

  return (
    <div className="container-page py-12 max-w-5xl">
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
          {brandTerms.primaryModel} Prompt 配方中心
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          按跨境卖家常用平台分类的 Prompt 配方合集。每个配方都经过真实生成验证，附原 Prompt 可直接复制修改。
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {pages.map((p) => (
          <Link
            key={p.slug}
            href={`/prompts/${p.slug}/`}
            className="block bg-white rounded-2xl p-6 border border-ink/5 hover:border-brand hover:shadow-md transition group"
          >
            <div className="text-3xl mb-4">{platformEmojis[p.platform] ?? '📋'}</div>
            <h2 className="text-lg font-bold text-ink mb-2 group-hover:text-brand">
              {p.h1}
            </h2>
            <p className="text-sm text-muted mb-4 line-clamp-3">{p.heroPain}</p>
            <div className="text-sm text-brand font-medium">
              {p.caseIds.length} 个真实案例 →
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16 bg-paper rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-ink mb-2">不知道选哪个平台？</h2>
        <p className="text-muted mb-6">
          先看完整案例库，按你的产品类型找最像的案例
        </p>
        <Link
          href="/cases/"
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-brand text-white hover:bg-brand-600"
        >
          浏览全部案例库 →
        </Link>
      </section>
    </div>
  );
}
