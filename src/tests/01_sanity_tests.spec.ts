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
    await createAccountPage.chooseServices();
    await createAccountPage.configureVenueType(
      "Sala bankietowa",
      "Uniwersalny",
      "W górach",
      createAccount.numberOfWeddingGuestsFrom,
      createAccount.numberOfWeddingGuestsTo,
    );
    await createAccountPage.addVenueAmenities("Dekoracje");
    await createAccountPage.addTableArragements("Okrągłe", createAccount.numberOfTableSeatsFrom, createAccount.numberOfTableSeatsTo, "Wewnątrz");
    await createAccountPage.addFoodOptions("Polska", "Przystawki");
    await createAccountPage.addBeverageOptions("Kawa", "Soki", "Wino");
    await createAccountPage.addAccommodation("Na miejscu", createAccount.numberOfAccommodations);
    await createAccountPage.fillDescriptionForm(createAccount.vendorName, createAccount.slogan, createAccount.vendorDescription);
    await createAccountPage.fillPackageForm(createAccount.packageName, createAccount.packagePrice, createAccount.packageDescription);
    await createAccountPage.uploadPhotos();
    await createAccountPage.addVideoLinks(createAccount.videoLink);
    await createAccountPage.setLocation(createAccount.location);
    await createAccountPage.setContactDetails(createAccount.contactTitle);
    await createAccountPage.importReviews();
    await createAccountPage.addSocialMediaLinks(
      createAccount.facebookLink,
      createAccount.instaLink,
      createAccount.tiktokLink,
      createAccount.webPageLink,
    );
    await createAccountPage.attachFiles();
    await createAccountPage.checkCommunityCheckboxes();
    await createAccountPage.submitProfile();
    await createAccountPage.deleteProfile();
  });
