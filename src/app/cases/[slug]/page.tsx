import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCases, getCaseBySlug, getRelatedTemplates } from '@/lib/data';
import { caseJsonLd } from '@/lib/seo';
import { Tag } from '@/components/ui/Tag';
import { CTAButton } from '@/components/cta/CTAButton';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { CaseViewTracker } from '@/components/cases/CaseViewTracker';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) return {};
  return {
    title: caseData.title,
    description: caseData.prompt_zh.slice(0, 100),
    openGraph: {
      title: caseData.title,
      description: caseData.prompt_zh,
      images: [{ url: caseData.image_url, alt: caseData.image_alt }],
      type: 'article',
    },
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) notFound();

  const related = getRelatedTemplates(caseData.related_templates);

  return (
    <article className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd(caseData)) }}
      />
      <CaseViewTracker slug={caseData.slug} scene={caseData.scene} industry={caseData.industry} />

      <h1 className="text-3xl font-bold text-ink mb-3">{caseData.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <Tag variant="brand">{caseData.scene}</Tag>
        {caseData.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={caseData.image_url}
            alt={caseData.image_alt}
            className="w-full rounded-2xl shadow-md"
          />
        </div>
        <div>
          <h2 className="font-medium text-ink mb-2">中文 Prompt</h2>
          <p className="text-sm text-muted bg-paper p-4 rounded-lg mb-6">{caseData.prompt_zh}</p>

          <details className="mb-6">
            <summary className="cursor-pointer text-sm text-brand">查看英文原 Prompt（保味自跑用）</summary>
            <pre className="text-xs text-muted bg-paper p-4 rounded-lg mt-2 whitespace-pre-wrap">
{caseData.prompt_original}
            </pre>
          </details>

          <div className="bg-brand-50 rounded-2xl p-6 text-center">
            <p className="text-sm text-ink mb-4">想用这个 Prompt 自己生成一张？</p>
            <CTAButton position="case-detail" size="lg">查看生成方法</CTAButton>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-ink mb-4">相关模板</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((t) => <TemplateCard key={t.slug} template={t} />)}
          </div>
        </section>
      )}
    </article>
  );
}

