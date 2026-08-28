import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

import loginData from '../test-data/loginData.json';
import { Logger } from '../utils/Logger';

Logger.info(`loginddt.spec.ts`);

for (const data of loginData) {

    test(`Login - ${data.username} - ${data.password} - ${data.expected} - ${data.expectedErrorMessage}` , {
  tag: ['@regression', '@login']
}, async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            data.username,
            data.password
        );

        if (data.expected === 'success') {

            await loginPage.verifyLoginSucceeded();

        } else {

            await loginPage.verifyLoginFailed();
            const error = await loginPage.getLoginErrorMessage();
            expect(error).toContain(data.expectedErrorMessage);

        }

    });

}