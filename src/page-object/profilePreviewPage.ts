import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { createAccount } from "../fixtures/createAccountForm";
import { envData } from "../fixtures/envData";

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
  readonly textVideos: Locator;
  readonly fieldPricing: Locator;
  readonly sectionLocation: Locator;
  readonly sectionLinks: Locator;
  readonly sectionFiles: Locator;
  readonly headerProfilePreview: Locator;
  readonly fieldKindOfPerformer: Locator;
  readonly fieldLiveAct: Locator;
  readonly fieldCompere: Locator;
  readonly fieldMusicEquipment: Locator;
  readonly linkPhotos: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.headerProfileName = page.locator('h1.mb-0.flex.items-center');
    this.imageTestPhotos = Array.from({ length: 5 }, (_, i) => page.locator("div.position-relative.cursor-pointer").nth(i).locator("img"));
    this.fieldNumberOfGuests = page.locator("span.fw-normal.text-lowercase.fs-5").first();
    this.fieldCatering = page.locator("span.fw-normal.text-lowercase.fs-5").nth(1);
    this.fieldNumberOfAccommodations = page.locator("span.fw-normal.text-lowercase.fs-5").nth(2);
    this.fieldLocationType = page.locator("span.fw-normal.text-lowercase.fs-5").nth(3);
    this.fieldSlogan = page.locator("//div[@id='description']//div[@class = 'my-3 fw-semibold row']//h2");
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
    this.fieldPricing = page.locator("div.pricing-item");
    this.sectionLocation = page.locator("#location");
    this.sectionLinks = page.locator("#links");
    this.sectionFiles = page.locator("#files");
    this.headerProfilePreview = page.locator("div.p-0.col > span:nth-child(1)").first();
    this.textVideos = page.getByRole("heading", { name: "Filmy" });
    this.fieldKindOfPerformer = page.locator("span.fw-normal.text-lowercase.fs-5").first();
    this.fieldLiveAct = page.locator("span.fw-normal.text-lowercase.fs-5").nth(1);
    this.fieldCompere = page.locator("span.fw-normal.text-lowercase.fs-5").nth(2);
    this.fieldMusicEquipment = page.locator("span.fw-normal.text-lowercase.fs-5").nth(3);
    //this.linkPhotos = page.locator('img[src^="https://assets.lovevolove.pl"]');
    this.linkPhotos = page.locator('img[src^="https://assets.lovevolove.pl"]');
  }

  async assertWeddingVenueConfiguredCorrectly(answers: RegExp): Promise<void> {
    
    await this.fieldNumberOfGuests.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.fieldNumberOfGuests).toHaveText(
      " od " + createAccount.weddingPlace.numberOfWeddingGuestsFrom + " do " + createAccount.weddingPlace.numberOfWeddingGuestsTo,
    );
    await expect(this.fieldCatering).toHaveText(answers);
    await expect(this.fieldNumberOfAccommodations).toHaveText(createAccount.weddingPlace.numberOfAccommodations + " - na miejscu");
    await expect(this.fieldLocationType).toHaveText("W górach");
    await expect(this.fieldVenueType).toHaveText("Sala bankietowa");
    await expect(this.fieldVenueStyle).toHaveText("Uniwersalny");
    await expect(this.fieldCusine).toHaveText("Kuchnia polska");
  }
  async assertMusicPerformerConfiguredCorrectly(performer: string, answers: RegExp): Promise<void> {
    await this.fieldNumberOfGuests.waitFor({ state: "visible", timeout: 30000 });
    await expect(this.fieldKindOfPerformer).toHaveText(performer);
    await expect(this.fieldLiveAct).toHaveText(answers);
    await expect(this.fieldCompere).toHaveText(answers);
    await expect(this.fieldMusicEquipment).toHaveText(answers);

    // await expect(this.fieldLocationType).toHaveText("W górach");
    // await expect(this.fieldVenueType).toHaveText("Sala bankietowa");
    // await expect(this.fieldVenueStyle).toHaveText("Uniwersalny");
    // await expect(this.fieldCusine).toHaveText("Kuchnia polska");
  }
  async assertVendorParametersCorrect(name: string, slogan: string, description: string, title: string): Promise<void> {
    await expect(this.headerProfileName).toHaveText(name);

    await expect(this.fieldSlogan).toHaveText(slogan);
    await expect(this.fieldVendorDescription).toHaveText(description);
    await this.textVideos.scrollIntoViewIfNeeded();
    await expect(this.videoPlayer).toHaveAttribute("title", title);
  }
  async assertPhotosUploadedCorrectly(photos: number) {
    const count = await this.linkPhotos.count();
    expect(count).toBe(photos);

    for (let i = 0; i < count; i++) {
      const image = this.linkPhotos.nth(i);

      await expect(image).toBeVisible();

      const src = await image.getAttribute("src");
      expect(src).toContain("https://assets.lovevolove.pl");

      const box = await image.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
    }
  }
  async assertCommunityParametersCorrect(): Promise<void> {
    const headerText = await this.headerProfileName.textContent();
    if (headerText?.includes("DJ")) {
      await expect(this.fieldCommunityLGBT).toBeVisible();
    } else {
      await expect(this.fieldCommunityLGBT).toBeVisible();
      await expect(this.fieldCommunityEcoFriendly).toBeVisible();
      await expect(this.fieldCommunityDisabledPeople).toBeVisible();
      await expect(this.fieldCommunityPets).toBeVisible();
    }
  }
  async assertPricingCorrect(packageName: string, price: string, description: string, priceContent: string[]): Promise<void> {
    await expect(this.fieldPricing).toBeVisible();
    await expect(this.fieldPricing).toContainText(packageName);
    await expect(this.fieldPricing).toContainText(price);
    await expect(this.fieldPricing).toContainText(description);
    for (const element of priceContent) {
      await expect(this.fieldPricing).toContainText(element);
    }
  }
  async assertLocationCorrect(city: string, nearestTowns: string[]): Promise<void> {
    await expect(this.sectionLocation).toBeVisible();
    await expect(this.sectionLocation).toContainText(city);
    for (let towns of nearestTowns) {
      await expect(this.sectionLocation).toContainText(towns);
    }
  }
  async assertLinksCorrect(links: string[]): Promise<void> {
    for (let link of links) {
      await expect(this.sectionLinks.locator('a[href="' + link + '"]')).toBeVisible();
    }
  }
  async assertFilesCorrect(): Promise<void> {
    for (let i = 1; i <= 3; i++) {
      const linkText = `Test file ${i}`;
      await expect(this.sectionFiles).toContainText(linkText);
    }
  }
}
