#!/usr/bin/env node
/**
 * 从 ../repo/landing-data/*.json 同步到 src/data/cases/*.json
 * 从 ../repo/templates/*.json（如有）同步到 src/data/templates/*.json
 * 自动维护 src/data/{cases,templates}/index.json（merge 模式，保留 demo/_example 脚手架条目）
 *
 * 用法：npm run sync:data
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = '..';
const SRC_CASES = join(ROOT, 'repo', 'landing-data');
const SRC_TEMPLATES = join(ROOT, 'repo', 'templates'); // 若 curation pipeline 已产出
const DEST_CASES = join('src', 'data', 'cases');
const DEST_TEMPLATES = join('src', 'data', 'templates');
const DEST_TUTORIALS = join('src', 'data', 'tutorials');

function readIndex(destDir) {
  const idxPath = join(destDir, 'index.json');
  if (!existsSync(idxPath)) return [];
  try {
    return JSON.parse(readFileSync(idxPath, 'utf-8'));
  } catch {
    return [];
  }
}

function writeIndex(destDir, slugs) {
  writeFileSync(join(destDir, 'index.json'), JSON.stringify(slugs, null, 2));
}

function syncOne(srcDir, destDir, label) {
  if (!existsSync(srcDir)) {
    console.log(`[skip] ${srcDir} 不存在（${label} curation pipeline 尚未产出）`);
    return 0;
  }
  let added = 0;
  const before = readIndex(destDir);
  const existing = [...before];
  const slugSet = new Set(existing);
  // 兜底：扫描 dest 目录里的脚手架文件（demo-* / _example-*），确保 index 不丢
  for (const f of readdirSync(destDir)) {
    if (!f.endsWith('.json') || f === 'index.json') continue;
    const slug = f.replace(/\.json$/, '');
    if ((slug.startsWith('demo-') || slug.startsWith('_example')) && !slugSet.has(slug)) {
      slugSet.add(slug);
      existing.push(slug);
    }
  }
  for (const file of readdirSync(srcDir)) {
    if (!file.endsWith('.json')) continue;
    const src = readFileSync(join(srcDir, file), 'utf-8');
    const data = JSON.parse(src);
    const slug = data.slug ?? file.replace(/\.json$/, '');
    // 不覆盖脚手架文件（_example-* / demo-*）
    if (slug.startsWith('_example') || slug.startsWith('demo-')) {
      console.log(`[preserve] ${slug}（脚手架数据，不覆盖）`);
      continue;
    }
    writeFileSync(join(destDir, `${slug}.json`), JSON.stringify(data, null, 2));
    if (!slugSet.has(slug)) {
      slugSet.add(slug);
      existing.push(slug);
    }
    added++;
  }
  // 即便没新增 src，只要兜底扫描有变化也写回
  if (added > 0 || existing.length !== before.length) {
    writeIndex(destDir, existing);
  }
  console.log(`✓ 同步 ${added} 个 ${label}（index.json 现共 ${existing.length} 条）`);
  return added;
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

ensureDir(DEST_CASES);
ensureDir(DEST_TEMPLATES);
ensureDir(DEST_TUTORIALS);

syncOne(SRC_CASES, DEST_CASES, 'cases');
syncOne(SRC_TEMPLATES, DEST_TEMPLATES, 'templates');
console.log('同步完成');
