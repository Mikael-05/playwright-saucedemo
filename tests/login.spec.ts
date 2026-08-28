import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Logger } from '../utils/Logger';

Logger.info(`login.spec.ts`);

test('Connexion avec un utilisateur valide', {
  tag: ['@smoke', '@login']
}, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginAsStandardUser();
  await loginPage.verifyLoginSucceeded();
});

test('Connexion avec un mdp invalide', {
  tag: ['@smoke', '@login']
}, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginFailed();
  await loginPage.verifyLoginFailed();
  const error = await loginPage.getLoginErrorMessage();
  expect(error).toContain(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('Connexion avec utilisateur bloqué', {
  tag: ['@sanity', '@login']
}, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginAsLockedUser();
  await loginPage.verifyLoginFailed();
  const error = await loginPage.getLoginErrorMessage();
  expect(error).toContain(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});