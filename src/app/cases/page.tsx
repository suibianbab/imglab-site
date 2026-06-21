import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllCases } from '@/lib/data';
import { CaseFilter } from '@/components/cases/CaseFilter';

export const metadata: Metadata = {
  title: '精选案例库',
  description: '浏览 GPT-Image-2 生成的电商主图、小红书、公众号封面、跨境 Listing 等场景的精选案例。',
};

export default function CasesPage() {
  const cases = getAllCases();
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-ink mb-2">精选案例库</h1>
      <p className="text-muted mb-8">真实营销场景的 AI 生成图与原 Prompt</p>
      <Suspense fallback={<div className="text-muted">加载筛选器...</div>}>
        <CaseFilter cases={cases} />
      </Suspense>
    </div>
  );
}
