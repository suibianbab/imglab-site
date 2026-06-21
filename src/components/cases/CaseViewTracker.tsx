'use client';

import { useEffect } from 'react';
import { trackCaseView } from '@/lib/analytics';

export function CaseViewTracker({
  slug,
  scene,
  industry,
}: {
  slug: string;
  scene: string;
  industry: string;
}) {
  useEffect(() => {
    trackCaseView(slug, scene, industry);
  }, [slug, scene, industry]);
  return null;
}
