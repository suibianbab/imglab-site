import type { Case, Template } from './types';
import { brandTerms } from './brand';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://imglab.cn';

export function caseJsonLd(caseData: Case) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: caseData.image_url,
    name: caseData.title,
    description: caseData.prompt_zh,
    creditText: brandTerms.creditText,
    acquireLicensePage: `${SITE_URL}/cases/${caseData.slug}/`,
  };
}

export function templateJsonLd(template: Template) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: template.title,
    thumbnailUrl: template.preview_image,
    url: `${SITE_URL}/templates/${template.slug}/`,
  };
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
