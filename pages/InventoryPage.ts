// pages/InventoryPage.ts

import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly cart: Locator;

  constructor(private page: Page) {
    this.cart = page.locator('[data-test="shopping-cart-link"]');
  }

  product(name: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: name });
  }

  async addProduct(name: string) {
    await this.product(name)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openCart() {
    await this.cart.click();
  }
}