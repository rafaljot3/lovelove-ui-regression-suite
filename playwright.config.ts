import { defineConfig, devices } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config();


export default defineConfig({
  testDir: './src/tests',  
  fullyParallel: true,
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, 
  workers: process.env.CI ? 1 : undefined,
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
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],

});
