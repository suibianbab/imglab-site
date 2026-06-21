import Link from 'next/link';
import { getAllCases, getAllTemplates } from '@/lib/data';
import { CaseCard } from '@/components/cases/CaseCard';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { CTAButton } from '@/components/cta/CTAButton';

const sceneEntries = [
  { scene: 'ecommerce', label: '电商主图', desc: '淘宝 / 京东 / 拼多多 详情页与主图', image: '/assets/evolinkai-006/v1.png' },
  { scene: 'xhs', label: '小红书', desc: '种草图 / 笔记封面 / 大字报', image: '/assets/evolinkai-043/v1.png' },
  { scene: 'wechat', label: '公众号封面', desc: '公众号头图 / 文章配图', image: '/assets/evolinkai-028/v1.png' },
  { scene: 'cross-border', label: '跨境 Listing', desc: 'Amazon / Shopify / 独立站', image: '/assets/evolinkai-014/v1.png' },
] as const;

export default function HomePage() {
  const cases = getAllCases();
  const featured = cases.slice(0, 8);
  const rest = cases.slice(8);
  const templates = getAllTemplates().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-paper">
        <div className="container-page py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-ink mb-4">
            GPT-Image-2 中文营销<br />图片生成案例库
          </h1>
          <p className="text-base md:text-lg text-muted mb-8 max-w-2xl mx-auto">
            精选电商主图、小红书、公众号封面、跨境 Listing 等场景的 AI 图片案例与 Prompt 模板。
            所有图片 100% 由 GPT-Image-2 自跑生成，保留原 Prompt 思想。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton position="hero" size="lg">免费试用 GPT-Image-2</CTAButton>
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
            <p className="text-sm text-muted mt-1">真实场景的 GPT-Image-2 生成图与原 Prompt</p>
          </div>
          <Link href="/cases/" className="text-sm text-brand">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((c) => (
            <CaseCard key={c.slug} caseData={c} />
          ))}
        </div>
        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rest.map((c) => (
              <CaseCard key={c.slug} caseData={c} />
            ))}
          </div>
        )}
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
