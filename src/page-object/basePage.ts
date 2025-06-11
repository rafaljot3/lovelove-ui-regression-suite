import { expect, Locator, Page } from "@playwright/test";
import { CreateAccountPage } from "./createAccountPage";

export class BasePage {
  readonly page: Page;
  readonly iconHamburgerMenu: Locator;
  readonly optionLogIn: Locator;
  readonly welcomeBanner: Locator;
  readonly buttonAcceptCookies: Locator;
  readonly optionLogOut: Locator;
  readonly optionSettings: Locator;
  readonly buttonAddYourBusiness: Locator;
  readonly buttonAdjustCookies: Locator;
  readonly buttonSaveCookiesPreferences: Locator;
  readonly buttonNext: Locator;
  readonly tabBusinessProfile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iconHamburgerMenu = page.getByRole('button', { name: 'Menu hamburger Menu' });
    this.optionLogIn = page.locator('//a[contains(text(), "Zaloguj się")]');
    this.optionLogOut = page.locator('//a[contains(text(), "Wyloguj się")]');
    this.optionSettings = page.locator('//a[contains(text(), "Ustawienia")]');
    this.welcomeBanner = page.getByRole("heading", { name: "Witaj w Love Love" });
    this.buttonAcceptCookies = page.getByRole("button", { name: "Akceptuję ciasteczka" });
    this.buttonAdjustCookies = page.getByRole("button", { name: "Dostosuj" });
    this.buttonAddYourBusiness = page.getByRole("link", { name: "Dodaj swój biznes" });
    this.buttonSaveCookiesPreferences = page.getByRole("button", { name: "Zapisz preferencje" });
    this.buttonNext = page.locator("//button[text()='Dalej']");
    this.tabBusinessProfile = page.getByRole('tab', { name: 'Profil biznesowy' });
  }

  async navigateToLoginPage(): Promise<void> {
    await this.buttonAdjustCookies.click();
    await this.buttonSaveCookiesPreferences.click();
    await this.iconHamburgerMenu.click();
    await this.optionLogIn.waitFor({ state: "visible" });
    await this.optionLogIn.click();
    await expect(this.welcomeBanner).toBeVisible();
  }

  async navigateToNextStep(): Promise<void> {
    await this.page.waitForSelector("h2", { state: "visible" });
    await this.buttonNext.click();
  }
}
