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
  weddingPlace: {
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
    videoTitle: string;
    nearestTowns: string[];
  };
  dj: {
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
    numberOfShowHoursFrom: number;
    numberOfShowHoursTo: number;
    videoTitle: string;
    nearestTowns: string[];
    newVendorName: string;
    newSlogan: string;
    newVendorDescription: string;
    newPackageName: string;
    newPackagePrice: string;
    newContactTitle: string;
    newPackageDescription: string;
    newVideoLink: string;
    newVideoTitle: string;
    newFacebookLink: string;
    newInstaLink: string;
    newTiktokLink: string;
    newWebPageLink: string;
    newLocation: string;
    newNearestTowns: string[];
  };

  photos: {
    weddingPlacePhoto1: string;
    weddingPlacePhoto2: string;
    weddingPlacePhoto3: string;
    weddingPlacePhoto4: string;
    weddingPlacePhoto5: string;
    weddingPlacePhoto6: string;
    djPhoto1: string;
    djPhoto2: string;
    djPhoto3: string;
    djPhoto4: string;
    djPhoto5: string;
    djPhoto6: string;
  };
};
