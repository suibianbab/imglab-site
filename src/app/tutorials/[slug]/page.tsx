import { notFound } from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { getAllTutorials, getTutorialBySlug } from '@/lib/data';
import { CTAButton } from '@/components/cta/CTAButton';
import { TutorialViewTracker } from '@/components/tutorials/TutorialViewTracker';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTutorials().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = getTutorialBySlug(slug);
  if (!t) return {};
  return { title: t.title, description: t.excerpt };
}

function loadTutorialContent(slug: string): string {
  const filePath = path.join(process.cwd(), 'src', 'data', 'tutorials', slug, 'content.md');
  return fs.readFileSync(filePath, 'utf-8');
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const t = getTutorialBySlug(slug);
  if (!t) notFound();
  const content = loadTutorialContent(t.slug);

  return (
    <article className="container-page py-12 max-w-3xl">
      <TutorialViewTracker slug={t.slug} />
      <h1 className="text-3xl font-bold text-ink mb-4">{t.title}</h1>
      <div className="prose prose-sm max-w-none mb-12">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className="bg-brand-50 rounded-2xl p-6 text-center">
        <p className="text-sm text-ink mb-4">开始动手练习</p>
        <CTAButton position="tutorial-end" size="lg" href="keys2api">前往 keys2api 实操</CTAButton>
      </div>
    </article>
  );
}
