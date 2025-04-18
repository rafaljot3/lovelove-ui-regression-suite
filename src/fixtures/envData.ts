import { EnvironmentData } from "../types";

export const envData: EnvironmentData = {
  baseUrl: process.env.BASE_URL || "",
  loginPageUrl: process.env.LOGIN_URL || "",
  apiBaseUrl: process.env.API_BASE_URL || "",
  assetsDomain: process.env.ASSETS_DOMAIN || "",
};