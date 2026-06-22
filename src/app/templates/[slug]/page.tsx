import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllTemplates, getTemplateBySlug } from '@/lib/data';
import { templateJsonLd } from '@/lib/seo';
import { Tag } from '@/components/ui/Tag';
import { CTAButton } from '@/components/cta/CTAButton';
import { TemplateViewTracker } from '@/components/templates/TemplateViewTracker';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTemplates().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplateBySlug(slug);
  if (!t) return {};
  return {
    title: t.title,
    description: `变量化 Prompt 模板：${t.prompt_template.slice(0, 100)}`,
    openGraph: {
      title: t.title,
      images: [{ url: t.preview_image }],
    },
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = getTemplateBySlug(slug);
  if (!t) notFound();

  return (
    <article className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templateJsonLd(t)) }}
      />
      <TemplateViewTracker slug={t.slug} />

      <h1 className="text-3xl font-bold text-ink mb-3">{t.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <Tag variant="brand">{t.scene}</Tag>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.preview_image} alt={t.title} className="w-full rounded-2xl shadow-md" />
        </div>
        <div>
          <h2 className="font-medium text-ink mb-2">Prompt 模板</h2>
          <pre className="text-sm text-ink bg-paper p-4 rounded-lg whitespace-pre-wrap mb-4">
{t.prompt_template}
          </pre>
          <div className="text-xs text-muted mb-6">
            变量：{t.variables.map((v) => `{${v}}`).join(' · ')}
          </div>
          <div className="bg-brand-50 rounded-2xl p-6 text-center">
            <p className="text-sm text-ink mb-4">想用这个模板自己生成？</p>
            <CTAButton position="template-detail" size="lg">查看生成方法</CTAButton>
          </div>
        </div>
      </div>
    </article>
  );
}
