import { expect, test } from "@playwright/test";

import { BasePage } from "../pageObject/basePage";
import { LoginPage } from "../pageObject/loginPage";
import { envData } from '../fixtures/envData';

test.describe("Create vendor account tests", () => {
  test.beforeEach("should log in a user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(envData.baseUrl);
    await loginPage.signIn();
    await loginPage.assertUserSignedIn(page);
    console.log("User is logged in.");
  });

  test("should create and remove a vendor user account", async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.buttonAddYourBusiness.click();
  });    
  });
 
