// pages/InventoryPage.ts

import { expect, Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

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
    Logger.info(`Ouverture du panier`);
    await this.cart.click();
  }

  async getArticleCount(): Promise<number> {
    return await this.articles.count();
  }

  async sortByPriceAscending(): Promise<void> {
    Logger.info(`Trier les produits par prix croissant`);
    await this.sortDropdown.selectOption('lohi');
  }

  async getDisplayedPrices(): Promise<number[]> {
    Logger.info(`Récupération des prix des produits`);
    const prices = await this.productPrices.allTextContents();
    Logger.info(`Prix récupérés : ${prices.join(', ')}`);
    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }

  async verifyPricesAreAscending(): Promise<void> {
    Logger.info(`Vérification que les prix sont triés par ordre croissant`);
    const prices = await this.getDisplayedPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    Logger.info(`Prix récupérés : ${prices.join(', ')}`);
    Logger.info(`Prix triés : ${sortedPrices.join(', ')}`);
    expect(prices).toEqual(sortedPrices);
  }

  async addAllProductsToCart(): Promise<void> {
    const buttonsCount = await this.addToCartButtons.count();
    let cpt = 0
    Logger.info(`Ajout de tous les produits au panier (${buttonsCount} produits)`);
    while (await this.addToCartButtons.count() > 0) {
      cpt++;
      await this.addToCartButtons.first().click();
      Logger.info(`Produit ${cpt} ajouté au panier`);
    }
  }

  async getCartItemCount(): Promise<number> {
    Logger.info(`Récupération du nombre d'articles dans le panier`);
    if (await this.cartBadge.isVisible()) {
      return Number(await this.cartBadge.textContent());
    }
    return 0;
  }
}