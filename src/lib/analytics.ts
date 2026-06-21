// GA4 事件触发（构建时若 NEXT_PUBLIC_GA4_ID 为空，事件不发送但不报错）

export type CTAPosition =
  | 'hero'
  | 'case-card'
  | 'case-detail'
  | 'template-detail'
  | 'tutorial-end'
  | 'nav'
  | 'footer';

interface GtagWindow extends Window {
  gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
}

export function trackCTA(position: CTAPosition, targetUrl: string): void {
  if (typeof window === 'undefined') return;
  const w = window as GtagWindow;
  if (!w.gtag) return;
  w.gtag('event', 'cta_click', {
    position,
    target_url: targetUrl,
  });
}

export function trackCaseView(slug: string, scene: string, industry: string): void {
  const w = typeof window !== 'undefined' ? (window as GtagWindow) : undefined;
  if (!w?.gtag) return;
  w.gtag('event', 'case_view', { slug, scene, industry });
}

export function trackTemplateView(slug: string): void {
  const w = typeof window !== 'undefined' ? (window as GtagWindow) : undefined;
  if (!w?.gtag) return;
  w.gtag('event', 'template_view', { slug });
}

export function trackTutorialView(slug: string): void {
  const w = typeof window !== 'undefined' ? (window as GtagWindow) : undefined;
  if (!w?.gtag) return;
  w.gtag('event', 'tutorial_view', { slug });
}

export function trackFilterUse(filterType: string, filterValue: string): void {
  const w = typeof window !== 'undefined' ? (window as GtagWindow) : undefined;
  if (!w?.gtag) return;
  w.gtag('event', 'filter_use', { filter_type: filterType, filter_value: filterValue });
}
