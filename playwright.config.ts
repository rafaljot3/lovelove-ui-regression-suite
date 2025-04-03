import { defineConfig, devices } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config();


export default defineConfig({
  testDir: './src/tests',  
  fullyParallel: false,
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, 
  workers: 1,
  reporter: [["list"], ["junit", { outputFile: "results.xml" }]],
  
  use: {

    trace: 'on',
  },
  testMatch: ["**/*.spec.ts"],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['iPhone 13'] },
    },
  ],

});
