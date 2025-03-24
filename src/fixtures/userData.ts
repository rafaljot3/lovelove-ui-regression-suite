import { UserData } from "../types";
import "dotenv/config";

export const userData: UserData = {
  userLogin: process.env.USER_LOGIN || "",
  userPassword: process.env.USER_PASSWORD || "",
};