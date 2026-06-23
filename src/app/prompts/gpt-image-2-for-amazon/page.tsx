import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCases } from '@/lib/data';
import { amazonPage } from '@/lib/prompt-pages';
import { CaseCard } from '@/components/cases/CaseCard';
import { PromptPageShell } from '@/components/prompts/PromptPageShell';
import { brandTerms } from '@/lib/brand';

export const metadata: Metadata = {
  title: amazonPage.metaTitle,
  description: amazonPage.metaDescription,
  alternates: { canonical: `/prompts/${amazonPage.slug}/` },
};

export const dynamic = 'force-static';

export default function AmazonPromptPage() {
  const allCases = getAllCases();
  const cases = amazonPage.caseIds
    .map((id) => allCases.find((c) => c.slug === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <PromptPageShell page={amazonPage}>
      {/* 痛点段 */}
      <section className="container-page py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink mb-6">跨境卖家的图片痛点</h2>
        <div className="prose prose-neutral max-w-none text-ink/80 leading-relaxed space-y-4">
          <p>
            做 Amazon Listing 最磨人的不是选品、不是文案，是
            <strong>配齐一套能打的图</strong>。主图要白底无文字（Amazon 强制规范），副图 6 张要覆盖卖点/场景/对比/生活方式/A+ 内容
            ，外包摄影师一张图报价 $50-200，一条 Listing 配齐就是 $500-1500，且来回沟通至少 2 周。
          </p>
          <p>
            <strong>{brandTerms.primaryModel}</strong> 把这个成本和周期压到了原来的 1%。一张图通过 {brandTerms.apiProviderDomain} 跑出来约{' '}
            <strong>$0.02-0.04</strong>，30 秒出图。问题是大多数卖家不知道
            <strong> prompt 怎么写</strong>才能让 AI 出符合 Amazon 规范的图。
          </p>
          <p>
            本页整理了 8 张 {brandTerms.primaryModel} 跑通的 Amazon 类目案例（手表、食品、3C、鞋履等），每张都附原 Prompt
            可直接复制修改。下方「Prompt 配方」段给出 4 类高频场景的结构化写法，「案例展示」段是真实跑出来的成果。
          </p>
        </div>
      </section>

      {/* Prompt 配方段 */}
      <section className="bg-paper py-16">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl font-bold text-ink mb-2">4 类高频 Amazon 图 Prompt 配方</h2>
          <p className="text-muted mb-10">复制后把 {`{变量}`} 替换成你的产品参数即可</p>

          <div className="space-y-8">
            <RecipeCard
              title="配方 1：白底主图（过审必备）"
              scene="Amazon 主图必须是纯白底（RGB 255/255/255），产品居中占图 85%，无文字无水印无 logo。"
              prompt={`A single {product_name} centered on a pure white background (RGB 255/255/255), product filling 85% of the frame, sharp focus on the product, soft even studio lighting from top-left, no shadows on the background, no text no watermark no logo, ultra-clean commercial product photography, 1024x1024.`}
            />
            <RecipeCard
              title="配方 2：场景生活方式副图"
              scene="副图第 2-3 张建议展示产品在使用场景中的样子，提升点击率和转化率。"
              prompt={`A lifestyle scene showing {product_name} in use by a {target_user} in a {setting} environment, natural daylight, shallow depth of field with focus on the product, authentic candid moment (not posed), color palette matching the product's brand identity, editorial commercial photography style, 1024x1024.`}
            />
            <RecipeCard
              title="配方 3：信息图副图（卖点对比）"
              scene="副图第 4-5 张用信息图展示产品卖点、尺寸、材质对比，是 Amazon 高转化 Listing 的标配。"
              prompt={`A clean infographic showing {product_name} on the left side with {N} numbered feature callouts pointing to specific parts, each callout with a short label, soft beige background (#F5F0E6), sans-serif typography, minimalist layout, plenty of negative space, technical product illustration style, 1024x1024.`}
            />
            <RecipeCard
              title="配方 4：A+ 内容故事图"
              scene="A+ 内容图允许更丰富的品牌叙事，可用大场景图、创始人故事、原料溯源等。"
              prompt={`A cinematic brand storytelling image for {brand_name}, showing {core_ingredient_or_origin_story} in a {mood} atmosphere, branded color palette ({specific_hex_codes}), subtle brand logo bottom-right, professional advertising photography with shallow depth of field, magazine-quality composition, 1024x1024.`}
            />
          </div>
        </div>
      </section>

      {/* 案例展示 */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink">{brandTerms.primaryModel} 跑通的 Amazon 类目案例</h2>
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
          <h2 className="text-2xl font-bold text-ink mb-8">3 步用上这些 Prompt</h2>
          <ol className="space-y-6">
            <Step n={1} title="注册 keys2api 拿到 API Key">
              访问 <a href={brandTerms.apiProviderRegisterUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">{brandTerms.apiProviderDomain}</a>
              {' '}注册账号，充值 $5 就能跑 100+ 张图。注册后到 Dashboard 复制 API Key。
            </Step>
            <Step n={2} title="复制本页 Prompt 改成你的产品">
              在任一案例详情页点「查看原 Prompt」复制原文，把 <code className="bg-white px-1.5 py-0.5 rounded text-sm">{`{product_name}`}</code> 等变量替换成你的实际产品参数。
            </Step>
            <Step n={3} title="调 API 出图（或用网页版）">
              会写代码的用 OpenAI SDK（base_url 指向 {brandTerms.apiProviderDomain}）；不会写代码的直接在 {brandTerms.apiProviderDomain} 网页版输入框粘贴 Prompt 出图。
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
