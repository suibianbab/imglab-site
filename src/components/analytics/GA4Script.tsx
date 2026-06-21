import Script from 'next/script';

// GA4 Measurement ID 公开可见（HTML 源码可读），无需保密
// 硬编码避免依赖部署环境变量（Makers 默认不注入 NEXT_PUBLIC_*）
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID ?? 'G-YHL9Z69SJE';

export function GA4Script() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
