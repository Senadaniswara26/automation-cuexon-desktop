import * as allure from "allure-js-commons";
import { expect } from "@playwright/test";
import { Given, When, Then } from "../fixtures";

Given("I open the Purpos registration form", async ({ signupPage }) => {
  await allure.feature("Purpos registration");
  await allure.story("Mie SS Rungkut business account");
  await allure.severity("critical");
  await signupPage.open();
});

When(
  "I submit the configured business registration details",
  async ({ signupPage, registrationData }) => {
    await signupPage.register(registrationData);
  },
);

Then(
  "I should see the registration confirmation",
  async ({ signupPage, captureScreenshot }) => {
    try {
      await expect(signupPage.registrationConfirmation()).toBeVisible({
        timeout: 15_000,
      });
    } catch (error) {
      await captureScreenshot("registration-failure-screenshot");
      throw error;
    }

    await captureScreenshot("registration-success-screenshot");
  },
);
