'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Case, CaseFilter as CaseFilterType, Scene } from '@/lib/types';
import { trackFilterUse } from '@/lib/analytics';

interface Props {
  cases: Case[];
}

// 场景选项（与 data.ts 中 getSceneOptions 对齐，此处内联避免 'use client' 组件间接引入 node:fs）
const sceneOptions: { value: Scene | 'all'; label: string }[] = [
  { value: 'all', label: '全部场景' },
  { value: 'ecommerce', label: '电商主图' },
  { value: 'xhs', label: '小红书' },
  { value: 'wechat', label: '公众号封面' },
  { value: 'cross-border', label: '跨境 Listing' },
];

function collectAllTags(cases: Case[]): string[] {
  const set = new Set<string>();
  cases.forEach((c) => c.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function CaseFilter({ cases }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<CaseFilterType>({
    scene: (searchParams.get('scene') as CaseFilterType['scene']) ?? 'all',
    tag: 'all',
  });

  const tagOptions = collectAllTags(cases);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (filter.scene && filter.scene !== 'all' && c.scene !== filter.scene) return false;
      if (filter.tag && filter.tag !== 'all' && !c.tags.includes(filter.tag)) return false;
      return true;
    });
  }, [cases, filter]);

  function updateFilter(key: keyof CaseFilterType, value: string) {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
    trackFilterUse(key, value);
    if (key === 'scene' && value !== 'all') {
      router.replace(`/cases/?scene=${value}`);
    }
  }

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
        <select
          value={filter.tag}
          onChange={(e) => updateFilter('tag', e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-ink/10 bg-white text-sm"
        >
          <option value="all">全部标签</option>
          {tagOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <span className="text-sm text-muted self-center">{filtered.length} 个案例</span>
      </div>
      <CaseGrid cases={filtered} />
    </>
  );
}

import { CaseCard } from './CaseCard';

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
