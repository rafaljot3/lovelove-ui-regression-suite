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
    await createAccountPage.chooseServices();
    await createAccountPage.configureVenueType(createAccount.numberOfWeddingGuestsFrom, createAccount.numberOfWeddingGuestsTo);
    await createAccountPage.addVenueAmenities();
    await createAccountPage.addTableArragements(createAccount.numberOfTableSeatsFrom, createAccount.numberOfTableSeatsTo);
    await createAccountPage.addFoodOptions();
    await createAccountPage.addBeverageOptions();
    await createAccountPage.addAccommodation(createAccount.numberOfAccommodations);
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
    await profilePreviewPage.assertProfilePreviewContentIsCorrect();
    await createAccountPage.submitProfile();
    await createAccountPage.deleteProfile();
  });
});
