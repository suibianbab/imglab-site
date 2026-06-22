/**
 * 品牌敏感词集中管理
 *
 * Why: GPT-Image-2 / keys2api 等字样在中国大陆 ICP 备案审核中可能被卡
 * （OpenAI 未在大陆备案，"提供 GPT 服务" 类宣传敏感）。
 * 当前阶段（Phase 1 海外节点）不备案，保留精确技术名词作为 SEO + 技术背书。
 * 未来若决定备案（含大陆节点），通过 NEXT_PUBLIC_ICP_MODE=true 一键切换泛化文案。
 *
 * 注：功能性 URL（如注册链接）不受 ICP_MODE 影响 ——
 * 备案审核针对"宣传性文字"，不针对用户主动点击后的跳转目标。
 */

const IS_ICP_MODE = process.env.NEXT_PUBLIC_ICP_MODE === 'true';

export const brandTerms = {
  /** AI 模型名（显示用） */
  primaryModel: IS_ICP_MODE ? '顶级 AI 图片模型' : 'GPT-Image-2',

  /** API 供应商显示名（不是域名，是中文称呼） */
  apiProviderName: IS_ICP_MODE ? '合作 API 供应商' : 'keys2api',

  /** API 供应商域名（显示用，如 "访问 xxx.com"） */
  apiProviderDomain: IS_ICP_MODE ? '合作伙伴官网' : 'keys2api.com',

  /** 注册链接（功能性 URL，备案也不改 —— 用户主动点击行为，非宣传） */
  apiProviderRegisterUrl: 'https://keys2api.com/register?ref=imglab',

  /** 页脚 / SEO 用的 credit 短语 */
  creditText: IS_ICP_MODE ? '研图社 · AI 图片生成' : '研图社 · GPT-Image-2',

  /** 站点定位短语（首页 Hero / SEO description 用） */
  siteTagline: IS_ICP_MODE
    ? 'AI 中文营销图片生成案例库'
    : 'GPT-Image-2 中文营销图片生成案例库',
} as const;
