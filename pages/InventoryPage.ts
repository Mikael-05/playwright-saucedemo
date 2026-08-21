// pages/InventoryPage.ts

import { expect, Page, Locator } from '@playwright/test';


export class InventoryPage {
  readonly cart: Locator;
  readonly articles: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
 
  
  constructor(private page: Page) {
    this.cart = page.locator('[data-test="shopping-cart-link"]');
    this.articles = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
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

  async getArticleCount(): Promise<number> {
    return await this.articles.count();
  }

  async sortByPriceAscending(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  async getDisplayedPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }

  async verifyPricesAreAscending(): Promise<void> {
    const prices = await this.getDisplayedPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  }

    async addAllProductsToCart(): Promise<void> {
    const buttonsCount = await this.addToCartButtons.count();

    while (await this.addToCartButtons.count() > 0) {
      await this.addToCartButtons.first().click();
    }
  }

  async getCartItemCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      return Number(await this.cartBadge.textContent());
    }

    return 0;
  }
}