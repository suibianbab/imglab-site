import Link from 'next/link';
import { CTAButton } from '@/components/cta/CTAButton';
import { brandTerms } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/5 bg-paper">
      <div className="container-page py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-200.png" alt="研图社" className="w-6 h-6 rounded-sm" />
              <span className="font-bold">研图社 · ImgLab</span>
            </div>
            <p className="text-sm text-muted">
              {brandTerms.primaryModel} 中文营销图片生成案例库与模板库。所有图片 100% 自跑生成。
            </p>
          </div>
          <div>
            <div className="text-sm font-medium mb-3">内容</div>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/cases/">精选案例</Link></li>
              <li><Link href="/templates/">Prompt 模板</Link></li>
              <li><Link href="/tutorials/">教程</Link></li>
              <li><Link href="/start/">如何自己生成</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium mb-3">开始创作</div>
            <p className="text-sm text-muted mb-3">
              所有图片由 {brandTerms.apiProviderDomain} 提供 {brandTerms.primaryModel} API 生成。
            </p>
            <CTAButton position="footer" size="sm">如何自己生成？</CTAButton>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-ink/5 text-xs text-muted">
          © {new Date().getFullYear()} 研图社 imglab.cn · 图片由 {brandTerms.primaryModel} 生成
        </div>
      </div>
    </footer>
  );
}
