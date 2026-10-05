import * as allure from "allure-js-commons";
import { expect } from "@playwright/test";
import { Given, When, Then } from "../fixtures";

Given(
  "I authenticate via API as {string} with password {string}",
  async ({ apiClient }, username: string, password: string) => {
    await allure.feature("Authentication");
    await allure.story("DummyJSON API login and profile");
    await allure.severity("critical");
    apiClient.lastLogin = await apiClient.auth.login({ username, password });
    const accessToken = apiClient.lastLogin.body.accessToken;
    if (accessToken) {
      apiClient.setToken(accessToken);
    }
  },
);

Then("the API login response should be successful", async ({ apiClient }) => {
  expect(apiClient.lastLogin?.status).toBe(200);
  expect(apiClient.lastLogin?.body.accessToken).toBeTruthy();
});

When("I request my profile via API", async ({ apiClient }) => {
  apiClient.lastProfile = await apiClient.users.getProfile();
});

Then(
  "the API profile username should be {string}",
  async ({ apiClient }, expectedUsername: string) => {
    expect(apiClient.lastProfile?.status).toBe(200);
    expect(apiClient.lastProfile?.body.username).toBe(expectedUsername);
  },
);
