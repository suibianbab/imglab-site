import Link from 'next/link';
import type { Template } from '@/lib/types';
import { Card, CardImage } from '@/components/ui/Card';

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Link href={`/templates/${template.slug}/`} className="block group">
      <Card className="group-hover:shadow-md transition-shadow h-full">
        <CardImage src={template.preview_image} alt={template.title} />
        <div className="p-4">
          <h3 className="font-medium text-ink line-clamp-2 mb-2">{template.title}</h3>
          <div className="text-xs text-muted">
            {template.variables.length} 个变量槽位
          </div>
        </div>
      </Card>
    </Link>
  );
}
