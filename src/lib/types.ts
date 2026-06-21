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
