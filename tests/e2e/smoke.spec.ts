import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {
  test('首页加载并包含 Hero CTA', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toContainText('GPT-Image-2');
    await expect(h1).toContainText('中文营销');
    const cta = page.locator('[data-cta-position="hero"]').first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /keys2api\.com.*ref=imglab/);
  });

  test('导航跳转到案例库', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/cases/"]');
    await expect(page).toHaveURL(/\/cases\/?$/);
  });

  test('Footer 包含 CTA', async ({ page }) => {
    await page.goto('/');
    const footerCta = page.locator('[data-cta-position="footer"]').first();
    await expect(footerCta).toBeVisible();
  });

  test('所有 CTA href 指向 keys2api ref=imglab', async ({ page }) => {
    await page.goto('/');
    const ctas = page.locator('a[data-cta-position]');
    const count = await ctas.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const href = await ctas.nth(i).getAttribute('href');
      expect(href).toContain('keys2api.com');
      expect(href).toContain('ref=imglab');
    }
  });

  test('sitemap.xml 可访问', async ({ page }) => {
    const resp = await page.goto('/sitemap.xml');
    expect(resp?.status()).toBe(200);
    const content = await resp?.text();
    expect(content).toContain('<urlset');
    expect(content).toContain('imglab.cn');
  });
});
