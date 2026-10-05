import * as allure from "allure-js-commons";
import { expect } from "@playwright/test";
import { Given, When, Then } from "../fixtures";

Given("I open the SauceDemo login page", async ({ loginPage }) => {
  await allure.feature("Authentication");
  await allure.story("SauceDemo login");
  await allure.severity("critical");
  await loginPage.open();
});

When(
  "I sign in with the {string} credentials",
  async ({ loginPage, account }, credentialSet: string) => {
    const password =
      credentialSet === "valid"
        ? account.password
        : `${account.password}-invalid`;
    await loginPage.login(account.username, password);
  },
);

Then(
  "I should see the {string} login result",
  async (
    { loginPage, dashboardPage, captureScreenshot },
    expectedResult: string,
  ) => {
    try {
      if (expectedResult === "success") {
        await expect(dashboardPage.title()).toBeVisible();
      } else {
        await expect(loginPage.errorMessage()).toContainText(
          "Username and password do not match",
        );
      }
    } catch (error) {
      await captureScreenshot(`login-${expectedResult}-failure-screenshot`);
      throw error;
    }

    await captureScreenshot(`login-${expectedResult}-success-screenshot`);
  },
);
