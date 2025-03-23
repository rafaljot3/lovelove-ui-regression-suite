import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
 
  readonly page: Page;
  readonly iconHamburgerMenu: Locator;
  readonly optionLogIn: Locator;
  readonly welcomeBanner: Locator;
  readonly buttonCookiesNo: Locator;
  readonly optionLogOut: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.iconHamburgerMenu = page.locator('img[alt="menu icon"]');
    this.optionLogIn = page.locator('//a[contains(text(), "Zaloguj się")]');
    this.optionLogOut = page.locator('//a[contains(text(), "Wyloguj się")]');
    this.welcomeBanner = page.getByRole('heading', { name: 'Witaj w Love Love' });
    this.buttonCookiesNo = page.locator("//button[text()='Nie, dziękuję']");
  }

  async navigateToLoginPage(): Promise<void> {
    await this.buttonCookiesNo.click();
    await this.iconHamburgerMenu.click();
    await this.optionLogIn.waitFor({ state: 'visible' });
    await this.optionLogIn.click();
    await expect(this.welcomeBanner).toBeVisible();
  }

}
