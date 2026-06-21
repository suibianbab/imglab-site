'use client';

import { useEffect } from 'react';
import { trackTemplateView } from '@/lib/analytics';

export function TemplateViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackTemplateView(slug);
  }, [slug]);
  return null;
}
