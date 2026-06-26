import fs from 'node:fs';
import path from 'node:path';
import casesIndex from '@/data/cases/index.json';
import templatesIndex from '@/data/templates/index.json';
import tutorialsIndex from '@/data/tutorials/index.json';
import type { Case, Template, Tutorial, CaseFilter, Scene } from './types';

// 构建时一次性加载所有 JSON（静态导出，无运行时 IO）
// 用 fs.readFileSync 而非 require/import：避免 ESM 模式下 require 不可用的问题
function loadAll<T>(dir: string, slugs: string[]): T[] {
  const root = path.join(process.cwd(), 'src', 'data', dir);
  return slugs.map((slug) => {
    const filePath = path.join(root, `${slug}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  });
}

let _casesCache: Case[] | null = null;
let _templatesCache: Template[] | null = null;
let _tutorialsCache: Tutorial[] | null = null;

function loadCases(): Case[] {
  if (_casesCache) return _casesCache;
  const all = loadAll<Case>('cases', casesIndex as string[]);
  // 过滤示例数据 + 按 published_at 倒序
  _casesCache = all
    .filter((c) => !c.slug.startsWith('_'))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
  return _casesCache;
}

function loadTemplates(): Template[] {
  if (_templatesCache) return _templatesCache;
  const all = loadAll<Template>('templates', templatesIndex as string[]);
  _templatesCache = all
    .filter((t) => !t.slug.startsWith('_'))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
  return _templatesCache;
}

function loadTutorials(): Tutorial[] {
  if (_tutorialsCache) return _tutorialsCache;
  const all = loadAll<Tutorial>('tutorials', tutorialsIndex as string[]);
  _tutorialsCache = all
    .filter((t) => !t.slug.startsWith('_'))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
  return _tutorialsCache;
}

export function getAllCases(): Case[] {
  return loadCases();
}

export function getCaseBySlug(slug: string): Case | null {
  // 注意：详情页可能查到示例数据（getCaseBySlug 不过滤 _ 前缀）
  const all = loadAll<Case>('cases', casesIndex as string[]);
  return all.find((c) => c.slug === slug) ?? null;
}

export function getAllTemplates(): Template[] {
  return loadTemplates();
}

export function getTemplateBySlug(slug: string): Template | null {
  const all = loadAll<Template>('templates', templatesIndex as string[]);
  return all.find((t) => t.slug === slug) ?? null;
}

export function getAllTutorials(): Tutorial[] {
  return loadTutorials();
}

export function getTutorialBySlug(slug: string): Tutorial | null {
  const all = loadAll<Tutorial>('tutorials', tutorialsIndex as string[]);
  return all.find((t) => t.slug === slug) ?? null;
}

export function filterCases(cases: Case[], filter: CaseFilter): Case[] {
  return cases.filter((c) => {
    if (filter.scene && filter.scene !== 'all' && c.scene !== filter.scene) return false;
    if (filter.industry && filter.industry !== 'all' && c.industry !== filter.industry) return false;
    if (filter.style && filter.style !== 'all' && c.style !== filter.style) return false;
    if (filter.tag && filter.tag !== 'all' && !c.tags.includes(filter.tag)) return false;
    return true;
  });
}

export function getRelatedTemplates(slugs: string[]): Template[] {
  return slugs
    .map((slug) => getTemplateBySlug(slug))
    .filter((t): t is Template => t !== null);
}

// 按 scene 自动匹配模板（用于 case.related_templates 为空时的兜底推荐）
// 让懒得抄 prompt 的用户直接用填空模板
export function getTemplatesByScene(scene: string, limit = 3): Template[] {
  return loadTemplates()
    .filter((t) => t.scene === scene)
    .slice(0, limit);
}

// 聚合选项（给筛选器 UI）
export function getSceneOptions(): { value: Scene | 'all'; label: string }[] {
  return [
    { value: 'all', label: '全部场景' },
    { value: 'ecommerce', label: '电商主图' },
    { value: 'xhs', label: '小红书' },
    { value: 'wechat', label: '公众号封面' },
    { value: 'cross-border', label: '跨境 Listing' },
  ];
}

export function getAllTags(cases: Case[]): string[] {
  const set = new Set<string>();
  cases.forEach((c) => c.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
