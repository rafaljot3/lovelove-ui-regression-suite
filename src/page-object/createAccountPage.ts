import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { sleep } from "../helpers/sleep";

export class CreateAccountPage extends BasePage {
  //common elements
  readonly page: Page;
  readonly buttonCreateAccount: Locator;

  readonly inputNumberFrom: Locator;
  readonly inputNumberTo: Locator;
  readonly buttonGenericQuestionAnswerYes: Locator;
  readonly buttonGenericQuestionAnswerNo: Locator;
  readonly buttonSubmit: Locator;
  readonly buttonDelete: Locator;
  readonly buttonConfirmDelete: Locator;

  //choose your services
  readonly headerDescribeYourServices: Locator;
  readonly buttonWeddingVenues: Locator;

  //wedding venues
  readonly buttonBanquetHall: Locator;
  readonly buttonHotel: Locator;
  readonly buttonRestaurant: Locator;
  readonly buttonUniversalStyle: Locator;
  readonly buttonRomanticStyle: Locator;
  readonly buttonGlamourStyle: Locator;
  readonly buttonMountainLocation: Locator;

  //venue amenities
  readonly buttonDecorations: Locator;

  //table arragements
  readonly buttonRoundTables: Locator;
  readonly buttonSeatsInside: Locator;

  //food
  readonly buttonPolishCusine: Locator;
  readonly buttonWayOfServing: Locator;

  //beverages
  readonly buttonWarmBeveragesCoffee: Locator;
  readonly buttonAlcoFreeJuice: Locator;
  readonly buttonAlcoWine: Locator;
  readonly buttonServeBeverages: Locator;

  //accommodation
  readonly buttonAccommodationOnPlace: Locator;
  readonly inputNumberOfAccomodations: Locator;

  //description
  readonly inputVendorName: Locator;
  readonly inputSlogan: Locator;
  readonly inputVendorDescription: Locator;

  //pricing
  readonly inputPackageName: Locator;
  readonly optionPriceType: Locator;
  readonly inputPrice: Locator;
  readonly optionPriceForWhat: Locator;
  readonly inputPackageDescription: Locator;
  readonly buttonPackageContentPlate: Locator;

  //video links
  readonly inputVideoLink: Locator;

  //locations
  readonly inputLocation: Locator;
  readonly optionLocation: Locator;
  readonly buttonClearLocation: Locator;
  readonly buttonAddLocation: Locator;

  //contact details
  readonly inputContactTitle: Locator;
  //reviews
  readonly checkboxImportReviews: Locator;

  //social media
  readonly inputFacebookLink: Locator;
  readonly inputInstaLink: Locator;
  readonly inputTikTokLink: Locator;
  readonly inputWePageLink: Locator;

  //community
  readonly checkboxLgbt: Locator;
  readonly checkboxDisabledPeople: Locator;
  readonly checkboxEnvironmentFriendly: Locator;
  readonly checkboxPets: Locator;

  constructor(page: Page) {
    super(page);

    //common elements
    this.page = page;
    this.buttonCreateAccount = page.getByRole("button", { name: "Rozpocznij przygodę z Love" });
    this.inputNumberFrom = page.getByRole("spinbutton").first();
    this.inputNumberTo = page.getByRole("spinbutton").nth(1);
    this.buttonGenericQuestionAnswerYes = page.getByRole("button", { name: "Tak" });
    this.buttonGenericQuestionAnswerNo = page.getByRole("button", { name: "Nie" });
    this.buttonSubmit = page.getByRole("button", { name: "Prześlij", exact: true });
    this.buttonDelete = page.getByRole("button", { name: "Usuń" });
    this.buttonConfirmDelete = page.getByRole("dialog").getByRole("button", { name: "Usuń" });

    //choose your services
    this.headerDescribeYourServices = page.getByRole("heading", { name: "Określ swoje usługi" });
    this.buttonWeddingVenues = page.getByRole("button", { name: "Miejsca na wesele" });

    //wedding venues
    this.buttonBanquetHall = page.getByRole("button", { name: "Sala bankietowa" });
    this.buttonHotel = page.getByRole("button", { name: "Hotel" });
    this.buttonRestaurant = page.getByRole("button", { name: "Restauracja" });
    this.buttonUniversalStyle = page.getByRole("button", { name: "Uniwersalny" });
    this.buttonRomanticStyle = page.getByRole("button", { name: "Romantyczny" });
    this.buttonGlamourStyle = page.getByRole("button", { name: "Glamour" });
    this.buttonMountainLocation = page.getByRole("button", { name: "W górach" });

    //venue amenities
    this.buttonDecorations = page.getByRole("button", { name: "Dekoracje" });

    //table arragements
    this.buttonRoundTables = page.getByRole("button", { name: "Okrągłe" });
    this.buttonSeatsInside = page.getByRole("button", { name: "Wewnątrz" });

    //food
    this.buttonPolishCusine = page.getByRole("button", { name: "Polska" });
    this.buttonWayOfServing = page.getByRole("button", { name: "Przystawki" });

    //beverages
    this.buttonWarmBeveragesCoffee = page.getByRole("button", { name: "Kawa" });
    this.buttonAlcoFreeJuice = page.getByRole("button", { name: "Soki" });
    this.buttonAlcoWine = page.getByRole("button", { name: "Wino" });
    this.buttonServeBeverages = page.locator('//h3[contains(text(), "Czy zapewniacie napoje?")]/following::button[1]');

    //accommodation
    this.buttonAccommodationOnPlace = page.getByRole("button", { name: "Na Miejscu" });
    this.inputNumberOfAccomodations = page.getByPlaceholder("Noclegi na miejscu");

    //description
    this.inputVendorName = page.getByRole("textbox", { name: "Nazwa działalności" });
    this.inputSlogan = page.getByRole("textbox", { name: "Krótki slogan" });
    this.inputVendorDescription = page.getByRole("textbox", { name: "Podziel się historią swojej" });

    //pricing
    this.inputPackageName = page.getByRole("textbox", { name: "Nazwa usługi lub pakietu" });
    this.inputPrice = page.getByPlaceholder("Cena w PLN");
    this.inputPackageDescription = page.getByRole("textbox", { name: "Opis usługi lub pakietu" });
    this.buttonPackageContentPlate = page.getByRole("button", { name: "Talerzyk" });

    //video links
    this.inputVideoLink = page.getByRole("textbox", { name: "Link do filmu" });

    //locations
    this.inputLocation = page.getByRole("searchbox", { name: "Wpisz lokalizację" });
    this.optionLocation = page.getByText("WrocławPolska");
    this.buttonClearLocation = page.getByRole("button", { name: "Wrocław" }).getByRole("button");
    this.buttonAddLocation = page.getByRole("button", { name: "Dodaj" });

    //contact details
    this.inputContactTitle = page.locator('//label[contains(text(), "Tytuł")]/following::input[1]');

    //reviews
    this.checkboxImportReviews = page.locator(
      '//label[contains(text(), "Chcę zaimportować opinie mojego biznesu z Google")]/preceding::input[1]',
    );

    //social media
    this.inputFacebookLink = page.getByRole("textbox", { name: "facebook.com/twoj-profil" });
    this.inputInstaLink = page.getByRole("textbox", { name: "instagram.com/twoj-profil" });
    this.inputTikTokLink = page.getByRole("textbox", { name: "tiktok.com/@twoj-profil" });
    this.inputWePageLink = page.getByRole("textbox", { name: "twoja-strona.pl" });

    //community
    this.checkboxLgbt = page.locator(
      '//label[contains(text(), "Wspieramy społeczność LGBTQ+")]/parent::div/preceding-sibling::div//input[@type="checkbox"]',
    );
    this.checkboxEnvironmentFriendly = page.locator(
      '//label[contains(text(), "Jesteśmy Eco friendly")]/parent::div/preceding-sibling::div//input[@type="checkbox"]',
    );
    this.checkboxDisabledPeople = page.locator(
      '//label[contains(text(), "Dostosowane do osób o różnych potrzebach dostępności")]/parent::div/preceding-sibling::div//input[@type="checkbox"]',
    );
    this.checkboxPets = page.locator(
      '//label[contains(text(), "Zwierzaczki mile widziane")]/parent::div/preceding-sibling::div//input[@type="checkbox"]',
    );
  }

  async chooseServices(): Promise<void> {
    await this.buttonAddYourBusiness.click();
    await this.buttonCreateAccount.click();
    await this.buttonWeddingVenues.click();
    await this.navigateToNextStep();
    await expect(this.buttonBanquetHall).toBeVisible();
  }

  async configureVenueType(numberOfGuestsFrom: string, numberOfGuestsTo: string): Promise<void> {
    await this.buttonBanquetHall.click();
    await this.buttonUniversalStyle.click();
    await this.inputNumberFrom.fill(numberOfGuestsFrom);
    await this.inputNumberTo.fill(numberOfGuestsTo);
    await this.buttonMountainLocation.click();
    await this.navigateToNextStep();
    await expect(this.buttonDecorations).toBeVisible();
  }

  async addVenueAmenities(): Promise<void> {
    await this.buttonDecorations.click();
    await this.buttonGenericQuestionAnswerYes.click();
    await this.navigateToNextStep();
  }

  async addTableArragements(numberOfSeatsFrom: string, numberOfSeatsTo: string): Promise<void> {
    await this.buttonRoundTables.click();
    await this.inputNumberFrom.clear();
    await this.inputNumberTo.clear();
    await this.inputNumberFrom.fill(numberOfSeatsFrom);
    await this.inputNumberTo.fill(numberOfSeatsTo);
    await this.buttonSeatsInside.click();
    await this.navigateToNextStep();
  }

  async addFoodOptions(): Promise<void> {
    await this.buttonGenericQuestionAnswerYes.first().click();
    await this.buttonPolishCusine.click();
    await this.buttonWayOfServing.click();
    await this.buttonGenericQuestionAnswerYes.nth(1).click();
    await this.buttonGenericQuestionAnswerYes.nth(2).click();
    await this.navigateToNextStep();
  }

  async addBeverageOptions(): Promise<void> {
    await this.buttonServeBeverages.click();
    await this.buttonWarmBeveragesCoffee.click();
    await this.buttonAlcoFreeJuice.click();
    await this.buttonAlcoWine.click();
    await this.navigateToNextStep();
  }

  async addAccommodation(numberOfAccommodations: string): Promise<void> {
    await this.buttonAccommodationOnPlace.click();
    await this.inputNumberOfAccomodations.clear();
    await this.inputNumberOfAccomodations.fill(numberOfAccommodations);
    await this.buttonGenericQuestionAnswerYes.click();
    await this.navigateToNextStep();
  }

  async fillDescriptionForm(name: string, slogan: string, description: string): Promise<void> {
    await this.inputVendorName.clear();
    await this.inputVendorName.fill(name);
    await this.inputSlogan.clear();
    await this.inputSlogan.fill(slogan);
    await this.inputVendorDescription.clear();
    await this.inputVendorDescription.fill(description);
    await this.navigateToNextStep();
  }

  async fillPackageForm(packageName: string, price: string, description: string): Promise<void> {
    await this.inputPackageName.clear();
    await this.inputPackageName.fill(packageName);
    await this.inputPrice.clear();
    await this.inputPrice.fill(price);
    await this.inputPackageDescription.clear();
    await this.inputPackageDescription.fill(description);
    await this.buttonPackageContentPlate.click();
    await sleep(2000);
    await this.navigateToNextStep();
  }

  async uploadPhotos(): Promise<void> {
    const filePaths = [
      "./src/fixtures/data/photos/test_photo_1.jpg",
      "./src/fixtures/data/photos/test_photo_2.jpg",
      "./src/fixtures/data/photos/test_photo_3.jpg",
      "./src/fixtures/data/photos/test_photo_4.jpg",
      "./src/fixtures/data/photos/test_photo_5.jpeg",
      "./src/fixtures/data/photos/test_photo_6.jpeg",
    ];
    await this.page.setInputFiles('input[type="file"]', filePaths);
    await this.buttonNext.click();
  }

  async addVideoLinks(link: string): Promise<void> {
    await this.inputVideoLink.clear();
    await this.inputVideoLink.fill(link);
    await this.navigateToNextStep();
  }

  async setLocation(location: string): Promise<void> {
    await this.inputLocation.clear();
    await this.inputLocation.fill(location);
    await this.optionLocation.click();
    await this.buttonAddLocation.click();
    await this.navigateToNextStep();
  }

  async setContactDetails(title: string): Promise<void> {
    await this.inputContactTitle.clear();
    await this.inputContactTitle.fill(title);
    await this.navigateToNextStep(); //TODO: will be enhanced
  }

  async importReviews(): Promise<void> {
    await this.checkboxImportReviews.click();
    await this.navigateToNextStep(); //TODO: will be enhanced
  }

  async addSocialMediaLinks(facebookLink: string, instaLink: string, tiktokLink: string, webPageLink: string): Promise<void> {
    const links = [this.inputFacebookLink, this.inputInstaLink, this.inputTikTokLink, this.inputWePageLink];
    for (let link of links) {
      await link.clear();
    }
    await links[0].fill(facebookLink);
    await links[1].fill(instaLink);
    await links[2].fill(tiktokLink);
    await links[3].fill(webPageLink);
    await this.navigateToNextStep();
  }

  async attachFiles(): Promise<void> {
    const filePaths = [
      "./src/fixtures/data/files/test_file_1.docx",
      "./src/fixtures/data/files/test_file_2.doc",
      "./src/fixtures/data/files/test_file_3.pdf",
    ];
    await this.page.setInputFiles('input[type="file"]', filePaths);
    await this.navigateToNextStep();
  }

  async checkCommunityCheckboxes(): Promise<void> {
    const checkboxes = [this.checkboxLgbt, this.checkboxDisabledPeople, this.checkboxEnvironmentFriendly, this.checkboxPets];
    for (let checkbox of checkboxes) {
      await checkbox.check();
    }
    await this.navigateToNextStep();
  }

  async submitProfile(): Promise<void> {
    await this.buttonNext.click();
    await this.buttonSubmit.click();
  }

  async deleteProfile(): Promise<void> {
    await this.buttonDelete.click();
    await this.buttonConfirmDelete.click();
  }
}
