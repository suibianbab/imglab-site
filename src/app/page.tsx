import Link from 'next/link';
import { getAllCases, getAllTemplates } from '@/lib/data';
import { CaseCard } from '@/components/cases/CaseCard';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { CTAButton } from '@/components/cta/CTAButton';
import { brandTerms } from '@/lib/brand';
import { promptPages } from '@/lib/prompt-pages';

const platformCards = [
  { slug: 'gpt-image-2-for-amazon', label: 'Amazon', desc: '主图副图 + A+ 内容图', emoji: '🛒' },
  { slug: 'gpt-image-2-for-tiktok-ads', label: 'TikTok Ads', desc: '9:16 竖版高转化素材', emoji: '🎬' },
  { slug: 'gpt-image-2-for-shopify', label: 'Shopify', desc: 'Hero Banner + 品牌视觉系统', emoji: '🛍️' },
] as const;

const sceneEntries = [
  { scene: 'ecommerce', label: '电商主图', desc: '淘宝 / 京东 / 拼多多 详情页与主图', image: '/assets/evolinkai-006/v1.png' },
  { scene: 'xhs', label: '小红书', desc: '种草图 / 笔记封面 / 大字报', image: '/assets/evolinkai-043/v1.png' },
  { scene: 'wechat', label: '公众号封面', desc: '公众号头图 / 文章配图', image: '/assets/evolinkai-028/v1.png' },
  { scene: 'cross-border', label: '跨境 Listing', desc: 'Amazon / Shopify / 独立站', image: '/assets/evolinkai-014/v1.png' },
] as const;

export default function HomePage() {
  const cases = getAllCases();
  const featured = cases.slice(0, 8);
  const templates = getAllTemplates().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-paper">
        <div className="container-page py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-ink mb-4">
            {brandTerms.primaryModel}<br />实战案例库 + Prompt 模板
          </h1>
          <p className="text-base md:text-lg text-muted mb-8 max-w-2xl mx-auto">
            精选电商主图、跨境 Listing、小红书、公众号、品牌视觉、自媒体配图等场景的 AI 图片案例与 Prompt。
            所有图片 100% 由 {brandTerms.primaryModel} 自跑生成，实测可复现。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton position="hero" size="lg">如何自己生成？</CTAButton>
            <Link
              href="/cases/"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg border border-ink/10 text-ink hover:border-brand"
            >
              浏览案例库
            </Link>
          </div>
        </div>
      </section>

      {/* 精选案例 */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink">精选案例</h2>
            <p className="text-sm text-muted mt-1">真实场景的 {brandTerms.primaryModel} 生成图与原 Prompt</p>
          </div>
          <Link href="/cases/" className="text-sm text-brand">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((c) => (
            <CaseCard key={c.slug} caseData={c} />
          ))}
        </div>
      </section>

      {/* 场景分类入口 */}
      <section className="bg-paper py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink mb-8 text-center">按场景浏览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sceneEntries.map((entry) => (
              <Link
                key={entry.scene}
                href={`/cases/?scene=${entry.scene}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.image}
                  alt={entry.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="font-medium text-lg mb-1">{entry.label}</div>
                  <div className="text-xs text-white/80">{entry.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 平台专用 Prompt 入口（SEO 着陆页矩阵） */}
      <section className="container-page py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-ink mb-2">按平台专用 Prompt 配方</h2>
          <p className="text-sm text-muted">跨境卖家高频场景的深度指南 + 真实案例</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platformCards.map((card) => {
            const page = promptPages.find((p) => p.slug === card.slug);
            return (
              <Link
                key={card.slug}
                href={`/prompts/${card.slug}/`}
                className="block bg-white rounded-2xl p-6 border border-ink/5 hover:border-brand hover:shadow-md transition group"
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <div className="font-bold text-ink mb-1 group-hover:text-brand">{card.label}</div>
                <div className="text-sm text-muted mb-3">{card.desc}</div>
                <div className="text-xs text-brand">
                  {page?.caseIds.length ?? 0} 个真实案例 →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 模板速览 */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink">Prompt 模板速览</h2>
            <p className="text-sm text-muted mt-1">变量化模板，套上你的产品就能用</p>
          </div>
          <Link href="/templates/" className="text-sm text-brand">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
      </section>
    </>
  );
}
