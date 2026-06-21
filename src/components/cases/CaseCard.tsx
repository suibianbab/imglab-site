import Link from 'next/link';
import type { Case } from '@/lib/types';
import { Card, CardImage } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';

const sceneLabels: Record<Case['scene'], string> = {
  ecommerce: '电商主图',
  xhs: '小红书',
  wechat: '公众号封面',
  'cross-border': '跨境 Listing',
};

export function CaseCard({ caseData }: { caseData: Case }) {
  return (
    <Link href={`/cases/${caseData.slug}/`} className="block group">
      <Card className="group-hover:shadow-md transition-shadow h-full">
        <CardImage src={caseData.image_url} alt={caseData.image_alt} />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag variant="brand">{sceneLabels[caseData.scene]}</Tag>
          </div>
          <h3 className="font-medium text-ink line-clamp-2 mb-2">{caseData.title}</h3>
          <div className="flex flex-wrap gap-1">
            {caseData.tags.slice(0, 3).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
