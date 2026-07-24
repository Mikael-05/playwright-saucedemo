import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pwd: string) {
    await this.username.fill(user);
    await this.password.fill(pwd);
    await this.loginButton.click();
  }

  async loginAsStandardUser() {
    await this.login('standard_user', 'secret_sauce');
  }

  async loginFailed() {
    await this.login('standard_user', 'secret_sauce1');
  }

    async loginAsLockedUser() {
    await this.login('locked_out_user', 'secret_sauce');
  }

  async verifyLoginSucceeded() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async verifyLoginFailed() {
    await expect(this.errorMessage).toBeVisible();
  }

async getLoginErrorMessage(): Promise<string> {
  await expect(this.errorMessage).toBeVisible();
  return await this.errorMessage.innerText();
}

}