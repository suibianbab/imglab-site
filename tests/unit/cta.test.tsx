import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CTAButton } from '@/components/cta/CTAButton';
import * as analytics from '@/lib/analytics';

vi.mock('@/lib/analytics', () => ({
  trackCTA: vi.fn(),
}));

describe('CTAButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('渲染为 a 标签，href 指向 keys2api ref=imglab', () => {
    render(<CTAButton position="hero">立即使用</CTAButton>);
    const link = screen.getByRole('link', { name: '立即使用' });
    expect(link).toHaveAttribute('href', 'https://keys2api.com/register?ref=imglab');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('携带 data-cta-position 属性', () => {
    render(<CTAButton position="case-card">看这个 prompt</CTAButton>);
    expect(screen.getByRole('link')).toHaveAttribute('data-cta-position', 'case-card');
  });

  it('点击时触发 trackCTA', async () => {
    const user = userEvent.setup();
    render(<CTAButton position="hero">立即使用</CTAButton>);
    await user.click(screen.getByRole('link'));
    expect(analytics.trackCTA).toHaveBeenCalledWith(
      'hero',
      'https://keys2api.com/register?ref=imglab'
    );
  });
});
