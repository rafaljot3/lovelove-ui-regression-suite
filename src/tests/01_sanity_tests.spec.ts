import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/loginPage';
import { envData } from '../fixtures/envData';

//test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  
  await await page.goto(envData.loginPageUrl);
});

test('should log in and log out', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.signIn();
    await loginPage.assertUserSignedIn();
    await loginPage.signOut();
    await loginPage.assertUserSignedOut();
});