import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCases } from '@/lib/data';
import { shopifyPage } from '@/lib/prompt-pages';
import { CaseCard } from '@/components/cases/CaseCard';
import { PromptPageShell } from '@/components/prompts/PromptPageShell';
import { brandTerms } from '@/lib/brand';

export const metadata: Metadata = {
  title: shopifyPage.metaTitle,
  description: shopifyPage.metaDescription,
  alternates: { canonical: `/prompts/${shopifyPage.slug}/` },
};

export const dynamic = 'force-static';

export default function ShopifyPromptPage() {
  const allCases = getAllCases();
  const cases = shopifyPage.caseIds
    .map((id) => allCases.find((c) => c.slug === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <PromptPageShell page={shopifyPage}>
      {/* 痛点段 */}
      <section className="container-page py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink mb-6">独立站卖家的视觉系统困境</h2>
        <div className="prose prose-neutral max-w-none text-ink/80 leading-relaxed space-y-4">
          <p>
            做 Shopify 独立站最容易卡住的不是选品、不是引流，是
            <strong>视觉系统搭不起来</strong>。首页 Hero、产品集合页 Banner、品牌故事页、节日 Landing
            ，每一个都要图，每张图外包 $100-500，一套下来 $2000+。冷启动阶段根本扛不住。
          </p>
          <p>
            更大的问题是<strong>品牌一致性</strong>。不同设计师、不同摄影师做出来的图风格发散，独立站看起来像拼凑出来的
            ，转化率直接腰斩。<strong>{brandTerms.primaryModel}</strong> 的好处是：同一套 Prompt 框架只换产品参数，
            出来的图天然视觉统一。
          </p>
          <p>
            本页整理 7 张适合 Shopify 视觉系统的 {brandTerms.primaryModel} 案例（高端品牌、限量发布、体育营销等），下方 4 个
            Prompt 配方覆盖独立站最核心的 4 类图片需求。
          </p>
        </div>
      </section>

      {/* Prompt 配方段 */}
      <section className="bg-paper py-16">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl font-bold text-ink mb-2">4 类 Shopify 核心图 Prompt 配方</h2>
          <p className="text-muted mb-10">每个配方都是品牌化模板，换产品不换风格</p>

          <div className="space-y-8">
            <RecipeCard
              title="配方 1：首页 Hero Banner"
              scene="首页第一眼决定用户留存。Hero Banner 要传递品牌定位 + 核心产品 + 情绪。"
              prompt={`A cinematic brand hero banner for {brand_name}, horizontal 16:9 composition. Center: {hero_product} on a {background_texture} surface with dramatic side lighting. Background: oversized cropped typography bleeding off-frame, letters in {brand_color_hex} with embossed texture. Foreground: subtle fog and sparkle elements. Style: high-end fashion magazine, Apple commercial aesthetic, sharp focus on product, shallow depth of field on background, 1792x1024.`}
            />
            <RecipeCard
              title="配方 2：产品集合页 Banner（长条）"
              scene="产品分类页顶部的长条 Banner，要把整个品类的氛围浓缩在一张图里。"
              prompt={`A wide panoramic banner for {category_name} product collection, ultra-wide 3:1 horizontal composition. Show 3-5 representative products from {category_name} arranged in a styled flat-lay or floating composition against a {brand_color_hex} gradient background. Soft even studio lighting, minimalist layout with plenty of negative space, top-down or 45-degree angle, premium catalog aesthetic, 1792x1024.`}
            />
            <RecipeCard
              title="配方 3：品牌故事页图"
              scene="About Us / Brand Story 页面用图，传递品牌起源、原料溯源、创始人故事等情感内容。"
              prompt={`A cinematic brand storytelling image for {brand_name}'s About page. Scene: {founder_or_origin_story_moment} in a {specific_location} setting, warm natural light, shallow depth of field with subject in focus, authentic documentary photography style (not overly polished), mood: {specific_mood}, color palette grounded in earth tones matching brand identity, 1024x1024.`}
            />
            <RecipeCard
              title="配方 4：季节性 Landing 图（节日促销）"
              scene="Black Friday / 双 11 / 圣诞 / 情人节 等节日 Landing 页主视觉，要带强烈时令符号。"
              prompt={`A seasonal promotional hero image for {brand_name}'s {festival_name} campaign. Visual elements: {festival_specific_symbols} integrated with {hero_product}. Color palette: {festival_palette} with brand accent ({brand_color_hex}). Composition: product center-stage, festival elements framing the edges, optional large promotional text placeholder at top "{promo_hook}". Style: high-end retail holiday campaign, dramatic lighting, 1792x1024.`}
            />
          </div>
        </div>
      </section>

      {/* 案例展示 */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink">{brandTerms.primaryModel} 跑通的品牌化案例</h2>
            <p className="text-sm text-muted mt-1">真实生成图 + 原 Prompt，点击查看大图和完整 Prompt</p>
          </div>
          <Link href="/cases/?scene=cross-border" className="text-brand text-sm hover:underline">
            全部跨境案例 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cases.map((c) => (
            <CaseCard key={c.slug} caseData={c} />
          ))}
        </div>
      </section>

      {/* 使用步骤 */}
      <section className="bg-paper py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold text-ink mb-8">怎么搭一套 Shopify 视觉系统？</h2>
          <ol className="space-y-6">
            <Step n={1} title="注册 keys2api 拿 API Key">
              访问 <a href={brandTerms.apiProviderRegisterUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">{brandTerms.apiProviderDomain}</a>
              {' '}注册账号，充值 $10-20 够用一个月全套图。
            </Step>
            <Step n={2} title="用本页配方搭品牌色板和字体气质">
              选 1 个最贴近你品牌的配方（高端/简约/活力等），把 <code className="bg-white px-1.5 py-0.5 rounded text-sm">{`{brand_color_hex}`}</code> 锁死成你的品牌色（具体色值），后续所有图都用同一套 prompt 框架换产品。
            </Step>
            <Step n={3} title="批量出图 + 上传 Shopify">
              一次跑 10-20 张候选，挑 3-5 张精品上传到 Shopify 后台，用自带裁切工具适配 Dawn / Impulse 等主题尺寸。
            </Step>
          </ol>
          <div className="mt-10 text-center">
            <Link
              href="/start/"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg border border-ink/10 text-ink hover:border-brand"
            >
              不太懂？看完整新手指南 →
            </Link>
          </div>
        </div>
      </section>
    </PromptPageShell>
  );
}

function RecipeCard({ title, scene, prompt }: { title: string; scene: string; prompt: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-ink/5">
      <h3 className="text-lg font-bold text-ink mb-2">{title}</h3>
      <p className="text-sm text-muted mb-4 leading-relaxed">{scene}</p>
      <pre className="bg-paper rounded-lg p-4 text-xs text-ink/80 whitespace-pre-wrap break-words font-mono leading-relaxed">
{prompt}
      </pre>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
        {n}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="font-bold text-ink mb-1">{title}</h3>
        <div className="text-sm text-muted leading-relaxed">{children}</div>
      </div>
    </li>
  );
}
