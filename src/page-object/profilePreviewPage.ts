import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { createAccount } from "../fixtures/createAccountForm";

export class ProfilePreviewPage extends BasePage {
  readonly page: Page;
  readonly headerProfileName: Locator;
  readonly imageTestPhotos: Locator[];
  readonly fieldNumberOfGuests: Locator;
  readonly fieldCatering: Locator;
  readonly fieldNumberOfAccommodations: Locator;
  readonly fieldLocationType: Locator;
  readonly fieldSlogan: Locator;
  readonly fieldVendorDescription: Locator;
  readonly fieldVenueType: Locator;
  readonly fieldVenueStyle: Locator;
  readonly fieldCusine: Locator;
  readonly fieldCommunityLGBT: Locator;
  readonly fieldCommunityEcoFriendly: Locator;
  readonly fieldCommunityDisabledPeople: Locator;
  readonly fieldCommunityPets: Locator;
  readonly videoPlayer: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.headerProfileName = page.locator("h2.mb-0.flex.items-center.gap-1 span.pe-2");
    this.imageTestPhotos = Array.from({ length: 5 }, (_, i) => page.locator("div.position-relative.cursor-pointer").nth(i).locator("img"));
    this.fieldNumberOfGuests = page.locator("div.mt-auto.row div.col > span.fw-semibold").nth(0);
    this.fieldCatering = page.locator("div.mt-auto.row div.col > span.fw-semibold").nth(1);
    this.fieldNumberOfAccommodations = page.locator("div.mt-auto.row div.col > span.fw-semibold").nth(2);
    this.fieldLocationType = page.locator("div.mt-auto.row div.col > span.fw-semibold").nth(3);
    this.fieldSlogan = page.locator("#description .my-3.fw-semibold.row h4.font-space-grotesk");
    this.fieldVendorDescription = page.locator("//div[@id='description']//div[@style='white-space: pre-line;']//div");
    this.fieldVenueType = page.locator(".badge.bg-warning.text-black.fs-6.rounded-0.badge.bg-primary").first();
    this.fieldVenueStyle = page.locator(".badge.bg-warning.text-black.fs-6.rounded-0.badge.bg-primary").nth(1);
    this.fieldCusine = page.locator(".badge.bg-warning.text-black.fs-6.rounded-0.badge.bg-primary").nth(2); //TODO: to figure out how to handle it when there's more parameters
    this.fieldCommunityLGBT = page
      .locator("div")
      .filter({ hasText: /^Przyjazne LGBTQ\+$/ })
      .first();
    this.fieldCommunityEcoFriendly = page
      .locator("div")
      .filter({ hasText: /^ECO Friendly$/ })
      .first();
    this.fieldCommunityDisabledPeople = page
      .locator("div")
      .filter({ hasText: /^Przystosowane dla niepełnosprawnych$/ })
      .first();
    this.fieldCommunityPets = page
      .locator("div")
      .filter({ hasText: /^Czworonogi mile widziane$/ })
      .first();
    this.videoPlayer = page.locator("#video-player-0");
  }

  async assertWeddingVenueConfiguredCorrectly(): Promise<void> {
    const cateringPhrases = [
      "w ofercie",
      "jeszcze jak!",
      "możesz na to liczyć",
      "ma się rozumieć",
      "oczywiście że tak",
      "bez dwóch zdań",
      "pewnie!",
      "naturalnie!",
      "oczywiście!",
      "jasna sprawa",
    ];
    const cateringPhrasesPattern = new RegExp(cateringPhrases.join("|"), "i");
    await this.fieldNumberOfGuests.waitFor({ state: 'visible', timeout: 30000 });
    await expect(this.fieldNumberOfGuests).toHaveText(
      createAccount.numberOfWeddingGuestsFrom + " - " + createAccount.numberOfWeddingGuestsTo,
    );
    await expect(this.fieldCatering).toHaveText(cateringPhrasesPattern);
    await expect(this.fieldNumberOfAccommodations).toHaveText(createAccount.numberOfAccommodations);
    await expect(this.fieldLocationType).toHaveText("W górach");
    await expect(this.fieldVenueType).toHaveText("Sala bankietowa");
    await expect(this.fieldVenueStyle).toHaveText("Uniwersalny");
    await expect(this.fieldCusine).toHaveText("Kuchnia polska");
  }
  async assertVendorParametersCorrect(): Promise<void> {
    await expect(this.headerProfileName).toHaveText(createAccount.vendorName);
    for (const img of this.imageTestPhotos) {
      const imageUrl = await img.getAttribute("src");
      expect(imageUrl).toMatch(
        /^https:\/\/lovelove-assets\.s3\.eu-central-1\.amazonaws\.com\/[a-z0-9]+\/photos\/processed\/medium\/[a-f0-9-]+\.(jpeg|jpg)$/,
      );
    }
    await expect(this.fieldSlogan).toHaveText(createAccount.slogan);
    await expect(this.fieldVendorDescription).toHaveText(createAccount.vendorDescription);
    await expect(this.videoPlayer).toHaveAttribute("title", "DISCO FUNK (CHAPTER 2) -  FULL VINYL DJ SET BY CAMELEON");
  }
  async assertCommunityParametersCorrect(): Promise<void> {
    await expect(this.fieldCommunityLGBT).toBeVisible();
    await expect(this.fieldCommunityEcoFriendly).toBeVisible();
    await expect(this.fieldCommunityDisabledPeople).toBeVisible();
    await expect(this.fieldCommunityPets).toBeVisible();
  }
}
