// flows/PurchaseFlow.ts

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export class PurchaseFlow {

  constructor(
    private loginPage: LoginPage,
    private inventoryPage: InventoryPage,
    private cartPage: CartPage,
    private checkoutPage: CheckoutPage
  ) {}

  async purchase(
    username: string,
    password: string,
    product: string,
    firstName: string,
    lastName: string,
    postalCode: string
  ) {

    // 1. Login
    await this.loginPage.goto();

    await this.loginPage.login(
      username,
      password
    );

    // 2. Product
    await this.inventoryPage.addProduct(product);

    // 3. Cart
    await this.inventoryPage.openCart();

    await this.cartPage.checkout();

    // 4. Checkout
    await this.checkoutPage.fillCustomerInformation(
      firstName,
      lastName,
      postalCode
    );

    // 5. Confirmation
    await this.checkoutPage.finish();
  }
}