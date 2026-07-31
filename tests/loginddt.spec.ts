import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

import loginData from '../test-data/loginData.json';

for (const data of loginData) {

    test(`Login - ${data.username} - ${data.password} - ${data.expected} - ${data.expectedErrorMessage}` , async ({ page }) => {

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