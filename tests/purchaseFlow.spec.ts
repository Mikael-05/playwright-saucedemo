// tests/purchase.spec.ts

import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

import { PurchaseFlow } from '../flow/PurchaseFlow';
import { Logger } from '../utils/Logger';

Logger.info(`purchaseFlow.spec.ts`);

test('user can purchase a product',  {
  tag: ['@smoke', '@purchase']
}, async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const purchaseFlow = new PurchaseFlow(
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage
  );

  await purchaseFlow.purchase(
    'standard_user',
    'secret_sauce',
    'Sauce Labs Backpack',
    'John',
    'Doe',
    '75001'
  );

  await expect(checkoutPage.confirmation)
    .toHaveText('Thank you for your order!');
});