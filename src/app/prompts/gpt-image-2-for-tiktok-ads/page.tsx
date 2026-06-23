import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCases } from '@/lib/data';
import { tiktokAdsPage } from '@/lib/prompt-pages';
import { CaseCard } from '@/components/cases/CaseCard';
import { PromptPageShell } from '@/components/prompts/PromptPageShell';
import { brandTerms } from '@/lib/brand';

export const metadata: Metadata = {
  title: tiktokAdsPage.metaTitle,
  description: tiktokAdsPage.metaDescription,
  alternates: { canonical: `/prompts/${tiktokAdsPage.slug}/` },
};

export const dynamic = 'force-static';

export default function TikTokAdsPromptPage() {
  const allCases = getAllCases();
  const cases = tiktokAdsPage.caseIds
    .map((id) => allCases.find((c) => c.slug === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <PromptPageShell page={tiktokAdsPage}>
      {/* 痛点段 */}
      <section className="container-page py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink mb-6">TikTok Ads 素材的 3 个常见死法</h2>
        <div className="prose prose-neutral max-w-none text-ink/80 leading-relaxed space-y-4">
          <p>
            <strong>死法 1：CTR 起不来。</strong> TikTok 算法对素材质量极度敏感，CTR 低于 1.5% 直接判死刑
            。但你自己拍的素材画面太"真实"——没有夸张的视觉冲击，没有钩子，前 3 秒就划走。
          </p>
          <p>
            <strong>死法 2：9:16 竖版做不出来。</strong> TikTok 主流尺寸是 1080×1920，外包摄影师习惯拍横版，转竖版裁切丢画面。
            <strong> {brandTerms.primaryModel}</strong> 原生支持 1024×1792 接近 9:16，直接出竖版素材。
          </p>
          <p>
            <strong>死法 3：素材更迭跟不上。</strong> TikTok 算法奖励新鲜度，一条广告组的素材 3-5 天必须换。
            传统摄影节奏根本跟不上，结果就是 CPA 越跑越高。
          </p>
          <p>
            本页整理 8 张专为 TikTok Ads 设计的 {brandTerms.primaryModel} 案例（情感营销、UGC 风格、视觉冲击），下方 4 个 Prompt
            配方对应 4 类高转化钩子模式。
          </p>
        </div>
      </section>

      {/* Prompt 配方段 */}
      <section className="bg-paper py-16">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl font-bold text-ink mb-2">4 类 TikTok Ads 高转化 Prompt 配方</h2>
          <p className="text-muted mb-10">基于 TikTok Creative Center 高 CTR 素材反推的视觉模式</p>

          <div className="space-y-8">
            <RecipeCard
              title="配方 1：超现实视觉冲击（前 3 秒钩子）"
              scene="TikTok 第一帧必须抓眼球。超现实/夸张化的产品展示是高 CTR 的核心模式。"
              prompt={`A surreal, hyper-stylized vertical 9:16 advertising image for {product_name}. The product is hero, surrounded by exaggerated visual elements: {specific_surreal_elements}. Bold vivid colors ({specific_palette}), high-contrast lighting, motion blur suggesting energy, magazine-cover composition with the product occupying 60% of the frame, ultra-sharp focus on the product, soft bokeh background. Style: high-end Nike/adidas commercial, 1024x1792.`}
            />
            <RecipeCard
              title="配方 2：生活方式代入（情感钩子）"
              scene="用户在 TikTok 滑到「和自己像的人」会多看 2-3 秒。生活方式代入型素材 CTR 比产品图高 2-5 倍。"
              prompt={`A relatable lifestyle scene in vertical 9:16 format. A {target_persona_age}-year-old {target_persona_gender} using {product_name} in a {setting} environment, authentic candid expression showing {specific_emotion}, natural smartphone-camera aesthetic (not overly polished), warm color grade matching {mood}, top 250px and bottom 400px kept clean for TikTok UI overlay, 1024x1792.`}
            />
            <RecipeCard
              title="配方 3：大字报式钩子（信息直给）"
              scene="促销型广告首选。大字报式标题直接砸利益点，比 implicitly 暗示转化高。"
              prompt={`A bold promotional vertical 9:16 image for {product_name}. Top third: massive condensed bold headline reading "{attention_grabbing_headline}" in {brand_color}. Center: {product_name} on a contrasting background. Bottom third: three short benefit bullets in clean sans-serif. Style: high-energy direct response advertising, vibrant high-contrast colors, sharp readable typography, 1024x1792.`}
            />
            <RecipeCard
              title="配方 4：UGC 风格（信任钩子）"
              scene="TikTok 用户最反感广告感。UGC 风格（手持感、自然光、第一人称视角）能伪装成原生内容。"
              prompt={`A user-generated content style vertical 9:16 image of {product_name}. Handheld smartphone perspective, first-person POV showing hands holding/using the product, natural imperfect lighting (window light), authentic everyday environment ({specific_room}), no professional styling, slight grain texture, feels like a real customer review photo, 1024x1792.`}
            />
          </div>
        </div>
      </section>

      {/* 案例展示 */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink">{brandTerms.primaryModel} 跑通的 TikTok Ads 类案例</h2>
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
          <h2 className="text-2xl font-bold text-ink mb-8">怎么把这些 Prompt 用起来？</h2>
          <ol className="space-y-6">
            <Step n={1} title="注册 keys2api 拿 API Key">
              访问 <a href={brandTerms.apiProviderRegisterUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">{brandTerms.apiProviderDomain}</a>
              {' '}注册账号，充值 $5 起步，复制 API Key 备用。
            </Step>
            <Step n={2} title="用本页 Prompt 出 5 张测试图">
              复制任一配方，把 <code className="bg-white px-1.5 py-0.5 rounded text-sm">{`{product_name}`}</code> 等变量替换成你的产品参数，跑出 5 张候选图。每张约 $0.04，共 $0.2。
            </Step>
            <Step n={3} title="传到 TikTok Ads 测 CTR">
              新建广告组配 3-5 张图轮测，48 小时看 CTR。CTR &gt; 2% 加预算放大；&lt; 1% 换下一条 Prompt 配方再来一轮。
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
