import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { userData } from "../fixtures/userData"

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly exampleLocator: Locator;


  constructor(page: Page) {
    super(page);
    this.page = page;
    this.exampleLocator = page.locator("[name='password']")
  }

}