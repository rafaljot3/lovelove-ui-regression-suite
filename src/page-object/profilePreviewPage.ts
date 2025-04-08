import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { createAccount } from "../fixtures/createAccountForm";
import { envData } from "../fixtures/envData";

export class ProfilePreviewPage extends BasePage {
  readonly page: Page;
  readonly headerProfileName: Locator;
  readonly imageTestPhotos: Locator[];

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.headerProfileName = page.locator("h2.mb-0.flex.items-center.gap-1 span.pe-2");
    this.imageTestPhotos = Array.from({ length: 5 }, (_, i) => page.locator("div.position-relative.cursor-pointer").nth(i).locator("img"));
  }

  async assertProfilePreviewContentIsCorrect(): Promise<void> {
    await expect(this.headerProfileName).toHaveText(createAccount.vendorName);
    const assetUrlPattern = new RegExp(
      `^https://${envData.assetsDomain}/[a-z0-9]+/photos/processed/medium/[a-f0-9-]+\\.(jpeg|jpg)$`
    );

    for (const img of this.imageTestPhotos) {
      const imageUrl = await img.getAttribute("src");
      expect(imageUrl).toMatch(assetUrlPattern);
    }
  }
}
