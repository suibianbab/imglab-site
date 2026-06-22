import type { Metadata } from 'next';
import { CTAButton } from '@/components/cta/CTAButton';
import { brandTerms } from '@/lib/brand';

export const metadata: Metadata = {
  title: '如何自己生成？- 研图社',
  description: `看到喜欢的案例，怎么用 ${brandTerms.primaryModel} 自己生成一张？3 步走，从注册 ${brandTerms.apiProviderName} 到跑出第一张图。`,
};

export default function StartPage() {
  return (
    <div className="container-page py-12 max-w-3xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4">
          看到喜欢的案例，<br />怎么自己生成一张？
        </h1>
        <p className="text-base text-muted">
          3 步走，从注册到出图，不用写代码也能上手。
        </p>
      </div>

      {/* 关系说明 */}
      <section className="bg-paper rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-ink mb-3">先理清两个网站的关系</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded-xl p-4">
            <div className="font-medium text-ink mb-1">研图社 · imglab.cn</div>
            <p className="text-muted">
              你现在所在的网站。AI 图片营销案例库，负责展示真实案例 + Prompt 模板，教你怎么写出能卖货的图。
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="font-medium text-ink mb-1">{brandTerms.apiProviderDomain}</div>
            <p className="text-muted">
              研图社的合作 API 供应商。提供 {brandTerms.primaryModel} 图片生成 API，案例里所有的图都通过它跑出来。
            </p>
          </div>
        </div>
        <p className="text-xs text-muted mt-4 leading-relaxed">
          简单说：研图社给你「看 + 学」，{brandTerms.apiProviderName} 给你「生成能力」。注册 {brandTerms.apiProviderName} 后，你就能用案例里的 Prompt 自己出图。
        </p>
      </section>

      {/* 3 步走 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ink mb-6">3 步开始生成</h2>
        <ol className="space-y-6">
          <li className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">1</div>
            <div className="flex-1">
              <h3 className="font-bold text-ink mb-1">注册 {brandTerms.apiProviderName}，拿 API Key</h3>
              <p className="text-sm text-muted mb-2">
                {brandTerms.apiProviderName} 是 {brandTerms.primaryModel} 的 API 网关。注册后按 token 充值，本站案例规格（1024×1024 高清图）约 ¥1/张，在控制台拿到 API Key。
              </p>
              <div className="text-xs text-muted bg-paper rounded p-2">
                💡 研图社专属入口：<code className="text-brand">{brandTerms.apiProviderRegisterUrl}</code>
              </div>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">2</div>
            <div className="flex-1">
              <h3 className="font-bold text-ink mb-1">从研图社挑一个 Prompt</h3>
              <p className="text-sm text-muted mb-2">
                在「<a href="/cases/" className="text-brand underline">案例库</a>」选你喜欢的图，点进详情页，复制「中文 Prompt」或「英文原 Prompt」。
                也可以直接套「<a href="/templates/" className="text-brand underline">模板库</a>」里的变量化模板。
              </p>
              <p className="text-xs text-muted">
                💡 推荐从中文 Prompt 开始，{brandTerms.primaryModel} 中文理解很好；想追求原汁原味再用英文原 Prompt。
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">3</div>
            <div className="flex-1">
              <h3 className="font-bold text-ink mb-1">调 API，出图</h3>
              <p className="text-sm text-muted mb-2">
                用 {brandTerms.apiProviderName} 提供的 API 端点，把 Prompt 发出去，几秒到 1 分钟内拿到图。可以选择：
              </p>
              <ul className="text-sm text-muted list-disc pl-5 space-y-1">
                <li>用 {brandTerms.apiProviderName} 控制台内置的「图片生成」工具（最简单，零代码）</li>
                <li>用 curl / Postman 调 API（适合熟悉命令行的）</li>
                <li>用 Python / Node.js 脚本批量生成（适合做内容矩阵的）</li>
              </ul>
            </div>
          </li>
        </ol>
      </section>

      {/* 常见疑问 */}
      <section className="bg-paper rounded-2xl p-6 mb-12">
        <h2 className="text-lg font-bold text-ink mb-4">你可能想问</h2>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-medium text-ink mb-1">Q：为什么不直接用 ChatGPT？</div>
            <p className="text-muted">ChatGPT 单月订阅 $20 起步且有限额。{brandTerms.apiProviderName} 按 token 计费，只为你实际生成的图付费（本站规格约 ¥1/张），做营销图批量产出更便宜。</p>
          </div>
          <div>
            <div className="font-medium text-ink mb-1">Q：我没有技术背景，能用吗？</div>
            <p className="text-muted">能。{brandTerms.apiProviderName} 控制台有内置的「图片生成」工具，跟用 ChatGPT 一样填 Prompt 点按钮就出图，不用碰代码。</p>
          </div>
          <div>
            <div className="font-medium text-ink mb-1">Q：案例里的图真的是 AI 生成的吗？</div>
            <p className="text-muted">100% 是。研图社所有图片都由 {brandTerms.primaryModel} 通过 {brandTerms.apiProviderName} API 自跑生成，无版权风险，你可以放心商用。</p>
          </div>
          <div>
            <div className="font-medium text-ink mb-1">Q：用案例 Prompt 生成的图能商用吗？</div>
            <p className="text-muted">能。Prompt 本身没有版权限制，生成结果归你所有。研图社案例库就是为了让你「抄作业」。</p>
          </div>
        </div>
      </section>

      {/* 最终 CTA */}
      <section className="bg-gradient-to-br from-brand-50 to-paper rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-ink mb-2">准备好开始了吗？</h2>
        <p className="text-sm text-muted mb-6">
          注册 {brandTerms.apiProviderName}，10 分钟内跑出你的第一张 AI 营销图。
        </p>
        <CTAButton position="start-page" size="lg" href="register">前往 {brandTerms.apiProviderName} 注册</CTAButton>
        <p className="text-xs text-muted mt-4">
          注册入口：<code>{brandTerms.apiProviderRegisterUrl}</code>
        </p>
      </section>
    </div>
  );
}
