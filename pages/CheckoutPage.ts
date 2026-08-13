// pages/CheckoutPage.ts

import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmation: Locator;

  constructor(private page: Page) {
    this.firstName =
      page.locator('[data-test="firstName"]');

    this.lastName =
      page.locator('[data-test="lastName"]');

    this.postalCode =
      page.locator('[data-test="postalCode"]');

    this.continueButton =
      page.locator('[data-test="continue"]');

    this.finishButton =
      page.locator('[data-test="finish"]');

    this.confirmation =
      page.locator('[data-test="complete-header"]');
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);

    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}