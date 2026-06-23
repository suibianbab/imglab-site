import type { PromptPage } from './types';

/**
 * SEO 着陆页配置（3 页 + hub 通过 getAllPromptPages 暴露）
 *
 * Why: 吃 Google 长尾搜索（"GPT-Image-2 Amazon 副图 prompt" 类查询），
 * 参考 GTM plan §4.2 提到的 YouMind SEO 矩阵模式。
 * 主体 JSX 内容在各 page.tsx 里，这里只放共享元数据 + FAQ schema 数据。
 *
 * caseIds 来自 15 张 cross-border 案例按 prompt 内容手工分类。
 */
export const promptPages: PromptPage[] = [
  {
    slug: 'gpt-image-2-for-amazon',
    platform: 'amazon',
    h1: 'GPT-Image-2 Amazon 主图 / 副图 Prompt 配方',
    metaTitle: 'GPT-Image-2 Amazon 主图副图 Prompt 配方',
    metaDescription:
      '精选 GPT-Image-2 生成的 Amazon Listing 主图、6 张副图、A+ 内容图案例，附原 Prompt 可直接复制，覆盖白底主图、场景图、生活方式图等跨境卖家高频需求。',
    heroPain:
      'Amazon Listing 主图过不了审核？副图 6 张配不齐？A+ 内容图不够吸睛？这些 GPT-Image-2 prompt 配方已经替你跑通了。',
    caseIds: [
      'evolinkai-014',
      'evolinkai-015',
      'evolinkai-018',
      'evolinkai-020',
      'evolinkai-022',
      'evolinkai-023',
      'evolinkai-025',
      'evolinkai-030',
    ],
    faqs: [
      {
        q: 'GPT-Image-2 生成的图能直接用在 Amazon Listing 吗？',
        a: '可以。Amazon 允许卖家上传 AI 生成的产品图，但要符合主图白底规范（RGB 255/255/255、产品占图 85%、无文字无水印）。副图和 A+ 内容图自由度更高，可用生活方式、场景、信息图等。建议生成后用 Photoshop 处理主图背景为纯白。',
      },
      {
        q: '一张图大概多少钱？',
        a: '通过 keys2api 调 GPT-Image-2，标准质量约 $0.02/张，high 质量约 $0.04/张。一条 Listing 配齐 1 张主图 + 6 张副图 + 3 张 A+ 图，预算约 $0.3-0.5。',
      },
      {
        q: '我不会写代码，能用吗？',
        a: '能。访问研图社 imglab.cn 浏览案例库，看中哪张图就复制对应 Prompt，到 keys2api.com 注册后用网页版输入框粘贴 Prompt 直接出图，全程不用写代码。',
      },
      {
        q: 'GPT-Image-2 出来的产品图比例对吗？',
        a: 'Amazon 主图建议 1000×1000 像素（1:1），副图可 1:1 或 4:5（移动端更友好）。GPT-Image-2 支持 1024×1024、1024×1792、1792×1024 三种原生比例，1:1 直接用，其他比例生成后裁切即可。',
      },
    ],
  },
  {
    slug: 'gpt-image-2-for-tiktok-ads',
    platform: 'tiktok-ads',
    h1: 'GPT-Image-2 TikTok Ads 竖版广告 Prompt 配方',
    metaTitle: 'GPT-Image-2 TikTok Ads 竖版广告 Prompt 配方',
    metaDescription:
      '精选 9:16 竖版 TikTok Ads 素材案例，覆盖情感营销、UGC 风格、视觉冲击、生活方式等高转化钩子，附 GPT-Image-2 原 Prompt 可直接复制。',
    heroPain:
      'TikTok Ads CTR 上不去？9:16 素材做不出来？前 3 秒钩子不够抓眼？这些 GPT-Image-2 prompt 配方专为 TikTok 竖版广告设计。',
    caseIds: [
      'evolinkai-011',
      'evolinkai-012',
      'evolinkai-018',
      'evolinkai-019',
      'evolinkai-020',
      'evolinkai-030',
      'evolinkai-034',
      'evolinkai-353',
    ],
    faqs: [
      {
        q: 'GPT-Image-2 适合做 TikTok Ads 素材吗？',
        a: '适合做静态帧、产品展示、生活方式场景图，常用于 TikTok 图片广告（Image Ad）和 Spark Ads 素材。视频类素材需配合 AI 视频工具（如 Sora、Seedance）将静态图动起来。GPT-Image-2 出图质量高、文字渲染准，特别适合带促销文案的钩子图。',
      },
      {
        q: 'TikTok Ads 素材推荐什么尺寸？',
        a: '9:16 竖版（1080×1920）是 TikTok 主流。GPT-Image-2 原生支持 1024×1792 接近 9:16，可直接生成。顶部留 250px 安全区（避开 TikTok UI 元素），底部留 400px 安全区（避开文案和 CTA 按钮）。',
      },
      {
        q: '怎么写出高 CTR 的 TikTok Ads prompt？',
        a: '三个核心要素：1) 视觉冲击力强的主体（产品夸张化、超现实场景）；2) 情感钩子（人物表情、生活方式代入）；3) 文字层次（大字报式标题 + 利益点标签）。本页案例 019 汉堡、023 能量饮料、011 跑鞋都是典型高钩子配方。',
      },
      {
        q: '一张 TikTok Ads 素材要测多久？',
        a: 'TikTok 算法奖励素材更迭，建议一个广告组配 3-5 张图轮测，CTR 低于 1.5% 立刻淘汰。GPT-Image-2 出图快（每张约 30 秒），一天能产 50-100 张测试素材，比外包摄影便宜 10 倍以上。',
      },
    ],
  },
  {
    slug: 'gpt-image-2-for-shopify',
    platform: 'shopify',
    h1: 'GPT-Image-2 Shopify Banner / Hero 图 Prompt 配方',
    metaTitle: 'GPT-Image-2 Shopify Banner Hero 图 Prompt 配方',
    metaDescription:
      '精选 GPT-Image-2 生成的 Shopify 首页 Hero、产品集合页 Banner、品牌故事页、季节性 Landing 图，附原 Prompt 可直接复制，独立站卖家从 0 搭建视觉系统。',
    heroPain:
      'Shopify 独立站首页太丑？品牌故事页没素材？季节性 Landing 来不及做？这些 GPT-Image-2 prompt 配方帮你从 0 搭出有品牌感的视觉系统。',
    caseIds: [
      'evolinkai-012',
      'evolinkai-014',
      'evolinkai-015',
      'evolinkai-024',
      'evolinkai-025',
      'evolinkai-026',
      'evolinkai-034',
    ],
    faqs: [
      {
        q: 'Shopify 独立站需要哪些类型的图片？',
        a: '核心 5 类：1) 首页 Hero Banner（1920×800 横版）；2) 产品集合页 Banner（1920×400 长条）；3) 产品详情页配图（1200×1200）；4) 品牌故事页图（自适应）；5) 季节性 Landing 图（节日促销用）。GPT-Image-2 都能覆盖。',
      },
      {
        q: 'GPT-Image-2 能保证品牌视觉统一吗？',
        a: '能。关键是 Prompt 里锁定品牌色（具体色值如 #C8161D 而非「红色」）、字体气质（衬线/无衬线）、构图模板（产品居中、文字位置）。同一品牌的不同 Banner 用相同 prompt 框架只换产品，视觉就统一。本页 014 手表、025 运动鞋都是品牌化模板示例。',
      },
      {
        q: 'Shopify 主题对图片尺寸有什么要求？',
        a: '不同主题要求不同，常见：Dawn 主题 Hero 1280×600-800，Impulse 主题 Hero 1920×800，产品集合卡片 800×800。建议生成 1024×1024 或 1792×1024 后用 Shopify 自带编辑器或 Cloudinary 裁切适配。',
      },
      {
        q: '独立站卖家自己做图 vs 找设计师，哪个划算？',
        a: '冷启动阶段（月营收 <$10k）强烈建议自做：GPT-Image-2 + keys2api 一年图片预算 < $100，设计师一张 Banner 报价 $50-200。规模化后再把高曝光位（首页 Hero、品牌故事页）外包给设计师精修。',
      },
    ],
  },
];

export function getAllPromptPages(): PromptPage[] {
  return promptPages;
}

export function getPromptPageBySlug(slug: string): PromptPage | null {
  return promptPages.find((p) => p.slug === slug) ?? null;
}

export const [amazonPage, tiktokAdsPage, shopifyPage] = promptPages;
