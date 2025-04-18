export type UserData = {
    userLogin: string;
    userPassword: string;
  };

export type EnvironmentData = {
  baseUrl: string;
  loginPageUrl: string;
  assetsDomain: string;
  apiBaseUrl: string;
};

export type CreateAccountForm = {
  numberOfWeddingGuestsFrom: string;
  numberOfWeddingGuestsTo: string;
  numberOfTableSeatsFrom: string;
  numberOfTableSeatsTo: string;
  numberOfAccommodations: string;
  vendorName: string;
  slogan: string;
  vendorDescription: string;
  packageName: string;
  packagePrice: string;
  packageDescription: string;
  videoLink: string;
  contactTitle: string;
  location: string;
  facebookLink: string;
  instaLink: string;
  tiktokLink: string;
  webPageLink: string;
}