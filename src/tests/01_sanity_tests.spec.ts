import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-object/loginPage";
import { envData } from "../fixtures/envData";

//test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto(envData.baseUrl);
});

test("should log in and log out", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.signIn();
  await loginPage.assertUserSignedIn(page);
  await loginPage.signOut();
  await loginPage.assertUserSignedOut(page);
});
