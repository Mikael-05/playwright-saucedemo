import { test } from '@playwright/test';

test('Firefox - SauceDemo load only', async ({ page }) => {
  page.on('console', msg => {
    console.log(`[BROWSER ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log('[PAGE ERROR]', error.message);
  });

  await page.goto('https://www.saucedemo.com/');

  console.log('URL:', page.url());

  await page.waitForTimeout(5000);

  console.log('Page loaded');
});