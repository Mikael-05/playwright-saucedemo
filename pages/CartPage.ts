// pages/CartPage.ts

import { expect, Page, Locator } from '@playwright/test';

export class CartPage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;

  constructor(private page: Page) {
    this.checkoutButton =
      page.locator('[data-test="checkout"]');
      this.cartItems = page.locator('.cart_item');
      this.removeButtons = page.locator('[data-test^="remove-"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async removeAllProducts(): Promise<void> {
    // On récupère le nombre initial de boutons
    const itemsCount = await this.removeButtons.count();

    for (let i = 0; i < itemsCount; i++) {
      // Toujours supprimer le premier élément restant
      await this.removeButtons.first().click();
    }
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

}