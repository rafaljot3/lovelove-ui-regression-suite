import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { userData } from "../fixtures/userData";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly inputPassword: Locator;
  readonly inputUserLogin: Locator;
  readonly buttonLoginIn: Locator;
  readonly buttonLoginOut: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputUserLogin = page.getByRole("textbox", { name: "Wpisz adres e-mail" });
    this.inputPassword = page.locator("[name='password']");
    this.buttonLoginIn = page.locator("//button[text()='Zaloguj się']");
  }

  async signIn(): Promise<void> {
    await this.navigateToLoginPage();
    await this.inputUserLogin.fill(userData.userLogin);
    await this.inputPassword.fill(userData.userPassword);
    await this.buttonLoginIn.click();
  }

  async signOut(): Promise<void> {
    await this.iconHamburgerMenu.waitFor({ state: "visible" });
    await this.iconHamburgerMenu.click();
    try {
      await this.optionLogOut.waitFor({ state: "visible", timeout: 2000 });
    } catch (error) {
      await this.iconHamburgerMenu.click();
      await this.optionLogOut.waitFor({ state: "visible" });
    }
    await this.optionLogOut.click();
  }

  async assertUserSignedIn(page: Page): Promise<void> {
    await expect
      .poll(async () => {
        return await page.evaluate(() => localStorage.getItem("authDetails"));
      })
      .not.toBeNull();
  }

  async assertUserSignedOut(page: Page): Promise<void> {
    await expect
      .poll(async () => {
        return await page.evaluate(() => localStorage.getItem("authDetails"));
      })
      .toBeNull();
  }
}
