import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4321',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npx serve out -l 4321',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    cwd: '.',
  },
});
