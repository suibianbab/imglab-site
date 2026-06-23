// 与 curation pipeline plan 产出的 repo/landing-data/*.json 对齐
// 详见 spec §4.1

export type Scene = 'ecommerce' | 'xhs' | 'wechat' | 'cross-border';
export type Style = 'minimal' | 'guochao' | 'tech' | 'handdrawn';

export interface Case {
  slug: string;
  title: string;
  scene: Scene;
  industry: string;
  style: Style;
  image_url: string;
  image_alt: string;
  prompt_original: string;
  prompt_zh: string;
  tags: string[];
  related_templates: string[];
  published_at: string;
}

export interface Template {
  slug: string;
  title: string;
  scene: Scene;
  preview_image: string;
  prompt_template: string;
  variables: string[];
  published_at: string;
}

export interface Tutorial {
  slug: string;
  title: string;
  excerpt: string;
  category: 'getting-started' | 'prompt-writing' | 'industry';
  published_at: string;
  // markdown 内容在 [slug]/content.md，构建时读取
}

export interface CaseFilter {
  scene?: Scene | 'all';
  industry?: string | 'all';
  style?: Style | 'all';
  tag?: string | 'all';
}

/**
 * SEO 着陆页（按平台/场景聚合，吃 Google 长尾搜索）
 * 主体 JSX 内容直接写在各 page.tsx 里，这里只放共享元数据
 */
export interface PromptPage {
  slug: string;                // 路由 slug，如 'gpt-image-2-for-amazon'
  platform: 'amazon' | 'tiktok-ads' | 'shopify';
  h1: string;                  // 页面 H1
  metaTitle: string;           // < 60 字符
  metaDescription: string;     // < 160 字符
  heroPain: string;            // Hero 副标题（痛点句）
  caseIds: string[];           // 关联的 Case slug
  faqs: { q: string; a: string }[];  // FAQPage schema
}
