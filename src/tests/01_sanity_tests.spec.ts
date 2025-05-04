import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-object/loginPage";
import { envData } from "../fixtures/envData";
import { createAccount } from "../fixtures/createAccountForm";
import { CreateAccountPage } from "../page-object/createAccountPage";
import { ProfilePreviewPage } from "../page-object/profilePreviewPage";

//test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto(envData.baseUrl);
});

test("should log in and log out", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.signIn();
  await loginPage.assertUserSignedIn(page);
  await loginPage.signOut();
  await loginPage.assertUserSignedOut(page);
});

  test("should create vendor account", { tag: ["@smoke"] }, async ({ page }) => {
    const createAccountPage = new CreateAccountPage(page);
    const loginPage = new LoginPage(page);
    await page.goto(envData.baseUrl);
    await loginPage.signIn();
    await loginPage.assertUserSignedIn(page);
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
    await createAccountPage.addTableArragements("Okrągłe", createAccount.weddingPlace.numberOfTableSeatsFrom, createAccount.weddingPlace.numberOfTableSeatsTo, "Wewnątrz");
    await createAccountPage.addFoodOptions("Polska", "Przystawki");
    await createAccountPage.addBeverageOptions(["Kawa", "Soki", "Wino"]);
    await createAccountPage.addAccommodation("Na miejscu", createAccount.weddingPlace.numberOfAccommodations);
    await createAccountPage.fillDescriptionForm(createAccount.weddingPlace.vendorName, createAccount.weddingPlace.slogan, createAccount.weddingPlace.vendorDescription);
    await createAccountPage.fillPackageForm(createAccount.weddingPlace.packageName, createAccount.weddingPlace.packagePrice, createAccount.weddingPlace.packageDescription, ["Talerzyk"]);
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
    await createAccountPage.submitProfile();
    await createAccountPage.deleteProfile();
  });
