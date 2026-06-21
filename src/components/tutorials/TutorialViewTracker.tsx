'use client';

import { useEffect } from 'react';
import { trackTutorialView } from '@/lib/analytics';

export function TutorialViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackTutorialView(slug);
  }, [slug]);
  return null;
}
