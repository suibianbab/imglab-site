'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Case, CaseFilter as CaseFilterType, Scene } from '@/lib/types';
import { trackFilterUse } from '@/lib/analytics';
import { CaseCard } from './CaseCard';

interface Props {
  cases: Case[];
}

const PAGE_SIZE = 24;

// 场景选项（与 data.ts 中 getSceneOptions 对齐，此处内联避免 'use client' 组件间接引入 node:fs）
const sceneOptions: { value: Scene | 'all'; label: string }[] = [
  { value: 'all', label: '全部场景' },
  { value: 'ecommerce', label: '电商主图' },
  { value: 'xhs', label: '小红书' },
  { value: 'wechat', label: '公众号封面' },
  { value: 'cross-border', label: '跨境 Listing' },
];

export function CaseFilter({ cases }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<CaseFilterType>({
    scene: (searchParams.get('scene') as CaseFilterType['scene']) ?? 'all',
    tag: 'all',
  });
  const [page, setPageState] = useState<number>(() => {
    const p = Number.parseInt(searchParams.get('page') ?? '1', 10);
    return Number.isFinite(p) && p > 0 ? p : 1;
  });

  // 同步 query：scene / page 改动后写入 URL（可分享、可前进后退）
  function syncUrl(next: { scene?: string; page?: number }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.scene !== undefined) {
      if (next.scene !== 'all') params.set('scene', next.scene);
      else params.delete('scene');
    }
    if (next.page !== undefined) {
      if (next.page > 1) params.set('page', String(next.page));
      else params.delete('page');
    }
    const qs = params.toString();
    router.replace(qs ? `/cases/?${qs}` : '/cases/', { scroll: false });
  }

  function updateFilter(key: keyof CaseFilterType, value: string) {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
    setPageState(1); // 切换场景时回到第一页
    trackFilterUse(key, value);
    syncUrl({ scene: newFilter.scene, page: 1 });
  }

  function setPage(next: number) {
    setPageState(next);
    syncUrl({ scene: filter.scene, page: next });
    // 翻页滚到列表顶部
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // 浏览器前进/后退时跟随 URL
  useEffect(() => {
    const scene = searchParams.get('scene') ?? 'all';
    const p = Number.parseInt(searchParams.get('page') ?? '1', 10);
    setFilter((f) => ({ ...f, scene: scene as CaseFilterType['scene'] }));
    setPageState(Number.isFinite(p) && p > 0 ? p : 1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (filter.scene && filter.scene !== 'all' && c.scene !== filter.scene) return false;
      return true;
    });
  }, [cases, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={filter.scene}
          onChange={(e) => updateFilter('scene', e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-ink/10 bg-white text-sm"
        >
          {sceneOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="text-sm text-muted self-center">{filtered.length} 个案例 · 第 {currentPage}/{totalPages} 页</span>
      </div>
      <CaseGrid cases={paged} />
      {totalPages > 1 && (
        <Pagination current={currentPage} total={totalPages} onChange={setPage} />
      )}
    </>
  );
}

function CaseGrid({ cases }: { cases: Case[] }) {
  if (cases.length === 0) {
    return <div className="text-center text-muted py-12">暂无符合条件的案例</div>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cases.map((c) => (
        <CaseCard key={c.slug} caseData={c} />
      ))}
    </div>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  // 简单窗口：始终显示首尾 + 当前±1
  const pages: (number | '...')[] = [];
  const push = (n: number | '...') => {
    if (pages[pages.length - 1] !== n) pages.push(n);
  };
  push(1);
  if (current - 1 > 2) push('...');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) push(p);
  if (current + 1 < total - 1) push('...');
  if (total > 1) push(total);

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="分页">
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
        className="px-3 py-1.5 rounded-lg border border-ink/10 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand"
      >
        上一页
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="px-2 text-muted text-sm">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`min-w-[2.25rem] px-2 py-1.5 rounded-lg border text-sm ${
              p === current
                ? 'bg-brand text-white border-brand'
                : 'border-ink/10 hover:border-brand'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        disabled={current >= total}
        onClick={() => onChange(current + 1)}
        className="px-3 py-1.5 rounded-lg border border-ink/10 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand"
      >
        下一页
      </button>
    </nav>
  );
}
