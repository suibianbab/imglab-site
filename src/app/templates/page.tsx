import type { Metadata } from 'next';
import { getAllTemplates } from '@/lib/data';
import { TemplateCard } from '@/components/templates/TemplateCard';

export const metadata: Metadata = {
  title: 'Prompt 模板库',
  description: '变量化的 GPT-Image-2 Prompt 模板，套上你的产品即可生成。',
};

export default function TemplatesPage() {
  const templates = getAllTemplates();
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-ink mb-2">Prompt 模板库</h1>
      <p className="text-muted mb-8">变量化模板，复制后替换产品名即可使用</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates.map((t) => <TemplateCard key={t.slug} template={t} />)}
      </div>
    </div>
  );
}
