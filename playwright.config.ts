import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  timeout: 120000, // 2 minutos por test
  expect: {
    timeout: 30000, // 30s por expect()
  },

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'on-first-retry',
    actionTimeout: 60000, // 60s por fill/click/etc
    navigationTimeout: 120000,
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'brave',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
