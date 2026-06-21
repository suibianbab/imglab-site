import type { MetadataRoute } from 'next';
import { getAllCases, getAllTemplates, getAllTutorials } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://imglab.cn';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/cases/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/templates/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/tutorials/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const casePages: MetadataRoute.Sitemap = getAllCases().map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}/`,
    lastModified: new Date(c.published_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const templatePages: MetadataRoute.Sitemap = getAllTemplates().map((t) => ({
    url: `${SITE_URL}/templates/${t.slug}/`,
    lastModified: new Date(t.published_at),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const tutorialPages: MetadataRoute.Sitemap = getAllTutorials().map((t) => ({
    url: `${SITE_URL}/tutorials/${t.slug}/`,
    lastModified: new Date(t.published_at),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...casePages, ...templatePages, ...tutorialPages];
}
