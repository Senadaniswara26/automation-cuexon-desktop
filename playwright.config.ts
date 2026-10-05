import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { env } from "./src/utils/env";

const testDir = defineBddConfig({
  features: "src/features/**/*.feature",
  steps: "src/steps/**/*.ts",
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["list"],
    ["allure-playwright", { resultsDir: "reports/allure-results" }],
  ],
  use: {
    screenshot: "on",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "ui",
      grep: /@ui/,
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        baseURL: env.baseUrl,
        headless: env.headless,
        testIdAttribute: "data-test",
      },
    },
    {
      name: "api",
      grep: /@api/,
    },
    ...(process.env.RUN_REGISTRATION === "true"
      ? [
          {
            name: "registration",
            grep: /@registration/,
            use: {
              ...devices["Desktop Chrome"],
              browserName: "chromium" as const,
              baseURL: env.registrationBaseUrl,
              headless: env.headless,
            },
          },
        ]
      : []),
  ],
});
