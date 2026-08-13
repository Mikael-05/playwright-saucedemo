// pages/CartPage.ts

import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly checkoutButton: Locator;

  constructor(private page: Page) {
    this.checkoutButton =
      page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}