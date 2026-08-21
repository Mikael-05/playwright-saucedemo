import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';


test('Ajoute tous les produits et les retire du panier', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  await loginPage.loginAsStandardUser();
  await loginPage.verifyLoginSucceeded();

  // Add all products to cart
  await inventoryPage.addAllProductsToCart();

  // Verify cart item count
  const cartItemCount = await inventoryPage.getCartItemCount();
  expect(cartItemCount).toBe(6);

  // Open cart
  await inventoryPage.openCart();   

  // Remove all products from cart
  await cartPage.removeAllProducts();

  // Verify cart is empty
  await cartPage.verifyCartIsEmpty(); 
  
});