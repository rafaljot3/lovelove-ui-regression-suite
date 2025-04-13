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
    await profilePreviewPage.assertWeddingVenueConfiguredCorrectly();
    await profilePreviewPage.assertVendorParametersCorrect();
    await profilePreviewPage.assertCommunityParametersCorrect();
    await profilePreviewPage.assertPricingCorrect();
    await profilePreviewPage.assertLocationCorrect();
    await profilePreviewPage.assertLinksCorrect();
    await profilePreviewPage.assertFilesCorrect();
    await createAccountPage.submitProfile();
    await createAccountPage.deleteProfile();
    await createAccountPage.assertProfileDeleted();
  });
});