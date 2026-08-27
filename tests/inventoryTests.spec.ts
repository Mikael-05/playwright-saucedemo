import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { Logger } from '../utils/Logger';


Logger.info(`inventoryTests.spec.ts`);

test('Vérifie le nombre de produit', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.loginAsStandardUser();
  await loginPage.verifyLoginSucceeded();
  const articleCount = await inventoryPage.getArticleCount();
  expect(articleCount).toBe(6);
});


test('Trier les produits par prix croissant', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login
  await loginPage.goto();
  await loginPage.loginAsStandardUser();
  await loginPage.verifyLoginSucceeded();

  // Sort products by ascending price
  await inventoryPage.sortByPriceAscending();

  // Assert order of prices is ascending
  await inventoryPage.verifyPricesAreAscending();
});

//await this.InventoryPage.addProduct(product);