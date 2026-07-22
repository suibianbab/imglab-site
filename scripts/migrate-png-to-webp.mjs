/**
 * migrate-png-to-webp.mjs - 批量把 public/assets/{id}/v1.png 转 webp，并更新所有 JSON/TSX 引用
 *
 * 目的：EdgeOne Pages 构建盘满（696MB PNG），压缩到 ~150MB WebP。
 *
 * 运行：node scripts/migrate-png-to-webp.mjs
 *
 * 步骤：
 *   1. 遍历 public/assets 下每个 case 目录的 v1.png，用 sharp 转 v1.webp（quality 90），删 v1.png
 *   2. 改 src/data/cases 下的 case JSON 的 image_url
 *   3. 改 src/data/templates 下的 template JSON 的 preview_image
 *   4. 改 src/app/page.tsx 里硬编码的 v1.png 引用
 *   5. 输出统计
 */
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const SITE_ROOT = path.resolve(import.meta.dirname, '..');
const ASSETS_DIR = path.join(SITE_ROOT, 'public', 'assets');
const CASES_DIR = path.join(SITE_ROOT, 'src', 'data', 'cases');
const TEMPLATES_DIR = path.join(SITE_ROOT, 'src', 'data', 'templates');

async function dirExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

// ── Step 1: 转 PNG → WebP ──
console.log('[1/4] 转换 public/assets/*/v1.png → v1.webp ...');
const assetDirs = await fs.readdir(ASSETS_DIR);
let converted = 0;
let skipped = 0;
let failed = 0;
let sizeBefore = 0;
let sizeAfter = 0;

for (const caseId of assetDirs) {
  const dir = path.join(ASSETS_DIR, caseId);
  const stat = await fs.stat(dir).catch(() => null);
  if (!stat || !stat.isDirectory()) continue;

  const png = path.join(dir, 'v1.png');
  const webp = path.join(dir, 'v1.webp');

  // 已转过的（idempotent）
  if (await dirExists(webp)) {
    if (await dirExists(png)) {
      // webp 已存在但 png 没删，补删
      await fs.unlink(png);
    }
    skipped += 1;
    continue;
  }
  if (!(await dirExists(png))) continue;

  try {
    const pngStat = await fs.stat(png);
    sizeBefore += pngStat.size;
    await sharp(png).webp({ quality: 90 }).toFile(webp);
    const webpStat = await fs.stat(webp);
    sizeAfter += webpStat.size;
    await fs.unlink(png);
    converted += 1;
    if (converted % 30 === 0) console.log(`  已转 ${converted} ...`);
  } catch (e) {
    failed += 1;
    console.error(`  ✗ ${caseId}: ${e.message}`);
  }
}

console.log(`  转换完成: ${converted} 张转换，${skipped} 张已转跳过，${failed} 张失败`);
console.log(`  体积: ${(sizeBefore / 1024 / 1024).toFixed(1)}MB → ${(sizeAfter / 1024 / 1024).toFixed(1)}MB`);

// ── Step 2: 改 case JSON image_url ──
console.log('\n[2/4] 更新 src/data/cases/*.json 的 image_url ...');
const caseFiles = (await fs.readdir(CASES_DIR)).filter(f => f.endsWith('.json') && f !== 'index.json');
let casesUpdated = 0;
for (const f of caseFiles) {
  const fp = path.join(CASES_DIR, f);
  const txt = await fs.readFile(fp, 'utf8');
  if (!txt.includes('v1.png')) continue;
  const updated = txt.replace(/v1\.png/g, 'v1.webp');
  await fs.writeFile(fp, updated);
  casesUpdated += 1;
}
console.log(`  更新 ${casesUpdated} 个 case JSON`);

// ── Step 3: 改 template JSON preview_image ──
console.log('\n[3/4] 更新 src/data/templates/*.json 的 preview_image ...');
let templatesUpdated = 0;
if (await dirExists(TEMPLATES_DIR)) {
  const templateFiles = (await fs.readdir(TEMPLATES_DIR)).filter(f => f.endsWith('.json'));
  for (const f of templateFiles) {
    const fp = path.join(TEMPLATES_DIR, f);
    const txt = await fs.readFile(fp, 'utf8');
    if (!txt.includes('v1.png')) continue;
    const updated = txt.replace(/v1\.png/g, 'v1.webp');
    await fs.writeFile(fp, updated);
    templatesUpdated += 1;
  }
}
console.log(`  更新 ${templatesUpdated} 个 template JSON`);

// ── Step 4: 改 src/app/page.tsx 硬编码引用 ──
console.log('\n[4/4] 更新 src/app/page.tsx 硬编码 /assets/.../v1.png ...');
const pagePath = path.join(SITE_ROOT, 'src', 'app', 'page.tsx');
if (await dirExists(pagePath)) {
  const txt = await fs.readFile(pagePath, 'utf8');
  if (txt.includes('v1.png')) {
    const updated = txt.replace(/v1\.png/g, 'v1.webp');
    await fs.writeFile(pagePath, updated);
    console.log('  ✓ page.tsx 已更新');
  } else {
    console.log('  page.tsx 无 v1.png 引用，跳过');
  }
}

console.log('\n=== 完成 ===');
console.log(`下一步: cd site && git add -A && git commit -m "perf(assets): PNG→WebP 压缩，体积 -75%" && git push`);
