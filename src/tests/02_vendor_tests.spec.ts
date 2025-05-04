import { expect, test } from "@playwright/test";

import { LoginPage } from "../page-object/loginPage";
import { envData } from "../fixtures/envData";
import { CreateAccountPage } from "../page-object/createAccountPage";
import { createAccount } from "../fixtures/createAccountForm";
import { ProfilePreviewPage } from "../page-object/profilePreviewPage";

test.describe("Create vendor account tests", () => {
  test.beforeEach("should log in a user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(envData.baseUrl);
    await loginPage.signIn();
    await loginPage.assertUserSignedIn(page);
    console.log("User is logged in.");
  });

  test("should create and remove a wedding venue vendor user account", async ({ page }) => {
    const createAccountPage = new CreateAccountPage(page);
    const profilePreviewPage = new ProfilePreviewPage(page);
    await createAccountPage.deleteProfile();
    await createAccountPage.chooseServices("Miejsca na wesele");
    await createAccountPage.configureVenueType(
      "Sala bankietowa",
      "Uniwersalny",
      "W górach",
      createAccount.weddingPlace.numberOfWeddingGuestsFrom,
      createAccount.weddingPlace.numberOfWeddingGuestsTo,
    );
    await createAccountPage.addVenueAmenities("Dekoracje");
    await createAccountPage.addTableArragements(
      "Okrągłe",
      createAccount.weddingPlace.numberOfTableSeatsFrom,
      createAccount.weddingPlace.numberOfTableSeatsTo,
      "Wewnątrz",
    );
    await createAccountPage.addFoodOptions("Polska", "Przystawki");
    await createAccountPage.addBeverageOptions(["Kawa", "Soki", "Wino"]);
    await createAccountPage.addAccommodation("Na miejscu", createAccount.weddingPlace.numberOfAccommodations);
    await createAccountPage.fillDescriptionForm(
      createAccount.weddingPlace.vendorName,
      createAccount.weddingPlace.slogan,
      createAccount.weddingPlace.vendorDescription,
    );
    await createAccountPage.fillPackageForm(
      createAccount.weddingPlace.packageName,
      createAccount.weddingPlace.packagePrice,
      createAccount.weddingPlace.packageDescription,
      ["Noclegi", "Śniadanie"],
    );
    await createAccountPage.uploadPhotos([
      createAccount.photos.weddingPlacePhoto1,
      createAccount.photos.weddingPlacePhoto2,
      createAccount.photos.weddingPlacePhoto3,
      createAccount.photos.weddingPlacePhoto4,
      createAccount.photos.weddingPlacePhoto5,
      createAccount.photos.weddingPlacePhoto6,
    ]);
    await createAccountPage.addVideoLinks(createAccount.weddingPlace.videoLink);
    await createAccountPage.setLocation(createAccount.weddingPlace.location);
    await createAccountPage.setContactDetails(createAccount.weddingPlace.contactTitle);
    await createAccountPage.importReviews();
    await createAccountPage.addSocialMediaLinks(
      createAccount.weddingPlace.facebookLink,
      createAccount.weddingPlace.instaLink,
      createAccount.weddingPlace.tiktokLink,
      createAccount.weddingPlace.webPageLink,
    );
    await createAccountPage.attachFiles();
    await createAccountPage.checkCommunityCheckboxes();
    await profilePreviewPage.assertWeddingVenueConfiguredCorrectly();
    await profilePreviewPage.assertVendorParametersCorrect(
      createAccount.weddingPlace.vendorName,
      createAccount.weddingPlace.slogan,
      createAccount.weddingPlace.vendorDescription,
      createAccount.weddingPlace.videoTitle,
    );
    await profilePreviewPage.assertCommunityParametersCorrect();
    await profilePreviewPage.assertPricingCorrect(
      createAccount.weddingPlace.packageName,
      createAccount.weddingPlace.packagePrice,
      createAccount.weddingPlace.packageDescription,
      ["Śniadanie", "Noclegi"],
    );
    await profilePreviewPage.assertLocationCorrect(createAccount.weddingPlace.location, createAccount.weddingPlace.nearestTowns);
    await profilePreviewPage.assertLinksCorrect([
      createAccount.weddingPlace.instaLink,
      createAccount.weddingPlace.facebookLink,
      createAccount.weddingPlace.tiktokLink,
      createAccount.weddingPlace.webPageLink,
    ]);
    await profilePreviewPage.assertFilesCorrect();
    await createAccountPage.submitProfile();
    await createAccountPage.deleteProfile();
    await createAccountPage.assertProfileDeleted();
  });

  test("should create and edit dj account", async ({ page, browserName }) => {
    if (browserName === "webkit") {
      test.skip();
    }
    const createAccountPage = new CreateAccountPage(page);
    const profilePreviewPage = new ProfilePreviewPage(page);

    //Create DJ account
    await createAccountPage.deleteProfile();
    await createAccountPage.chooseServices("Oprawa muzyczna");
    await createAccountPage.choosePerformerType("DJ");
    await createAccountPage.chooseMusicType(["Pop", "Rock", "Jazz"]);
    await createAccountPage.setWeddingVendorParameters("Tak");
    await createAccountPage.chooseLiveActInstruments(["Puzon", "Perkusja", "Flet"]);
    await createAccountPage.buttonPrivedCompere.click();
    await createAccountPage.chooseShowLanguages(["Polski 🇵🇱", "Czeski 🇨🇿", "Ukraiński 🇺🇦"]);
    await createAccountPage.chooseAdditionalAttractions(["Prowadzenie oczepin", "Zabawy integracyjne dla gości"]);
    await createAccountPage.chooseEquipment(["Ciężki dym", "Animacje wizualne"]);
    await createAccountPage.setScheduleDetails(createAccount.dj.numberOfShowHoursFrom, createAccount.dj.numberOfShowHoursTo);
    await createAccountPage.setPartnerAccomodationDetails();
    await createAccountPage.fillDescriptionForm(createAccount.dj.vendorName, createAccount.dj.slogan, createAccount.dj.vendorDescription);
    await createAccountPage.fillPackageForm(
      createAccount.dj.packageName,
      createAccount.dj.packagePrice,
      createAccount.dj.packageDescription,
      ["Występ", "Live Act"],
    );
    await createAccountPage.uploadPhotos([
      createAccount.photos.djPhoto1,
      createAccount.photos.djPhoto2,
      createAccount.photos.djPhoto3,
      createAccount.photos.djPhoto4,
      createAccount.photos.djPhoto5,
    ]);
    await createAccountPage.addVideoLinks(createAccount.dj.videoLink);
    await createAccountPage.setLocation(createAccount.dj.location);
    await createAccountPage.setContactDetails(createAccount.dj.contactTitle);
    await createAccountPage.importReviews();
    await createAccountPage.addSocialMediaLinks(
      createAccount.dj.facebookLink,
      createAccount.dj.instaLink,
      createAccount.dj.tiktokLink,
      createAccount.dj.webPageLink,
    );
    await createAccountPage.attachFiles();
    await createAccountPage.checkCommunityCheckboxes();
    await profilePreviewPage.assertVendorParametersCorrect(
      createAccount.dj.vendorName,
      createAccount.dj.slogan,
      createAccount.dj.vendorDescription,
      createAccount.dj.videoTitle,
    );
    await profilePreviewPage.assertCommunityParametersCorrect();
    await profilePreviewPage.assertPricingCorrect(
      createAccount.dj.packageName,
      createAccount.dj.packagePrice,
      createAccount.dj.packageDescription,
      ["Występ", "Live Act"],
    );
    await profilePreviewPage.assertLocationCorrect(createAccount.dj.location, createAccount.dj.nearestTowns);
    await profilePreviewPage.assertLinksCorrect([
      createAccount.dj.instaLink,
      createAccount.dj.facebookLink,
      createAccount.dj.tiktokLink,
      createAccount.dj.webPageLink,
    ]);
    await profilePreviewPage.assertFilesCorrect();
    await createAccountPage.submitProfile();

    //edit DJ specific parameters
    await createAccountPage.buttonEditProfile.click();
    await createAccountPage.chooseMusicType(["Pop", "Rock", "Jazz"]);
    await createAccountPage.chooseMusicType(["Disco polo"]);
    await createAccountPage.chooseLiveActInstruments(["Puzon", "Perkusja", "Flet"]);
    await createAccountPage.chooseLiveActInstruments(["Gitara basowa", "Pianino/Keyboard", "Skrzypce"]);
    await createAccountPage.chooseShowLanguages(["Polski 🇵🇱", "Czeski 🇨🇿", "Ukraiński 🇺🇦"]);
    await createAccountPage.chooseShowLanguages(["Angielski 🇬🇧", "Hiszpański 🇪🇸"]);
    await createAccountPage.chooseAdditionalAttractions(["Prowadzenie oczepin", "Zabawy integracyjne dla gości"]);
    await createAccountPage.chooseAdditionalAttractions(["Prowadzenie ceremonii humanistycznej", "Możliwość modyfikowania playlisty"]);
    await createAccountPage.chooseEquipment([
      "Ciężki dym",
      "Animacje wizualne",
      "Oświetlenie dekoracyjne",
      "Oświetlenie sceniczne",
      "Własny sprzęt nagłośnieniowy",
    ]);

    //edit common parameters
    await createAccountPage.setScheduleDetails(createAccount.dj.numberOfShowHoursFrom + 2, createAccount.dj.numberOfShowHoursTo - 1);
    await createAccountPage.navigateToNextStep();
    await createAccountPage.fillDescriptionForm(
      createAccount.dj.newVendorName,
      createAccount.dj.newSlogan,
      createAccount.dj.newVendorDescription,
    );
    await createAccountPage.addNewPackage();
    await createAccountPage.deletePackage(0);
    await createAccountPage.fillPackageForm(
      createAccount.dj.newPackageName,
      createAccount.dj.newPackagePrice,
      createAccount.dj.newPackageDescription,
      ["Dojazd"],
    );
    await createAccountPage.uploadPhotos([createAccount.photos.djPhoto6]);

    await createAccountPage.addVideoLinks(createAccount.dj.newVideoLink);
    await createAccountPage.removeLocation();
    await createAccountPage.setLocation(createAccount.dj.newLocation);
    await createAccountPage.setContactDetails(createAccount.dj.newContactTitle);
    await createAccountPage.navigateToNextStep();
    await createAccountPage.addSocialMediaLinks(
      createAccount.dj.newFacebookLink,
      createAccount.dj.newInstaLink,
      createAccount.dj.newTiktokLink,
      createAccount.dj.newWebPageLink,
    );
    await createAccountPage.attachFiles();
    await createAccountPage.checkCommunityCheckboxes();

    //assert all changes and delete
    await profilePreviewPage.assertVendorParametersCorrect(
      createAccount.dj.newVendorName,
      createAccount.dj.newSlogan,
      createAccount.dj.newVendorDescription,
      createAccount.dj.newVideoTitle,
    );
    await profilePreviewPage.assertCommunityParametersCorrect();
    await profilePreviewPage.assertPricingCorrect(
      createAccount.dj.newPackageName,
      createAccount.dj.newPackagePrice,
      createAccount.dj.newPackageDescription,
      ["Dojazd"],
    );
    await profilePreviewPage.assertLocationCorrect(createAccount.dj.newLocation, createAccount.dj.newNearestTowns);
    await profilePreviewPage.assertLinksCorrect([
      createAccount.dj.newInstaLink,
      createAccount.dj.newFacebookLink,
      createAccount.dj.newTiktokLink,
      createAccount.dj.newWebPageLink,
    ]);
    await profilePreviewPage.assertFilesCorrect();
    await createAccountPage.submitProfile();
    await createAccountPage.deleteProfile();
    await createAccountPage.assertProfileDeleted();
  });
});
