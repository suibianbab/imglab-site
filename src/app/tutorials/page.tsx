import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTutorials } from '@/lib/data';

export const metadata: Metadata = {
  title: '教程',
  description: 'GPT-Image-2 入门与中文营销场景实战教程。',
};

const categoryLabels = {
  'getting-started': '入门',
  'prompt-writing': 'Prompt 写作',
  'industry': '行业实战',
} as const;

export default function TutorialsPage() {
  const tutorials = getAllTutorials();
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-ink mb-8">教程</h1>
      <div className="space-y-4">
        {tutorials.map((tut) => (
          <Link
            key={tut.slug}
            href={`/tutorials/${tut.slug}/`}
            className="block bg-white rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-xs text-brand mb-1">{categoryLabels[tut.category]}</div>
            <h2 className="text-lg font-medium text-ink mb-1">{tut.title}</h2>
            <p className="text-sm text-muted">{tut.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
