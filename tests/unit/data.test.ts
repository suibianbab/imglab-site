import { describe, it, expect } from 'vitest';
import { getAllCases, getCaseBySlug, filterCases, getRelatedTemplates } from '@/lib/data';

describe('getAllCases', () => {
  it('返回所有案例，按 published_at 倒序', () => {
    const cases = getAllCases();
    expect(cases.length).toBeGreaterThan(0);
    for (let i = 1; i < cases.length; i++) {
      expect(cases[i - 1].published_at >= cases[i].published_at).toBe(true);
    }
  });

  it('过滤掉 slug 以 _ 开头的示例数据', () => {
    const cases = getAllCases();
    expect(cases.every((c) => !c.slug.startsWith('_'))).toBe(true);
  });
});

describe('getCaseBySlug', () => {
  it('存在时返回 case', () => {
    const c = getCaseBySlug('_example-ecommerce-skincare');
    expect(c?.title).toContain('示例');
  });

  it('不存在时返回 null', () => {
    expect(getCaseBySlug('non-existent')).toBeNull();
  });
});

describe('filterCases', () => {
  const all = getAllCases();

  it('scene=all 返回全部', () => {
    expect(filterCases(all, { scene: 'all' }).length).toBe(all.length);
  });

  it('按 scene 筛选', () => {
    const filtered = filterCases(all, { scene: 'ecommerce' });
    expect(filtered.every((c) => c.scene === 'ecommerce')).toBe(true);
  });

  it('按 tag 筛选', () => {
    const filtered = filterCases(all, { tag: '美妆' });
    expect(filtered.every((c) => c.tags.includes('美妆'))).toBe(true);
  });
});

describe('getRelatedTemplates', () => {
  it('返回 case.related_templates 对应的 template 对象数组', () => {
    const c = getCaseBySlug('_example-ecommerce-skincare');
    const related = getRelatedTemplates(c?.related_templates ?? []);
    expect(related.length).toBeGreaterThan(0);
  });
});
