import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';

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
    Logger.success("Ouverture site saucedemo.com");
  }

  async login(user: string, pwd: string) {
    Logger.info(`Connexion avec ${user}`);  
    //Logger.info(`Connexion avec ${pwd}`); 
    await this.username.fill(user);
    await this.password.fill(pwd);
    await this.loginButton.click();
    Logger.success(`Connexion avec ${user} effectuée`);
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
    Logger.info(`Récupération du message d'erreur de connexion`);
    await expect(this.errorMessage).toBeVisible();
    return await this.errorMessage.innerText();
  }

}