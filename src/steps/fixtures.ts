import { request } from "@playwright/test";
import { createBdd, test as base } from "playwright-bdd";
import type { APIRequestContext } from "@playwright/test";
import { ApiClient } from "../api/clients/api.client";
import type { Account } from "../types";
import { getAccount } from "../utils/account.helper";
import { env } from "../utils/env";
import { logger } from "../utils/logger";
import { DashboardPage } from "../pages/dashboard.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
import { getRegistrationData } from "../utils/registration-data.helper";
import type { RegistrationData } from "../types";

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  apiClient: ApiClient;
  account: Account;
  signupPage: SignupPage;
  registrationData: RegistrationData;
  captureScreenshot: (name: string) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  captureScreenshot: async ({ page }, use, testInfo) => {
    await use(async (name: string) => {
      await testInfo.attach(name, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    });
  },
  loginPage: async ({ page }, use, testInfo) => {
    await use(new LoginPage(page));

    if (testInfo.status !== testInfo.expectedStatus) {
      try {
        await testInfo.attach("failure-screenshot", {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      } catch (error) {
        logger.warn(`Could not attach failure screenshot: ${String(error)}`);
      }
    }
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  apiClient: async ({}, use) => {
    const context: APIRequestContext = await request.newContext({
      baseURL: env.apiBaseUrl,
      extraHTTPHeaders: { Accept: "application/json" },
    });
    try {
      await use(new ApiClient(context));
    } finally {
      await context.dispose();
    }
  },
  account: async ({}, use) => {
    await use(getAccount("admin"));
  },
  signupPage: async ({ page }, use, testInfo) => {
    await use(new SignupPage(page));

    if (testInfo.status !== testInfo.expectedStatus) {
      try {
        await testInfo.attach("registration-failure-screenshot", {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      } catch (error) {
        logger.warn(
          `Could not attach registration screenshot: ${String(error)}`,
        );
      }
    }
  },
  registrationData: async ({}, use) => {
    await use(getRegistrationData());
  },
});

export const { Given, When, Then } = createBdd(test);
